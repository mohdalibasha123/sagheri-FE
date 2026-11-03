import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, delay, map, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserRole } from '../enums';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly base = environment.apiBaseUrl;

  get<T>(path: string, params?: Record<string, string | number | boolean>): Observable<T> {
    if (environment.enableMockApi) {
      return this.mock<T>('GET', path);
    }

    const httpParams = params ? new HttpParams({ fromObject: params as Record<string, string> }) : undefined;
    return this.http.get<T>(`${this.base}${path}`, { params: httpParams }).pipe(map((response) => this.unwrap<T>(response)));
  }

  post<T>(path: string, body: unknown): Observable<T> {
    if (environment.enableMockApi) {
      return this.mock<T>('POST', path, body);
    }

    return this.http.post<T>(`${this.base}${path}`, body).pipe(map((response) => this.unwrap<T>(response)));
  }

  put<T>(path: string, body: unknown): Observable<T> {
    if (environment.enableMockApi) {
      return this.mock<T>('PUT', path, body);
    }

    return this.http.put<T>(`${this.base}${path}`, body).pipe(map((response) => this.unwrap<T>(response)));
  }

  patch<T>(path: string, body: unknown): Observable<T> {
    if (environment.enableMockApi) {
      return this.mock<T>('PATCH', path, body);
    }

    return this.http.patch<T>(`${this.base}${path}`, body).pipe(map((response) => this.unwrap<T>(response)));
  }

  delete<T>(path: string): Observable<T> {
    if (environment.enableMockApi) {
      return this.mock<T>('DELETE', path);
    }

    return this.http.delete<T>(`${this.base}${path}`).pipe(map((response) => this.unwrap<T>(response)));
  }

  private unwrap<T>(response: unknown): T {
    if (response && typeof response === 'object' && 'success' in response && 'data' in response) {
      return (response as { data: T }).data;
    }
    return response as T;
  }

  private mock<T>(method: string, path: string, body?: unknown): Observable<T> {
    const response = this.resolveMock(method, path, body);
    return of(response as T).pipe(delay(250));
  }

  private resolveMock(method: string, path: string, body?: unknown): unknown {
    const now = new Date().toISOString();

    if (path === '/auth/login' && method === 'POST') {
      const request = body as { email?: string };
      const isAdmin = request.email?.toLowerCase().includes('admin') ?? false;
      const user = {
        id: isAdmin ? 'admin-1' : 'user-1',
        firstName: isAdmin ? 'مدير' : 'مستخدمة',
        lastName: 'صغيري',
        email: request.email || 'user@sagheri.local',
        phone: '+962700000000',
        country: 'JO',
        roles: [isAdmin ? UserRole.ADMIN : UserRole.USER],
        permissions: isAdmin ? ['admin:read', 'admin:write'] : [],
        createdAt: now,
      };

      return {
        accessToken: `mock-access-${user.id}`,
        refreshToken: `mock-refresh-${user.id}`,
        user,
      };
    }

    if (path === '/auth/register' && method === 'POST') {
      const request = body as {
        firstName?: string;
        lastName?: string;
        email?: string;
        phone?: string;
        country?: string;
      };

      return {
        accessToken: 'mock-access-user-registered',
        refreshToken: 'mock-refresh-user-registered',
        user: {
          id: 'user-registered',
          firstName: request.firstName || 'مستخدمة',
          lastName: request.lastName || 'جديدة',
          email: request.email || 'new-user@sagheri.local',
          phone: request.phone,
          country: request.country || 'JO',
          roles: [UserRole.USER],
          permissions: [],
          createdAt: now,
        },
      };
    }

    if (path === '/auth/refresh') {
      return { accessToken: 'mock-access-refreshed' };
    }

    if (path === '/auth/me' || path === '/user/profile') {
      return {
        id: 'user-1',
        firstName: 'مستخدمة',
        lastName: 'صغيري',
        email: 'user@sagheri.local',
        phone: '+962700000000',
        country: 'JO',
        roles: [UserRole.USER],
        permissions: [],
        createdAt: now,
      };
    }

    if (path === '/auth/forgot-password' || path === '/auth/reset-password') {
      return undefined;
    }

    if (path === '/courses') {
      return [
        { id: '1', slug: 'preparing-before-pregnancy', titleAr: 'التحضير قبل الحمل', price: 150 },
        { id: '2', slug: 'pregnancy-trimesters', titleAr: 'مراحل الحمل الثلاث', price: 150 },
        { id: '3', slug: 'postpartum-breastfeeding', titleAr: 'بعد الولادة والرضاعة', price: 150 },
      ];
    }

    if (path.startsWith('/courses/')) {
      return { id: path.split('/').pop(), titleAr: 'كورس صغيري', price: 150, currency: 'JOD' };
    }

    if (path === '/specialists') {
      return [
        { id: '1', nameAr: 'بيان القضماني', titleAr: 'استشارية رضاعة دولية IBCLC' },
        { id: '2', nameAr: 'أخصائية علاج طبيعي', titleAr: 'تأهيل الحوض وما بعد الولادة' },
      ];
    }

    if (path.startsWith('/specialists/')) {
      return { id: path.split('/')[2], nameAr: 'بيان القضماني', titleAr: 'استشارية رضاعة دولية IBCLC' };
    }

    if (path === '/consultation-bookings' && method === 'POST') {
      return { id: `booking-${Date.now()}`, status: 'PENDING', ...this.asRecord(body), createdAt: now };
    }

    if (path === '/payments/initiate' && method === 'POST') {
      return {
        reference: `mock-payment-${Date.now()}`,
        status: 'INITIATED',
        redirectUrl: '/payment/success?mock=true',
      };
    }

    if (path.startsWith('/payments/')) {
      return { reference: path.split('/').pop(), status: 'PAID', paidAt: now };
    }

    if (path.startsWith('/admin/')) {
      return this.mockAdmin(path);
    }

    if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
      return { id: `mock-${Date.now()}`, ...this.asRecord(body), createdAt: now };
    }

    if (method === 'DELETE') {
      return { success: true };
    }

    return [];
  }

  private mockAdmin(path: string): unknown {
    if (path === '/admin/dashboard') {
      return {
        totalCourses: 3,
        activeCourses: 3,
        newBookings: 8,
        pendingPurchases: 4,
        paidPurchases: 19,
        newMessages: 5,
        totalUsers: 126,
        totalRevenue: 2850,
      };
    }

    return [
      { id: '1', nameAr: 'عنصر تجريبي', status: 'ACTIVE', updatedAt: new Date().toISOString() },
      { id: '2', nameAr: 'عنصر تجريبي آخر', status: 'DRAFT', updatedAt: new Date().toISOString() },
    ];
  }

  private asRecord(value: unknown): Record<string, unknown> {
    return value && typeof value === 'object' ? (value as Record<string, unknown>) : {};
  }
}
