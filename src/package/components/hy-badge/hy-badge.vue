<template>
  <text
    v-if="show && ((Number(value) === 0 ? showZero : true) || isDot)"
    :class="[
      'hy-badge',
      isDot ? 'hy-badge--dot' : 'hy-badge--not-dot',
      inverted && 'hy-badge--inverted',
      shape === 'horn' && 'hy-badge--horn',
      `hy-badge--${type}${inverted ? '--inverted' : ''}`,
    ]"
    :style="[customStyle, badgeStyle]"
    >{{ isDot ? "" : showValue }}</text
  >
</template>

<script lang="ts">
export default {
  name: 'hy-badge',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script setup lang="ts">
import type IProps from "./typing";
import defaultProps from "./props";
import { computed, type CSSProperties, toRefs } from "vue";
import { addUnit } from "../../utils";

const props = withDefaults(defineProps<IProps>(), defaultProps);
const {
  value,
  bgColor,
  color,
  numberType,
  absolute,
  offset,
  inverted,
  max,
  customStyle,
} = toRefs(props);
const emit = defineEmits(["click"]);

/**
 * @description 整个组件的样式
 * */
const badgeStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {};
  if (color.value) {
    style.color = color.value;
  }
  if (bgColor.value && !inverted.value) {
    style.backgroundColor = bgColor.value;
  }
  if (absolute.value) {
    style.position = "absolute";
    // 如果有设置offset参数
    if (offset.value && Array.isArray(offset.value)) {
      // top和right分为为offset的第一个和第二个值，如果没有第二个值，则right等于top
      const top = offset.value[0];
      const right = offset.value[1] || top;
      style.top = addUnit(top);
      style.left = addUnit(right);
    }
  }
  return style;
});
/**
 * @description 显示值
 * */
const showValue = computed(() => {
  switch (numberType.value) {
    case "overflow":
      return Number(value.value) > Number(max.value)
        ? max.value + "+"
        : value.value;
    case "ellipsis":
      return Number(value.value) > Number(max.value) ? "..." : value.value;
    case "limit":
      return Number(value.value) > 999
        ? Number(value.value) >= 9999
          ? Math.floor((value.value / 1e4) * 100) / 100 + "w"
          : Math.floor((value.value / 1e3) * 100) / 100 + "k"
        : value.value;
    default:
      return Number(value.value);
  }
});
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
