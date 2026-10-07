const KEY = 'pashxd_cookie_consent';
export function readConsent() {
  try { return window.localStorage.getItem(KEY); } catch { return null; }
}
export function saveConsent(value) {
  try { window.localStorage.setItem(KEY, value); } catch { /* Keep the choice for this visit when storage is unavailable. */ }
}
