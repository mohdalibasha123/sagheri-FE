import { specialistBioHtml, specialistBioParagraphs, specialistLabels } from './specialist-content';

describe('Specialist content', () => {
  it('preserves bilingual labels from the backend snapshot', () => {
    expect(specialistLabels([{ textAr: 'Arabic', textEn: 'English' }])).toEqual([{ textAr: 'Arabic', textEn: 'English' }]);
  });
  it('supports legacy string arrays and missing translations', () => {
    expect(specialistLabels(['IBCLC', { textAr: 'Training' }])).toEqual([
      { textAr: 'IBCLC', textEn: 'IBCLC' }, { textAr: 'Training', textEn: 'Training' },
    ]);
  });
  it('reads serialized public API fields when snapshot arrays are absent', () => {
    expect(specialistLabels(null, '[{"textAr":"Arabic","textEn":"English"}]'))
      .toEqual([{ textAr: 'Arabic', textEn: 'English' }]);
  });
  it('ignores invalid content without rendering objects as text', () => {
    expect(specialistLabels([null, 1, {}, '', { textEn: 'Missing Arabic' }])).toEqual([]);
    expect(specialistLabels(undefined, 'invalid JSON')).toEqual([]);
    expect(specialistLabels(undefined, '{}')).toEqual([]);
  });
  it('separates long biographies into paragraphs for previews and full profiles', () => {
    expect(specialistBioParagraphs(' Intro \r\n\r\n Detail\n\n\n Quote ')).toEqual(['Intro', 'Detail', 'Quote']);
    expect(specialistBioParagraphs()).toEqual([]);
  });
  it('extracts readable previews from HTML and decodes entities', () => {
    expect(specialistBioParagraphs('<p>Nutrition &amp; health</p><h3>Why?</h3><ul><li><strong>Care:</strong> Individual support</li></ul>'))
      .toEqual(['Nutrition & health', 'Why?', 'Care: Individual support']);
  });
  it('preserves biography headings and lists without repeating the introduction', () => {
    expect(specialistBioHtml('<p>Intro</p><h3>Why?</h3><ul><li>Care</li></ul>'))
      .toBe('<h3>Why?</h3><ul><li>Care</li></ul>');
  });
  it('continues to render legacy plain text and escapes text characters', () => {
    expect(specialistBioHtml('Intro\n\nDetails & support')).toBe('<p>Details &amp; support</p>');
    expect(specialistBioHtml()).toBe('');
  });
});
