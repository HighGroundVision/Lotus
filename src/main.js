import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueToast from 'vue-toast-notification'

import '@/assets/waves.css'
import '@/assets/tooltips.css'
import '@vueform/slider/themes/default.css'
import '@vueform/toggle/themes/default.css'
import '@vueform/multiselect/themes/default.css'
import '@/assets/vueform.css'
import 'vue-toast-notification/dist/theme-sugar.css'

createApp(App).use(store).use(router).use(VueToast).mount('#app')
