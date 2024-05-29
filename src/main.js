import './assets/main.css';
import axios from 'axios';
import {createApp} from 'vue';
import {createPinia} from 'pinia'
import {createHead} from "@unhead/vue";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import App from './App.vue';

axios.defaults.baseURL = import.meta.env.VITE_BACKLOG_REPORT_URL
const pinia = createPinia()
const app = createApp(App)
const head = createHead();
app.use(head);
app.use(pinia);
app.use(ElementPlus);
app.mount('#app');




