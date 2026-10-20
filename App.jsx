import { useCallback, useEffect, useMemo, useState } from "react";
import { AppCtx, useLocalStorage, useRoute, useScoresData } from "./hooks.js";
import { ARTICLES, SITE } from "./data.js";
import { Header, ScoreTicker, Footer, SearchOverlay } from "./components.jsx";
import {
  Home, ArticlesPage, ArticlePage, SavedPage, ClipsPage, PicksPage, ScoresPage,
  MerchPage, MembershipPage, DiscordPage, NotFound,
} from "./pages.jsx";

const PAGE_TITLES = {
  articles: "Articles",
  saved: "Saved articles",
  clips: "Clips",
  picks: "Picks",
  scores: "Scores",
  merch: "Merch",
  membership: "Membership",
  discord: "Discord",
};

export default function App() {
  const parts = useRoute();
  const [section, arg] = parts;

  const [dark, setDark] = useLocalStorage("gls_dark", true);
  const [saved, setSaved] = useLocalStorage("gls_saved", []);
  const scores = useScoresData();
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleSaved = useCallback(
    (id) => setSaved((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])),
    [setSaved]
  );
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  const ctx = useMemo(
    () => ({ dark, setDark, saved, toggleSaved, scores }),
    [dark, setDark, saved, toggleSaved, scores]
  );

  const route = parts.join("/");
  const article = section === "article" ? ARTICLES.find((a) => a.id === arg) : null;

  // New page = start at the top.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [route]);

  useEffect(() => {
    const page = article ? article.title : PAGE_TITLES[section];
    document.title = page ? `${page} | ${SITE.name}` : SITE.name;
  }, [section, article]);

  let page;
  switch (section) {
    case undefined:
      page = <Home />;
      break;
    case "articles":
      page = <ArticlesPage team={arg} />;
      break;
    case "article":
      page = <ArticlePage key={arg} article={article} />;
      break;
    case "saved":
      page = <SavedPage />;
      break;
    case "clips":
      page = <ClipsPage />;
      break;
    case "picks":
      page = <PicksPage />;
      break;
    case "scores":
      page = <ScoresPage />;
      break;
    case "merch":
      page = <MerchPage />;
      break;
    case "membership":
      page = <MembershipPage />;
      break;
    case "discord":
      page = <DiscordPage />;
      break;
    default:
      page = <NotFound />;
  }

  // Header highlights "Articles" while you're reading one.
  const navSection = section === "article" ? "articles" : (section ?? "");

  return (
    <AppCtx.Provider value={ctx}>
      <div className={`app ${dark ? "dark" : "light"}`}>
        <Header section={navSection} onSearch={() => setSearchOpen(true)} />
        <ScoreTicker />
        <main>{page}</main>
        <Footer />
        {searchOpen && <SearchOverlay onClose={closeSearch} />}
      </div>
    </AppCtx.Provider>
  );
}
