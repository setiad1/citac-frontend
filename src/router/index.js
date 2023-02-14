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
