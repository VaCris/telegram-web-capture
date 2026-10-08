import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';

const SRC = readFileSync(new URL('../content/content.js', import.meta.url), 'utf8');

const MEDIA_VIEWER_HTML = `
  <div class="media-viewer-whole">
    <div class="media-viewer-buttons">
      <button class="btn-icon quality-download-options-button-menu hide" id="download-btn"><span class="tgico button-icon">&#xE973;</span></button>
      <button class="btn-icon hide" id="volume-btn">v</button>
      <button class="btn-icon" id="close-btn">x</button>
    </div>
  </div>`;

const STORIES_VIEWER_HTML = `
  <div id="stories-viewer">
    <button class="btn-icon quality-download-options-button-menu hide" id="story-download"><span class="tgico button-icon">&#xE973;</span></button>
    <button class="btn-icon hide" id="story-mute">m</button>
  </div>`;

function boot(html) {
  const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`, {
    runScripts: 'outside-only'
  });
  dom.window.eval(SRC);
  return dom;
}

function button(win, id) {
  return win.document.getElementById(id);
}

test('unhides all hidden buttons in the media viewer', () => {
  const dom = boot(MEDIA_VIEWER_HTML);
  dom.window.__tgDL.scan();
  assert.equal(button(dom.window, 'download-btn').classList.contains('hide'), false);
  assert.equal(button(dom.window, 'volume-btn').classList.contains('hide'), false);
  assert.equal(button(dom.window, 'close-btn').classList.contains('hide'), false);
});

test('marks download buttons with tgico-download', () => {
  const dom = boot(MEDIA_VIEWER_HTML);
  dom.window.__tgDL.scan();
  assert.equal(button(dom.window, 'download-btn').classList.contains('tgico-download'), true);
  assert.equal(button(dom.window, 'volume-btn').classList.contains('tgico-download'), false);
});

test('unhides hidden buttons in the stories viewer', () => {
  const dom = boot(STORIES_VIEWER_HTML);
  dom.window.__tgDL.scan();
  assert.equal(button(dom.window, 'story-download').classList.contains('hide'), false);
  assert.equal(button(dom.window, 'story-mute').classList.contains('hide'), false);
});

test('does nothing and does not throw when no viewer is open', () => {
  const dom = boot('<div class="chat">hello</div>');
  assert.doesNotThrow(() => dom.window.__tgDL.scan());
});

test('does not double-initialize', () => {
  const dom = boot(MEDIA_VIEWER_HTML);
  const observer = dom.window.__tgDL.observer;
  dom.window.eval(SRC);
  assert.equal(dom.window.__tgDL.observer, observer);
});

test('observer unhides buttons after a viewer is injected', async () => {
  const dom = boot('<div id="root"></div>');
  const { document } = dom.window;

  document.getElementById('root').innerHTML = MEDIA_VIEWER_HTML;

  await new Promise((resolve) => setTimeout(resolve, 250));

  assert.equal(button(dom.window, 'download-btn').classList.contains('hide'), false);
});

test('is active by default when storage is unavailable', () => {
  const dom = boot(MEDIA_VIEWER_HTML);
  assert.equal(dom.window.__tgDL.active, true);
});

test('disable() stops the observer and keeps new viewers hidden', async () => {
  const dom = boot('<div id="root"></div>');
  const { document } = dom.window;

  dom.window.__tgDL.disable();
  assert.equal(dom.window.__tgDL.active, false);
  assert.equal(dom.window.__tgDL.observer, null);

  document.getElementById('root').innerHTML = MEDIA_VIEWER_HTML;
  await new Promise((resolve) => setTimeout(resolve, 250));

  assert.equal(button(dom.window, 'download-btn').classList.contains('hide'), true);
});

test('enable() after disable() resumes unhiding', async () => {
  const dom = boot('<div id="root"></div>');
  const { document } = dom.window;

  dom.window.__tgDL.disable();
  dom.window.__tgDL.enable();
  assert.equal(dom.window.__tgDL.active, true);

  document.getElementById('root').innerHTML = MEDIA_VIEWER_HTML;
  await new Promise((resolve) => setTimeout(resolve, 250));

  assert.equal(button(dom.window, 'download-btn').classList.contains('hide'), false);
});
