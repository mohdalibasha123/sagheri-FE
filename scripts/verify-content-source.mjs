import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdtemp, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';

const baseUrl = process.argv[2] || 'http://localhost:4200';
const profile = await mkdtemp(join(tmpdir(), 'sagheri-content-source-'));
const chrome = spawn(process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', [
  '--headless', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
  '--remote-debugging-port=0', `--user-data-dir=${profile}`, 'about:blank',
], { stdio: 'ignore' });
let browserError;
chrome.on('error', (error) => { browserError = error; });
let socket;
const pending = new Map();
let nextId = 0;
let events = [];

async function waitFor(check) {
  for (let attempt = 0; attempt < 100; attempt++) {
    if (browserError) throw browserError;
    const result = await check();
    if (result) return result;
    await delay(100);
  }
  throw new Error('Timed out waiting for the browser.');
}

function send(method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = ++nextId;
    const timer = setTimeout(() => {
      pending.delete(id);
      reject(new Error(`Timed out: ${method}`));
    }, 10000);
    pending.set(id, { resolve, reject, timer });
    socket.send(JSON.stringify({ id, method, params }));
  });
}

async function renderedCounts() {
  const { result } = await send('Runtime.evaluate', {
    expression: `JSON.stringify({
      courses: document.querySelectorAll('.course-card').length,
      specialists: document.querySelectorAll('.specialist-card').length,
      faqs: document.querySelectorAll('.faq-item').length
    })`,
    returnByValue: true,
  });
  return JSON.parse(result.value);
}

try {
  const port = await waitFor(async () => {
    try { return (await readFile(join(profile, 'DevToolsActivePort'), 'utf8')).split('\n')[0]; }
    catch { return undefined; }
  });
  const tabs = await fetch(`http://127.0.0.1:${port}/json/list`).then((response) => response.json());
  socket = new WebSocket(tabs.find((tab) => tab.type === 'page').webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, { once: true });
    socket.addEventListener('error', reject, { once: true });
  });
  socket.addEventListener('message', ({ data }) => {
    const message = JSON.parse(data);
    if (message.id) {
      const entry = pending.get(message.id);
      if (!entry) return;
      clearTimeout(entry.timer);
      pending.delete(message.id);
      if (message.error) entry.reject(new Error(message.error.message));
      else entry.resolve(message.result);
    } else {
      events.push(message);
    }
  });
  await send('Network.enable');
  await send('Page.enable');
  await send('Runtime.enable');
  await send('Network.setCacheDisabled', { cacheDisabled: true });
  // Prove that content renders without access to the local JSON asset.
  await send('Network.setBlockedURLs', { urls: ['*assets/content-fallback.json*'] });
  await send('Page.navigate', { url: baseUrl });
  const counts = await waitFor(async () => {
    const current = await renderedCounts();
    return current.courses > 0 ? current : undefined;
  });
  const snapshotResponse = events.find((event) =>
    event.method === 'Network.responseReceived' &&
    event.params.response.url.includes('/api/v1/cms/static-content-snapshot'));
  assert.ok(snapshotResponse, 'The browser must receive a backend snapshot response.');
  assert.equal(snapshotResponse.params.response.status, 200);
  assert.equal(events.some((event) => event.method === 'Network.requestWillBeSent' &&
    event.params.request.url.includes('assets/content-fallback.json')), false, 'JSON fallback must not be requested.');
  console.log(JSON.stringify({ phase: 'backend available, JSON blocked',
    request: snapshotResponse.params.response.url, status: 200, ...counts, fallbackRequested: false }));

  // A fresh document has no cached snapshot; blocking BE must leave the lists empty.
  events = [];
  await send('Network.setBlockedURLs', {
    urls: ['*assets/content-fallback.json*', '*api/v1/cms/static-content-snapshot*'],
  });
  await send('Page.reload', { ignoreCache: true });
  await waitFor(async () => events.some((event) => event.method === 'Network.loadingFailed' &&
    event.params.blockedReason === 'inspector'));
  await delay(500);
  const blockedCounts = await renderedCounts();
  assert.deepEqual(blockedCounts, { courses: 0, specialists: 0, faqs: 0 });
  assert.equal(events.some((event) => event.method === 'Network.requestWillBeSent' &&
    event.params.request.url.includes('assets/content-fallback.json')), false);
  console.log(JSON.stringify({ phase: 'backend blocked, JSON blocked', ...blockedCounts, fallbackRequested: false }));
} finally {
  for (const entry of pending.values()) clearTimeout(entry.timer);
  socket?.close();
  chrome.kill();
}
