import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('./pages/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('./pages/Register.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('./pages/Home.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router 