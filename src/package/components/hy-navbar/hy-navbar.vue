<template>
  <view class="hy-navbar" :style="customStyle">
    <view
      class="hy-navbar__placeholder"
      v-if="fixed && placeholder"
      :style="{
        height: addUnit(getPx(height) + statusBarHeight),
      }"
    ></view>
    <view :class="[fixed && 'hy-navbar--fixed']">
      <HyStatusBar v-if="safeAreaInsetTop" :bgColor="bgColor"></HyStatusBar>
      <view
        :class="[border && 'hy-border__bottom', 'hy-navbar__content']"
        :style="{
          height: addUnit(height),
          backgroundColor: bgColor,
        }"
      >
        <view
          class="hy-navbar__content__left"
          hover-class="hy-navbar__content__left--hover"
          hover-start-time="150"
          @tap="leftClick"
        >
          <slot name="left">
            <HyIcon
              v-if="leftIcon"
              :name="leftIcon"
              :size="leftIconSize"
              :color="leftIconColor"
            ></HyIcon>
            <text
              v-if="leftText"
              :style="{
                color: leftIconColor,
              }"
              class="hy-navbar__content__left__text"
              >{{ leftText }}</text
            >
          </slot>
        </view>
        <slot name="center">
          <view class="hy-navbar__content__center">
            <text
              class="hy-navbar__content__center--title"
              :style="[
                {
                  width: addUnit(titleWidth),
                  color: titleColor,
                },
                titleStyle,
              ]"
              >{{ title }}</text
            >
            <text
              class="hy-navbar__content__center--sub"
              :style="[
                {
                  width: addUnit(titleWidth),
                  color: titleColor,
                },
                titleStyle,
              ]"
              >{{ sub }}</text
            >
          </view>
        </slot>
        <view
          class="hy-navbar__content__right"
          v-if="$slots.right || rightIcon || rightText"
          @tap="rightClick"
        >
          <slot name="right">
            <HyIcon v-if="rightIcon" :name="rightIcon" size="20"></HyIcon>
            <text v-if="rightText" class="hy-navbar__content__right__text">{{
              rightText
            }}</text>
          </slot>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'hy-navbar',
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
import { addUnit, getPx, getWindowInfo } from "../../utils";

// 组件
import HyIcon from "../hy-icon/hy-icon.vue";
import HyStatusBar from "../hy-status-bar/hy-status-bar.vue";
import { toRefs } from "vue";

const props = withDefaults(defineProps<IProps>(), defaultProps);
const { autoBack, fixed } = toRefs(props);
const emit = defineEmits(["leftClick", "rightClick"]);

// 获取状态栏高度
const { statusBarHeight } = getWindowInfo();

/**
 * @description 点击左侧区域
 * */
const leftClick = () => {
  // 如果配置了autoBack，自动返回上一页
  emit("leftClick");
  if (autoBack.value) {
    uni.navigateBack();
  }
};
/**
 * @description 点击右侧区域
 * */
const rightClick = () => {
  emit("rightClick");
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
