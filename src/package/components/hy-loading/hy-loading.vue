<template>
  <view
    class="hy-loading-icon"
    :style="customStyle"
    :class="[vertical && 'hy-loading-icon--vertical']"
    v-if="show"
  >
    <view
      v-if="!webviewHide"
      class="hy-loading-icon__spinner"
      :class="[`hy-loading-icon__spinner--${mode}`]"
      ref="ani"
      :style="{
        color: color,
        width: addUnit(size),
        height: addUnit(size),
        borderTopColor: color,
        borderBottomColor: otherBorderColor,
        borderLeftColor: otherBorderColor,
        borderRightColor: otherBorderColor,
        'animation-duration': `${duration}ms`,
        'animation-timing-function':
          mode === 'semicircle' || mode === 'circle' ? timingFunction : '',
      }"
    >
      <block v-if="mode === 'spinner'">
        <!-- #ifndef APP-NVUE -->
        <view
          v-for="(item, index) in array12"
          :key="index"
          class="hy-loading-icon__dot"
        >
        </view>
        <!-- #endif -->
      </block>
    </view>
    <text
      v-if="text"
      class="hy-loading-icon__text"
      :style="{
        fontSize: addUnit(textSize),
        color: textColor,
      }"
      >{{ text }}</text
    >
  </view>
</template>

<script lang="ts">
export default {
  name: 'hy-loading',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script setup lang="ts">
import defaultProps from "./props";
import type IProps from "./typing";
import { toRefs, ref, computed } from "vue";
import { addUnit, colorGradient } from "../../utils";

const props = withDefaults(defineProps<IProps>(), defaultProps);
const { show, size, color, mode, inactiveColor } = toRefs(props);
const emit = defineEmits(["update:modelValue", "change"]);

//动画旋转角度
const aniAngel = ref(360);
const array12 = Array.from({
  length: 12,
});
const webviewHide = ref(false);

const otherBorderColor = computed(() => {
  const lightColor = colorGradient(color.value, "#ffffff", 100)[80];
  if (mode.value === "circle") {
    return inactiveColor.value ? inactiveColor.value : lightColor;
  } else {
    return "transparent";
  }
});

// 监听webview的显示与隐藏
// const addEventListenerToWebview = () => {
//   // webview的堆栈
//   const pages = getCurrentPages()
//   // 当前页面
//   const page = pages[pages.length - 1]
//   // 当前页面的webview实例
//   const currentWebview = page.$getAppWebview()
//   // 监听webview的显示与隐藏，从而停止或者开始动画(为了性能)
//   currentWebview.addEventListener('hide', () => {
//     webviewHide.value = true
//   })
//   currentWebview.addEventListener('show', () => {
//     webviewHide.value = false
//   })
// }
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
