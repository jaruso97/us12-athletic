// Vercel serverless function: GET /api/scores
// Fetches ESPN once on the server and lets Vercel's CDN cache the answer for 30 seconds,
// so every visitor shares one copy and nothing depends on the visitor's browser or network.
import { fetchMichiganGames } from "../src/scoresCore.js";

export default async function handler(req, res) {
  try {
    const data = await fetchMichiganGames();
    res.setHeader("Cache-Control", "public, s-maxage=30, stale-while-revalidate=60");
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ games: [], error: true, message: String(err?.message ?? err) });
  }
}
