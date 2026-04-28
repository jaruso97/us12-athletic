import { useState, useEffect, useRef, useCallback } from "react";
import {
  Search, Moon, Sun, Bookmark, BookmarkCheck, ChevronRight,
  X, Menu, ArrowLeft, Clock, User, Flame, Radio, Mail, Trophy,
  TrendingUp, RefreshCw, Heart, MessageCircle, Send, CheckCircle, Star,
  ShoppingBag, DollarSign, BarChart2, AlertTriangle, Play, Pause,
  ExternalLink, Video, Mic, Users, UserCheck, Newspaper, SkipForward,
  SkipBack, Share, Link2, ThumbsUp, Lock, Zap, Bell
} from "lucide-react";

const NAVY   = "#00274C";
const MAIZE  = "#FFCB05";
const MAIZE2 = "#F0B800";
const LIVE_G = "#00D97E";
const HOT_RED= "#E63946";
const DET_BLUE="#0076B6";
const DET_ORG ="#FA4616";

const PRO_TEAMS = [
  {id:"lions",   name:"Lions",    city:"Detroit",sport:"NFL",color:DET_BLUE, accent:"#B0B7BC",fav:true},
  {id:"tigers",  name:"Tigers",   city:"Detroit",sport:"MLB",color:DET_ORG,  accent:"#0C2340",fav:true},
  {id:"pistons", name:"Pistons",  city:"Detroit",sport:"NBA",color:"#C8102E",accent:"#006BB6",fav:true},
  {id:"redwings",name:"Red Wings",city:"Detroit",sport:"NHL",color:"#CE1126",accent:"#FFFFFF",fav:true},
];

const COLLEGE_TEAMS = [
  {id:"michigan",name:"Wolverines",   school:"Michigan",       conf:"Big Ten",color:NAVY,    accent:MAIZE},
  {id:"msu",     name:"Spartans",     school:"Michigan State", conf:"Big Ten",color:"#18453B",accent:"#FFF"},
  {id:"cmu",     name:"Chippewas",    school:"Central Michigan",conf:"MAC",  color:"#6A0032",accent:"#FFC82E"},
  {id:"wmu",     name:"Broncos",      school:"Western Michigan",conf:"MAC",  color:"#6C4023",accent:"#CFC493"},
  {id:"emu",     name:"Eagles",       school:"Eastern Michigan",conf:"MAC",  color:"#006B3F",accent:"#B58C58"},
  {id:"mtu",     name:"Huskies",      school:"Michigan Tech",  conf:"CCHA",  color:"#000",   accent:"#FFD100"},
  {id:"oakland", name:"Golden Grizzlies",school:"Oakland",     conf:"Horizon",color:"#1C2D3F",accent:"#C5A900"},
  {id:"udm",     name:"Titans",       school:"Detroit Mercy",  conf:"Horizon",color:"#002060",accent:"#C8102E"},
];

const SPORT_CFG = {
  nfl:    {label:"NFL Football",  emoji:"🏈",color:"#60a5fa",desc:"Detroit Lions"},
  mlb:    {label:"MLB Baseball",  emoji:"⚾",color:"#4ade80",desc:"Detroit Tigers"},
  nba:    {label:"NBA Basketball",emoji:"🏀",color:"#f87171",desc:"Detroit Pistons"},
  nhl:    {label:"NHL Hockey",    emoji:"🏒",color:"#a78bfa",desc:"Detroit Red Wings"},
  college:{label:"College Sports",emoji:"🎓",color:MAIZE,    desc:"Michigan & More"},
};

const TEAM_LOGOS = {
  lions:    {logo:"https://a.espncdn.com/i/teamlogos/nfl/500/det.png",  bg:DET_BLUE},
  tigers:   {logo:"https://a.espncdn.com/i/teamlogos/mlb/500/det.png",  bg:DET_ORG},
  pistons:  {logo:"https://a.espncdn.com/i/teamlogos/nba/500/det.png",  bg:"#C8102E"},
  redwings: {logo:"https://a.espncdn.com/i/teamlogos/nhl/500/det.png",  bg:"#CE1126"},
  michigan: {logo:"https://a.espncdn.com/i/teamlogos/ncaa/500/130.png", bg:NAVY},
  msu:      {logo:"https://a.espncdn.com/i/teamlogos/ncaa/500/127.png", bg:"#18453B"},
  cmu:      {logo:"https://a.espncdn.com/i/teamlogos/ncaa/500/2117.png",bg:"#6A0032"},
  wmu:      {logo:"https://a.espncdn.com/i/teamlogos/ncaa/500/2711.png",bg:"#6C4023"},
};
const getTeamLogo = (team) => TEAM_LOGOS[team] || {logo:null, bg:NAVY};

const ALL_ARTICLES = [
  {id:"l1",team:"lions",  sport:"NFL",title:"Lions Open as Super Bowl Favorites After Monster Offseason",excerpt:"Detroit's front office went all-in this summer, bringing in elite talent on both sides of the ball to complement Jared Goff's historic 2024 campaign.",author:"Marcus Johnson",time:"1h ago",readTime:"4 min",image:"https://images.unsplash.com/photo-1570476922354-7f46d0c5cd0e?w=1200&h=675&fit=crop&q=80",tags:["Lions","NFL"],hot:true,trending:true,staffPick:true,views:62400},
  {id:"l2",team:"lions",  sport:"NFL",title:"Jared Goff Signs Historic Extension, Commits to Detroit Long-Term",excerpt:"After an MVP-caliber season, Goff and the Lions agree to a franchise-defining deal that cements Detroit as a sustained contender.",author:"Marcus Johnson",time:"3h ago",readTime:"3 min",image:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=675&fit=crop&q=80",tags:["Lions","Goff"],staffPick:true,views:44100},
  {id:"t1",team:"tigers",  sport:"MLB",title:"Tarik Skubal Is the Best Pitcher in Baseball and It Isn't Close",excerpt:"With a sub-2.80 ERA and 200+ strikeouts already, Skubal has entered the conversation as the most dominant pitcher in all of baseball.",author:"Sarah Chen",time:"2h ago",readTime:"4 min",image:"https://images.unsplash.com/photo-1566577134631-13da7b4cb302?w=1200&h=675&fit=crop&q=80",tags:["Tigers","Skubal"],hot:true,trending:true,staffPick:true,views:58200},
  {id:"t2",team:"tigers",  sport:"MLB",title:"Tigers Young Core Has Every MLB Scout Raving About Detroit's Future",excerpt:"With Torkelson, Greene, and Skubal headlining, Detroit's rebuild has become the model every franchise wishes they'd executed.",author:"Sarah Chen",time:"5h ago",readTime:"3 min",image:"https://images.unsplash.com/photo-1529592418137-6a1f23e7d98c?w=1200&h=675&fit=crop&q=80",tags:["Tigers","Rebuild"],staffPick:true,views:32700},
  {id:"p1",team:"pistons", sport:"NBA",title:"Cade Cunningham's MVP Campaign Is No Longer a Surprise",excerpt:"Detroit's franchise cornerstone is averaging 28-9-9 over his last 20 games. National media has finally caught up to what Michigan fans knew.",author:"Lisa Park",time:"2h ago",readTime:"4 min",image:"https://images.unsplash.com/photo-1546519638405-a4e46afa5916?w=1200&h=675&fit=crop&q=80",tags:["Pistons","Cade"],trending:true,staffPick:true,views:41800},
  {id:"p2",team:"pistons", sport:"NBA",title:"Pistons Land All-Star Big in Blockbuster Trade to Pair with Cunningham",excerpt:"Detroit's front office pulled off a shocker that immediately vaults the Pistons into Eastern Conference title contention.",author:"Lisa Park",time:"6h ago",readTime:"5 min",image:"https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=1200&h=675&fit=crop&q=80",tags:["Pistons","Trade"],hot:true,views:37200},
  {id:"rw1",team:"redwings",sport:"NHL",title:"Red Wings Playoff Push Is Real — Detroit Hockey Is Officially Back",excerpt:"Larkin and DeBrincat are putting together the best one-two punch in the Central. Little Caesars Arena hasn't been this loud in years.",author:"Tom Bradley",time:"3h ago",readTime:"4 min",image:"https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=675&fit=crop&q=80",tags:["Red Wings","Playoffs"],trending:true,staffPick:true,views:28900},
  {id:"rw2",team:"redwings",sport:"NHL",title:"Moritz Seider Named to NHL All-Star Game — Detroit's Rising Star Shines",excerpt:"Detroit's cornerstone defenseman earns his first All-Star nod after a dominant first half that draws comparisons to franchise legends.",author:"Tom Bradley",time:"8h ago",readTime:"3 min",image:"https://images.unsplash.com/photo-1546519638405-a4e46afa5916?w=1200&h=675&fit=crop&q=80",tags:["Red Wings","Seider"],views:19400},
  {id:"um1",team:"michigan",sport:"CFB",title:"Michigan Football Enters Season Unanimous #1 in Both Major Polls",excerpt:"The Wolverines return 17 starters from last year's Big Ten championship. National media is already penciling them into the CFP final.",author:"Derek Williams",time:"4h ago",readTime:"5 min",image:"https://images.unsplash.com/photo-1570476922354-7f46d0c5cd0e?w=1200&h=675&fit=crop&q=80",tags:["Michigan","CFB"],hot:true,trending:true,views:54300},
  {id:"um2",team:"michigan",sport:"CBB",title:"Wolverines Basketball Lands Top-Ranked Recruiting Class in Program History",excerpt:"Michigan secured three five-star commitments, vaulting Ann Arbor to the top of every national recruiting ranking heading into fall.",author:"Derek Williams",time:"1d ago",readTime:"4 min",image:"https://images.unsplash.com/photo-1502014822147-1aedfb0676e0?w=1200&h=675&fit=crop&q=80",tags:["Michigan","Recruiting"],views:31100},
  {id:"ms1",team:"msu",    sport:"CFB",title:"Spartans Defense Ranked #1 Nationally After Dominant Spring Camp",excerpt:"Michigan State's rebuilt unit posted eye-popping numbers in spring practice, raising legitimate Big Ten title hopes.",author:"Kyle Foster",time:"6h ago",readTime:"3 min",image:"https://images.unsplash.com/photo-1568819317551-92c0fe2f0765?w=1200&h=675&fit=crop&q=80",tags:["Michigan State","Defense"],views:22600},
  {id:"ms2",team:"msu",    sport:"CBB",title:"Tom Izzo Masterclass: Spartans Return to Elite 8 in Another March Run",excerpt:"Michigan State's legendary coach continues to defy expectations with another deep run that proves East Lansing remains elite.",author:"Kyle Foster",time:"1d ago",readTime:"4 min",image:"https://images.unsplash.com/photo-1546519638405-a4e46afa5916?w=1200&h=675&fit=crop&q=80",tags:["Michigan State","Izzo"],trending:true,views:29800},
];

const TRENDING = [
  {label:"Lions Super Bowl 🦁",articleId:"l1",sport:"NFL",emoji:"🦁"},
  {label:"Skubal Cy Young 🐯", articleId:"t1",sport:"MLB",emoji:"🐯"},
  {label:"Cade for MVP",       articleId:"p1",sport:"NBA",emoji:"🏀"},
  {label:"Wings Playoffs",     articleId:"rw1",sport:"NHL",emoji:"🏒"},
  {label:"Michigan #1",        articleId:"um1",sport:"CFB",emoji:"🎓"},
  {label:"Izzo Elite 8",       articleId:"ms2",sport:"CBB",emoji:"🏆"},
];

const ALL_POLLS = [
  {q:"Who wins the Super Bowl?",opts:["Detroit Lions 🦁","Kansas City Chiefs","Philadelphia Eagles","San Francisco 49ers"],votes:[4821,3204,2891,2156]},
  {q:"Is Skubal the best pitcher in baseball?",opts:["Absolutely yes","Yes but close","Top 5 for sure","Not quite yet"],votes:[5234,2109,891,445]},
  {q:"Will Cade Cunningham win MVP?",opts:["Yes — he's that good","He'll be a finalist","Top 10 not MVP","Too early to say"],votes:[2341,3102,1876,944]},
  {q:"Michigan or MSU — better season?",opts:["Michigan Wolverines 〽️","Michigan State Spartans","Both will be great","Neither impresses"],votes:[6231,3445,1209,567]},
  {q:"Which Detroit team wins a title first?",opts:["Lions 🏈","Tigers ⚾","Pistons 🏀","Red Wings 🏒"],votes:[4102,2891,1988,2344]},
  {q:"Best player in Michigan right now?",opts:["Jared Goff (Lions)","Tarik Skubal (Tigers)","Cade Cunningham (Pistons)","Dylan Larkin (Wings)"],votes:[3891,4102,3445,2109]},
  {q:"Michigan Football makes the CFP?",opts:["Yes — back-to-back","Yes 1st round exit","Tough schedule — no","Not a chance"],votes:[5102,2341,1234,876]},
];

const STREAMS = [
  {team:"Tigers",opponent:"vs. Cleveland Guardians",date:"Fri, Apr 25 · 7:10 PM ET",channel:"Bally Sports",link:"https://www.ballysports.com",badge:"LIVE NOW",color:DET_ORG,emoji:"🐯",live:true},
  {team:"Pistons",opponent:"@ Boston Celtics",date:"Sat, Apr 26 · 7:30 PM ET",channel:"ESPN+",link:"https://www.espnplus.com",badge:"TONIGHT",color:"#C8102E",emoji:"🏀"},
  {team:"Red Wings",opponent:"vs. Toronto Maple Leafs",date:"Mon, Apr 28 · 7:00 PM ET",channel:"TNT",link:"https://www.tnt.com",badge:"UPCOMING",color:"#CE1126",emoji:"🏒"},
  {team:"Lions",opponent:"vs. Green Bay Packers",date:"Sun, Sep 7 · 1:00 PM ET",channel:"Fox",link:"https://www.fox.com/live",badge:"NFL OPENER",color:DET_BLUE,emoji:"🦁"},
  {team:"Michigan",opponent:"vs. Ohio State",date:"Sat, Nov 29 · 12:00 PM ET",channel:"Fox",link:"https://www.fox.com/live",badge:"THE GAME",color:NAVY,emoji:"🎓"},
];

const PLAYER_STATS = {
  lions:{sport:"NFL",color:DET_BLUE,emoji:"🦁",season:"2024 Season",players:[
    {name:"Jared Goff",     pos:"QB",stats:[{l:"YDS",v:"4,629"},{l:"TD",v:"37"},{l:"INT",v:"6"},{l:"RTG",v:"108.4"}]},
    {name:"Amon-Ra St. Brown",pos:"WR",stats:[{l:"REC",v:"119"},{l:"YDS",v:"1,515"},{l:"TD",v:"12"},{l:"YPR",v:"12.7"}]},
    {name:"Jahmyr Gibbs",   pos:"RB",stats:[{l:"ATT",v:"189"},{l:"YDS",v:"1,102"},{l:"TD",v:"11"},{l:"AVG",v:"5.8"}]},
    {name:"Aidan Hutchinson",pos:"DE",stats:[{l:"TKL",v:"41"},{l:"SCK",v:"7.5"},{l:"FF",v:"3"},{l:"PD",v:"2"}]},
  ]},
  tigers:{sport:"MLB",color:DET_ORG,emoji:"🐯",season:"2025 Season",players:[
    {name:"Tarik Skubal",     pos:"SP",stats:[{l:"ERA",v:"2.78"},{l:"W",v:"4"},{l:"K",v:"44"},{l:"WHIP",v:"0.97"}]},
    {name:"Spencer Torkelson",pos:"1B",stats:[{l:"AVG",v:".263"},{l:"HR",v:"4"},{l:"RBI",v:"14"},{l:"OPS",v:".819"}]},
    {name:"Riley Greene",     pos:"LF",stats:[{l:"AVG",v:".284"},{l:"HR",v:"3"},{l:"RBI",v:"11"},{l:"SB",v:"4"}]},
    {name:"Kerry Carpenter",  pos:"RF",stats:[{l:"AVG",v:".271"},{l:"HR",v:"5"},{l:"RBI",v:"16"},{l:"OPS",v:".847"}]},
  ]},
  pistons:{sport:"NBA",color:"#C8102E",emoji:"🏀",season:"2024-25 Season",players:[
    {name:"Cade Cunningham",  pos:"PG",stats:[{l:"PPG",v:"26.2"},{l:"APG",v:"8.7"},{l:"RPG",v:"5.8"},{l:"FG%",v:"44.1"}]},
    {name:"Jalen Duren",      pos:"C", stats:[{l:"PPG",v:"13.4"},{l:"RPG",v:"12.8"},{l:"APG",v:"2.1"},{l:"BPG",v:"1.6"}]},
    {name:"Ausar Thompson",   pos:"SF",stats:[{l:"PPG",v:"14.1"},{l:"RPG",v:"6.9"},{l:"APG",v:"2.8"},{l:"SPG",v:"1.9"}]},
    {name:"Tim Hardaway Jr.", pos:"SG",stats:[{l:"PPG",v:"11.8"},{l:"3P%",v:"37.2"},{l:"APG",v:"1.9"},{l:"FG%",v:"43.5"}]},
  ]},
  redwings:{sport:"NHL",color:"#CE1126",emoji:"🏒",season:"2024-25 Season",players:[
    {name:"Dylan Larkin",   pos:"C", stats:[{l:"G",v:"28"},{l:"A",v:"41"},{l:"PTS",v:"69"},{l:"+/-",v:"+12"}]},
    {name:"Alex DeBrincat", pos:"LW",stats:[{l:"G",v:"32"},{l:"A",v:"29"},{l:"PTS",v:"61"},{l:"+/-",v:"+8"}]},
    {name:"Lucas Raymond",  pos:"RW",stats:[{l:"G",v:"24"},{l:"A",v:"38"},{l:"PTS",v:"62"},{l:"+/-",v:"+5"}]},
    {name:"Moritz Seider",  pos:"D", stats:[{l:"G",v:"9"},{l:"A",v:"34"},{l:"PTS",v:"43"},{l:"+/-",v:"+7"}]},
  ]},
};

const getCurrentOdds = () => {
  const m = new Date().getMonth() + 1;
  const seasons = { mlb: m>=4&&m<=10, nba: m>=10||m<=6, nhl: m>=10||m<=6, nfl: m>=9||m<=2 };
  const all = [
    {id:"o1",sport:"NFL",time:"Sun 1:00 PM ET",away:"Green Bay Packers",home:"Detroit Lions",awayML:"+145",homeML:"-172",spread:"-3.5",awaySpread:"+3.5",total:"47.5"},
    {id:"o2",sport:"MLB",time:"Fri 7:10 PM ET",away:"Cleveland Guardians",home:"Detroit Tigers",awayML:"+130",homeML:"-155",spread:"+1.5",awaySpread:"-1.5",total:"8.5"},
    {id:"o3",sport:"NBA",time:"Sat 7:30 PM ET",away:"Detroit Pistons",home:"Boston Celtics",awayML:"+310",homeML:"-390",spread:"+9.5",awaySpread:"-9.5",total:"218.0"},
    {id:"o4",sport:"NHL",time:"Mon 7:00 PM ET",away:"Toronto Maple Leafs",home:"Detroit Red Wings",awayML:"-118",homeML:"+100",spread:"+1.5",awaySpread:"-1.5",total:"6.0"},
    {id:"o5",sport:"CFB",time:"Sat 12:00 PM ET",away:"Ohio State",home:"Michigan",awayML:"-165",homeML:"+142",spread:"+4.5",awaySpread:"-4.5",total:"48.5"},
  ];
  return all.filter(g => {
    if(g.sport==="NFL") return seasons.nfl;
    if(g.sport==="MLB") return seasons.mlb;
    if(g.sport==="NBA") return seasons.nba;
    if(g.sport==="NHL") return seasons.nhl;
    if(g.sport==="CFB") return seasons.nfl; // college football same season as NFL
    return true;
  });
};
const ODDS_DATA = getCurrentOdds()];

