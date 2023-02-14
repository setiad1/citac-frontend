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

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(VueAxios, axios)
app.use(VueCookies, { expires: '1d'})
app.use(LoadingPlugin)
app.mount("#app")
