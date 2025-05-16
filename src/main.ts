import { createSSRApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import { useShare } from "@/package";

export function createApp() {
  const app = createSSRApp(App);

  app.use(createPinia());
  app.mixin(
    useShare({
      title: "华玥组件库",
    }),
  );
  return {
    app,
  };
}
