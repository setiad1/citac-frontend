<template>
    <div id="header">
        <div class="container is-fluid p-32">
            <nav class="navbar" role="navigation" aria-label="main navigation">
                <div class="navbar-brand">
                    <router-link class="navbar-item" to="/">
                        <img alt="Logo" src="../../assets/images/citac.png" height="28">
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
                                            <router-link :to="i.to" class="navbar-item" v-on:click="smClicked($event)">{{ i.label }}</router-link>
                                        </template>
                                    </div>
                                </div>
                            </template>
                        </template>
                        <a 
                            href="../" 
                            class="navbar-item has-text-success has-text-weight-bold is-size-7">
                            <i class="fa-light fa-up-right-from-square"></i>&nbsp;&nbsp;CITAC
                        </a>
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
        this.menus = require('@/data/menu.json');
        // this.axios.get("data/menu.json", {
        // }).then((res) => {
        //     this.menus = res.data;
        //     // for (var i in this.menus) {
        //     //     console.log(this.menus[i]);
        //     //     if (Object.keys(this.menus[i].children).length !== 0) {
        //     //         for (var j in this.menus[i].children) {
        //     //             console.log(this.menus[i].children[j].label);
        //     //         }
        //     //     }
        //     // }
        // }).catch((res) => {
        //     console.log(res.data);
        // });
    },
    methods: {
        userExit: async function () {
            if (process.env.NODE_ENV === 'production') {
                await this.store.userExit();
            } else {
                await this.store.userExitDev();
            }
            // await this.store.userExitDev();
            // await this.store.userExit();
        },
        smClicked: function(e) {
            console.log(this.$event);
        }
    },
    components: { Sidebar }
}
</script>