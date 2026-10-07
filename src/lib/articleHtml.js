// Preserve literal HTML in code samples and styles when demoting duplicate article titles.
export function demoteArticleH1s(html) {
  if (!html) return html;
  return html.split(/(<(?:pre|style|script)[\s>][\s\S]*?<\/(?:pre|style|script)>)/gi)
    .map((part, index) => index % 2 ? part : part.replace(/<h1([\s>])/gi, '<h2$1').replace(/<\/h1>/gi, '</h2>'))
    .join('');
}
