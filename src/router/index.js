import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/templates/Login.vue'
import First from '@/templates/First.vue'
import { authStore } from '@/stores/auth'

const routes = [
    {
        path: '/user-login',
        name: 'login',
        meta: { layout: Login },
        component: () => import('../views/LoginView.vue')
    },
    {
        path: '/',
        name: 'home',
        meta: { layout: First },
        component: () => import('../views/HomeView.vue')
    },
    {
        path: '/dashboard-100',
        name: 'dash100',
        meta: { layout: First },
        component: () => import('../views/Dash100View.vue')
    },
    {
        path: '/dashboard-101',
        name: 'dash101',
        meta: { layout: First },
        component: () => import('../views/Dash101View.vue')
    }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeResolve(async to => {
    const store = authStore();
    store.fetchUser();


    // const token = window.$cookies.get('token');
    // if (to.name !== 'Login') {
    //     const store = authStore();
    //     store.fetchUser();
    //     console.log('going to authenticated pages...');
    // } else {
    //     if (token) {
    //         router.push('/');
    //     }
    // }
});

export default router
