<template>
  <view :style="customStyle" class="hy-cell">
    <view
      :class="['hy-cell--title', showVertical && 'hy-cell--title__vertical']"
      v-if="title || $slots['title']"
    >
      <slot name="title" :title="title">
        <text class="hy-cell--title__text">{{ title }}</text>
      </slot>
    </view>
    <view
      class="hy-cell__body"
      :style="{ 'border-radius': addUnit(borderRadius) }"
    >
      <slot>
        <template v-for="(item, i) in list" :key="i">
          <view
            :class="ItemClass"
            :hover-class="containerClass(item)"
            :hover-stay-time="250"
            :style="{
              borderBottom:
                border && i !== list.length - 1 ? '1rpx solid #c8c7cc66' : '',
            }"
            @tap="clickHandler($event, item, i)"
          >
            <view class="hy-cell__body--container__content">
              <view class="hy-cell__body--container__content-icon">
                <slot name="icon" :icon="item?.icon">
                  <HyIcon
                    :size="iconSize"
                    :name="item?.icon?.name"
                    :color="
                      disabled || item?.disabled ? '#c0c0c0' : item?.icon?.color
                    "
                    :bold="item?.icon?.bold"
                    :customPrefix="item?.icon?.customPrefix"
                    :imgMode="item?.icon?.imgMode"
                    :width="item?.icon?.width"
                    :height="item?.icon?.height"
                    :top="item?.icon?.top"
                    :stop="item?.icon?.stop"
                    :round="item?.icon?.round"
                    :customStyle="item?.icon?.customStyle"
                  ></HyIcon>
                </slot>
              </view>
              <view class="hy-cell__body--container__content-title">
                <!-- 将slot与默认内容用if/else分开主要是因为微信小程序不支持slot嵌套传递，这样才能解决collapse组件的slot不失效问题，label暂时未用到。 -->
                <slot name="cell-title" :title="item?.title">
                  <text
                    class="hy-cell__body--container__content-title--text"
                    :class="[
                      (disabled || item?.disabled) && 'hy-cell--disabled',
                    ]"
                    >{{ item?.title }}</text
                  >
                </slot>
                <slot name="sub" v-if="item?.subhead" :sub="item.subhead">
                  <text
                    class="hy-cell__body--container__content-title--sub"
                    :class="[disabled && 'hy-cell--disabled']"
                    >{{ item.subhead }}</text
                  >
                </slot>
              </view>
            </view>
            <view
              class="hy-cell__body--container__center"
              :style="{
                justifyContent:
                  arrange === 'left'
                    ? 'flex-start'
                    : arrange === 'right'
                      ? 'flex-end'
                      : 'center',
              }"
            >
              <slot name="value" :record="item">
                <text
                  class="hy-cell__body--container__center__value"
                  :class="[disabled && 'hy-cell--disabled']"
                  v-if="value || item?.value"
                  >{{ item.value || value }}</text
                >
              </slot>
            </view>
            <view
              class="hy-cell__body--container__right-icon"
              :class="[
                `hy-cell__body--container__right-icon--${
                  item?.arrowDirection || arrowDirection
                }`,
              ]"
            >
              <slot name="right-icon" :icon="item?.rightIcon || rightIcon">
                <HyIcon
                  :name="
                    item?.rightIcon?.name || rightIcon?.name || IconConfig.RIGHT
                  "
                  :color="
                    disabled || item?.disabled
                      ? '#c0c0c0'
                      : item?.rightIcon?.color || rightIcon?.color
                  "
                  :bold="item?.rightIcon?.bold || rightIcon?.bold"
                  :customPrefix="
                    item?.rightIcon?.customPrefix || rightIcon?.customPrefix
                  "
                  :imgMode="item?.rightIcon?.imgMode || rightIcon?.imgMode"
                  :width="item?.rightIcon?.width || rightIcon?.width"
                  :height="item?.rightIcon?.height || rightIcon?.height"
                  :top="item?.rightIcon?.top || rightIcon?.name"
                  :stop="item?.rightIcon?.stop || rightIcon?.stop"
                  :round="item?.rightIcon?.round || rightIcon?.round"
                  :customStyle="
                    item?.rightIcon?.customStyle || rightIcon?.customStyle
                  "
                ></HyIcon>
              </slot>
            </view>
          </view>

          <slot name="bottom" :record="item" />
        </template>
      </slot>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: "hy-cell",
  options: {
    virtualHost: true,
    styleIsolation: "shared",
  },
};
</script>

<script setup lang="ts">
import defaultProps from "./props";
import type IProps from "./typing";
import type { CellContentVo } from "./typing";
import { IconConfig } from "../../config";

import HyIcon from "../hy-icon/hy-icon.vue";
import { computed, toRefs } from "vue";
import { addUnit } from "@/package";

const props = withDefaults(defineProps<IProps>(), defaultProps);
const { size, disabled, clickable, borderRadius } = toRefs(props);
const emit = defineEmits(["click"]);

/**
 * @description 计算什么时候出现点击状态
 * */
const containerClass = computed(() => {
  return (temp: CellContentVo): string => {
    return [
      !disabled.value &&
        !temp?.disabled &&
        clickable.value &&
        "hy-cell__body--container__clickable",
    ]
      .filter(Boolean)
      .join();
  };
});
const ItemClass = computed(() => {
  return [
    "hy-cell__body--container",
    `hy-cell__body--container__${size.value}`,
  ];
});

const iconSize = computed(() => {
  switch (size.value) {
    case "large":
      return 25;
    case "medium":
      return 20;
    case "small":
      return 15;
  }
});

/**
 * @description 点击cell
 * */
const clickHandler = (e: Event, temp: CellContentVo, index: number) => {
  if (disabled.value) return;
  emit("click", temp, index);
  if (temp?.url) {
    uni.navigateTo({
      url: temp.url,
    });
  }
  e.stopPropagation();
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
