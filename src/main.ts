import '@/style/index.scss'
import { VueQueryPlugin } from '@tanstack/vue-query'
import 'virtual:uno.css'
import { createSSRApp } from 'vue';
import store from "@/store"

import App from './App.vue'
import { prototypeInterceptor, requestInterceptor, routeInterceptor } from './interceptors'

export function createApp() {
  const app = createSSRApp(App);
  app.use(store)
  app.use(routeInterceptor)
  app.use(requestInterceptor)
  app.use(prototypeInterceptor)
  app.use(VueQueryPlugin)

  return {
    app,
  }
}
