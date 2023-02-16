<template>
    <div id="header">
        <div class="container is-fluid p-32">
            <nav class="navbar" role="navigation" aria-label="main navigation">
                <div class="navbar-brand">
                    <router-link class="navbar-item" to="/">
                        <img alt="Logo" src="../../assets/images/add-512.png" height="28">
                    </router-link>
                    <a role="button" data="1" id="nav1" class="navix navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
                
                <div class="navbar-menu">
                    <div class="navbar-start">
                        <template v-for="(item, index) in menus" :key="index">
                            <template v-if="Object.keys(item.children).length === 0">
                                <router-link class="navbar-item"  :to="item.to">{{ item.label }}</router-link>
                            </template>
                            <template v-else>
                                <div class="navbar-item has-dropdown is-hoverable">
                                    <div class="navbar-link">{{ item.label }}</div>
                                    <div class="navbar-dropdown">
                                        <template v-for="(i, x) in item.children" :key="x">
                                            <router-link :to="i.to" class="navbar-item">{{ i.label }}</router-link>
                                        </template>
                                    </div>
                                </div>
                            </template>
                        </template>
                        <!-- <router-link class="navbar-item" to="/">Home</router-link>
                        <div class="navbar-item has-dropdown is-hoverable">
                            <div class="navbar-link">Tools</div>
                            <div class="navbar-dropdown">
                                <router-link to="/dashboard-100" class="navbar-item">Tools 100</router-link>
                                <router-link to="/dashboard-101" class="navbar-item">Tools 101</router-link>
                                <hr class="navbar-divider">
                                <router-link to="#" class="navbar-item has-text-danger">Peta Wilayah Indonesia</router-link>
                            </div>
                        </div> -->
                    </div>
                    
                    <div class="navbar-end">
                        <div class="navbar-item">
                            <div class="buttons">
                                <a class="button is-small has-background-white has-text-dark">
                                    <strong>Hi.. {{ store?.userInfo?.nama }}</strong>
                                </a>
                                <span class="button is-small is-outlined is-danger" v-on:click="userExit">
                                    <i class="fa-solid fa-right-from-bracket"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- mobile sidebar -->
                <Sidebar />
            </nav>
        </div>
    </div>
</template>

<script>
import { authStore } from '@/stores/auth';
import Sidebar from './Sidebar.vue';
export default {
    name: "Header",
    setup() {
        const store = authStore();
        return { store };
    },
    data() {
        return {
            name: null,
            menus: {}
        };
    },
    mounted() {
        this.axios.get("data/menu.json", {
        }).then((res) => {
            this.menus = res.data;
            // for (var i in this.menus) {
            //     console.log(this.menus[i]);
            //     if (Object.keys(this.menus[i].children).length !== 0) {
            //         for (var j in this.menus[i].children) {
            //             console.log(this.menus[i].children[j].label);
            //         }
            //     }
            // }
        }).catch((res) => {
            console.log(res.data);
        });
    },
    methods: {
        userExit: async function () {
            await this.store.userExitDev();
            // await this.store.userExit();
        }
    },
    components: { Sidebar }
}
</script>