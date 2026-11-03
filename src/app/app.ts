import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LanguageStateService } from './core/state/language-state.service';
import { PublicNavigationComponent } from './core/layout/public-navigation/public-navigation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PublicNavigationComponent],
  template: `
    <app-public-navigation />
    <div class="route-content"><router-outlet /></div>
  `,
  styles: [`
    :host { display: block; }
    .route-content { min-height: 100dvh; min-width: 0; padding-right: 140px; }
    @media (max-width: 767px) {
      .route-content { padding-right: 0; padding-bottom: calc(68px + env(safe-area-inset-bottom, 0px)); }
    }
  `],
})
export class App implements OnInit {
  private readonly langState = inject(LanguageStateService);

  ngOnInit(): void {
    // Language state initializes direction via effect in LanguageStateService
  }
}
