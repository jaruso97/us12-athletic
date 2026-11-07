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
       discord: "https://discord.gg/bPSm4WfdCU", // permanent Discord invite link
    membership: "", // Patreon, Stripe payment link, Buy Me a Coffee, etc.
    shop: "https://greatlakessportspod.myshopify.com/", // storefront URL (Shopify, Printful, etc.)
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
export const CLIPS = [];

// ── Picks ────────────────────────────────────────────────────────────────────
// Set host to "joey" or "gino" to show the pick in that host’s column.
// Pick status: "pending" | "win" | "loss" | "push".
// IMPORTANT: this file ships to every visitor's browser. Do NOT put real
// members-only picks here. For `members: true` entries leave `pick` out and
// deliver the actual pick through your member Discord channel or membership platform.
export const PICKS = [
  {
    "id": "joey-lions-dolphins-2026-11-08",
    "host": "joey",
    "date": "2026-11-08",
    "team": "lions",
    "game": "Detroit Lions at Miami Dolphins",
    "pick": "Six-leg same-game parlay",
    "note": "FanDuel · $10 stake, $174.26 total payout.",
    "status": "pending",
    "members": false,
    "legs": [
      {
        "pick": "Jameson Williams anytime touchdown",
        "note": "Jamo is on a tear. He has five touchdown catches in his last three games, including the go-ahead score against Minnesota."
      },
      {
        "pick": "Jameson Williams over 52.5 receiving yards",
        "note": "Williams had 91 yards against Green Bay and 70 against Minnesota. He’s averaging 16.2 yards per catch this season and has cleared this line in three of seven games."
      },
      {
        "pick": "Amon-Ra St. Brown 6+ receptions",
        "note": "St. Brown has caught at least six passes in six of seven games, including nine against Green Bay and seven against Minnesota."
      },
      {
        "pick": "Jared Goff over 261.5 passing yards",
        "note": "Goff is averaging 280.6 passing yards and has cleared this line in five of seven games. Detroit won against Minnesota with 176 passing yards from Goff and 230 on the ground, so a run-heavy game makes this leg tougher."
      },
      {
        "pick": "Jahmyr Gibbs anytime touchdown",
        "note": "Gibbs has eight rushing touchdowns through seven games, including a 30-yard score against Minnesota."
      },
      {
        "pick": "Jahmyr Gibbs over 98.5 rushing yards",
        "note": "Gibbs has cleared this line in five of seven games, including three straight with 151, 116, and 153 yards. He had at least 23 carries in each of those three games."
      }
    ]
  },
  {
    "id": "gino-michigan-msu-2026-11-07",
    "host": "gino",
    "date": "2026-11-07",
    "team": "michigan",
    "game": "Michigan vs. Michigan State",
    "pick": "Six-leg same-game parlay",
    "note": "FanDuel · $10 stake, $128 total payout.",
    "status": "pending",
    "members": false,
    "legs": [
      {
        "pick": "Michigan moneyline (-720)"
      },
      {
        "pick": "Tommy Carr 200+ passing yards (-122)",
        "note": "Carr threw for 167 yards against Indiana and 266 against Rutgers, an average of 216.5 yards in his first two starts."
      },
      {
        "pick": "Michigan over 144.5 rushing yards",
        "note": "Over the last five games, Michigan State has allowed 169.2 rushing yards per game, while Michigan has averaged 132.2. Gino likes Michigan’s chances with Savion Hiter, Jordan Marshall and the possibility of Carr adding yards on the ground."
      },
      {
        "pick": "JJ Buchanan anytime touchdown",
        "note": "Buchanan has been a go-to target all season, and Carr found him for a touchdown against Rutgers."
      },
      {
        "pick": "JJ Buchanan over 4.5 receptions",
        "note": "Buchanan has had fewer than four catches just once in his last five games. He caught 11 passes across Carr’s first two starts."
      },
      {
        "pick": "Over 39.5 total points",
        "note": "Michigan State’s last five games averaged 47.2 total points, or 40.2 excluding the overtime game against Illinois. Michigan’s last five averaged 36. Gino sees a path to 40 with Michigan favored by 14.5."
      }
    ]
  }
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
// Shopify product listings. `team` only picks the colors behind the product.
// Add `image: "https://..."` for a real photo and `url` for a direct product link.
export const MERCH = [
  {
    "id": "garment-dyed-heavyweight-long-sleeve-shirt",
    "name": "Garment-Dyed Heavyweight Long-Sleeve Shirt",
    "category": "Apparel",
    "team": "default",
    "image": "https://cdn.shopify.com/s/files/1/0717/7722/2740/files/unisex-garment-dyed-heavyweight-long-sleeve-shirt-black-front-6aeea517bfa45.jpg?v=1794024743",
    "url": "https://greatlakessportspod.myshopify.com/products/garment-dyed-heavyweight-long-sleeve-shirt"
  },
  {
    "id": "can-cooler",
    "name": "Can Cooler",
    "category": "Accessories",
    "team": "default",
    "image": "https://cdn.shopify.com/s/files/1/0717/7722/2740/files/can-cooler-white-regular-12-oz-front-6aee350dca00c.jpg?v=1793996071",
    "url": "https://greatlakessportspod.myshopify.com/products/can-cooler"
  },
  {
    "id": "cuffed-beanie",
    "name": "Cuffed Beanie",
    "category": "Headwear",
    "team": "default",
    "image": "https://cdn.shopify.com/s/files/1/0717/7722/2740/files/cuffed-beanie-navy-front-6aee33ff42a81.jpg?v=1793995790",
    "url": "https://greatlakessportspod.myshopify.com/products/cuffed-beanie"
  },
  {
    "id": "foam-trucker-hat",
    "name": "Foam Trucker Hat",
    "category": "Headwear",
    "team": "default",
    "image": "https://cdn.shopify.com/s/files/1/0717/7722/2740/files/foam-trucker-hat-black-one-size-front-6aee320da6941.jpg?v=1793995297",
    "url": "https://greatlakessportspod.myshopify.com/products/foam-trucker-hat"
  },
  {
    "id": "unisex-hoodie",
    "name": "Unisex Hoodie",
    "category": "Apparel",
    "team": "default",
    "image": "https://greatlakessportspod.myshopify.com/cdn/shop/files/unisex-heavy-blend-hoodie-black-front-6aee4a32e2182.jpg?v=1794001469&width=1024",
    "url": "https://greatlakessportspod.myshopify.com/products/unisex-hoodie"
  },
  {
    "id": "unisex-t-shirt",
    "name": "Unisex T-Shirt",
    "category": "Apparel",
    "team": "default",
    "image": "https://greatlakessportspod.myshopify.com/cdn/shop/files/unisex-staple-t-shirt-black-heather-front-6aee49aba5de2.jpg?v=1794001329&width=1024",
    "url": "https://greatlakessportspod.myshopify.com/products/unisex-t-shirt"
  }
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