const TEAM_SOCIALS = [
  {name:"Detroit Lions 🦁",handle:"@Lions",url:"https://twitter.com/Lions",color:DET_BLUE,posts:[{text:"GAME WEEK. Ford Field is going to be ROCKING. Let's get it. 🔵 #OnePride",time:"2h",likes:8241},{text:"Your 2025 Detroit Lions schedule is HERE. Circle your dates. 🗓️🦁",time:"5h",likes:5102}]},
  {name:"Detroit Tigers 🐯",handle:"@tigers",url:"https://twitter.com/tigers",color:DET_ORG,posts:[{text:"Tarik Skubal is simply not human. Another dominant outing. 🐯⚾",time:"3h",likes:6891},{text:"WALK-OFF WIN. Comerica Park goes absolutely insane. 🧡",time:"1d",likes:11204}]},
  {name:"Detroit Pistons 🏀",handle:"@DetroitPistons",url:"https://twitter.com/DetroitPistons",color:"#C8102E",posts:[{text:"38 points. 11 assists. 7 rebounds. Just another night for Cade Cunningham. 🔥",time:"4h",likes:7445},{text:"The Pistons are PLAYOFF BOUND. LCA is on FIRE tonight. 🔴",time:"2d",likes:15678}]},
  {name:"Detroit Red Wings 🏒",handle:"@DetroitRedWings",url:"https://twitter.com/DetroitRedWings",color:"#CE1126",posts:[{text:"Dylan Larkin reaches 400 career points as a Red Wing. LEGEND. ❤️🏒",time:"6h",likes:4892},{text:"Another W at the Joe. Detroit hockey is BACK. Let's go Wings! 🦅",time:"1d",likes:8103}]},
  {name:"Michigan Wolverines 〽️",handle:"@UMichFootball",url:"https://twitter.com/UMichFootball",color:NAVY,posts:[{text:"UNANIMOUS #1. The work continues. Go Blue. 〽️🏈",time:"8h",likes:12445},{text:"Signing day haul is in. Top recruiting class in program history. #GoBlue",time:"2d",likes:9234}]},
];

