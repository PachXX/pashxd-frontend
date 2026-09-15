// Google Analytics setup
export const GA_MEASUREMENT_ID = 'G-310NXQ8H2H';

// Initialize GA
export const initGA = () => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, { send_page_view: false });
  }
};

// Track each route once, including React StrictMode's repeated mount effect.
let lastPagePath;
export const logPageView = (url) => {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function' || lastPagePath === url) return;
  try {
    window.gtag('event', 'page_view', {
      page_path: url,
      page_location: window.location.origin + url,
      send_to: GA_MEASUREMENT_ID,
    });
    lastPagePath = url;
  } catch {
    // Tracking must not stop navigation when an extension blocks the tag.
  }
};

// Track custom events
export const logEvent = (action, category, label, value) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Update Consent Mode v2 signals after user decision (accept=true / decline=false)
export const updateConsent = (granted) => {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  const state = granted ? 'granted' : 'denied';
  window.gtag('consent', 'update', {
    analytics_storage:      state,
    ad_storage:             state,
    ad_user_data:           state,
    ad_personalization:     state,
  });
};
