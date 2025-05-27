<template>
  <view class="hy-card" @tap.stop="click" :class="cardClass" :style="cardStyle">
    <view
      v-if="showHead"
      class="hy-card__head"
      :style="[{ padding: addUnit(paddingHead || padding) }, headStyle]"
      :class="{
        'hy-border__bottom': headBorderBottom,
      }"
      @tap="headClick"
    >
      <view v-if="!$slots.header" class="hy-card__head--flex">
        <view class="hy-card__head--left" v-if="title">
          <image
            :src="thumb"
            class="hy-card__head--left__thumb"
            mode="aspectFill"
            v-if="thumb"
            :style="{
              height: addUnit(thumbWidth),
              width: addUnit(thumbWidth),
              borderRadius: thumbCircle ? '50px' : '4px',
            }"
          ></image>
          <text
            class="hy-card__head--left__title"
            :style="{
              fontSize: addUnit(titleSize),
              color: titleColor,
            }"
          >
            {{ title }}
          </text>
        </view>
        <view class="hy-card__head--right hy-line-1" v-if="subTitle">
          <text
            class="hy-card__head__title__text"
            :style="{
              fontSize: addUnit(subTitleSize),
              color: subTitleColor,
            }"
          >
            {{ subTitle }}
          </text>
        </view>
      </view>
      <slot name="header" v-else />
    </view>
    <view
      @tap="bodyClick"
      class="hy-card__body"
      :style="[{ padding: addUnit(paddingBody || padding) }, bodyStyle]"
    >
      <slot name="body" />
    </view>
    <view
      v-if="showFoot"
      class="hy-card__foot"
      @tap="footClick"
      :style="[
        { padding: $slots.foot ? addUnit(paddingFoot || padding) : 0 },
        footStyle,
      ]"
      :class="{
        'hy-border-top': footBorderTop,
      }"
    >
      <slot name="footer" />
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'hy-card',
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
import { addUnit } from "../../utils";
import { computed, toRefs } from "vue";

const props = withDefaults(defineProps<IProps>(), defaultProps);
const { border, full, borderRadius, margin, boxShadow, customStyle } =
  toRefs(props);
const emit = defineEmits(["click", "head-click", "body-click", "foot-click"]);

const cardClass = computed(() => {
  return [
    border.value && "hy-border",
    full.value && "hy-border",
    border.value && "hy-card-full",
    (typeof borderRadius.value === "number"
      ? borderRadius.value
      : parseInt(borderRadius.value.replace(/px|rpx|vw|vh/g, "")) > 0) &&
      "hy-card--border",
  ].filter(Boolean);
});
const cardStyle = computed(() => {
  return Object.assign(
    {
      borderRadius: addUnit(borderRadius.value),
      margin: margin.value,
      boxShadow: boxShadow.value
        ? typeof boxShadow.value === "boolean"
          ? "0 0 10rpx 4rpx rgba(0, 0, 0, 0.16)"
          : boxShadow.value
        : "",
    },
    customStyle.value,
  );
});

const click = () => {
  emit("click", props.index);
};
/**
 * @description 点击头部
 * */
const headClick = () => {
  emit("head-click", props.index);
};
/**
 * @description 点击身体
 * */
const bodyClick = () => {
  emit("body-click", props.index);
};
/**
 * @description 点击尾部
 * */
const footClick = () => {
  emit("foot-click", props.index);
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
