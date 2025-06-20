<template>
  <view class="hy-grid" ref="hy-grid" :style="gridStyle">
    <template v-for="item in list">
      <view
        class="hy-grid-item"
        hover-class="hy-grid-item--hover-class"
        :hover-stay-time="200"
        @tap="childClick(item)"
        :style="itemStyle"
      >
        <slot :record="item">
          <HyIcon
            :name="item[customKeys?.icon]"
            label-pos="bottom"
            :label="item[customKeys?.name]"
            :space="item?.iconConfig?.space || iconConfig?.space || 8"
            :color="item?.iconConfig?.color || iconConfig?.color"
            :size="item?.iconConfig?.size || iconConfig?.size || 30"
            :bold="item?.iconConfig?.bold || iconConfig?.bold"
            :customPrefix="item?.iconConfig?.customPrefix"
            :imgMode="item?.iconConfig?.imgMode || iconConfig?.imgMode"
            :width="item?.iconConfig?.width || iconConfig?.width"
            :height="item?.iconConfig?.height || iconConfig?.height"
            :top="item?.iconConfig?.top || iconConfig?.top"
            :stop="item?.iconConfig?.stop || iconConfig?.stop"
            :round="item?.iconConfig?.round || iconConfig?.round || 6"
            :customStyle="
              item?.iconConfig?.customStyle || iconConfig?.customStyle
            "
          ></HyIcon>
        </slot>
      </view>
    </template>
  </view>
</template>

<script lang="ts">
export default {
  name: "hy-grid",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared",
  },
};
</script>

<script setup lang="ts">
import { computed, type CSSProperties, toRefs } from "vue";
import defaultProps from "./props";
import type IProps from "./typing";
import { addUnit } from "../../utils";

// 组件
import HyIcon from "../hy-icon/hy-icon.vue";

const props = withDefaults(defineProps<IProps>(), defaultProps);
const { align, customStyle, bgColor, itemHeight, border } = toRefs(props);
const emit = defineEmits(["click"]);

/**
 * @description 宫格对齐方式
 * */
const gridStyle = computed<CSSProperties>(() => {
  let style: CSSProperties = {};
  switch (align.value) {
    case "left":
      style.justifyContent = "flex-start";
      break;
    case "center":
      style.justifyContent = "center";
      break;
    case "right":
      style.justifyContent = "flex-end";
      break;
    default:
      style.justifyContent = "flex-start";
  }
  return Object.assign(style, customStyle.value || {});
});

const itemStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    background: bgColor.value,
    height: addUnit(itemHeight.value),
    width: "100%",
    border: border.value ? "0.5px solid #c8c7cc66" : "",
  };
  return style;
});

/**
 * @description 点击事件
 * */
const childClick = (name: string | Record<string, any>) => {
  emit("click", name);
};
</script>

<style lang="scss" scoped>
.hy-grid {
  grid-gap: v-bind(gap);
  grid-template-columns: repeat(v-bind(col), 1fr);
}
@import "./index.scss";
</style>