const MERCH = [
  {id:"m1",name:"GLS Michigan Snapback",price:34.99,badge:"BESTSELLER",image:"https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&h=600&fit=crop&q=80",colors:[NAVY,MAIZE,"#000"],category:"Headwear",rating:4.9,reviews:312},
  {id:"m2",name:"Lions × GLS Hoodie",price:69.99,badge:"NEW",image:"https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&h=600&fit=crop&q=80",colors:[DET_BLUE,"#000"],sizes:["S","M","L","XL","2XL"],category:"Apparel",rating:4.8,reviews:124},
  {id:"m3",name:"Tigers × GLS Hoodie",price:69.99,badge:"HOT",image:"https://images.unsplash.com/photo-1611185374952-f7e21fc7ec62?w=600&h=600&fit=crop&q=80",colors:[DET_ORG,"#0C2340"],sizes:["S","M","L","XL","2XL"],category:"Apparel",rating:4.9,reviews:98},
  {id:"m4",name:"Pistons × GLS Tee",price:32.99,badge:null,image:"https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=600&fit=crop&q=80",colors:["#C8102E","#006BB6"],sizes:["S","M","L","XL"],category:"Apparel",rating:4.7,reviews:67},
  {id:"m5",name:"Red Wings × GLS Crewneck",price:59.99,badge:"LIMITED",image:"https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&h=600&fit=crop&q=80",colors:["#CE1126","#000"],sizes:["S","M","L","XL"],category:"Apparel",rating:4.8,reviews:89},
  {id:"m6",name:"Michigan × GLS Premium Tee",price:34.99,badge:"NEW",image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop&q=80",colors:[NAVY,MAIZE],sizes:["S","M","L","XL","2XL"],category:"Apparel",rating:4.6,reviews:45},
  {id:"m7",name:"GLS Logo Drinkware Set",price:49.99,badge:"BUNDLE",image:"https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&h=600&fit=crop&q=80",colors:[NAVY,MAIZE],category:"Accessories",rating:4.9,reviews:201},
  {id:"m8",name:"Michigan State × GLS Hoodie",price:69.99,badge:null,image:"https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=600&fit=crop&q=80",colors:["#18453B","#FFF"],sizes:["S","M","L","XL"],category:"Apparel",rating:4.7,reviews:56},
];

const fmt = n => n>=1000?(n/1000).toFixed(1)+"k":String(n);
const getDayPoll = () => ALL_POLLS[new Date().getDate()%ALL_POLLS.length];
const getCurrentSeasons = () => { const m=new Date().getMonth()+1; return {mlb:m>=4&&m<=10,nba:m>=10||m<=6,nhl:m>=10||m<=6,nfl:m>=9||m<=2}; };

const GS = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Bebas+Neue&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
    body{overflow-x:hidden;}
    .app{font-family:'Inter',sans-serif;min-height:100vh;transition:background 0.3s,color 0.3s;}
    .app.dark{background:#060B12;color:#ECF0F5;}
    .app.light{background:#EEF2F7;color:#0D1520;}
    .hl{font-family:'Bebas Neue',sans-serif;letter-spacing:0.04em;}
    .sf{font-family:'Source Serif 4',serif;}
    @keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
    .tw{overflow:hidden;}.ti{display:flex;animation:ticker 35s linear infinite;width:max-content;}.ti:hover{animation-play-state:paused;}
    @keyframes pdot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.5)}}
    .ldot{animation:pdot 1.2s ease-in-out infinite;}
    @keyframes fiu{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
    .fu{animation:fiu 0.42s ease forwards;}
    @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
    .sk{background:linear-gradient(90deg,#0c1622 25%,#162335 50%,#0c1622 75%);background-size:200% 100%;animation:shimmer 1.5s infinite;border-radius:8px;}
    .sk-l{background:linear-gradient(90deg,#d8e2ef 25%,#e4edf7 50%,#d8e2ef 75%);background-size:200% 100%;animation:shimmer 1.5s infinite;border-radius:8px;}
    .card{transition:transform 0.22s,box-shadow 0.22s;cursor:pointer;}
    .card:hover{transform:translateY(-5px);}
    .dark .card:hover{box-shadow:0 20px 50px rgba(0,39,76,0.5);}
    .light .card:hover{box-shadow:0 20px 50px rgba(0,39,76,0.14);}
    .hcard{position:relative;overflow:hidden;cursor:pointer;}
    .hcard img{transition:transform 0.4s;}
    .hcard:hover img{transform:scale(1.04);}
    .nl{transition:color 0.15s;position:relative;}
    .nl::after{content:'';position:absolute;bottom:-2px;left:0;right:0;height:2px;background:#FFCB05;transform:scaleX(0);transition:transform 0.2s;}
    .nl:hover::after,.nl.active::after{transform:scaleX(1);}
    .so{position:fixed;inset:0;z-index:300;backdrop-filter:blur(10px);}
    .dark .so{background:rgba(4,8,14,0.94);}
    .light .so{background:rgba(238,242,247,0.95);}
    .pill{transition:all 0.15s;cursor:pointer;}
    .pill:hover{transform:scale(1.04);}
    .bp{transition:filter 0.15s,transform 0.1s;}
    .bp:hover{filter:brightness(1.08);}
    .bp:active{transform:scale(0.97);}
    .prose p{margin-bottom:1.2rem;line-height:1.85;font-size:1.07rem;}
    ::-webkit-scrollbar{width:5px;height:5px;}
    .dark ::-webkit-scrollbar-thumb{background:#1a2b3d;border-radius:3px;}
    .light ::-webkit-scrollbar-thumb{background:#b0c0d0;border-radius:3px;}
    @keyframes spin{to{transform:rotate(360deg)}}
    @keyframes glow{0%,100%{box-shadow:0 0 8px #FFCB0544}50%{box-shadow:0 0 24px #FFCB0566}}
    .mglow{animation:glow 2.5s ease-in-out infinite;}
    @media(max-width:768px){.hm{display:none!important;}.mm{display:flex!important;}.mg{grid-template-columns:1fr!important;}}
    @media(min-width:769px){.mm{display:none!important;}}
    .b-nfl{background:#60a5fa22;color:#60a5fa;border:1px solid #60a5fa44;}
    .b-mlb{background:#4ade8022;color:#4ade80;border:1px solid #4ade8044;}
    .b-nba{background:#f8717122;color:#f87171;border:1px solid #f8717144;}
    .b-nhl{background:#a78bfa22;color:#a78bfa;border:1px solid #a78bfa44;}
    .b-cfb,.b-cbb{background:#FFCB0522;color:#F0B800;border:1px solid #FFCB0544;}
  `}</style>
);

// ─── SCORE TICKER ─────────────────────────────────────────────────────────────
function ScoreTicker({dark}) {
  const [scores,setScores]=useState([]);
  const bg=dark?"#040A10":"#00274C";
  useEffect(()=>{
    const KEYWORDS=["detroit","lions","tigers","pistons","red wings","wolverines","spartans","michigan"];
    const SPORTS=[{key:"basketball/nba",label:"NBA"},{key:"baseball/mlb",label:"MLB"},{key:"hockey/nhl",label:"NHL"},{key:"football/nfl",label:"NFL"}];
    const load=async()=>{
      try{
        const res=await Promise.allSettled(SPORTS.map(async({key,label})=>{
          const r=await fetch(`https://site.api.espn.com/apis/site/v2/sports/${key}/scoreboard`,{headers:{"User-Agent":"Mozilla/5.0"}});
          const d=await r.json();
          return(d?.events||[]).map(e=>{
            const comp=e.competitions?.[0];
            const home=comp?.competitors?.find(c=>c.homeAway==="home");
            const away=comp?.competitors?.find(c=>c.homeAway==="away");
            const hn=home?.team?.displayName||"";const an=away?.team?.displayName||"";
            if(!KEYWORDS.some(k=>hn.toLowerCase().includes(k)||an.toLowerCase().includes(k)))return null;
            const st=comp?.status?.type||{};
            const done=st.completed||st.name==="STATUS_FINAL";
            const live=st.state==="in"||st.name==="STATUS_IN_PROGRESS";
            let status="UPCOMING",info="";
            if(done){status="FINAL";info=st.shortDetail||"Final";}
            else if(live){status="LIVE";info=st.shortDetail||"Live";}
            else{try{info=new Date(e.date).toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit",timeZone:"America/Detroit"})+" ET";}catch{info="TBD";}}
            const abbr=n=>n.split(" ").pop().slice(0,3).toUpperCase();
            return{home:abbr(hn),away:abbr(an),homeFull:hn,awayFull:an,hs:parseInt(home?.score)||0,as:parseInt(away?.score)||0,status,info,sport:label};
          }).filter(Boolean);
        }));
        const all=res.filter(r=>r.status==="fulfilled").flatMap(r=>r.value||[]);
        all.sort((a,b)=>({LIVE:0,FINAL:1,UPCOMING:2}[a.status])-({LIVE:0,FINAL:1,UPCOMING:2}[b.status]));
        setScores(all);
      }catch{}
    };
    load();const iv=setInterval(load,60000);return()=>clearInterval(iv);
  },[]);
  const items=scores.length>0?[...scores,...scores]:null;
  return(
    <div style={{background:bg,borderBottom:"2px solid rgba(255,203,5,0.3)"}}>
      <div style={{display:"flex",alignItems:"stretch"}}>
        <div style={{background:MAIZE,color:NAVY,padding:"0 14px",display:"flex",alignItems:"center",gap:6,flexShrink:0,fontSize:11,fontWeight:800,letterSpacing:"0.12em"}}>
          <span className="ldot" style={{width:7,height:7,borderRadius:"50%",background:LIVE_G,display:"inline-block"}}/>SCORES
        </div>
        <div className="tw" style={{flex:1}}>
          {items?(
            <div className="ti" style={{padding:"7px 0"}}>
              {items.map((s,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:7,padding:"0 22px",borderRight:"1px solid rgba(255,203,5,0.15)",fontSize:12,whiteSpace:"nowrap",color:"#fff"}}>
                  {s.status==="LIVE"&&<span className="ldot" style={{width:5,height:5,borderRadius:"50%",background:LIVE_G,flexShrink:0}}/>}
                  <span style={{color:"rgba(255,203,5,0.7)",fontSize:10,fontWeight:700}}>{s.sport}</span>
                  <span style={{fontWeight:600}}>{s.away}</span>
                  <span style={{fontWeight:800,fontSize:14}}>{s.as}</span>
                  <span style={{color:"rgba(255,255,255,0.35)",fontSize:10}}>@</span>
                  <span style={{fontWeight:800,fontSize:14}}>{s.hs}</span>
                  <span style={{fontWeight:600}}>{s.home}</span>
                  <span style={{fontSize:10,padding:"2px 6px",borderRadius:3,fontWeight:700,background:s.status==="LIVE"?`${LIVE_G}25`:s.status==="FINAL"?"rgba(255,255,255,0.08)":"rgba(255,203,5,0.18)",color:s.status==="LIVE"?LIVE_G:s.status==="FINAL"?"#999":MAIZE}}>{s.info}</span>
                </div>
              ))}
            </div>
          ):(
            <div style={{padding:"7px 18px",fontSize:12,color:"rgba(255,203,5,0.55)"}}>No Michigan games today — check back on game day! 🦁🐯</div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── HEADER ──────────────────────────────────────────────────────────────────
const NAV=[{id:"home",label:"Home"},{id:"scores",label:"📊 Scores"},{id:"nfl",label:"🏈 NFL"},{id:"nba",label:"🏀 NBA"},{id:"mlb",label:"⚾ MLB"},{id:"nhl",label:"🏒 NHL"},{id:"college",label:"🎓 College"},{id:"odds",label:"💰 Odds"},{id:"streams",label:"📺 Streams"},{id:"stats",label:"📈 Stats"},{id:"merch",label:"🛒 Merch"},{id:"discord",label:"🎮 Discord"},{id:"newsletter",label:"📧 Newsletter"}];

function Header({dark,setDark,page,setPage,onSearch,mobileOpen,setMobileOpen}) {
  const bg=dark?"#040A10":"#fff";
  const border=dark?"#0f1e2e":"#dce4ef";
  const tm=dark?"#6b8fa8":"#607080";
  const [clicks,setClicks]=useState(0);
  const [roar,setRoar]=useState(false);
  const ct=useRef(null);
  const logoClick=()=>{
    const n=clicks+1;setClicks(n);
    if(n>=5){setRoar(true);setClicks(0);setTimeout(()=>setRoar(false),3500);}
    clearTimeout(ct.current);ct.current=setTimeout(()=>setClicks(0),2000);
    setPage("home");
  };
  const pc=id=>{if(id==="nfl")return"#60a5fa";if(id==="mlb")return"#4ade80";if(id==="nba")return"#f87171";if(id==="nhl")return"#a78bfa";if(id==="college")return MAIZE;if(["odds","scores","streams"].includes(id))return LIVE_G;if(id==="merch")return MAIZE;if(id==="discord")return"#7289da";return dark?"#ECF0F5":"#0D1520";};
  return(
    <header style={{background:bg,borderBottom:`1px solid ${border}`,position:"sticky",top:0,zIndex:100}}>
      {roar&&(
        <div style={{position:"fixed",inset:0,zIndex:999,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,0.93)",flexDirection:"column",gap:16}} onClick={()=>setRoar(false)}>
          <div style={{fontSize:110,marginBottom:8}}>🦁🐯</div>
          <div className="hl" style={{fontSize:56,color:MAIZE,textAlign:"center",lineHeight:1}}>GO LIONS & TIGERS!</div>
          <div style={{fontSize:24,color:"rgba(255,255,255,0.8)"}}>Michigan Sports Forever! 💙💛</div>
          <p style={{color:"rgba(255,255,255,0.35)",fontSize:12,marginTop:8}}>Easter egg! Click to close 🎉</p>
        </div>
      )}
      <div style={{maxWidth:1400,margin:"0 auto",padding:"0 16px"}}>
        <div style={{display:"flex",alignItems:"center",gap:16,height:58}}>
          <div onClick={logoClick} style={{cursor:"pointer",flexShrink:0,userSelect:"none",display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:38,height:38,borderRadius:10,background:`linear-gradient(135deg,${NAVY},${MAIZE2})`,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:20,color:"#fff",fontFamily:"Inter"}}>G</div>
            <div>
              <div className="hl" style={{fontSize:18,lineHeight:1,letterSpacing:"0.03em"}}>GREAT LAKES <span style={{color:MAIZE}}>SPORTS</span></div>
            </div>
          </div>
          <nav className="hm" style={{display:"flex",gap:1,flex:1,overflowX:"auto"}}>
            {NAV.map(({id,label})=>(
              <button key={id} className={`nl${page===id?" active":""}`} onClick={()=>setPage(id)}
                style={{background:"none",border:"none",cursor:"pointer",padding:"6px 9px",fontSize:11,fontWeight:600,whiteSpace:"nowrap",color:page===id?pc(id):tm,borderRadius:6,transition:"all 0.15s"}}>
                {label}
              </button>
            ))}
          </nav>
          <div style={{display:"flex",gap:6,alignItems:"center",marginLeft:"auto"}}>
            <button onClick={onSearch} style={{background:"none",border:"none",cursor:"pointer",color:tm,padding:8,borderRadius:8}}><Search size={17}/></button>
            <button onClick={()=>setDark(!dark)} style={{background:"none",border:"none",cursor:"pointer",color:tm,padding:8,borderRadius:8}}>{dark?<Sun size={17}/>:<Moon size={17}/>}</button>
            <button className="mm" onClick={()=>setMobileOpen(!mobileOpen)} style={{background:"none",border:"none",cursor:"pointer",color:tm,padding:8,display:"none",borderRadius:8}}>{mobileOpen?<X size={19}/>:<Menu size={19}/>}</button>
          </div>
        </div>
        {mobileOpen&&(
          <div style={{padding:"8px 0 12px",borderTop:`1px solid ${border}`,display:"grid",gridTemplateColumns:"1fr 1fr",gap:2}}>
            {NAV.map(({id,label})=>(
              <button key={id} onClick={()=>{setPage(id);setMobileOpen(false);}} style={{background:"none",border:"none",cursor:"pointer",padding:"9px 10px",fontSize:13,fontWeight:600,textAlign:"left",color:page===id?pc(id):(dark?"#ECF0F5":"#0D1520"),borderRadius:6}}>
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
      <div style={{height:2,background:`linear-gradient(90deg,${MAIZE},${NAVY} 50%,${MAIZE})`,opacity:0.7}}/>
    </header>
  );
}

// ─── ARTICLE CARD ─────────────────────────────────────────────────────────────
function ArticleCard({article,dark,bookmarks,toggleBookmark,onClick}) {
  const bg=dark?"#0D1520":"#fff";const border=dark?"#0f1e2e":"#dce4ef";const tm=dark?"#6b8fa8":"#607080";
  const isB=bookmarks.includes(article.id);
  const sc=`b-${(article.sport||"nfl").toLowerCase()}`;
  return(
    <div className="card fu" onClick={onClick} style={{background:bg,border:`1px solid ${border}`,borderRadius:12,overflow:"hidden",height:"100%",display:"flex",flexDirection:"column"}}>
      <div style={{position:"relative",aspectRatio:"16/10",overflow:"hidden",background:dark?"#0c1622":"#e4ecf5",flexShrink:0}}>
        {article.image ? (
          <img src={article.image} alt={article.title} loading="lazy" style={{width:"100%",height:"100%",objectFit:"cover"}}
            onError={e=>{
              e.target.style.display="none";
              const fb = e.target.parentNode.querySelector(".logo-fb");
              if(fb) fb.style.display="flex";
            }}/>
        ) : null}
        <div className="logo-fb" style={{display:article.image?"none":"flex",position:"absolute",inset:0,alignItems:"center",justifyContent:"center",background:getTeamLogo(article.team).bg,flexDirection:"column",gap:8}}>
          {getTeamLogo(article.team).logo && <img src={getTeamLogo(article.team).logo} alt="" style={{width:72,height:72,objectFit:"contain",filter:"drop-shadow(0 2px 8px rgba(0,0,0,0.4))"}}/>}
        </div>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,0.68) 0%,transparent 60%)"}}/>
        <div style={{position:"absolute",top:9,left:9,display:"flex",gap:5}}>
          {article.hot&&<span style={{background:HOT_RED,color:"#fff",fontSize:10,fontWeight:700,padding:"3px 7px",borderRadius:4,display:"flex",alignItems:"center",gap:3}}><Flame size={9}/>HOT</span>}
          {article.staffPick&&<span style={{background:`linear-gradient(135deg,${NAVY},${MAIZE2})`,color:"#fff",fontSize:10,fontWeight:700,padding:"3px 7px",borderRadius:4}}>⭐ STAFF</span>}
          <span className={sc} style={{fontSize:10,fontWeight:700,padding:"3px 7px",borderRadius:4}}>{article.sport}</span>
        </div>
        <button onClick={e=>{e.stopPropagation();toggleBookmark(article.id);}} style={{position:"absolute",top:9,right:9,background:"rgba(0,0,0,0.5)",border:"none",borderRadius:"50%",width:28,height:28,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff"}}>
          {isB?<BookmarkCheck size={12} color={MAIZE}/>:<Bookmark size={12}/>}
        </button>
      </div>
      <div style={{padding:"13px 14px 14px",flex:1,display:"flex",flexDirection:"column"}}>
        <h3 style={{fontSize:14,fontWeight:700,lineHeight:1.3,marginBottom:8}}>{article.title}</h3>
        <div style={{marginTop:"auto",display:"flex",alignItems:"center",gap:8,fontSize:11,color:tm}}>
          <span style={{display:"flex",alignItems:"center",gap:3}}><User size={10}/>{article.author}</span>
          <span style={{display:"flex",alignItems:"center",gap:3}}><Clock size={10}/>{article.time}</span>
          <span style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:3}}><TrendingUp size={10}/>{fmt(article.views)}</span>
        </div>
      </div>
    </div>
  );
}

// ─── HERO CARD ────────────────────────────────────────────────────────────────
function HeroCard({article,dark,bookmarks,toggleBookmark,onClick}) {
  const isB=bookmarks.includes(article.id);
  const sc=`b-${(article.sport||"nfl").toLowerCase()}`;
  return(
    <div className="hcard fu" onClick={onClick} style={{borderRadius:16,overflow:"hidden",position:"relative",aspectRatio:"21/9",minHeight:280}}>
      <img src={article.image} alt={article.title} style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}
      onError={e=>{e.target.src=getTeamLogo(article.team).logo||"";e.target.style.objectFit="contain";e.target.style.padding="40px";e.target.parentNode.style.background=getTeamLogo(article.team).bg;}}/>
      <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(0,0,0,0.92) 0%,rgba(0,0,0,0.45) 55%,transparent 100%)"}}/>
      <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${MAIZE},transparent)`}}/>
      <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:"26px 30px"}}>
        <div style={{display:"flex",gap:7,marginBottom:10}}>
          {article.hot&&<span style={{background:HOT_RED,color:"#fff",fontSize:11,fontWeight:800,padding:"4px 10px",borderRadius:4,display:"flex",alignItems:"center",gap:4}}><Flame size={11}/>BREAKING</span>}
          <span className={sc} style={{fontSize:11,fontWeight:700,padding:"4px 10px",borderRadius:4}}>{article.sport}</span>
        </div>
        <h2 className="hl" style={{fontSize:"clamp(20px,3.8vw,44px)",color:"#fff",lineHeight:1.08,marginBottom:10,maxWidth:660}}>{article.title}</h2>
        <p style={{color:"rgba(255,255,255,0.7)",fontSize:14,lineHeight:1.6,maxWidth:540,marginBottom:14,display:"flex"}}>{article.excerpt}</p>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <span style={{color:"rgba(255,255,255,0.55)",fontSize:12,display:"flex",alignItems:"center",gap:5}}><User size={11}/>{article.author} · {article.time}</span>
          <button onClick={e=>{e.stopPropagation();toggleBookmark(article.id);}} style={{marginLeft:"auto",background:"rgba(255,203,5,0.15)",border:"1px solid rgba(255,203,5,0.4)",borderRadius:8,padding:"7px 13px",cursor:"pointer",color:MAIZE,display:"flex",alignItems:"center",gap:5,fontSize:12,fontWeight:600}}>
            {isB?<BookmarkCheck size={12}/>:<Bookmark size={12}/>}{isB?"Saved":"Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── TRENDING TOPICS ─────────────────────────────────────────────────────────
function TrendingTopics({dark,articles,onArticleClick}) {
  const [active,setActive]=useState(null);
  const bg=dark?"#0D1520":"#fff";const border=dark?"#0f1e2e":"#dce4ef";const tm=dark?"#6b8fa8":"#607080";
  const pick=t=>{
    if(active?.label===t.label){setActive(null);return;}
    const art=articles.find(a=>a.id===t.articleId);
    setActive({...t,art});
  };
  return(
    <div style={{marginBottom:22}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10,flexWrap:"wrap"}}>
        <span style={{display:"flex",alignItems:"center",gap:5,fontSize:11,fontWeight:700,color:HOT_RED,letterSpacing:"0.08em",flexShrink:0}}><Flame size={12}/>TRENDING</span>
        <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
          {TRENDING.map(t=>(
            <button key={t.label} onClick={()=>pick(t)} className="pill"
              style={{padding:"5px 13px",borderRadius:20,border:`1px solid ${active?.label===t.label?MAIZE:(dark?"#1a2b3d":"#cdd8e4")}`,background:active?.label===t.label?`${MAIZE}18`:"transparent",color:active?.label===t.label?MAIZE:tm,fontSize:12,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:4}}>
              {t.emoji} {t.label}
            </button>
          ))}
        </div>
      </div>
      {active?.art&&(
        <div className="fu" style={{background:bg,border:`1px solid ${MAIZE}44`,borderRadius:11,padding:14,display:"flex",gap:12,alignItems:"flex-start",cursor:"pointer"}} onClick={()=>onArticleClick(active.art)}>
          <img src={active.art.image} alt="" style={{width:76,height:56,objectFit:"cover",borderRadius:7,flexShrink:0}} onError={e=>{e.target.style.display="none";}}/>
          <div style={{flex:1}}>
            <span className={`b-${(active.art.sport||"nfl").toLowerCase()}`} style={{fontSize:10,fontWeight:700,padding:"2px 6px",borderRadius:3,marginBottom:5,display:"inline-block"}}>{active.art.sport}</span>
            <h4 style={{fontSize:13,fontWeight:700,lineHeight:1.3,marginBottom:3}}>{active.art.title}</h4>
            <p style={{fontSize:12,color:tm,lineHeight:1.5}}>{(active.art.excerpt||"").slice(0,110)}... <span style={{color:MAIZE,fontWeight:600}}>Read →</span></p>
          </div>
          <button onClick={e=>{e.stopPropagation();setActive(null);}} style={{background:"none",border:"none",cursor:"pointer",color:tm,padding:2,flexShrink:0}}><X size={13}/></button>
        </div>
      )}
    </div>
  );
}

// ─── DAILY POLL ───────────────────────────────────────────────────────────────
function DailyPoll({dark}) {
  const poll=getDayPoll();
  const bg=dark?"#0D1520":"#fff";const border=dark?"#0f1e2e":"#dce4ef";const tm=dark?"#6b8fa8":"#607080";
  const [voted,setVoted]=useState(null);const [votes,setVotes]=useState([...poll.votes]);
  const total=votes.reduce((a,b)=>a+b,0)+(voted!==null?1:0);
  const vote=i=>{if(voted!==null)return;setVoted(i);setVotes(p=>p.map((v,j)=>j===i?v+1:v));};
  return(
    <div style={{background:bg,border:`1px solid ${border}`,borderRadius:12,padding:18}}>
      <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:11}}>
        <ThumbsUp size={15} color={MAIZE}/><span style={{fontSize:11,fontWeight:700,color:MAIZE,letterSpacing:"0.1em"}}>FAN POLL · TODAY</span>
        <span style={{fontSize:10,color:tm,marginLeft:"auto"}}>Resets daily</span>
      </div>
      <h3 style={{fontSize:15,fontWeight:700,marginBottom:13,lineHeight:1.4}}>{poll.q}</h3>
      <div style={{display:"flex",flexDirection:"column",gap:7}}>
        {poll.opts.map((opt,i)=>{
          const pct=voted!==null?Math.round((votes[i]/total)*100):0;
          const win=voted!==null&&votes[i]===Math.max(...votes);
          return(
            <div key={i} onClick={()=>vote(i)} style={{position:"relative",cursor:voted===null?"pointer":"default",borderRadius:8,overflow:"hidden",border:`1px solid ${voted===i?MAIZE:border}`}}>
              {voted!==null&&<div style={{position:"absolute",left:0,top:0,bottom:0,width:`${pct}%`,background:voted===i?`${MAIZE}28`:(dark?"#0f1e2e":"#eef4fb"),transition:"width 0.6s"}}/>}
              <div style={{position:"relative",padding:"8px 12px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{fontSize:13,fontWeight:voted===i?700:500}}>{opt}</span>
                {voted!==null&&<span style={{fontSize:13,fontWeight:700,color:win?MAIZE:tm}}>{pct}%</span>}
              </div>
            </div>
          );
        })}
      </div>
      <p style={{fontSize:11,color:tm,marginTop:9}}>{total.toLocaleString()} votes today</p>
    </div>
  );
}

// ─── SEARCH ──────────────────────────────────────────────────────────────────
function SearchOverlay({dark,onClose,articles,onArticle}) {
  const [q,setQ]=useState("");const ref=useRef();
  useEffect(()=>ref.current?.focus(),[]);
  const bg=dark?"#0D1520":"#fff";const border=dark?"#0f1e2e":"#dce4ef";const tm=dark?"#6b8fa8":"#607080";
  const res=q.trim().length>1?articles.filter(a=>a.title.toLowerCase().includes(q.toLowerCase())||a.team?.includes(q.toLowerCase())||a.sport?.toLowerCase().includes(q.toLowerCase())):[];
  return(
    <div className="so" onClick={onClose}>
      <div style={{maxWidth:620,margin:"60px auto 0",padding:"0 20px"}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",alignItems:"center",gap:10,padding:"11px 14px",borderRadius:12,border:`1px solid ${MAIZE}44`,background:bg,marginBottom:14}}>
          <Search size={17} color={tm}/><input ref={ref} value={q} onChange={e=>setQ(e.target.value)} placeholder="Search Michigan sports..." style={{flex:1,background:"none",border:"none",outline:"none",fontSize:15,color:dark?"#ECF0F5":"#0D1520"}}/>
          <button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",color:tm}}><X size={17}/></button>
        </div>
        {q.length>1&&(
          <div style={{background:bg,border:`1px solid ${border}`,borderRadius:11,overflow:"hidden"}}>
            {res.length===0?<div style={{padding:22,textAlign:"center",color:tm,fontSize:14}}>No results for "{q}"</div>
            :res.map(a=>(
              <div key={a.id} onClick={()=>{onArticle(a);onClose();}} style={{display:"flex",gap:11,padding:"11px 14px",cursor:"pointer",borderBottom:`1px solid ${border}`}} onMouseEnter={e=>e.currentTarget.style.background=dark?"#0f1e2e":"#f0f4f8"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                <img src={a.image} alt="" style={{width:52,height:38,objectFit:"cover",borderRadius:6,flexShrink:0}} onError={e=>{e.target.style.display="none";}}/>
                <div><p style={{fontSize:13,fontWeight:600,marginBottom:2,lineHeight:1.3}}>{a.title}</p><span style={{fontSize:11,color:tm}}>{a.sport} · {a.time}</span></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── COMMENTS ────────────────────────────────────────────────────────────────
function Comments({dark,articleId}) {
  const bg=dark?"#0D1520":"#fff";const border=dark?"#0f1e2e":"#dce4ef";const tm=dark?"#6b8fa8":"#607080";
  const SEED={l1:[{id:1,name:"DetroitFan88",av:"DF",color:DET_BLUE,time:"45m",text:"This is OUR year. Super Bowl is coming to Detroit fans!",likes:89},{id:2,name:"LionsNation",av:"LN",color:NAVY,time:"1h",text:"Goff is the most underrated QB in the league. Period.",likes:54}],t1:[{id:1,name:"TigersForever",av:"TF",color:DET_ORG,time:"30m",text:"Skubal deserves Cy Young. Not even close anymore.",likes:112},{id:2,name:"MotorCityMike",av:"MM",color:NAVY,time:"2h",text:"Comerica is going to be electric all summer. Let's go!",likes:67}]};
  const [coms,setComs]=useState(SEED[articleId]||[]);
  const [text,setText]=useState("");const [name,setName]=useState("");const [liked,setLiked]=useState([]);
  const submit=()=>{if(!text.trim()||!name.trim())return;setComs(p=>[{id:Date.now(),name,av:name.slice(0,2).toUpperCase(),color:MAIZE2,time:"Just now",text,likes:0},...p]);setText("");setName("");};
  const like=id=>{setLiked(p=>p.includes(id)?p.filter(l=>l!==id):[...p,id]);setComs(p=>p.map(c=>c.id===id?{...c,likes:liked.includes(id)?c.likes-1:c.likes+1}:c));};
  return(
    <div style={{maxWidth:700,marginTop:32,paddingTop:26,borderTop:`1px solid ${border}`}}>
      <h3 className="hl" style={{fontSize:22,marginBottom:18,display:"flex",alignItems:"center",gap:7}}><MessageCircle size={17}/>COMMENTS ({coms.length})</h3>
      <div style={{background:dark?"#0c1622":"#f8fafc",borderRadius:10,padding:14,marginBottom:20,border:`1px solid ${border}`}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:9}}>
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" style={{background:bg,border:`1px solid ${border}`,borderRadius:7,padding:"8px 11px",fontSize:13,color:dark?"#ECF0F5":"#0D1520",outline:"none"}}/>
          <input value={text} onChange={e=>setText(e.target.value)} placeholder="Share your take..." style={{background:bg,border:`1px solid ${border}`,borderRadius:7,padding:"8px 11px",fontSize:13,color:dark?"#ECF0F5":"#0D1520",outline:"none"}}/>
        </div>
        <button onClick={submit} style={{background:MAIZE,color:NAVY,border:"none",borderRadius:7,padding:"8px 18px",cursor:"pointer",fontSize:13,fontWeight:700,display:"flex",alignItems:"center",gap:5}}><Send size={12}/>Post</button>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        {coms.map(c=>(
          <div key={c.id} style={{display:"flex",gap:9}}>
            <div style={{width:34,height:34,borderRadius:"50%",background:c.color+"33",border:`2px solid ${c.color}55`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:c.color,flexShrink:0}}>{c.av}</div>
            <div style={{flex:1}}>
              <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:4}}><span style={{fontWeight:700,fontSize:13}}>{c.name}</span><span style={{color:tm,fontSize:11}}>{c.time} ago</span></div>
              <p style={{fontSize:13,lineHeight:1.6,marginBottom:5,color:dark?"#ccd8e4":"#1a2535"}}>{c.text}</p>
              <button onClick={()=>like(c.id)} style={{background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:4,fontSize:12,color:liked.includes(c.id)?MAIZE:tm,fontWeight:liked.includes(c.id)?700:400}}><Heart size={11} fill={liked.includes(c.id)?MAIZE:"none"} color={liked.includes(c.id)?MAIZE:tm}/>{c.likes}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ARTICLE PAGE ─────────────────────────────────────────────────────────────
function ArticlePage({article,dark,bookmarks,toggleBookmark,onBack,related,onRelated}) {
  const [content,setContent]=useState("");const [loading,setLoading]=useState(true);
  const bg=dark?"#0D1520":"#fff";const border=dark?"#0f1e2e":"#dce4ef";const tm=dark?"#6b8fa8":"#607080";
  const isB=bookmarks.includes(article.id);
  const [copied,setCopied]=useState(false);
  const copy=()=>{try{navigator.clipboard.writeText(window.location.href);}catch{}setCopied(true);setTimeout(()=>setCopied(false),2000);};
  useEffect(()=>{
    setContent("");setLoading(true);
    fetch("/api/article",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:article.title,excerpt:article.excerpt,team:article.team,sport:article.sport})})
      .then(r=>r.json()).then(d=>{setContent(d.content||article.excerpt||"");setLoading(false);})
      .catch(()=>{setContent(article.excerpt||"");setLoading(false);});
    window.scrollTo({top:0,behavior:"smooth"});
  },[article.id]);
  return(
    <div className="fu">
      <div style={{maxWidth:840,margin:"0 auto",padding:"20px 20px 0"}}>
        <button onClick={onBack} style={{background:"none",border:"none",cursor:"pointer",color:tm,display:"flex",alignItems:"center",gap:5,fontSize:13,fontWeight:600,padding:0,marginBottom:18}}><ArrowLeft size={14}/>Back</button>
      </div>
      <div style={{maxWidth:840,margin:"0 auto",padding:"0 20px 50px"}}>
        <div style={{borderRadius:13,overflow:"hidden",aspectRatio:"16/9",marginBottom:22}}><img src={article.image} alt={article.title} style={{width:"100%",height:"100%",objectFit:"cover"}}/></div>
        <div style={{display:"flex",gap:7,marginBottom:13}}>
          <span className={`b-${(article.sport||"nfl").toLowerCase()}`} style={{fontSize:11,fontWeight:700,padding:"4px 10px",borderRadius:4}}>{article.sport}</span>
          <span style={{background:dark?"#0f1e2e":"#eef2f7",color:tm,fontSize:11,fontWeight:600,padding:"4px 10px",borderRadius:4}}>{(article.team||"").toUpperCase()}</span>
        </div>
        <h1 className="hl" style={{fontSize:"clamp(24px,5vw,50px)",lineHeight:1.06,marginBottom:14}}>{article.title}</h1>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:22,paddingBottom:18,borderBottom:`1px solid ${border}`,flexWrap:"wrap"}}>
          <div style={{width:34,height:34,borderRadius:"50%",background:`${NAVY}33`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><User size={15} color={MAIZE}/></div>
          <div><div style={{fontWeight:700,fontSize:13}}>{article.author}</div><div style={{fontSize:11,color:tm}}>{article.time} · {article.readTime||"4 min"} read</div></div>
          <div style={{marginLeft:"auto",display:"flex",gap:7}}>
            <button onClick={()=>toggleBookmark(article.id)} style={{background:dark?"#0f1e2e":"#f0f4f8",border:"none",borderRadius:7,padding:"7px 12px",cursor:"pointer",display:"flex",alignItems:"center",gap:4,fontSize:12,fontWeight:600,color:dark?"#ccc":"#333"}}>
              {isB?<BookmarkCheck size={12} color={MAIZE}/>:<Bookmark size={12}/>}{isB?"Saved":"Save"}
            </button>
            <button onClick={copy} style={{background:dark?"#0f1e2e":"#f0f4f8",border:"none",borderRadius:7,padding:"7px 12px",cursor:"pointer",display:"flex",alignItems:"center",gap:4,fontSize:12,fontWeight:600,color:dark?"#ccc":"#333"}}>
              <Link2 size={12}/>{copied?"Copied!":"Share"}
            </button>
          </div>
        </div>
        <div className="sf" style={{color:dark?"#c4d4e4":"#1a2535"}}>
          {loading?(
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              <div style={{display:"flex",alignItems:"center",gap:7,color:tm,fontSize:13,marginBottom:4}}><RefreshCw size={12} style={{animation:"spin 1s linear infinite"}}/>Generating article with AI...</div>
              {[1,2,3,4].map(i=><div key={i} style={{display:"flex",flexDirection:"column",gap:7}}>{[100,95,88,70].map((w,j)=><div key={j} className={dark?"sk":"sk-l"} style={{height:17,width:`${w}%`}}/>)}</div>)}
            </div>
          ):content.split("\n\n").filter(Boolean).map((p,i)=><p key={i} className="prose">{p}</p>)}
        </div>
        <div style={{marginTop:26,display:"flex",gap:7,flexWrap:"wrap"}}>
          {(article.tags||[]).map(t=><span key={t} style={{padding:"5px 11px",borderRadius:14,fontSize:11,fontWeight:600,background:dark?"#0f1e2e":"#eef2f7",color:tm,border:`1px solid ${border}`}}>#{t}</span>)}
        </div>
        <Comments dark={dark} articleId={article.id}/>
      </div>
      {related.length>0&&(
        <div style={{maxWidth:840,margin:"28px auto 36px",padding:"0 20px"}}>
          <h3 className="hl" style={{fontSize:22,marginBottom:14}}>MORE STORIES</h3>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(230px,1fr))",gap:13}}>
            {related.map(a=><ArticleCard key={a.id} article={a} dark={dark} bookmarks={[]} toggleBookmark={()=>{}} onClick={()=>onRelated(a)}/>)}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── LIVE SCORES MINI ─────────────────────────────────────────────────────────
function LiveScoresMini({dark}) {
  const bg=dark?"#0D1520":"#fff";const border=dark?"#0f1e2e":"#dce4ef";const bg2=dark?"#060B12":"#f0f4f8";const tm=dark?"#6b8fa8":"#607080";
  const [scores,setScores]=useState([]);const [loading,setLoading]=useState(true);
  useEffect(()=>{fetch("/api/scores").then(r=>r.json()).then(d=>{setScores(d.games||[]);setLoading(false);}).catch(()=>setLoading(false));},[]);
  return(
    <div style={{background:bg,border:`1px solid ${border}`,borderRadius:12,padding:16}}>
      <h3 className="hl" style={{fontSize:18,marginBottom:12,display:"flex",alignItems:"center",gap:6}}><Radio size={14} color={LIVE_G}/>LIVE SCORES</h3>
      {loading?<div style={{color:tm,fontSize:13}}>Loading...</div>:scores.length===0?<p style={{fontSize:12,color:tm,lineHeight:1.6}}>No Michigan games right now. Check back on game day!</p>:
      <div style={{display:"flex",flexDirection:"column",gap:7}}>
        {scores.slice(0,5).map((s,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"7px 9px",borderRadius:7,background:bg2}}>
            <span style={{fontSize:10,color:tm,width:24,flexShrink:0}}>{s.sport}</span>
            <span style={{flex:1,fontSize:12,fontWeight:600}}>{s.away} {s.as}–{s.hs} {s.home}</span>
            <span style={{fontSize:10,padding:"2px 6px",borderRadius:3,fontWeight:700,background:s.status==="LIVE"?`${LIVE_G}20`:"transparent",color:s.status==="LIVE"?LIVE_G:tm,display:"flex",alignItems:"center",gap:3}}>
              {s.status==="LIVE"&&<span className="ldot" style={{width:4,height:4,borderRadius:"50%",background:LIVE_G,display:"inline-block"}}/>}{s.info}
            </span>
          </div>
        ))}
      </div>}
    </div>
  );
}

// ─── SIDEBAR ─────────────────────────────────────────────────────────────────
function Sidebar({dark,articles,onArticle}) {
  const bg=dark?"#0D1520":"#fff";const border=dark?"#0f1e2e":"#dce4ef";const tm=dark?"#6b8fa8":"#607080";
  const top5=[...articles].map(a=>({...a,w:a.staffPick?a.views*2:a.views})).sort((a,b)=>b.w-a.w).slice(0,5);
  const [email,setEmail]=useState("");const [subbed,setSubbed]=useState(false);
  return(
    <aside style={{display:"flex",flexDirection:"column",gap:18}}>
      <DailyPoll dark={dark}/>
      <div style={{background:bg,border:`1px solid ${border}`,borderRadius:12,padding:16}}>
        <h3 className="hl" style={{fontSize:18,marginBottom:13,display:"flex",alignItems:"center",gap:6}}><Trophy size={15} color={MAIZE}/>TOP STORIES</h3>
        <div style={{display:"flex",flexDirection:"column",gap:11}}>
          {top5.map((a,i)=>(
            <div key={a.id} onClick={()=>onArticle(a)} style={{display:"flex",gap:9,cursor:"pointer",alignItems:"flex-start"}}>
              <span className="hl" style={{fontSize:22,color:i===0?MAIZE:tm,lineHeight:1,flexShrink:0,width:24}}>{i+1}</span>
              <div><p style={{fontSize:12,fontWeight:600,lineHeight:1.35,marginBottom:2}}>{a.title}</p><span style={{fontSize:10,color:tm}}>{fmt(a.views)} views · {a.time}</span></div>
            </div>
          ))}
        </div>
      </div>
      <LiveScoresMini dark={dark}/>
      <div style={{background:`linear-gradient(135deg,${NAVY},#0a1a2e)`,border:`1px solid ${MAIZE}33`,borderRadius:12,padding:16}}>
        <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:7}}><Mail size={15} color={MAIZE}/><span className="hl" style={{fontSize:17,color:"#fff"}}>DAILY DIGEST</span></div>
        <p style={{fontSize:12,color:"rgba(255,255,255,0.55)",marginBottom:11,lineHeight:1.5}}>Michigan sports news every morning.</p>
        {subbed?<div style={{textAlign:"center",padding:9,background:`${LIVE_G}22`,borderRadius:7,fontSize:13,color:LIVE_G,fontWeight:700}}>✓ You're in!</div>:
        <div style={{display:"flex",flexDirection:"column",gap:7}}>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="your@email.com" style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.15)",borderRadius:7,padding:"8px 11px",fontSize:13,color:"#fff",outline:"none"}}/>
          <button className="bp" onClick={()=>email.includes("@")&&setSubbed(true)} style={{background:MAIZE,color:NAVY,border:"none",borderRadius:7,padding:9,fontSize:13,fontWeight:800,cursor:"pointer"}}>SUBSCRIBE FREE</button>
        </div>}
      </div>
      <div style={{background:"linear-gradient(135deg,#36393f,#202225)",border:"1px solid rgba(114,137,218,0.4)",borderRadius:12,padding:16}}>
        <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:7}}>
          <div style={{width:26,height:26,borderRadius:7,background:"#5865f2",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>🎮</div>
          <span className="hl" style={{fontSize:17,color:"#fff"}}>JOIN DISCORD</span>
        </div>
        <p style={{fontSize:12,color:"rgba(255,255,255,0.55)",marginBottom:11,lineHeight:1.5}}>2,400+ Michigan fans. Game threads, subscriber channels & more.</p>
        <a href="https://discord.gg" target="_blank" rel="noopener noreferrer" style={{display:"block",background:"#5865f2",color:"#fff",borderRadius:7,padding:"8px",fontSize:13,fontWeight:700,textAlign:"center",textDecoration:"none"}}>JOIN SERVER</a>
      </div>
    </aside>
  );
}

// ─── LIVE NEWS ────────────────────────────────────────────────────────────────
function LiveNews({dark}) {
  const [news,setNews]=useState([]);const [loading,setLoading]=useState(true);
  const bg=dark?"#0D1520":"#fff";const border=dark?"#0f1e2e":"#dce4ef";const bg2=dark?"#060B12":"#f0f4f8";const tm=dark?"#6b8fa8":"#607080";
  useEffect(()=>{fetch("/api/news?city=all").then(r=>r.json()).then(d=>{setNews((d.articles||[]).slice(0,6));setLoading(false);}).catch(()=>setLoading(false));},[]);
  const ago=iso=>{const d=Date.now()-new Date(iso).getTime();const m=Math.floor(d/60000);if(m<60)return`${m}m ago`;const h=Math.floor(m/60);return h<24?`${h}h ago`:`${Math.floor(h/24)}d ago`;};
  if(!loading&&news.length===0)return null;
  return(
    <div style={{marginBottom:42}}>
      <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:18}}>
        <div style={{width:4,height:26,background:LIVE_G,borderRadius:2}}/>
        <h2 className="hl" style={{fontSize:26}}>LATEST NEWS</h2>
        <span style={{display:"flex",alignItems:"center",gap:4,background:`${LIVE_G}22`,color:LIVE_G,fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:9}}><span className="ldot" style={{width:4,height:4,borderRadius:"50%",background:LIVE_G,display:"inline-block"}}/>LIVE</span>
      </div>
      {loading?<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(230px,1fr))",gap:12}}>{[1,2,3,4,5,6].map(i=><div key={i} className={dark?"sk":"sk-l"} style={{height:190,borderRadius:11}}/>)}</div>:
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(230px,1fr))",gap:12}}>
        {news.map(a=>(
          <a key={a.id} href={a.url} target="_blank" rel="noopener noreferrer" className="card" style={{background:bg,border:`1px solid ${border}`,borderRadius:11,overflow:"hidden",display:"flex",flexDirection:"column",textDecoration:"none",color:"inherit"}}>
            <div style={{position:"relative",aspectRatio:"16/10",background:bg2,overflow:"hidden",flexShrink:0}}>
              {a.image?<img src={a.image} alt="" loading="lazy" style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>{e.target.style.display="none";}}/>:<div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}><Newspaper size={26} color={tm} strokeWidth={1}/></div>}
              <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,0.55),transparent 55%)"}}/>
              <span style={{position:"absolute",top:7,left:7,background:`${LIVE_G}22`,color:LIVE_G,fontSize:9,fontWeight:700,padding:"2px 6px",borderRadius:3,border:`1px solid ${LIVE_G}44`}}>LIVE NEWS</span>
            </div>
            <div style={{padding:"11px 13px",flex:1,display:"flex",flexDirection:"column"}}>
              <h3 style={{fontSize:13,fontWeight:700,lineHeight:1.35,marginBottom:7}}>{a.title}</h3>
              <div style={{marginTop:"auto",display:"flex",alignItems:"center",gap:7,fontSize:11,color:tm}}>
                <span style={{fontWeight:700,color:dark?"#aaa":"#444"}}>{a.source}</span>
                <span style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:3}}><Clock size={9}/>{ago(a.publishedAt)}</span>
              </div>
            </div>
          </a>
        ))}
      </div>}
    </div>
  );
}

