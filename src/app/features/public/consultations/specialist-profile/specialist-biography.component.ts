import { Component, ViewEncapsulation, computed, input } from '@angular/core';
import { specialistBioHtml } from '../../../../core/models/specialist-content';

@Component({
  selector: 'app-specialist-biography',
  standalone: true,
  template: '<div class="specialist-biography" [innerHTML]="html()"></div>',
  styleUrl: './specialist-biography.component.scss',
  // Backend HTML has no Angular scope attributes; all rules use this component's class.
  encapsulation: ViewEncapsulation.None,
})
export class SpecialistBiographyComponent {
  readonly bio = input('');
  readonly html = computed(() => specialistBioHtml(this.bio()));
}
