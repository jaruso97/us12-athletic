export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate");

  const DETROIT_KEYWORDS = ["detroit", "tigers", "pistons", "red wings", "lions"];
  const CHICAGO_KEYWORDS = ["chicago", "cubs", "white sox", "bulls", "blackhawks", "bears"];

  const isLocal = (name = "") =>
    DETROIT_KEYWORDS.some(k => name.toLowerCase().includes(k)) ||
    CHICAGO_KEYWORDS.some(k => name.toLowerCase().includes(k));

  const SPORTS = [
    { key: "basketball/nba",   label: "NBA" },
    { key: "baseball/mlb",     label: "MLB" },
    { key: "hockey/nhl",       label: "NHL" },
    { key: "football/nfl",     label: "NFL" },
  ];

  const parseGame = (e, label) => {
    const comp = e.competitions?.[0];
    if (!comp) return null;

    const home = comp.competitors?.find(c => c.homeAway === "home");
    const away = comp.competitors?.find(c => c.homeAway === "away");
    if (!home || !away) return null;

    const homeName = home.team?.displayName || home.team?.shortDisplayName || home.team?.name || "";
    const awayName = away.team?.displayName || away.team?.shortDisplayName || away.team?.name || "";

    if (!isLocal(homeName) && !isLocal(awayName)) return null;

    // Robust status detection — handle all ESPN state formats
    const statusType = comp.status?.type || {};
    const statusState = statusType.state || "";
    const completed = statusType.completed === true || statusType.name === "STATUS_FINAL";
    const inProgress = statusState === "in" || statusType.name === "STATUS_IN_PROGRESS" || statusType.name === "STATUS_HALFTIME";
    const shortDetail = statusType.shortDetail || statusType.detail || "";

    let gameStatus = "UPCOMING";
    let info = "";

    if (completed) {
      gameStatus = "FINAL";
      info = shortDetail || "Final";
    } else if (inProgress) {
      gameStatus = "LIVE";
      info = shortDetail || "Live";
    } else {
      gameStatus = "UPCOMING";
      // Format game time nicely
      try {
        const d = new Date(e.date);
        info = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: "America/New_York" }) + " ET";
      } catch {
        info = statusType.shortDetail || "TBD";
      }
    }

    const abbr = name => {
      const words = name.trim().split(" ");
      return words[words.length - 1].slice(0, 3).toUpperCase();
    };

    return {
      home: abbr(homeName),
      away: abbr(awayName),
      homeFull: homeName,
      awayFull: awayName,
      hs: parseInt(home.score) || 0,
      as: parseInt(away.score) || 0,
      status: gameStatus,
      info,
      sport: label,
    };
  };

  try {
    const results = await Promise.allSettled(
      SPORTS.map(async ({ key, label }) => {
        const url = `https://site.api.espn.com/apis/site/v2/sports/${key}/scoreboard`;
        const r = await fetch(url, {
          headers: { "User-Agent": "Mozilla/5.0 (compatible; US12Athletic/1.0)" }
        });
        if (!r.ok) return [];
        const data = await r.json();
        const events = data?.events || [];
        return events.map(e => parseGame(e, label)).filter(Boolean);
      })
    );

    const games = results
      .filter(r => r.status === "fulfilled")
      .flatMap(r => r.value || []);

    // Sort: LIVE first, then FINAL, then UPCOMING
    games.sort((a, b) => {
      const order = { LIVE: 0, FINAL: 1, UPCOMING: 2 };
      return (order[a.status] ?? 3) - (order[b.status] ?? 3);
    });

    res.status(200).json({ games, count: games.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
