import { createContext, useContext, useEffect, useState } from "react";

// ── App-wide context (theme, saved articles, live scores) ────────────────────
export const AppCtx = createContext(null);
export const useApp = () => useContext(AppCtx);

// ── localStorage-backed state ────────────────────────────────────────────────
// `key` must not change for the life of a component instance.
export function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw === null ? initial : JSON.parse(raw);
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage unavailable (private mode or quota): the value just won't persist */
    }
  }, [key, value]);

  return [value, setValue];
}

// ── Hash routing ─────────────────────────────────────────────────────────────
// URLs look like  https://yoursite.com/#/article/lions-mailbag
// Works on any static host with no server rewrite rules, and the browser's
// Back / Forward buttons behave normally.
function safeDecode(part) {
  try {
    return decodeURIComponent(part);
  } catch {
    return part;
  }
}

const readHash = () =>
  window.location.hash
    .replace(/^#\/?/, "")
    .split("?")[0]
    .split("/")
    .filter(Boolean)
    .map(safeDecode);

export function useRoute() {
  const [parts, setParts] = useState(readHash);
  useEffect(() => {
    const onChange = () => setParts(readHash());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return parts;
}

export const articleUrl = (id) =>
  `${window.location.origin}${window.location.pathname}#/article/${id}`;

// ── Formatting ───────────────────────────────────────────────────────────────
export function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// "Just now", "5m ago", "3h ago", "2d ago", then a plain date.
export function timeAgo(ts) {
  const s = Math.max(0, Math.floor((Date.now() - ts) / 1000));
  if (s < 60) return "Just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d}d ago`;
  return new Date(ts).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    /* fall through to the legacy path */
  }
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  } catch {
    return false;
  }
}

// ── Live scores (ESPN's public scoreboard feed) ──────────────────────────────
// One fetch shared by the ticker, sidebar and Scores page. This is ESPN's
// unofficial API: it needs no key but can change without notice.
const COLLEGE = /michigan|detroit mercy|oakland golden/i;
const FEEDS = [
  { sport: "NFL", path: "football/nfl", match: /detroit/i },
  { sport: "MLB", path: "baseball/mlb", match: /detroit/i },
  { sport: "NBA", path: "basketball/nba", match: /detroit/i },
  { sport: "NHL", path: "hockey/nhl", match: /detroit/i },
  { sport: "CFB", path: "football/college-football", match: COLLEGE, extra: "&groups=80" },
  { sport: "CBB", path: "basketball/mens-college-basketball", match: COLLEGE, extra: "&groups=50" },
];

const ymd = (d) =>
  `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;

function parseEvent(e, sport, match) {
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

async function fetchMichiganGames() {
  const from = new Date();
  from.setDate(from.getDate() - 1);
  const to = new Date();
  to.setDate(to.getDate() + 6);
  const range = `${ymd(from)}-${ymd(to)}`;

  const results = await Promise.allSettled(
    FEEDS.map(async (f) => {
      const url = `https://site.api.espn.com/apis/site/v2/sports/${f.path}/scoreboard?dates=${range}&limit=500${f.extra ?? ""}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`ESPN ${res.status}`);
      const data = await res.json();
      return (data.events ?? []).map((e) => parseEvent(e, f.sport, f.match)).filter(Boolean);
    })
  );

  const ok = results.filter((r) => r.status === "fulfilled");
  const order = { LIVE: 0, UPCOMING: 1, FINAL: 2 };
  const games = ok
    .flatMap((r) => r.value)
    .sort(
      (a, b) =>
        order[a.status] - order[b.status] ||
        (a.status === "FINAL" ? b.start - a.start : a.start - b.start)
    );

  return { games, error: ok.length === 0 };
}

export function useScoresData() {
  const [state, setState] = useState({ games: [], loading: true, error: false, updated: null });
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetchMichiganGames()
      .then(({ games, error }) => {
        if (!cancelled) setState({ games, loading: false, error, updated: new Date() });
      })
      .catch(() => {
        if (!cancelled) setState((s) => ({ ...s, loading: false, error: true }));
      });
    return () => {
      cancelled = true;
    };
  }, [tick]);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 60000);
    return () => clearInterval(id);
  }, []);

  return { ...state, refresh: () => setTick((t) => t + 1) };
}
