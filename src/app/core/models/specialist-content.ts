import type { BackendLocalizedText } from '../services/public-content.service';

export function specialistLabels(values: unknown, serialized?: string): BackendLocalizedText[] {
  let source: unknown = values;
  if (!Array.isArray(source) || source.length === 0) {
    try { source = serialized ? JSON.parse(serialized) : []; }
    catch { return []; }
  }
  if (!Array.isArray(source)) return [];
  return source.flatMap((item): BackendLocalizedText[] => {
    if (typeof item === 'string' && item.trim()) return [{ textAr: item, textEn: item }];
    if (!item || typeof item !== 'object' || typeof item.textAr !== 'string' || !item.textAr.trim()) return [];
    return [{ textAr: item.textAr, textEn: typeof item.textEn === 'string' && item.textEn.trim() ? item.textEn : item.textAr }];
  });
}

export function specialistBioParagraphs(bio?: string): string[] {
  if (!bio) return [];
  const document = new DOMParser().parseFromString(bio, 'text/html');
  if (document.body.children.length) {
    return Array.from(document.body.querySelectorAll('p, h2, h3, blockquote, li'))
      .map(element => element.textContent?.trim() || '').filter(Boolean);
  }
  return bio.split(/\n\s*\n/).map(paragraph => paragraph.trim()).filter(Boolean);
}

export function specialistBioHtml(bio?: string): string {
  if (!bio) return '';
  const document = new DOMParser().parseFromString(bio, 'text/html');
  if (!document.body.children.length) {
    document.body.textContent = '';
    for (const paragraph of specialistBioParagraphs(bio)) {
      const element = document.createElement('p');
      element.textContent = paragraph;
      document.body.append(element);
    }
  }
  // The introductory paragraph is already displayed in the profile header.
  if (document.body.firstElementChild?.tagName === 'P') document.body.firstElementChild.remove();
  return document.body.innerHTML;
}
