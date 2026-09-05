/**
 * Conversion events.
 *
 * googleAnalytics.js exported a generic `logEvent` that nothing ever called,
 * so the only signal the site produced was pageviews — no way to tell whether
 * a copy or layout change moved demo requests. This module is the named,
 * closed set of events the marketing site is allowed to fire, so the GA4
 * property gets a stable vocabulary instead of ad-hoc strings typed at each
 * call site.
 *
 * Every helper is safe to call before consent: gtag queues into dataLayer and
 * Consent Mode v2 (defaults set in index.html) decides what actually leaves
 * the browser.
 */

/** Event names. Keep in sync with the GA4 custom-event registrations. */
export const EVENT = {
  CTA_CLICK: "cta_click",
  DEMO_FORM_SUBMIT: "demo_form_submit",
  DEMO_FORM_ERROR: "demo_form_error",
  CALENDLY_OPEN: "calendly_open",
  ROI_CALCULATED: "roi_calculated",
  FAQ_OPEN: "faq_open",
};

/**
 * Low-level send. Never throws: analytics must not be able to break a click
 * handler that also has to navigate.
 */
function send(name, params = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  try {
    window.gtag("event", name, params);
  } catch {
    // Swallow — a blocked/broken tag is not a user-facing failure.
  }
}

/**
 * A call-to-action was clicked.
 *
 * @param {string} location - where on the site, e.g. "hero", "navbar", "final_cta".
 * @param {string} label    - the button's visible text.
 * @param {string} destination - route or URL the click leads to.
 */
export function trackCtaClick(location, label, destination) {
  send(EVENT.CTA_CLICK, {
    cta_location: location,
    cta_label: label,
    cta_destination: destination,
  });
}

/** The /book-demo form was submitted successfully. `value` lets GA treat it as a conversion. */
export function trackDemoSubmit(source = "book_demo_page") {
  send(EVENT.DEMO_FORM_SUBMIT, { form_source: source, value: 1 });
}

/** The /book-demo form failed. Reason is a short code, never the raw server body. */
export function trackDemoError(reason) {
  send(EVENT.DEMO_FORM_ERROR, { error_reason: String(reason).slice(0, 100) });
}

/** The Calendly scheduler was opened (embed rendered or external link clicked). */
export function trackCalendlyOpen(location) {
  send(EVENT.CALENDLY_OPEN, { cta_location: location });
}

/** The ROI calculator produced a figure — a strong intent signal. */
export function trackRoiCalculated({ orders, suppliers, annualSaving }) {
  send(EVENT.ROI_CALCULATED, {
    orders_per_month: orders,
    supplier_count: suppliers,
    annual_saving: annualSaving,
  });
}

/** An FAQ item was expanded — tells us which objection is live. */
export function trackFaqOpen(question) {
  send(EVENT.FAQ_OPEN, { faq_question: question.slice(0, 100) });
}
