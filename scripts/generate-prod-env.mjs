// Generates src/environments/environment.prod.ts from build-time public URLs.
// Usage: API_BASE_URL=... PAYMENT_RETURN_BASE_URL=... node scripts/generate-prod-env.mjs
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

function fail(message) {
  console.error(`generate-prod-env: ${message}`);
  process.exit(1);
}

function readUrl(name, { stripTrailingSlash = true } = {}) {
  const raw = (process.env[name] ?? '').trim();
  if (!raw) fail(`${name} is required`);
  let url;
  try {
    url = new URL(raw);
  } catch {
    fail(`${name} is not a valid URL`);
  }
  if (url.protocol !== 'https:') fail(`${name} must use https`);
  if (/^(localhost|127\.|0\.0\.0\.0|\[::1\])/i.test(url.hostname) || url.hostname.endsWith('.internal')) {
    fail(`${name} must not point to localhost or a private/internal host`);
  }
  if (url.search || url.hash) fail(`${name} must not contain a query or fragment`);
  const value = url.toString();
  return stripTrailingSlash ? value.replace(/\/+$/, '') : value;
}

const apiBaseUrl = readUrl('API_BASE_URL');
const paymentReturnBaseUrl = readUrl('PAYMENT_RETURN_BASE_URL');

const environment = {
  production: true,
  profile: 'prod',
  apiBaseUrl,
  paymentReturnBaseUrl,
  enableMockApi: false,
  enableContentFallbackJson: false,
  enableDebugLogs: false,
  defaultLanguage: 'ar',
  defaultDirection: 'rtl',
};

const target = fileURLToPath(new URL('../src/environments/environment.prod.ts', import.meta.url));
writeFileSync(target, `export const environment = ${JSON.stringify(environment, null, 2)};\n`);
console.log(`generate-prod-env: wrote environment.prod.ts (api=${apiBaseUrl})`);
