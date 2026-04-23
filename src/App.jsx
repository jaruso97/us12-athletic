import { useState, useEffect, useRef, useCallback } from "react";
import {
  Search, Moon, Sun, Bookmark, BookmarkCheck, Share2, ChevronRight,
  X, Menu, ArrowLeft, Clock, User, Flame, Radio, Mail, Trophy,
  TrendingUp, Zap, RefreshCw, Bell, Share, Link2,
  ShoppingBag, TrendingDown, DollarSign, CheckCircle, Star, Package,
  BarChart2, Lock, Percent, AlertTriangle, ChevronDown, ChevronUp,
  Play, Pause, Volume2, Heart, MessageCircle, Send, ThumbsUp,
  Repeat2, ExternalLink, Video, Mic, Image, Users, UserCheck,
  Newspaper, ArrowRight, SkipForward, SkipBack
} from "lucide-react";

const DET_COLOR = "#C8102E";
const CHI_COLOR = "#0B3D8A";
const LIVE_GREEN = "#00D166";

const DETROIT_TEAMS = [
  { id: "lions",    name: "Lions",     sport: "NFL", color: "#0076B6", accent: "#B0B7BC" },
  { id: "tigers",   name: "Tigers",    sport: "MLB", color: "#0C2340", accent: "#FA4616" },
  { id: "pistons",  name: "Pistons",   sport: "NBA", color: "#C8102E", accent: "#006BB6" },
  { id: "redwings", name: "Red Wings", sport: "NHL", color: "#CE1126", accent: "#FFFFFF" },
];
const CHICAGO_TEAMS = [
  { id: "bears",      name: "Bears",      sport: "NFL", color: "#0B162A", accent: "#C83803" },
  { id: "bulls",      name: "Bulls",      sport: "NBA", color: "#CE1141", accent: "#000000" },
  { id: "cubs",       name: "Cubs",       sport: "MLB", color: "#0E3386", accent: "#CC3433" },
  { id: "whitesox",   name: "White Sox",  sport: "MLB", color: "#27251F", accent: "#C4CED4" },
  { id: "blackhawks", name: "Blackhawks", sport: "NHL", color: "#CF0A2C", accent: "#FF671B" },
];

const SCORES = [];


const ALL_ARTICLES = [
  {
    id: "d1", city: "detroit", team: "lions", sport: "NFL",
    title: "Lions Dominate NFC North with Explosive Offense, Eye Super Bowl Run",
    excerpt: "Detroit's high-powered offense continues to silence doubters as Jared Goff puts up another 300-yard performance in a commanding divisional victory that has Lions fans dreaming of February.",
    author: "Marcus Johnson", time: "2h ago", readTime: "4 min",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Ford_Field_2007.JPG",
    tags: ["Lions","NFL","Playoffs"], trending: true, hot: true, views: 51800, staffPick: true
  },
  {
    id: "d2", city: "detroit", team: "tigers", sport: "MLB",
    title: "Tigers Prospect Pipeline Ranked Among MLB's Best Heading Into Trade Deadline",
    excerpt: "Detroit's rebuilding effort is paying dividends as scouts rave about the organization's depth of pitching talent coming through the minors.",
    author: "Sarah Chen", time: "4h ago", readTime: "3 min",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Comerica_park_gate_D_entrance.JPG",
    tags: ["Tigers","MLB","Prospects"], trending: true, views: 44200, staffPick: true
  },
  {
    id: "d3", city: "detroit", team: "redwings", sport: "NHL",
    title: "Red Wings Turn Back the Clock with Dominant Performance at Little Caesars Arena",
    excerpt: "Detroit's historic franchise showed flashes of the dynasty era with a convincing 4-1 victory over division rivals that has the building buzzing with old-time energy.",
    author: "Tom Bradley", time: "6h ago", readTime: "5 min",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Detroit_December_2018_10_(Little_Caesars_Arena).jpg",
    tags: ["Red Wings","NHL"], views: 12400
  },
  {
    id: "d4", city: "detroit", team: "pistons", sport: "NBA",
    title: "Cade Cunningham Named Eastern Conference Player of the Week After Back-to-Back 30-Point Games",
    excerpt: "The young star continues his ascent with jaw-dropping performances that have Detroit fans dreaming of playoff basketball for the first time in years.",
    author: "Lisa Park", time: "8h ago", readTime: "4 min",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Detroit_December_2018_09_(Little_Caesars_Arena).jpg",
    tags: ["Pistons","NBA","Cade"], trending: true, views: 21700
  },
  {
    id: "d5", city: "detroit", team: "lions", sport: "NFL",
    title: "Lions Offensive Line Rated Among Top 5 in NFL by PFF Analytics Report",
    excerpt: "Detroit's rebuilt offensive unit is providing a fortress for Goff as the Lions cement their championship-contending identity heading into the stretch run.",
    author: "Marcus Johnson", time: "1d ago", readTime: "3 min",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Aerial_View_of_Downtown_Detroit_-_Ford_Field_and_Comerica_Park.jpg",
    tags: ["Lions","NFL","Analytics"], views: 38600, staffPick: true
  },
  {
    id: "d6", city: "detroit", team: "tigers", sport: "MLB",
    title: "Tigers Sign Two Highly-Touted International Prospects to Minor League Deals",
    excerpt: "Detroit's front office accelerates its aggressive rebuild with signings from the Dominican Republic and Venezuela that scouts project as future rotation pieces.",
    author: "Sarah Chen", time: "1d ago", readTime: "2 min",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Comerica_park_ferris_wheel.JPG",
    tags: ["Tigers","MLB","International"], views: 29400, staffPick: true
  },
  {
    id: "c1", city: "chicago", team: "bears", sport: "NFL",
    title: "Caleb Williams Shows Star Potential in Commanding Soldier Field Victory",
    excerpt: "The No. 1 overall pick silences every critic with a masterclass performance at home, throwing for 347 yards and 3 touchdowns as the Bears look like a team transformed.",
    author: "Derek Williams", time: "1h ago", readTime: "5 min",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/2014_NHL_Stadium_Series,_Soldier_Field_Pano.JPG",
    tags: ["Bears","NFL","Caleb"], trending: true, hot: true, views: 31200
  },
  {
    id: "c2", city: "chicago", team: "bulls", sport: "NBA",
    title: "Bulls Front Office Explores Blockbuster Trade as Deadline Looms Large",
    excerpt: "Chicago's brass is reportedly willing to move significant assets to add a third star alongside their young core in a win-now push that has the city buzzing.",
    author: "Angela Martinez", time: "3h ago", readTime: "4 min",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/United_Center,_Chicago.JPG",
    tags: ["Bulls","NBA","Trade"], trending: true, views: 27800
  },
  {
    id: "c3", city: "chicago", team: "cubs", sport: "MLB",
    title: "Cubs Starting Rotation Looking Lights-Out in Spring, Raising World Series Hopes",
    excerpt: "Wrigley faithful have every reason to believe this year as Chicago's pitching staff posts eye-popping numbers in camp under a new pitching coordinator.",
    author: "James O'Brien", time: "5h ago", readTime: "4 min",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Wrigley_Field_Marquee_as_of_mid-2015.JPG",
    tags: ["Cubs","MLB","Spring"], views: 15600
  },
  {
    id: "c4", city: "chicago", team: "blackhawks", sport: "NHL",
    title: "Bedard on Pace for Calder Trophy After Monster March Performance",
    excerpt: "Chicago's franchise cornerstone continues to electrify the United Center with an unprecedented rookie run that has hockey pundits comparing him to the all-time greats.",
    author: "Kyle Foster", time: "7h ago", readTime: "4 min",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Detroit_December_2018_11_(Little_Caesars_Arena).jpg",
    tags: ["Blackhawks","NHL","Bedard"], trending: true, views: 19300
  },
  {
    id: "c5", city: "chicago", team: "whitesox", sport: "MLB",
    title: "White Sox Rebuild Accelerates as Top Draft Class Dominates Minor Leagues",
    excerpt: "Chicago's south side team shows encouraging signs of life as their top picks tear through affiliate levels, raising hopes for a faster timeline to competitiveness.",
    author: "Angela Martinez", time: "9h ago", readTime: "3 min",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/US_Cellular_Field.jpg",
    tags: ["White Sox","MLB","Rebuild"], views: 8900
  },
  {
    id: "c6", city: "chicago", team: "bears", sport: "NFL",
    title: "Bears Defense Leads NFL in Sacks Following Transformative Offseason Overhaul",
    excerpt: "Chicago's defensive coordinator has quietly assembled one of the most feared pass-rushing units in the league, providing Caleb Williams with a complete team around him.",
    author: "Derek Williams", time: "1d ago", readTime: "3 min",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Luxury_suites_Soldier_Field.JPG",
    tags: ["Bears","NFL","Defense"], views: 13100
  },
];

const TRENDING_TOPICS = [
  "Lions Super Bowl Odds", "Caleb Williams Breakout", "Cade Cunningham MVP",
  "Cubs World Series", "Bedard Calder", "Bears Trade Rumors"
];

const MERCH = [
  { id:"m1", name:"US-12 Athletic Cap", price:34.99, badge:"BESTSELLER", image:"https://picsum.photos/seed/cap_merch/600/600", colors:["#C8102E","#0B3D8A","#111"], sizes:null, category:"Headwear", rating:4.8, reviews:214 },
  { id:"m2", name:"Lions × US-12 Hoodie", price:64.99, badge:"NEW", image:"https://picsum.photos/seed/hoodie_det/600/600", colors:["#0076B6","#111"], sizes:["S","M","L","XL","2XL"], category:"Apparel", rating:4.9, reviews:87 },
  { id:"m3", name:"Bears × US-12 Hoodie", price:64.99, badge:"NEW", image:"https://picsum.photos/seed/hoodie_chi/600/600", colors:["#0B162A","#C83803"], sizes:["S","M","L","XL","2XL"], category:"Apparel", rating:4.7, reviews:63 },
  { id:"m4", name:"US-12 Snapback Hat", price:29.99, badge:null, image:"https://picsum.photos/seed/snapback_us12/600/600", colors:["#111","#C8102E","#0B3D8A"], sizes:null, category:"Headwear", rating:4.6, reviews:152 },
  { id:"m5", name:"Detroit Pistons Tee", price:29.99, badge:"LIMITED", image:"https://picsum.photos/seed/pistons_tee/600/600", colors:["#C8102E","#006BB6"], sizes:["S","M","L","XL"], category:"Apparel", rating:4.5, reviews:41 },
  { id:"m6", name:"Blackhawks × US-12 Tee", price:29.99, badge:null, image:"https://picsum.photos/seed/hawks_tee/600/600", colors:["#CF0A2C","#111"], sizes:["S","M","L","XL","2XL"], category:"Apparel", rating:4.7, reviews:58 },
  { id:"m7", name:"US-12 Logo Crewneck", price:54.99, badge:"HOT", image:"https://picsum.photos/seed/crewneck_us12/600/600", colors:["#111","#C8102E"], sizes:["S","M","L","XL"], category:"Apparel", rating:4.8, reviews:119 },
  { id:"m8", name:"Tigers × US-12 Fitted", price:36.99, badge:null, image:"https://picsum.photos/seed/tigers_fitted/600/600", colors:["#0C2340","#FA4616"], sizes:null, category:"Headwear", rating:4.6, reviews:77 },
  { id:"m9", name:"US-12 Drinkware Set", price:44.99, badge:"BUNDLE", image:"https://picsum.photos/seed/drinkware_us12/600/600", colors:["#C8102E","#0B3D8A"], sizes:null, category:"Accessories", rating:4.9, reviews:33 },
];

const NEWSLETTER_PLANS = [
  { id:"free", name:"Free", price:0, color:"#555", features:["Daily top 5 headlines", "Live score alerts", "Weekly preview email"], cta:"Subscribe Free" },
  { id:"plus", name:"Plus", price:4.99, color:DET_COLOR, badge:"MOST POPULAR", features:["Everything in Free", "Breaking news push alerts", "Exclusive column: The Inside Track", "Ad-free email experience", "Early access to podcasts"], cta:"Start 7-Day Free Trial" },
  { id:"pro", name:"Pro", price:9.99, color:"#FFD700", features:["Everything in Plus", "Full betting odds digest", "Injury report breakdowns", "Fantasy sports analysis", "Subscriber-only Discord", "Monthly Q&A with writers"], cta:"Go Pro" },
];

const ODDS_DATA = [
  { id:"o1", sport:"NFL", time:"Sun 1:00 PM", status:"UPCOMING", away:"Chicago Bears", home:"Detroit Lions", awayML:"+115", homeML:"-138", spread:"-3.5", total:"47.5", awaySpread:"+3.5", city:"both" },
  { id:"o2", sport:"NBA", time:"Tonight 7:30 PM", status:"UPCOMING", away:"Chicago Bulls", home:"Cleveland Cavs", awayML:"+180", homeML:"-220", spread:"-6.5", total:"221.5", awaySpread:"+6.5", city:"chicago" },
  { id:"o3", sport:"NBA", time:"Tonight 8:00 PM", status:"UPCOMING", away:"Detroit Pistons", home:"Boston Celtics", awayML:"+310", homeML:"-390", spread:"-9.5", total:"218.0", awaySpread:"+9.5", city:"detroit" },
  { id:"o4", sport:"MLB", time:"Tue 6:10 PM", status:"UPCOMING", away:"Detroit Tigers", home:"Cleveland Guardians", awayML:"+145", homeML:"-172", spread:"+1.5", total:"8.5", awaySpread:"-1.5", city:"detroit" },
  { id:"o5", sport:"MLB", time:"Wed 7:05 PM", status:"UPCOMING", away:"St. Louis Cardinals", home:"Chicago Cubs", awayML:"+130", homeML:"-155", spread:"-1.5", total:"9.0", awaySpread:"+1.5", city:"chicago" },
  { id:"o6", sport:"NHL", time:"Fri 7:30 PM", status:"UPCOMING", away:"Detroit Red Wings", home:"Toronto Maple Leafs", awayML:"+195", homeML:"-240", spread:"+1.5", total:"6.0", awaySpread:"-1.5", city:"detroit" },
  { id:"o7", sport:"NHL", time:"Sat 8:00 PM", status:"UPCOMING", away:"Nashville Predators", home:"Chicago Blackhawks", awayML:"-118", homeML:"+100", spread:"-1.5", total:"5.5", awaySpread:"+1.5", city:"chicago" },
  { id:"o8", sport:"MLB", time:"Sat 3:05 PM", status:"UPCOMING", away:"Chicago White Sox", home:"Kansas City Royals", awayML:"+220", homeML:"-270", spread:"+1.5", total:"8.0", awaySpread:"-1.5", city:"chicago" },
];

const fmt = (n) => n >= 1000 ? (n / 1000).toFixed(1) + "k" : n;

const RUMORS = [
  { id:"r1", team:"lions", city:"detroit", sport:"NFL", title:"Lions Exploring Contract Extension for Star Pass Rusher Before Free Agency", source:"ESPN", time:"1h ago", hot:true, likes:342, image:"https://commons.wikimedia.org/wiki/Special:FilePath/Ford_Field_2007.JPG" },
  { id:"r2", team:"bears", city:"chicago", sport:"NFL", title:"Bears Linked to Top Wide Receiver in Upcoming NFL Draft Class", source:"The Athletic", time:"2h ago", hot:true, likes:287, image:"https://commons.wikimedia.org/wiki/Special:FilePath/2014_NHL_Stadium_Series,_Soldier_Field_Pano.JPG" },
  { id:"r3", team:"bulls", city:"chicago", sport:"NBA", title:"Chicago Bulls In Talks With Multiple Teams Over Three-Team Blockbuster", source:"Bleacher Report", time:"3h ago", hot:false, likes:198, image:"https://commons.wikimedia.org/wiki/Special:FilePath/United_Center,_Chicago.JPG" },
  { id:"r4", team:"pistons", city:"detroit", sport:"NBA", title:"Pistons Eyeing Two Free Agent Targets to Complement Cade Cunningham", source:"HoopsHype", time:"4h ago", hot:false, likes:156, image:"https://commons.wikimedia.org/wiki/Special:FilePath/Detroit_December_2018_09_(Little_Caesars_Arena).jpg" },
  { id:"r5", team:"cubs", city:"chicago", sport:"MLB", title:"Cubs Close to Finalizing Multi-Year Deal With Top Bullpen Arm", source:"MLB Network", time:"5h ago", hot:true, likes:221, image:"https://commons.wikimedia.org/wiki/Special:FilePath/Wrigley_Field_Marquee_as_of_mid-2015.JPG" },
  { id:"r6", team:"tigers", city:"detroit", sport:"MLB", title:"Detroit Tigers Pursuing Veteran Shortstop to Bridge Gap During Rebuild", source:"MLB Pipeline", time:"6h ago", hot:false, likes:134, image:"https://commons.wikimedia.org/wiki/Special:FilePath/Comerica_park_ferris_wheel.JPG" },
  { id:"r7", team:"blackhawks", city:"chicago", sport:"NHL", title:"Blackhawks Could Move Veteran Defenseman to Accelerate Rebuild", source:"The Fourth Period", time:"8h ago", hot:false, likes:109, image:"https://commons.wikimedia.org/wiki/Special:FilePath/Detroit_December_2018_11_(Little_Caesars_Arena).jpg" },
  { id:"r8", team:"redwings", city:"detroit", sport:"NHL", title:"Red Wings Scouting European Market for Top Forward Ahead of Deadline", source:"NHL Network", time:"10h ago", hot:false, likes:97, image:"https://commons.wikimedia.org/wiki/Special:FilePath/Detroit_December_2018_10_(Little_Caesars_Arena).jpg" },
];

const VIDEOS = [
  { id:"v1", title:"Lions Highlights: Goff Drops 4 TDs in Dominant NFC North Win", team:"Lions", duration:"4:22", thumb:"https://commons.wikimedia.org/wiki/Special:FilePath/Ford_Field_2007.JPG", views:"128k", youtubeId:"dQw4w9WgXcQ" },
  { id:"v2", title:"Caleb Williams Best Plays: Week 14 vs. Rival NFC North Opponents", team:"Bears", duration:"6:15", thumb:"https://commons.wikimedia.org/wiki/Special:FilePath/Luxury_suites_Soldier_Field.JPG", views:"94k", youtubeId:"dQw4w9WgXcQ" },
  { id:"v3", title:"Cade Cunningham 30-Point Game Extended Highlights", team:"Pistons", duration:"8:44", thumb:"https://commons.wikimedia.org/wiki/Special:FilePath/Detroit_December_2018_09_(Little_Caesars_Arena).jpg", views:"76k", youtubeId:"dQw4w9WgXcQ" },
  { id:"v4", title:"Bedard Hat Trick: Full Highlights from Saturday Night at the UC", team:"Blackhawks", duration:"5:02", thumb:"https://commons.wikimedia.org/wiki/Special:FilePath/United_Center,_Chicago.JPG", views:"112k", youtubeId:"dQw4w9WgXcQ" },
  { id:"v5", title:"Cubs Walk-Off Win: Full 9th Inning Breakdown", team:"Cubs", duration:"3:58", thumb:"https://commons.wikimedia.org/wiki/Special:FilePath/Wrigley_Field_Marquee_as_of_mid-2015.JPG", views:"63k", youtubeId:"dQw4w9WgXcQ" },
  { id:"v6", title:"Red Wings Power Play Goals Compilation — 2025 Season", team:"Red Wings", duration:"7:11", thumb:"https://commons.wikimedia.org/wiki/Special:FilePath/Detroit_December_2018_10_(Little_Caesars_Arena).jpg", views:"44k", youtubeId:"dQw4w9WgXcQ" },
];

const PODCAST_EPISODES = [
  { id:"p1", title:"Lions Super Bowl Window: How Real Is It?", duration:"58:22", date:"Apr 22", guest:"Marcus Johnson & Sarah Chen", image:"https://commons.wikimedia.org/wiki/Special:FilePath/Ford_Field_2007.JPG" },
  { id:"p2", title:"Caleb Williams' Breakout Year & Bears' Super Bowl Timeline", duration:"52:14", date:"Apr 19", guest:"Derek Williams", image:"https://commons.wikimedia.org/wiki/Special:FilePath/2014_NHL_Stadium_Series,_Soldier_Field_Pano.JPG" },
  { id:"p3", title:"NBA Trade Deadline Fallout: Bulls and Pistons Breakdown", duration:"1:04:33", date:"Apr 17", guest:"Lisa Park & Angela Martinez", image:"https://commons.wikimedia.org/wiki/Special:FilePath/United_Center,_Chicago.JPG" },
  { id:"p4", title:"Bedard vs. The All-Time Rookies: Where Does He Rank?", duration:"44:07", date:"Apr 15", guest:"Kyle Foster", image:"https://commons.wikimedia.org/wiki/Special:FilePath/Detroit_December_2018_11_(Little_Caesars_Arena).jpg" },
  { id:"p5", title:"Cubs Rotation Deep Dive: Can They Win the NL?", duration:"49:55", date:"Apr 12", guest:"James O'Brien", image:"https://commons.wikimedia.org/wiki/Special:FilePath/Wrigley_Field_Marquee_as_of_mid-2015.JPG" },
];