// ─── SCORES PAGE ──────────────────────────────────────────────────────────────
function ScoresPage({dark}) {
  const bg=dark?"#0D1520":"#fff";const border=dark?"#0f1e2e":"#dce4ef";const bg2=dark?"#060B12":"#f0f4f8";const tm=dark?"#6b8fa8":"#607080";
  const [scores,setScores]=useState([]);const [loading,setLoading]=useState(true);const [last,setLast]=useState(null);
  const [sport,setSport]=useState("All Sports");const [status,setStatus]=useState("All Status");
  const load=async()=>{setLoading(true);try{const r=await fetch("/api/scores");const d=await r.json();setScores(d.games||[]);setLast(new Date());}catch{}setLoading(false);};
  useEffect(()=>{load();const iv=setInterval(load,60000);return()=>clearInterval(iv);},[]);
  const sports=["All Sports","NFL","MLB","NBA","NHL"];const statuses=["All Status","LIVE","FINAL","UPCOMING"];
  const sc=sp=>({NFL:"#60a5fa",NBA:"#f87171",MLB:"#4ade80",NHL:"#a78bfa"}[sp]||tm);
  const filtered=scores.filter(s=>(sport==="All Sports"||s.sport===sport)&&(status==="All Status"||s.status===status));
  const live=filtered.filter(s=>s.status==="LIVE");const final=filtered.filter(s=>s.status==="FINAL");const upcoming=filtered.filter(s=>s.status==="UPCOMING");
  const GameCard=({g})=>(
    <div style={{background:bg,border:`1px solid ${g.status==="LIVE"?`${LIVE_G}55`:border}`,borderRadius:12,overflow:"hidden",boxShadow:g.status==="LIVE"?`0 0 18px ${LIVE_G}18`:undefined}}>
      <div style={{background:g.status==="LIVE"?`${LIVE_G}10`:bg2,padding:"9px 13px",borderBottom:`1px solid ${border}`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <span style={{background:sc(g.sport)+"22",color:sc(g.sport),fontSize:10,fontWeight:700,padding:"2px 7px",borderRadius:3}}>{g.sport}</span>
          {g.status==="LIVE"&&<span style={{display:"flex",alignItems:"center",gap:4,fontSize:11,fontWeight:700,color:LIVE_G}}><span className="ldot" style={{width:5,height:5,borderRadius:"50%",background:LIVE_G,display:"inline-block"}}/>LIVE</span>}
          {g.status==="FINAL"&&<span style={{fontSize:11,color:tm,fontWeight:600}}>FINAL</span>}
          {g.status==="UPCOMING"&&<span style={{fontSize:11,color:"#60a5fa",fontWeight:600}}>UPCOMING</span>}
        </div>
        <span style={{fontSize:11,color:tm}}>{g.info}</span>
      </div>
      <div style={{padding:"16px 14px"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
          <div style={{display:"flex",alignItems:"center",gap:9}}>
            <div style={{width:32,height:32,borderRadius:7,background:bg2,display:"flex",alignItems:"center",justifyContent:"center"}}><span className="hl" style={{fontSize:12,color:tm}}>{g.away}</span></div>
            <div><div style={{fontWeight:700,fontSize:14}}>{g.awayFull||g.away}</div><div style={{fontSize:11,color:tm}}>Away</div></div>
          </div>
          {g.status!=="UPCOMING"&&<span className="hl" style={{fontSize:38,lineHeight:1,color:g.as>g.hs?(dark?"#ECF0F5":"#0D1520"):tm}}>{g.as}</span>}
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}><div style={{flex:1,height:1,background:border}}/><span style={{fontSize:11,color:tm,fontWeight:600}}>VS</span><div style={{flex:1,height:1,background:border}}/></div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",gap:9}}>
            <div style={{width:32,height:32,borderRadius:7,background:bg2,display:"flex",alignItems:"center",justifyContent:"center"}}><span className="hl" style={{fontSize:12,color:tm}}>{g.home}</span></div>
            <div><div style={{fontWeight:700,fontSize:14}}>{g.homeFull||g.home}</div><div style={{fontSize:11,color:tm}}>Home</div></div>
          </div>
          {g.status!=="UPCOMING"&&<span className="hl" style={{fontSize:38,lineHeight:1,color:g.hs>g.as?(dark?"#ECF0F5":"#0D1520"):tm}}>{g.hs}</span>}
        </div>
      </div>
      {g.status==="FINAL"&&<div style={{padding:"7px 13px",background:bg2,borderTop:`1px solid ${border}`,fontSize:12,color:tm,fontWeight:600,textAlign:"center"}}>{g.hs>g.as?`${g.homeFull||g.home} WIN`:g.as>g.hs?`${g.awayFull||g.away} WIN`:"TIE"}</div>}
      {g.status==="UPCOMING"&&<div style={{padding:"7px 13px",background:"rgba(96,165,250,0.08)",borderTop:`1px solid ${border}`,fontSize:12,color:"#60a5fa",fontWeight:600,textAlign:"center"}}>{g.info}</div>}
    </div>
  );
  const Sec=({title,games,color})=>games.length===0?null:(
    <div style={{marginBottom:32}}>
      <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:16}}><div style={{width:4,height:24,background:color,borderRadius:2}}/><h2 className="hl" style={{fontSize:24}}>{title}</h2><span style={{background:color+"22",color,fontSize:11,fontWeight:700,padding:"2px 9px",borderRadius:9}}>{games.length}</span></div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:13}}>{games.map((g,i)=><GameCard key={i} g={g}/>)}</div>
    </div>
  );
  return(
    <div className="fu" style={{maxWidth:1280,margin:"0 auto",padding:"26px 20px 56px"}}>
      <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginBottom:22,flexWrap:"wrap",gap:12}}>
        <div><div style={{display:"flex",alignItems:"center",gap:9,marginBottom:4}}><Radio size={24} color={LIVE_G}/><h1 className="hl" style={{fontSize:42}}>LIVE SCORES</h1></div><p style={{color:tm,fontSize:13}}>Michigan teams · {last?`Updated ${last.toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit"})}`:"Loading..."}</p></div>
        <button onClick={load} style={{background:dark?"#0f1e2e":"#eef2f7",border:`1px solid ${border}`,borderRadius:7,padding:"8px 14px",cursor:"pointer",color:dark?"#ccc":"#333",display:"flex",alignItems:"center",gap:5,fontSize:13,fontWeight:700}}><RefreshCw size={12}/>Refresh</button>
      </div>
      <div style={{display:"flex",gap:10,marginBottom:24,flexWrap:"wrap"}}>
        <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>{sports.map(s=><button key={s} onClick={()=>setSport(s)} className="pill" style={{padding:"5px 13px",borderRadius:15,border:`1px solid ${sport===s?LIVE_G:(dark?"#1a2b3d":"#cdd8e4")}`,background:sport===s?`${LIVE_G}18`:"transparent",color:sport===s?LIVE_G:tm,fontSize:12,fontWeight:700,cursor:"pointer"}}>{s}</button>)}</div>
        <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>{statuses.map(s=><button key={s} onClick={()=>setStatus(s)} className="pill" style={{padding:"5px 13px",borderRadius:15,border:`1px solid ${status===s?MAIZE:(dark?"#1a2b3d":"#cdd8e4")}`,background:status===s?`${MAIZE}18`:"transparent",color:status===s?MAIZE:tm,fontSize:12,fontWeight:700,cursor:"pointer"}}>{s}</button>)}</div>
      </div>
      {loading?<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:13}}>{[1,2,3,4].map(i=><div key={i} className={dark?"sk":"sk-l"} style={{height:210,borderRadius:12}}/>)}</div>:
      filtered.length===0?<div style={{textAlign:"center",padding:"56px 20px",color:tm}}><Radio size={46} strokeWidth={1} style={{marginBottom:12}}/><p style={{fontSize:15}}>No Michigan games match your filters right now.</p></div>:
      <><Sec title="LIVE NOW" games={live} color={LIVE_G}/><Sec title="FINAL" games={final} color={tm}/><Sec title="UPCOMING" games={upcoming} color="#60a5fa"/></>}
    </div>
  );
}

