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
    id: "tigers-2026-collapse-front-office",
    team: "tigers",
    title: "Blown Saves, Blown Opportunities: Why the Tigers’ 2026 Collapse Falls on the Front Office",
    excerpt: "The Tigers finished 76-86 after a franchise-record 32 blown saves and a deadline sell-off of Tarik Skubal. We look at where it went wrong and who is responsible.",
    author: "Great Lakes Sports Podcast",
    date: "2026-10-20T14:00:00-04:00",
    readTime: "5 min",
    featured: false,
    image: null,
    tags: ["Tigers", "MLB", "Tarik Skubal", "Front Office"],
    body: [
      "The Tigers finished 76-86, missed the postseason, and posted their first losing record since 2023. They were eliminated on Sept. 20. This wasn’t supposed to happen to a team that had been one Game 5 away from the ALCS the year before. Detroit entered 2026 with the biggest payroll of the Ilitch-era rebuild, and it still ended up as one of the most frustrating teams in baseball. Here’s how it went wrong, and who’s responsible.",
      "## The bullpen: a franchise-record meltdown",
      "Start with the number that defines this season. The Tigers blew 32 saves, a franchise record that broke the old mark of 28 set in 2004 and 2008. Only Washington was worse, with 42. Detroit converted just 49.2% of its save chances and finished with 32 saves and 32 blown saves, an even split.",
      "One outlet tallied 68 blown leads overall, which it called both a franchise and MLB record, though we’d treat that count as one source’s number. The one-run games tell the same story: Detroit went 19-28 in one-run and extra-inning games at one point, and finished with the second-worst record in baseball in one-run games.",
      "The culprits were spread around. Kyle Finnegan led the team with 10 blown saves. Kenley Jansen, signed to close, blew six of 28 chances, and his 78.6 save percentage was the lowest of his career. Will Vest also blew six in under half a season before succumbing to injuries. Manager A.J. Hinch struggled to find anyone he could trust with a lead.",
      "The most painful part is how good this team actually was. Detroit outscored opponents by 71 runs. At one point in September, the run differential suggested an 85-71 record when the real one was 73-83. This was an 85-win team that finished 76-86 because it couldn’t close.",
      "It was also a team that dug itself a hole early. Detroit was 22-38 at the end of May, including a 6-22 month, then played the best baseball in the American League through the All-Star break. The recovery fell short, and the late fades killed the season.",
      "## The Skubal decision",
      "Here’s where the front office comes in. By Tarik Skubal’s account, the Tigers made no long-term offer after the 2025 season, and none was coming until the year ended. The only extension offer on record came two years earlier and was worth less than $80 million, a four-year proposal that Skubal turned down. Jon Heyman reported a gap of close to $250 million at one point, with Skubal’s baseline ask around $400 million.",
      "Skubal is a Scott Boras client and was never a sure bet to sign an extension. But one analysis put it bluntly: the Tigers’ offers weren’t in the parking lot, let alone the ballpark. Detroit never got close to testing whether a two-time Cy Young winner would stay.",
      "Then came the deadline. After losing to Kansas City and Baltimore in late July, Harris decided to sell. Skubal went to the Dodgers for prospects Zyhir Hope, River Ryan, and Brady Smith, and Casey Mize went to San Diego for Kash Mayfield and Jackson Wolf. Harris said he hates selling, blamed himself for putting the team in that position, and called the idea that he should have waited for a better offer garbage. The return was widely described as underwhelming for a player of Skubal’s caliber.",
      "## About the money",
      "Here’s the part where the narrative needs care. The Tigers did spend in 2026. They opened the season with a payroll around $200 million, a high for the Chris Ilitch era, after adding Framber Valdez and Justin Verlander, and they sat near the luxury tax line. So “they refuse to spend” isn’t accurate for this year.",
      "But the better argument is about what that money bought. Even at roughly $200 million, Detroit ranked around 16th in baseball in payroll, and that spending went to aging veterans on short-term deals rather than a long-term anchor. Milwaukee ranked 17th, won 103 games, and is playing for the pennant, while Detroit won 76. The Brewers, Rays, and Guardians have all spent about as much as Detroit since 2022 and won far more.",
      "Now the cliff. Detroit has only about $85 million committed for 2027, roughly $115 million less than it opened this year with. That could mean flexibility, or it could mean ownership pulling back after an expensive failure. Ilitch has so far refused to say which, and one Tigers blog has already predicted Harris will do basically nothing to shore up the roster.",
      "## Banking on the farm",
      "Harris has said he wants the core to come from development, with free agency used to supplement it. That’s a reasonable philosophy, and he expects Max Anderson, Zyhir Hope, and Josue Briceño to contribute in 2027. The core of Riley Greene, Kevin McGonigle, Max Clark, and Dillon Dingler gives him real pieces to build around.",
      "But prospects are not a plan on their own. They carry bust risk, they take time, and the best pitcher in baseball just left in exchange for more of them. A farm system can supplement a championship roster, but it can’t replace a legitimate ace.",
      "## The other side",
      "To be fair, there are real counterarguments. The bullpen’s underlying numbers (ERA and FIP) were roughly middle of the pack, and Detroit blew just 21 saves in 2025 and 26 in 2024, so some of this was bad luck. Selling Skubal and Mize before they hit the open market guaranteed value in return. And the young core is genuinely promising. Harris’s defenders would say Detroit is exactly where a development-first club wants to be.",
      "## What needs to happen",
      "This is the offseason that tests the front office. Fix the bullpen with real arms, not hope. Decide what to do about Jansen’s $12 million option. And the loudest question of all: Skubal hits free agency, and Detroit has the payroll room to chase him. One ranking puts the Tigers fifth among suitors, and Skubal has said he’d love to come back.",
    ],
  },
  {
    id: "pistons-opening-night-celtics-duren",
    team: "pistons",
    title: "Paid, Reloaded, and Ready: Pistons Open the Season After the Duren Saga",
    excerpt: "The Pistons open the 2026-27 season against Boston after a summer dominated by Jalen Duren’s contract saga. Here’s what changed and what to expect.",
    author: "Great Lakes Sports Podcast",
    date: "2026-10-20T13:00:00-04:00",
    readTime: "5 min",
    featured: false,
    image: null,
    tags: ["Pistons", "NBA", "Jalen Duren", "Celtics"],
    body: [
      "The 2026-27 NBA season starts in Detroit. The Pistons host the Boston Celtics on Tuesday, Oct. 20, at 3 p.m. ET at Little Caesars Arena (NBC and Peacock), the first game of the entire league schedule. It’s a fitting opener: the Pistons finished 60-22 last season and earned the East’s top seed, and Boston was the East’s other top team. Detroit also won three of the four meetings last season.",
      "A lot has changed since then, and most of it has dominated the summer headlines.",
      "## A new-look Celtics team",
      "Boston looks different. The Celtics made the franchise-altering decision to trade Jaylen Brown to Philadelphia in a deal that brought back Paul George. They also added center Mitchell Robinson and point guard Mike Conley Jr. Jayson Tatum is fully recovered from the Achilles injury he suffered in the 2025 playoffs, and neither he nor Cade Cunningham carries an injury designation. Boston’s only absence is reserve guard Devin Carter, who is out with an illness.",
      "Tatum missed the first 64 games of last season, so this is Detroit’s first real look at a healthy Tatum paired with George. Worth watching.",
      "## The Jalen Duren saga",
      "Now for the story that ate the offseason. Duren came into the summer as a restricted free agent after a four-year, $19.5 million rookie deal. He and the Pistons failed to reach an agreement at the start of free agency, and no other team made an offer sheet, which kicked off a months-long standoff.",
      "The root of the conflict was his All-NBA third-team selection after a breakout season in which he averaged a career-high 19.5 points and 10.5 rebounds. That made him eligible for a five-year, $287 million max extension. Detroit wasn’t willing to commit that much of its cap, partly because it wanted money for an extension for Ausar Thompson, who signed for five years and $155 million in September. There were also reports that Duren felt disrespected by the front office and was open to sign-and-trade options. Another factor was his playoff performance: he averaged just 10.2 points as the Pistons lost a seven-game series to Cleveland in the East semifinals.",
      "The deal finally got done with roughly 90 minutes left before the qualifying offer deadline: five years, $200 million, fully guaranteed, running through 2030-31. Detroit raised its offer from $190 million and dropped a weight clause that had become a sticking point. Duren missed media day and the start of camp, but at his press conference he said he wants to be a Piston for life and pushed back on the narratives about his willingness to stay.",
      "## What to expect from Duren now",
      "Here’s the honest version: the pressure is on. A $200 million contract raises the bar, and the questions are fair. Duren isn’t a perimeter threat and averaged just 0.8 blocks last season, which matters even more with Isaiah Stewart gone. Some analysts have pointed out that his consistency has wavered and that he’s faded in back-to-back postseasons. And even though he signed, there’s a chance the frustration from the negotiation lingers.",
      "On the other side, the Pistons’ front office has said it believes his best basketball is still ahead of him, and Duren himself has acknowledged the flaws he needs to fix. The good news is that he’s still just 22 (he turns 23 in November) and has already been an All-Star. If he turns playoff-level production into a habit, this deal looks like a win. If he doesn’t, it looks like an expensive problem.",
      "## The new additions",
      "Detroit’s front office made it clear what was missing: shooting. The Pistons ranked 29th in three-point attempts last season, and opponents packed the paint against Duren and Cunningham. Here’s who they brought in:",
      "- John Collins: Acquired in a sign-and-trade from the Clippers on a three-year, $51 million deal. He averaged 13.6 points and 5.3 rebounds on 55% shooting last season, including 40.6% from three. He steps into Tobias Harris’s spot, and ESPN named him the team’s biggest X factor.",
      "- Isaiah Joe: Acquired from Oklahoma City for a pair of second-round picks. He has shot at least 40.9% from three in each of his four seasons with the Thunder, which gives Cunningham the kind of floor spacer he’s been missing.",
      "- Taurean Prince and Gary Harris: Arrived from Milwaukee in the six-team trade that also sent Stewart to Memphis and Caris LeVert to the Bucks. They bring veteran shooting and depth.",
      "- Rookies: Stanford guard Ebuka Okorie (No. 17 pick) and Virginia big man Ugonna Onyenso (No. 53).",
      "The departures sting. Stewart was the team’s longest-tenured player and its defensive anchor, and Harris was the third-leading scorer. ESPN gave Detroit’s offseason a C-, calling the swaps a moderate downgrade and noting Cunningham didn’t get significant scoring and playmaking help. Others, including Yahoo’s preview, are more optimistic about the added spacing.",
      "## What to expect this season",
      "Expectations are all over the map, which makes this team interesting. The over/under for wins sits at 49.5, well below last year’s 60. Preseason rankings put Detroit anywhere from No. 8 (ESPN’s BPI) to No. 13 (Yahoo). The best case is another No. 1 seed. The worst case is a slide into the play-in, if the defense slips without Stewart and the new shooting doesn’t loosen the half-court offense.",
      "The ingredients are there. Cade Cunningham is an All-NBA player, Thompson is still improving, and Duren is locked in. If the spacing works, the offense could be much better in the playoffs than it was last spring. If the defense takes a step back, the loss of Stewart will be easy to point to.",
    ],
  },
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
      "Behind-the-scenes content",
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
