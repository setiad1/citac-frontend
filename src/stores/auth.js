// /store/user.js
import cookies from "vue-cookies";
import router from "@/router";
import axios from "axios";
import { defineStore } from "pinia";
import setAuthHeader from "@/utils/setAuthHeader";

export const authStore = defineStore("auth", {
    state: () => ({
        userInfo: null,
    }),
    getters: {
        getUserInfo: (state) => state.userInfo,
    },
    actions: {
        async fetchUser() {
            // setAuthHeader(cookies.get('token'));
            await axios.get("data/user.json", {
                // headers: { Authorization: `Bearer ${cookies.get('token')}` }
            }).then((res) => {
                this.userInfo = res.data;
                console.log(this.userInfo);
            }).catch((res) => {
                // cookies.remove('token');
                this.userInfo = null;
            })
        },
        async userExit() {
            // cookies.remove('token');
            this.userInfo = null;
            router.push('/user-login');
        }
    }
});