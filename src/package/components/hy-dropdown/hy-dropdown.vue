<template>
  <view class="hy-dropdown" :style="dropdownStyle">
    <slot></slot>
  </view>
</template>

<script lang="ts">
export default {
  name: 'hy-dropdown',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script setup lang="ts">
import { provide, ref, computed, type CSSProperties, toRefs } from "vue";
import type IProps from "./typing";
import defaultProps from "./props";
import { addUnit } from "@/package";

const props = withDefaults(defineProps<IProps>(), defaultProps);
const { height, borderBottom } = toRefs(props);

//样式设置
const dropdownStyle = computed(() => {
  const style: CSSProperties = props.sticky
    ? {
        position: "fixed",
        left: 0,
        // #ifdef H5
        top: "44px",
        // #endif
        // #ifndef H5
        top: 0,
        // #endif
      }
    : {};
  style.height = addUnit(height.value);
  if (borderBottom.value) style.borderBottom = "1px solid #dadbde";

  return style;
});

//当前打开的项（以标题标识）
const currentDropItem = ref("");
provide("dropdownProps", props);
provide("currentDropItem", currentDropItem);
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
