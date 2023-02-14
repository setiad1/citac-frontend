<template>
    <div id="header">
        <div class="container is-max-desktop p-32">
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
                        <router-link class="navbar-item" to="/home">About</router-link>
                        <a class="navbar-item" target="_blank" href="https://api-tools.codex.id">API</a>
                    </div>
                    
                    <div class="navbar-end">
                        <div class="navbar-item">
                            <div class="buttons">
                                <a class="button is-small has-background-white has-text-primary">
                                    <!-- <strong>Hi.. {{ store?.userInfo?.name }}</strong> -->
                                </a>
                                <span class="button is-small is-outlined is-danger" v-on:click="userExit">
                                    <i class="fa-solid fa-right-from-bracket"></i>
                                </span>
                                <!-- <router-link to="/" class="exit button is-light">
                                    <i class="fa-brands fa-square-github"></i>
                                    <i class="fa-brands fa-github"></i>
                                </router-link> -->
                            </div>
                        </div>
                    </div>
                </div>

                <!-- mobile sidebar -->
            </nav>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Header',
    // setup() {
    //     const store = authStore();
    //     return { store };
    // },
    data() {
        return {
            name: null
        }
    },
    methods: {
        userExit: async function() {
            // await this.store.userExit();      
        }
    }
}
</script>