// ─── STATS PAGE ───────────────────────────────────────────────────────────────
function StatsPage({dark}) {
  const bg=dark?"#0D1520":"#fff";const border=dark?"#0f1e2e":"#dce4ef";const bg2=dark?"#060B12":"#f0f4f8";const tm=dark?"#6b8fa8":"#607080";
  const seasons=getCurrentSeasons();
  const tabs=[{id:"tigers",label:"🐯 Tigers",s:seasons.mlb},{id:"pistons",label:"🏀 Pistons",s:seasons.nba},{id:"redwings",label:"🏒 Wings",s:seasons.nhl},{id:"lions",label:"🦁 Lions",s:seasons.nfl}];
  const [tab,setTab]=useState(()=>seasons.mlb?"tigers":seasons.nba?"pistons":seasons.nhl?"redwings":"lions");
  const cfg=PLAYER_STATS[tab];
  return(
    <div className="fu" style={{maxWidth:1100,margin:"0 auto",padding:"26px 20px 56px"}}>
      <div style={{marginBottom:26}}><div style={{display:"flex",alignItems:"center",gap:9,marginBottom:4}}><BarChart2 size={24} color={MAIZE}/><h1 className="hl" style={{fontSize:42}}>PLAYER STATS</h1></div><p style={{color:dark?"#6b8fa8":"#607080",fontSize:13}}>Detroit professional teams — current season</p></div>
      <div style={{display:"flex",gap:7,flexWrap:"wrap",marginBottom:26}}>
        {tabs.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} className="pill" style={{padding:"7px 16px",borderRadius:18,border:`1px solid ${tab===t.id?PLAYER_STATS[t.id].color:(dark?"#1a2b3d":"#cdd8e4")}`,background:tab===t.id?PLAYER_STATS[t.id].color:"transparent",color:tab===t.id?"#fff":(dark?"#6b8fa8":"#607080"),fontSize:13,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:5}}>
            {t.label}{!t.s&&<span style={{fontSize:9,opacity:0.6}}>OFF</span>}
          </button>
        ))}
      </div>
      <div style={{background:bg,border:`1px solid ${border}`,borderRadius:13,padding:22}}>
        <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:6}}><span style={{fontSize:26}}>{cfg.emoji}</span><div><h2 className="hl" style={{fontSize:28,color:cfg.color}}>Detroit {tab.charAt(0).toUpperCase()+tab.slice(1)}</h2><p style={{fontSize:12,color:dark?"#6b8fa8":"#607080"}}>{cfg.season}{!seasons[cfg.sport.toLowerCase()]?" — OFFSEASON":""}</p></div></div>
        <div style={{height:2,background:`linear-gradient(90deg,${cfg.color},transparent)`,borderRadius:2,marginBottom:18}}/>
        <div style={{display:"flex",flexDirection:"column",gap:11}}>
          {cfg.players.map((p,i)=>(
            <div key={i} style={{background:bg2,borderRadius:9,padding:"13px 16px"}}>
              <div style={{display:"flex",alignItems:"center",marginBottom:9}}>
                <div style={{width:38,height:38,borderRadius:"50%",background:cfg.color+"22",border:`2px solid ${cfg.color}44`,display:"flex",alignItems:"center",justifyContent:"center",marginRight:11,flexShrink:0}}><span style={{fontSize:13,fontWeight:800,color:cfg.color}}>{i+1}</span></div>
                <div><span style={{fontWeight:700,fontSize:15}}>{p.name}</span><span style={{marginLeft:9,background:cfg.color+"25",color:cfg.color,padding:"2px 7px",borderRadius:4,fontWeight:700,fontSize:11}}>{p.pos}</span></div>
              </div>
              <div style={{display:"flex",gap:14,flexWrap:"wrap",paddingLeft:49}}>
                {p.stats.map(s=>(
                  <div key={s.l} style={{textAlign:"center",minWidth:44}}>
                    <div className="hl" style={{fontSize:22,lineHeight:1,color:dark?"#ECF0F5":"#0D1520"}}>{s.v}</div>
                    <div style={{fontSize:10,color:dark?"#6b8fa8":"#607080",fontWeight:700,letterSpacing:"0.06em",marginTop:2}}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── ODDS PAGE ────────────────────────────────────────────────────────────────
function OddsPage({dark}) {
  const bg=dark?"#0D1520":"#fff";const border=dark?"#0f1e2e":"#dce4ef";const bg2=dark?"#060B12":"#f0f4f8";const tm=dark?"#6b8fa8":"#607080";
  const [slip,setSlip]=useState([]);const [open,setOpen]=useState(false);const [wagers,setWagers]=useState({});
  const add=(game,type,line,odds)=>{const id=`${game.id}-${type}`;if(slip.find(b=>b.id===id)){setSlip(p=>p.filter(b=>b.id!==id));return;}setSlip(p=>[...p,{id,game:`${game.away} @ ${game.home}`,type,line,odds}]);setOpen(true);};
  const has=(gid,type)=>slip.some(b=>b.id===`${gid}-${type}`);
  const sc=sp=>({NFL:"#60a5fa",MLB:"#4ade80",NBA:"#f87171",NHL:"#a78bfa",CFB:MAIZE}[sp]||tm);
  const total=slip.reduce((s,b)=>{const w=parseFloat(wagers[b.id])||0;if(!w)return s;const ml=parseInt(b.odds);const pr=ml>0?w*(ml/100):w*(100/Math.abs(ml));return s+w+pr;},0);
  const OB=({gid,type,line,odds,label})=>{const active=has(gid,type);const pos=odds?.startsWith("+");return(
    <div onClick={()=>add(ODDS_DATA.find(g=>g.id===gid),type,line,odds)} style={{background:active?(pos?`${LIVE_G}20`:`${HOT_RED}20`):bg2,border:`1px solid ${active?(pos?LIVE_G:HOT_RED):border}`,borderRadius:8,padding:"7px 11px",cursor:"pointer",textAlign:"center",minWidth:76,transition:"all 0.15s"}}>
      <div style={{fontSize:10,color:tm,marginBottom:2,fontWeight:600}}>{label}</div>
      <div style={{fontSize:14,fontWeight:800,color:active?(pos?LIVE_G:HOT_RED):(dark?"#ECF0F5":"#0D1520")}}>{line||odds}</div>
      {line&&<div style={{fontSize:11,color:pos?LIVE_G:HOT_RED,fontWeight:700}}>{odds}</div>}
    </div>
  );};
  return(
    <div className="fu" style={{maxWidth:1100,margin:"0 auto",padding:"26px 20px 56px"}}>
      <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginBottom:22,flexWrap:"wrap",gap:12}}>
        <div><div style={{display:"flex",alignItems:"center",gap:9,marginBottom:4}}><DollarSign size={24} color={LIVE_G}/><h1 className="hl" style={{fontSize:42}}>BETTING ODDS</h1></div><p style={{color:tm,fontSize:13}}>Michigan teams · For entertainment only · 21+</p></div>
        <button onClick={()=>setOpen(true)} style={{position:"relative",background:LIVE_G,border:"none",borderRadius:8,padding:"9px 16px",cursor:"pointer",color:"#0D1520",display:"flex",alignItems:"center",gap:6,fontSize:13,fontWeight:800}}>
          <DollarSign size={14}/>Bet Slip{slip.length>0&&<span style={{background:HOT_RED,color:"#fff",borderRadius:"50%",width:17,height:17,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800}}>{slip.length}</span>}
        </button>
      </div>
      <div style={{background:dark?"#0a1520":"#fffce8",border:`1px solid ${MAIZE}44`,borderRadius:9,padding:"9px 14px",marginBottom:22,fontSize:12,color:"#b89a00",display:"flex",gap:7}}>
        <AlertTriangle size={13} style={{flexShrink:0,marginTop:1}}/><span>Entertainment only. 21+. Gambling problem? Call 1-800-GAMBLER.</span>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))",gap:11,marginBottom:26}}>
        {[{name:"DraftKings",promo:"Bet $5 Get $200",color:"#00B140"},{name:"FanDuel",promo:"No Sweat First Bet",color:"#1493FF"},{name:"BetMGM",promo:"First Bet up to $1,500",color:"#C8A84B"},{name:"Caesars",promo:"First Bet up to $1,000",color:"#9B5DE5"}].map(a=>(
          <div key={a.name} style={{background:a.color+"15",border:`1px solid ${a.color}33`,borderRadius:9,padding:"11px 13px",cursor:"pointer"}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span style={{fontWeight:800,fontSize:14,color:a.color}}>{a.name}</span><ExternalLink size={11} color={a.color}/></div>
            <p style={{fontSize:11,color:tm,marginBottom:7}}>{a.promo}</p>
            <div style={{background:a.color,color:"#fff",fontSize:11,fontWeight:700,padding:"4px 9px",borderRadius:5,textAlign:"center"}}>CLAIM OFFER</div>
            <p style={{fontSize:9,color:tm,marginTop:4,textAlign:"center"}}>21+. T&Cs apply.</p>
          </div>
        ))}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:13}}>
        {ODDS_DATA.map(game=>(
          <div key={game.id} style={{background:bg,border:`1px solid ${border}`,borderRadius:11,overflow:"hidden"}}>
            <div style={{padding:"11px 16px",borderBottom:`1px solid ${border}`,display:"flex",alignItems:"center",gap:9,flexWrap:"wrap"}}>
              <span style={{background:sc(game.sport)+"22",color:sc(game.sport),fontSize:10,fontWeight:800,padding:"2px 7px",borderRadius:3}}>{game.sport}</span>
              <span style={{fontSize:12,color:tm}}>{game.time}</span>
              <span style={{fontWeight:700,fontSize:14}}>{game.away}</span><span style={{color:tm,fontSize:11}}>@</span><span style={{fontWeight:700,fontSize:14}}>{game.home}</span>
            </div>
            <div style={{padding:"13px 16px",display:"flex",gap:11,flexWrap:"wrap"}}>
              <div style={{flex:1,minWidth:170}}><div style={{fontSize:10,color:tm,fontWeight:700,letterSpacing:"0.08em",marginBottom:7}}>MONEYLINE</div><div style={{display:"flex",gap:7}}><OB gid={game.id} type="aml" line={null} odds={game.awayML} label={game.away.split(" ").pop()}/><OB gid={game.id} type="hml" line={null} odds={game.homeML} label={game.home.split(" ").pop()}/></div></div>
              <div style={{flex:1,minWidth:170}}><div style={{fontSize:10,color:tm,fontWeight:700,letterSpacing:"0.08em",marginBottom:7}}>SPREAD</div><div style={{display:"flex",gap:7}}><OB gid={game.id} type="asp" line={game.awaySpread} odds="-110" label={game.away.split(" ").pop()}/><OB gid={game.id} type="hsp" line={game.spread} odds="-110" label={game.home.split(" ").pop()}/></div></div>
              <div style={{flex:1,minWidth:130}}><div style={{fontSize:10,color:tm,fontWeight:700,letterSpacing:"0.08em",marginBottom:7}}>OVER/UNDER</div><div style={{display:"flex",gap:7}}><OB gid={game.id} type="ov" line={`O ${game.total}`} odds="-110" label="OVER"/><OB gid={game.id} type="un" line={`U ${game.total}`} odds="-110" label="UNDER"/></div></div>
            </div>
          </div>
        ))}
      </div>
      {open&&(
        <div style={{position:"fixed",inset:0,zIndex:300}}>
          <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.6)"}} onClick={()=>setOpen(false)}/>
          <div style={{position:"absolute",right:0,top:0,bottom:0,width:"min(370px,100vw)",background:bg,padding:20,overflowY:"auto",display:"flex",flexDirection:"column"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}><h2 className="hl" style={{fontSize:24,display:"flex",alignItems:"center",gap:7}}><DollarSign size={18} color={LIVE_G}/>BET SLIP</h2><button onClick={()=>setOpen(false)} style={{background:"none",border:"none",cursor:"pointer",color:tm}}><X size={18}/></button></div>
            {slip.length===0?<div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:9,color:tm}}><DollarSign size={40} strokeWidth={1}/><p style={{fontSize:14}}>No bets selected</p></div>:
            <><div style={{flex:1,display:"flex",flexDirection:"column",gap:11}}>
              {slip.map(bet=>(
                <div key={bet.id} style={{background:bg2,borderRadius:9,padding:13}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:7}}>
                    <div><div style={{fontSize:11,color:tm,marginBottom:2}}>{bet.game}</div><div style={{fontSize:13,fontWeight:700}}>{bet.line||bet.odds}</div></div>
                    <div style={{display:"flex",alignItems:"flex-start",gap:5}}><span className="hl" style={{fontSize:17,color:bet.odds?.startsWith("+")?LIVE_G:HOT_RED}}>{bet.odds}</span><button onClick={()=>setSlip(p=>p.filter(b=>b.id!==bet.id))} style={{background:"none",border:"none",cursor:"pointer",color:tm}}><X size={12}/></button></div>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:7}}>
                    <span style={{fontSize:11,color:tm}}>$</span>
                    <input type="number" placeholder="Wager" value={wagers[bet.id]||""} onChange={e=>setWagers(p=>({...p,[bet.id]:e.target.value}))} style={{flex:1,background:bg,border:`1px solid ${border}`,borderRadius:6,padding:"5px 9px",fontSize:13,color:dark?"#ECF0F5":"#0D1520",outline:"none"}}/>
                    {wagers[bet.id]&&<span style={{fontSize:11,color:LIVE_G,fontWeight:700}}>Win: ${(()=>{const ml=parseInt(bet.odds);const w=parseFloat(wagers[bet.id]);return ml>0?(w*ml/100).toFixed(2):(w*100/Math.abs(ml)).toFixed(2);})()}</span>}
                  </div>
                </div>
              ))}
            </div>
            <div style={{borderTop:`1px solid ${border}`,paddingTop:14,marginTop:14}}>
              {total>0&&<div style={{display:"flex",justifyContent:"space-between",marginBottom:11}}><span style={{color:tm,fontSize:13}}>Total Payout</span><span className="hl" style={{fontSize:19,color:LIVE_G}}>${total.toFixed(2)}</span></div>}
              <button style={{width:"100%",background:LIVE_G,color:"#0D1520",border:"none",borderRadius:7,padding:12,fontSize:14,fontWeight:800,cursor:"pointer"}}>PLACE BETS</button>
              <p style={{fontSize:10,color:tm,textAlign:"center",marginTop:7}}>21+ only. Bet responsibly.</p>
            </div></>}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── STREAMS PAGE ─────────────────────────────────────────────────────────────
