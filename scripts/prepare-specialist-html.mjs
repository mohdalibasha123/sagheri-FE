import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';

const source = JSON.parse(await readFile('docs/content/specialists-from-document.json', 'utf8'));
const escape = text => text.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);

function biographyHtml(text) {
  const paragraphs = text.split(/\n\s*\n/).map(value => value.trim()).filter(Boolean);
  const blocks = [];
  let benefits = [];
  let questions = 0;
  const flushBenefits = () => {
    if (benefits.length) blocks.push('<ul>\n' + benefits.join('\n') + '\n</ul>');
    benefits = [];
  };
  for (const paragraph of paragraphs) {
    if (paragraph.endsWith('?') || paragraph.endsWith('؟')) {
      flushBenefits();
      blocks.push(`<h3>${escape(paragraph)}</h3>`);
      questions++;
    } else if (questions === 1) {
      const colon = paragraph.indexOf(':');
      assert.ok(colon > 0, 'Each consultation benefit must have a heading.');
      benefits.push(`<li><strong>${escape(paragraph.slice(0, colon + 1))}</strong>${escape(paragraph.slice(colon + 1))}</li>`);
    } else if (paragraph.startsWith('«') || paragraph.startsWith('“')) {
      blocks.push(`<blockquote>${escape(paragraph)}</blockquote>`);
    } else {
      blocks.push(`<p>${escape(paragraph)}</p>`);
    }
  }
  flushBenefits();
  assert.equal(questions, 2, 'Expected consultation and individual-support headings.');
  return blocks.join('\n\n');
}

const result = {
  ...source,
  format: 'semantic-html',
  specialists: source.specialists.map(profile => ({ ...profile, bioAr: biographyHtml(profile.bioAr), bioEn: biographyHtml(profile.bioEn) })),
};
await writeFile('docs/content/specialist-html-profiles.json', JSON.stringify(result, null, 2) + '\n', 'utf8');
console.log('Prepared HTML bios for both specialists and both languages.');
