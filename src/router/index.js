import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/components/pages/Home')
  },
  {
    path: '/browse',
    name: 'browse',
    component: () => import('@/components/pages/Browse')
  },
  {
    path: '/emote/:id',
    name: 'emote',
    component: () => import('@/components/pages/Emote')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/components/pages/Login')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/components/pages/Register')
  },
  {
    path: '/mycollections',
    name: 'mycollections',
    component: () => import('@/components/pages/MyCollections')
  },
  {
    path: '/collections',
    name: 'collections',
    component: () => import('@/components/pages/Collections')
  },
  {
    path: '/collection/:id',
    name: 'collection',
    component: () => import('@/components/pages/Collection')
  },
  {
    path: '*',
    redirect: '/'
  }
];

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