function StreamsPage({dark}) {
  const bg=dark?"#0D1520":"#fff";const border=dark?"#0f1e2e":"#dce4ef";const bg2=dark?"#060B12":"#f0f4f8";const tm=dark?"#6b8fa8":"#607080";
  return(
    <div className="fu" style={{maxWidth:1050,margin:"0 auto",padding:"26px 20px 56px"}}>
      <div style={{marginBottom:26}}><div style={{display:"flex",alignItems:"center",gap:9,marginBottom:4}}><Video size={24} color={HOT_RED}/><h1 className="hl" style={{fontSize:42}}>GAMEDAY STREAMS</h1></div><p style={{color:tm,fontSize:13}}>Where to watch Michigan teams live</p></div>
      <div style={{display:"flex",flexDirection:"column",gap:14}}>
        {STREAMS.map((s,i)=>(
          <div key={i} style={{background:bg,border:`1px solid ${s.live?`${LIVE_G}55`:border}`,borderRadius:13,overflow:"hidden",display:"flex",flexWrap:"wrap"}}>
            <div style={{width:5,background:s.color,flexShrink:0}}/>
            <div style={{flex:1,padding:"16px 20px",display:"flex",alignItems:"center",flexWrap:"wrap",gap:14}}>
              <div style={{width:48,height:48,borderRadius:12,background:s.color+"22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,flexShrink:0}}>{s.emoji}</div>
              <div style={{flex:1,minWidth:160}}>
                <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:3}}>
                  <span style={{fontWeight:800,fontSize:15}}>{s.team}</span>
                  {s.live&&<span style={{display:"flex",alignItems:"center",gap:3,background:`${LIVE_G}22`,color:LIVE_G,fontSize:10,fontWeight:700,padding:"2px 7px",borderRadius:10}}><span className="ldot" style={{width:4,height:4,borderRadius:"50%",background:LIVE_G,display:"inline-block"}}/>LIVE NOW</span>}
                  <span style={{background:s.color+"22",color:s.color,fontSize:10,fontWeight:700,padding:"2px 7px",borderRadius:9}}>{s.badge}</span>
                </div>
                <div style={{fontSize:13,fontWeight:600,marginBottom:2}}>{s.opponent}</div>
                <div style={{fontSize:12,color:tm}}>{s.date} · <span style={{fontWeight:600}}>{s.channel}</span></div>
              </div>
              <a href={s.link} target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",gap:6,background:s.live?LIVE_G:s.color,color:s.live?"#0D1520":"#fff",border:"none",borderRadius:9,padding:"10px 18px",cursor:"pointer",fontSize:13,fontWeight:800,textDecoration:"none",flexShrink:0}}>
                <Play size={13} fill={s.live?"#0D1520":"#fff"}/>{s.live?"WATCH LIVE":"WHERE TO WATCH"}
              </a>
            </div>
          </div>
        ))}
      </div>
      <div style={{background:bg,border:`1px solid ${border}`,borderRadius:13,padding:22,marginTop:26}}>
        <h2 className="hl" style={{fontSize:22,marginBottom:14}}>📺 FREE STREAMING OPTIONS</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))",gap:11}}>
          {[{n:"NFL+",d:"Select NFL games",c:"#013369",l:"https://nfl.com/plus"},{n:"ESPN+",d:"NHL & NBA games",c:"#E03A3E",l:"https://espnplus.com"},{n:"YouTube TV",d:"All major networks",c:"#FF0000",l:"https://tv.youtube.com"},{n:"Fubo TV",d:"Regional + national",c:"#9F3FBD",l:"https://fubo.tv"},{n:"Bally Sports+",d:"Tigers, Wings, Pistons",c:"#00A651",l:"https://ballysports.com"},{n:"Peacock",d:"NBC Sunday Night",c:"#000080",l:"https://peacocktv.com"}].map(opt=>(
            <a key={opt.n} href={opt.l} target="_blank" rel="noopener noreferrer" style={{background:opt.c+"15",border:`1px solid ${opt.c}33`,borderRadius:9,padding:"12px 14px",display:"block",textDecoration:"none",cursor:"pointer"}}>
              <div style={{fontWeight:800,fontSize:14,color:opt.c,marginBottom:3}}>{opt.n}</div>
              <div style={{fontSize:12,color:tm,marginBottom:7}}>{opt.d}</div>
              <div style={{fontSize:11,color:opt.c,fontWeight:700,display:"flex",alignItems:"center",gap:3}}>Visit <ExternalLink size={9}/></div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── MERCH PAGE ───────────────────────────────────────────────────────────────
function MerchPage({dark}) {
  const bg=dark?"#0D1520":"#fff";const border=dark?"#0f1e2e":"#dce4ef";const bg2=dark?"#060B12":"#f0f4f8";const tm=dark?"#6b8fa8":"#607080";
  const [cart,setCart]=useState([]);const [filter,setFilter]=useState("All");const [sel,setSel]=useState(null);const [selSize,setSelSize]=useState(null);const [cartOpen,setCartOpen]=useState(false);const [addedId,setAddedId]=useState(null);
  const cats=["All","Apparel","Headwear","Accessories"];const filt=filter==="All"?MERCH:MERCH.filter(m=>m.category===filter);
  const total=cart.reduce((s,i)=>s+i.price*i.qty,0);const cnt=cart.reduce((s,i)=>s+i.qty,0);
  const add=item=>{setCart(p=>{const ex=p.find(c=>c.id===item.id);return ex?p.map(c=>c.id===item.id?{...c,qty:c.qty+1}:c):[...p,{...item,qty:1}];});setAddedId(item.id);setTimeout(()=>setAddedId(null),1500);setSel(null);};
  const bc=b=>b==="BESTSELLER"?MAIZE:b==="NEW"?LIVE_G:b==="HOT"?HOT_RED:b==="LIMITED"?HOT_RED:b==="BUNDLE"?"#7289da":"#888";
  return(
    <div className="fu" style={{maxWidth:1280,margin:"0 auto",padding:"26px 20px 56px"}}>
      <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginBottom:22,flexWrap:"wrap",gap:12}}>
        <div><div style={{display:"flex",alignItems:"center",gap:9,marginBottom:4}}><ShoppingBag size={24} color={MAIZE}/><h1 className="hl" style={{fontSize:42}}>MERCH STORE</h1></div><p style={{color:tm,fontSize:13}}>Official Great Lakes Sports gear. Michigan pride, game day ready.</p></div>
        <button onClick={()=>setCartOpen(true)} style={{position:"relative",background:MAIZE,border:"none",borderRadius:8,padding:"9px 16px",cursor:"pointer",color:NAVY,display:"flex",alignItems:"center",gap:6,fontSize:13,fontWeight:800}}>
          <ShoppingBag size={14}/>Cart{cnt>0&&<span style={{background:HOT_RED,color:"#fff",borderRadius:"50%",width:17,height:17,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800}}>{cnt}</span>}
        </button>
      </div>
      <div style={{display:"flex",gap:7,marginBottom:22,flexWrap:"wrap"}}>{cats.map(c=><button key={c} onClick={()=>setFilter(c)} className="pill" style={{padding:"5px 14px",borderRadius:18,border:`1px solid ${filter===c?MAIZE:(dark?"#1a2b3d":"#cdd8e4")}`,background:filter===c?`${MAIZE}18`:"transparent",color:filter===c?MAIZE:tm,fontSize:12,fontWeight:700,cursor:"pointer"}}>{c}</button>)}</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(230px,1fr))",gap:16}}>
        {filt.map(item=>(
          <div key={item.id} className="card" onClick={()=>{setSel(item);setSelSize(null);}} style={{background:bg,border:`1px solid ${border}`,borderRadius:11,overflow:"hidden"}}>
            <div style={{position:"relative",aspectRatio:"1/1",overflow:"hidden",background:bg2}}>
              <img src={item.image} alt={item.name} loading="lazy" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
              {item.badge&&<span style={{position:"absolute",top:9,left:9,background:bc(item.badge),color:item.badge==="BESTSELLER"?NAVY:"#fff",fontSize:10,fontWeight:800,padding:"3px 7px",borderRadius:4}}>{item.badge}</span>}
              {addedId===item.id&&<div style={{position:"absolute",inset:0,background:`${LIVE_G}dd`,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:7}}><CheckCircle size={34} color="#fff"/><span style={{color:"#fff",fontWeight:700,fontSize:14}}>Added!</span></div>}
            </div>
            <div style={{padding:"11px 13px"}}>
              <div style={{fontSize:10,color:tm,fontWeight:600,letterSpacing:"0.08em",marginBottom:2}}>{item.category.toUpperCase()}</div>
              <h3 style={{fontSize:13,fontWeight:700,marginBottom:7,lineHeight:1.3}}>{item.name}</h3>
              <div style={{display:"flex",gap:2,marginBottom:9}}>{[1,2,3,4,5].map(s=><Star key={s} size={10} fill={s<=Math.round(item.rating)?MAIZE:"none"} color={s<=Math.round(item.rating)?MAIZE:"#555"}/>)}<span style={{fontSize:11,color:tm,marginLeft:3}}>({item.reviews})</span></div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <span className="hl" style={{fontSize:21}}>${item.price.toFixed(2)}</span>
                <button onClick={e=>{e.stopPropagation();item.sizes?setSel(item):add(item);}} style={{background:MAIZE,color:NAVY,border:"none",borderRadius:6,padding:"6px 11px",cursor:"pointer",fontSize:11,fontWeight:800}}>{item.sizes?"Select":"Add"}</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {sel&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.78)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",padding:20}} onClick={()=>setSel(null)}>
          <div onClick={e=>e.stopPropagation()} style={{background:bg,borderRadius:13,maxWidth:580,width:"100%",overflow:"hidden",display:"flex",flexWrap:"wrap",maxHeight:"88vh",overflowY:"auto"}}>
            <div style={{flex:"0 0 220px",minWidth:180,aspectRatio:"1/1",background:bg2}}><img src={sel.image} alt={sel.name} style={{width:"100%",height:"100%",objectFit:"cover"}}/></div>
            <div style={{flex:1,padding:22,minWidth:200}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:13}}><h2 className="hl" style={{fontSize:24,lineHeight:1.1}}>{sel.name}</h2><button onClick={()=>setSel(null)} style={{background:"none",border:"none",cursor:"pointer",color:tm}}><X size={17}/></button></div>
              <div className="hl" style={{fontSize:30,marginBottom:14,color:MAIZE}}>${sel.price.toFixed(2)}</div>
              {sel.sizes&&<div style={{marginBottom:18}}><p style={{fontSize:11,fontWeight:700,color:tm,marginBottom:7,letterSpacing:"0.08em"}}>SIZE</p><div style={{display:"flex",gap:7,flexWrap:"wrap"}}>{sel.sizes.map(s=><button key={s} onClick={()=>setSelSize(s)} style={{padding:"6px 13px",borderRadius:6,border:`1px solid ${selSize===s?MAIZE:(dark?"#1a2b3d":"#cdd8e4")}`,background:selSize===s?`${MAIZE}22`:"transparent",color:selSize===s?MAIZE:(dark?"#ccc":"#333"),fontSize:12,fontWeight:700,cursor:"pointer"}}>{s}</button>)}</div></div>}
              <button onClick={()=>add(sel)} disabled={sel.sizes&&!selSize} style={{width:"100%",background:sel.sizes&&!selSize?"#333":MAIZE,color:sel.sizes&&!selSize?"#666":NAVY,border:"none",borderRadius:8,padding:12,fontSize:14,fontWeight:800,cursor:sel.sizes&&!selSize?"not-allowed":"pointer"}}>{sel.sizes&&!selSize?"SELECT A SIZE":"ADD TO CART"}</button>
              <p style={{fontSize:11,color:tm,textAlign:"center",marginTop:7}}>Free shipping on orders over $75</p>
            </div>
          </div>
        </div>
      )}
      {cartOpen&&(
        <div style={{position:"fixed",inset:0,zIndex:300}}>
          <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.6)"}} onClick={()=>setCartOpen(false)}/>
          <div style={{position:"absolute",right:0,top:0,bottom:0,width:"min(350px,100vw)",background:bg,padding:20,overflowY:"auto",display:"flex",flexDirection:"column"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}><h2 className="hl" style={{fontSize:22}}>CART ({cnt})</h2><button onClick={()=>setCartOpen(false)} style={{background:"none",border:"none",cursor:"pointer",color:tm}}><X size={18}/></button></div>
            {cart.length===0?<div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:9,color:tm}}><ShoppingBag size={40} strokeWidth={1}/><p>Cart is empty</p></div>:
            <><div style={{flex:1,display:"flex",flexDirection:"column",gap:13}}>
              {cart.map(item=>(
                <div key={item.id} style={{display:"flex",gap:9,alignItems:"center"}}>
                  <img src={item.image} alt={item.name} style={{width:52,height:52,objectFit:"cover",borderRadius:7,flexShrink:0}}/>
                  <div style={{flex:1}}><p style={{fontSize:13,fontWeight:600,marginBottom:2}}>{item.name}</p><p style={{fontSize:12,color:tm}}>${item.price.toFixed(2)}</p></div>
                  <div style={{display:"flex",alignItems:"center",gap:5}}>
                    <button onClick={()=>setCart(p=>p.map(c=>c.id===item.id?{...c,qty:Math.max(1,c.qty-1)}:c))} style={{background:bg2,border:"none",borderRadius:4,width:22,height:22,cursor:"pointer",color:dark?"#ccc":"#333",fontSize:15,display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
                    <span style={{fontSize:13,fontWeight:700,minWidth:14,textAlign:"center"}}>{item.qty}</span>
                    <button onClick={()=>setCart(p=>p.map(c=>c.id===item.id?{...c,qty:c.qty+1}:c))} style={{background:bg2,border:"none",borderRadius:4,width:22,height:22,cursor:"pointer",color:dark?"#ccc":"#333",fontSize:15,display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
                    <button onClick={()=>setCart(p=>p.filter(c=>c.id!==item.id))} style={{background:"none",border:"none",cursor:"pointer",color:"#666",marginLeft:3}}><X size={11}/></button>
                  </div>
                </div>
              ))}
            </div>
            <div style={{borderTop:`1px solid ${border}`,paddingTop:14,marginTop:14}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:13}}><span style={{fontSize:14,color:tm}}>Subtotal</span><span className="hl" style={{fontSize:21}}>${total.toFixed(2)}</span></div>
              <button style={{width:"100%",background:MAIZE,color:NAVY,border:"none",borderRadius:8,padding:12,fontSize:14,fontWeight:800,cursor:"pointer"}}>CHECKOUT</button>
            </div></>}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── NEWSLETTER PAGE ──────────────────────────────────────────────────────────
function NewsletterPage({dark}) {
  const bg=dark?"#0D1520":"#fff";const border=dark?"#0f1e2e":"#dce4ef";const tm=dark?"#6b8fa8":"#607080";
  const [email,setEmail]=useState("");const [name,setName]=useState("");const [plan,setPlan]=useState("plus");const [done,setDone]=useState(false);
  const [prefs,setPrefs]=useState({lions:true,tigers:true,pistons:false,redwings:false,michigan:true,msu:false});
  const plans=[
    {id:"free",name:"Free",price:0,color:tm,features:["Daily top 5 headlines","Live score alerts","Weekly preview"]},
    {id:"plus",name:"Plus",price:4.99,color:MAIZE,badge:"POPULAR",features:["Everything in Free","Breaking news alerts","The Insider newsletter","Ad-free site","Early podcast access"]},
    {id:"pro",name:"Pro",price:9.99,color:HOT_RED,features:["Everything in Plus","Betting digest","Injury breakdowns","Fantasy analysis","Subscriber Discord 🎮","Monthly Q&A"]},
  ];
  if(done)return(
    <div className="fu" style={{maxWidth:560,margin:"70px auto",padding:"0 20px",textAlign:"center"}}>
      <div style={{width:68,height:68,borderRadius:"50%",background:`${LIVE_G}22`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 18px"}}><CheckCircle size={34} color={LIVE_G}/></div>
      <h2 className="hl" style={{fontSize:42,marginBottom:9}}>YOU'RE IN!</h2>
      <p style={{color:tm,fontSize:15,lineHeight:1.7}}>Welcome to Great Lakes Sports, {name||"Michigan fan"}! Your first digest drops tomorrow. Confirm your email to activate.</p>
    </div>
  );
  return(
    <div className="fu" style={{maxWidth:1050,margin:"0 auto",padding:"32px 20px 56px"}}>
      <div style={{textAlign:"center",marginBottom:40}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:7,background:`${NAVY}22`,border:`1px solid ${NAVY}44`,borderRadius:18,padding:"4px 13px",marginBottom:13}}><Mail size={12} color={MAIZE}/><span style={{fontSize:11,fontWeight:700,color:MAIZE,letterSpacing:"0.1em"}}>MICHIGAN SPORTS DIGEST</span></div>
        <h1 className="hl" style={{fontSize:"clamp(32px,6vw,58px)",lineHeight:1.05,marginBottom:12}}>MICHIGAN SPORTS.<br/>EVERY MORNING.</h1>
        <p style={{color:tm,fontSize:15,maxWidth:500,margin:"0 auto",lineHeight:1.7}}>Lions, Tigers, Pistons, Red Wings, Michigan, Michigan State — breaking news, scores, and expert analysis delivered daily.</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))",gap:16,marginBottom:40}}>
        {plans.map(p=>{const active=plan===p.id;return(
          <div key={p.id} onClick={()=>setPlan(p.id)} style={{background:bg,border:`2px solid ${active?p.color:border}`,borderRadius:13,padding:20,cursor:"pointer",position:"relative",boxShadow:active?`0 0 0 4px ${p.color}18`:undefined}}>
            {p.badge&&<span style={{position:"absolute",top:-10,left:"50%",transform:"translateX(-50%)",background:p.color,color:p.color===MAIZE?NAVY:"#fff",fontSize:10,fontWeight:800,padding:"2px 11px",borderRadius:9,whiteSpace:"nowrap"}}>{p.badge}</span>}
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:13}}>
              <div><h3 className="hl" style={{fontSize:24,color:p.color}}>{p.name}</h3><div style={{fontSize:12,color:tm}}>{p.price===0?"Always free":`$${p.price}/mo`}</div></div>
              <div style={{width:18,height:18,borderRadius:"50%",border:`2px solid ${active?p.color:(dark?"#333":"#ccc")}`,background:active?p.color:"transparent",display:"flex",alignItems:"center",justifyContent:"center"}}>{active&&<div style={{width:6,height:6,borderRadius:"50%",background:"#fff"}}/>}</div>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:6}}>
              {p.features.map((f,i)=><div key={i} style={{display:"flex",alignItems:"flex-start",gap:6,fontSize:12,color:dark?"#c4d4e4":"#1a2535"}}><CheckCircle size={12} color={p.color} style={{flexShrink:0,marginTop:1}}/>{f}</div>)}
            </div>
          </div>
        );})}
      </div>
      <div style={{background:bg,border:`1px solid ${border}`,borderRadius:13,padding:"24px 28px",maxWidth:640,margin:"0 auto"}}>
        <h2 className="hl" style={{fontSize:26,marginBottom:18}}>SUBSCRIBE — {plans.find(p=>p.id===plan)?.name.toUpperCase()}</h2>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:13,marginBottom:13}}>
          <div><label style={{fontSize:11,fontWeight:700,color:tm,letterSpacing:"0.08em",display:"block",marginBottom:5}}>YOUR NAME</label><input value={name} onChange={e=>setName(e.target.value)} placeholder="First name" style={{width:"100%",background:dark?"#060B12":"#f8fafc",border:`1px solid ${border}`,borderRadius:7,padding:"9px 11px",fontSize:13,color:dark?"#ECF0F5":"#0D1520",outline:"none"}}/></div>
          <div><label style={{fontSize:11,fontWeight:700,color:tm,letterSpacing:"0.08em",display:"block",marginBottom:5}}>EMAIL</label><input value={email} onChange={e=>setEmail(e.target.value)} placeholder="your@email.com" type="email" style={{width:"100%",background:dark?"#060B12":"#f8fafc",border:`1px solid ${border}`,borderRadius:7,padding:"9px 11px",fontSize:13,color:dark?"#ECF0F5":"#0D1520",outline:"none"}}/></div>
        </div>
        <div style={{marginBottom:18}}>
          <label style={{fontSize:11,fontWeight:700,color:tm,letterSpacing:"0.08em",display:"block",marginBottom:9}}>TEAMS YOU FOLLOW</label>
          <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
            {[{id:"lions",l:"🦁 Lions",c:DET_BLUE},{id:"tigers",l:"🐯 Tigers",c:DET_ORG},{id:"pistons",l:"🏀 Pistons",c:"#C8102E"},{id:"redwings",l:"🏒 Wings",c:"#CE1126"},{id:"michigan",l:"〽️ Michigan",c:NAVY},{id:"msu",l:"🟢 MSU",c:"#18453B"}].map(t=>(
              <button key={t.id} onClick={()=>setPrefs(p=>({...p,[t.id]:!p[t.id]}))} style={{padding:"4px 11px",borderRadius:14,border:`1px solid ${prefs[t.id]?t.c:(dark?"#1a2b3d":"#cdd8e4")}`,background:prefs[t.id]?t.c+"22":"transparent",color:prefs[t.id]?t.c:tm,fontSize:12,fontWeight:600,cursor:"pointer"}}>{t.l}</button>
            ))}
          </div>
        </div>
        <button className="bp" onClick={()=>email.includes("@")&&setDone(true)} style={{width:"100%",background:MAIZE,color:NAVY,border:"none",borderRadius:8,padding:12,fontSize:14,fontWeight:800,cursor:"pointer"}}>{plans.find(p=>p.id===plan)?.price===0?"SUBSCRIBE FREE":"START FREE TRIAL"}</button>
        <p style={{fontSize:11,color:tm,textAlign:"center",marginTop:9}}>No spam. Unsubscribe anytime.</p>
      </div>
    </div>
  );
}

