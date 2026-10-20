// Fetches Michigan-team games from ESPN's public feeds.
// Shared by the Vercel function (api/scores.js) and the browser fallback in hooks.js.
// This is ESPN's unofficial API: it needs no key but can change without notice.
//
// Each sport is asked three ways and the answers are merged, because ESPN's
// scoreboard behaves differently by sport (the NFL's, for example, is organized by
// week, so a date range can quietly return last week's games):
//   1. the scoreboard for a date range
//   2. the scoreboard's default view ("today" / the current week)
//   3. the team's own season schedule (Detroit pro teams only)

const COLLEGE = /michigan|detroit mercy|oakland golden/i;

export const FEEDS = [
  { sport: "NFL", path: "football/nfl", match: /detroit/i, teamId: 8 },
  { sport: "MLB", path: "baseball/mlb", match: /detroit/i, teamId: 6 },
  { sport: "NBA", path: "basketball/nba", match: /detroit/i, teamId: 8 },
  { sport: "NHL", path: "hockey/nhl", match: /detroit/i, teamId: 5 },
  { sport: "CFB", path: "football/college-football", match: COLLEGE, extra: "groups=80" },
  { sport: "CBB", path: "basketball/mens-college-basketball", match: COLLEGE, extra: "groups=50" },
];

const DAY = 24 * 60 * 60 * 1000;

const ymd = (d) =>
  `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;

// ESPN's scoreboard and schedule feeds shape a few fields differently, so be forgiving.
const scoreOf = (c) => {
  const s = c.score;
  if (s && typeof s === "object") return Number(s.value ?? s.displayValue) || 0;
  return Number(s) || 0;
};
const nameOf = (c) =>
  c.team?.displayName || [c.team?.location, c.team?.nickname].filter(Boolean).join(" ");
const logoOf = (c) => c.team?.logo || c.team?.logos?.[0]?.href || "";

export function parseEvent(e, sport, match) {
  const comp = e.competitions?.[0];
  const teams = comp?.competitors ?? [];
  const home = teams.find((c) => c.homeAway === "home");
  const away = teams.find((c) => c.homeAway === "away");
  if (!home || !away) return null;

  if (!match.test(nameOf(home)) && !match.test(nameOf(away))) return null;

  const st = comp?.status?.type ?? e.status?.type ?? {};
  const state = st.state ?? (st.completed ? "post" : "pre");
  const off = /POSTPONED|CANCEL|SUSPENDED/i.test(st.name ?? "");
  const status = off ? "UPCOMING" : state === "in" ? "LIVE" : state === "post" ? "FINAL" : "UPCOMING";

  const side = (c) => ({
    name: nameOf(c),
    // ESPN supplies the real abbreviation (DET, CLE, MICH...). Never derive it from the name.
    abbr: c.team?.abbreviation || nameOf(c).slice(0, 3).toUpperCase(),
    logo: logoOf(c),
    score: scoreOf(c),
  });

  const start = new Date(e.date);
  let info;
  if (off) info = st.description || "Postponed";
  else if (status === "UPCOMING") {
    info = start.toLocaleString("en-US", {
      weekday: "short",
      hour: "numeric",
      minute: "2-digit",
      timeZone: "America/Detroit",
      timeZoneName: "short",
    });
  } else info = st.shortDetail || (status === "FINAL" ? "Final" : "Live");

  // 0 = Detroit pro teams, 1 = Michigan and Michigan State, 2 = other Michigan colleges
  const names = `${nameOf(home)} ${nameOf(away)}`;
  const priority = ["NFL", "MLB", "NBA", "NHL"].includes(sport)
    ? 0
    : /michigan wolverines|michigan state/i.test(names)
      ? 1
      : 2;

  return { id: `${sport}-${e.id}`, sport, status, priority, info, start: start.getTime(), home: side(home), away: side(away) };
}

// ── Which games to show where ────────────────────────────────────────────────
// The Scores page lists everything. The ticker and sidebar are short, so they
// favor Detroit pro teams, Michigan and Michigan State over smaller schools.
const isFeatured = (g) => (g.priority ?? 0) <= 1;

// Ticker: every featured game, plus anything live.
export function tickerGames(games, limit = 24) {
  return games.filter((g) => isFeatured(g) || g.status === "LIVE").slice(0, limit);
}

// Sidebar: anything live, then the next game and the latest result for each league.
// `games` must already be ordered LIVE, then UPCOMING (soonest first), then FINAL (newest first).
export function featuredGames(games, limit = 6) {
  const seen = new Set();
  const out = [];
  for (const g of games) {
    if (!isFeatured(g) && g.status !== "LIVE") continue;
    const key = `${g.sport}-${g.status === "FINAL" ? "final" : "next"}`;
    if (g.status === "LIVE" || !seen.has(key)) {
      out.push(g);
      seen.add(key);
    }
    if (out.length >= limit) break;
  }
  return out;
}

// ── Fetching ─────────────────────────────────────────────────────────────────
async function getJson(url, fetchFn) {
  const res = await fetchFn(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function fetchFeed(feed, range, win, fetchFn) {
  const base = `https://site.api.espn.com/apis/site/v2/sports/${feed.path}/scoreboard`;
  const extra = feed.extra ? `&${feed.extra}` : "";

  const sources = [
    ["range", [`${base}?dates=${range}&limit=500${extra}`, `${base}?dates=${range}${extra}`]],
    ["today", [`${base}${feed.extra ? `?${feed.extra}` : ""}`]],
  ];
  if (feed.teamId) {
    sources.push([
      "schedule",
      [`https://site.api.espn.com/apis/site/v2/sports/${feed.path}/teams/${feed.teamId}/schedule`],
    ]);
  }

  const reports = await Promise.all(
    sources.map(async ([name, urls]) => {
      let lastError = "unknown error";
      for (const url of urls) {
        try {
          const data = await getJson(url, fetchFn);
          const games = (data.events ?? [])
            .map((e) => parseEvent(e, feed.sport, feed.match))
            .filter((g) => g && g.start >= win.from && g.start <= win.to);
          return { name, ok: true, url, games };
        } catch (err) {
          lastError = String(err?.message ?? err);
        }
      }
      return { name, ok: false, error: lastError, games: [] };
    })
  );

  // Merge. On duplicates the first source wins: scoreboard data is richer than schedule data.
  const byId = new Map();
  for (const r of reports) for (const g of r.games) if (!byId.has(g.id)) byId.set(g.id, g);

  return {
    sport: feed.sport,
    ok: reports.some((r) => r.ok),
    games: [...byId.values()],
    sources: reports.map((r) => ({ name: r.name, ok: r.ok, count: r.games.length, url: r.url, error: r.error })),
  };
}

export async function fetchMichiganGames(fetchFn = (url) => fetch(url)) {
  const now = Date.now();
  const win = { from: now - 2 * DAY, to: now + 10 * DAY };
  const range = `${ymd(new Date(now - 2 * DAY))}-${ymd(new Date(now + 6 * DAY))}`;

  const results = await Promise.all(FEEDS.map((f) => fetchFeed(f, range, win, fetchFn)));

  const order = { LIVE: 0, UPCOMING: 1, FINAL: 2 };
  const games = results
    .flatMap((r) => r.games)
    .sort(
      (a, b) =>
        order[a.status] - order[b.status] ||
        (a.status === "FINAL" ? b.start - a.start : a.start - b.start)
    );

  return {
    games,
    error: results.every((r) => !r.ok),
    // Per-sport report. Open /api/scores on your live site to read it.
    feeds: results.map((r) => ({ sport: r.sport, ok: r.ok, count: r.games.length, sources: r.sources })),
  };
}
