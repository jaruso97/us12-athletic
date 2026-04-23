export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate");

  const DETROIT_KEYWORDS = ["detroit", "tigers", "pistons", "red wings", "lions"];
  const CHICAGO_KEYWORDS = ["chicago", "cubs", "white sox", "bulls", "blackhawks", "bears"];

  const isLocal = (name = "") =>
    DETROIT_KEYWORDS.some(k => name.toLowerCase().includes(k)) ||
    CHICAGO_KEYWORDS.some(k => name.toLowerCase().includes(k));

  const SPORTS = [
    { key: "basketball/nba",         label: "NBA" },
    { key: "baseball/mlb",           label: "MLB" },
    { key: "hockey/nhl",             label: "NHL" },
    { key: "football/nfl",           label: "NFL" },
  ];

  try {
    const results = await Promise.allSettled(
      SPORTS.map(async ({ key, label }) => {
        const url = `https://site.api.espn.com/apis/site/v2/sports/${key}/scoreboard`;
        const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
        const data = await r.json();
        const events = data?.events || [];
        return events.map(e => {
          const comp = e.competitions?.[0];
          const home = comp?.competitors?.find(c => c.homeAway === "home");
          const away = comp?.competitors?.find(c => c.homeAway === "away");
          const status = comp?.status?.type;
          const homeName = home?.team?.displayName || home?.team?.name || "";
          const awayName = away?.team?.displayName || away?.team?.name || "";

          let gameStatus = "UPCOMING";
          let info = e.date ? new Date(e.date).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }) : "TBD";

          if (status?.completed) {
            gameStatus = "FINAL";
            info = "Final";
          } else if (status?.state === "in") {
            gameStatus = "LIVE";
            info = comp?.status?.type?.shortDetail || "Live";
          } else if (status?.state === "pre") {
            gameStatus = "UPCOMING";
            info = e.date ? new Date(e.date).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }) : "TBD";
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
            hs: parseInt(home?.score) || 0,
            as: parseInt(away?.score) || 0,
            status: gameStatus,
            info,
            sport: label,
          };
        }).filter(g => isLocal(g.homeFull) || isLocal(g.awayFull));
      })
    );

    const games = results
      .filter(r => r.status === "fulfilled")
      .flatMap(r => r.value || []);

    res.status(200).json({ games, count: games.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
