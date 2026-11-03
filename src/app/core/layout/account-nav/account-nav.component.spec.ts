import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../auth/auth.service';
import { Language, UserRole } from '../../enums';
import { UserProfile } from '../../models/auth.model';
import { AuthStateService } from '../../state/auth-state.service';
import { LanguageStateService } from '../../state/language-state.service';
import { AccountNavComponent } from './account-nav.component';

describe('Account navigation', () => {
  let fixture: ComponentFixture<AccountNavComponent>;
  let state: AuthStateService;
  let http: HttpTestingController;
  const user: UserProfile = {
    id: 'customer', fullName: 'Test Customer', email: 'test@example.com',
    roles: [UserRole.USER], permissions: [], createdAt: '',
  };
  const trigger = () => fixture.nativeElement.querySelector('.account-trigger') as HTMLButtonElement;
  const openPanel = () => { trigger().click(); fixture.detectChanges(); };

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      imports: [AccountNavComponent],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    });
    vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    fixture = TestBed.createComponent(AccountNavComponent);
    fixture.componentRef.setInput('controlId', 'test-account-panel');
    state = TestBed.inject(AuthStateService);
    http = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => { http.verify(); localStorage.clear(); });

  it('offers sign in and registration to guests', () => {
    openPanel();
    expect(fixture.nativeElement.querySelector('a[href="/auth/login"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('a[href="/auth/register"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.logout')).toBeNull();
    expect(trigger().getAttribute('aria-expanded')).toBe('true');
  });

  it('shows the returned full name immediately after registration', () => {
    TestBed.inject(AuthService).register({
      fullName: user.fullName!, dateOfBirth: '1995-04-20', nationality: 'JO',
      motherStatus: 'NONE', childrenCount: 0, chronicDiseases: [], chronicDiseaseOther: null,
      medicationAllergy: null, foodAllergy: null, email: user.email, password: 'test-only',
    }).subscribe();
    http.expectOne(`${environment.apiBaseUrl}/auth/register`).flush({
      success: true, data: { token: 'test-token', refreshToken: 'test-refresh', user },
    });
    fixture.detectChanges();
    expect(trigger().textContent).toContain('Test Customer');
    openPanel();
    expect(fixture.nativeElement.querySelector('.logout')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('a[href="/auth/register"]')).toBeNull();
  });

  it('supports older first-name and last-name profiles', () => {
    state.setUser({ ...user, fullName: undefined, firstName: 'First', lastName: 'Last' }, 'token', 'refresh');
    fixture.detectChanges();
    expect(trigger().textContent).toContain('First Last');
  });

  it('clears the session and restores guest controls on logout', () => {
    state.setUser(user, 'token', 'refresh');
    openPanel();
    (fixture.nativeElement.querySelector('.logout') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(state.isAuthenticated()).toBe(false);
    expect(state.getAccessToken()).toBeNull();
    expect(state.getRefreshToken()).toBeNull();
    expect(localStorage.getItem('sagheri_current_user')).toBeNull();
    expect(trigger().textContent).not.toContain('Test Customer');
    expect(TestBed.inject(Router).navigate).toHaveBeenCalledWith(['']);
  });

  it('closes on Escape and returns focus to the profile button', () => {
    openPanel();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.account-panel')).toBeNull();
    expect(document.activeElement).toBe(trigger());
  });

  it('closes when clicking outside and supports English labels', () => {
    TestBed.inject(LanguageStateService).setLanguage(Language.EN);
    fixture.detectChanges();
    openPanel();
    expect(fixture.nativeElement.textContent).toContain('Create account');
    document.body.click();
    fixture.detectChanges();
    expect(trigger().getAttribute('aria-expanded')).toBe('false');
  });
});
