<template>
  <view class="hy-scroll-list" ref="hy-scroll-list">
    <!-- #ifdef MP-WEIXIN || APP-VUE || H5 || MP-QQ -->
    <!-- 以上平台，支持wxs -->
    <scroll-view
      class="hy-scroll-list__scroll-view scroll-view-native"
      scroll-x
      enable-flex
      @scroll="onScroll"
      @scrolltoupper="onScrollToUpper"
      @scrolltolower="onScrollToLower"
      :data-scrollWidth="scrollWidth"
      :data-barWidth="indicatorBarWidth"
      :data-indicatorWidth="indicatorWidth"
      :show-scrollbar="false"
      :upper-threshold="0"
      :lower-threshold="0"
    >
      <slot></slot>
    </scroll-view>
    <!--	#endif		-->
    <view class="hy-scroll-list__indicator" v-if="indicator">
      <view class="hy-scroll-list__indicator__line" :style="lineStyle">
        <view
          class="hy-scroll-list__indicator__line__bar"
          :style="barStyle"
          ref="hy-scroll-list__indicator__line__bar"
        >
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'hy-scroll-list',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script setup lang="ts">
import {
  computed,
  type CSSProperties,
  toRefs,
  ref,
  onMounted,
  getCurrentInstance,
} from "vue";
import defaultProps from "./props";
import type IProps from "./typing";
import { addUnit, colorGradient, getRect, sleep } from "../../utils";

const props = withDefaults(defineProps<IProps>(), defaultProps);
const {
  indicatorWidth,
  indicatorColor,
  indicatorBarWidth,
  indicatorActiveColor,
} = toRefs(props);
const emit = defineEmits(["click", "left", "right"]);

const instance = getCurrentInstance();
const scrollInfo = ref({
  scrollLeft: 0,
  scrollWidth: 0,
});
const scrollWidth = ref(0);
const barLeft = ref(0);

/**
 * @description 线条样式
 * */
const barStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {};
  style.transform = `translateX(${barLeft.value}px)`;
  // 设置滑块的宽度和背景色，是每个平台都需要的
  style.width = addUnit(indicatorBarWidth.value);
  style.backgroundColor = indicatorActiveColor.value;
  return style;
});
/**
 * @description 轨道样式
 * */
const lineStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {};
  // 指示器整体的样式，需要设置其宽度和背景色
  style.width = addUnit(indicatorWidth.value);
  style.backgroundColor =
    indicatorColor.value ||
    (indicatorActiveColor.value &&
      colorGradient(indicatorActiveColor.value)[90]);
  return style;
});

onMounted(() => {
  initWidth();
});

/**
 * @description 初始化宽度
 * */
const initWidth = async () => {
  // 延时一定时间，以获取dom尺寸
  await sleep(30);
  // #ifndef APP-NVUE
  getRect(".hy-scroll-list", false, instance).then((size) => {
    scrollWidth.value = (size as UniApp.NodeInfo).width!;
  });
  // #endif
};

const onScroll = (event: any) => {
  const { scrollLeft, scrollWidth: totalWidth } = event.detail;
  const targetWidth = totalWidth - scrollWidth.value;
  const targetBarWidth = indicatorWidth.value - indicatorBarWidth.value;
  barLeft.value = (scrollLeft / targetWidth) * targetBarWidth;
};

const onScrollToLower = () => {
  barLeft.value = indicatorWidth.value - indicatorBarWidth.value;
  emit("right");
};

const onScrollToUpper = () => {
  barLeft.value = 0;
  emit("left");
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
