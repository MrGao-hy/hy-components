<template>
  <view
    :class="['hy-submit-bar', border && 'hy-border__top']"
    :style="submitBarStyle"
  >
    <view class="hy-submit-bar__left">
      <slot name="left">
        <view
          class="hy-submit-bar__left--item"
          v-for="(item, i) in menus"
          :key="i"
          @tap="clickMenuFn(i)"
        >
          <HyIcon
            :name="item.icon"
            :label="item.text"
            :color="iconColor"
            :label-color="iconLabelColor"
            labelPos="bottom"
            space="7"
            :size="20"
          ></HyIcon>
          <HyBadge
            :value="item?.badge?.value"
            :absolute="true"
            :offset="item?.badge?.offset ?? [-5, 20]"
            :isDot="item?.badge?.isDot"
            :type="item?.badge?.type"
            :color="item?.badge?.color"
            :shape="item?.badge?.shape"
            :numberType="item?.badge?.numberType"
            :inverted="item?.badge?.inverted"
          ></HyBadge>
        </view>
      </slot>
    </view>
    <view class="hy-submit-bar__right">
      <slot name="right">
        <view
          class="hy-submit-bar__right--button"
          v-if="showLeftBtn"
          :style="leftBtnStyle"
          @tap.stop="confirmClickFn(0)"
        >
          <HyLoading
            :show="leftLoading"
            size="13"
            mode="circle"
            :custom-style="{ marginRight: '10rpx' }"
          ></HyLoading>
          {{ leftBtnText }}
        </view>
        <view
          class="hy-submit-bar__right--button"
          v-if="showRightBtn"
          :style="rightBtnStyle"
          @tap.stop="confirmClickFn(1)"
        >
          <HyLoading
            :show="rightLoading"
            size="13"
            mode="circle"
            :custom-style="{ marginRight: '10rpx' }"
          ></HyLoading>
          {{ rightBtnText }}
        </view>
      </slot>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: "hy-submit-bar",
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
import { computed, type CSSProperties, toRefs } from "vue";
import { debounce } from "../../utils";

// 组件
import HyIcon from "../hy-icon/hy-icon.vue";
import HyLoading from "../hy-loading/hy-loading.vue";
import HyBadge from "../hy-badge/hy-badge.vue";

const props = withDefaults(defineProps<IProps>(), defaultProps);
const {
  fixed,
  showLeftBtn,
  showRightBtn,
  leftBtnColor,
  rightBtnColor,
  shape,
  textColor,
  leftLoading,
  rightLoading,
  warn,
  customStyle,
} = toRefs(props);
const emit = defineEmits(["click", "menuClick"]);

/**
 * @description 整体样式
 * */
const submitBarStyle = computed(() => {
  const style: CSSProperties = {
    bottom: 0,
    left: 0,
  };
  if (fixed.value) style.position = "fixed";
  return Object.assign(style, customStyle.value);
});

/**
 * @description 左边按钮样式
 * */
const leftBtnStyle = computed(() => {
  const style: CSSProperties = {
    background: leftBtnColor.value,
    color: textColor.value,
  };
  if (!showRightBtn.value) {
    style.flex = 1;
    if (shape.value === "circle") {
      style.borderRadius = "100px";
    } else {
      style.borderRadius = "2px";
    }
  } else {
    if (shape.value === "circle") {
      style.borderRadius = "100px 0 0 100px";
    } else {
      style.borderRadius = "2px 0 0 2px";
    }
  }
  return style;
});

/**
 * @description 右边按钮样式
 * */
const rightBtnStyle = computed(() => {
  const style: CSSProperties = {
    background: rightBtnColor.value,
    color: textColor.value,
  };
  if (!showLeftBtn.value) {
    style.flex = 1;
    if (shape.value === "circle") {
      style.borderRadius = "100px";
    } else {
      style.borderRadius = "2px";
    }
  } else {
    if (shape.value === "circle") {
      style.borderRadius = "0 100px 100px 0";
    } else {
      style.borderRadius = "0 2px 2px 0";
    }
  }
  return style;
});

/**
 * @description 点击左边图标
 * */
const clickMenuFn = (i: number) => {
  emit("menuClick", i);
};

/**
 * @description 点击按钮
 * */
const confirmClickFn = debounce((i: number) => {
  if (
    (!leftLoading.value && !rightLoading.value) ||
    (leftLoading.value && i !== 0) ||
    (rightLoading.value && i !== 1)
  ) {
    emit("click", i);
  }
}, warn.value);
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
