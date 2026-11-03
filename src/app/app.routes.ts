import { Routes } from '@angular/router';
import { authGuard, guestGuard, adminGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // ─── Public Layout ─────────────────────────────────────────────────────────
  {
    path: '',
    loadComponent: () =>
      import('./core/layout/public-layout/public-layout.component').then(
        (m) => m.PublicLayoutComponent,
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/public/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'courses',
        loadComponent: () =>
          import('./features/public/courses/courses-list/courses-list.component').then(
            (m) => m.CoursesListComponent,
          ),
      },
      {
        path: 'courses/:slug',
        loadComponent: () =>
          import('./features/public/courses/course-detail/course-detail.component').then(
            (m) => m.CourseDetailComponent,
          ),
      },
      {
        path: 'specialists',
        loadComponent: () =>
          import(
            './features/public/consultations/specialists-list/specialists-list.component'
          ).then((m) => m.SpecialistsListComponent),
      },
      {
        path: 'specialists/:id',
        loadComponent: () =>
          import(
            './features/public/consultations/specialist-profile/specialist-profile.component'
          ).then((m) => m.SpecialistProfileComponent),
      },
      {
        path: 'consultations/book/:specialistId',
        loadComponent: () =>
          import(
            './features/public/consultations/consultation-booking/consultation-booking.component'
          ).then((m) => m.ConsultationBookingComponent),
      },
      {
        path: 'faq',
        loadComponent: () =>
          import('./features/public/faq/faq.component').then((m) => m.FaqComponent),
      },
      {
        path: 'contact',
        loadComponent: () =>
          import('./features/public/contact/contact.component').then((m) => m.ContactComponent),
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./features/public/about/about.component').then((m) => m.AboutComponent),
      },
      {
        path: 'terms',
        loadComponent: () =>
          import('./features/public/legal/legal.component').then((m) => m.LegalComponent),
      },
      {
        path: 'privacy',
        loadComponent: () =>
          import('./features/public/legal/legal.component').then((m) => m.LegalComponent),
      },
      {
        path: 'refund-policy',
        loadComponent: () =>
          import('./features/public/legal/legal.component').then((m) => m.LegalComponent),
      },
      {
        path: 'checkout/course/:courseId',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./features/checkout/course-checkout/course-checkout.component').then(
            (m) => m.CourseCheckoutComponent,
          ),
      },
      {
        path: 'payment/success',
        loadComponent: () =>
          import('./features/checkout/payment-success/payment-success.component').then(
            (m) => m.PaymentSuccessComponent,
          ),
      },
      {
        path: 'payment/failure',
        loadComponent: () =>
          import('./features/checkout/payment-failure/payment-failure.component').then(
            (m) => m.PaymentFailureComponent,
          ),
      },
      {
        path: 'payment/pending',
        loadComponent: () =>
          import('./features/checkout/payment-pending/payment-pending.component').then(
            (m) => m.PaymentPendingComponent,
          ),
      },
    ],
  },

  // ─── Auth Routes ───────────────────────────────────────────────────────────
  {
    path: 'auth',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./core/layout/auth-layout/auth-layout.component').then(
        (m) => m.AuthLayoutComponent,
      ),
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/login/login.component').then((m) => m.LoginComponent),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./features/auth/register/register.component').then((m) => m.RegisterComponent),
      },
      {
        path: 'forgot-password',
        loadComponent: () =>
          import('./features/auth/forgot-password/forgot-password.component').then(
            (m) => m.ForgotPasswordComponent,
          ),
      },
      {
        path: 'reset-password',
        loadComponent: () =>
          import('./features/auth/reset-password/reset-password.component').then(
            (m) => m.ResetPasswordComponent,
          ),
      },
      {
        path: 'verify-account',
        loadComponent: () =>
          import('./features/auth/verify-account/verify-account.component').then(
            (m) => m.VerifyAccountComponent,
          ),
      },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },

  // ─── User Area ─────────────────────────────────────────────────────────────
  {
    path: 'user',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./core/layout/user-layout/user-layout.component').then(
        (m) => m.UserLayoutComponent,
      ),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/user/dashboard/user-dashboard.component').then(
            (m) => m.UserDashboardComponent,
          ),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./features/user/profile/user-profile.component').then(
            (m) => m.UserProfileComponent,
          ),
      },
      {
        path: 'my-courses',
        loadComponent: () =>
          import('./features/user/my-courses/my-courses.component').then(
            (m) => m.MyCoursesComponent,
          ),
      },
      {
        path: 'my-bookings',
        loadComponent: () =>
          import('./features/user/my-bookings/my-bookings.component').then(
            (m) => m.MyBookingsComponent,
          ),
      },
      {
        path: 'payment-history',
        loadComponent: () =>
          import('./features/user/payment-history/payment-history.component').then(
            (m) => m.PaymentHistoryComponent,
          ),
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },

  // ─── Admin Area ─────────────────────────────────────────────────────────────
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./core/layout/admin-layout/admin-layout.component').then(
        (m) => m.AdminLayoutComponent,
      ),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/admin/dashboard/admin-dashboard.component').then(
            (m) => m.AdminDashboardComponent,
          ),
      },
      {
        path: 'courses',
        loadComponent: () =>
          import('./features/admin/courses/admin-courses.component').then(
            (m) => m.AdminCoursesComponent,
          ),
      },
      {
        path: 'specialists',
        loadComponent: () =>
          import('./features/admin/specialists/admin-specialists.component').then(
            (m) => m.AdminSpecialistsComponent,
          ),
      },
      {
        path: 'bookings',
        loadComponent: () =>
          import('./features/admin/bookings/admin-bookings.component').then(
            (m) => m.AdminBookingsComponent,
          ),
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./features/admin/users/admin-users.component').then(
            (m) => m.AdminUsersComponent,
          ),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./features/admin/settings/admin-settings.component').then(
            (m) => m.AdminSettingsComponent,
          ),
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },

  { path: '**', redirectTo: '' },
];