const GALLERY = [
  { id:"g1", image:"https://commons.wikimedia.org/wiki/Special:FilePath/Ford_Field_2007.JPG", caption:"Ford Field — Home of the Detroit Lions", team:"Lions" },
  { id:"g2", image:"https://commons.wikimedia.org/wiki/Special:FilePath/2014_NHL_Stadium_Series,_Soldier_Field_Pano.JPG", caption:"Soldier Field packed for a winter classic — Chicago", team:"Bears" },
  { id:"g3", image:"https://commons.wikimedia.org/wiki/Special:FilePath/Detroit_December_2018_09_(Little_Caesars_Arena).jpg", caption:"Little Caesars Arena — Detroit Pistons home court", team:"Pistons" },
  { id:"g4", image:"https://commons.wikimedia.org/wiki/Special:FilePath/United_Center,_Chicago.JPG", caption:"United Center — Home of Bulls & Blackhawks", team:"Blackhawks" },
  { id:"g5", image:"https://commons.wikimedia.org/wiki/Special:FilePath/Wrigley_Field_Marquee_as_of_mid-2015.JPG", caption:"Wrigley Field marquee — Chicago Cubs iconic venue", team:"Cubs" },
  { id:"g6", image:"https://commons.wikimedia.org/wiki/Special:FilePath/Detroit_December_2018_10_(Little_Caesars_Arena).jpg", caption:"Little Caesars Arena — Detroit Red Wings on home ice", team:"Red Wings" },
  { id:"g7", image:"https://commons.wikimedia.org/wiki/Special:FilePath/Comerica_park_ferris_wheel.JPG", caption:"Comerica Park — A Detroit landmark since 2000", team:"Tigers" },
  { id:"g8", image:"https://commons.wikimedia.org/wiki/Special:FilePath/US_Cellular_Field.jpg", caption:"Guaranteed Rate Field — Chicago White Sox ballpark", team:"White Sox" },
];

