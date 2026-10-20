import { createContext, useContext, useEffect, useState } from "react";
import { fetchMichiganGames } from "./scoresCore.js";

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

// ── Live scores ──────────────────────────────────────────────────────────────
// One fetch shared by the ticker, sidebar and Scores page. We ask our own cached
// endpoint (api/scores.js on Vercel) first. If that isn't available, for example
// when running locally with `npm run dev`, we ask ESPN directly from the browser.
async function loadScores() {
  try {
    const res = await fetch("/api/scores");
    const isJson = (res.headers.get("content-type") ?? "").includes("application/json");
    if (res.ok && isJson) {
      const data = await res.json();
      if (Array.isArray(data.games) && !data.error) return data;
    }
  } catch {
    /* fall through to the direct request */
  }
  const data = await fetchMichiganGames();
  // Open the browser console (F12) to see which score feeds worked.
  console.info("[scores] direct from ESPN:", data.feeds);
  return data;
}

export function useScoresData() {
  const [state, setState] = useState({ games: [], loading: true, error: false, updated: null });
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    loadScores()
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
