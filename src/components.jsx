import { useEffect, useState } from "react";
import {
  Search, Moon, Sun, Bookmark, BookmarkCheck, Menu, X, Clock, User, Mic,
  ShoppingBag, Play, Radio, ChevronRight, ExternalLink,
} from "lucide-react";
import { SITE, TEAMS, ARTICLES, PICKS, CATEGORIES } from "./data.js";
import { useApp, formatDate } from "./hooks.js";
import { tickerGames, featuredGames } from "./scoresCore.js";

// ── Links ────────────────────────────────────────────────────────────────────
export function Link({ to = "", children, ...rest }) {
  return (
    <a href={`#/${to}`} {...rest}>
      {children}
    </a>
  );
}

export function ExtLink({ href, children, ...rest }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
}

// ── Artwork with fallbacks ───────────────────────────────────────────────────
// Used everywhere an image appears (article cards, article page, search results,
// clips). Order: the article's own photo, then the team logo on team colors,
// then the team emoji. A broken URL at any step falls through to the next one.
export function TeamArt({ team, src, alt = "" }) {
  const t = TEAMS[team] ?? TEAMS.default;
  const [badPhoto, setBadPhoto] = useState(null);
  const [badLogo, setBadLogo] = useState(false);
  const showPhoto = Boolean(src) && badPhoto !== src;

  return (
    <div className="art" style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color2})` }}>
      {showPhoto ? (
        <img className="art-photo" src={src} alt={alt} loading="lazy" onError={() => setBadPhoto(src)} />
      ) : t.logo && !badLogo ? (
        <img className="art-logo" src={t.logo} alt="" onError={() => setBadLogo(true)} />
      ) : (
        <span className="art-emoji" aria-hidden="true">{t.emoji}</span>
      )}
    </div>
  );
}

// Same idea for merch: product photo if there is one, otherwise a branded tile.
export function ProductArt({ item }) {
  const t = TEAMS[item.team] ?? TEAMS.default;
  const [badPhoto, setBadPhoto] = useState(null);
  const showPhoto = Boolean(item.image) && badPhoto !== item.image;

  return (
    <div className="art" style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color2})` }}>
      {showPhoto ? (
        <img className="art-photo" src={item.image} alt={item.name} loading="lazy" onError={() => setBadPhoto(item.image)} />
      ) : (
        <div className="product-fallback">
          <ShoppingBag size={34} aria-hidden="true" />
          <span className="hl">{item.name}</span>
        </div>
      )}
    </div>
  );
}

export function TeamBadge({ team }) {
  const t = TEAMS[team] ?? TEAMS.default;
  return (
    <span className="badge" style={{ background: t.color, color: t.ink }}>
      {t.name}
    </span>
  );
}

