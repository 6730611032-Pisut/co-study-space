const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('pages/LoginPage.vue'),
  },

  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: { name: 'home' } },
      {
        path: 'home',
        name: 'home',
        component: () => import('pages/HomePage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'spaces',
        name: 'spaces',
        component: () => import('pages/StudySpacePage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'bookings',
        name: 'bookings',
        component: () => import('pages/MyBookingPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'admin',
        name: 'admin',
        component: () => import('pages/AdminPage.vue'),
        meta: { requiresAuth: true, requiresAdmin: true },
      },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
