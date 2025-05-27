<template>
  <view class="hy-line" :style="lineStyle"> </view>
</template>

<script lang="ts">
export default {
  name: 'hy-line',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script setup lang="ts">
import { computed, type CSSProperties, toRefs } from "vue";
import defaultProps from "./props";
import type IProps from "./typing";
import { addUnit } from "../../utils";

const props = withDefaults(defineProps<IProps>(), defaultProps);
const { margin, length, dashed, direction, hairline, color, customStyle } =
  toRefs(props);

const lineStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {};
  style.margin = margin.value;
  // 如果是水平线条，边框高度为1px，再通过transform缩小一半，就是0.5px了
  if (direction.value === "row") {
    // 此处采用兼容分开写，兼容nvue的写法
    style.borderBottomWidth = "1px";
    style.borderBottomStyle = dashed.value ? "dashed" : "solid";
    style.width = addUnit(length.value);
    if (!hairline.value) style.borderBottomWidth = "1.5px";
  } else {
    // 如果是竖向线条，边框宽度为1px，再通过transform缩小一半，就是0.5px了
    style.borderLeftWidth = "1px";
    style.borderLeftStyle = dashed.value ? "dashed" : "solid";
    style.height = addUnit(length.value);
    if (hairline.value) style.transform = "scaleX(0.5)";
  }

  style.borderColor = color.value;
  return Object.assign(style, customStyle.value);
});
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