// ── Saved-article button ─────────────────────────────────────────────────────
export function SaveButton({ id, className = "save-btn" }) {
  const { saved, toggleSaved } = useApp();
  const isSaved = saved.includes(id);
  return (
    <button
      type="button"
      className={className}
      aria-pressed={isSaved}
      aria-label={isSaved ? "Remove from saved articles" : "Save article"}
      onClick={() => toggleSaved(id)}
    >
      {isSaved ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
    </button>
  );
}

// ── Cards ────────────────────────────────────────────────────────────────────
export function ArticleCard({ article }) {
  return (
    <article className="card hover article-card">
      <Link to={`article/${article.id}`} className="card-link">
        <div className="art-box">
          <TeamArt team={article.team} src={article.image} />
          <div className="art-shade" />
          <div className="art-tags">
            <TeamBadge team={article.team} />
            {article.featured && <span className="badge badge-brand">Featured</span>}
          </div>
        </div>
        <div className="card-body">
          <h3 className="card-title">{article.title}</h3>
          <div className="meta">
            <span><User size={11} /> {article.author}</span>
            <span><Clock size={11} /> {formatDate(article.date)}</span>
          </div>
        </div>
      </Link>
      <SaveButton id={article.id} />
    </article>
  );
}

export function ClipCard({ clip, onOpen }) {
  const ready = Boolean(clip.youtubeId);
  const thumb = ready ? `https://img.youtube.com/vi/${clip.youtubeId}/hqdefault.jpg` : null;
  return (
    <div className="card hover clip-card">
      <button type="button" className="clip-btn" disabled={!ready} onClick={() => onOpen(clip)}>
        <div className="art-box">
          <TeamArt team={clip.team} src={thumb} />
          <div className="art-shade" />
          {ready ? (
            <span className="play" aria-hidden="true"><Play size={22} fill="currentColor" /></span>
          ) : (
            <span className="badge badge-soon">Coming soon</span>
          )}
          <div className="art-tags"><TeamBadge team={clip.team} /></div>
        </div>
        <div className="card-body">
          <h3 className="card-title">{clip.title}</h3>
          <div className="meta"><span><Mic size={11} /> {clip.episode}</span></div>
        </div>
      </button>
    </div>
  );
}

export function ClipModal({ clip, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!clip) return null;
  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label={clip.title} onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="video">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${clip.youtubeId}?autoplay=1&rel=0`}
            title={clip.title}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="modal-meta">
          <div>
            <h3 className="card-title">{clip.title}</h3>
            <span className="muted tiny">{clip.episode}</span>
          </div>
          <button type="button" className="icon-btn" aria-label="Close video" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Scores ───────────────────────────────────────────────────────────────────
function MiniLogo({ team }) {
  const [bad, setBad] = useState(false);
  return team.logo && !bad ? (
    <img className="mini-logo" src={team.logo} alt="" onError={() => setBad(true)} />
  ) : (
    <span className="mini-abbr hl">{team.abbr}</span>
  );
}

export function GameCard({ g }) {
  const live = g.status === "LIVE";
  const final = g.status === "FINAL";
  const sides = [
    { t: g.away, label: "Away", other: g.home },
    { t: g.home, label: "Home", other: g.away },
  ];
  return (
    <div className={`card game${live ? " live" : ""}`}>
      <div className="game-head">
        <span className="sport-tag">{g.sport}</span>
        {live && <span className="live-tag"><i className="ldot" />Live</span>}
        {final && <span className="muted tiny">Final</span>}
        <span className="game-info">{g.info}</span>
      </div>
      <div className="game-body">
        {sides.map(({ t, label, other }) => (
          <div className="game-team" key={label}>
            <MiniLogo team={t} />
            <div className="game-name">
              <b>{t.name}</b>
              <span className="muted tiny">{label}</span>
            </div>
            {g.status !== "UPCOMING" && (
              <span className={`score hl${final && t.score < other.score ? " dim" : ""}`}>{t.score}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const matchup = (g) =>
  g.status === "UPCOMING"
    ? `${g.away.abbr} @ ${g.home.abbr}`
    : `${g.away.abbr} ${g.away.score}-${g.home.score} ${g.home.abbr}`;

function TickerItem({ g }) {
  const upcoming = g.status === "UPCOMING";
  return (
    <Link to="scores" className="ticker-item">
      {g.status === "LIVE" && <i className="ldot" />}
      <span className="ticker-sport">{g.sport}</span>
      <b>{g.away.abbr}</b>
      {!upcoming && <b className="ticker-score">{g.away.score}</b>}
      <span className="ticker-at">@</span>
      {!upcoming && <b className="ticker-score">{g.home.score}</b>}
      <b>{g.home.abbr}</b>
      <span className={`ticker-info ${g.status.toLowerCase()}`}>{g.info}</span>
    </Link>
  );
}

export function ScoreTicker() {
  const { scores } = useApp();
  const { games, loading, error } = scores;
  const items = tickerGames(games);
  const scroll = items.length >= 5;
  const list = scroll ? [...items, ...items] : items;

  let message = null;
  if (loading) message = "Loading Michigan scores...";
  else if (error) message = "Live scores are unavailable right now.";
  else if (items.length === 0) message = "No Michigan games in the next few days.";

  return (
    <div className="ticker">
      <div className="ticker-row">
        <Link to="scores" className="ticker-label">
          <i className="ldot" /> Scores
        </Link>
        <div className="ticker-track">
          {message ? (
            <div className="ticker-msg">{message}</div>
          ) : (
            <div className={`ticker-inner${scroll ? " scroll" : ""}`}>
              {list.map((g, i) => (
                <TickerItem key={`${g.id}-${i}`} g={g} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Header ───────────────────────────────────────────────────────────────────
const NAV = [
  ["", "Home"],
  ["articles", "Articles"],
  ["clips", "Clips"],
  ["picks", "Picks"],
  ["scores", "Scores"],
  ["merch", "Merch"],
  ["membership", "Membership"],
  ["discord", "Discord"],
];

export function Header({ section, onSearch }) {
  const { dark, setDark, saved } = useApp();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, []);

  return (
    <header className="header">
      <div className="container">
        <div className="header-row">
          <Link to="" className="brand" aria-label={`${SITE.name} home`}>
            <img className="brand-mark" src="/logo.jpg" alt="" width="46" height="46" />
            <span className="brand-text">
              <span className="brand-name hl">Great Lakes <b>Sports</b></span>
              <span className="brand-sub">Podcast</span>
            </span>
          </Link>

          <nav className="nav" aria-label="Main">
            {NAV.map(([to, label]) => (
              <Link key={to} to={to} className={`nav-link${section === to ? " active" : ""}`}>
                {label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <button type="button" className="icon-btn" aria-label="Search articles" onClick={onSearch}>
              <Search size={17} />
            </button>
            <Link to="saved" className="icon-btn" aria-label={`Saved articles (${saved.length})`}>
              <Bookmark size={17} />
              {saved.length > 0 && <span className="count">{saved.length}</span>}
            </Link>
            <button
              type="button"
              className="icon-btn"
              aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
              onClick={() => setDark(!dark)}
            >
              {dark ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <button
              type="button"
              className="icon-btn menu-btn"
              aria-label="Menu"
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>

        {open && (
          <nav className="mobile-nav" aria-label="Mobile">
            {NAV.map(([to, label]) => (
              <Link key={to} to={to} className={`mobile-link${section === to ? " active" : ""}`}>
                {label}
              </Link>
            ))}
          </nav>
        )}
      </div>
      <div className="header-line" />
    </header>
  );
}

// ── Search ───────────────────────────────────────────────────────────────────
export function SearchOverlay({ onClose }) {
  const [q, setQ] = useState("");

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const term = q.trim().toLowerCase();
  const results =
    term.length > 1
      ? ARTICLES.filter((a) =>
          [a.title, a.excerpt, TEAMS[a.team]?.full, ...(a.tags ?? [])].join(" ").toLowerCase().includes(term)
        )
      : [];

  return (
    <div className="modal search-modal" role="dialog" aria-modal="true" aria-label="Search" onClick={onClose}>
      <div className="search-box" onClick={(e) => e.stopPropagation()}>
        <div className="search-input">
          <Search size={17} aria-hidden="true" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search articles"
            aria-label="Search articles"
          />
          <button type="button" className="icon-btn" aria-label="Close search" onClick={onClose}>
            <X size={17} />
          </button>
        </div>
        {term.length > 1 && (
          <div className="search-results">
            {results.length === 0 ? (
              <p className="empty-note">No articles match "{q.trim()}". Try a team name.</p>
            ) : (
              results.map((a) => (
                <Link key={a.id} to={`article/${a.id}`} className="search-row" onClick={onClose}>
                  <div className="thumb"><TeamArt team={a.team} src={a.image} /></div>
                  <div>
                    <p className="search-title">{a.title}</p>
                    <span className="muted tiny">{TEAMS[a.team]?.full} · {formatDate(a.date)}</span>
                  </div>
                </Link>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Section heading ──────────────────────────────────────────────────────────
export function SectionHead({ title, to, linkLabel = "See all" }) {
  return (
    <div className="sec-head">
      <span className="sec-bar" />
      <h2 className="hl">{title}</h2>
      {to !== undefined && (
        <Link to={to} className="sec-link">
          {linkLabel} <ChevronRight size={13} />
        </Link>
      )}
    </div>
  );
}

export function TeamPills({ active }) {
  return (
    <div className="pills">
      {CATEGORIES.map((c) => (
        <Link
          key={c.id}
          to={c.id === "all" ? "articles" : `articles/${c.id}`}
          className={`pill${active === c.id ? " active" : ""}`}
        >
          {c.label}
        </Link>
      ))}
    </div>
  );
}

// ── Sidebar (stacks under the main column on phones) ─────────────────────────
function ScoresMini() {
  const { scores } = useApp();
  const { games, loading, error } = scores;
  const shown = featuredGames(games);

  return (
    <div className="panel">
      <h3 className="panel-title hl"><Radio size={15} /> Michigan scores</h3>
      {loading ? (
        <div className="stack">
          {[1, 2, 3].map((i) => <div key={i} className="sk" style={{ height: 34 }} />)}
        </div>
      ) : error ? (
        <p className="empty-note">Live scores are unavailable right now.</p>
      ) : shown.length === 0 ? (
        <p className="empty-note">No Michigan games in the next few days.</p>
      ) : (
        <div className="stack">
          {shown.map((g) => (
            <Link key={g.id} to="scores" className="mini-game">
              <span className="sport-tag">{g.sport}</span>
              <span className="mini-teams">{matchup(g)}</span>
              <span className={`mini-info${g.status === "LIVE" ? " live" : ""}`}>
                {g.status === "LIVE" && <i className="ldot" />}
                {g.info}
              </span>
            </Link>
          ))}
        </div>
      )}
      <Link to="scores" className="panel-link">All scores <ChevronRight size={12} /></Link>
    </div>
  );
}

function PicksTeaser() {
  const free = PICKS.filter((p) => !p.members).slice(0, 2);
  return (
    <div className="panel">
      <h3 className="panel-title hl">Our picks</h3>
      {free.length === 0 ? (
        <p className="empty-note">New picks are posted before game day.</p>
      ) : (
        <div className="stack">
          {free.map((p) => (
            <div key={p.id} className="mini-pick">
              <TeamBadge team={p.team} />
              <b>{p.pick}</b>
              <span className="muted tiny">{p.odds}</span>
            </div>
          ))}
        </div>
      )}
      <Link to="picks" className="panel-link">All picks <ChevronRight size={12} /></Link>
    </div>
  );
}

function MemberCard() {
  return (
    <div className="panel promo promo-member">
      <h3 className="hl promo-title">Become a member</h3>
      <p>Full picks with write-ups, member-only Discord channels, early access to episodes and a promo code for a free hat.</p>
      <Link to="membership" className="btn btn-primary">See membership</Link>
    </div>
  );
}

function DiscordCard() {
  const url = SITE.links.discord;
  return (
    <div className="panel promo promo-discord">
      <h3 className="hl promo-title">Join the Discord</h3>
      <p>Game threads, hot takes and a direct line to the hosts.</p>
      {url ? (
        <ExtLink href={url} className="btn btn-blue">Join the server <ExternalLink size={13} /></ExtLink>
      ) : (
        <Link to="discord" className="btn btn-blue">See the channels</Link>
      )}
    </div>
  );
}

export function Sidebar() {
  return (
    <aside className="sidebar" aria-label="Sidebar">
      <ScoresMini />
      <PicksTeaser />
      <MemberCard />
      <DiscordCard />
    </aside>
  );
}

// ── Footer ───────────────────────────────────────────────────────────────────
const YEAR = new Date().getFullYear();

export function Footer() {
  const { links } = SITE;
  const social = [
    ["YouTube", links.youtube],
    ["Spotify", links.spotify],
    ["Apple Podcasts", links.apple],
    ["Instagram", links.instagram],
    ["X", links.x],
    ["Discord", links.discord],
  ].filter(([, url]) => url);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="brand footer-brand">
              <img className="brand-mark" src="/logo.jpg" alt="" width="46" height="46" />
              <span className="brand-name hl">Great Lakes <b>Sports</b> Podcast</span>
            </div>
            <p className="footer-blurb">
              Detroit and Michigan sports analysis, picks and arguments. New articles every week.
            </p>
          </div>
          <div>
            <p className="footer-head">Explore</p>
            {NAV.slice(1).map(([to, label]) => (
              <Link key={to} to={to} className="footer-link">{label}</Link>
            ))}
          </div>
          <div>
            <p className="footer-head">Teams</p>
            {CATEGORIES.slice(1).map((c) => (
              <Link key={c.id} to={`articles/${c.id}`} className="footer-link">{c.label}</Link>
            ))}
          </div>
          {social.length > 0 && (
            <div>
              <p className="footer-head">Follow</p>
              {social.map(([label, url]) => (
                <ExtLink key={label} href={url} className="footer-link">{label}</ExtLink>
              ))}
            </div>
          )}
        </div>
        <p className="footer-legal">
          Picks and odds are for entertainment only. Must be 21+. If gambling is a problem, call 1-800-GAMBLER.
        </p>
        <div className="footer-bottom">
          <span>© {YEAR} {SITE.name}</span>
        </div>
      </div>
    </footer>
  );
}
