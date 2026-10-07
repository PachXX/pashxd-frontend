import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
// react-router v7 collapsed the old `react-router-dom/server` entry point;
// StaticRouter is exported from `react-router` itself now. Importing it from
// the v6 path fails the SSR build outright rather than at runtime, which is
// the good outcome — but the working import is this one.
import { StaticRouter } from "react-router";
import { HelmetProvider } from "react-helmet-async";

import { AppRoutes } from "./App";

// Pages
import Landing from "./pages/Landing";
import PlatformPage from "./pages/PlatformPage";
import ProductPage from "./pages/ProductPage";
import PricingPage from "./pages/PricingPage";
import IndustriesPage from "./pages/IndustriesPage";
import AboutPage from "./pages/AboutPage";
import ResourcesPage from "./pages/ResourcesPage";
import ContactPage from "./pages/ContactPage";
import BookDemoPage from "./pages/BookDemoPage";
import LoginPage from "./pages/LoginPage";
import MarketplacePage from "./pages/MarketplacePage";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import AdminLeadsPage from "./pages/AdminLeadsPage";
import BlogPostPage from './pages/BlogPostPage';


const pages = { Landing, PlatformPage, ProductPage, PricingPage, IndustriesPage, AboutPage, ResourcesPage, ContactPage, BookDemoPage, LoginPage, MarketplacePage, Terms, Privacy, AdminLeadsPage, BlogPostPage };
import { SsrDataProvider } from "./context/SsrDataContext.jsx";

/** Render static marketing pages and request-time blog pages with matching hydration data. */
export function render(url, ssrData) {
  const helmetContext = {};

  const html = renderToString(
    <StrictMode>
      <HelmetProvider context={helmetContext}>
        <SsrDataProvider value={ssrData}>

            <StaticRouter location={url}>
              <AppRoutes pages={pages} />
            </StaticRouter>

        </SsrDataProvider>
      </HelmetProvider>
    </StrictMode>
  );

  const { helmet } = helmetContext;

  // Helmet's toString() output is already escaped markup. Order matters only
  // for readability; crawlers read the first matching tag, and index.html
  // deliberately ships no competing description/og tags.
  const head = helmet
    ? [
        helmet.title.toString(),
        helmet.meta.toString(),
        helmet.link.toString(),
        helmet.script.toString(),
      ]
        .filter(Boolean)
        .join("\n    ")
    : "";

  return { html, head };
}
