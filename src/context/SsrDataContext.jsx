import { SsrDataContext } from "./SsrDataContext-shared.js";

/** Server-only data passed to pages; the document embeds the same data for hydration. */
export function SsrDataProvider({ value, children }) {
  return <SsrDataContext.Provider value={value || null}>{children}</SsrDataContext.Provider>;
}
