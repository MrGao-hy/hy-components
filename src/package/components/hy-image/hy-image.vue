<template>
  <HyTransition
    mode="fade"
    :show="show"
    :style="transStyle"
    :duration="fade ? 1000 : 0"
  >
    <view
      class="hy-image box-border"
      @tap="clickHandler"
      :style="[wrapStyle, backgroundStyle]"
    >
      <image
        v-if="!isError"
        :src="src"
        :mode="mode"
        @error="onErrorHandler"
        @load="onLoadHandler"
        :show-menu-by-longpress="showMenuByLongPress"
        :lazy-load="lazyLoad"
        class="hy-image__image"
        :style="{
          width: addUnit(width),
          height: addUnit(height),
          borderRadius: shape == 'circle' ? '10000px' : addUnit(radius),
        }"
      ></image>
      <view
        v-if="showLoading && loading"
        class="hy-image__loading"
        :style="{
          borderRadius: shape == 'circle' ? '50%' : addUnit(radius),
          backgroundColor: bgColor,
          width: addUnit(width),
          height: addUnit(height),
        }"
      >
        <slot name="loading">
          <HyIcon :name="loadingIcon"></HyIcon>
        </slot>
      </view>
      <view
        v-if="showError && isError && !loading"
        class="hy-image__error"
        :style="{
          borderRadius: shape == 'circle' ? '50%' : addUnit(radius),
        }"
      >
        <slot name="error">
          <HyIcon :name="errorIcon"></HyIcon>
        </slot>
      </view>
    </view>
  </HyTransition>
</template>

<script lang="ts">
export default {
  name: "hy-image",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared",
  },
};
</script>

<script setup lang="ts">
import {
  computed,
  type CSSProperties,
  onMounted,
  ref,
  toRefs,
  watch,
} from "vue";
import defaultProps from "./props";
import type IProps from "./typing";
import { addUnit, getPx } from "../../utils";

// 组件

import HyTransition from "../hy-transition/hy-transition.vue";
import HyIcon from "../hy-icon/hy-icon.vue";

const props = withDefaults(defineProps<IProps>(), defaultProps);
const {
  customStyle,
  duration,
  src,
  width,
  height,
  mode,
  shape,
  radius,
  bgColor,
  previewImage,
} = toRefs(props);
const emit = defineEmits(["click", "error", "load"]);

// 图片是否加载错误，如果是，则显示错误占位图
const isError = ref(false);
// 初始化组件时，默认为加载中状态
const loading = ref(true);
// 不透明度，为了实现淡入淡出的效果
const opacity = ref(1);
// 过渡时间，因为props的值无法修改，故需要一个中间值
const durationTime = ref(duration.value);
// 图片加载完成时，去掉背景颜色，因为如果是png图片，就会显示灰色的背景
const backgroundStyle = ref({});
// 用于fade模式的控制组件显示与否
const show = ref(false);

watch(
  () => src.value,
  (newValue) => {
    if (!newValue) {
      // 如果传入null或者''，或者false，或者undefined，标记为错误状态
      isError.value = true;
    } else {
      isError.value = false;
      loading.value = true;
    }
  },
  { immediate: true },
);

const transStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {};
  if (
    loading.value ||
    isError.value ||
    width.value == "100%" ||
    mode.value != "heightFix"
  ) {
    style.width = addUnit(width.value);
  } else {
    style.width = "fit-content";
  }
  if (
    loading.value ||
    isError.value ||
    height.value == "100%" ||
    mode.value != "widthFix"
  ) {
    style.height = addUnit(height.value);
  } else {
    style.height = "fit-content";
  }
  return style;
});

const wrapStyle = computed(() => {
  const style: CSSProperties = {};
  if (
    loading.value ||
    isError.value ||
    width.value == "100%" ||
    mode.value != "heightFix"
  ) {
    style.width = addUnit(width.value);
  } else {
    style.width = "fit-content";
  }
  if (
    loading.value ||
    isError.value ||
    height.value == "100%" ||
    mode.value != "widthFix"
  ) {
    style.height = addUnit(height.value);
  } else {
    style.height = "fit-content";
  }
  // 如果是显示圆形，设置一个很多的半径值即可
  style.borderRadius =
    shape.value == "circle" ? "10000px" : addUnit(radius.value);
  // 如果设置圆角，必须要有hidden，否则可能圆角无效
  style.overflow = getPx(radius.value) > 0 ? "hidden" : "visible";

  return Object.assign(style, customStyle.value);
});

onMounted(() => {
  show.value = true;
});

const clickHandler = () => {
  emit("click");

  if (previewImage.value) {
    uni.previewImage({
      urls: [src.value],
    });
  }
};

/**
 * @description 图片加载失败
 * */
const onErrorHandler = (err: Event) => {
  loading.value = false;
  isError.value = true;
  emit("error", err);
};

/**
 * @description 图片加载成功
 * */
const onLoadHandler = (e: Event) => {
  loading.value = false;
  isError.value = false;
  emit("load", e);
  removeBgColor();
};

const removeBgColor = () => {
  // 淡入动画过渡完成后，将背景设置为透明色，否则png图片会看到灰色的背景
  backgroundStyle.value = {
    backgroundColor: bgColor.value || "",
  };
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