const POLLS = [
  { id:"poll1", question:"Who wins the NFC North this season?", options:["Detroit Lions","Chicago Bears","Green Bay Packers","Minnesota Vikings"], votes:[1240,890,654,432] },
  { id:"poll2", question:"Which Detroit team will have the best 2025?", options:["Lions","Tigers","Pistons","Red Wings"], votes:[892,234,567,445] },
  { id:"poll3", question:"Best Chicago sports moment of 2025?", options:["Bears Week 1 Win","Bulls playoff push","Cubs no-hitter","Blackhawks Bedard hat trick"], votes:[445,312,289,521] },
];

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600;700&family=Source+Serif+4:ital,opsz,wght@0,8..60,300..900;1,8..60,300..900&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    .app { font-family: 'Barlow Condensed', sans-serif; transition: background 0.3s, color 0.3s; min-height: 100vh; }
    .app.dark { background: #0D0D0F; color: #F0F0F0; }
    .app.light { background: #F2F2F2; color: #111111; }
    .headline-font { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.03em; }
    .body-font { font-family: 'Source Serif 4', serif; }
    @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
    .ticker-wrap { overflow: hidden; }
    .ticker-inner { display: flex; animation: ticker 40s linear infinite; width: max-content; }
    .ticker-inner:hover { animation-play-state: paused; }
    @keyframes pulse-dot { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.4); } }
    .live-dot { animation: pulse-dot 1.2s ease-in-out infinite; }
    @keyframes fadeInUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
    .fade-up { animation: fadeInUp 0.5s ease forwards; }
    @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
    .skeleton { background: linear-gradient(90deg, #1e1e2a 25%, #2a2a3a 50%, #1e1e2a 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite; border-radius: 4px; }
    .skeleton-light { background: linear-gradient(90deg, #e0e0e0 25%, #ececec 50%, #e0e0e0 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite; border-radius: 4px; }
    .article-card { transition: transform 0.2s ease, box-shadow 0.2s ease; cursor: pointer; }
    .article-card:hover { transform: translateY(-4px); }
    .dark .article-card:hover { box-shadow: 0 12px 40px rgba(0,0,0,0.5); }
    .light .article-card:hover { box-shadow: 0 12px 40px rgba(0,0,0,0.15); }
    .hero-card { position: relative; overflow: hidden; cursor: pointer; }
    .hero-card img { transition: transform 0.4s ease; }
    .hero-card:hover img { transform: scale(1.03); }
    .nav-link { transition: color 0.15s; position: relative; }
    .nav-link::after { content: ''; position: absolute; bottom: -2px; left: 0; right: 0; height: 2px; background: currentColor; transform: scaleX(0); transition: transform 0.2s; }
    .nav-link:hover::after, .nav-link.active::after { transform: scaleX(1); }
    .search-overlay { position: fixed; inset: 0; z-index: 200; backdrop-filter: blur(8px); }
    .dark .search-overlay { background: rgba(0,0,0,0.9); }
    .light .search-overlay { background: rgba(255,255,255,0.92); }
    .team-pill { transition: all 0.15s; cursor: pointer; }
    .team-pill:hover { transform: scale(1.05); }
    .btn-primary { transition: filter 0.15s, transform 0.1s; }
    .btn-primary:hover { filter: brightness(1.1); }
    .btn-primary:active { transform: scale(0.97); }
    .prose p { margin-bottom: 1.25rem; line-height: 1.85; font-size: 1.1rem; }
    .prose h3 { font-family: 'Bebas Neue', sans-serif; font-size: 1.6rem; margin: 2rem 0 0.75rem; letter-spacing: 0.05em; }
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: transparent; }
    .dark ::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
    .light ::-webkit-scrollbar-thumb { background: #bbb; border-radius: 3px; }
    @media (max-width: 768px) { .hide-mobile { display: none !important; } .mobile-menu { display: flex !important; } .main-grid { grid-template-columns: 1fr !important; } }
    @media (min-width: 769px) { .mobile-menu { display: none !important; } }
    @keyframes spin { to { transform: rotate(360deg); } }
  `}</style>
);

function ScoreTicker({ dark }) {
  const bg = dark ? "#111118" : "#1a1a2e";
  const [liveScores, setLiveScores] = useState(SCORES);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const res = await fetch("/api/scores");
        const data = await res.json();
        if (data.games && data.games.length > 0) setLiveScores(data.games);
      } catch { /* fall back to static */ }
    };
    fetchScores();
    const interval = setInterval(fetchScores, 60000);
    return () => clearInterval(interval);
  }, []);

  const doubled = liveScores.length > 0 ? [...liveScores, ...liveScores] : [];
  return (
    <div style={{ background: bg, borderBottom: `2px solid ${DET_COLOR}30` }}>
      <div style={{ display: "flex", alignItems: "stretch", maxWidth: "100%" }}>
        <div style={{ background: DET_COLOR, color: "#fff", padding: "0 16px", display: "flex", alignItems: "center", gap: 6, flexShrink: 0, fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
          <span className="live-dot" style={{ width: 7, height: 7, borderRadius: "50%", background: LIVE_GREEN, display: "inline-block" }} />
          LIVE
        </div>
        <div className="ticker-wrap" style={{ flex: 1, overflow: "hidden" }}>
          {doubled.length === 0 ? (
            <div style={{ padding: "8px 20px", fontSize: 13, color: "#666", display: "flex", alignItems: "center", gap: 8 }}>
              <span>No Detroit or Chicago games scheduled right now — check back soon!</span>
            </div>
          ) : (
            <div className="ticker-inner" style={{ padding: "8px 0" }}>
              {doubled.map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 28px", borderRight: "1px solid #ffffff18", fontSize: 13, whiteSpace: "nowrap", color: "#fff" }}>
                  {s.status === "LIVE" && <span className="live-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: LIVE_GREEN, flexShrink: 0 }} />}
                  <span style={{ color: "#aaa", fontSize: 11, fontWeight: 600 }}>{s.sport}</span>
                  <span style={{ fontWeight: 700 }}>{s.away}</span>
                  <span style={{ fontWeight: 800, fontSize: 15 }}>{s.as}</span>
                  <span style={{ color: "#666", fontSize: 12 }}>@</span>
                  <span style={{ fontWeight: 800, fontSize: 15 }}>{s.hs}</span>
                  <span style={{ fontWeight: 700 }}>{s.home}</span>
                  <span style={{ fontSize: 11, padding: "2px 6px", borderRadius: 3, fontWeight: 700, background: s.status === "LIVE" ? "#00D16622" : s.status === "FINAL" ? "#ffffff15" : "#0076B622", color: s.status === "LIVE" ? LIVE_GREEN : s.status === "FINAL" ? "#888" : "#7ab8f5" }}>{s.info}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Header({ dark, setDark, page, setPage, onSearch, mobileMenuOpen, setMobileMenuOpen }) {
  const surface = dark ? "#0D0D0F" : "#fff";
  const border = dark ? "#1e1e28" : "#e5e5e5";
  const textMuted = dark ? "#888" : "#666";
  const [logoClicks, setLogoClicks] = useState(0);
  const [roar, setRoar] = useState(false);
  const clickTimeout = useRef(null);

  const handleLogoClick = () => {
    const next = logoClicks + 1;
    setLogoClicks(next);
    if (next >= 5) {
      setRoar(true);
      setLogoClicks(0);
      setTimeout(() => setRoar(false), 3000);
    }
    clearTimeout(clickTimeout.current);
    clickTimeout.current = setTimeout(() => setLogoClicks(0), 2000);
    setPage("home");
  };

  return (
    <header style={{ background: surface, borderBottom: `1px solid ${border}`, position: "sticky", top: 0, zIndex: 100 }}>
      {roar && (
        <div style={{ position: "fixed", inset: 0, zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.85)", flexDirection: "column", gap: 20 }} onClick={() => setRoar(false)}>
          <div style={{ fontSize: 120, animation: "pulse-dot 0.5s ease infinite" }}>🦁</div>
          <div className="headline-font" style={{ fontSize: 52, color: "#0076B6", textAlign: "center", lineHeight: 1.1 }}>ROARRR!<br /><span style={{ fontSize: 28, color: "#FA4616" }}>GO LIONS & TIGERS! 🐯</span></div>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14 }}>You found the Easter egg! 🎉 (click to close)</p>
        </div>
      )}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 24, height: 64 }}>
          <div style={{ cursor: "pointer", flexShrink: 0, userSelect: "none" }} onClick={handleLogoClick} title={logoClicks > 0 ? `${5 - logoClicks} more clicks...` : ""}>
            <span className="headline-font" style={{ fontSize: 13, color: DET_COLOR, lineHeight: 1, letterSpacing: "0.15em", display: "block" }}>THE</span>
            <span className="headline-font" style={{ fontSize: 28, lineHeight: 1 }}>US-<span style={{ color: DET_COLOR }}>1</span><span style={{ color: CHI_COLOR }}>2</span> ATHLETIC</span>
          </div>
          <nav className="hide-mobile" style={{ display: "flex", gap: 4, flex: 1 }}>
            {[{ id: "home", label: "Home" }, { id: "detroit", label: "Detroit" }, { id: "chicago", label: "Chicago" }, { id: "scores", label: "Scores" }, { id: "rumors", label: "Rumors" }, { id: "media", label: "Media" }, { id: "odds", label: "Odds" }, { id: "merch", label: "Merch" }, { id: "myteams", label: "My Teams" }, { id: "newsletter", label: "Newsletter" }, { id: "about", label: "About" }].map(({ id, label }) => (
              <button key={id} className={`nav-link${page === id ? " active" : ""}`} onClick={() => setPage(id)} style={{ background: "none", border: "none", cursor: "pointer", padding: "8px 9px", fontSize: 12, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: page === id ? (id === "detroit" ? DET_COLOR : id === "chicago" ? CHI_COLOR : id === "odds" ? LIVE_GREEN : id === "scores" ? LIVE_GREEN : id === "merch" ? "#FFD700" : id === "rumors" ? "#FF4500" : id === "myteams" ? DET_COLOR : (dark ? "#f0f0f0" : "#111")) : textMuted }}>
                {label}
              </button>
            ))}
          </nav>
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginLeft: "auto" }}>
            <button onClick={onSearch} style={{ background: "none", border: "none", cursor: "pointer", color: textMuted, padding: 8 }}><Search size={20} /></button>
            <button onClick={() => setDark(!dark)} style={{ background: "none", border: "none", cursor: "pointer", color: textMuted, padding: 8 }}>{dark ? <Sun size={20} /> : <Moon size={20} />}</button>
            <button className="mobile-menu" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ background: "none", border: "none", cursor: "pointer", color: textMuted, padding: 8, display: "none" }}>
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div style={{ padding: "12px 0 16px", borderTop: `1px solid ${border}` }}>
            {["home", "detroit", "chicago", "scores", "rumors", "media", "odds", "merch", "myteams", "newsletter", "about"].map(id => (
              <button key={id} onClick={() => { setPage(id); setMobileMenuOpen(false); }} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", padding: "10px 4px", fontSize: 16, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: dark ? "#f0f0f0" : "#111" }}>
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

function ArticleCard({ article, dark, bookmarks, toggleBookmark, onClick, size = "normal" }) {
  const surface = dark ? "#13131b" : "#fff";
  const border = dark ? "#1e1e28" : "#e8e8e8";
  const textMuted = dark ? "#888" : "#666";
  const isBookmarked = bookmarks.includes(article.id);
  const isBig = size === "big";
  return (
    <div className="article-card fade-up" onClick={onClick} style={{ background: surface, border: `1px solid ${border}`, borderRadius: 10, overflow: "hidden", display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ position: "relative", aspectRatio: isBig ? "16/9" : "16/10", overflow: "hidden" }}>
        <img src={article.image} alt={article.title} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)" }} />
        <div style={{ position: "absolute", top: 10, left: 10, display: "flex", gap: 6 }}>
          {article.hot && <span style={{ background: "#FF4500", color: "#fff", fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 3, letterSpacing: "0.1em", display: "flex", alignItems: "center", gap: 4 }}><Flame size={10} /> HOT</span>}
          {article.staffPick && <span style={{ background: "linear-gradient(135deg, #0076B6, #FA4616)", color: "#fff", fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 3, display: "flex", alignItems: "center", gap: 4 }}>⭐ STAFF PICK</span>}
          <span style={{ background: article.city === "detroit" ? DET_COLOR : CHI_COLOR, color: "#fff", fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 3 }}>{article.sport}</span>
        </div>
        <button onClick={(e) => { e.stopPropagation(); toggleBookmark(article.id); }} style={{ position: "absolute", top: 10, right: 10, background: "rgba(0,0,0,0.5)", border: "none", borderRadius: "50%", width: 32, height: 32, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
          {isBookmarked ? <BookmarkCheck size={15} color="#FFD700" /> : <Bookmark size={15} />}
        </button>
        <div style={{ position: "absolute", bottom: 10, left: 10 }}>
          <span style={{ fontSize: 11, color: "#ffffff90", background: "rgba(0,0,0,0.4)", padding: "2px 7px", borderRadius: 3 }}>{article.team.toUpperCase()}</span>
        </div>
      </div>
      <div style={{ padding: isBig ? "18px 20px 20px" : "14px 16px 16px", flex: 1, display: "flex", flexDirection: "column" }}>
        <h3 className="headline-font" style={{ fontSize: isBig ? 26 : 20, lineHeight: 1.15, marginBottom: 8 }}>{article.title}</h3>
        {isBig && <p style={{ fontSize: 14, color: textMuted, lineHeight: 1.6, marginBottom: 12 }}>{article.excerpt}</p>}
        <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 12, fontSize: 12, color: textMuted }}>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}><User size={11} />{article.author}</span>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Clock size={11} />{article.time}</span>
          <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 4 }}><TrendingUp size={11} />{fmt(article.views)}</span>
        </div>
      </div>
    </div>
  );
}

function HeroCard({ article, dark, bookmarks, toggleBookmark, onClick }) {
  const isBookmarked = bookmarks.includes(article.id);
  return (
    <div className="hero-card" onClick={onClick} style={{ borderRadius: 12, overflow: "hidden", position: "relative", aspectRatio: "21/9", minHeight: 320 }}>
      <img src={article.image} alt={article.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.35) 60%, transparent 100%)" }} />
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "30px 36px" }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          {article.hot && <span style={{ background: "#FF4500", color: "#fff", fontSize: 12, fontWeight: 800, padding: "4px 10px", borderRadius: 4, letterSpacing: "0.1em", display: "flex", alignItems: "center", gap: 5 }}><Flame size={11} /> BREAKING</span>}
          <span style={{ background: article.city === "detroit" ? DET_COLOR : CHI_COLOR, color: "#fff", fontSize: 12, fontWeight: 700, padding: "4px 10px", borderRadius: 4 }}>{article.sport}</span>
        </div>
        <h2 className="headline-font" style={{ fontSize: "clamp(24px, 4vw, 44px)", color: "#fff", lineHeight: 1.1, marginBottom: 12, maxWidth: 700 }}>{article.title}</h2>
        <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 15, lineHeight: 1.5, maxWidth: 580, marginBottom: 16 }}>{article.excerpt}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.7)", fontSize: 13 }}>
            <User size={13} /><span>{article.author}</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <Clock size={13} /><span>{article.time}</span>
          </div>
          <button onClick={(e) => { e.stopPropagation(); toggleBookmark(article.id); }} style={{ marginLeft: "auto", background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 6, padding: "6px 12px", cursor: "pointer", color: "#fff", display: "flex", alignItems: "center", gap: 6, fontSize: 13 }}>
            {isBookmarked ? <BookmarkCheck size={14} color="#FFD700" /> : <Bookmark size={14} />}
            {isBookmarked ? "Saved" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

function TrendingStrip({ dark }) {
  const bg = dark ? "#111118" : "#f8f8f8";
  const border = dark ? "#1e1e28" : "#e0e0e0";
  return (
    <div style={{ background: bg, border: `1px solid ${border}`, borderRadius: 8, padding: "10px 16px", display: "flex", alignItems: "center", gap: 12, overflowX: "auto" }}>
      <span style={{ color: "#FF4500", fontWeight: 700, fontSize: 13, letterSpacing: "0.08em", flexShrink: 0, display: "flex", alignItems: "center", gap: 6 }}><Flame size={14} /> TRENDING</span>
      <div style={{ display: "flex", gap: 8, flexWrap: "nowrap" }}>
        {TRENDING_TOPICS.map((t, i) => (
          <span key={i} className="team-pill" style={{ padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: "pointer", background: dark ? "#1e1e2a" : "#e8e8e8", color: dark ? "#ccc" : "#444", border: `1px solid ${dark ? "#2a2a3a" : "#d0d0d0"}`, whiteSpace: "nowrap" }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

function SectionHeader({ title, color, onMore, filterTeams, activeFilter, setFilter, dark }) {
  const border = dark ? "#1e1e28" : "#e5e5e5";
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 4, height: 32, background: color, borderRadius: 2 }} />
          <h2 className="headline-font" style={{ fontSize: 32, lineHeight: 1 }}>{title}</h2>
        </div>
        {onMore && <button onClick={onMore} style={{ background: "none", border: `1px solid ${border}`, borderRadius: 6, cursor: "pointer", padding: "6px 14px", fontSize: 13, fontWeight: 600, color: color, display: "flex", alignItems: "center", gap: 4 }}>View All <ChevronRight size={14} /></button>}
      </div>
      {filterTeams && (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button className="team-pill" onClick={() => setFilter(null)} style={{ padding: "5px 14px", borderRadius: 20, border: `1px solid ${!activeFilter ? color : (dark ? "#2a2a3a" : "#d5d5d5")}`, background: !activeFilter ? color + "22" : "transparent", color: !activeFilter ? color : (dark ? "#888" : "#666"), fontSize: 12, fontWeight: 700, cursor: "pointer" }}>All</button>
          {filterTeams.map(t => (
            <button key={t.id} className="team-pill" onClick={() => setFilter(t.id)} style={{ padding: "5px 14px", borderRadius: 20, border: `1px solid ${activeFilter === t.id ? t.color : (dark ? "#2a2a3a" : "#d5d5d5")}`, background: activeFilter === t.id ? t.color + "22" : "transparent", color: activeFilter === t.id ? t.color : (dark ? "#888" : "#666"), fontSize: 12, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
              {(t.id === "lions" || t.id === "tigers") && <span style={{ fontSize: 10 }}>👑</span>}
              {t.name} <span style={{ opacity: 0.6, fontWeight: 400 }}>{t.sport}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Sidebar({ dark, articles, onArticleClick }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const surface = dark ? "#13131b" : "#fff";
  const border = dark ? "#1e1e28" : "#e8e8e8";
  const textMuted = dark ? "#888" : "#666";
  const bg2 = dark ? "#0D0D0F" : "#f5f5f5";
  const top5 = [...articles]
    .map(a => ({ ...a, weightedViews: (a.team === "lions" || a.team === "tigers") ? a.views * 2 : a.views }))
    .sort((a, b) => b.weightedViews - a.weightedViews)
    .slice(0, 5);
  return (
    <aside style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <WeatherWidget dark={dark} />
      <InjuryReport dark={dark} />
      <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 10, padding: 20 }}>
        <h3 className="headline-font" style={{ fontSize: 22, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}><Trophy size={18} color="#FFD700" /> MOST POPULAR</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {top5.map((a, i) => (
            <div key={a.id} onClick={() => onArticleClick(a)} style={{ display: "flex", gap: 12, cursor: "pointer", alignItems: "flex-start" }}>
              <span className="headline-font" style={{ fontSize: 28, color: i === 0 ? "#FFD700" : textMuted, lineHeight: 1, flexShrink: 0, width: 28 }}>{i + 1}</span>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.35, marginBottom: 4 }}>{a.title}</p>
                <span style={{ fontSize: 11, color: textMuted }}>{fmt(a.views)} views · {a.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ borderRadius: 10, overflow: "hidden", border: `1px solid ${border}`, background: `linear-gradient(135deg, ${DET_COLOR}15, ${CHI_COLOR}15)`, padding: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <Mail size={18} color={DET_COLOR} />
          <h3 className="headline-font" style={{ fontSize: 22 }}>DAILY DIGEST</h3>
        </div>
        <p style={{ fontSize: 13, color: textMuted, marginBottom: 14, lineHeight: 1.5 }}>Top Detroit & Chicago sports stories every morning.</p>
        {subscribed
          ? <div style={{ textAlign: "center", padding: "12px", background: "#00D16622", borderRadius: 6, fontSize: 14, color: LIVE_GREEN, fontWeight: 600 }}>✓ You're subscribed!</div>
          : <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email address" style={{ background: dark ? "#0D0D0F" : "#fff", border: `1px solid ${border}`, borderRadius: 6, padding: "9px 12px", fontSize: 14, color: dark ? "#f0f0f0" : "#111", outline: "none", width: "100%" }} />
              <button className="btn-primary" onClick={() => email.includes("@") && setSubscribed(true)} style={{ background: DET_COLOR, color: "#fff", border: "none", borderRadius: 6, padding: "10px", fontSize: 14, fontWeight: 700, cursor: "pointer", letterSpacing: "0.05em" }}>SUBSCRIBE FREE</button>
            </div>
        }
      </div>
      <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 10, padding: 20 }}>
        <h3 className="headline-font" style={{ fontSize: 22, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}><Radio size={16} color={LIVE_GREEN} /> SCORES</h3>
        {SCORES.length === 0 ? (
          <p style={{ fontSize: 13, color: textMuted, lineHeight: 1.6 }}>No Detroit or Chicago games right now. Check back on game day!</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {SCORES.slice(0, 5).map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 6, background: bg2 }}>
              <span style={{ fontSize: 11, color: textMuted, width: 28, flexShrink: 0 }}>{s.sport}</span>
              <span style={{ flex: 1, fontSize: 13, fontWeight: 600 }}>{s.away} {s.as} – {s.hs} {s.home}</span>
              <span style={{ fontSize: 11, padding: "2px 7px", borderRadius: 3, fontWeight: 700, background: s.status === "LIVE" ? "#00D16620" : "transparent", color: s.status === "LIVE" ? LIVE_GREEN : textMuted, display: "flex", alignItems: "center", gap: 3 }}>
                {s.status === "LIVE" && <span className="live-dot" style={{ width: 5, height: 5, borderRadius: "50%", background: LIVE_GREEN, display: "inline-block" }} />}
                {s.info}
              </span>
            </div>
          ))}
          </div>
        )}
      </div>
    </aside>
  );
}

function ArticlePage({ article, dark, bookmarks, toggleBookmark, onBack, relatedArticles, onRelatedClick }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const surface = dark ? "#13131b" : "#fff";
  const border = dark ? "#1e1e28" : "#e8e8e8";
  const textMuted = dark ? "#888" : "#666";
  const isBookmarked = bookmarks.includes(article.id);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setContent(""); setLoading(true);
    const generate = async () => {
      try {
        const res = await fetch("/api/article", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: article.title,
            excerpt: article.excerpt,
            team: article.team,
            city: article.city,
            sport: article.sport
          })
        });
        const data = await res.json();
        if (data.content) {
          setContent(data.content);
        } else {
          setContent(article.excerpt || "Full article content is unavailable at this time.");
        }
      } catch {
        setContent(article.excerpt || "Full article content is unavailable at this time.");
      }
      setLoading(false);
    };
    generate();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [article.id]);

  const handleCopy = () => { navigator.clipboard.writeText(window.location.href); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="fade-up">
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "20px 20px 0" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", color: textMuted, display: "flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 600, padding: 0 }}><ArrowLeft size={16} /> Back</button>
      </div>
      <div style={{ maxWidth: 900, margin: "16px auto 0", padding: "0 20px" }}>
        <div style={{ borderRadius: 12, overflow: "hidden", aspectRatio: "16/9" }}>
          <img src={article.image} alt={article.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      </div>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "28px 20px 40px" }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          <span style={{ background: article.city === "detroit" ? DET_COLOR : CHI_COLOR, color: "#fff", fontSize: 12, fontWeight: 700, padding: "4px 12px", borderRadius: 4 }}>{article.sport}</span>
          <span style={{ background: dark ? "#1e1e28" : "#eee", color: textMuted, fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 4 }}>{article.team.toUpperCase()}</span>
        </div>
        <h1 className="headline-font" style={{ fontSize: "clamp(28px, 5vw, 52px)", lineHeight: 1.05, marginBottom: 18 }}>{article.title}</h1>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28, paddingBottom: 20, borderBottom: `1px solid ${border}`, flexWrap: "wrap" }}>
          <div style={{ width: 38, height: 38, borderRadius: "50%", background: article.city === "detroit" ? DET_COLOR + "33" : CHI_COLOR + "33", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <User size={18} color={article.city === "detroit" ? DET_COLOR : CHI_COLOR} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14 }}>{article.author}</div>
            <div style={{ fontSize: 12, color: textMuted }}>{article.time} · {article.readTime} read</div>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button onClick={() => toggleBookmark(article.id)} style={{ background: dark ? "#1e1e28" : "#f0f0f0", border: "none", borderRadius: 6, padding: "8px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: dark ? "#ccc" : "#333" }}>
              {isBookmarked ? <BookmarkCheck size={14} color="#FFD700" /> : <Bookmark size={14} />} {isBookmarked ? "Saved" : "Save"}
            </button>
            <button onClick={handleCopy} style={{ background: dark ? "#1e1e28" : "#f0f0f0", border: "none", borderRadius: 6, padding: "8px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: dark ? "#ccc" : "#333" }}>
              <Link2 size={14} /> {copied ? "Copied!" : "Share"}
            </button>
          </div>
        </div>
        <div className="prose body-font" style={{ color: dark ? "#d0d0d0" : "#1a1a1a", maxWidth: 720 }}>
          {loading ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, color: textMuted, fontSize: 14, marginBottom: 8 }}>
                <RefreshCw size={14} style={{ animation: "spin 1s linear infinite" }} /> Generating article with AI...
              </div>
              {[1, 2, 3, 4].map(i => (
                <div key={i} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {[100, 95, 88, 75].map((w, j) => <div key={j} className={dark ? "skeleton" : "skeleton-light"} style={{ height: 18, width: `${w}%` }} />)}
                </div>
              ))}
            </div>
          ) : content.split("\n\n").filter(Boolean).map((para, i) => <p key={i}>{para}</p>)}
        </div>
        <div style={{ marginTop: 32, display: "flex", gap: 8, flexWrap: "wrap" }}>
          {article.tags.map(tag => <span key={tag} style={{ padding: "5px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600, background: dark ? "#1e1e28" : "#eee", color: textMuted, border: `1px solid ${dark ? "#2a2a3a" : "#d5d5d5"}` }}>#{tag}</span>)}
        </div>
        <div style={{ marginTop: 28, paddingTop: 20, borderTop: `1px solid ${border}` }}>
          <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 12, color: textMuted, letterSpacing: "0.05em", textTransform: "uppercase" }}>Share This Story</p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {[{ icon: <Share size={16} />, label: "Share", color: "#1DA1F2" }, { icon: <Link2 size={16} />, label: "Copy Link", color: textMuted }].map(({ icon, label, color }) => (
              <button key={label} onClick={label === "Copy Link" ? handleCopy : undefined} style={{ display: "flex", alignItems: "center", gap: 7, padding: "8px 16px", borderRadius: 6, border: `1px solid ${border}`, background: dark ? "#13131b" : "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600, color }}>{icon}{label}</button>
            ))}
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 20px 40px" }}>
        <CommentsSection dark={dark} articleId={article.id} />
      </div>
      {relatedArticles.length > 0 && (
        <div style={{ maxWidth: 900, margin: "0 auto 40px", padding: "0 20px" }}>
          <h3 className="headline-font" style={{ fontSize: 26, marginBottom: 16 }}>MORE STORIES</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 16 }}>
            {relatedArticles.map(a => <ArticleCard key={a.id} article={a} dark={dark} bookmarks={[]} toggleBookmark={() => {}} onClick={() => onRelatedClick(a)} />)}
          </div>
        </div>
      )}
    </div>
  );
}

function SearchOverlay({ dark, onClose, articles, onArticleClick }) {
  const [q, setQ] = useState("");
  const inputRef = useRef();
  useEffect(() => { inputRef.current?.focus(); }, []);
  const border = dark ? "#1e1e28" : "#e0e0e0";
  const textMuted = dark ? "#888" : "#666";
  const results = q.trim().length > 1 ? articles.filter(a => a.title.toLowerCase().includes(q.toLowerCase()) || a.team.includes(q.toLowerCase()) || a.sport.toLowerCase().includes(q.toLowerCase()) || a.city.includes(q.toLowerCase())) : [];
  return (
    <div className="search-overlay" onClick={onClose}>
      <div style={{ maxWidth: 680, margin: "80px auto 0", padding: "0 20px" }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", borderRadius: 10, border: `1px solid ${border}`, background: dark ? "#13131b" : "#fff", marginBottom: 20 }}>
          <Search size={20} color={textMuted} />
          <input ref={inputRef} value={q} onChange={e => setQ(e.target.value)} placeholder="Search teams, sports, stories..." style={{ flex: 1, background: "none", border: "none", outline: "none", fontSize: 18, color: dark ? "#f0f0f0" : "#111" }} />
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: textMuted }}><X size={20} /></button>
        </div>
        {q.length > 1 && (
          <div style={{ background: dark ? "#13131b" : "#fff", border: `1px solid ${border}`, borderRadius: 10, overflow: "hidden" }}>
            {results.length === 0
              ? <div style={{ padding: 24, textAlign: "center", color: textMuted, fontSize: 15 }}>No results for "{q}"</div>
              : results.map(a => (
                <div key={a.id} onClick={() => { onArticleClick(a); onClose(); }} style={{ display: "flex", gap: 14, padding: "14px 18px", cursor: "pointer", borderBottom: `1px solid ${border}` }}
                  onMouseEnter={e => e.currentTarget.style.background = dark ? "#1a1a24" : "#f8f8f8"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <img src={a.image} alt="" style={{ width: 60, height: 44, objectFit: "cover", borderRadius: 5, flexShrink: 0 }} />
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, lineHeight: 1.3 }}>{a.title}</p>
                    <span style={{ fontSize: 12, color: textMuted }}>{a.team.toUpperCase()} · {a.sport} · {a.time}</span>
                  </div>
                </div>
              ))
            }
          </div>
        )}
      </div>
    </div>
  );
}

function AboutPage({ dark }) {
  const surface = dark ? "#13131b" : "#fff";
  const border = dark ? "#1e1e28" : "#e8e8e8";
  const textMuted = dark ? "#888" : "#666";
  return (
    <div className="fade-up" style={{ maxWidth: 800, margin: "0 auto", padding: "40px 20px" }}>
      <div style={{ marginBottom: 32 }}>
        <span className="headline-font" style={{ fontSize: 18, color: DET_COLOR, letterSpacing: "0.18em", display: "block", marginBottom: 2 }}>THE</span>
        <span className="headline-font" style={{ fontSize: 52 }}>US-<span style={{ color: DET_COLOR }}>1</span><span style={{ color: CHI_COLOR }}>2</span> ATHLETIC</span>
      </div>
      <p className="body-font" style={{ fontSize: 18, lineHeight: 1.8, color: textMuted, marginBottom: 28 }}>The US-12 Athletic is the premier destination for fans of Detroit and Chicago sports teams. We cover the Lions, Tigers, Pistons, Red Wings, Bears, Bulls, Cubs, White Sox, and Blackhawks with the depth and passion these great franchises deserve.</p>
      <p className="body-font" style={{ fontSize: 18, lineHeight: 1.8, color: textMuted, marginBottom: 40 }}>From breaking news and live scores to in-depth AI-generated analysis and feature stories, we bring you closer to the teams you love. Our platform surfaces the most relevant stories across both cities, keeping you informed 24/7.</p>
      <h3 className="headline-font" style={{ fontSize: 28, marginBottom: 16 }}>TEAMS WE COVER</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
        {[...DETROIT_TEAMS.map(t => ({ ...t, city: "Detroit" })), ...CHICAGO_TEAMS.map(t => ({ ...t, city: "Chicago" }))].map(t => (
          <div key={t.id} style={{ background: surface, border: `1px solid ${border}`, borderRadius: 10, padding: "14px 18px", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: t.color, flexShrink: 0, border: `2px solid ${t.accent}` }} />
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{t.city} {t.name}</div>
              <div style={{ fontSize: 12, color: textMuted }}>{t.sport}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PODCAST COMING SOON ─────────────────────────────────────────────────────
function PodcastComingSoon({ dark }) {
  const [email, setEmail] = useState("");
  const [notified, setNotified] = useState(false);
  const border = dark ? "#1e1e28" : "#e8e8e8";
  const textMuted = dark ? "#888" : "#666";

  const EPISODES_PREVIEW = [
    { ep: "EP 01", title: "The Lions Are For Real — Breaking Down Detroit's Super Bowl Window", guest: "Marcus Johnson", duration: "~55 min" },
    { ep: "EP 02", title: "Caleb Williams & The New Era of Chicago Bears Football", guest: "Derek Williams", duration: "~50 min" },
    { ep: "EP 03", title: "Cade, Bedard & The Young Stars Redefining Detroit & Chicago", guest: "Lisa Park", duration: "~60 min" },
  ];

  return (
    <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", marginBottom: 20 }}>
      {/* Background gradient */}
      <div style={{
        position: "absolute", inset: 0,
        background: dark
          ? `linear-gradient(135deg, #0a0a12 0%, #12101e 40%, #0f0a14 100%)`
          : `linear-gradient(135deg, #0d0d1a 0%, #1a1030 40%, #100a18 100%)`,
      }} />

      {/* Animated sound wave decoration */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", opacity: 0.07 }}>
        <style>{`
          @keyframes wave1 { 0%,100%{height:20px} 50%{height:60px} }
          @keyframes wave2 { 0%,100%{height:40px} 50%{height:20px} }
          @keyframes wave3 { 0%,100%{height:30px} 33%{height:55px} 66%{height:15px} }
          @keyframes wave4 { 0%,100%{height:50px} 50%{height:25px} }
          @keyframes wave5 { 0%,100%{height:15px} 50%{height:45px} }
          .bar1{animation:wave1 1.2s ease-in-out infinite}
          .bar2{animation:wave2 1.0s ease-in-out infinite 0.1s}
          .bar3{animation:wave3 1.4s ease-in-out infinite 0.2s}
          .bar4{animation:wave4 1.1s ease-in-out infinite 0.3s}
          .bar5{animation:wave5 1.3s ease-in-out infinite 0.15s}
          .bar6{animation:wave1 0.9s ease-in-out infinite 0.25s}
          .bar7{animation:wave3 1.5s ease-in-out infinite 0.05s}
          .bar8{animation:wave2 1.2s ease-in-out infinite 0.35s}
        `}</style>
        <div style={{ display: "flex", alignItems: "center", gap: 6, height: "100%", padding: "0 40px", justifyContent: "center" }}>
          {["bar1","bar2","bar3","bar4","bar5","bar6","bar7","bar8","bar1","bar2","bar3","bar4","bar5","bar6","bar7","bar8","bar1","bar2","bar3","bar4"].map((cls, i) => (
            <div key={i} className={cls} style={{ width: 6, borderRadius: 3, background: `hsl(${i * 18}, 70%, 60%)`, minHeight: 15, alignSelf: "center" }} />
          ))}
        </div>
      </div>

      {/* Red accent bar top */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${DET_COLOR}, ${CHI_COLOR}, ${DET_COLOR})` }} />

      <div style={{ position: "relative", padding: "44px 40px 40px" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 20, marginBottom: 36 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: `linear-gradient(135deg, ${DET_COLOR}, ${CHI_COLOR})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Mic size={24} color="#fff" />
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: DET_COLOR, letterSpacing: "0.15em", marginBottom: 2 }}>THE US-12 ATHLETIC</div>
                <span style={{ background: "rgba(200,16,46,0.2)", border: `1px solid ${DET_COLOR}55`, color: DET_COLOR, fontSize: 11, fontWeight: 800, padding: "3px 10px", borderRadius: 20, letterSpacing: "0.1em" }}>
                  COMING SOON
                </span>
              </div>
            </div>
            <h2 className="headline-font" style={{ fontSize: "clamp(32px, 5vw, 56px)", color: "#fff", lineHeight: 1.05, marginBottom: 12 }}>
              THE US-12<br />PODCAST
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, maxWidth: 480, lineHeight: 1.7 }}>
              Deep dives, hot takes, and insider analysis on your Detroit and Chicago teams — every week from the writers you already trust.
            </p>
          </div>

          {/* Notify CTA */}
          <div style={{ background: "rgba(255,255,255,0.05)", border: `1px solid rgba(255,255,255,0.1)`, borderRadius: 14, padding: "24px 28px", minWidth: 280, backdropFilter: "blur(10px)" }}>
            <p className="headline-font" style={{ fontSize: 22, color: "#fff", marginBottom: 6 }}>BE FIRST TO LISTEN</p>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 16, lineHeight: 1.5 }}>Drop your email and we'll notify you the moment Episode 1 drops.</p>
            {notified ? (
              <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(0,209,102,0.15)", border: `1px solid ${LIVE_GREEN}44`, borderRadius: 8, padding: "12px 16px" }}>
                <CheckCircle size={18} color={LIVE_GREEN} />
                <span style={{ color: LIVE_GREEN, fontWeight: 700, fontSize: 14 }}>You're on the list!</span>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" type="email"
                  style={{ background: "rgba(255,255,255,0.08)", border: `1px solid rgba(255,255,255,0.15)`, borderRadius: 8, padding: "11px 14px", fontSize: 14, color: "#fff", outline: "none", width: "100%" }} />
                <button onClick={() => email.includes("@") && setNotified(true)}
                  style={{ background: `linear-gradient(135deg, ${DET_COLOR}, #a50d23)`, color: "#fff", border: "none", borderRadius: 8, padding: "12px", fontSize: 14, fontWeight: 800, cursor: "pointer", letterSpacing: "0.06em", transition: "opacity 0.15s" }}
                  className="btn-primary">
                  NOTIFY ME
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Episode previews */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.1)" }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.35)", letterSpacing: "0.12em" }}>FIRST EPISODES PLANNED</span>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.1)" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {EPISODES_PREVIEW.map((ep, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "14px 18px" }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: i === 0 ? `linear-gradient(135deg, ${DET_COLOR}, #a50d23)` : i === 1 ? `linear-gradient(135deg, ${CHI_COLOR}, #082d6e)` : "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span className="headline-font" style={{ fontSize: 13, color: "#fff" }}>{ep.ep}</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "#fff", lineHeight: 1.3, marginBottom: 3 }}>{ep.title}</p>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>with {ep.guest} · {ep.duration}</p>
                </div>
                <div style={{ flexShrink: 0, width: 36, height: 36, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Play size={14} color="rgba(255,255,255,0.4)" style={{ marginLeft: 2 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom tagline */}
        <div style={{ marginTop: 28, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>New episodes dropping weekly · Available on all major platforms</p>
          <div style={{ display: "flex", gap: 10 }}>
            {["Spotify", "Apple", "YouTube"].map(p => (
              <span key={p} style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.25)", border: "1px solid rgba(255,255,255,0.1)", padding: "4px 10px", borderRadius: 6 }}>{p}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CityPage({ city, dark, articles, bookmarks, toggleBookmark, onArticleClick }) {
  const isDetroit = city === "detroit";
  const color = isDetroit ? DET_COLOR : CHI_COLOR;
  const teams = isDetroit ? DETROIT_TEAMS : CHICAGO_TEAMS;
  const [filter, setFilter] = useState(null);
  const cityArticles = articles.filter(a => a.city === city);
  const filtered = filter ? cityArticles.filter(a => a.team === filter) : cityArticles;
  const textMuted = dark ? "#888" : "#666";
  return (
    <div className="fade-up" style={{ maxWidth: 1280, margin: "0 auto", padding: "30px 20px 50px" }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <div style={{ width: 5, height: 44, background: color, borderRadius: 3 }} />
          <h1 className="headline-font" style={{ fontSize: 52 }}>{isDetroit ? "Detroit" : "Chicago"} Sports</h1>
        </div>
        <p style={{ color: textMuted, fontSize: 15, paddingLeft: 17 }}>Covering the {teams.map(t => t.name).join(", ")}</p>
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
        <button className="team-pill" onClick={() => setFilter(null)} style={{ padding: "7px 18px", borderRadius: 22, border: `1px solid ${!filter ? color : (dark ? "#2a2a3a" : "#d5d5d5")}`, background: !filter ? color : "transparent", color: !filter ? "#fff" : (dark ? "#888" : "#666"), fontSize: 13, fontWeight: 700, cursor: "pointer" }}>All Teams</button>
        {teams.map(t => <button key={t.id} className="team-pill" onClick={() => setFilter(t.id)} style={{ padding: "7px 18px", borderRadius: 22, border: `1px solid ${filter === t.id ? t.color : (dark ? "#2a2a3a" : "#d5d5d5")}`, background: filter === t.id ? t.color : "transparent", color: filter === t.id ? "#fff" : (dark ? "#888" : "#666"), fontSize: 13, fontWeight: 700, cursor: "pointer" }}>{t.name}</button>)}
      </div>
      {filtered.length > 0 && <div style={{ marginBottom: 28 }}><HeroCard article={filtered[0]} dark={dark} bookmarks={bookmarks} toggleBookmark={toggleBookmark} onClick={() => onArticleClick(filtered[0])} /></div>}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20, marginBottom: 40 }}>
        {filtered.slice(1).map(a => <ArticleCard key={a.id} article={a} dark={dark} bookmarks={bookmarks} toggleBookmark={toggleBookmark} onClick={() => onArticleClick(a)} />)}
      </div>
      <LiveNewsSection dark={dark} city={city} />
    </div>
  );
}

function HomePage({ dark, articles, bookmarks, toggleBookmark, onArticleClick, setPage }) {
  const [detFilter, setDetFilter] = useState(null);
  const [chiFilter, setChiFilter] = useState(null);

  // Always show Lions & Tigers articles first
  const sortByFavorites = (arr) => {
    const favs = arr.filter(a => a.team === "lions" || a.team === "tigers");
    const rest = arr.filter(a => a.team !== "lions" && a.team !== "tigers");
    return [...favs, ...rest];
  };

  const featuredArticle = articles.find(a => a.team === "lions" && a.hot) || articles.find(a => a.hot) || articles[0];
  const detArticles = sortByFavorites(articles.filter(a => a.city === "detroit" && a.id !== featuredArticle.id));
  const chiArticles = articles.filter(a => a.city === "chicago" && a.id !== featuredArticle.id);
  const filteredDet = detFilter ? detArticles.filter(a => a.team === detFilter) : detArticles;
  const filteredChi = chiFilter ? chiArticles.filter(a => a.team === chiFilter) : chiArticles;
  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "28px 20px 60px" }}>
      <GameDayBanner dark={dark} />
      <div style={{ marginBottom: 24 }}><HeroCard article={featuredArticle} dark={dark} bookmarks={bookmarks} toggleBookmark={toggleBookmark} onClick={() => onArticleClick(featuredArticle)} /></div>
      <div style={{ marginBottom: 24 }}><TrendingStrip dark={dark} /></div>
      <div style={{ marginBottom: 28 }}><AdBanner dark={dark} size="leaderboard" /></div>
      <div className="main-grid" style={{ display: "grid", gridTemplateColumns: "1fr min(320px, 30%)", gap: 32 }}>
        <div>
          <div style={{ marginBottom: 44 }}>
            <SectionHeader title="DETROIT SPORTS" color={DET_COLOR} onMore={() => setPage("detroit")} filterTeams={DETROIT_TEAMS} activeFilter={detFilter} setFilter={setDetFilter} dark={dark} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
              {filteredDet.slice(0, 4).map(a => <ArticleCard key={a.id} article={a} dark={dark} bookmarks={bookmarks} toggleBookmark={toggleBookmark} onClick={() => onArticleClick(a)} />)}
            </div>
          </div>
          <div style={{ marginBottom: 44 }}>
            <SectionHeader title="CHICAGO SPORTS" color={CHI_COLOR} onMore={() => setPage("chicago")} filterTeams={CHICAGO_TEAMS} activeFilter={chiFilter} setFilter={setChiFilter} dark={dark} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
              {filteredChi.slice(0, 4).map(a => <ArticleCard key={a.id} article={a} dark={dark} bookmarks={bookmarks} toggleBookmark={toggleBookmark} onClick={() => onArticleClick(a)} />)}
            </div>
          </div>
          {/* Live News Section */}
          <LiveNewsSection dark={dark} city="all" />

          {/* Player Stats */}
          <div style={{ marginBottom: 44 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 4, height: 28, background: "#FA4616", borderRadius: 2 }} />
              <h2 className="headline-font" style={{ fontSize: 28 }}>🦁🐯 LIONS & TIGERS STATS</h2>
            </div>
            <PlayerStatsWidget dark={dark} />
          </div>

          {/* Social Feed */}
          <div style={{ marginBottom: 44 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 4, height: 28, background: "#1DA1F2", borderRadius: 2 }} />
              <h2 className="headline-font" style={{ fontSize: 28 }}>TEAM SOCIAL</h2>
            </div>
            <SocialFeed dark={dark} />
          </div>

          {/* Fan Polls Section */}
          <div style={{ marginBottom: 44 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 4, height: 28, background: "#FF4500", borderRadius: 2 }} />
              <h2 className="headline-font" style={{ fontSize: 28 }}>FAN POLLS</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
              {POLLS.map(poll => <PollWidget key={poll.id} poll={poll} dark={dark} />)}
            </div>
          </div>

          {/* Podcast Coming Soon */}
          <PodcastComingSoon dark={dark} />
        </div>
        <div className="hide-mobile"><Sidebar dark={dark} articles={articles} onArticleClick={onArticleClick} /></div>
      </div>
    </div>
  );
}

// ─── LIVE NEWS CARD ──────────────────────────────────────────────────────────
function LiveNewsCard({ article, dark }) {
  const surface = dark ? "#13131b" : "#fff";
  const border = dark ? "#1e1e28" : "#e8e8e8";
  const textMuted = dark ? "#888" : "#666";
  const bg2 = dark ? "#0D0D0F" : "#f5f5f5";

  const timeAgo = (iso) => {
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  return (
    <a href={article.url} target="_blank" rel="noopener noreferrer"
      style={{ textDecoration: "none", color: "inherit", display: "block" }}
      className="article-card">
      <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 10, overflow: "hidden", height: "100%", display: "flex", flexDirection: "column" }}>
        <div style={{ position: "relative", aspectRatio: "16/10", overflow: "hidden", background: bg2, flexShrink: 0 }}>
          {article.image ? (
            <img src={article.image} alt={article.title} loading="lazy"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              onError={e => { e.target.style.display = "none"; e.target.parentNode.style.background = bg2; }} />
          ) : (
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Newspaper size={32} color={textMuted} strokeWidth={1} />
            </div>
          )}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)" }} />
          <div style={{ position: "absolute", top: 10, left: 10 }}>
            <span style={{ background: DET_COLOR, color: "#fff", fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 3 }}>
              LIVE NEWS
            </span>
          </div>
          <div style={{ position: "absolute", bottom: 10, right: 10 }}>
            <ExternalLink size={14} color="rgba(255,255,255,0.7)" />
          </div>
        </div>
        <div style={{ padding: "14px 16px 16px", flex: 1, display: "flex", flexDirection: "column" }}>
          <h3 className="headline-font" style={{ fontSize: 19, lineHeight: 1.2, marginBottom: 8 }}>{article.title}</h3>
          {article.excerpt && (
            <p style={{ fontSize: 13, color: textMuted, lineHeight: 1.5, marginBottom: 10, flex: 1,
              display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
              {article.excerpt}
            </p>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12, color: textMuted, marginTop: "auto" }}>
            <span style={{ fontWeight: 700, color: dark ? "#bbb" : "#444" }}>{article.source}</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Clock size={11} />{timeAgo(article.publishedAt)}</span>
            <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 4 }}>
              <ExternalLink size={11} /> Read Full Story
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}

// ─── LIVE NEWS SECTION ───────────────────────────────────────────────────────
function LiveNewsSection({ dark, city = "all" }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const textMuted = dark ? "#888" : "#666";
  const border = dark ? "#1e1e28" : "#e5e5e5";

  const fetchNews = async () => {
    setLoading(true); setError(false);
    try {
      const res = await fetch(`/api/news?city=${city}`);
      const data = await res.json();
      if (data.articles && data.articles.length > 0) {
        setNews(data.articles.slice(0, 6));
        setLastUpdated(new Date());
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => { fetchNews(); }, [city]);

  if (error) return null;

  return (
    <div style={{ marginBottom: 44 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 4, height: 32, background: LIVE_GREEN, borderRadius: 2 }} />
          <h2 className="headline-font" style={{ fontSize: 32, lineHeight: 1 }}>LATEST NEWS</h2>
          <span style={{ display: "flex", alignItems: "center", gap: 5, background: LIVE_GREEN + "22", color: LIVE_GREEN, fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 12, letterSpacing: "0.08em" }}>
            <span className="live-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: LIVE_GREEN, display: "inline-block" }} />
            LIVE
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {lastUpdated && <span style={{ fontSize: 12, color: textMuted }}>Updated {lastUpdated.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}</span>}
          <button onClick={fetchNews} style={{ background: "none", border: `1px solid ${border}`, borderRadius: 6, cursor: "pointer", padding: "5px 12px", fontSize: 12, fontWeight: 700, color: textMuted, display: "flex", alignItems: "center", gap: 5 }}>
            <RefreshCw size={12} /> Refresh
          </button>
        </div>
      </div>

      {loading ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
          {[1,2,3,4,5,6].map(i => (
            <div key={i} style={{ borderRadius: 10, overflow: "hidden" }}>
              <div className={dark ? "skeleton" : "skeleton-light"} style={{ height: 180 }} />
              <div style={{ padding: "14px 16px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
                <div className={dark ? "skeleton" : "skeleton-light"} style={{ height: 16, width: "90%" }} />
                <div className={dark ? "skeleton" : "skeleton-light"} style={{ height: 16, width: "75%" }} />
                <div className={dark ? "skeleton" : "skeleton-light"} style={{ height: 12, width: "50%" }} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
          {news.map(article => <LiveNewsCard key={article.id} article={article} dark={dark} />)}
        </div>
      )}
    </div>
  );
}

function Footer({ dark }) {
  return (
    <footer style={{ background: dark ? "#080810" : "#111", color: "#888", padding: "40px 20px 24px", marginTop: 40 }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "space-between", marginBottom: 32 }}>
          <div>
            <div style={{ marginBottom: 12 }}>
              <span className="headline-font" style={{ fontSize: 11, color: DET_COLOR, letterSpacing: "0.18em", display: "block" }}>THE</span>
              <span className="headline-font" style={{ fontSize: 26, color: "#fff" }}>US-<span style={{ color: DET_COLOR }}>1</span><span style={{ color: CHI_COLOR }}>2</span> ATHLETIC</span>
            </div>
            <p style={{ fontSize: 13, maxWidth: 280, lineHeight: 1.6 }}>Your home for Detroit and Chicago sports coverage, live scores, and breaking news.</p>
          </div>
          <div style={{ display: "flex", gap: 40 }}>
            <div>
              <p style={{ color: "#aaa", fontWeight: 700, fontSize: 13, marginBottom: 10, letterSpacing: "0.08em" }}>DETROIT</p>
              {DETROIT_TEAMS.map(t => <p key={t.id} style={{ fontSize: 13, marginBottom: 6 }}>{t.name}</p>)}
            </div>
            <div>
              <p style={{ color: "#aaa", fontWeight: 700, fontSize: 13, marginBottom: 10, letterSpacing: "0.08em" }}>CHICAGO</p>
              {CHICAGO_TEAMS.map(t => <p key={t.id} style={{ fontSize: 13, marginBottom: 6 }}>{t.name}</p>)}
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid #1a1a1a", paddingTop: 20, display: "flex", justifyContent: "space-between", fontSize: 12, flexWrap: "wrap", gap: 8 }}>
          <span>© 2025 The US-12 Athletic. All rights reserved.</span>
          <span>Powered by AI sports journalism</span>
        </div>
      </div>
    </footer>
  );
}

// ─── MERCH PAGE ──────────────────────────────────────────────────────────────
function MerchPage({ dark }) {
  const surface = dark ? "#13131b" : "#fff";
  const border = dark ? "#1e1e28" : "#e8e8e8";
  const bg2 = dark ? "#0D0D0F" : "#f2f2f2";
  const textMuted = dark ? "#888" : "#666";
  const [cart, setCart] = useState([]);
  const [filter, setFilter] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const [addedId, setAddedId] = useState(null);

  const categories = ["All", "Apparel", "Headwear", "Accessories"];
  const filtered = filter === "All" ? MERCH : MERCH.filter(m => m.category === filter);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === item.id);
      if (existing) return prev.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { ...item, qty: 1 }];
    });
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1500);
    setSelectedItem(null);
  };

  const badgeColor = (b) => b === "BESTSELLER" ? "#FFD700" : b === "NEW" ? LIVE_GREEN : b === "LIMITED" ? DET_COLOR : b === "HOT" ? "#FF4500" : b === "BUNDLE" ? CHI_COLOR : "#888";

  return (
    <div className="fade-up" style={{ maxWidth: 1280, margin: "0 auto", padding: "30px 20px 60px" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 16 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
            <ShoppingBag size={28} color={DET_COLOR} />
            <h1 className="headline-font" style={{ fontSize: 48 }}>MERCH STORE</h1>
          </div>
          <p style={{ color: textMuted, fontSize: 15 }}>Official US-12 Athletic gear. Rep your teams, rep the route.</p>
        </div>
        <button onClick={() => setCartOpen(true)} style={{ position: "relative", background: DET_COLOR, border: "none", borderRadius: 8, padding: "10px 20px", cursor: "pointer", color: "#fff", display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 700 }}>
          <ShoppingBag size={16} /> Cart
          {cartCount > 0 && <span style={{ background: "#FFD700", color: "#111", borderRadius: "50%", width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800 }}>{cartCount}</span>}
        </button>
      </div>

      {/* Category Filters */}
      <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
        {categories.map(c => (
          <button key={c} onClick={() => setFilter(c)} className="team-pill" style={{ padding: "7px 20px", borderRadius: 22, border: `1px solid ${filter === c ? DET_COLOR : (dark ? "#2a2a3a" : "#d5d5d5")}`, background: filter === c ? DET_COLOR : "transparent", color: filter === c ? "#fff" : textMuted, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>{c}</button>
        ))}
      </div>

      {/* Product Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
        {filtered.map(item => (
          <div key={item.id} className="article-card" onClick={() => { setSelectedItem(item); setSelectedSize(null); setSelectedColor(0); }}
            style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, overflow: "hidden" }}>
            <div style={{ position: "relative", aspectRatio: "1/1", overflow: "hidden", background: bg2 }}>
              <img src={item.image} alt={item.name} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s" }} />
              {item.badge && (
                <span style={{ position: "absolute", top: 12, left: 12, background: badgeColor(item.badge), color: item.badge === "BESTSELLER" ? "#111" : "#fff", fontSize: 11, fontWeight: 800, padding: "3px 9px", borderRadius: 4, letterSpacing: "0.08em" }}>{item.badge}</span>
              )}
              {addedId === item.id && (
                <div style={{ position: "absolute", inset: 0, background: "rgba(0,209,102,0.85)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 }}>
                  <CheckCircle size={40} color="#fff" />
                  <span style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>Added to Cart!</span>
                </div>
              )}
            </div>
            <div style={{ padding: "14px 16px 16px" }}>
              <div style={{ fontSize: 11, color: textMuted, fontWeight: 600, letterSpacing: "0.08em", marginBottom: 4 }}>{item.category.toUpperCase()}</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, lineHeight: 1.3 }}>{item.name}</h3>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
                <div style={{ display: "flex", gap: 2 }}>
                  {[1,2,3,4,5].map(s => <Star key={s} size={11} fill={s <= Math.round(item.rating) ? "#FFD700" : "none"} color={s <= Math.round(item.rating) ? "#FFD700" : "#555"} />)}
                </div>
                <span style={{ fontSize: 12, color: textMuted }}>({item.reviews})</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span className="headline-font" style={{ fontSize: 24 }}>${item.price.toFixed(2)}</span>
                <button onClick={(e) => { e.stopPropagation(); if (item.sizes) { setSelectedItem(item); setSelectedSize(null); setSelectedColor(0); } else addToCart(item); }}
                  style={{ background: DET_COLOR, color: "#fff", border: "none", borderRadius: 6, padding: "7px 14px", cursor: "pointer", fontSize: 13, fontWeight: 700 }}>
                  {item.sizes ? "Select Size" : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Modal */}
      {selectedItem && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={() => setSelectedItem(null)}>
          <div onClick={e => e.stopPropagation()} style={{ background: dark ? "#13131b" : "#fff", borderRadius: 14, maxWidth: 680, width: "100%", overflow: "hidden", display: "flex", flexWrap: "wrap", maxHeight: "90vh", overflowY: "auto" }}>
            <div style={{ flex: "0 0 280px", minWidth: 220, aspectRatio: "1/1", background: bg2 }}>
              <img src={selectedItem.image} alt={selectedItem.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ flex: 1, padding: 28, minWidth: 220 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <div>
                  <div style={{ fontSize: 12, color: textMuted, fontWeight: 600, letterSpacing: "0.08em", marginBottom: 4 }}>{selectedItem.category.toUpperCase()}</div>
                  <h2 className="headline-font" style={{ fontSize: 28, lineHeight: 1.1 }}>{selectedItem.name}</h2>
                </div>
                <button onClick={() => setSelectedItem(null)} style={{ background: "none", border: "none", cursor: "pointer", color: textMuted }}><X size={20} /></button>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
                {[1,2,3,4,5].map(s => <Star key={s} size={13} fill={s <= Math.round(selectedItem.rating) ? "#FFD700" : "none"} color={s <= Math.round(selectedItem.rating) ? "#FFD700" : "#555"} />)}
                <span style={{ fontSize: 13, color: textMuted }}>({selectedItem.reviews} reviews)</span>
              </div>
              <div className="headline-font" style={{ fontSize: 36, marginBottom: 20 }}>${selectedItem.price.toFixed(2)}</div>
              {/* Color swatches */}
              <div style={{ marginBottom: 20 }}>
                <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 8, color: textMuted, letterSpacing: "0.06em" }}>COLOR</p>
                <div style={{ display: "flex", gap: 8 }}>
                  {selectedItem.colors.map((c, i) => (
                    <button key={i} onClick={() => setSelectedColor(i)} style={{ width: 28, height: 28, borderRadius: "50%", background: c, border: `3px solid ${selectedColor === i ? "#fff" : "transparent"}`, cursor: "pointer", outline: selectedColor === i ? `2px solid ${DET_COLOR}` : "none" }} />
                  ))}
                </div>
              </div>
              {/* Sizes */}
              {selectedItem.sizes && (
                <div style={{ marginBottom: 24 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 8, color: textMuted, letterSpacing: "0.06em" }}>SIZE</p>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {selectedItem.sizes.map(s => (
                      <button key={s} onClick={() => setSelectedSize(s)} style={{ padding: "7px 14px", borderRadius: 6, border: `1px solid ${selectedSize === s ? DET_COLOR : (dark ? "#2a2a3a" : "#d5d5d5")}`, background: selectedSize === s ? DET_COLOR : "transparent", color: selectedSize === s ? "#fff" : (dark ? "#ccc" : "#333"), fontSize: 13, fontWeight: 700, cursor: "pointer" }}>{s}</button>
                    ))}
                  </div>
                </div>
              )}
              <button onClick={() => addToCart(selectedItem)} disabled={selectedItem.sizes && !selectedSize}
                style={{ width: "100%", background: selectedItem.sizes && !selectedSize ? "#444" : DET_COLOR, color: "#fff", border: "none", borderRadius: 8, padding: "14px", fontSize: 15, fontWeight: 800, cursor: selectedItem.sizes && !selectedSize ? "not-allowed" : "pointer", letterSpacing: "0.06em" }}>
                {selectedItem.sizes && !selectedSize ? "SELECT A SIZE" : "ADD TO CART"}
              </button>
              <p style={{ fontSize: 12, color: textMuted, textAlign: "center", marginTop: 10 }}>Free shipping on orders over $75 · Easy returns</p>
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      {cartOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 300 }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)" }} onClick={() => setCartOpen(false)} />
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "min(400px, 100vw)", background: dark ? "#13131b" : "#fff", padding: 24, overflowY: "auto", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h2 className="headline-font" style={{ fontSize: 28 }}>YOUR CART ({cartCount})</h2>
              <button onClick={() => setCartOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: textMuted }}><X size={22} /></button>
            </div>
            {cart.length === 0
              ? <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, color: textMuted }}>
                  <ShoppingBag size={48} strokeWidth={1} />
                  <p style={{ fontSize: 16 }}>Your cart is empty</p>
                </div>
              : <>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
                    {cart.map(item => (
                      <div key={item.id} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                        <img src={item.image} alt={item.name} style={{ width: 64, height: 64, objectFit: "cover", borderRadius: 8, flexShrink: 0 }} />
                        <div style={{ flex: 1 }}>
                          <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{item.name}</p>
                          <p style={{ fontSize: 13, color: textMuted }}>${item.price.toFixed(2)}</p>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <button onClick={() => setCart(prev => prev.map(c => c.id === item.id ? { ...c, qty: Math.max(1, c.qty - 1) } : c))} style={{ background: dark ? "#1e1e28" : "#eee", border: "none", borderRadius: 4, width: 26, height: 26, cursor: "pointer", color: dark ? "#ccc" : "#333", fontSize: 16 }}>−</button>
                          <span style={{ fontSize: 14, fontWeight: 700, minWidth: 16, textAlign: "center" }}>{item.qty}</span>
                          <button onClick={() => setCart(prev => prev.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c))} style={{ background: dark ? "#1e1e28" : "#eee", border: "none", borderRadius: 4, width: 26, height: 26, cursor: "pointer", color: dark ? "#ccc" : "#333", fontSize: 16 }}>+</button>
                          <button onClick={() => setCart(prev => prev.filter(c => c.id !== item.id))} style={{ background: "none", border: "none", cursor: "pointer", color: "#666", marginLeft: 4 }}><X size={14} /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ borderTop: `1px solid ${border}`, paddingTop: 20, marginTop: 20 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                      <span style={{ fontSize: 15, color: textMuted }}>Subtotal</span>
                      <span className="headline-font" style={{ fontSize: 22 }}>${cartTotal.toFixed(2)}</span>
                    </div>
                    <button style={{ width: "100%", background: DET_COLOR, color: "#fff", border: "none", borderRadius: 8, padding: "14px", fontSize: 15, fontWeight: 800, cursor: "pointer", letterSpacing: "0.06em" }}>CHECKOUT</button>
                    <p style={{ fontSize: 12, color: textMuted, textAlign: "center", marginTop: 10 }}>Free shipping on orders over $75</p>
                  </div>
                </>
            }
          </div>
        </div>
      )}
    </div>
  );
}

