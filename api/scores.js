export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate");

  const API_KEY = process.env.ODDS_API_KEY;
  const DETROIT = ["Detroit Lions","Detroit Tigers","Detroit Pistons","Detroit Red Wings"];
  const CHICAGO = ["Chicago Bears","Chicago Bulls","Chicago Cubs","Chicago White Sox","Chicago Blackhawks"];

  const SPORTS = [
    { key: "americanfootball_nfl", label: "NFL" },
    { key: "basketball_nba",       label: "NBA" },
    { key: "baseball_mlb",         label: "MLB" },
    { key: "icehockey_nhl",        label: "NHL" },
  ];

  try {
    const results = await Promise.allSettled(
      SPORTS.map(s =>
        fetch(`https://api.the-odds-api.com/v4/sports/${s.key}/scores/?apiKey=${API_KEY}&daysFrom=3`)
          .then(r => r.json())
          .then(games => games.map(g => ({ ...g, sport: s.label })))
      )
    );

    const allGames = results
      .filter(r => r.status === "fulfilled" && Array.isArray(r.value))
      .flatMap(r => r.value);

    const filtered = allGames.filter(g =>
      DETROIT.includes(g.home_team) || DETROIT.includes(g.away_team) ||
      CHICAGO.includes(g.home_team) || CHICAGO.includes(g.away_team)
    );

    const formatted = filtered.map(g => {
      const homeScore = g.scores?.find(s => s.name === g.home_team)?.score ?? null;
      const awayScore = g.scores?.find(s => s.name === g.away_team)?.score ?? null;
      const now = new Date();
      const start = new Date(g.commence_time);
      let status = "UPCOMING";
      let info = start.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
      if (g.completed) { status = "FINAL"; info = "Final"; }
      else if (now > start && !g.completed) { status = "LIVE"; info = "Live"; }

      const abbr = name => name.split(" ").pop().slice(0, 3).toUpperCase();
      return {
        home: abbr(g.home_team),
        away: abbr(g.away_team),
        homeFull: g.home_team,
        awayFull: g.away_team,
        hs: homeScore ?? 0,
        as: awayScore ?? 0,
        status,
        info,
        sport: g.sport,
      };
    });

    res.status(200).json({ games: formatted, count: formatted.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
