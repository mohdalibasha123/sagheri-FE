export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    refresh: '/auth/refresh',
    me: '/auth/me',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
    verifyAccount: '/auth/verify',
  },
  courses: {
    list: '/courses',
    detail: (idOrSlug: string) => `/courses/${idOrSlug}`,
    purchase: (id: string) => `/courses/${id}/purchase`,
  },
  specialists: {
    list: '/specialists',
    detail: (id: string) => `/specialists/${id}`,
    availability: (id: string) => `/specialists/${id}/availability`,
  },
  consultationTypes: {
    list: '/consultation-types',
    bySpecialist: (id: string) => `/specialists/${id}/consultation-types`,
  },
  bookings: {
    create: '/consultation-bookings',
    list: '/consultation-bookings',
    detail: (id: string) => `/consultation-bookings/${id}`,
  },
  payments: {
    initiate: '/payments/initiate',
    status: (reference: string) => `/payments/${reference}`,
    callback: '/payments/callback',
  },
  faq: {
    list: '/faq',
  },
  reviews: {
    list: '/reviews',
  },
  contact: {
    create: '/contact-messages',
  },
  cms: {
    pages: '/cms/pages',
    page: (key: string) => `/cms/pages/${key}`,
    settings: '/cms/settings',
    staticContentSnapshot: '/cms/static-content-snapshot',
    staticContentSnapshotJson: '/cms/static-content-snapshot.json',
  },
  user: {
    profile: '/user/profile',
    myCourses: '/user/courses',
    myBookings: '/user/bookings',
    paymentHistory: '/user/payments',
  },
  admin: {
    dashboard: '/admin/dashboard',
    courses: {
      list: '/admin/courses',
      detail: (id: string) => `/admin/courses/${id}`,
    },
    lessons: {
      byCourse: (courseId: string) => `/admin/courses/${courseId}/lessons`,
      detail: (id: string) => `/admin/lessons/${id}`,
    },
    specialists: {
      list: '/admin/specialists',
      detail: (id: string) => `/admin/specialists/${id}`,
    },
    consultationTypes: {
      list: '/admin/consultation-types',
      detail: (id: string) => `/admin/consultation-types/${id}`,
    },
    availability: {
      list: '/admin/availability',
      bySpecialist: (id: string) => `/admin/specialists/${id}/availability`,
    },
    bookings: {
      list: '/admin/bookings',
      detail: (id: string) => `/admin/bookings/${id}`,
    },
    purchases: {
      list: '/admin/purchases',
      detail: (id: string) => `/admin/purchases/${id}`,
    },
    faq: {
      list: '/admin/faq',
      detail: (id: string) => `/admin/faq/${id}`,
    },
    reviews: {
      list: '/admin/reviews',
      detail: (id: string) => `/admin/reviews/${id}`,
    },
    contactMessages: {
      list: '/admin/contact-messages',
      detail: (id: string) => `/admin/contact-messages/${id}`,
    },
    users: {
      list: '/admin/users',
      detail: (id: string) => `/admin/users/${id}`,
    },
    roles: {
      list: '/admin/roles',
      detail: (id: string) => `/admin/roles/${id}`,
    },
    permissions: {
      list: '/admin/permissions',
    },
    media: {
      list: '/admin/media',
      upload: '/admin/media/upload',
      delete: (id: string) => `/admin/media/${id}`,
    },
    cms: {
      pages: '/admin/cms/pages',
      page: (id: string) => `/admin/cms/pages/${id}`,
    },
    settings: '/admin/settings',
    auditLogs: '/admin/audit-logs',
    translations: '/admin/translations',
  },
} as const;
