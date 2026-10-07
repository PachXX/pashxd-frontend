import test from 'node:test';
import assert from 'node:assert/strict';
import { demoteArticleH1s } from '../src/lib/articleHtml.js';
import { readConsent, saveConsent } from '../src/lib/consentStorage.js';
import { updateConsent, logEvent } from '../src/analytics/googleAnalytics.js';

test('CMS heading normalization preserves code samples, scripts and styles', () => {
  const html = '<h1 class="title">Title</h1><pre><h1>Literal code</h1></pre><style>h1{color:red}</style><H1>Section</H1>';
  assert.equal(demoteArticleH1s(html), '<h2 class="title">Title</h2><pre><h1>Literal code</h1></pre><style>h1{color:red}</style><h2>Section</h2>');
  assert.equal(demoteArticleH1s(null), null);
});

test('analytics consent never enables advertising signals', () => {
  const calls = [];
  globalThis.window = { gtag: (...args) => calls.push(args) };
  updateConsent(true); updateConsent(false);
  assert.equal(calls[0][2].analytics_storage, 'granted');
  assert.equal(calls[1][2].analytics_storage, 'denied');
  for (const [, , consent] of calls) {
    assert.equal(consent.ad_storage, 'denied');
    assert.equal(consent.ad_user_data, 'denied');
    assert.equal(consent.ad_personalization, 'denied');
  }
  delete globalThis.window;
});

test('restricted storage and blocked tags cannot crash consent controls', () => {
  globalThis.window = { get localStorage() { throw new Error('Storage blocked'); }, gtag() { throw new Error('Tag blocked'); } };
  assert.equal(readConsent(), null);
  assert.doesNotThrow(() => saveConsent('declined'));
  assert.doesNotThrow(() => updateConsent(false));
  assert.doesNotThrow(() => logEvent('test', 'test'));
  delete globalThis.window;
  assert.equal(readConsent(), null);
});
