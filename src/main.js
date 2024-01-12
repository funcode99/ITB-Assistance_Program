import * as Vue from 'vue'
import axios from "axios";
import VueAxios from "vue-axios";
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"
import './index.css'

const apps = Vue.createApp(App)

apps.provide('axios', apps.config.globalProperties.axios)
apps.use(store).use(router).use(Toast, {}).use(VueAxios, axios).mount('#app')
