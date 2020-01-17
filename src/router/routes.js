
const routes = [
  {
    path: '/',
    component: () => import('layouts/Layout.vue'),
    children: [
      {
        path: '', component: () => import('pages/Index.vue'),
      },
    ],
  },
];

routes.push({
  path: '*',
  redirect: {
    path: '/',
  },
});

export default routes;
