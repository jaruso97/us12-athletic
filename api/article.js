export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { title, excerpt, team, city, sport } = req.body;
  if (!title) return res.status(400).json({ error: "Missing title" });

  const API_KEY = process.env.ANTHROPIC_API_KEY;
  if (!API_KEY) return res.status(500).json({ error: "ANTHROPIC_API_KEY not set" });

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-3-5-haiku-20241022",
        max_tokens: 1000,
        messages: [{
          role: "user",
          content: `You are a professional sports journalist. Write a compelling 4-paragraph news article about the ${team.charAt(0).toUpperCase() + team.slice(1)}:

Headline: "${title}"
Context: ${excerpt || ""}

Write in the style of The Athletic — authoritative, with realistic quotes and stats. Paragraph breaks only. Start directly with the story.`
        }]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({ error: data?.error?.message || JSON.stringify(data) });
    }

    if (!data.content || !data.content[0]) {
      return res.status(500).json({ error: "No content returned", raw: JSON.stringify(data) });
    }

    res.status(200).json({ content: data.content[0].text });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
