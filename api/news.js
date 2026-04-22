export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate");

  const API_KEY = process.env.NEWS_API_KEY;
  const { city = "all", team = "" } = req.query;

  const queries = {
    all: "Detroit Lions OR Detroit Tigers OR Detroit Pistons OR Detroit Red Wings OR Chicago Bears OR Chicago Bulls OR Chicago Cubs OR Chicago White Sox OR Chicago Blackhawks",
    detroit: "Detroit Lions OR Detroit Tigers OR Detroit Pistons OR \"Detroit Red Wings\"",
    chicago: "Chicago Bears OR Chicago Bulls OR Chicago Cubs OR \"Chicago White Sox\" OR Chicago Blackhawks",
  };

  const q = team
    ? encodeURIComponent(team)
    : encodeURIComponent(queries[city] || queries.all);

  try {
    const url = `https://newsapi.org/v2/everything?q=${q}&language=en&sortBy=publishedAt&pageSize=20&apiKey=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== "ok") {
      return res.status(400).json({ error: data.message || "NewsAPI error" });
    }

    const articles = (data.articles || [])
      .filter(a => a.title && a.url && !a.title.includes("[Removed]"))
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

    res.status(200).json({ articles, total: articles.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
