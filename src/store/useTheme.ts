import { defineStore } from "pinia";
import { ref } from "vue";

export const useThemeStore = defineStore(
  "hy_theme",
  () => {
    const themeColor = ref({
      "--hy-theme-color": "#892FE8",
      "--hy-theme-color--light": "rgba(137, 47, 232, 0.3)",
    });
    const themeClass = ref(["hy-theme--dark"]);

    const darkMode = ref("dark");

    return {
      themeColor,
      themeClass,
      darkMode,
    };
  },
  { unistorage: true },
);
