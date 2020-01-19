import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes: [
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
          path: '/:subjectId',
          name: 'show',
          component: () => import('pages/Show.vue'),
        },
      ],
    },
  ],
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE,
});
