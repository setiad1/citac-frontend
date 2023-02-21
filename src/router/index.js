import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/templates/Login.vue'
import First from '@/templates/First.vue'
import { authStore } from '@/stores/auth'

const routes = [
    {
        path: '/user-login',
        name: 'login',
        meta: { layout: Login, 'name': 'User Login' },
        component: () => import('../views/LoginView.vue')
    },
    {
        path: '/',
        name: 'home',
        meta: { layout: First, 'name': 'Home' },
        component: () => import('../views/HomeView.vue')
    },
    {
        path: '/tool-101',
        name: 'Tool 101',
        meta: { layout: First, 'name': 'Tool 101' },
        component: () => import('../views/Tool101View.vue')
    },
    {
        path: '/tool-102',
        name: 'Tool 102',
        meta: { layout: First, 'name': 'Tool 102' },
        component: () => import('../views/Tool102View.vue')
    },
    {
        path: '/tool-103',
        name: 'Tool 103',
        meta: { layout: First, 'name': 'Tool 103' },
        component: () => import('../views/Tool103View.vue')
    },
    {
        path: '/doc',
        name: 'Doc',
        meta: { layout: First, 'name': 'Documentation' },
        component: () => import('../views/DocDevView.vue')
    },
    {
        path: '/doc-dev',
        name: 'Docdev',
        meta: { layout: First, 'name': 'Documentation for Developer' },
        component: () => import('../views/DocDevView.vue')
    },
    {
        path: '/doc-user',
        name: 'Docuser',
        meta: { layout: First, 'name': 'Documentation for User' },
        component: () => import('../views/DocUserView.vue')
    },
    {
        path: '/users-list',
        name: 'Users List',
        meta: { layout: First, 'name': 'List of Users' },
        component: () => import('../views/UsersView.vue')
    }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async to => {
    const store = authStore();
    store.fetchUserDev();
    // store.fetchUser();


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


