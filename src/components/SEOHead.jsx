import { Helmet } from "react-helmet-async";

const BASE_URL = "https://pashx.com";
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`;

/**
 * SEOHead — per-page <head> metadata via react-helmet-async.
 * Usage: <SEOHead title="..." description="..." path="/about" />
 */
export default function SEOHead({
  title,
  description,
  path = "",
  image = DEFAULT_IMAGE,
  type = "website",
  noIndex = false,
  publishedTime,
  modifiedTime,
  author,
  jsonLd,
}) {
  const canonicalUrl = `${BASE_URL}${path}`;

  return (
    <Helmet>
      {/* Primary */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="PashxD" />
      {type === "article" && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === "article" && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === "article" && author && (
        <meta property="article:author" content={author} />
      )}

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Structured data (JSON-LD) — e.g. BlogPosting schema for blog posts */}
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}
