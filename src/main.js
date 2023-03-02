import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

import axios from 'axios';
import VueAxios from 'vue-axios'
import VueCookies from 'vue-cookies'
import { LoadingPlugin } from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import PageHeader from "@/components/PageHeader";
import {Tabs, Tab} from 'vue3-tabs-component';

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(router)

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL_API
app.use(VueAxios, axios)
app.use(VueCookies, { expires: '1d'})
app.use(LoadingPlugin)
app.component('page-header', PageHeader)
app.component('tabs', Tabs)
app.component('tab', Tab)
app.mount("#app")
