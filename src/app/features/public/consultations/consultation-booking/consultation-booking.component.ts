import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Language } from '../../../../core/enums';
import {
  BackendAvailability,
  BackendConsultationType,
  BackendSpecialist,
  PublicContentService,
} from '../../../../core/services/public-content.service';
import { LanguageStateService } from '../../../../core/state/language-state.service';

interface TypeView {
  id: string;
  label: string;
  labelEn: string;
  price: number;
}

interface DayView {
  label: string;
  labelEn: string;
  date: string;
  slots: string[];
}

@Component({
  selector: 'app-consultation-booking',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './consultation-booking.component.html',
  styleUrl: './consultation-booking.component.scss',
})
export class ConsultationBookingComponent {
  private readonly lang = inject(LanguageStateService);
  private readonly route = inject(ActivatedRoute);
  private readonly content = inject(PublicContentService);
  private readonly cdr = inject(ChangeDetectorRef);

  readonly selectedType = signal('');
  readonly selectedDate = signal('');
  readonly selectedSlot = signal('');
  readonly submitted = signal(false);
  readonly form = { firstName: '', lastName: '', phone: '', phoneCode: '+962', email: '', country: 'Jordan', problem: '' };

  specialist?: BackendSpecialist;
  types: TypeView[] = [];
  calendarDays: DayView[] = [];

  constructor() {
    const specialistId = this.route.snapshot.paramMap.get('specialistId') || '';
    this.content.consultationTypes().subscribe((types) => {
      this.types = types.map((type) => this.toType(type));
      this.selectedType.set(this.types[0]?.id || '');
      this.cdr.markForCheck();
    });
    if (specialistId) {
      this.content.specialists().subscribe((specialists) => {
        this.specialist = specialists.find((item) => item.id === specialistId);
        this.cdr.markForCheck();
      });
      this.content.availability(specialistId).subscribe((availability) => {
        this.calendarDays = this.toDays(availability);
        this.selectedDate.set(this.calendarDays[0]?.date || '');
        this.cdr.markForCheck();
      });
    }
  }

  get selectedDaySlots(): string[] {
    return this.calendarDays.find((d) => d.date === this.selectedDate())?.slots ?? [];
  }

  get selectedTypeObj(): TypeView | undefined {
    return this.types.find((t) => t.id === this.selectedType());
  }

  isEnglish(): boolean {
    return this.lang.language() === Language.EN;
  }

  t(ar: string, en: string): string {
    return this.isEnglish() ? en : ar;
  }

  submitBooking(): void {
    const specialistId = this.route.snapshot.paramMap.get('specialistId');
    if (!specialistId || !this.selectedType() || !this.selectedDate() || !this.selectedSlot()) {
      return;
    }
    this.content.createBooking({
      specialistId,
      consultationTypeId: this.selectedType(),
      bookingDate: this.selectedDate(),
      bookingTime: this.selectedSlot(),
      firstName: this.form.firstName,
      lastName: this.form.lastName,
      phoneCountryCode: this.form.phoneCode,
      phoneNumber: this.form.phone,
      country: this.form.country,
      email: this.form.email,
      problemDescription: this.form.problem,
      preferredContactTime: this.selectedSlot(),
    }).subscribe(() => {
      this.submitted.set(true);
      this.cdr.markForCheck();
    });
  }

  private toType(type: BackendConsultationType): TypeView {
    return {
      id: type.id,
      label: type.nameAr,
      labelEn: type.nameEn || type.nameAr,
      price: Number(type.priceAmount ?? 0),
    };
  }

  private toDays(availability: BackendAvailability[]): DayView[] {
    const grouped = new Map<string, string[]>();
    availability.forEach((slot) => {
      const time = slot.startTime.slice(0, 5);
      grouped.set(slot.availableDate, [...(grouped.get(slot.availableDate) || []), time]);
    });
    return Array.from(grouped.entries()).map(([date, slots]) => ({
      date,
      slots,
      label: this.dayLabel(date, 'ar'),
      labelEn: this.dayLabel(date, 'en'),
    }));
  }

  private dayLabel(date: string, locale: 'ar' | 'en'): string {
    return new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(new Date(`${date}T00:00:00`));
  }
}
