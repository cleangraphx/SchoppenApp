import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import ViewView from '@/views/ViewView.vue'
import InputTeilnehmerView from '@/views/InputTeilnehmerView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
	    meta: { requiresAuth: true}
    },
	  {
		  path: '/login',
		  name: 'login',
		  component: LoginView
	  },
    {
      path: '/view',
      name: 'view',
      component: ViewView,
      meta: { requiresAuth: true }
    },
    {
      path: '/input/teilnehmer',
      name: 'teilnehmer-input',
      component: InputTeilnehmerView,
      meta: { requiresAuth: true }
    }
  ],
})

router.beforeEach((to, from, next) => {
	const token = localStorage.getItem('token');
	if (to.meta.requiresAuth && !token) {
		next('/login');
	} else {
		next();
	}
})

export default router