// ─── NEWSLETTER PAGE ─────────────────────────────────────────────────────────
function NewsletterPage({ dark }) {
  const surface = dark ? "#13131b" : "#fff";
  const border = dark ? "#1e1e28" : "#e8e8e8";
  const textMuted = dark ? "#888" : "#666";
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("plus");
  const [prefs, setPrefs] = useState({ lions:true, tigers:true, pistons:false, redwings:false, bears:true, bulls:false, cubs:true, whitesox:false, blackhawks:false });
  const [submitted, setSubmitted] = useState(false);
  const togglePref = (k) => setPrefs(p => ({ ...p, [k]: !p[k] }));

  const teamPrefs = [
    ...DETROIT_TEAMS.map(t => ({ ...t, city: "DET" })),
    ...CHICAGO_TEAMS.map(t => ({ ...t, city: "CHI" }))
  ];

  if (submitted) return (
    <div className="fade-up" style={{ maxWidth: 600, margin: "80px auto", padding: "0 20px", textAlign: "center" }}>
      <div style={{ width: 80, height: 80, borderRadius: "50%", background: LIVE_GREEN + "22", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
        <CheckCircle size={40} color={LIVE_GREEN} />
      </div>
      <h2 className="headline-font" style={{ fontSize: 44, marginBottom: 12 }}>YOU'RE IN!</h2>
      <p style={{ color: textMuted, fontSize: 16, lineHeight: 1.7, marginBottom: 24 }}>
        Welcome to The US-12 Athletic, {name || "sports fan"}. Your first digest will hit your inbox tomorrow morning. Check your email to confirm your subscription.
      </p>
      <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 10, padding: 20, fontSize: 14, color: textMuted }}>
        Subscribed as <strong style={{ color: dark ? "#f0f0f0" : "#111" }}>{email}</strong> on the <strong style={{ color: NEWSLETTER_PLANS.find(p => p.id === selectedPlan)?.color }}>{NEWSLETTER_PLANS.find(p => p.id === selectedPlan)?.name}</strong> plan.
      </div>
    </div>
  );

  return (
    <div className="fade-up" style={{ maxWidth: 1100, margin: "0 auto", padding: "36px 20px 60px" }}>
      {/* Hero */}
      <div style={{ textAlign: "center", marginBottom: 52 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: DET_COLOR + "18", border: `1px solid ${DET_COLOR}33`, borderRadius: 24, padding: "6px 16px", marginBottom: 16 }}>
          <Mail size={14} color={DET_COLOR} />
          <span style={{ fontSize: 12, fontWeight: 700, color: DET_COLOR, letterSpacing: "0.1em" }}>DAILY SPORTS DIGEST</span>
        </div>
        <h1 className="headline-font" style={{ fontSize: "clamp(36px, 6vw, 64px)", lineHeight: 1.05, marginBottom: 16 }}>
          DETROIT & CHICAGO.<br />EVERY MORNING.
        </h1>
        <p style={{ color: textMuted, fontSize: 17, maxWidth: 540, margin: "0 auto", lineHeight: 1.7 }}>
          Breaking news, score alerts, injury updates, and exclusive analysis from The US-12 Athletic delivered straight to your inbox.
        </p>
      </div>

      {/* Plans */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20, marginBottom: 48 }}>
        {NEWSLETTER_PLANS.map(plan => {
          const active = selectedPlan === plan.id;
          return (
            <div key={plan.id} onClick={() => setSelectedPlan(plan.id)} style={{ background: surface, border: `2px solid ${active ? plan.color : border}`, borderRadius: 14, padding: 24, cursor: "pointer", position: "relative", transition: "border-color 0.2s, box-shadow 0.2s", boxShadow: active ? `0 0 0 4px ${plan.color}18` : "none" }}>
              {plan.badge && <span style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: plan.color, color: plan.color === "#FFD700" ? "#111" : "#fff", fontSize: 11, fontWeight: 800, padding: "3px 12px", borderRadius: 12, whiteSpace: "nowrap", letterSpacing: "0.08em" }}>{plan.badge}</span>}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <div>
                  <h3 className="headline-font" style={{ fontSize: 28, color: plan.color }}>{plan.name}</h3>
                  <div style={{ fontSize: 13, color: textMuted }}>{plan.price === 0 ? "Always free" : `$${plan.price}/mo`}</div>
                </div>
                <div style={{ width: 22, height: 22, borderRadius: "50%", border: `2px solid ${active ? plan.color : (dark ? "#333" : "#ccc")}`, background: active ? plan.color : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {active && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff" }} />}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {plan.features.map((f, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: i === 0 && plan.id !== "free" ? textMuted : (dark ? "#ccc" : "#333") }}>
                    <CheckCircle size={14} color={plan.color} style={{ flexShrink: 0, marginTop: 1 }} />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
              {plan.price > 0 && <div style={{ fontSize: 11, color: textMuted, marginTop: 14, textAlign: "center" }}>Cancel anytime</div>}
            </div>
          );
        })}
      </div>

      {/* Form */}
      <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 16, padding: "32px 36px", maxWidth: 720, margin: "0 auto" }}>
        <h2 className="headline-font" style={{ fontSize: 32, marginBottom: 24 }}>
          SUBSCRIBE — {NEWSLETTER_PLANS.find(p => p.id === selectedPlan)?.name.toUpperCase()} PLAN
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <div>
            <label style={{ fontSize: 12, fontWeight: 700, color: textMuted, letterSpacing: "0.08em", display: "block", marginBottom: 6 }}>FIRST NAME</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" style={{ width: "100%", background: dark ? "#0D0D0F" : "#f8f8f8", border: `1px solid ${border}`, borderRadius: 8, padding: "11px 14px", fontSize: 15, color: dark ? "#f0f0f0" : "#111", outline: "none" }} />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 700, color: textMuted, letterSpacing: "0.08em", display: "block", marginBottom: 6 }}>EMAIL ADDRESS</label>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" type="email" style={{ width: "100%", background: dark ? "#0D0D0F" : "#f8f8f8", border: `1px solid ${border}`, borderRadius: 8, padding: "11px 14px", fontSize: 15, color: dark ? "#f0f0f0" : "#111", outline: "none" }} />
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: textMuted, letterSpacing: "0.08em", display: "block", marginBottom: 12 }}>TEAMS YOU FOLLOW (optional)</label>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {teamPrefs.map(t => (
              <button key={t.id} onClick={() => togglePref(t.id)} className="team-pill" style={{ padding: "5px 14px", borderRadius: 20, border: `1px solid ${prefs[t.id] ? t.color : (dark ? "#2a2a3a" : "#d5d5d5")}`, background: prefs[t.id] ? t.color + "22" : "transparent", color: prefs[t.id] ? t.color : textMuted, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
                {t.name}
              </button>
            ))}
          </div>
        </div>

        <button onClick={() => email.includes("@") && submitted === false && setSubmitted(true)}
          style={{ width: "100%", background: DET_COLOR, color: "#fff", border: "none", borderRadius: 8, padding: "14px", fontSize: 16, fontWeight: 800, cursor: "pointer", letterSpacing: "0.06em" }}>
          {NEWSLETTER_PLANS.find(p => p.id === selectedPlan)?.cta.toUpperCase()}
        </button>
        <p style={{ fontSize: 12, color: textMuted, textAlign: "center", marginTop: 10 }}>No spam, ever. Unsubscribe anytime with one click.</p>
      </div>
    </div>
  );
}

