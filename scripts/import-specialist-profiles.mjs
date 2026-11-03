import assert from 'node:assert/strict';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const base = (process.env.BE_BASE_URL || 'http://localhost:8080').replace(/\/$/, '') + '/api/v1';
const email = process.env.SAGHERI_ADMIN_EMAIL;
const password = process.env.SAGHERI_ADMIN_PASSWORD;
assert.ok(email && password, 'Set SAGHERI_ADMIN_EMAIL and SAGHERI_ADMIN_PASSWORD before importing.');
const source = JSON.parse(await readFile(resolve('docs/content/specialist-html-profiles.json'), 'utf8'));
let token;

async function api(path, method = 'GET', body) {
  const response = await fetch(`${base}${path}`, {
    method,
    signal: AbortSignal.timeout(15000),
    headers: {
      Accept: 'application/json',
      ...(body ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const result = await response.json();
  if (!response.ok || result.success === false) throw new Error(`${method} ${path}: ${response.status} ${result.message || ''}`);
  return result.data ?? result;
}

const session = await api('/auth/login', 'POST', { email, password });
token = session.accessToken ?? session.token;
assert.ok(token && session.user.roles.includes('ADMIN'), 'An admin session is required.');
const existing = await api('/admin/specialists');
const originals = source.specialists.map(profile => {
  const current = existing.find(item => item.id === profile.id);
  assert.ok(current, `Specialist does not exist: ${profile.id}`);
  return current;
});
await mkdir('tmp', { recursive: true });
const backup = resolve(`tmp/specialists-before-import-${Date.now()}.json`);
await writeFile(backup, JSON.stringify(originals, null, 2) + '\n');
console.log(`Saved existing records to ${backup}`);

for (const profile of source.specialists) {
  const current = originals.find(item => item.id === profile.id);
  const payload = {
    nameAr: profile.nameAr, nameEn: profile.nameEn,
    titleAr: profile.titleAr, titleEn: profile.titleEn,
    bioAr: profile.bioAr, bioEn: profile.bioEn,
    imageUrl: current.imageUrl, specialty: current.specialty,
    userId: current.userId, displayOrder: current.displayOrder,
    specialtiesJson: JSON.stringify(profile.specialties),
    credentialsJson: JSON.stringify(profile.credentials),
    active: true,
  };
  await api(`/admin/specialists/${profile.id}`, 'PUT', payload);
  console.log(`Updated ${profile.nameEn} (${profile.id})`);
}

const snapshot = await api('/cms/static-content-snapshot');
for (const profile of source.specialists) {
  const published = snapshot.specialists.find(item => item.id === profile.id);
  assert.equal(published?.bioAr, profile.bioAr, `Snapshot is stale for ${profile.nameEn}`);
  assert.equal(published?.nameAr, profile.nameAr);
  assert.deepEqual(published?.specialties, profile.specialties);
}
console.log('Both profiles verified in the public backend snapshot.');
