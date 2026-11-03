import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LayoutStateService {
  readonly isMobileNavOpen = signal(false);
  readonly isAdminSidebarOpen = signal(true);

  toggleMobileNav(): void {
    this.isMobileNavOpen.update((v) => !v);
  }

  closeMobileNav(): void {
    this.isMobileNavOpen.set(false);
  }

  toggleAdminSidebar(): void {
    this.isAdminSidebarOpen.update((v) => !v);
  }
}
