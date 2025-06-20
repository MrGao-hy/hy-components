<template>
  <view class="hy-popup">
    <HyOverlay
      :show="show"
      @click="overlayClick"
      v-if="overlay"
      :zIndex="zIndex"
      :duration="overlayDuration"
      :customStyle="overlayStyle"
      :opacity="overlayOpacity"
    ></HyOverlay>
    <HyTransition
      :show="show"
      :customStyle="transitionStyle"
      :mode="positionMode"
      :duration="duration"
      @afterEnter="afterEnter"
      @click="clickHandler"
    >
      <!-- @click.stop不能去除，去除会导致居中模式下点击内容区域触发关闭弹窗 -->
      <view class="hy-popup__content" :style="[contentStyle]">
        <!--        <u-status-bar v-if="safeAreaInsetTop"></u-status-bar>-->
        <slot></slot>
        <view
          v-if="closeable"
          @tap.stop="close"
          class="hy-popup__content__close"
          :class="['hy-popup__content__close--' + closeIconPos]"
          hover-class="hy-popup__content__close--hover"
          hover-stay-time="150"
        >
          <HyIcon
            :name="IconConfig.CLOSE"
            color="#909399"
            size="18"
            bold
          ></HyIcon>
        </view>
        <!--        <hy-safe-bottom v-if="safeAreaInsetBottom"></hy-safe-bottom>-->
      </view>
    </HyTransition>
  </view>
</template>

<script lang="ts">
export default {
  name: 'hy-popup',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script setup lang="ts">
import { computed, type CSSProperties, ref, toRefs, watch } from "vue";
import defaultProps from "./props";
import type IProps from "./typing";
import { addUnit, getWindowInfo } from "../../utils";
import { IconConfig } from "../../config";

// 组件
import HyTransition from "../hy-transition/hy-transition.vue";
import HyOverlay from "../hy-overlay/hy-overlay.vue";
import HyIcon from "../hy-icon/hy-icon.vue";

const props = withDefaults(defineProps<IProps>(), defaultProps);
const {
  duration,
  show,
  closeOnClickOverlay,
  mode,
  zIndex,
  bgColor,
  round,
  customStyle,
  zoom,
} = toRefs(props);
const emit = defineEmits(["open", "close", "click", "update:show"]);

const overlayDuration = ref(duration.value + 50);

watch(
  () => show.value,
  (newValue) => {
    if (newValue) {
      // #ifdef MP-WEIXIN
      // const children = this.$children
      // retryComputedComponentRect(children)
      // #endif
    }
  },
);

const transitionStyle = computed(() => {
  const style: CSSProperties = {
    zIndex: zIndex.value,
    position: "fixed",
    display: "flex",
  };
  if (mode.value !== "center") {
    style[mode.value] = 0;
  }
  switch (mode.value) {
    case "left":
    case "right":
      style.bottom = 0;
      style.top = 0;
      break;
    case "top":
    case "bottom":
      style.left = 0;
      style.right = 0;
      break;
    case "center":
      Object.assign(style, {
        alignItems: "center",
        "justify-content": "center",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      });
      break;
    default:
      break;
  }

  return style;
});
const contentStyle = computed(() => {
  const style: CSSProperties = {};
  // 通过设备信息的safeAreaInsets值来判断是否需要预留顶部状态栏和底部安全局的位置
  // 不使用css方案，是因为nvue不支持css的iPhoneX安全区查询属性
  const { safeAreaInsets } = getWindowInfo();
  if (mode.value !== "center") {
    style.flex = 1;
  }
  // 背景色，一般用于设置为transparent，去除默认的白色背景
  if (bgColor.value) {
    style.backgroundColor = bgColor.value;
  }
  if (round.value) {
    const value = addUnit(round.value);
    switch (mode.value) {
      case "top":
        style.borderBottomLeftRadius = value;
        style.borderBottomRightRadius = value;
        break;
      case "bottom":
        style.borderTopLeftRadius = value;
        style.borderTopRightRadius = value;
        break;
      case "center":
        style.borderRadius = value;
        break;
      default:
        break;
    }
  }
  return Object.assign(style, customStyle.value || {});
});
const positionMode = computed(() => {
  if (mode.value === "center") {
    return zoom.value ? "fade-zoom" : "fade";
  }
  if (mode.value === "left") {
    return "slide-left";
  }
  if (mode.value === "right") {
    return "slide-right";
  }
  if (mode.value === "bottom") {
    return "slide-up";
  }
  if (mode.value === "top") {
    return "slide-down";
  }
});

// 点击遮罩
const overlayClick = () => {
  if (closeOnClickOverlay.value) {
    emit("update:show", false);
    emit("close");
  }
};
const close = () => {
  emit("update:show", false);
  emit("close");
};
const afterEnter = () => {
  emit("open");
};
const clickHandler = () => {
  // 由于中部弹出时，其u-transition占据了整个页面相当于遮罩，此时需要发出遮罩点击事件，是否无法通过点击遮罩关闭弹窗
  if (mode.value === "center") {
    overlayClick();
  }
  emit("click");
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
