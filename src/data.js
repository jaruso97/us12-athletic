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
// SAMPLE articles. To publish a new one, copy an entry, give it a unique `id`
// (it becomes the URL: /#/article/<id>), and write the body as an array of paragraphs.
// `image` is optional; leave it null and the team logo + colors are used instead.
const RAW_ARTICLES = [
  {
    id: "michigan-underwood-carr-indiana-preview",
    team: "michigan",
    title: "Elite Defense, Broken Offense: Is Bryce Underwood a Bust, and Can Tommy Carr Save Michigan’s Season?",
    excerpt: "Michigan’s defense is elite, but the offense keeps stalling. We look at whether Bryce Underwood is a bust and whether Tommy Carr can spark the Wolverines against Indiana.",
    author: "Great Lakes Sports Podcast",
    date: "2026-10-20T12:00:00-04:00",
    readTime: "5 min",
    featured: false,
    image: null,
    tags: ["Michigan", "College Football", "Bryce Underwood", "Tommy Carr"],
    body: [
      "Michigan fans have lived through a lot in the first year of the Kyle Whittingham era. The Wolverines are 4-2 overall and just got their first Big Ten win of the season, but the way they got there tells you everything about where this team is. A freshman quarterback with a famous last name came off the bench at halftime to save the day, and the former No. 1 recruit in the country watched from the sideline. Now Indiana comes to the Big House on Saturday at noon ET on FOX, and the biggest question in Ann Arbor is who takes the first snap.",
      "## The offense: a season of stalled drives",
      "Let’s start with the problem. Through the first five games, Michigan failed to reach 20 points in four of them. The low point was a 20-14 loss at Minnesota, where the Wolverines managed just 180 total yards and one offensive touchdown. Three second-half turnovers left them with only two plays in the entire third quarter. After that game, Whittingham said the team was far from where it needs to be.",
      "The turnover problem has been the common thread. Whittingham himself called turnover margin the team’s big demise. Against Minnesota, Michigan ran just 49 plays to the Gophers’ 65, so the offense couldn’t find any rhythm and the defense was stuck on the field. The week before, the Wolverines gained over 400 yards in a heartbreaking 20-19 loss to Iowa, which showed what this offense can do when it protects the ball.",
      "Penn State was more of the same, at least for a half. Michigan had just 80 total yards and no points before halftime.",
      "## The defense: the bright spot that keeps getting wasted",
      "Here’s the twist for anyone expecting a two-sided mess: the defense has been excellent. Michigan ranked third nationally in total defense at one point, giving up just 241.4 yards per game, and hadn’t allowed more than 14 points in any half this season. Defensive coordinator Jay Hill’s group has put the offense in position to win game after game.",
      "That said, it hasn’t been perfect. Against Iowa, Michigan led 19-14 late before the Hawkeyes drove 91 yards and scored the winning touchdown on the final play. Whittingham has also said the defense has to create more takeaways. A great defense can only carry a team so far when the offense keeps handing the ball back.",
      "## The Bryce Underwood question",
      "This is the hard part to write, but it’s the conversation every Michigan fan is having. Underwood was the top-ranked recruit in the 2025 class, a flip from LSU that was one of the biggest recruiting upsets in recent memory. He reportedly made $10.5 million in NIL money last year.",
      "The production hasn’t matched the price tag. As a freshman he threw for 2,428 yards, 11 touchdowns, and nine interceptions, ranking 12th out of 17 qualifying Big Ten quarterbacks in passer rating. His season ended with a three-interception performance in a bowl loss to Texas. This year opened with a 13-12 escape against Western Michigan that needed a controversial Hail Mary to survive. After that game, Whittingham said Underwood’s job was “not something that’s infinite.”",
      "Then came Penn State. Underwood went 5 of 11 for 43 yards with two interceptions in a scoreless first half, and Whittingham pulled him at halftime. He was also 10 of 21 for 101 yards and two interceptions in the Minnesota loss, so this wasn’t a one-week blip.",
      "So is he a bust? It’s too early to say that for good, and there are fair counterpoints. He’s only a sophomore. Whittingham has pointed out that he was an 18-year-old starter without a dedicated quarterback coach. Urban Meyer has said the issue is spatial awareness and working through progressions, which is a normal learning curve. And not every interception was his fault, since one against Penn State bounced off a receiver and another was a highlight-reel catch by a defender.",
      "But the warning signs are real. When you pay a quarterback like a franchise player, “he’s still learning” gets harder to say with a straight face. If Underwood doesn’t turn a corner, the “bust” label will get louder.",
      "## Enter Tommy Carr",
      "Carr, a 6-foot-4 true freshman from Saline, is the grandson of Lloyd Carr and the younger brother of Notre Dame quarterback CJ Carr. He took over at halftime against Penn State and the offense came alive. Michigan put up 220 yards and three touchdowns in the second half without a turnover. Carr was efficient, going 5 of 7 for 47 yards, and his legs made a real difference, including the 12-yard keeper that put the game away with under three minutes left. Whittingham praised him as smooth and efficient.",
      "Here’s the caution: it was a small sample, and ESPN noted that each of his three touchdown drives came after a Penn State turnover. Seven passes is not a body of work. But for a team that has been starved for a spark, the mobility and the lack of mistakes are exactly what this offense has been missing.",
      "Whittingham hasn’t announced who will start against Indiana, only that the decision has been made and he won’t tip his hand to the Hoosiers.",
      "## What the rest of the season could look like",
      "The path isn’t easy. After defending national champion Indiana, Michigan visits Rutgers on Halloween, then hosts Michigan State, travels to Oregon, hosts UCLA, and closes at Ohio State on Nov. 28. But with a top-tier defense, a lot of this season comes down to one thing: if the quarterback can protect the football, this team can beat a lot of people. Carr’s ability to make plays with his legs gives the offense a dimension it hasn’t had, and a clean, turnover-free offense paired with this defense could still salvage a strong finish.",
    ],
  },
  {
    id: "lions-bye-week-packers-preview",
    team: "lions",
    title: "Rested, Rolling, and Still Leaky: What to Expect from the Lions Off the Bye vs. the Packers",
    excerpt: "Detroit is 3-2 off the bye with one of the league’s best offenses and one of its worst defenses. Here’s what to expect against the Packers on Sunday.",
    author: "Great Lakes Sports Podcast",
    date: "2026-10-20T09:00:00-04:00",
    readTime: "4 min",
    featured: true,
    image: null,
    tags: ["Lions", "NFL", "Packers", "Preview"],
    body: [
      "The Lions are back at Ford Field this Sunday, Oct. 25, at 3:25 PM ET after a much-needed bye. Detroit is 3-2 and hosting a Green Bay team that has quietly won three straight. It’s a divisional game with real standings implications, and the Lions arrive as the league’s most fun contradiction: one of the best offenses in football and one of the worst defenses.",
      "## A season of ups and downs",
      "The Lions’ record tells the story of their year. They opened with a 31-30 overtime win over New Orleans and have alternated losses and wins since. They got dominated at Buffalo, hung on against the Jets, and played poorly in a loss at Carolina, then went into the bye with their best performance of the season, a 45-21 win at Arizona.",
      "## The offense: elite, and it isn’t close",
      "If you’re looking for the reason Detroit is still in the thick of the NFC North, start here. The Lions and Bills lead the league in scoring at 32.8 points per game.",
      "Jared Goff has been spotless. He has 12 touchdown passes with no interceptions through five games, a feat only Russell Wilson (2019) had matched. Then there’s Jahmyr Gibbs. Detroit is the first team to have a quarterback with 1,400 passing yards and 12 touchdowns alongside a running back with 500 rushing yards and seven rushing scores through five games. Gibbs is also a real threat as a receiver, and Amon-Ra St. Brown, Jameson Williams, and Sam LaPorta give Goff plenty of options when defenses stack the box to stop him.",
      "Defenses can’t commit to stopping just one thing, and that’s what makes this offense so hard to slow down.",
      "## The defense: ugly numbers, but a pulse",
      "This is the side of the ball that keeps fans up at night. Detroit allows a league-high 404.4 yards per game and ranks third-worst in scoring defense at 29.6 points per game. A big part of the problem has been the secondary. Both starting safeties, Brian Branch and Kerby Joseph, opened the season on the PUP list, and through four games Detroit ranked last against the pass.",
      "There are signs of life, though. The Lions have 20 sacks, their most through five games in a season, with four players at three or more. And against Arizona, the unit looked like a different group. Goff said the defense’s energy created short fields that the offense turned into points.",
      "## The bye week helps, with a catch",
      "The timing is good. Safety Brian Branch and center Cade Mays are both expected back this week, but they’ll be on snap counts. Branch’s return helps a secondary that badly needs him, and Mays steadies the interior of the offensive line. Neither will be a full-time player right away, so depth will matter. The bye gave Detroit time to ease them back in, and Dan Campbell said the early timing of the week off bought them the chance to get a couple of guys back.",
      "## The Packers are no pushover, but they’re missing key defenders",
      "Green Bay is 4-2 and playing better than their start suggested. They lost their home opener 35-14 to Atlanta, but they’ve since rebounded with a 31-7 win over Chicago and a 17-14 win over Tampa Bay, and most recently a 23-13 Sunday night win over Dallas.",
      "Jordan Love threw for 276 yards and a touchdown against the Cowboys, and the Christian Watson and Matthew Golden duo is quickly emerging as one of the NFL’s best receiving tandems. Detroit’s secondary will have its hands full, even with Branch back. The Packers’ weak spot is the ground game, which remains the sore spot on offense that must improve.",
      "The big storyline is who won’t be on the field. Micah Parsons is out, and Green Bay also lost defensive tackle Javon Hargrave for the season. Last Thanksgiving, Parsons recorded 2.5 sacks in a 31-24 Packers win over Detroit, so his absence is a big break for a Lions offensive line that was already getting a boost from Mays.",
      "## What to expect Sunday",
      "Here’s what we’ll be watching:",
      "- Can the defense carry over the Arizona energy? One great game doesn’t fix a unit, but Branch’s return, even on a snap count, and a rising pass rush give Detroit a real chance to compete.",
      "- Goff with time to throw. With Parsons and Hargrave out, Green Bay’s front is much less threatening, and a clean pocket for Goff could mean a big day.",
      "- Detroit’s pass rush against Green Bay’s run game. If the Packers can’t run, they become one-dimensional, and that plays right into the Lions’ strength up front.",
      "- Watson and Golden against a thin secondary. Branch’s limited snaps mean someone else will be covering these two for much of the game, and that’s where Green Bay can hurt Detroit.",
    ],
  },
  {
    id: "lions-mailbag",
    team: "lions",
    title: "Lions Mailbag: Your Questions, Our Answers",
    excerpt: "Sample article. A fan mailbag works well as a recurring weekly piece.",
    author: "Host 2",
    date: "2026-10-16T09:00:00-04:00",
    readTime: "5 min",
    image: null,
    tags: ["Lions", "Mailbag"],
    body: ["Sample article. Replace this text with your own."],
  },
  {
    id: "tigers-roster-check-in",
    team: "tigers",
    title: "Tigers Roster Check-In",
    excerpt: "Sample article. Who is on the roster bubble and who is locked in.",
    author: "Host 1",
    date: "2026-10-18T09:00:00-04:00",
    readTime: "4 min",
    image: null,
    tags: ["Tigers", "MLB"],
    body: ["Sample article. Replace this text with your own."],
  },
  {
    id: "tigers-matchups-that-matter",
    team: "tigers",
    title: "Tigers Series Preview: Matchups That Matter",
    excerpt: "Sample article. Pitching and lineup matchups for the next series.",
    author: "Host 2",
    date: "2026-10-14T09:00:00-04:00",
    readTime: "3 min",
    image: null,
    tags: ["Tigers", "Preview"],
    body: ["Sample article. Replace this text with your own."],
  },
  {
    id: "pistons-keys-to-the-night",
    team: "pistons",
    title: "Pistons Game Preview: Keys to the Night",
    excerpt: "Sample article. What Detroit has to do to win tonight.",
    author: "Host 1",
    date: "2026-10-17T09:00:00-04:00",
    readTime: "3 min",
    image: null,
    tags: ["Pistons", "NBA", "Preview"],
    body: ["Sample article. Replace this text with your own."],
  },
  {
    id: "red-wings-weekly",
    team: "redwings",
    title: "Red Wings Weekly: Lines, Goaltending and the Standings",
    excerpt: "Sample article. A weekly check-in on where Detroit stands.",
    author: "Host 2",
    date: "2026-10-15T09:00:00-04:00",
    readTime: "4 min",
    image: null,
    tags: ["Red Wings", "NHL"],
    body: ["Sample article. Replace this text with your own."],
  },
  {
    id: "michigan-saturday-watchlist",
    team: "michigan",
    title: "Michigan Football: What We're Watching This Saturday",
    excerpt: "Sample article. The matchups and storylines for the weekend.",
    author: "Host 1",
    date: "2026-10-17T12:00:00-04:00",
    readTime: "4 min",
    image: null,
    tags: ["Michigan", "College Football"],
    body: ["Sample article. Replace this text with your own."],
  },
  {
    id: "msu-midseason-check-in",
    team: "msu",
    title: "Michigan State Midseason Check-In",
    excerpt: "Sample article. What is working in East Lansing and what is not.",
    author: "Host 2",
    date: "2026-10-13T12:00:00-04:00",
    readTime: "4 min",
    image: null,
    tags: ["Michigan State", "College"],
    body: ["Sample article. Replace this text with your own."],
  },
];

// Newest first, always.
export const ARTICLES = [...RAW_ARTICLES].sort((a, b) => new Date(b.date) - new Date(a.date));

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
      "Behind-the-scenes content", "A promo code for a free Great Lakes Sports Podcast hat",
    ],
  },
];

// ── Merch ────────────────────────────────────────────────────────────────────
// SAMPLE products and prices. `team` only picks the colors behind the product.
// Add `image: "https://..."` for a real photo and `url` for a direct product link.
export const MERCH = [
  { id: "tee", name: "Logo Tee", price: 29.99, category: "Apparel", team: "tigers", badge: "New", image: null, url: "" },
  { id: "hoodie", name: "Logo Hoodie", price: 59.99, category: "Apparel", team: "lions", badge: "", image: null, url: "" },
  { id: "snapback", name: "Podcast Hat", price: 32.99, category: "Headwear", team: "tigers", badge: "", image: null, url: "" },
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
