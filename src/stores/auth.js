import router from "@/router";
import axios from "axios";
import { defineStore } from "pinia";
import cookies from "vue-cookies";

export const authStore = defineStore("auth", {
    state: () => ({
        userInfo: null,
    }),
    getters: {
        getUserInfo: (state) => state.userInfo,
    },
    actions: {
        async fetchUser() {
            // production
            await axios.get("../ext_be/api/user-info", {
            }).then((res) => {
                this.userInfo = res.data;
            }).catch((res) => {
                cookies.remove('PHPSESSID');
                this.userInfo = null;
                // router.push('http://gis.beacukai.go.id:911/');
                window.location.href = 'http://gis.beacukai.go.id:911/';
            });
        },
        async userExit() {
            cookies.remove('PHPSESSID');
            this.userInfo = null;
            // router.push('http://gis.beacukai.go.id:911/');
            window.location.href = 'http://gis.beacukai.go.id:911/';
        },
        async fetchUserDev() {
            await axios.get("data/user.json", {
            }).then((res) => {
                this.userInfo = res.data;
            }).catch((res) => {
                this.userInfo = null;
                router.push('/user-login');
            })
        },
        async userExitDev() {
            this.userInfo = null;
            router.push('/user-login');
        }
    }
});