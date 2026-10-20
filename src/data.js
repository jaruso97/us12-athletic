// ─────────────────────────────────────────────────────────────────────────────
//  The Great Lakes Sports Podcast — site content
//  Everything you will edit week to week lives in this file.
//  Anything marked SAMPLE is placeholder content: replace it before launch.
// ─────────────────────────────────────────────────────────────────────────────

export const SITE = {
  name: "The Great Lakes Sports Podcast",
  tagline:
    "Analysis, picks and arguments about every Detroit team and the state's biggest college programs.",
  hosts: ["Host 1", "Host 2"], // SAMPLE: put your names here
  // Fill these in as things go live. Anything left "" is hidden or shown as "coming soon".
  links: {
    youtube: "",
    spotify: "",
    apple: "",
    discord: "", // permanent Discord invite link
    membership: "", // Patreon, Stripe payment link, Buy Me a Coffee, etc.
    shop: "", // storefront URL (Shopify, Printful, etc.)
    instagram: "",
    x: "",
  },
  comments: true, // set false to hide the comment box on articles
};

// ── Teams ────────────────────────────────────────────────────────────────────
// color / color2 feed the gradient behind any article or clip that has no photo.
// ink is the text color that reads on top of `color`.
const logo = (league, id) => `https://a.espncdn.com/i/teamlogos/${league}/500/${id}.png`;

export const TEAMS = {
  lions: {
    name: "Lions", full: "Detroit Lions", league: "NFL", category: "lions", emoji: "🦁",
    color: "#0076B6", color2: "#0C2340", ink: "#FFFFFF", logo: logo("nfl", "det"),
  },
  tigers: {
    name: "Tigers", full: "Detroit Tigers", league: "MLB", category: "tigers", emoji: "🐯",
    color: "#FA4616", color2: "#0C2340", ink: "#07121F", logo: logo("mlb", "det"),
  },
  pistons: {
    name: "Pistons", full: "Detroit Pistons", league: "NBA", category: "pistons", emoji: "🏀",
    color: "#1D42BA", color2: "#C8102E", ink: "#FFFFFF", logo: logo("nba", "det"),
  },
  redwings: {
    name: "Red Wings", full: "Detroit Red Wings", league: "NHL", category: "redwings", emoji: "🏒",
    color: "#CE1126", color2: "#5C0A14", ink: "#FFFFFF", logo: logo("nhl", "det"),
  },
  michigan: {
    name: "Michigan", full: "Michigan Wolverines", league: "College", category: "college", emoji: "🎓",
    color: "#00274C", color2: "#0B4F8A", ink: "#FFFFFF", logo: logo("ncaa", "130"),
  },
  msu: {
    name: "Michigan State", full: "Michigan State Spartans", league: "College", category: "college", emoji: "🎓",
    color: "#18453B", color2: "#0B2620", ink: "#FFFFFF", logo: logo("ncaa", "127"),
  },
  default: {
    name: "Great Lakes", full: "Great Lakes Sports", league: "", category: "all", emoji: "🎙️",
    color: "#0C2340", color2: "#0076B6", ink: "#FFFFFF", logo: null,
  },
};

// Filter tabs on the Articles page
export const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "lions", label: "Lions" },
  { id: "tigers", label: "Tigers" },
  { id: "pistons", label: "Pistons" },
  { id: "redwings", label: "Red Wings" },
  { id: "college", label: "College" },
];

// ── Articles ─────────────────────────────────────────────────────────────────
// Articles live in src/articles/, one file per article, and are loaded automatically.
// Each file needs a unique `id` (it becomes the URL: /#/article/<id>) and a `body` array of paragraphs.
// `image` is optional; leave it null and the team logo + colors are used instead.
const RAW_ARTICLES = []; // intentionally empty: articles live in src/articles/

// Newest first, always.
const ADDED = Object.values(import.meta.glob("./articles/*.js", { eager: true, import: "default" })); export const ARTICLES = [...RAW_ARTICLES, ...ADDED].sort((a, b) => new Date(b.date) - new Date(a.date));

