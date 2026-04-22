export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { title, excerpt, team, city, sport } = req.body;
  if (!title) return res.status(400).json({ error: "Missing title" });

  const API_KEY = process.env.ANTHROPIC_API_KEY;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        messages: [{
          role: "user",
          content: `You are a professional sports journalist. Write a compelling 4-paragraph news article for this story about the ${team.charAt(0).toUpperCase() + team.slice(1)}:

Headline: "${title}"
Context: ${excerpt || ""}
City: ${city === "detroit" ? "Detroit" : "Chicago"}
Sport: ${sport}

Write in the style of The Athletic or ESPN — authoritative, detailed, with invented but realistic player quotes, specific stats, and expert context. Use paragraph breaks. No headers or bullets. Start directly with the story.`
        }]
      })
    });

    const data = await response.json();
    if (data.error) return res.status(500).json({ error: data.error.message });
    res.status(200).json({ content: data.content[0].text });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
