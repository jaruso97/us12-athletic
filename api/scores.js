export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate");

  const API_KEY = process.env.ODDS_API_KEY;
  const debug = req.query.debug === "1";

  const DETROIT_KEYWORDS = ["detroit", "tigers", "pistons", "red wings"];
  const CHICAGO_KEYWORDS = ["chicago", "cubs", "white sox", "bulls", "blackhawks", "bears"];

  const isLocal = (name) =>
    DETROIT_KEYWORDS.some(k => name.toLowerCase().includes(k)) ||
    CHICAGO_KEYWORDS.some(k => name.toLowerCase().includes(k));

  const SPORTS = [
    { key: "americanfootball_nfl", label: "NFL" },
    { key: "basketball_nba",       label: "NBA" },
    { key: "baseball_mlb",         label: "MLB" },
    { key: "icehockey_nhl",        label: "NHL" },
  ];

  try {
    const results = await Promise.allSettled(
      SPORTS.map(async s => {
        const url = `https://api.the-odds-api.com/v4/sports/${s.key}/scores/?apiKey=${API_KEY}&daysFrom=3`;
        const r = await fetch(url);
        const data = await r.json();
        if (!Array.isArray(data)) {
          return { sport: s.label, error: JSON.stringify(data), games: [] };
        }
        return { sport: s.label, games: data.map(g => ({ ...g, sport: s.label })) };
      })
    );

    const sportResults = results
      .filter(r => r.status === "fulfilled")
      .map(r => r.value);

    const allGames = sportResults.flatMap(r => r.games || []);
    const filtered = allGames.filter(g => isLocal(g.home_team) || isLocal(g.away_team));

    if (debug) {
      return res.status(200).json({
        sport_results: sportResults.map(r => ({
          sport: r.sport,
          error: r.error,
          total_games: r.games?.length || 0,
          sample_teams: r.games?.slice(0, 3).map(g => `${g.away_team} @ ${g.home_team}`) || []
        })),
        total_fetched: allGames.length,
        local_matches: filtered.length,
        local_games: filtered.map(g => `${g.away_team} @ ${g.home_team} (${g.sport})`)
      });
    }

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
        home: abbr(g.home_team), away: abbr(g.away_team),
        homeFull: g.home_team, awayFull: g.away_team,
        hs: homeScore ?? 0, as: awayScore ?? 0,
        status, info, sport: g.sport,
      };
    });

    res.status(200).json({ games: formatted, count: formatted.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
