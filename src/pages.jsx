import { useState } from "react";
import {
  Mic, Play, RefreshCw, Send, Lock, ExternalLink, CheckCircle, Bookmark, BookmarkCheck, Link2, ArrowLeft, User,
} from "lucide-react";
import {
  SITE, TEAMS, ARTICLES, CLIPS, PICKS, PLANS, MERCH, CHANNELS, CATEGORIES,
} from "./data.js";
import { useApp, useLocalStorage, formatDate, timeAgo, copyText, articleUrl } from "./hooks.js";
import {
  Link, ExtLink, TeamArt, ProductArt, TeamBadge, ArticleCard, ClipCard, ClipModal,
  GameCard, SectionHead, TeamPills, Sidebar,
} from "./components.jsx";

function PageHead({ title, sub, children }) {
  return (
    <div className="page-head">
      <div>
        <h1 className="hl page-title">{title}</h1>
        {sub && <p className="page-sub">{sub}</p>}
      </div>
      {children}
    </div>
  );
}

function Empty({ title, children }) {
  return (
    <div className="empty">
      <p className="empty-title">{title}</p>
      {children}
    </div>
  );
}

export function NotFound() {
  return (
    <div className="container page">
      <Empty title="We couldn't find that page.">
        <Link to="" className="btn btn-primary">Back to the home page</Link>
      </Empty>
    </div>
  );
}

// ── Home ─────────────────────────────────────────────────────────────────────
const hideBroken = (e) => {
  e.currentTarget.style.display = "none";
};

export function Home() {
  const [clip, setClip] = useState(null);
  const { links } = SITE;
  const listen = [
    ["YouTube", links.youtube],
    ["Spotify", links.spotify],
    ["Apple Podcasts", links.apple],
  ].filter(([, url]) => url);

  return (
    <div className="container page">
      <section className="hero">
        <div className="hero-logos" aria-hidden="true">
          <img src={TEAMS.lions.logo} alt="" onError={hideBroken} />
          <img src={TEAMS.tigers.logo} alt="" onError={hideBroken} />
        </div>
        <div className="hero-inner">
          <span className="hero-kicker"><Mic size={13} /> Detroit and Michigan sports</span>
          <h1 className="hl hero-title">The Great Lakes<br />Sports Podcast</h1>
          <p className="hero-sub">{SITE.tagline}</p>
          <div className="hero-cta">
            <Link to="clips" className="btn btn-primary"><Play size={14} /> Watch clips</Link>
            {listen.map(([label, url]) => (
              <ExtLink key={label} href={url} className="btn btn-glass">
                {label} <ExternalLink size={12} />
              </ExtLink>
            ))}
            <Link to="articles" className="btn btn-glass">Read articles</Link>
          </div>
        </div>
      </section>

      <TeamPills active="" />

      <div className="grid-main">
        <div className="main-col">
          <SectionHead title="Latest clips" to="clips" />
          <div className="cards">
            {CLIPS.slice(0, 3).map((c) => <ClipCard key={c.id} clip={c} onOpen={setClip} />)}
          </div>

          <div className="gap" />
          <SectionHead title="Latest articles" to="articles" />
          <div className="cards">
            {ARTICLES.slice(0, 6).map((a) => <ArticleCard key={a.id} article={a} />)}
          </div>
        </div>
        <Sidebar />
      </div>
      <ClipModal clip={clip} onClose={() => setClip(null)} />
    </div>
  );
}

// ── Articles ─────────────────────────────────────────────────────────────────
export function ArticlesPage({ team }) {
  const active = CATEGORIES.some((c) => c.id === team) ? team : "all";
  const list = active === "all" ? ARTICLES : ARTICLES.filter((a) => TEAMS[a.team]?.category === active);
  const label = CATEGORIES.find((c) => c.id === active)?.label;

  return (
    <div className="container page">
      <PageHead
        title="Articles"
        sub={active === "all" ? "New pieces on the Lions, Tigers, Pistons, Red Wings and college teams each week." : `${label} coverage`}
      />
      <TeamPills active={active} />
      {list.length === 0 ? (
        <Empty title={`No ${label} articles yet.`}>
          <Link to="articles" className="btn btn-ghost">See all articles</Link>
        </Empty>
      ) : (
        <div className="cards">{list.map((a) => <ArticleCard key={a.id} article={a} />)}</div>
      )}
    </div>
  );
}

