<template>
  <view :class="themeClass" :style="themeStyle">
    <slot />
  </view>
</template>

<script lang="ts">
export default {
  name: "hy-config-provider",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared",
  },
};
</script>

<script setup lang="ts">
import { computed, toRefs } from "vue";
import type IProps from "./typing";
import defaultProps from "./props";
import { addUnit } from "@/package";
import { colorGradient } from "@/package/utils";

const props = withDefaults(defineProps<IProps>(), defaultProps);
const {
  theme,
  themeColor,
  themeLightColor,
  customClass,
  customStyle,
  padding,
} = toRefs(props);

const themeClass = computed(() => {
  return [customClass.value, "hy-config-provider", `hy-theme--${theme.value}`];
});

const themeStyle = computed(() => {
  return [
    {
      "--hy-theme-color": themeColor.value,
      "--hy-theme--light": colorGradient(themeColor.value)[90],
      padding: addUnit(padding.value),
    },
    customStyle.value,
  ];
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
