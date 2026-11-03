import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const baseUrl = process.env.BE_BASE_URL ?? process.env.SAGHERI_BE_BASE_URL ?? 'http://localhost:8080';
const snapshotUrl = `${baseUrl.replace(/\/$/, '')}/api/v1/cms/static-content-snapshot.json`;
const outputPath = resolve('src/assets/content-fallback.json');

const response = await fetch(snapshotUrl, {
  headers: { Accept: 'application/json' },
});

if (!response.ok) {
  throw new Error(`Failed to fetch content snapshot: ${response.status} ${response.statusText}`);
}

const snapshot = await response.json();
await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8');

console.log(`Wrote ${outputPath} from ${snapshotUrl}`);
