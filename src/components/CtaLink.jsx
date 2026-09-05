import { Link } from "react-router-dom";
import { trackCtaClick } from "../analytics/events";

/**
 * The one way a call-to-action is rendered on the marketing site.
 *
 * Two problems this exists to stop repeating:
 *  1. CTAs used to point at three different places (/contact, /book-demo, and
 *     a raw Calendly URL), so demo intent leaked into a page with no form.
 *     `DEMO_PATH` is now the single destination for primary CTAs.
 *  2. Every CTA needs to fire a GA4 event. Doing that inline at each call site
 *     is how tracking silently rots — one component gets copied without the
 *     handler and the funnel quietly under-reports.
 *
 * Renders a react-router <Link> for internal paths and a plain <a> for
 * external URLs (router Links do not work for cross-origin hrefs).
 */

/** Single destination for every primary "talk to us" action. */
export const DEMO_PATH = "/book-demo";

const VARIANTS = {
  primary:
    "bg-brand-green hover:bg-brand-green-hover text-white shadow-lg shadow-green-600/20 hover:-translate-y-[2px]",
  secondary:
    "border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300",
  "on-dark":
    "border border-white/20 text-white hover:bg-white/10",
  "primary-gradient":
    "bg-gradient-to-r from-brand-green-mid to-brand-green-light text-white shadow-[0_10px_30px_rgba(34,197,94,0.35)] hover:scale-[1.03]",
};

const SIZES = {
  md: "px-6 py-3 text-sm md:text-base",
  lg: "px-6 md:px-9 py-3 md:py-4 text-sm md:text-base",
};

export default function CtaLink({
  to = DEMO_PATH,
  location,
  label,
  variant = "primary",
  size = "lg",
  className = "",
  children,
  onClick,
}) {
  const isExternal = /^https?:\/\//i.test(to);
  const text = label ?? (typeof children === "string" ? children : "");

  const handleClick = (event) => {
    trackCtaClick(location, text, to);
    onClick?.(event);
  };

  const classes = [
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold",
    "transition-all duration-300",
    SIZES[size] ?? SIZES.lg,
    VARIANTS[variant] ?? VARIANTS.primary,
    className,
  ].join(" ");

  if (isExternal) {
    return (
      <a
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        onClick={handleClick}
      >
        {children}
      </a>
    );
  }

  // In-page anchors (#workflows) are hrefs, not routes — a router Link would
  // push a history entry for "/#workflows" and lose the scroll behaviour.
  if (to.startsWith("#")) {
    return (
      <a href={to} className={classes} onClick={handleClick}>
        {children}
      </a>
    );
  }

  return (
    <Link to={to} className={classes} onClick={handleClick}>
      {children}
    </Link>
  );
}
