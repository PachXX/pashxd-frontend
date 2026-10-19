import { useEffect, useRef, useState } from "react";
import Container from "../layout/Container";
import { trackVideoPlay } from "../../analytics/events";

/**
 * One-minute product walkthrough, placed directly under the hero.
 *
 * Performance rules this component exists to keep:
 *  - Nothing video-related touches the network on initial page load. The
 *    poster and the video's metadata are only requested once the section is
 *    within ~300px of the viewport; the video body only on press-play.
 *  - Phones and Data Saver users get a 540p file (about 2MB) instead of the
 *    1080p one (about 8MB). Chrome ignores `media` on <source> inside <video>,
 *    so the choice is made here, before anything is fetched.
 *  - Both files have their index at the front (faststart), so playback begins
 *    as soon as the first bytes arrive instead of after a full download.
 *
 * No autoplay: it carries burned-in captions, but nobody should be surprised
 * by sound. Everything in the video is demo data (it says so on screen), so
 * the copy makes no claim about customers, volumes, or time saved.
 */

const FULL = "/pxd-tour.mp4";
const LIGHT = "/pxd-tour-mobile.mp4";
const POSTER = "/pxd-tour-poster.jpg";

const CHAPTERS = [
  ["RFQs out in minutes.", "Build an RFQ once and send it to every qualified vendor."],
  ["Compare every quote.", "Quotes compared on price, delivery and terms."],
  ["Know every vendor.", "Every vendor's ID, CR and VAT record, linked to every order."],
  ["Documents you can trust.", "Documents registered, linked to their case and reviewed."],
  ["Approved. Logged. Auditable.", "Approvals audited. No one approves their own request."],
  ["One case. Every step.", "One case, from RFQ to invoice, every step in view."],
];

function prefersLightVideo() {
  if (typeof window === "undefined") return false;
  const saveData = navigator.connection && navigator.connection.saveData;
  return Boolean(saveData) || window.matchMedia("(max-width: 767px)").matches;
}

export default function ProductTour() {
  const sectionRef = useRef(null);
  const tracked = useRef(false);
  const [near, setNear] = useState(false);
  const [src, setSrc] = useState(FULL);

  useEffect(() => {
    if (prefersLightVideo()) setSrc(LIGHT);
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setNear(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onPlay = () => {
    if (tracked.current) return;
    tracked.current = true;
    trackVideoPlay("pxd_product_tour");
  };

  // If the light file ever fails to load, fall back to the full one rather
  // than leave a dead player.
  const onError = () => {
    if (src !== FULL) setSrc(FULL);
  };

  return (
    <section ref={sectionRef} className="bg-white py-14 md:py-20" aria-labelledby="product-tour-heading">
      <Container>
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <p className="os-section-label">Product tour</p>
          <h2 id="product-tour-heading" className="sr-only">See PxD in one minute</h2>
          <p className="text-base text-slate-500 md:text-lg">
            One procurement case, from RFQ to invoice. Shown with demo data.
          </p>
        </div>

        <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-xl shadow-slate-900/5">
          <video
            key={src}
            className="block aspect-video w-full"
            src={src}
            controls
            playsInline
            preload={near ? "metadata" : "none"}
            poster={near ? POSTER : undefined}
            onPlay={onPlay}
            onError={onError}
            aria-label="PxD product tour: RFQ, sourcing, vendors, documents, approval and case workflow"
          >
            Your browser can't play this video. The workflow it shows is summarised below.
          </video>
        </div>

        <ol className="mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
          {CHAPTERS.map(([title, desc], i) => (
            <li key={title} className="flex gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-50 text-xs font-semibold text-green-700">
                {i + 1}
              </span>
              <div>
                <h3 className="text-[15px] font-semibold text-brand-navy">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-500">{desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
