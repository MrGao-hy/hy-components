<template>
  <hy-transition mode="slide-down" :customStyle="containerStyle" :show="open">
    <view
      class="hy-notify"
      :class="[`hy-notify--${tmpConfig?.type}`]"
      :style="[backgroundColor, customStyle]"
    >
      <hy-status-bar v-if="tmpConfig?.safeAreaInsetTop"></hy-status-bar>
      <view class="hy-notify--wrapper">
        <slot name="icon">
          <hy-icon
            v-if="['success', 'warning', 'error'].includes(tmpConfig.type)"
            :name="tmpConfig?.icon || icon"
            :color="tmpConfig?.color"
            :size="tmpConfig.fontSize"
            :customStyle="{ marginRight: '4px' }"
          ></hy-icon>
        </slot>
        <text
          class="hy-notify--wrapper__text"
          :style="{
            fontSize: addUnit(tmpConfig?.fontSize),
            color: tmpConfig?.color,
          }"
          >{{ tmpConfig?.message }}</text
        >
      </view>
    </view>
  </hy-transition>
</template>

<script lang="ts">
export default {
  name: "hy-notify",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared",
  },
};
</script>

<script setup lang="ts">
import type IProps from "./typing";
import defaultProps from "./props";
import { computed, type CSSProperties, ref } from "vue";
import { addUnit } from "../../utils";
// 组件
import HyTransition from "../hy-transition/hy-transition.vue";
import HyStatusBar from "../hy-status-bar/hy-status-bar.vue";
import HyIcon from "../hy-icon/hy-icon.vue";
import { IconConfig } from "@/package";

const props = withDefaults(defineProps<IProps>(), defaultProps);

const config = ref<IProps>({
  // 到顶部的距离
  top: props.top,
  // type主题，primary，success，warning，error
  type: props.type,
  // 字体颜色
  color: props.color,
  // 背景颜色
  bgColor: props.bgColor,
  // 展示的文字内容
  message: props.message,
  // 展示时长，为0时不消失，单位ms
  duration: props.duration,
  // 字体大小
  fontSize: props.fontSize,
  // 是否留出顶部安全距离（状态栏高度）
  safeAreaInsetTop: props.safeAreaInsetTop,
});
const tmpConfig = ref<IProps>({});
const open = ref(false);
let timer: ReturnType<typeof setTimeout>;

/**
 * @description 容器样式
 * */
const containerStyle = computed(() => {
  let top = 0;
  if (tmpConfig.value.top === 0) {
    // #ifdef H5
    // H5端，导航栏为普通元素，需要将组件移动到导航栏的下边沿
    // H5的导航栏高度为44px
    top = 44;
    // #endif
  }
  const style: CSSProperties = {
    top: addUnit(tmpConfig.value.top === 0 ? top : tmpConfig.value.top),
    // 因为组件底层为hy-transition组件，必须将其设置为fixed定位
    // 让其出现在导航栏底部
    position: "fixed",
    left: 0,
    right: 0,
    zIndex: 10076,
  };
  return style;
});
/**
 * @description 组件背景颜色
 */
const backgroundColor = computed(() => {
  const style: CSSProperties = {};
  if (tmpConfig.value.bgColor) {
    style.backgroundColor = tmpConfig.value.bgColor;
  }
  return style;
});

/**
 * @description 默认主题下的图标
 * */
const icon = computed(() => {
  let icon;
  switch (tmpConfig.value.type) {
    case "success":
      return IconConfig.SUCCESS;
    case "error":
      return IconConfig.CLOSE_CIRCLE;
    case "warning":
      return IconConfig.NOTICE;
    default:
      return icon;
  }
});

const show = (options: IProps) => {
  // 不将结果合并到this.config变量，避免多次调用hy-toast，前后的配置造成混乱
  tmpConfig.value = Object.assign(config.value, options);
  // 任何定时器初始化之前，都要执行清除操作，否则可能会造成混乱
  clearTimer();
  open.value = true;
  if (tmpConfig.value.duration && tmpConfig.value.duration! > 0) {
    timer = setTimeout(() => {
      open.value = false;
      // 倒计时结束，清除定时器，隐藏toast组件
      clearTimer();
      // 判断是否存在callback方法，如果存在就执行
      typeof tmpConfig.value.complete === "function" &&
        tmpConfig.value.complete();
    }, tmpConfig.value.duration);
  }
};
/**
 * @description 关闭notify
 * */
const close = () => {
  clearTimer();
};
/**
 * @description 清除定时任务
 * */
const clearTimer = () => {
  open.value = false;
  // 清除定时器
  clearTimeout(timer);
};

defineExpose({
  show,
  close,
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