// ─── DISCORD PAGE ─────────────────────────────────────────────────────────────
function DiscordPage({dark}) {
  const bg=dark?"#0D1520":"#fff";const border=dark?"#0f1e2e":"#dce4ef";const tm=dark?"#6b8fa8":"#607080";
  const channels=[
    {n:"#general-michigan",d:"Main chat for all Michigan sports fans",locked:false,cnt:"2,401"},
    {n:"#lions-den",d:"Detroit Lions game threads, analysis, memes 🦁",locked:false,cnt:"891"},
    {n:"#tigers-dugout",d:"Tigers game chat, Skubal worship, trade talk 🐯",locked:false,cnt:"634"},
    {n:"#pistons-nation",d:"Cade, Duren and the Pistons rise 🏀",locked:false,cnt:"445"},
    {n:"#wings-fans",d:"Red Wings hockey talk, trade deadline 🏒",locked:false,cnt:"378"},
    {n:"#go-blue",d:"Michigan Wolverines football & basketball 〽️",locked:false,cnt:"712"},
    {n:"#spartan-nation",d:"Michigan State sports coverage 💚",locked:false,cnt:"489"},
    {n:"#subscriber-lounge",d:"Exclusive for newsletter subscribers only",locked:true,cnt:"234"},
    {n:"#betting-picks",d:"Community betting picks & odds discussion",locked:true,cnt:"156"},
    {n:"#fantasy-sports",d:"Fantasy football, baseball, basketball advice",locked:true,cnt:"198"},
    {n:"#writers-room",d:"Live Q&A sessions with GLS writers",locked:true,cnt:"89"},
  ];
  return(
    <div className="fu" style={{maxWidth:980,margin:"0 auto",padding:"26px 20px 56px"}}>
      <div style={{background:"linear-gradient(135deg,#36393f,#202225)",borderRadius:15,padding:"36px 32px",marginBottom:28,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-18,right:-18,fontSize:110,opacity:0.06}}>🎮</div>
        <div style={{display:"flex",alignItems:"center",gap:13,marginBottom:14}}>
          <div style={{width:54,height:54,borderRadius:13,background:"#5865f2",display:"flex",alignItems:"center",justifyContent:"center",fontSize:30}}>🎮</div>
          <div><h1 className="hl" style={{fontSize:42,color:"#fff",lineHeight:1}}>JOIN THE DISCORD</h1><p style={{color:"rgba(255,255,255,0.5)",fontSize:13}}>2,400+ Michigan sports fans and growing</p></div>
        </div>
        <p style={{color:"rgba(255,255,255,0.7)",fontSize:14,lineHeight:1.7,maxWidth:520,marginBottom:22}}>Connect with fellow Michigan fans in real time. Game threads, breaking news alerts, fantasy advice, and subscriber-only channels for the most dedicated fans.</p>
        <a href="https://discord.gg" target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:7,background:"#5865f2",color:"#fff",border:"none",borderRadius:9,padding:"12px 22px",cursor:"pointer",fontSize:14,fontWeight:800,textDecoration:"none"}}>JOIN SERVER FREE <ExternalLink size={13}/></a>
      </div>
      <div style={{background:bg,border:`1px solid ${border}`,borderRadius:13,overflow:"hidden"}}>
        <div style={{padding:"14px 18px",borderBottom:`1px solid ${border}`,display:"flex",alignItems:"center",gap:9}}>
          <div style={{width:9,height:9,borderRadius:"50%",background:LIVE_G}}/>
          <span style={{fontWeight:700,fontSize:13}}>Great Lakes Sports — Server</span>
          <span style={{fontSize:12,color:tm,marginLeft:"auto"}}>2,401 online</span>
        </div>
        {channels.map((ch,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:11,padding:"11px 18px",borderBottom:i<channels.length-1?`1px solid ${border}`:undefined,opacity:ch.locked?0.72:1}}>
            <span style={{fontSize:15,color:ch.locked?"#555":"#72767d"}}>#</span>
            <div style={{flex:1}}>
              <div style={{display:"flex",alignItems:"center",gap:7}}>
                <span style={{fontWeight:600,fontSize:13}}>{ch.n}</span>
                {ch.locked&&<span style={{display:"flex",alignItems:"center",gap:3,background:`${MAIZE}22`,color:MAIZE,fontSize:10,fontWeight:700,padding:"2px 6px",borderRadius:7}}><Lock size={8}/>SUBSCRIBER</span>}
              </div>
              <p style={{fontSize:12,color:tm}}>{ch.d}</p>
            </div>
            <span style={{fontSize:11,color:tm,flexShrink:0}}>{ch.cnt}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SOCIALS SECTION ─────────────────────────────────────────────────────────
function SocialsSection({dark}) {
  const bg=dark?"#0D1520":"#fff";const border=dark?"#0f1e2e":"#dce4ef";const tm=dark?"#6b8fa8":"#607080";
  const [active,setActive]=useState(0);
  const team=TEAM_SOCIALS[active];
  return(
    <div style={{marginBottom:42}}>
      <div style={{display:"flex",alignItems:"center",gap:11,marginBottom:18}}>
        <div style={{width:4,height:26,background:"#1DA1F2",borderRadius:2}}/>
        <h2 className="hl" style={{fontSize:26}}>TEAM SOCIALS</h2>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{marginLeft:"auto",fontSize:12,color:"#1DA1F2",fontWeight:600,textDecoration:"none",display:"flex",alignItems:"center",gap:3}}>Twitter <ExternalLink size={10}/></a>
      </div>
      <div style={{background:bg,border:`1px solid ${border}`,borderRadius:12,overflow:"hidden"}}>
        <div style={{display:"flex",overflowX:"auto",borderBottom:`1px solid ${border}`}}>
          {TEAM_SOCIALS.map((t,i)=>(
            <button key={i} onClick={()=>setActive(i)} style={{padding:"11px 16px",background:active===i?`${t.color}18`:"transparent",border:"none",cursor:"pointer",borderBottom:active===i?`2px solid ${t.color}`:"2px solid transparent",fontSize:12,fontWeight:700,color:active===i?t.color:tm,whiteSpace:"nowrap"}}>{t.name}</button>
          ))}
        </div>
        <div style={{padding:18}}>
          <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:14}}>
            <div style={{width:38,height:38,borderRadius:"50%",background:team.color+"33",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>{team.name.split(" ").pop()}</div>
            <div><div style={{fontWeight:700,fontSize:13}}>{team.name}</div><div style={{fontSize:12,color:tm}}>{team.handle}</div></div>
            <a href={team.url} target="_blank" rel="noopener noreferrer" style={{marginLeft:"auto",background:"#1DA1F2",color:"#fff",border:"none",borderRadius:7,padding:"6px 13px",cursor:"pointer",fontSize:12,fontWeight:700,textDecoration:"none",display:"flex",alignItems:"center",gap:4}}><ExternalLink size={11}/>Follow</a>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:13}}>
            {team.posts.map((p,i)=>(
              <div key={i} style={{paddingBottom:i<team.posts.length-1?13:0,borderBottom:i<team.posts.length-1?`1px solid ${border}`:undefined}}>
                <p style={{fontSize:14,lineHeight:1.6,marginBottom:5,color:dark?"#ccd8e4":"#1a2535"}}>{p.text}</p>
                <div style={{display:"flex",alignItems:"center",gap:11,fontSize:12,color:tm}}>
                  <span>{p.time} ago</span>
                  <span style={{display:"flex",alignItems:"center",gap:3}}><Heart size={10}/>{p.likes.toLocaleString()}</span>
                  <a href={team.url} target="_blank" rel="noopener noreferrer" style={{color:"#1DA1F2",fontWeight:600,textDecoration:"none",marginLeft:"auto",display:"flex",alignItems:"center",gap:3}}>View <ExternalLink size={9}/></a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SPORT PAGE ───────────────────────────────────────────────────────────────
function SportPage({sport,dark,articles,bookmarks,toggleBookmark,onArticleClick}) {
  const cfg=SPORT_CFG[sport]||SPORT_CFG.nfl;
  const [filter,setFilter]=useState(null);
  const bg=dark?"#0D1520":"#fff";const border=dark?"#0f1e2e":"#dce4ef";const tm=dark?"#6b8fa8":"#607080";
  const teams=sport==="college"?COLLEGE_TEAMS:PRO_TEAMS.filter(t=>t.sport===sport.toUpperCase());
  const sorted=[...articles].filter(a=>{
    if(sport==="college")return["CFB","CBB","CFH","CBH"].includes(a.sport);
    return a.sport===sport.toUpperCase();
  }).sort((a,b)=>(b.staffPick?1:0)-(a.staffPick?1:0));
  const filtered=filter?sorted.filter(a=>a.team===filter):sorted;
  return(
    <div className="fu" style={{maxWidth:1280,margin:"0 auto",padding:"26px 20px 48px"}}>
      <div style={{display:"flex",alignItems:"center",gap:13,marginBottom:22}}>
        <div style={{width:54,height:54,borderRadius:13,background:cfg.color+"22",border:`2px solid ${cfg.color}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26}}>{cfg.emoji}</div>
        <div><h1 className="hl" style={{fontSize:44,lineHeight:1}}>{cfg.label}</h1><p style={{color:tm,fontSize:13}}>{cfg.desc} — Michigan coverage</p></div>
      </div>
      <div style={{display:"flex",gap:7,flexWrap:"wrap",marginBottom:26,padding:"11px 13px",background:bg,borderRadius:9,border:`1px solid ${border}`}}>
        <button className="pill" onClick={()=>setFilter(null)} style={{padding:"4px 13px",borderRadius:15,border:`1px solid ${!filter?cfg.color:border}`,background:!filter?cfg.color+"22":"transparent",color:!filter?cfg.color:tm,fontSize:12,fontWeight:700,cursor:"pointer"}}>All Teams</button>
        {teams.map(t=><button key={t.id} className="pill" onClick={()=>setFilter(t.id)} style={{padding:"4px 13px",borderRadius:15,border:`1px solid ${filter===t.id?t.color:border}`,background:filter===t.id?t.color+"22":"transparent",color:filter===t.id?t.color:tm,fontSize:12,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:3}}>
          {t.fav&&"👑"}{sport==="college"?t.school:t.name}
        </button>)}
      </div>
      {filtered.length>0&&<div style={{marginBottom:22}}><HeroCard article={filtered[0]} dark={dark} bookmarks={bookmarks} toggleBookmark={toggleBookmark} onClick={()=>onArticleClick(filtered[0])}/></div>}
      {filtered.length>1&&<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))",gap:13,marginBottom:30}}>{filtered.slice(1).map(a=><ArticleCard key={a.id} article={a} dark={dark} bookmarks={bookmarks} toggleBookmark={toggleBookmark} onClick={()=>onArticleClick(a)}/>)}</div>}
      {filtered.length===0&&<div style={{textAlign:"center",padding:"48px 20px",color:tm}}><div style={{fontSize:48,marginBottom:11}}>{cfg.emoji}</div><p style={{fontSize:15}}>No stories yet — check back soon!</p></div>}
    </div>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage({dark,articles,bookmarks,toggleBookmark,onArticleClick,setPage}) {
  const tm=dark?"#6b8fa8":"#607080";
  const sorted=[...articles].sort((a,b)=>(b.staffPick?1:0)-(a.staffPick?1:0));
  const featured=sorted.find(a=>a.hot&&a.staffPick)||sorted[0];
  const proArts=sorted.filter(a=>["NFL","MLB","NBA","NHL"].includes(a.sport)&&a.id!==featured.id);
  const collegeArts=sorted.filter(a=>["CFB","CBB"].includes(a.sport));

  const SH=({title,emoji,color,arts,id})=>(
    <div style={{marginBottom:42}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
        <div style={{display:"flex",alignItems:"center",gap:9}}>
          <div style={{width:38,height:38,borderRadius:10,background:color+"20",border:`1.5px solid ${color}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>{emoji}</div>
          <div><h2 className="hl" style={{fontSize:24,lineHeight:1}}>{title}</h2><span style={{fontSize:10,color:MAIZE,fontWeight:700}}>👑 Detroit first</span></div>
        </div>
        <button onClick={()=>setPage(id)} style={{background:color+"18",border:`1px solid ${color}44`,borderRadius:7,cursor:"pointer",padding:"5px 13px",fontSize:12,fontWeight:700,color,display:"flex",alignItems:"center",gap:3}}>All <ChevronRight size={11}/></button>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:13}}>
        {arts.slice(0,4).map(a=><ArticleCard key={a.id} article={a} dark={dark} bookmarks={bookmarks} toggleBookmark={toggleBookmark} onClick={()=>onArticleClick(a)}/>)}
      </div>
    </div>
  );

  return(
    <div style={{maxWidth:1400,margin:"0 auto",padding:"22px 18px 56px"}}>
      <div style={{marginBottom:18}}><HeroCard article={featured} dark={dark} bookmarks={bookmarks} toggleBookmark={toggleBookmark} onClick={()=>onArticleClick(featured)}/></div>
      <TrendingTopics dark={dark} articles={articles} onArticleClick={onArticleClick}/>
      <div className="mg" style={{display:"grid",gridTemplateColumns:"1fr 330px",gap:26}}>
        <div>
          <SH title="NFL FOOTBALL" emoji="🏈" color="#60a5fa" arts={proArts.filter(a=>a.sport==="NFL")} id="nfl"/>
          <SH title="MLB BASEBALL" emoji="⚾" color="#4ade80" arts={proArts.filter(a=>a.sport==="MLB")} id="mlb"/>
          <SH title="NBA BASKETBALL" emoji="🏀" color="#f87171" arts={proArts.filter(a=>a.sport==="NBA")} id="nba"/>
          <SH title="NHL HOCKEY" emoji="🏒" color="#a78bfa" arts={proArts.filter(a=>a.sport==="NHL")} id="nhl"/>
          <SH title="COLLEGE SPORTS" emoji="🎓" color={MAIZE} arts={collegeArts} id="college"/>
          <SocialsSection dark={dark}/>
          <LiveNews dark={dark}/>
          {/* Streams preview */}
          <div style={{marginBottom:42}}>
            <div style={{display:"flex",alignItems:"center",gap:11,marginBottom:16}}>
              <div style={{width:4,height:26,background:HOT_RED,borderRadius:2}}/>
              <h2 className="hl" style={{fontSize:26}}>UPCOMING STREAMS</h2>
              <button onClick={()=>setPage("streams")} style={{marginLeft:"auto",background:"none",border:`1px solid ${dark?"#1a2b3d":"#cdd8e4"}`,borderRadius:7,padding:"4px 11px",cursor:"pointer",fontSize:12,fontWeight:700,color:tm,display:"flex",alignItems:"center",gap:3}}>All <ChevronRight size={11}/></button>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:9}}>
              {STREAMS.slice(0,3).map((s,i)=>(
                <div key={i} style={{background:dark?"#0D1520":"#fff",border:`1px solid ${s.live?`${LIVE_G}55`:(dark?"#0f1e2e":"#dce4ef")}`,borderRadius:10,padding:"11px 15px",display:"flex",alignItems:"center",gap:13}}>
                  <div style={{width:38,height:38,borderRadius:9,background:s.color+"22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{s.emoji}</div>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:700,fontSize:13}}>{s.team} <span style={{color:dark?"#aaa":"#555",fontWeight:400,fontSize:12}}>{s.opponent}</span></div>
                    <div style={{fontSize:12,color:tm}}>{s.date} · {s.channel}</div>
                  </div>
                  {s.live&&<span style={{display:"flex",alignItems:"center",gap:3,background:`${LIVE_G}22`,color:LIVE_G,fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:9}}><span className="ldot" style={{width:4,height:4,borderRadius:"50%",background:LIVE_G,display:"inline-block"}}/>LIVE</span>}
                </div>
              ))}
            </div>
          </div>
          {/* Podcast teaser */}
          <div style={{position:"relative",borderRadius:13,overflow:"hidden",background:`linear-gradient(135deg,${NAVY},#0a1a2e)`,padding:"28px 24px",border:`1px solid ${MAIZE}33`}}>
            <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${MAIZE},transparent)`}}/>
            <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",flexWrap:"wrap",gap:18}}>
              <div>
                <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:9}}>
                  <div style={{width:40,height:40,borderRadius:10,background:`linear-gradient(135deg,${MAIZE},${MAIZE2})`,display:"flex",alignItems:"center",justifyContent:"center"}}><Mic size={20} color={NAVY}/></div>
                  <div><div style={{fontSize:10,fontWeight:700,color:MAIZE,letterSpacing:"0.12em"}}>GREAT LAKES SPORTS PODCAST</div><span style={{background:`${HOT_RED}22`,border:`1px solid ${HOT_RED}44`,color:HOT_RED,fontSize:10,fontWeight:700,padding:"2px 7px",borderRadius:9}}>COMING SOON</span></div>
                </div>
                <h2 className="hl" style={{fontSize:"clamp(22px,4vw,38px)",color:"#fff",lineHeight:1.05,marginBottom:7}}>THE GREAT LAKES SPORTS PODCAST</h2>
                <p style={{color:"rgba(255,255,255,0.58)",fontSize:13,lineHeight:1.7,maxWidth:380}}>Lions, Tigers, Michigan, MSU — weekly deep dives with the writers you trust.</p>
              </div>
              <div style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,203,5,0.2)",borderRadius:11,padding:"18px 20px",minWidth:220}}>
                <p className="hl" style={{fontSize:18,color:"#fff",marginBottom:5}}>GET NOTIFIED</p>
                <p style={{fontSize:12,color:"rgba(255,255,255,0.5)",marginBottom:13}}>Be first to hear Episode 1.</p>
                <div style={{display:"flex",flexDirection:"column",gap:7}}>
                  <input placeholder="your@email.com" style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.15)",borderRadius:7,padding:"8px 11px",fontSize:13,color:"#fff",outline:"none"}}/>
                  <button style={{background:MAIZE,color:NAVY,border:"none",borderRadius:7,padding:9,fontSize:13,fontWeight:800,cursor:"pointer"}}>NOTIFY ME</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hm"><Sidebar dark={dark} articles={articles} onArticle={onArticleClick}/></div>
      </div>
    </div>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────
function Footer({setPage}) {
  const tm="rgba(255,255,255,0.55)";
  return(
    <footer style={{background:NAVY,color:tm,padding:"36px 18px 22px",marginTop:36}}>
      <div style={{maxWidth:1400,margin:"0 auto"}}>
        <div style={{display:"flex",flexWrap:"wrap",gap:28,justifyContent:"space-between",marginBottom:28}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:11}}>
              <div style={{width:34,height:34,borderRadius:9,background:`linear-gradient(135deg,${MAIZE},${MAIZE2})`,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:18,color:NAVY,fontFamily:"Inter"}}>G</div>
              <div><div className="hl" style={{fontSize:18,color:"#fff"}}>GREAT LAKES SPORTS</div></div>
            </div>
            <p style={{fontSize:12,maxWidth:240,lineHeight:1.65}}>Your home for Michigan professional and college sports. Lions, Tigers, Pistons, Red Wings, Wolverines, Spartans and more.</p>
          </div>
          <div style={{display:"flex",gap:36,flexWrap:"wrap"}}>
            <div><p style={{color:MAIZE,fontWeight:700,fontSize:11,marginBottom:9,letterSpacing:"0.08em"}}>DETROIT TEAMS</p>{PRO_TEAMS.map(t=><p key={t.id} style={{fontSize:12,marginBottom:4,cursor:"pointer"}} onClick={()=>setPage(t.sport.toLowerCase())}>{t.city} {t.name}</p>)}</div>
            <div><p style={{color:MAIZE,fontWeight:700,fontSize:11,marginBottom:9,letterSpacing:"0.08em"}}>MICHIGAN COLLEGE</p>{COLLEGE_TEAMS.slice(0,5).map(t=><p key={t.id} style={{fontSize:12,marginBottom:4}}>{t.school}</p>)}</div>
            <div><p style={{color:MAIZE,fontWeight:700,fontSize:11,marginBottom:9,letterSpacing:"0.08em"}}>SITE</p>{[["scores","Scores"],["odds","Odds"],["streams","Streams"],["stats","Stats"],["merch","Merch"],["discord","Discord"],["newsletter","Newsletter"]].map(([id,l])=><p key={id} style={{fontSize:12,marginBottom:4,cursor:"pointer"}} onClick={()=>setPage(id)}>{l}</p>)}</div>
          </div>
        </div>
        <div style={{borderTop:"1px solid rgba(255,255,255,0.1)",paddingTop:18,display:"flex",justifyContent:"space-between",fontSize:11,flexWrap:"wrap",gap:7}}>
          <span>© 2025 Great Lakes Sports. All rights reserved.</span>
          <span style={{color:MAIZE}}>Michigan Forever 🦁🐯</span>
        </div>
      </div>
    </footer>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [dark,setDark]=useState(()=>{try{return localStorage.getItem("gls_dark")!=="false";}catch{return true;}});
  const [page,setPage]=useState("home");
  const [article,setArticle]=useState(null);
  const [bookmarks,setBookmarks]=useState([]);
  const [searchOpen,setSearchOpen]=useState(false);
  const [mobileOpen,setMobileOpen]=useState(false);

  const go=p=>{setPage(p);setMobileOpen(false);window.scrollTo({top:0,behavior:"smooth"});};
  const toggleDark=v=>{setDark(v);try{localStorage.setItem("gls_dark",String(v));}catch{}};
  const goArt=useCallback(a=>{setArticle(a);setPage("article");setMobileOpen(false);window.scrollTo({top:0,behavior:"smooth"});},[]);
  const toggleBM=useCallback(id=>{setBookmarks(p=>p.includes(id)?p.filter(b=>b!==id):[...p,id]);},[]);
  const related=article?ALL_ARTICLES.filter(a=>a.id!==article.id&&(a.sport===article.sport||a.team===article.team)).slice(0,3):[];

  const render=()=>{
    if(page==="article"&&article)return<ArticlePage article={article} dark={dark} bookmarks={bookmarks} toggleBookmark={toggleBM} onBack={()=>go("home")} related={related} onRelated={goArt}/>;
    if(page==="scores")return<ScoresPage dark={dark}/>;
    if(page==="stats")return<StatsPage dark={dark}/>;
    if(page==="odds")return<OddsPage dark={dark}/>;
    if(page==="streams")return<StreamsPage dark={dark}/>;
    if(page==="merch")return<MerchPage dark={dark}/>;
    if(page==="newsletter")return<NewsletterPage dark={dark}/>;
    if(page==="discord")return<DiscordPage dark={dark}/>;
    if(["nfl","nba","mlb","nhl","college"].includes(page))return<SportPage sport={page} dark={dark} articles={ALL_ARTICLES} bookmarks={bookmarks} toggleBookmark={toggleBM} onArticleClick={goArt}/>;
    return<HomePage dark={dark} articles={ALL_ARTICLES} bookmarks={bookmarks} toggleBookmark={toggleBM} onArticleClick={goArt} setPage={go}/>;
  };

  return(
    <div className={`app ${dark?"dark":"light"}`}>
      <GS/>
      <Header dark={dark} setDark={toggleDark} page={page} setPage={go} onSearch={()=>setSearchOpen(true)} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}/>
      <ScoreTicker dark={dark}/>
      <main>{render()}</main>
      <Footer setPage={go}/>
      {searchOpen&&<SearchOverlay dark={dark} onClose={()=>setSearchOpen(false)} articles={ALL_ARTICLES} onArticle={a=>{goArt(a);setSearchOpen(false);}}/>}
    </div>
  );
}
