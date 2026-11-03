import { Component, ElementRef, computed, inject, input, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationStart, Router, RouterLink } from '@angular/router';
import { LucideLogIn, LucideLogOut, LucideUserPlus, LucideUserRound } from '@lucide/angular';
import { AuthService } from '../../auth/auth.service';
import { Language } from '../../enums';
import { AuthStateService } from '../../state/auth-state.service';
import { LanguageStateService } from '../../state/language-state.service';

@Component({
  selector: 'app-account-nav',
  standalone: true,
  imports: [RouterLink, LucideUserRound, LucideLogIn, LucideLogOut, LucideUserPlus],
  templateUrl: './account-nav.component.html',
  styleUrl: './account-nav.component.scss',
  host: {
    '(document:click)': 'onOutsideClick($event)',
    '(document:keydown.escape)': 'close(true)',
    '(focusout)': 'onFocusOut($event)',
  },
})
export class AccountNavComponent {
  readonly controlId = input.required<string>();
  readonly authState = inject(AuthStateService);
  private readonly auth = inject(AuthService);
  private readonly language = inject(LanguageStateService);
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly router = inject(Router);
  private readonly trigger = viewChild<ElementRef<HTMLButtonElement>>('trigger');

  readonly open = signal(false);
  readonly displayName = computed(() => {
    const user = this.authState.currentUser();
    return user?.fullName?.trim() || [user?.firstName, user?.lastName].filter(Boolean).join(' ').trim() || user?.email || '';
  });
  readonly label = computed(() => this.displayName() || this.text('حسابي', 'Account'));

  constructor() {
    this.router.events.pipe(takeUntilDestroyed()).subscribe((event) => {
      if (event instanceof NavigationStart) this.close();
    });
  }

  text(ar: string, en: string): string {
    return this.language.language() === Language.EN ? en : ar;
  }

  close(restoreFocus = false): void {
    if (!this.open()) return;
    this.open.set(false);
    if (restoreFocus) this.trigger()?.nativeElement.focus();
  }

  onOutsideClick(event: MouseEvent): void {
    if (!this.host.nativeElement.contains(event.target as Node)) this.close();
  }

  onFocusOut(event: FocusEvent): void {
    if (!this.host.nativeElement.contains(event.relatedTarget as Node | null)) this.close();
  }

  logout(): void {
    this.close(true);
    this.auth.logout();
  }
}
