<template>
  <HyTransition
    :show="show"
    custom-class="hy-overlay"
    :duration="duration"
    :custom-style="overlayStyle"
    @click="clickHandler"
  >
    <slot />
  </HyTransition>
</template>

<script setup lang="ts">
import { computed, type CSSProperties, toRefs } from "vue";
import defaultProps from "./props";
import type IProps from "./typing";
import HyTransition from "../hy-transition/hy-transition.vue";

const props = withDefaults(defineProps<IProps>(), defaultProps);
const { customStyle, opacity, zIndex } = toRefs(props);
const emit = defineEmits(["click"]);

const overlayStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: zIndex?.value,
    bottom: 0,
    "background-color": `rgba(0, 0, 0, ${opacity.value})`,
  };
  return Object.assign(style, customStyle.value || {});
});
const clickHandler = () => {
  emit("click");
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
