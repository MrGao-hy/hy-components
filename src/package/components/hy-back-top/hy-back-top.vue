<template>
  <HyTransition mode="fade" :customStyle="backTopStyle" :show="show">
    <slot>
      <view class="hy-back-top" :style="contentStyle" @click="backToTop">
        <HyIcon
          :name="icon?.name || IconConfig.DOWNLOAD"
          :color="icon?.color"
          :size="icon?.size"
          :bold="icon?.bold"
          :customPrefix="icon?.customPrefix"
          :imgMode="icon?.imgMode"
          :width="icon?.width"
          :height="icon?.height"
          :top="icon?.top"
          :stop="icon?.stop"
          :round="icon?.round"
          :customStyle="icon?.customStyle"
        ></HyIcon>
        <text v-if="text" class="hy-back-top__text">{{ text }}</text>
      </view>
    </slot>
  </HyTransition>
</template>

<script lang="ts">
export default {
  name: 'hy-back-top',
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
import { addUnit, getPx } from "../../utils";
import { IconConfig } from "@/package";
import type IProps from "./typing";
// 组件
import HyTransition from "../hy-transition/hy-transition.vue";
import HyIcon from "../hy-icon/hy-icon.vue";

const props = withDefaults(defineProps<IProps>(), defaultProps);
const { customStyle, duration, mode, bottom, right, top, scrollTop } =
  toRefs(props);
const emit = defineEmits(["click"]);

const backTopStyle = computed<CSSProperties>(() => {
  return {
    bottom: addUnit(bottom.value),
    right: addUnit(right.value),
    width: "40px",
    height: "40px",
    position: "fixed",
    zIndex: 10,
  };
});
const contentStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    borderRadius: mode.value === "circle" ? "50%" : "4px",
  };
  return Object.assign(style, customStyle.value);
});
const show = computed<boolean>(() => {
  return getPx(scrollTop.value) > getPx(top.value);
});
const backToTop = () => {
  uni.pageScrollTo({
    scrollTop: 0,
    duration: duration.value,
  });
  emit("click");
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
