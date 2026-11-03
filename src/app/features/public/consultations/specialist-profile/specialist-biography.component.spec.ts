import { TestBed } from '@angular/core/testing';
import { SpecialistBiographyComponent } from './specialist-biography.component';

describe('Specialist biography HTML', () => {
  it('renders semantic headings, quotes, and benefit lists', () => {
    const fixture = TestBed.createComponent(SpecialistBiographyComponent);
    fixture.componentRef.setInput('bio', '<p>Intro</p><blockquote>Statement</blockquote><h3>Why book?</h3><ul><li><strong>Care:</strong> Personal support</li></ul>');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h3').textContent).toBe('Why book?');
    expect(fixture.nativeElement.querySelector('blockquote').textContent).toBe('Statement');
    expect(fixture.nativeElement.querySelectorAll('li')).toHaveLength(1);
    expect(fixture.nativeElement.textContent).not.toContain('Intro');
  });

  it('uses Angular sanitization for backend HTML without trusting executable markup', () => {
    const fixture = TestBed.createComponent(SpecialistBiographyComponent);
    fixture.componentRef.setInput('bio', '<p>Intro</p><h3 onclick="alert(1)">Question</h3><script>alert(1)</script><img src="x" onerror="alert(1)"><a href="javascript:alert(1)">Link</a>');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('script')).toBeNull();
    expect(fixture.nativeElement.querySelector('[onclick], [onerror]')).toBeNull();
    expect(fixture.nativeElement.querySelector('a').getAttribute('href')).not.toMatch(/^javascript:/i);
  });
});
