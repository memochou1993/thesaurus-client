const routes = [
  {
    path: '/',
    component: () => import('layouts/Layout.vue'),
    children: [
      {
        path: '/',
        name: 'index',
        component: () => import('pages/Index.vue'),
      },
      {
        path: '/:id',
        name: 'show',
        component: () => import('pages/Show.vue'),
      },
    ],
  },
];

export default routes;
