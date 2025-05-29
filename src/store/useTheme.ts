import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { colorGradient } from "@/package";

export const useThemeStore = defineStore(
  "hy_theme",
  () => {
    const color = ref("#892FE8");
    const lightColor = computed(() => {
      return colorGradient(
        color.value,
        darkMode.value === "dark" ? "#000000" : "#ffffff",
      )[90];
    });
    const themeColor = ref({
      "--hy-theme-color": color.value,
      "--hy-theme--light": lightColor,
    });

    const darkMode = ref("dark");
    console.log(darkMode.value);

    return {
      color,
      themeColor,
      darkMode,
      lightColor,
    };
  },
  { unistorage: true },
);
