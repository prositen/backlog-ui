import './assets/main.css';
import axios from 'axios';
import { createApp } from 'vue';
import { createPinia } from 'pinia'
import App from './App.vue';

axios.defaults.baseURL = 'http://localhost:8000/';
const pinia = createPinia()
const app = createApp(App)
app.use(pinia);
app.mount('#app');