// ── Single article ───────────────────────────────────────────────────────────
function Comments({ articleId }) {
  const [comments, setComments] = useLocalStorage(`gls_comments_${articleId}`, []);
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    const ts = Date.now();
    setComments((prev) => [{ id: ts, name: name.trim(), text: text.trim(), ts }, ...prev]);
    setText("");
  };

  return (
    <section className="comments">
      <h3 className="hl comments-title">Comments ({comments.length})</h3>
      <p className="muted tiny">Comments are saved on this device only until a comment service is connected.</p>
      <form className="comment-form" onSubmit={submit}>
        <input value={name} maxLength={40} onChange={(e) => setName(e.target.value)} placeholder="Your name" aria-label="Your name" />
        <input value={text} maxLength={500} onChange={(e) => setText(e.target.value)} placeholder="Share your take" aria-label="Your comment" />
        <button type="submit" className="btn btn-primary"><Send size={13} /> Post</button>
      </form>
      <div className="stack">
        {comments.map((c) => (
          <div key={c.id} className="comment">
            <span className="avatar">{c.name.slice(0, 2).toUpperCase()}</span>
            <div>
              <p><b>{c.name}</b> <span className="muted tiny">{timeAgo(c.ts)}</span></p>
              <p className="comment-text">{c.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Article bodies are an array of strings. A string starting with "## " becomes a
// heading, consecutive strings starting with "- " become a bullet list, and
// anything else is a normal paragraph.
function ArticleBody({ body }) {
  const blocks = [];
  let list = null;
  body.forEach((line, i) => {
    if (line.startsWith("- ")) {
      if (!list) {
        list = [];
        blocks.push({ type: "ul", items: list, key: i });
      }
      list.push(line.slice(2));
      return;
    }
    list = null;
    blocks.push(
      line.startsWith("## ")
        ? { type: "h2", text: line.slice(3), key: i }
        : { type: "p", text: line, key: i }
    );
  });
  return blocks.map((b) => {
    if (b.type === "ul") return <ul key={b.key}>{b.items.map((t, j) => <li key={j}>{t}</li>)}</ul>;
    if (b.type === "h2") return <h2 key={b.key}>{b.text}</h2>;
    return <p key={b.key}>{b.text}</p>;
  });
}

export function ArticlePage({ article }) {
  const [shareLabel, setShareLabel] = useState("Share");
  const { saved, toggleSaved } = useApp();
  if (!article) return <NotFound />;

  const isSaved = saved.includes(article.id);
  const related = ARTICLES.filter((a) => a.id !== article.id)
    .sort((a, b) => Number(b.team === article.team) - Number(a.team === article.team))
    .slice(0, 3);

  const share = async () => {
    const ok = await copyText(articleUrl(article.id));
    setShareLabel(ok ? "Link copied" : "Copy failed");
    setTimeout(() => setShareLabel("Share"), 2000);
  };

  return (
    <div className="container page">
      <article className="article">
        <Link to="articles" className="back"><ArrowLeft size={14} /> All articles</Link>
        <div className="art-box wide">
          <TeamArt team={article.team} src={article.image} alt={article.title} />
        </div>
        <div className="article-tags"><TeamBadge team={article.team} /></div>
        <h1 className="hl article-title">{article.title}</h1>
        <div className="byline">
          <span className="avatar"><User size={14} /></span>
          <div>
            <b>{article.author}</b>
            <div className="muted tiny">{formatDate(article.date)}, {article.readTime} read</div>
          </div>
          <div className="byline-actions">
            <button type="button" className="btn btn-ghost" aria-pressed={isSaved} onClick={() => toggleSaved(article.id)}>
              {isSaved ? <BookmarkCheck size={13} /> : <Bookmark size={13} />} {isSaved ? "Saved" : "Save"}
            </button>
            <button type="button" className="btn btn-ghost" onClick={share}><Link2 size={13} /> {shareLabel}</button>
          </div>
        </div>
        <div className="prose">
          <ArticleBody body={article.body} />
        </div>
        <div className="tag-row">
          {(article.tags ?? []).map((t) => <span key={t} className="tag">#{t}</span>)}
        </div>
        {SITE.comments && <Comments key={article.id} articleId={article.id} />}
      </article>

      {related.length > 0 && (
        <div className="related">
          <SectionHead title="More stories" />
          <div className="cards">{related.map((a) => <ArticleCard key={a.id} article={a} />)}</div>
        </div>
      )}
    </div>
  );
}

// ── Saved ────────────────────────────────────────────────────────────────────
export function SavedPage() {
  const { saved } = useApp();
  const list = saved.map((id) => ARTICLES.find((a) => a.id === id)).filter(Boolean);
  return (
    <div className="container page">
      <PageHead title="Saved articles" sub="Saved in this browser, so they're here next time you visit." />
      {list.length === 0 ? (
        <Empty title="You haven't saved anything yet.">
          <p className="muted">Tap the bookmark on any article to keep it here.</p>
          <Link to="articles" className="btn btn-primary">Browse articles</Link>
        </Empty>
      ) : (
        <div className="cards">{list.map((a) => <ArticleCard key={a.id} article={a} />)}</div>
      )}
    </div>
  );
}

// ── Clips ────────────────────────────────────────────────────────────────────
export function ClipsPage() {
  const [clip, setClip] = useState(null);
  const [team, setTeam] = useState("all");
  const list = team === "all" ? CLIPS : CLIPS.filter((c) => TEAMS[c.team]?.category === team);

  return (
    <div className="container page">
      <PageHead title="Podcast clips" sub="The best moments from each episode." />
      <div className="pills">
        {CATEGORIES.map((c) => (
          <button key={c.id} type="button" className={`pill${team === c.id ? " active" : ""}`} onClick={() => setTeam(c.id)}>
            {c.label}
          </button>
        ))}
      </div>
      {list.length === 0 ? (
        <Empty title="No clips for that team yet." />
      ) : (
        <div className="cards">{list.map((c) => <ClipCard key={c.id} clip={c} onOpen={setClip} />)}</div>
      )}
      <ClipModal clip={clip} onClose={() => setClip(null)} />
    </div>
  );
}

// ── Picks ────────────────────────────────────────────────────────────────────
const STATUS_LABEL = { pending: "Pending", win: "Win", loss: "Loss", push: "Push" };

function profit(p) {
  if (p.status === "loss") return -p.units;
  if (p.status !== "win") return 0;
  const o = parseInt(p.odds, 10);
  if (!o) return 0;
  return o > 0 ? (p.units * o) / 100 : (p.units * 100) / Math.abs(o);
}

function PickCard({ p }) {
  return (
    <div className="card pick">
      <div className="pick-head">
        <TeamBadge team={p.team} />
        <span className="muted tiny">{formatDate(`${p.date}T12:00:00`)}</span>
        <span className={`status ${p.status}`}>{STATUS_LABEL[p.status]}</span>
      </div>
      <p className="pick-game">{p.game}</p>
      {p.members ? (
        <div className="pick-locked">
          <Lock size={16} />
          <span>Members only</span>
          <Link to="membership" className="btn btn-primary btn-sm">Unlock</Link>
        </div>
      ) : (
        <>
          <p className="pick-line hl">{p.pick} <span>{p.odds}</span></p>
          {p.note && <p className="muted">{p.note}</p>}
        </>
      )}
      <div className="pick-foot">
        <span>{p.units} {p.units === 1 ? "unit" : "units"}</span>
        <span>{p.confidence}</span>
      </div>
    </div>
  );
}

export function PicksPage() {
  const graded = PICKS.filter((p) => ["win", "loss", "push"].includes(p.status));
  const wins = graded.filter((p) => p.status === "win").length;
  const losses = graded.filter((p) => p.status === "loss").length;
  const pushes = graded.filter((p) => p.status === "push").length;
  const units = graded.reduce((sum, p) => sum + profit(p), 0);

  return (
    <div className="container page">
      <PageHead title="Our picks" sub="What we like this week and why. Free picks are public; the full card is for members." />
      <div className="record">
        <div><span className="hl record-num">{wins}-{losses}-{pushes}</span><span className="muted tiny">Record</span></div>
        <div><span className="hl record-num">{units >= 0 ? "+" : ""}{units.toFixed(1)}u</span><span className="muted tiny">Units</span></div>
        <div><span className="hl record-num">{PICKS.filter((p) => p.status === "pending").length}</span><span className="muted tiny">Pending</span></div>
      </div>
      <p className="notice">Entertainment only. Must be 21+. If gambling is a problem, call 1-800-GAMBLER.</p>
      {PICKS.length === 0 ? (
        <Empty title="No picks posted yet." />
      ) : (
        <div className="cards cards-wide">{PICKS.map((p) => <PickCard key={p.id} p={p} />)}</div>
      )}
    </div>
  );
}

// ── Scores ───────────────────────────────────────────────────────────────────
const SPORTS = ["All", "NFL", "MLB", "NBA", "NHL", "CFB", "CBB"];

function GameSection({ title, games }) {
  if (games.length === 0) return null;
  return (
    <div className="game-section">
      <SectionHead title={title} />
      <div className="cards cards-game">{games.map((g) => <GameCard key={g.id} g={g} />)}</div>
    </div>
  );
}

export function ScoresPage() {
  const { scores } = useApp();
  const { games, loading, error, updated, refresh } = scores;
  const [sport, setSport] = useState("All");
  const shown = games.filter((g) => sport === "All" || g.sport === sport);

  return (
    <div className="container page">
      <PageHead
        title="Live scores"
        sub={updated ? `Updated ${updated.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}. Refreshes every minute.` : "Loading..."}
      >
        <button type="button" className="btn btn-ghost" onClick={refresh}><RefreshCw size={13} /> Refresh</button>
      </PageHead>
      <div className="pills">
        {SPORTS.map((s) => (
          <button key={s} type="button" className={`pill${sport === s ? " active" : ""}`} onClick={() => setSport(s)}>{s}</button>
        ))}
      </div>
      {loading ? (
        <div className="cards cards-game">{[1, 2, 3].map((i) => <div key={i} className="sk" style={{ height: 170 }} />)}</div>
      ) : error ? (
        <Empty title="Live scores are unavailable right now.">
          <p className="muted">The score feed didn't respond. Try again in a minute.</p>
          <button type="button" className="btn btn-primary" onClick={refresh}>Try again</button>
        </Empty>
      ) : shown.length === 0 ? (
        <Empty title="No Michigan games in this window.">
          <p className="muted">We show games from yesterday through the next week.</p>
        </Empty>
      ) : (
        <>
          <GameSection title="Live now" games={shown.filter((g) => g.status === "LIVE")} />
          <GameSection title="Upcoming" games={shown.filter((g) => g.status === "UPCOMING")} />
          <GameSection title="Final" games={shown.filter((g) => g.status === "FINAL")} />
        </>
      )}
    </div>
  );
}

// ── Merch ────────────────────────────────────────────────────────────────────
const MERCH_CATS = ["All", "Apparel", "Headwear", "Accessories"];

export function MerchPage() {
  const [cat, setCat] = useState("All");
  const list = cat === "All" ? MERCH : MERCH.filter((m) => m.category === cat);

  return (
    <div className="container page">
      <PageHead title="Merch" sub="Wear the podcast. Orders are handled by our store." />
      {!SITE.links.shop && <p className="notice">The store is opening soon. Prices below are placeholders.</p>}
      <div className="pills">
        {MERCH_CATS.map((c) => (
          <button key={c} type="button" className={`pill${cat === c ? " active" : ""}`} onClick={() => setCat(c)}>{c}</button>
        ))}
      </div>
      <div className="cards cards-merch">
        {list.map((item) => {
          const url = item.url || SITE.links.shop;
          return (
            <div key={item.id} className="card hover product">
              <div className="art-box square">
                <ProductArt item={item} />
                {item.badge && <span className="badge badge-brand product-badge">{item.badge}</span>}
              </div>
              <div className="card-body">
                <span className="muted tiny">{item.category}</span>
                <h3 className="card-title">{item.name}</h3>
                <div className="product-foot">
                  <span className="hl price">${item.price.toFixed(2)}</span>
                  {url ? (
                    <ExtLink href={url} className="btn btn-primary btn-sm">Buy <ExternalLink size={11} /></ExtLink>
                  ) : (
                    <span className="btn btn-ghost btn-sm disabled">Coming soon</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Membership ───────────────────────────────────────────────────────────────
export function MembershipPage() {
  const url = SITE.links.membership;
  return (
    <div className="container page">
      <PageHead title="Membership" sub="Support the show and get more of it." />
      <div className="plans">
        {PLANS.map((p) => (
          <div key={p.id} className={`card plan${p.highlight ? " highlight" : ""}`}>
            {p.highlight && <span className="badge badge-brand plan-badge">Best value</span>}
            <h2 className="hl plan-name">{p.name}</h2>
            <p className="plan-price"><span className="hl">{p.price}</span> <span className="muted">{p.period}</span></p>
            <ul className="plan-list">
              {p.features.map((f) => (
                <li key={f}><CheckCircle size={14} /> {f}</li>
              ))}
            </ul>
            {p.id === "free" ? (
              <Link to="articles" className="btn btn-ghost">Start reading</Link>
            ) : url ? (
              <ExtLink href={url} className="btn btn-primary">Become a member <ExternalLink size={13} /></ExtLink>
            ) : (
              <span className="btn btn-primary disabled">Opening soon</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Discord ──────────────────────────────────────────────────────────────────
export function DiscordPage() {
  const url = SITE.links.discord;
  return (
    <div className="container page">
      <div className="discord-hero">
        <h1 className="hl page-title">Join the Discord</h1>
        <p>Game threads, hot takes and a direct line to the hosts. Pick a channel and jump in.</p>
        {url ? (
          <ExtLink href={url} className="btn btn-blue">Join the server <ExternalLink size={13} /></ExtLink>
        ) : (
          <span className="btn btn-blue disabled">Invite link coming soon</span>
        )}
      </div>
      <div className="panel channels">
        {CHANNELS.map((c) => (
          <div key={c.name} className="channel">
            <span className="channel-hash">#</span>
            <div>
              <b>{c.name}</b>
              <p className="muted">{c.desc}</p>
            </div>
            {c.members && <span className="badge badge-brand"><Lock size={10} /> Members</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
