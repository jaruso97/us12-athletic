export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate");

  // ESPN free news API — always current, no API key needed
  const SOURCES = [
    { url: "https://site.api.espn.com/apis/site/v2/sports/football/nfl/news?team=det&limit=6",  sport: "NFL", team: "Lions"     },
    { url: "https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/news?team=det&limit=6",  sport: "MLB", team: "Tigers"    },
    { url: "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/news?team=det&limit=6",sport: "NBA", team: "Pistons"   },
    { url: "https://site.api.espn.com/apis/site/v2/sports/hockey/nhl/news?team=det&limit=6",    sport: "NHL", team: "Red Wings" },
    { url: "https://site.api.espn.com/apis/site/v2/sports/football/college-football/news?team=130&limit=4", sport: "CFB", team: "Michigan" },
    { url: "https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/news?team=130&limit=4", sport: "CBB", team: "Michigan" },
  ];

  try {
    const results = await Promise.allSettled(
      SOURCES.map(async (src) => {
        const r = await fetch(src.url, {
          headers: { "User-Agent": "Mozilla/5.0" }
        });
        const data = await r.json();
        const items = data?.articles || [];

        return items.slice(0, 5).map(a => ({
          id: String(a.id || Math.random()),
          title: a.headline || a.title || "",
          excerpt: a.description || a.story?.slice(0, 200) || "",
          author: a.byline || `ESPN ${src.sport}`,
          source: "ESPN",
          url: a.links?.web?.href || a.links?.app?.href || "https://espn.com",
          image: a.images?.[0]?.url || null,
          time: a.published || a.lastModified || new Date().toISOString(),
          publishedAt: a.published || a.lastModified || new Date().toISOString(),
          sport: src.sport,
          team: src.team,
        })).filter(a => a.title);
      })
    );

    const allArticles = results
      .filter(r => r.status === "fulfilled")
      .flatMap(r => r.value || []);

    // Sort by publish date, newest first
    allArticles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

    // If ESPN returns nothing (off-season), fall back to NewsAPI
    if (allArticles.length === 0) {
      const API_KEY = process.env.NEWS_API_KEY;
      if (API_KEY) {
        const q = encodeURIComponent("Detroit Lions OR Detroit Tigers OR Detroit Pistons OR Detroit Red Wings OR Michigan Wolverines OR Michigan Spartans");
        const r = await fetch(`https://newsapi.org/v2/everything?q=${q}&language=en&sortBy=publishedAt&pageSize=15&apiKey=${API_KEY}`);
        const data = await r.json();
        const fallback = (data.articles || [])
          .filter(a => a.title && !a.title.includes("[Removed]"))
          .map(a => ({
            id: Buffer.from(a.url).toString("base64").slice(0, 20),
            title: a.title,
            excerpt: a.description || "",
            author: a.author || a.source?.name || "Staff Writer",
            source: a.source?.name || "News",
            url: a.url,
            image: a.urlToImage || null,
            time: a.publishedAt,
            publishedAt: a.publishedAt,
          }));
        return res.status(200).json({ articles: fallback, source: "newsapi" });
      }
    }

    res.status(200).json({ articles: allArticles, total: allArticles.length, source: "espn" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
