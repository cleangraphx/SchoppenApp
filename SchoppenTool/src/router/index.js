import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import ViewView from '@/views/ViewView.vue'
import InputTeilnehmerView from '@/views/InputTeilnehmerView.vue'
import ZimmerView from '@/views/ZimmerView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
    },
    {
      path: '/zimmer',
      name: 'zimmer',
      component: ZimmerView
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
