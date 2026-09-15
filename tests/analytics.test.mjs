import test from 'node:test';
import assert from 'node:assert/strict';
import { trackCtaClick, trackRoiCalculated, trackDemoSubmit } from '../src/analytics/events.js';
import { logPageView } from '../src/analytics/googleAnalytics.js';

test('conversion events carry useful labels and calculator values', () => {
  const calls = [];
  globalThis.window = { gtag: (...args) => calls.push(args) };
  trackCtaClick('roi_calculator', 'Discuss your scenario', '/book-demo');
  trackRoiCalculated({ currency: 'EUR', annualNetValue: 9860, annualCost: 4600, coordinationHours: 120 });
  trackDemoSubmit('book_demo_page');
  assert.deepEqual(calls.map(call => call[1]), ['cta_click', 'roi_calculated', 'demo_form_submit']);
  assert.equal(calls[0][2].cta_label, 'Discuss your scenario');
  assert.equal(calls[1][2].annual_net_value, 9860);
  assert.equal(calls[1][2].annual_cost, 4600);
  delete globalThis.window;
});

test('page views deduplicate repeated effects but record return visits', () => {
  const calls = [];
  globalThis.window = { location: { origin: 'https://pashx.com' }, gtag: (...args) => calls.push(args) };
  logPageView('/'); logPageView('/'); logPageView('/resources'); logPageView('/');
  assert.equal(calls.length, 3);
  assert.equal(calls[1][2].page_location, 'https://pashx.com/resources');
  delete globalThis.window;
});

test('missing or blocked analytics cannot break conversion navigation', () => {
  delete globalThis.window;
  assert.doesNotThrow(() => trackDemoSubmit());
  globalThis.window = { gtag: () => { throw new Error('blocked'); }, location: { origin: 'https://pashx.com' } };
  assert.doesNotThrow(() => trackCtaClick('hero', 'Book a demo', '/book-demo'));
  assert.doesNotThrow(() => logPageView('/about'));
  delete globalThis.window;
});
