<template>
  <view class="hy-divider" :style="dividerStyle" @tap="clickHandler">
    <HyLine
      :color="lineColor"
      :customStyle="leftLineStyle"
      :style="leftLineStyle"
      :hairline="hairline"
      :dashed="dashed"
    ></HyLine>
    <HyLoading :show="text === 'loading'" size="18" mode="spinner"></HyLoading>
    <text v-if="dot" class="hy-divider__dot">●</text>
    <text v-else-if="text" class="hy-divider__text" :style="textStyle">{{
      content
    }}</text>
    <HyLine
      :color="lineColor"
      :customStyle="rightLineStyle"
      :style="rightLineStyle"
      :hairline="hairline"
      :dashed="dashed"
    ></HyLine>
  </view>
</template>

<script lang="ts">
export default {
  name: 'hy-divider',
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

// 组件
import HyLine from "../hy-line/hy-line.vue";
import HyLoading from "../hy-loading/hy-loading.vue";

const props = withDefaults(defineProps<IProps>(), defaultProps);
const {
  text,
  textSize,
  textColor,
  textPosition,
  dashed,
  lineColor,
  loadMoreText,
  loadingText,
  noMoreText,
  marginTop,
  marginBottom,
  customStyle,
} = toRefs(props);
const emit = defineEmits(["click"]);

const isLoad = ["loadMore", "loading", "noMore"].includes(text.value);

/**
 * @description 分割线样式
 * */
const dividerStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {};
  style.marginTop =
    addUnit(marginTop.value) || isLoad ? "20px" : addUnit(marginTop.value);
  style.marginBottom =
    addUnit(marginBottom.value) || isLoad
      ? "20px"
      : addUnit(marginBottom.value);
  return Object.assign(style, customStyle.value);
});
/**
 * @description 文本内容
 * */
const content = computed(() => {
  let text = "";
  switch (props.text) {
    case "loadMore":
      text = loadMoreText.value;
      break;
    case "loading":
      text = loadingText.value;
      break;
    case "noMore":
      text = noMoreText.value;
      break;
    default:
      text = props.text;
      break;
  }
  return text;
});
/**
 * @description 文本内容样式
 * */
const textStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {};
  style.fontSize = addUnit(textSize.value);
  style.color = textColor.value;
  return style;
});

/**
 * @description 左边线条的的样式
 * */
const leftLineStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    marginRight: "20rpx",
  };
  // 如果是在左边，设置左边的宽度为固定值
  if (isLoad) {
    style.width = "80px";
  } else if (textPosition.value === "left") {
    style.width = "80rpx";
  } else {
    style.flex = 1;
  }
  return style;
});
/**
 * @description 右边线条的的样式
 * */
const rightLineStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    marginLeft: "20rpx",
  };
  // 如果是在右边，设置右边的宽度为固定值
  if (isLoad) {
    style.width = "80px";
  } else if (textPosition.value === "right") {
    style.width = "80rpx";
  } else {
    style.flex = 1;
  }
  return style;
});
const clickHandler = () => {
  emit("click");
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
