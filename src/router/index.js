import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
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
        component: () => import('../views/Home.vue')
    },
    {
        path: '/komoditi-impor',
        name: 'Komoditi Impor',
        meta: { layout: First, 'name': 'KOMODITI IMPOR' },
        component: () => import('../views/KomImporView.vue')
    },
    {
        path: '/komoditi-ekspor',
        name: 'Komoditi Ekspor',
        meta: { layout: First, 'name': 'KOMODITI EKSPOR' },
        component: () => import('../views/KomEksporView.vue')
    },
    {
        path: '/blokir',
        name: 'Blokir',
        meta: { layout: First, 'name': 'BLOKIR' },
        component: () => import('../views/BlokirView.vue')
    },
    // di bawah tidak ditampilkan
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
//   history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async to => {
    const store = authStore();
    if (process.env.NODE_ENV === 'production') {
        store.fetchUser();
    } else {
        store.fetchUserDev();
    }
    // store.fetchUserDev();
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