// ─── ODDS PAGE ────────────────────────────────────────────────────────────────
function OddsPage({ dark }) {
  const surface = dark ? "#13131b" : "#fff";
  const border = dark ? "#1e1e28" : "#e8e8e8";
  const bg2 = dark ? "#0D0D0F" : "#f5f5f5";
  const textMuted = dark ? "#888" : "#666";
  const [sport, setSport] = useState("ALL");
  const [city, setCity] = useState("ALL");
  const [expanded, setExpanded] = useState(null);
  const [betSlip, setBetSlip] = useState([]);
  const [slipOpen, setSlipOpen] = useState(false);
  const [wagerAmounts, setWagerAmounts] = useState({});

  const sports = ["ALL", "NFL", "NBA", "MLB", "NHL"];
  const cities = ["ALL", "DETROIT", "CHICAGO"];

  const filtered = ODDS_DATA.filter(g => {
    const sportMatch = sport === "ALL" || g.sport === sport;
    const cityMatch = city === "ALL" || (city === "DETROIT" && (g.city === "detroit" || g.city === "both")) || (city === "CHICAGO" && (g.city === "chicago" || g.city === "both"));
    return sportMatch && cityMatch;
  });

  const mlToImplied = (ml) => {
    const n = parseInt(ml);
    return n > 0 ? (100 / (n + 100) * 100).toFixed(0) + "%" : ((-n) / (-n + 100) * 100).toFixed(0) + "%";
  };

  const addBet = (game, type, line, odds) => {
    const id = `${game.id}-${type}`;
    if (betSlip.find(b => b.id === id)) { setBetSlip(prev => prev.filter(b => b.id !== id)); return; }
    setBetSlip(prev => [...prev, { id, game: `${game.away} @ ${game.home}`, type, line, odds }]);
    setSlipOpen(true);
  };

  const hasBet = (gameId, type) => betSlip.some(b => b.id === `${gameId}-${type}`);

  const OddsBtn = ({ gameId, type, line, odds, label }) => {
    const active = hasBet(gameId, type);
    const isPos = odds && odds.startsWith("+");
    return (
      <div onClick={() => addBet(ODDS_DATA.find(g => g.id === gameId), type, line, odds)} style={{ background: active ? (isPos ? LIVE_GREEN + "22" : DET_COLOR + "22") : bg2, border: `1px solid ${active ? (isPos ? LIVE_GREEN : DET_COLOR) : (dark ? "#2a2a3a" : "#d5d5d5")}`, borderRadius: 8, padding: "8px 12px", cursor: "pointer", textAlign: "center", minWidth: 80, transition: "all 0.15s" }}>
        <div style={{ fontSize: 11, color: textMuted, marginBottom: 3, fontWeight: 600 }}>{label}</div>
        <div style={{ fontSize: 15, fontWeight: 800, color: active ? (isPos ? LIVE_GREEN : DET_COLOR) : (dark ? "#f0f0f0" : "#111") }}>{line || odds}</div>
        {line && <div style={{ fontSize: 12, color: isPos ? LIVE_GREEN : DET_COLOR, fontWeight: 700 }}>{odds}</div>}
      </div>
    );
  };

  const totalPayout = betSlip.reduce((sum, b) => {
    const wager = parseFloat(wagerAmounts[b.id]) || 0;
    if (!wager) return sum;
    const ml = parseInt(b.odds);
    const profit = ml > 0 ? wager * (ml / 100) : wager * (100 / Math.abs(ml));
    return sum + wager + profit;
  }, 0);

  return (
    <div className="fade-up" style={{ maxWidth: 1280, margin: "0 auto", padding: "30px 20px 60px" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 16 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
            <BarChart2 size={28} color={LIVE_GREEN} />
            <h1 className="headline-font" style={{ fontSize: 48 }}>BETTING ODDS</h1>
          </div>
          <p style={{ color: textMuted, fontSize: 15 }}>Latest lines for Detroit & Chicago teams. Odds updated regularly.</p>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ background: "#FFD70018", border: `1px solid #FFD70044`, borderRadius: 8, padding: "8px 14px", display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#FFD700" }}>
            <AlertTriangle size={14} /> Must be 21+ to wager
          </div>
          <button onClick={() => setSlipOpen(true)} style={{ position: "relative", background: LIVE_GREEN, border: "none", borderRadius: 8, padding: "10px 18px", cursor: "pointer", color: "#111", display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 800 }}>
            <DollarSign size={16} /> Bet Slip
            {betSlip.length > 0 && <span style={{ background: DET_COLOR, color: "#fff", borderRadius: "50%", width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800 }}>{betSlip.length}</span>}
          </button>
        </div>
      </div>

      {/* Disclaimer */}
      <div style={{ background: dark ? "#1a1208" : "#fffbea", border: `1px solid #FFD70044`, borderRadius: 8, padding: "10px 16px", marginBottom: 24, fontSize: 13, color: "#b89a00", display: "flex", alignItems: "flex-start", gap: 8 }}>
        <AlertTriangle size={16} style={{ flexShrink: 0, marginTop: 1 }} />
        <span>Odds shown are for informational and entertainment purposes only. Gambling involves risk. Please bet responsibly. Must be 21+ and located in a jurisdiction where sports betting is legal. If you or someone you know has a gambling problem, call 1-800-GAMBLER.</span>
      </div>

      {/* Affiliate Banners */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 28 }}>
        {[
          { name: "DraftKings", promo: "Bet $5, Get $200 in Bonus Bets", color: "#00B140", bg: "#00B14015" },
          { name: "FanDuel", promo: "No Sweat First Bet up to $1,000", color: "#1493FF", bg: "#1493FF15" },
          { name: "BetMGM", promo: "First Bet Offer up to $1,500", color: "#C8A84B", bg: "#C8A84B15" },
          { name: "Caesars", promo: "First Bet on Caesars up to $1,000", color: "#9B5DE5", bg: "#9B5DE515" },
        ].map(a => (
          <div key={a.name} style={{ background: a.bg, border: `1px solid ${a.color}33`, borderRadius: 10, padding: "14px 16px", cursor: "pointer" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <span style={{ fontWeight: 800, fontSize: 15, color: a.color }}>{a.name}</span>
              <ExternalLink size={13} color={a.color} />
            </div>
            <p style={{ fontSize: 12, color: textMuted, lineHeight: 1.4, marginBottom: 8 }}>{a.promo}</p>
            <div style={{ background: a.color, color: "#fff", fontSize: 12, fontWeight: 700, padding: "5px 12px", borderRadius: 5, textAlign: "center" }}>CLAIM OFFER</div>
            <p style={{ fontSize: 10, color: textMuted, marginTop: 6, textAlign: "center" }}>21+. T&Cs apply.</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 16, marginBottom: 28, flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: 6 }}>
          {sports.map(s => <button key={s} onClick={() => setSport(s)} className="team-pill" style={{ padding: "6px 14px", borderRadius: 20, border: `1px solid ${sport === s ? LIVE_GREEN : (dark ? "#2a2a3a" : "#d5d5d5")}`, background: sport === s ? LIVE_GREEN + "22" : "transparent", color: sport === s ? LIVE_GREEN : textMuted, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>{s}</button>)}
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {cities.map(c => <button key={c} onClick={() => setCity(c)} className="team-pill" style={{ padding: "6px 14px", borderRadius: 20, border: `1px solid ${city === c ? DET_COLOR : (dark ? "#2a2a3a" : "#d5d5d5")}`, background: city === c ? DET_COLOR + "22" : "transparent", color: city === c ? DET_COLOR : textMuted, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>{c}</button>)}
        </div>
      </div>

      {/* Odds Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {filtered.map(game => (
          <div key={game.id} style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, overflow: "hidden" }}>
            {/* Game Header */}
            <div style={{ padding: "14px 20px", borderBottom: `1px solid ${border}`, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <span style={{ background: game.sport === "NFL" ? "#0076B6" : game.sport === "NBA" ? DET_COLOR : game.sport === "MLB" ? LIVE_GREEN + "22" : "#888", color: game.sport === "MLB" ? LIVE_GREEN : "#fff", fontSize: 11, fontWeight: 800, padding: "3px 10px", borderRadius: 4 }}>{game.sport}</span>
              <span style={{ fontSize: 13, color: textMuted }}>{game.time}</span>
              <span style={{ fontWeight: 700, fontSize: 15 }}>{game.away}</span>
              <span style={{ color: textMuted, fontSize: 13 }}>@</span>
              <span style={{ fontWeight: 700, fontSize: 15 }}>{game.home}</span>
              <button onClick={() => setExpanded(expanded === game.id ? null : game.id)} style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", color: textMuted, display: "flex", alignItems: "center", gap: 4, fontSize: 13 }}>
                Details {expanded === game.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
            </div>
            {/* Odds Row */}
            <div style={{ padding: "16px 20px", display: "flex", gap: 12, flexWrap: "wrap", alignItems: "flex-start" }}>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ fontSize: 11, color: textMuted, fontWeight: 600, letterSpacing: "0.08em", marginBottom: 8 }}>MONEYLINE</div>
                <div style={{ display: "flex", gap: 8 }}>
                  <OddsBtn gameId={game.id} type="away-ml" line={null} odds={game.awayML} label={game.away.split(" ").pop()} />
                  <OddsBtn gameId={game.id} type="home-ml" line={null} odds={game.homeML} label={game.home.split(" ").pop()} />
                </div>
              </div>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ fontSize: 11, color: textMuted, fontWeight: 600, letterSpacing: "0.08em", marginBottom: 8 }}>SPREAD</div>
                <div style={{ display: "flex", gap: 8 }}>
                  <OddsBtn gameId={game.id} type="away-spread" line={game.awaySpread} odds="-110" label={game.away.split(" ").pop()} />
                  <OddsBtn gameId={game.id} type="home-spread" line={game.spread} odds="-110" label={game.home.split(" ").pop()} />
                </div>
              </div>
              <div style={{ flex: 1, minWidth: 160 }}>
                <div style={{ fontSize: 11, color: textMuted, fontWeight: 600, letterSpacing: "0.08em", marginBottom: 8 }}>OVER/UNDER</div>
                <div style={{ display: "flex", gap: 8 }}>
                  <OddsBtn gameId={game.id} type="over" line={`O ${game.total}`} odds="-110" label="OVER" />
                  <OddsBtn gameId={game.id} type="under" line={`U ${game.total}`} odds="-110" label="UNDER" />
                </div>
              </div>
            </div>
            {/* Expanded implied probability */}
            {expanded === game.id && (
              <div style={{ padding: "12px 20px 16px", background: bg2, borderTop: `1px solid ${border}` }}>
                <div style={{ fontSize: 12, color: textMuted, fontWeight: 700, letterSpacing: "0.08em", marginBottom: 10 }}>IMPLIED WIN PROBABILITY</div>
                <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                  <div>
                    <span style={{ fontSize: 13, color: textMuted }}>{game.away}: </span>
                    <span style={{ fontWeight: 700, fontSize: 14 }}>{mlToImplied(game.awayML)}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: 13, color: textMuted }}>{game.home}: </span>
                    <span style={{ fontWeight: 700, fontSize: 14 }}>{mlToImplied(game.homeML)}</span>
                  </div>
                  <div style={{ marginLeft: "auto", fontSize: 12, color: textMuted }}>
                    Odds via FanDuel · Lines subject to change
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        {filtered.length === 0 && <div style={{ textAlign: "center", padding: 48, color: textMuted, fontSize: 16 }}>No games match your filters right now.</div>}
      </div>

      {/* Bet Slip Drawer */}
      {slipOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 300 }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)" }} onClick={() => setSlipOpen(false)} />
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "min(400px, 100vw)", background: dark ? "#13131b" : "#fff", padding: 24, overflowY: "auto", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 className="headline-font" style={{ fontSize: 28, display: "flex", alignItems: "center", gap: 8 }}><DollarSign size={22} color={LIVE_GREEN} /> BET SLIP</h2>
              <button onClick={() => setSlipOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: textMuted }}><X size={22} /></button>
            </div>
            {betSlip.length === 0
              ? <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, color: textMuted }}>
                  <DollarSign size={44} strokeWidth={1} />
                  <p style={{ fontSize: 15 }}>No bets selected yet</p>
                  <p style={{ fontSize: 13, textAlign: "center" }}>Click any odds button to add a bet</p>
                </div>
              : <>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14 }}>
                    {betSlip.map(bet => (
                      <div key={bet.id} style={{ background: bg2, borderRadius: 10, padding: "14px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                          <div>
                            <div style={{ fontSize: 12, color: textMuted, marginBottom: 3 }}>{bet.game}</div>
                            <div style={{ fontSize: 14, fontWeight: 700 }}>{bet.type.includes("spread") ? `Spread: ${bet.line}` : bet.type.includes("over") || bet.type.includes("under") ? bet.line : `ML: ${bet.odds}`}</div>
                          </div>
                          <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                            <span className="headline-font" style={{ fontSize: 20, color: bet.odds?.startsWith("+") ? LIVE_GREEN : DET_COLOR }}>{bet.odds}</span>
                            <button onClick={() => setBetSlip(prev => prev.filter(b => b.id !== bet.id))} style={{ background: "none", border: "none", cursor: "pointer", color: textMuted }}><X size={14} /></button>
                          </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ fontSize: 12, color: textMuted }}>$</span>
                          <input type="number" placeholder="Wager" value={wagerAmounts[bet.id] || ""} onChange={e => setWagerAmounts(p => ({ ...p, [bet.id]: e.target.value }))}
                            style={{ flex: 1, background: dark ? "#0D0D0F" : "#fff", border: `1px solid ${border}`, borderRadius: 6, padding: "6px 10px", fontSize: 14, color: dark ? "#f0f0f0" : "#111", outline: "none" }} />
                          {wagerAmounts[bet.id] && (
                            <span style={{ fontSize: 12, color: LIVE_GREEN, fontWeight: 700, flexShrink: 0 }}>
                              Win: ${(() => { const ml = parseInt(bet.odds); const w = parseFloat(wagerAmounts[bet.id]); return ml > 0 ? (w * ml / 100).toFixed(2) : (w * 100 / Math.abs(ml)).toFixed(2); })()}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ borderTop: `1px solid ${border}`, paddingTop: 20, marginTop: 20 }}>
                    {totalPayout > 0 && <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                      <span style={{ color: textMuted, fontSize: 14 }}>Total Potential Payout</span>
                      <span className="headline-font" style={{ fontSize: 22, color: LIVE_GREEN }}>${totalPayout.toFixed(2)}</span>
                    </div>}
                    <button style={{ width: "100%", background: LIVE_GREEN, color: "#111", border: "none", borderRadius: 8, padding: "14px", fontSize: 15, fontWeight: 800, cursor: "pointer", letterSpacing: "0.06em" }}>PLACE BETS</button>
                    <p style={{ fontSize: 11, color: textMuted, textAlign: "center", marginTop: 8 }}>21+ only. Bet responsibly. 1-800-GAMBLER</p>
                  </div>
                </>
            }
          </div>
        </div>
      )}
    </div>
  );
}

// ─── SCORES PAGE ─────────────────────────────────────────────────────────────
function ScoresPage({ dark }) {
  const surface = dark ? "#13131b" : "#fff";
  const border = dark ? "#1e1e28" : "#e8e8e8";
  const bg2 = dark ? "#0D0D0F" : "#f5f5f5";
  const textMuted = dark ? "#888" : "#666";
  const [scores, setScores] = useState(SCORES);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [sportFilter, setSportFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const fetchScores = async () => {
    try {
      const res = await fetch("/api/scores");
      const data = await res.json();
      if (data.games && data.games.length > 0) {
        setScores(data.games);
        setLastUpdated(new Date());
      }
    } catch { /* keep existing */ }
    setLoading(false);
  };

  useEffect(() => {
    fetchScores();
    const interval = setInterval(fetchScores, 60000);
    return () => clearInterval(interval);
  }, []);

  const sports = ["ALL", "NFL", "NBA", "MLB", "NHL"];
  const statuses = ["ALL", "LIVE", "FINAL", "UPCOMING"];

  const filtered = scores.filter(s => {
    const sportMatch = sportFilter === "ALL" || s.sport === sportFilter;
    const statusMatch = statusFilter === "ALL" || s.status === statusFilter;
    return sportMatch && statusMatch;
  });

  const liveGames = filtered.filter(s => s.status === "LIVE");
  const finalGames = filtered.filter(s => s.status === "FINAL");
  const upcomingGames = filtered.filter(s => s.status === "UPCOMING");

  const sportColor = (sport) => sport === "NFL" ? "#0076B6" : sport === "NBA" ? DET_COLOR : sport === "MLB" ? LIVE_GREEN : "#888";

  const GameCard = ({ game }) => {
    const isLive = game.status === "LIVE";
    const isFinal = game.status === "FINAL";
    const isUpcoming = game.status === "UPCOMING";
    const detTeams = ["DET", "TIG", "PIS", "WIN", "LIO", "RED"];
    const chiTeams = ["CHI", "BUL", "CUB", "SOX", "HAW", "BEA", "BLA"];
    const awayIsLocal = detTeams.includes(game.away) || chiTeams.includes(game.away);
    const homeIsLocal = detTeams.includes(game.home) || chiTeams.includes(game.home);

    return (
      <div style={{ background: surface, border: `1px solid ${isLive ? LIVE_GREEN + "44" : border}`, borderRadius: 12, overflow: "hidden", position: "relative", boxShadow: isLive ? `0 0 20px ${LIVE_GREEN}15` : "none" }}>
        {/* Top bar */}
        <div style={{ background: isLive ? LIVE_GREEN + "15" : bg2, padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${isLive ? LIVE_GREEN + "33" : border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ background: sportColor(game.sport), color: "#fff", fontSize: 11, fontWeight: 800, padding: "2px 8px", borderRadius: 3 }}>{game.sport}</span>
            {isLive && <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 700, color: LIVE_GREEN }}><span className="live-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: LIVE_GREEN, display: "inline-block" }} /> LIVE</span>}
            {isFinal && <span style={{ fontSize: 12, color: textMuted, fontWeight: 600 }}>FINAL</span>}
            {isUpcoming && <span style={{ fontSize: 12, color: "#7ab8f5", fontWeight: 600 }}>UPCOMING</span>}
          </div>
          <span style={{ fontSize: 12, color: textMuted }}>{game.info}</span>
        </div>

        {/* Score display */}
        <div style={{ padding: "20px 20px" }}>
          {/* Away team */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 8, background: isUpcoming ? bg2 : (game.as > game.hs && !isUpcoming ? (dark ? "#ffffff10" : "#f0f0f0") : bg2), display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span className="headline-font" style={{ fontSize: 14, color: textMuted }}>{game.away}</span>
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{game.awayFull || game.away}</div>
                <div style={{ fontSize: 12, color: textMuted }}>Away</div>
              </div>
            </div>
            {!isUpcoming && (
              <span className="headline-font" style={{ fontSize: 42, lineHeight: 1, color: game.as > game.hs ? (dark ? "#fff" : "#111") : textMuted }}>{game.as}</span>
            )}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ flex: 1, height: 1, background: border }} />
            <span style={{ fontSize: 12, color: textMuted, fontWeight: 600 }}>VS</span>
            <div style={{ flex: 1, height: 1, background: border }} />
          </div>

          {/* Home team */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 8, background: bg2, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span className="headline-font" style={{ fontSize: 14, color: textMuted }}>{game.home}</span>
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{game.homeFull || game.home}</div>
                <div style={{ fontSize: 12, color: textMuted }}>Home</div>
              </div>
            </div>
            {!isUpcoming && (
              <span className="headline-font" style={{ fontSize: 42, lineHeight: 1, color: game.hs > game.as ? (dark ? "#fff" : "#111") : textMuted }}>{game.hs}</span>
            )}
          </div>
        </div>

        {/* Winner banner */}
        {isFinal && (
          <div style={{ background: bg2, padding: "8px 16px", borderTop: `1px solid ${border}`, fontSize: 12, color: textMuted, fontWeight: 600, textAlign: "center" }}>
            {game.hs > game.as ? `${game.homeFull || game.home} WIN` : game.as > game.hs ? `${game.awayFull || game.away} WIN` : "TIE"}
          </div>
        )}
        {isUpcoming && (
          <div style={{ background: CHI_COLOR + "15", padding: "8px 16px", borderTop: `1px solid ${border}`, fontSize: 12, color: "#7ab8f5", fontWeight: 600, textAlign: "center" }}>
            {game.info}
          </div>
        )}
      </div>
    );
  };

  const Section = ({ title, games, color }) => games.length === 0 ? null : (
    <div style={{ marginBottom: 40 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <div style={{ width: 4, height: 28, background: color, borderRadius: 2 }} />
        <h2 className="headline-font" style={{ fontSize: 28 }}>{title}</h2>
        <span style={{ background: color + "22", color: color, fontSize: 12, fontWeight: 700, padding: "3px 10px", borderRadius: 12 }}>{games.length}</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
        {games.map((g, i) => <GameCard key={i} game={g} />)}
      </div>
    </div>
  );

  return (
    <div className="fade-up" style={{ maxWidth: 1280, margin: "0 auto", padding: "30px 20px 60px" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 16 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
            <Radio size={28} color={LIVE_GREEN} />
            <h1 className="headline-font" style={{ fontSize: 48 }}>LIVE SCORES</h1>
            {loading && <RefreshCw size={18} color={textMuted} style={{ animation: "spin 1s linear infinite" }} />}
          </div>
          <p style={{ color: textMuted, fontSize: 14 }}>
            Detroit & Chicago games · {lastUpdated ? `Updated ${lastUpdated.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}` : "Loading..."}
          </p>
        </div>
        <button onClick={fetchScores} style={{ background: dark ? "#1e1e28" : "#eee", border: `1px solid ${border}`, borderRadius: 8, padding: "9px 16px", cursor: "pointer", color: dark ? "#ccc" : "#333", display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700 }}>
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 16, marginBottom: 32, flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {sports.map(s => <button key={s} onClick={() => setSportFilter(s)} className="team-pill" style={{ padding: "6px 14px", borderRadius: 20, border: `1px solid ${sportFilter === s ? LIVE_GREEN : (dark ? "#2a2a3a" : "#d5d5d5")}`, background: sportFilter === s ? LIVE_GREEN + "22" : "transparent", color: sportFilter === s ? LIVE_GREEN : textMuted, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>{s}</button>)}
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {statuses.map(s => <button key={s} onClick={() => setStatusFilter(s)} className="team-pill" style={{ padding: "6px 14px", borderRadius: 20, border: `1px solid ${statusFilter === s ? DET_COLOR : (dark ? "#2a2a3a" : "#d5d5d5")}`, background: statusFilter === s ? DET_COLOR + "22" : "transparent", color: statusFilter === s ? DET_COLOR : textMuted, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>{s}</button>)}
        </div>
      </div>

      {loading ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {[1,2,3,4,5,6].map(i => <div key={i} className={dark ? "skeleton" : "skeleton-light"} style={{ height: 220, borderRadius: 12 }} />)}
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px", color: textMuted }}>
          <Radio size={48} strokeWidth={1} style={{ marginBottom: 16 }} />
          <p style={{ fontSize: 16 }}>No games match your filters right now.</p>
        </div>
      ) : (
        <>
          <Section title="LIVE NOW" games={liveGames} color={LIVE_GREEN} />
          <Section title="FINAL" games={finalGames} color={textMuted} />
          <Section title="UPCOMING" games={upcomingGames} color={CHI_COLOR} />
        </>
      )}
    </div>
  );
}

// ─── AD BANNER ───────────────────────────────────────────────────────────────
function AdBanner({ dark, size = "leaderboard" }) {
  const border = dark ? "#1e1e28" : "#e8e8e8";
  const bg = dark ? "#111118" : "#f8f8f8";
  const textMuted = dark ? "#555" : "#bbb";
  const isLarge = size === "leaderboard";
  return (
    <div style={{ background: bg, border: `1px solid ${border}`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 6, padding: isLarge ? "20px" : "14px", minHeight: isLarge ? 100 : 60, position: "relative" }}>
      <span style={{ position: "absolute", top: 6, right: 8, fontSize: 10, color: textMuted, letterSpacing: "0.08em" }}>ADVERTISEMENT</span>
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        {[
          { label: "DraftKings", color: "#00B140", text: "Bet $5 Get $200" },
          { label: "FanDuel", color: "#1493FF", text: "No Sweat First Bet" },
          { label: "BetMGM", color: "#C8A84B", text: "Bet $10 Win $200" },
        ].slice(0, isLarge ? 3 : 1).map(ad => (
          <div key={ad.label} style={{ textAlign: "center" }}>
            <div style={{ background: ad.color, color: "#fff", fontWeight: 800, fontSize: 13, padding: "6px 16px", borderRadius: 6, marginBottom: 3, cursor: "pointer" }}>{ad.label}</div>
            <div style={{ fontSize: 11, color: textMuted }}>{ad.text}</div>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 10, color: textMuted, textAlign: "center" }}>21+ only. Gambling problem? Call 1-800-GAMBLER.</p>
    </div>
  );
}

// ─── POLL WIDGET ──────────────────────────────────────────────────────────────
function PollWidget({ poll, dark }) {
  const surface = dark ? "#13131b" : "#fff";
  const border = dark ? "#1e1e28" : "#e8e8e8";
  const textMuted = dark ? "#888" : "#666";
  const [voted, setVoted] = useState(null);
  const [votes, setVotes] = useState(poll.votes);
  const total = votes.reduce((a, b) => a + b, 0);

  const vote = (i) => {
    if (voted !== null) return;
    setVoted(i);
    setVotes(prev => prev.map((v, idx) => idx === i ? v + 1 : v));
  };

  return (
    <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 10, padding: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        <ThumbsUp size={16} color={DET_COLOR} />
        <span style={{ fontSize: 12, fontWeight: 700, color: DET_COLOR, letterSpacing: "0.08em" }}>FAN POLL</span>
      </div>
      <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14, lineHeight: 1.4 }}>{poll.question}</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {poll.options.map((opt, i) => {
          const pct = total > 0 ? Math.round((votes[i] / (total + (voted !== null ? 0 : 0))) * 100) : 0;
          const isWinner = voted !== null && votes[i] === Math.max(...votes);
          return (
            <div key={i} onClick={() => vote(i)} style={{ position: "relative", cursor: voted === null ? "pointer" : "default", borderRadius: 8, overflow: "hidden", border: `1px solid ${voted === i ? DET_COLOR : border}` }}>
              {voted !== null && <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${pct}%`, background: voted === i ? DET_COLOR + "33" : (dark ? "#1e1e28" : "#f0f0f0"), transition: "width 0.5s ease" }} />}
              <div style={{ position: "relative", padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 14, fontWeight: voted === i ? 700 : 500 }}>{opt}</span>
                {voted !== null && <span style={{ fontSize: 13, fontWeight: 700, color: isWinner ? DET_COLOR : textMuted }}>{pct}%</span>}
              </div>
            </div>
          );
        })}
      </div>
      <p style={{ fontSize: 12, color: textMuted, marginTop: 10 }}>{(total + (voted !== null ? 1 : 0)).toLocaleString()} votes</p>
    </div>
  );
}

// ─── COMMENTS SECTION ────────────────────────────────────────────────────────
function CommentsSection({ dark, articleId }) {
  const surface = dark ? "#13131b" : "#fff";
  const border = dark ? "#1e1e28" : "#e8e8e8";
  const bg2 = dark ? "#0D0D0F" : "#f5f5f5";
  const textMuted = dark ? "#888" : "#666";

  const INIT_COMMENTS = {
    d1: [
      { id:1, name:"LionsNation88", avatar:"LN", color:DET_COLOR, time:"1h ago", text:"This team is absolutely for real. No more 'same old Lions' — this is a completely different franchise.", likes:47 },
      { id:2, name:"DetroitFanatic", avatar:"DF", color:"#0076B6", time:"2h ago", text:"Goff deserves all the credit he's been denied. The guy is playing at an elite level right now.", likes:31 },
    ],
    c1: [
      { id:1, name:"BearDown2025", avatar:"BD", color:CHI_COLOR, time:"30m ago", text:"Caleb Williams is going to be something special. That performance gave me chills.", likes:63 },
      { id:2, name:"ChiSportsFan", avatar:"CS", color:"#C83803", time:"1h ago", text:"Finally a Bears QB worth getting excited about. Building something real on the north side.", likes:28 },
    ],
  };

  const [comments, setComments] = useState(INIT_COMMENTS[articleId] || []);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [liked, setLiked] = useState([]);

  const submit = () => {
    if (!text.trim() || !name.trim()) return;
    const newComment = { id: Date.now(), name, avatar: name.slice(0, 2).toUpperCase(), color: DET_COLOR, time: "Just now", text, likes: 0 };
    setComments(prev => [newComment, ...prev]);
    setText(""); setName("");
  };

  const toggleLike = (id) => {
    setLiked(prev => prev.includes(id) ? prev.filter(l => l !== id) : [...prev, id]);
    setComments(prev => prev.map(c => c.id === id ? { ...c, likes: liked.includes(id) ? c.likes - 1 : c.likes + 1 } : c));
  };

  return (
    <div style={{ maxWidth: 720, marginTop: 40, paddingTop: 32, borderTop: `1px solid ${border}` }}>
      <h3 className="headline-font" style={{ fontSize: 26, marginBottom: 24, display: "flex", alignItems: "center", gap: 10 }}>
        <MessageCircle size={20} /> COMMENTS ({comments.length})
      </h3>

      {/* Comment form */}
      <div style={{ background: bg2, borderRadius: 10, padding: 16, marginBottom: 28, border: `1px solid ${border}` }}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" style={{ width: "100%", background: dark ? "#13131b" : "#fff", border: `1px solid ${border}`, borderRadius: 6, padding: "8px 12px", fontSize: 14, color: dark ? "#f0f0f0" : "#111", outline: "none", marginBottom: 10 }} />
        <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Join the conversation..." rows={3} style={{ width: "100%", background: dark ? "#13131b" : "#fff", border: `1px solid ${border}`, borderRadius: 6, padding: "10px 12px", fontSize: 14, color: dark ? "#f0f0f0" : "#111", outline: "none", resize: "vertical", fontFamily: "inherit", marginBottom: 10 }} />
        <button onClick={submit} style={{ background: DET_COLOR, color: "#fff", border: "none", borderRadius: 6, padding: "9px 20px", cursor: "pointer", fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
          <Send size={14} /> Post Comment
        </button>
      </div>

      {/* Comments list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {comments.length === 0 ? (
          <p style={{ color: textMuted, fontSize: 14, textAlign: "center", padding: "24px 0" }}>Be the first to comment!</p>
        ) : comments.map(c => (
          <div key={c.id} style={{ display: "flex", gap: 12 }}>
            <div style={{ width: 38, height: 38, borderRadius: "50%", background: c.color + "33", border: `2px solid ${c.color}44`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 13, fontWeight: 700, color: c.color }}>{c.avatar}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ fontWeight: 700, fontSize: 14 }}>{c.name}</span>
                <span style={{ fontSize: 12, color: textMuted }}>{c.time}</span>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: dark ? "#d0d0d0" : "#333", marginBottom: 8 }}>{c.text}</p>
              <button onClick={() => toggleLike(c.id)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, fontSize: 13, color: liked.includes(c.id) ? DET_COLOR : textMuted, fontWeight: liked.includes(c.id) ? 700 : 400 }}>
                <Heart size={13} fill={liked.includes(c.id) ? DET_COLOR : "none"} color={liked.includes(c.id) ? DET_COLOR : textMuted} /> {c.likes}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MEDIA PAGE ──────────────────────────────────────────────────────────────
function MediaPage({ dark }) {
  const surface = dark ? "#13131b" : "#fff";
  const border = dark ? "#1e1e28" : "#e8e8e8";
  const bg2 = dark ? "#0D0D0F" : "#f5f5f5";
  const textMuted = dark ? "#888" : "#666";
  const [playingEp, setPlayingEp] = useState(null);
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [playingVideo, setPlayingVideo] = useState(null);
  const [lightboxImg, setLightboxImg] = useState(null);
  const [tab, setTab] = useState("videos");

  useEffect(() => {
    let t;
    if (playing) t = setInterval(() => setProgress(p => p >= 100 ? 0 : p + 0.2), 300);
    return () => clearInterval(t);
  }, [playing]);

  const selectEp = (ep) => { setPlayingEp(ep); setProgress(0); setPlaying(true); };

  return (
    <div className="fade-up" style={{ maxWidth: 1280, margin: "0 auto", padding: "30px 20px 60px" }}>
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
          <Video size={28} color={DET_COLOR} />
          <h1 className="headline-font" style={{ fontSize: 48 }}>MEDIA CENTER</h1>
        </div>
        <p style={{ color: textMuted, fontSize: 15 }}>Highlights, podcasts, and photo galleries from Detroit & Chicago sports.</p>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 28, borderBottom: `1px solid ${border}`, paddingBottom: 0 }}>
        {[{id:"videos",label:"🎬 Highlights"},{id:"podcast",label:"🎙️ Podcast"},{id:"gallery",label:"📸 Gallery"}].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ background: "none", border: "none", cursor: "pointer", padding: "10px 20px", fontSize: 15, fontWeight: 700, color: tab === t.id ? DET_COLOR : textMuted, borderBottom: `2px solid ${tab === t.id ? DET_COLOR : "transparent"}`, marginBottom: -1 }}>{t.label}</button>
        ))}
      </div>

      {/* VIDEOS TAB */}
      {tab === "videos" && (
        <>
          {playingVideo && (
            <div style={{ marginBottom: 32, borderRadius: 12, overflow: "hidden", background: "#000", aspectRatio: "16/9", position: "relative" }}>
              <img src={playingVideo.thumb} alt={playingVideo.title} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.3 }} />
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
                <Play size={64} color="#fff" fill="#fff" />
                <p style={{ color: "#fff", fontWeight: 700, fontSize: 16, textAlign: "center", maxWidth: 500, padding: "0 20px" }}>{playingVideo.title}</p>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>Video player would embed here with real YouTube ID</p>
              </div>
              <button onClick={() => setPlayingVideo(null)} style={{ position: "absolute", top: 12, right: 12, background: "rgba(0,0,0,0.6)", border: "none", borderRadius: "50%", width: 36, height: 36, cursor: "pointer", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}><X size={16} /></button>
            </div>
          )}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
            {VIDEOS.map(v => (
              <div key={v.id} className="article-card" onClick={() => setPlayingVideo(v)} style={{ background: surface, border: `1px solid ${border}`, borderRadius: 10, overflow: "hidden" }}>
                <div style={{ position: "relative", aspectRatio: "16/9" }}>
                  <img src={v.thumb} alt={v.title} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(255,255,255,0.9)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Play size={20} color="#111" fill="#111" style={{ marginLeft: 3 }} />
                    </div>
                  </div>
                  <span style={{ position: "absolute", bottom: 8, right: 8, background: "rgba(0,0,0,0.8)", color: "#fff", fontSize: 12, fontWeight: 700, padding: "2px 7px", borderRadius: 4 }}>{v.duration}</span>
                  <span style={{ position: "absolute", top: 8, left: 8, background: DET_COLOR, color: "#fff", fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 3 }}>{v.team}</span>
                </div>
                <div style={{ padding: "12px 14px" }}>
                  <h3 style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.4, marginBottom: 6 }}>{v.title}</h3>
                  <span style={{ fontSize: 12, color: textMuted }}>{v.views} views</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* PODCAST TAB */}
      {tab === "podcast" && (
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 340px", gap: 28 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {PODCAST_EPISODES.map(ep => (
              <div key={ep.id} onClick={() => selectEp(ep)} style={{ background: surface, border: `1px solid ${playingEp?.id === ep.id ? DET_COLOR : border}`, borderRadius: 10, padding: 16, cursor: "pointer", display: "flex", gap: 14, alignItems: "center", transition: "border-color 0.2s" }}>
                <div style={{ position: "relative", flexShrink: 0 }}>
                  <img src={ep.image} alt={ep.title} style={{ width: 64, height: 64, borderRadius: 8, objectFit: "cover" }} />
                  {playingEp?.id === ep.id && playing && (
                    <div style={{ position: "absolute", inset: 0, borderRadius: 8, background: "rgba(200,16,46,0.7)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Pause size={20} color="#fff" />
                    </div>
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.35, marginBottom: 4 }}>{ep.title}</h3>
                  <p style={{ fontSize: 12, color: textMuted, marginBottom: 4 }}>with {ep.guest}</p>
                  <div style={{ display: "flex", gap: 12, fontSize: 12, color: textMuted }}>
                    <span><Clock size={11} style={{ display: "inline", marginRight: 3 }} />{ep.duration}</span>
                    <span>{ep.date}</span>
                  </div>
                </div>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: playingEp?.id === ep.id ? DET_COLOR : bg2, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {playingEp?.id === ep.id && playing ? <Pause size={14} color="#fff" /> : <Play size={14} color={playingEp?.id === ep.id ? "#fff" : textMuted} style={{ marginLeft: 2 }} />}
                </div>
              </div>
            ))}
          </div>

          {/* Player */}
          <div style={{ position: "sticky", top: 80 }}>
            <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 14, overflow: "hidden" }}>
              <div style={{ background: `linear-gradient(135deg, ${DET_COLOR}22, ${CHI_COLOR}22)`, padding: 24, textAlign: "center" }}>
                <img src={playingEp?.image || PODCAST_EPISODES[0].image} alt="" style={{ width: 120, height: 120, borderRadius: 12, objectFit: "cover", marginBottom: 14, boxShadow: "0 8px 24px rgba(0,0,0,0.3)" }} />
                <h3 style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.35, marginBottom: 6 }}>{playingEp?.title || PODCAST_EPISODES[0].title}</h3>
                <p style={{ fontSize: 12, color: textMuted }}>{playingEp?.guest || PODCAST_EPISODES[0].guest}</p>
              </div>
              <div style={{ padding: "16px 20px 20px" }}>
                {/* Progress bar */}
                <div style={{ height: 4, background: dark ? "#1e1e28" : "#eee", borderRadius: 2, marginBottom: 8, cursor: "pointer", position: "relative" }}>
                  <div style={{ height: "100%", width: `${progress}%`, background: DET_COLOR, borderRadius: 2, transition: "width 0.3s" }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: textMuted, marginBottom: 16 }}>
                  <span>{Math.floor(progress * 0.58)}:00</span>
                  <span>{playingEp?.duration || PODCAST_EPISODES[0].duration}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
                  <button onClick={() => setProgress(p => Math.max(0, p - 5))} style={{ background: "none", border: "none", cursor: "pointer", color: textMuted }}><SkipBack size={22} /></button>
                  <button onClick={() => setPlaying(!playing)} style={{ width: 52, height: 52, borderRadius: "50%", background: DET_COLOR, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                    {playing ? <Pause size={22} /> : <Play size={22} style={{ marginLeft: 3 }} />}
                  </button>
                  <button onClick={() => setProgress(p => Math.min(100, p + 5))} style={{ background: "none", border: "none", cursor: "pointer", color: textMuted }}><SkipForward size={22} /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* GALLERY TAB */}
      {tab === "gallery" && (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12 }}>
            {GALLERY.map(g => (
              <div key={g.id} className="hero-card" onClick={() => setLightboxImg(g)} style={{ borderRadius: 10, overflow: "hidden", aspectRatio: "4/3", cursor: "pointer" }}>
                <img src={g.image} alt={g.caption} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)" }} />
                <div style={{ position: "absolute", bottom: 10, left: 12, right: 12 }}>
                  <span style={{ background: DET_COLOR, color: "#fff", fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 3, marginBottom: 4, display: "inline-block" }}>{g.team}</span>
                  <p style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>{g.caption}</p>
                </div>
              </div>
            ))}
          </div>
          {lightboxImg && (
            <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.95)", zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={() => setLightboxImg(null)}>
              <div onClick={e => e.stopPropagation()} style={{ maxWidth: 900, width: "100%" }}>
                <img src={lightboxImg.image} alt={lightboxImg.caption} style={{ width: "100%", borderRadius: 10 }} />
                <p style={{ color: "#fff", textAlign: "center", marginTop: 12, fontSize: 15 }}>{lightboxImg.caption}</p>
                <button onClick={() => setLightboxImg(null)} style={{ position: "absolute", top: 20, right: 20, background: "rgba(255,255,255,0.15)", border: "none", borderRadius: "50%", width: 40, height: 40, cursor: "pointer", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}><X size={18} /></button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ─── RUMORS PAGE ─────────────────────────────────────────────────────────────
function RumorsPage({ dark, onArticleClick }) {
  const surface = dark ? "#13131b" : "#fff";
  const border = dark ? "#1e1e28" : "#e8e8e8";
  const bg2 = dark ? "#0D0D0F" : "#f5f5f5";
  const textMuted = dark ? "#888" : "#666";
  const [filter, setFilter] = useState("ALL");
  const [likedRumors, setLikedRumors] = useState([]);

  const sports = ["ALL", "NFL", "NBA", "MLB", "NHL"];
  const filtered = filter === "ALL" ? RUMORS : RUMORS.filter(r => r.sport === filter);
  const toggleLike = (id) => setLikedRumors(prev => prev.includes(id) ? prev.filter(l => l !== id) : [...prev, id]);

  return (
    <div className="fade-up" style={{ maxWidth: 1280, margin: "0 auto", padding: "30px 20px 60px" }}>
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
          <Newspaper size={28} color="#FF4500" />
          <h1 className="headline-font" style={{ fontSize: 48 }}>TRADE RUMORS</h1>
        </div>
        <p style={{ color: textMuted, fontSize: 15 }}>Latest intel on moves, extensions, and transactions across Detroit & Chicago.</p>
      </div>

      {/* Sport filters */}
      <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
        {sports.map(s => <button key={s} onClick={() => setFilter(s)} className="team-pill" style={{ padding: "6px 16px", borderRadius: 20, border: `1px solid ${filter === s ? "#FF4500" : (dark ? "#2a2a3a" : "#d5d5d5")}`, background: filter === s ? "#FF450022" : "transparent", color: filter === s ? "#FF4500" : textMuted, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>{s}</button>)}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr min(320px,30%)", gap: 28 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {filtered.map(r => (
            <div key={r.id} style={{ background: surface, border: `1px solid ${r.hot ? "#FF450044" : border}`, borderRadius: 12, overflow: "hidden", display: "flex" }}>
              <img src={r.image} alt={r.title} style={{ width: 120, height: "100%", objectFit: "cover", flexShrink: 0 }} />
              <div style={{ padding: "14px 16px", flex: 1 }}>
                <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
                  {r.hot && <span style={{ background: "#FF4500", color: "#fff", fontSize: 10, fontWeight: 800, padding: "2px 7px", borderRadius: 3, display: "flex", alignItems: "center", gap: 3 }}><Flame size={9} /> HOT</span>}
                  <span style={{ background: r.city === "detroit" ? DET_COLOR : CHI_COLOR, color: "#fff", fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 3 }}>{r.sport}</span>
                  <span style={{ background: bg2, color: textMuted, fontSize: 10, fontWeight: 600, padding: "2px 7px", borderRadius: 3 }}>{r.team.toUpperCase()}</span>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.35, marginBottom: 8 }}>{r.title}</h3>
                <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 12, color: textMuted }}>
                  <span>{r.source}</span>
                  <span>·</span>
                  <span><Clock size={11} style={{ display: "inline", marginRight: 3 }} />{r.time}</span>
                  <button onClick={() => toggleLike(r.id)} style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: likedRumors.includes(r.id) ? DET_COLOR : textMuted, fontWeight: likedRumors.includes(r.id) ? 700 : 400 }}>
                    <Heart size={12} fill={likedRumors.includes(r.id) ? DET_COLOR : "none"} color={likedRumors.includes(r.id) ? DET_COLOR : textMuted} />
                    {r.likes + (likedRumors.includes(r.id) ? 1 : 0)}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar with polls and ads */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <PollWidget poll={POLLS[0]} dark={dark} />
          <AdBanner dark={dark} size="sidebar" />
          <PollWidget poll={POLLS[2]} dark={dark} />
        </div>
      </div>
    </div>
  );
}

// ─── MY TEAMS PAGE ───────────────────────────────────────────────────────────
function MyTeamsPage({ dark, articles, onArticleClick, bookmarks, toggleBookmark }) {
  const surface = dark ? "#13131b" : "#fff";
  const border = dark ? "#1e1e28" : "#e8e8e8";
  const textMuted = dark ? "#888" : "#666";
  const allTeams = [
    ...DETROIT_TEAMS.map(t => ({ ...t, city: "detroit" })),
    ...CHICAGO_TEAMS.map(t => ({ ...t, city: "chicago" }))
  ];
  const [followed, setFollowed] = useState(() => {
    try { return JSON.parse(localStorage.getItem("us12_followed") || '["lions","bears"]'); } catch { return ["lions", "bears"]; }
  });

  const toggleFollow = (id) => {
    setFollowed(prev => {
      const next = prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id];
      try { localStorage.setItem("us12_followed", JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const myArticles = followed.length > 0 ? articles.filter(a => followed.includes(a.team)) : articles;

  return (
    <div className="fade-up" style={{ maxWidth: 1280, margin: "0 auto", padding: "30px 20px 60px" }}>
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
          <UserCheck size={28} color={DET_COLOR} />
          <h1 className="headline-font" style={{ fontSize: 48 }}>MY TEAMS</h1>
        </div>
        <p style={{ color: textMuted, fontSize: 15 }}>Follow your teams to get a personalized news feed.</p>
      </div>

      {/* Team grid */}
      <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 14, padding: 24, marginBottom: 36 }}>
        <h2 className="headline-font" style={{ fontSize: 24, marginBottom: 20 }}>CHOOSE YOUR TEAMS</h2>
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <div style={{ width: 4, height: 20, background: DET_COLOR, borderRadius: 2 }} />
            <span style={{ fontWeight: 700, fontSize: 14, letterSpacing: "0.08em" }}>DETROIT</span>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {DETROIT_TEAMS.map(t => (
              <button key={t.id} onClick={() => toggleFollow(t.id)} style={{ padding: "10px 18px", borderRadius: 8, border: `2px solid ${followed.includes(t.id) ? t.color : (dark ? "#2a2a3a" : "#d5d5d5")}`, background: followed.includes(t.id) ? t.color : "transparent", color: followed.includes(t.id) ? "#fff" : textMuted, fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 7, transition: "all 0.15s" }}>
                {followed.includes(t.id) ? <UserCheck size={14} /> : <Users size={14} />}
                {t.name} <span style={{ opacity: 0.7, fontSize: 12 }}>{t.sport}</span>
              </button>
            ))}
          </div>
        </div>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <div style={{ width: 4, height: 20, background: CHI_COLOR, borderRadius: 2 }} />
            <span style={{ fontWeight: 700, fontSize: 14, letterSpacing: "0.08em" }}>CHICAGO</span>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {CHICAGO_TEAMS.map(t => (
              <button key={t.id} onClick={() => toggleFollow(t.id)} style={{ padding: "10px 18px", borderRadius: 8, border: `2px solid ${followed.includes(t.id) ? t.color : (dark ? "#2a2a3a" : "#d5d5d5")}`, background: followed.includes(t.id) ? t.color : "transparent", color: followed.includes(t.id) ? "#fff" : textMuted, fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 7, transition: "all 0.15s" }}>
                {followed.includes(t.id) ? <UserCheck size={14} /> : <Users size={14} />}
                {t.name} <span style={{ opacity: 0.7, fontSize: 12 }}>{t.sport}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Personalized feed */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <div style={{ width: 4, height: 28, background: DET_COLOR, borderRadius: 2 }} />
          <h2 className="headline-font" style={{ fontSize: 28 }}>YOUR FEED</h2>
          <span style={{ background: DET_COLOR + "22", color: DET_COLOR, fontSize: 12, fontWeight: 700, padding: "3px 10px", borderRadius: 12 }}>{myArticles.length} stories</span>
        </div>
        {followed.length === 0 ? (
          <div style={{ textAlign: "center", padding: "48px 20px", color: textMuted }}>
            <Users size={48} strokeWidth={1} style={{ marginBottom: 12 }} />
            <p style={{ fontSize: 16 }}>Follow some teams above to build your personalized feed!</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
            {myArticles.map(a => <ArticleCard key={a.id} article={a} dark={dark} bookmarks={bookmarks} toggleBookmark={toggleBookmark} onClick={() => onArticleClick(a)} />)}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── GAME DAY BANNER ─────────────────────────────────────────────────────────
function GameDayBanner({ dark }) {
  const today = new Date();
  const dayOfWeek = today.getDay();
  // Lions play Sundays (0) and sometimes Thursday (4) and Monday (1)
  // Tigers play pretty much daily in season (April-October, months 3-9)
  const month = today.getMonth();
  const isMLBSeason = month >= 3 && month <= 9;
  const isNFLSeason = month >= 8 || month <= 1;
  const isLionsGameDay = isNFLSeason && (dayOfWeek === 0 || dayOfWeek === 4 || dayOfWeek === 1);
  const isTigersGameDay = isMLBSeason && dayOfWeek !== 1; // Tigers rarely have Mondays off

  if (!isLionsGameDay && !isTigersGameDay) return null;

  const team = isLionsGameDay ? "Lions" : "Tigers";
  const color = isLionsGameDay ? "#0076B6" : "#FA4616";
  const emoji = isLionsGameDay ? "🦁" : "🐯";
  const venue = isLionsGameDay ? "Ford Field" : "Comerica Park";

  return (
    <div style={{ background: `linear-gradient(135deg, ${color}22, ${color}08)`, border: `1px solid ${color}44`, borderRadius: 10, padding: "14px 20px", marginBottom: 20, display: "flex", alignItems: "center", gap: 14, animation: "fadeInUp 0.5s ease" }}>
      <span style={{ fontSize: 28 }}>{emoji}</span>
      <div>
        <p className="headline-font" style={{ fontSize: 20, color, lineHeight: 1 }}>GAME DAY — {team.toUpperCase()}!</p>
        <p style={{ fontSize: 13, color: dark ? "#aaa" : "#555", marginTop: 4 }}>The {team} are playing today at {venue}. Let's go! {emoji}</p>
      </div>
      <div style={{ marginLeft: "auto", background: color, color: "#fff", padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 800 }}>
        {emoji} GAME DAY
      </div>
    </div>
  );
}

// ─── WEATHER WIDGET ──────────────────────────────────────────────────────────
function WeatherWidget({ dark }) {
  const surface = dark ? "#13131b" : "#fff";
  const border = dark ? "#1e1e28" : "#e8e8e8";
  const textMuted = dark ? "#888" : "#666";
  const [weather, setWeather] = useState(null);
  const [selected, setSelected] = useState("detroit");

  const VENUES = {
    detroit: { name: "Ford Field / Comerica Park", city: "Detroit", lat: 42.33, lon: -83.05 },
    chicago: { name: "Soldier Field / Wrigley", city: "Chicago", lat: 41.85, lon: -87.65 },
  };

  useEffect(() => {
    const v = VENUES[selected];
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${v.lat}&longitude=${v.lon}&current_weather=true&hourly=precipitation_probability&temperature_unit=fahrenheit`)
      .then(r => r.json())
      .then(d => setWeather(d.current_weather))
      .catch(() => {});
  }, [selected]);

  const getIcon = (code) => {
    if (code <= 1) return "☀️";
    if (code <= 3) return "⛅";
    if (code <= 67) return "🌧️";
    if (code <= 77) return "❄️";
    return "⛈️";
  };

  const getDesc = (code) => {
    if (code <= 1) return "Clear";
    if (code <= 3) return "Partly Cloudy";
    if (code <= 67) return "Rainy";
    if (code <= 77) return "Snow";
    return "Stormy";
  };

  return (
    <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 10, padding: 16 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <h3 className="headline-font" style={{ fontSize: 18, display: "flex", alignItems: "center", gap: 6 }}>
          🌤️ GAME DAY WEATHER
        </h3>
        <div style={{ display: "flex", gap: 4 }}>
          {["detroit","chicago"].map(c => (
            <button key={c} onClick={() => setSelected(c)} style={{ padding: "3px 10px", borderRadius: 12, border: `1px solid ${selected === c ? (c === "detroit" ? DET_COLOR : CHI_COLOR) : (dark ? "#2a2a3a" : "#ddd")}`, background: selected === c ? (c === "detroit" ? DET_COLOR : CHI_COLOR) : "transparent", color: selected === c ? "#fff" : textMuted, fontSize: 11, fontWeight: 700, cursor: "pointer" }}>
              {c === "detroit" ? "DET 🦁" : "CHI"}
            </button>
          ))}
        </div>
      </div>
      {weather ? (
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontSize: 36 }}>{getIcon(weather.weathercode)}</span>
          <div>
            <p className="headline-font" style={{ fontSize: 32, lineHeight: 1 }}>{Math.round(weather.temperature)}°F</p>
            <p style={{ fontSize: 13, color: textMuted }}>{getDesc(weather.weathercode)} · Wind {Math.round(weather.windspeed)} mph</p>
            <p style={{ fontSize: 12, color: textMuted, marginTop: 2 }}>{VENUES[selected].name}</p>
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: 8, color: textMuted, fontSize: 13 }}>
          <RefreshCw size={14} style={{ animation: "spin 1s linear infinite" }} /> Loading weather...
        </div>
      )}
    </div>
  );
}

// ─── SEASON DETECTION ────────────────────────────────────────────────────────
const getCurrentSeasons = () => {
  const m = new Date().getMonth() + 1;
  return {
    mlb: m >= 4 && m <= 10,
    nba: m >= 10 || m <= 6,
    nhl: m >= 10 || m <= 6,
    nfl: m >= 9 || m <= 2,
  };
};

// ─── INJURY REPORT ───────────────────────────────────────────────────────────
function InjuryReport({ dark }) {
  const surface = dark ? "#13131b" : "#fff";
  const border = dark ? "#1e1e28" : "#e8e8e8";
  const textMuted = dark ? "#888" : "#666";
  const seasons = getCurrentSeasons();

  const ALL_INJURIES = {
    lions: { sport: "NFL", inSeason: seasons.nfl, color: "#0076B6", players: [
      { player: "Amon-Ra St. Brown", pos: "WR", status: "Offseason", detail: "Healthy — preparing for 2025 season", color: "#FFD700" },
      { player: "Jameson Williams", pos: "WR", status: "Offseason", detail: "Hamstring — expected full recovery", color: "#FFD700" },
      { player: "Frank Ragnow", pos: "C", status: "Offseason", detail: "Foot — monitoring heading into camp", color: "#FF8C00" },
    ]},
    tigers: { sport: "MLB", inSeason: seasons.mlb, color: "#FA4616", players: [
      { player: "Riley Greene", pos: "LF", status: "Day-To-Day", detail: "Oblique tightness — monitored daily", color: "#FF8C00" },
      { player: "Jake Rogers", pos: "C", status: "10-Day IL", detail: "Knee inflammation", color: DET_COLOR },
      { player: "Spencer Torkelson", pos: "1B", status: "Active", detail: "Full health — off to a strong start", color: "#FFD700" },
    ]},
    pistons: { sport: "NBA", inSeason: seasons.nba, color: "#C8102E", players: [
      { player: "Cade Cunningham", pos: "PG", status: "Active", detail: "Healthy — playing heavy minutes", color: "#FFD700" },
      { player: "Jalen Duren", pos: "C", status: "Questionable", detail: "Ankle — game-time decision", color: "#FF8C00" },
      { player: "Isaiah Stewart", pos: "PF", status: "Active", detail: "Full health", color: "#FFD700" },
    ]},
    redwings: { sport: "NHL", inSeason: seasons.nhl, color: "#CE1126", players: [
      { player: "Dylan Larkin", pos: "C", status: "Active", detail: "Full health — leading team in points", color: "#FFD700" },
      { player: "Ben Chiarot", pos: "D", status: "IR", detail: "Upper body — out indefinitely", color: DET_COLOR },
      { player: "Alex DeBrincat", pos: "LW", status: "Active", detail: "Healthy — strong finish to season", color: "#FFD700" },
    ]},
  };

  const inSeasonTeams = Object.entries(ALL_INJURIES).filter(([, v]) => v.inSeason);
  const [team, setTeam] = useState(() => inSeasonTeams.find(([k]) => k === "tigers")?.[0] || inSeasonTeams[0]?.[0] || "tigers");

  if (inSeasonTeams.length === 0) return null;
  const current = ALL_INJURIES[team];

  return (
    <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 10, padding: 16 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
        <h3 className="headline-font" style={{ fontSize: 18, display: "flex", alignItems: "center", gap: 6 }}>
          🏥 INJURY REPORT
        </h3>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {inSeasonTeams.map(([key, val]) => (
            <button key={key} onClick={() => setTeam(key)} style={{ padding: "3px 10px", borderRadius: 12, border: `1px solid ${team === key ? val.color : (dark ? "#2a2a3a" : "#ddd")}`, background: team === key ? val.color : "transparent", color: team === key ? "#fff" : textMuted, fontSize: 11, fontWeight: 700, cursor: "pointer" }}>
              {key === "lions" ? "🦁" : key === "tigers" ? "🐯" : key === "pistons" ? "🏀" : "🏒"} {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div style={{ fontSize: 11, color: textMuted, marginBottom: 10, fontWeight: 600, letterSpacing: "0.06em" }}>
        {current.sport} — DETROIT {team.toUpperCase()} ({current.inSeason ? "IN SEASON" : "OFFSEASON"})
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {current.players.map((p, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", background: dark ? "#0D0D0F" : "#f8f8f8", borderRadius: 7 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: p.color, flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 13 }}>{p.player} <span style={{ color: textMuted, fontWeight: 400, fontSize: 12 }}>({p.pos})</span></div>
              <div style={{ fontSize: 11, color: textMuted }}>{p.detail}</div>
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color: p.color, background: p.color + "20", padding: "2px 8px", borderRadius: 4, whiteSpace: "nowrap" }}>{p.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SOCIAL FEED ─────────────────────────────────────────────────────────────
function SocialFeed({ dark }) {
  const surface = dark ? "#13131b" : "#fff";
  const border = dark ? "#1e1e28" : "#e8e8e8";
  const textMuted = dark ? "#888" : "#666";

  const TWEETS = [
    { handle: "@Lions", name: "Detroit Lions 🦁", verified: true, text: "GAME WEEK. Ford Field is going to be rocking. 🔵 #OnePride #Lions", time: "2h", likes: 3241, team: "lions" },
    { handle: "@Tigers", name: "Detroit Tigers 🐯", verified: true, text: "Comerica Park is calling. Let's get it, Tigers fans. 🧡 #DetroitTigers", time: "4h", likes: 1892, team: "tigers" },
    { handle: "@Lions", name: "Detroit Lions 🦁", verified: true, text: "Jared Goff is locked in this week. The offensive line is ready. Let's GO. 🦁", time: "6h", likes: 2156, team: "lions" },
    { handle: "@Tigers", name: "Detroit Tigers 🐯", verified: true, text: "Our pitching staff has been DOMINANT this homestand. Feeling good about this team. 🐯⚾", time: "8h", likes: 987, team: "tigers" },
    { handle: "@ChicagoBears", name: "Chicago Bears", verified: true, text: "Caleb Williams week. Soldier Field. Let's ball. 🐻⬇️ #DaBears", time: "3h", likes: 4102, team: "bears" },
  ];

  return (
    <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 10, padding: 16 }}>
      <h3 className="headline-font" style={{ fontSize: 18, marginBottom: 14, display: "flex", alignItems: "center", gap: 6 }}>
        🐦 TEAM SOCIAL
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {TWEETS.map((t, i) => (
          <div key={i} style={{ paddingBottom: i < TWEETS.length - 1 ? 12 : 0, borderBottom: i < TWEETS.length - 1 ? `1px solid ${border}` : "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: t.team === "lions" ? "#0076B620" : t.team === "tigers" ? "#FA461620" : "#0B162A20", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>
                {t.team === "lions" ? "🦁" : t.team === "tigers" ? "🐯" : "🐻"}
              </div>
              <div>
                <span style={{ fontWeight: 700, fontSize: 13 }}>{t.name}</span>
                {t.verified && <span style={{ color: "#1DA1F2", fontSize: 12, marginLeft: 4 }}>✓</span>}
                <span style={{ color: textMuted, fontSize: 12, marginLeft: 6 }}>{t.handle} · {t.time} ago</span>
              </div>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.5, color: dark ? "#d0d0d0" : "#222", marginBottom: 5 }}>{t.text}</p>
            <span style={{ fontSize: 12, color: textMuted, display: "flex", alignItems: "center", gap: 4 }}>
              <Heart size={11} /> {t.likes.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PLAYER STATS ─────────────────────────────────────────────────────────────
function PlayerStatsWidget({ dark }) {
  const surface = dark ? "#13131b" : "#fff";
  const border = dark ? "#1e1e28" : "#e8e8e8";
  const bg2 = dark ? "#0D0D0F" : "#f5f5f5";
  const textMuted = dark ? "#888" : "#666";
  const seasons = getCurrentSeasons();

  const ALL_STATS = {
    tigers: { sport: "MLB", inSeason: seasons.mlb, color: "#FA4616", emoji: "🐯", label: "2025 Season Stats", players: [
      { name: "Tarik Skubal", pos: "SP", stats: [{ label: "ERA", val: "2.78" }, { label: "W", val: "4" }, { label: "K", val: "44" }, { label: "WHIP", val: "0.97" }] },
      { name: "Spencer Torkelson", pos: "1B", stats: [{ label: "AVG", val: ".263" }, { label: "HR", val: "4" }, { label: "RBI", val: "14" }, { label: "OPS", val: ".819" }] },
      { name: "Riley Greene", pos: "LF", stats: [{ label: "AVG", val: ".284" }, { label: "HR", val: "3" }, { label: "RBI", val: "11" }, { label: "SB", val: "4" }] },
      { name: "Kerry Carpenter", pos: "RF", stats: [{ label: "AVG", val: ".271" }, { label: "HR", val: "5" }, { label: "RBI", val: "16" }, { label: "OPS", val: ".847" }] },
    ]},
    pistons: { sport: "NBA", inSeason: seasons.nba, color: "#C8102E", emoji: "🏀", label: "2024-25 Season Stats", players: [
      { name: "Cade Cunningham", pos: "PG", stats: [{ label: "PPG", val: "26.2" }, { label: "APG", val: "8.7" }, { label: "RPG", val: "5.8" }, { label: "FG%", val: "44.1" }] },
      { name: "Jalen Duren", pos: "C", stats: [{ label: "PPG", val: "13.4" }, { label: "RPG", val: "12.8" }, { label: "APG", val: "2.1" }, { label: "BPG", val: "1.6" }] },
      { name: "Ausar Thompson", pos: "SF", stats: [{ label: "PPG", val: "14.1" }, { label: "RPG", val: "6.9" }, { label: "APG", val: "2.8" }, { label: "SPG", val: "1.9" }] },
      { name: "Tim Hardaway Jr.", pos: "SG", stats: [{ label: "PPG", val: "11.8" }, { label: "3P%", val: "37.2" }, { label: "APG", val: "1.9" }, { label: "FG%", val: "43.5" }] },
    ]},
    redwings: { sport: "NHL", inSeason: seasons.nhl, color: "#CE1126", emoji: "🏒", label: "2024-25 Season Stats", players: [
      { name: "Dylan Larkin", pos: "C", stats: [{ label: "G", val: "28" }, { label: "A", val: "41" }, { label: "PTS", val: "69" }, { label: "+/-", val: "+12" }] },
      { name: "Alex DeBrincat", pos: "LW", stats: [{ label: "G", val: "32" }, { label: "A", val: "29" }, { label: "PTS", val: "61" }, { label: "+/-", val: "+8" }] },
      { name: "Lucas Raymond", pos: "RW", stats: [{ label: "G", val: "24" }, { label: "A", val: "38" }, { label: "PTS", val: "62" }, { label: "+/-", val: "+5" }] },
      { name: "Moritz Seider", pos: "D", stats: [{ label: "G", val: "9" }, { label: "A", val: "34" }, { label: "PTS", val: "43" }, { label: "+/-", val: "+7" }] },
    ]},
    lions: { sport: "NFL", inSeason: seasons.nfl, color: "#0076B6", emoji: "🦁", label: "2024 Season Final Stats", players: [
      { name: "Jared Goff", pos: "QB", stats: [{ label: "YDS", val: "4,629" }, { label: "TD", val: "37" }, { label: "INT", val: "6" }, { label: "RTG", val: "108.4" }] },
      { name: "Amon-Ra St. Brown", pos: "WR", stats: [{ label: "REC", val: "119" }, { label: "YDS", val: "1,515" }, { label: "TD", val: "12" }, { label: "YPR", val: "12.7" }] },
      { name: "David Montgomery", pos: "RB", stats: [{ label: "ATT", val: "242" }, { label: "YDS", val: "1,138" }, { label: "TD", val: "14" }, { label: "AVG", val: "4.7" }] },
      { name: "Aidan Hutchinson", pos: "DE", stats: [{ label: "TKL", val: "41" }, { label: "SCK", val: "7.5" }, { label: "FF", val: "3" }, { label: "PD", val: "2" }] },
    ]},
  };

  // Order: tigers first (fav), then other in-season, then lions even if offseason
  const inSeasonTeams = Object.entries(ALL_STATS).filter(([, v]) => v.inSeason);
  const offseasonFavs = Object.entries(ALL_STATS).filter(([k, v]) => !v.inSeason && (k === "lions" || k === "tigers"));
  const tabOptions = [...inSeasonTeams, ...offseasonFavs];

  const [tab, setTab] = useState(() => {
    if (ALL_STATS.tigers.inSeason) return "tigers";
    if (inSeasonTeams.length > 0) return inSeasonTeams[0][0];
    return "lions";
  });

  if (tabOptions.length === 0) return null;
  const current = ALL_STATS[tab];

  return (
    <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 10, padding: 20 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
        <h3 className="headline-font" style={{ fontSize: 22, display: "flex", alignItems: "center", gap: 8 }}>
          📊 DETROIT PLAYER STATS
        </h3>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {tabOptions.map(([key, val]) => (
            <button key={key} onClick={() => setTab(key)} style={{ padding: "5px 12px", borderRadius: 16, border: `1px solid ${tab === key ? val.color : (dark ? "#2a2a3a" : "#ddd")}`, background: tab === key ? val.color : "transparent", color: tab === key ? "#fff" : textMuted, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
              {val.emoji} {key.charAt(0).toUpperCase() + key.slice(1)}
              {!val.inSeason && <span style={{ fontSize: 9, opacity: 0.7, marginLeft: 3 }}>OFF</span>}
            </button>
          ))}
        </div>
      </div>
      <div style={{ fontSize: 11, color: textMuted, marginBottom: 12, fontWeight: 600, letterSpacing: "0.06em" }}>
        {current.label}{!current.inSeason ? " — OFFSEASON" : ""}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {current.players.map((player, i) => (
          <div key={i} style={{ background: bg2, borderRadius: 8, padding: "12px 14px" }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
              <span style={{ fontWeight: 700, fontSize: 14 }}>{player.name}</span>
              <span style={{ marginLeft: 8, background: current.color + "25", color: current.color, padding: "1px 7px", borderRadius: 4, fontWeight: 700, fontSize: 11 }}>{player.pos}</span>
              {(tab === "lions" || tab === "tigers") && <span style={{ marginLeft: 6, fontSize: 12 }}>⭐</span>}
            </div>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              {player.stats.map(s => (
                <div key={s.label} style={{ textAlign: "center", minWidth: 40 }}>
                  <div className="headline-font" style={{ fontSize: 20, lineHeight: 1, color: dark ? "#f0f0f0" : "#111" }}>{s.val}</div>
                  <div style={{ fontSize: 10, color: textMuted, fontWeight: 700, letterSpacing: "0.06em", marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


export default function App() {
  const [dark, setDark] = useState(() => { try { return localStorage.getItem("us12_dark") !== "false"; } catch { return true; } });
  const [page, setPage] = useState("home");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleDark = (v) => { setDark(v); try { localStorage.setItem("us12_dark", String(v)); } catch {} };

  const handleArticleClick = useCallback((article) => { setSelectedArticle(article); setPage("article"); setMobileMenuOpen(false); }, []);
  const toggleBookmark = useCallback((id) => { setBookmarks(prev => prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]); }, []);
  const relatedArticles = selectedArticle ? ALL_ARTICLES.filter(a => a.id !== selectedArticle.id && (a.city === selectedArticle.city || a.sport === selectedArticle.sport)).slice(0, 3) : [];

  const renderPage = () => {
    if (page === "article" && selectedArticle) return <ArticlePage article={selectedArticle} dark={dark} bookmarks={bookmarks} toggleBookmark={toggleBookmark} onBack={() => setPage("home")} relatedArticles={relatedArticles} onRelatedClick={handleArticleClick} />;
    if (page === "detroit") return <CityPage city="detroit" dark={dark} articles={ALL_ARTICLES} bookmarks={bookmarks} toggleBookmark={toggleBookmark} onArticleClick={handleArticleClick} />;
    if (page === "chicago") return <CityPage city="chicago" dark={dark} articles={ALL_ARTICLES} bookmarks={bookmarks} toggleBookmark={toggleBookmark} onArticleClick={handleArticleClick} />;
    if (page === "scores") return <ScoresPage dark={dark} />;
    if (page === "newsletter") return <NewsletterPage dark={dark} />;
    if (page === "odds") return <OddsPage dark={dark} />;
    if (page === "merch") return <MerchPage dark={dark} />;
    if (page === "media") return <MediaPage dark={dark} />;
    if (page === "rumors") return <RumorsPage dark={dark} onArticleClick={handleArticleClick} />;
    if (page === "myteams") return <MyTeamsPage dark={dark} articles={ALL_ARTICLES} onArticleClick={handleArticleClick} bookmarks={bookmarks} toggleBookmark={toggleBookmark} />;
    if (page === "about") return <AboutPage dark={dark} />;
    return <HomePage dark={dark} articles={ALL_ARTICLES} bookmarks={bookmarks} toggleBookmark={toggleBookmark} onArticleClick={handleArticleClick} setPage={setPage} />;
  };

  return (
    <div className={`app ${dark ? "dark" : "light"}`}>
      <GlobalStyles />
      <Header dark={dark} setDark={toggleDark} page={page} setPage={p => { setPage(p); setMobileMenuOpen(false); window.scrollTo({top:0,behavior:"smooth"}); }} onSearch={() => setSearchOpen(true)} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <ScoreTicker dark={dark} />
      <main>{renderPage()}</main>
      <Footer dark={dark} />
      {searchOpen && <SearchOverlay dark={dark} onClose={() => setSearchOpen(false)} articles={ALL_ARTICLES} onArticleClick={handleArticleClick} />}
    </div>
  );
}