// ── Podcast clips ────────────────────────────────────────────────────────────
// Add the YouTube video ID (the part after v= in the URL) and the card becomes playable.
// With youtubeId: null the card shows "Coming soon".
export const CLIPS = [
  { id: "c1", title: "Lions hot takes", team: "lions", episode: "Episode 1", youtubeId: null },
  { id: "c2", title: "Tigers roster debate", team: "tigers", episode: "Episode 1", youtubeId: null },
  { id: "c3", title: "Pistons: real or fake?", team: "pistons", episode: "Episode 1", youtubeId: null },
  { id: "c4", title: "Red Wings goalie talk", team: "redwings", episode: "Episode 1", youtubeId: null },
  { id: "c5", title: "Michigan vs. everyone", team: "michigan", episode: "Episode 1", youtubeId: null },
  { id: "c6", title: "Spartans midseason", team: "msu", episode: "Episode 1", youtubeId: null },
];

// ── Picks ────────────────────────────────────────────────────────────────────
// SAMPLE picks. status: "pending" | "win" | "loss" | "push".
// IMPORTANT: this file ships to every visitor's browser. Do NOT put real
// members-only picks here. For `members: true` entries leave `pick` out and
// deliver the actual pick through your member Discord channel or membership platform.
export const PICKS = [
  {
    id: "p1", date: "2026-10-19", team: "lions", game: "Lions vs. TBD (sample)",
    pick: "Lions -3.5", odds: "-110", units: 1, confidence: "Lean", status: "pending",
    members: false, note: "Sample pick. Replace with your write-up.",
  },
  {
    id: "p2", date: "2026-10-19", team: "pistons", game: "Pistons vs. TBD (sample)",
    pick: "Over 224.5", odds: "-110", units: 1, confidence: "Lean", status: "pending",
    members: false, note: "Sample pick. Replace with your write-up.",
  },
  {
    id: "p3", date: "2026-10-19", team: "tigers", game: "Tigers vs. TBD (sample)",
    odds: "", units: 2, confidence: "Best bet", status: "pending", members: true,
  },
];

// ── Membership ───────────────────────────────────────────────────────────────
// SAMPLE pricing.
export const PLANS = [
  {
    id: "free", name: "Free", price: "$0", period: "forever",
    features: [
      "New articles every week",
      "Podcast clips",
      "Live Michigan scores",
      "Public Discord channels",
    ],
  },
  {
    id: "member", name: "Member", price: "$5", period: "per month", highlight: true,
    features: [
      "Everything in Free",
      "Full picks with write-ups",
      "Member-only Discord channels",
      "Early access to new episodes",
      "Behind-the-scenes content",
      "A promo code for a free Great Lakes Sports Podcast hat",
    ],
  },
];

// ── Merch ────────────────────────────────────────────────────────────────────
// SAMPLE products and prices. `team` only picks the colors behind the product.
// Add `image: "https://..."` for a real photo and `url` for a direct product link.
export const MERCH = [
  { id: "tee", name: "Logo Tee", price: 29.99, category: "Apparel", team: "tigers", badge: "New", image: null, url: "" },
  { id: "hoodie", name: "Logo Hoodie", price: 59.99, category: "Apparel", team: "lions", badge: "", image: null, url: "" },
  { id: "snapback", name: "Snapback Hat", price: 32.99, category: "Headwear", team: "tigers", badge: "", image: null, url: "" },
  { id: "beanie", name: "Winter Beanie", price: 24.99, category: "Headwear", team: "lions", badge: "", image: null, url: "" },
  { id: "mug", name: "Podcast Mug", price: 18.99, category: "Accessories", team: "default", badge: "", image: null, url: "" },
  { id: "stickers", name: "Sticker Pack", price: 8.99, category: "Accessories", team: "redwings", badge: "", image: null, url: "" },
];

// ── Discord ──────────────────────────────────────────────────────────────────
export const CHANNELS = [
  { name: "general", desc: "Hang out with the rest of the community.", members: false },
  { name: "lions-den", desc: "Lions game threads and hot takes.", members: false },
  { name: "tigers-dugout", desc: "Tigers talk, lineup debates, trade rumors.", members: false },
  { name: "pistons-nation", desc: "Pistons game threads.", members: false },
  { name: "wings-fans", desc: "Red Wings talk all season long.", members: false },
  { name: "college-talk", desc: "Michigan, Michigan State and the rest of the state.", members: false },
  { name: "podcast-feedback", desc: "Tell us what to cover next episode.", members: false },
  { name: "picks-room", desc: "Our picks and the reasoning behind them.", members: true },
  { name: "member-lounge", desc: "Behind the scenes with the hosts.", members: true },
];
