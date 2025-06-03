import { createSSRApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import { useShare } from "@/package";

import { createUnistorage } from "pinia-plugin-unistorage";

export function createApp() {
  const app = createSSRApp(App);
  const pinia = createPinia();

  pinia.use(createUnistorage());
  app.use(pinia);
  app.mixin(
    useShare({
      title: "华玥组件库",
    }),
  );
  return {
    app,
  };
}
