// Fetches Michigan-team games from ESPN's public scoreboard feed.
// Shared by the Vercel function (api/scores.js) and the browser fallback in hooks.js.
// This is ESPN's unofficial API: it needs no key but can change without notice.

const COLLEGE = /michigan|detroit mercy|oakland golden/i;

export const FEEDS = [
  { sport: "NFL", path: "football/nfl", match: /detroit/i },
  { sport: "MLB", path: "baseball/mlb", match: /detroit/i },
  { sport: "NBA", path: "basketball/nba", match: /detroit/i },
  { sport: "NHL", path: "hockey/nhl", match: /detroit/i },
  { sport: "CFB", path: "football/college-football", match: COLLEGE, extra: "groups=80" },
  { sport: "CBB", path: "basketball/mens-college-basketball", match: COLLEGE, extra: "groups=50" },
];

const ymd = (d) =>
  `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;

export function parseEvent(e, sport, match) {
  const comp = e.competitions?.[0];
  const teams = comp?.competitors ?? [];
  const home = teams.find((c) => c.homeAway === "home");
  const away = teams.find((c) => c.homeAway === "away");
  if (!home || !away) return null;

  const fullName = (c) => c.team?.displayName ?? "";
  if (!match.test(fullName(home)) && !match.test(fullName(away))) return null;

  const st = comp?.status?.type ?? e.status?.type ?? {};
  const off = /POSTPONED|CANCEL|SUSPENDED/i.test(st.name ?? "");
  const status = off ? "UPCOMING" : st.state === "in" ? "LIVE" : st.state === "post" ? "FINAL" : "UPCOMING";

  const side = (c) => ({
    name: fullName(c),
    // ESPN supplies the real abbreviation (DET, CLE, MICH...). Never derive it from the name.
    abbr: c.team?.abbreviation || fullName(c).slice(0, 3).toUpperCase(),
    logo: c.team?.logo || "",
    score: Number(c.score) || 0,
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

  return { id: `${sport}-${e.id}`, sport, status, info, start: start.getTime(), home: side(home), away: side(away) };
}

// Try the full request first. If ESPN rejects it, retry with fewer options, then
// fall back to today's board, so one unsupported option can't blank the whole feed.
async function fetchFeed(feed, range, fetchFn) {
  const base = `https://site.api.espn.com/apis/site/v2/sports/${feed.path}/scoreboard`;
  const extra = feed.extra ? `&${feed.extra}` : "";
  const urls = [
    `${base}?dates=${range}&limit=500${extra}`,
    `${base}?dates=${range}${extra}`,
    `${base}${feed.extra ? `?${feed.extra}` : ""}`,
  ];

  let lastError = "unknown error";
  for (const url of urls) {
    try {
      const res = await fetchFn(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const games = (data.events ?? []).map((e) => parseEvent(e, feed.sport, feed.match)).filter(Boolean);
      return { sport: feed.sport, ok: true, url, games };
    } catch (err) {
      lastError = String(err?.message ?? err);
    }
  }
  return { sport: feed.sport, ok: false, error: lastError, games: [] };
}

export async function fetchMichiganGames(fetchFn = (url) => fetch(url)) {
  const from = new Date();
  from.setDate(from.getDate() - 2);
  const to = new Date();
  to.setDate(to.getDate() + 6);
  const range = `${ymd(from)}-${ymd(to)}`;

  const results = await Promise.all(FEEDS.map((f) => fetchFeed(f, range, fetchFn)));

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
    // Per-feed report. Open /api/scores on your live site to read it.
    feeds: results.map((r) => ({ sport: r.sport, ok: r.ok, count: r.games.length, url: r.url, error: r.error })),
  };
}
