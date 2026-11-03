import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environment';
import { BackendCmsPage, PublicContentService, PublicContentSnapshot } from './public-content.service';

describe('PublicContentService content sources', () => {
  let service: PublicContentService;
  let http: HttpTestingController;
  const initialFallback = environment.enableContentFallbackJson;
  const snapshotUrl = `${environment.apiBaseUrl}/cms/static-content-snapshot`;
  const pageUrl = `${environment.apiBaseUrl}/cms/pages/terms`;
  const assetUrl = 'assets/content-fallback.json';
  const page: BackendCmsPage = {
    id: 'terms', pageKey: 'terms', titleAr: '', titleEn: 'Backend terms', sections: [],
  };
  const snapshot: PublicContentSnapshot = {
    schemaVersion: 1, generatedAt: '', source: 'backend', courses: [], specialists: [],
    consultationTypes: [], faqs: [], reviews: [], cmsPages: [page], siteSettings: [],
  };

  beforeEach(() => {
    environment.enableContentFallbackJson = false;
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(PublicContentService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    environment.enableContentFallbackJson = initialFallback;
    http.verify();
  });

  it('loads the backend envelope and reuses the snapshot across pages', () => {
    service.snapshot().subscribe((result) => expect(result).toEqual(snapshot));
    http.expectOne(snapshotUrl).flush({ success: true, data: snapshot });

    service.courses().subscribe((result) => expect(result).toEqual([]));
    http.expectNone(snapshotUrl);
    http.expectNone(assetUrl);
  });

  it('propagates snapshot failures without reading JSON when fallback is disabled', () => {
    const failure = vi.fn();
    service.snapshot().subscribe({ error: failure });
    http.expectOne(snapshotUrl).flush({}, { status: 503, statusText: 'Unavailable' });

    expect(failure).toHaveBeenCalledOnce();
    http.expectNone(assetUrl);
  });

  it('propagates CMS page failures without reading JSON when fallback is disabled', () => {
    const failure = vi.fn();
    service.cmsPage('terms').subscribe({ error: failure });
    http.expectOne(pageUrl).flush({}, { status: 503, statusText: 'Unavailable' });

    expect(failure).toHaveBeenCalledOnce();
    http.expectNone(assetUrl);
  });

  it('reads the generated snapshot only after an API failure when enabled', () => {
    environment.enableContentFallbackJson = true;
    service.snapshot().subscribe((result) => expect(result).toEqual(snapshot));
    http.expectNone(assetUrl);
    http.expectOne(snapshotUrl).flush({}, { status: 503, statusText: 'Unavailable' });
    http.expectOne(assetUrl).flush(snapshot);
  });

  it('reads CMS pages from the generated backup after an API failure when enabled', () => {
    environment.enableContentFallbackJson = true;
    service.cmsPage('terms').subscribe((result) => expect(result).toEqual(page));
    http.expectOne(pageUrl).flush({}, { status: 503, statusText: 'Unavailable' });
    http.expectOne(assetUrl).flush(snapshot);
  });
});
