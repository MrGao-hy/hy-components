<template>
  <HyTransition mode="fade" :show="show" style="display: inline-flex">
    <view class="hy-tag__wrapper cursor-pointer">
      <view :class="tagClass" @tap.stop="clickHandler" :style="tagStyle">
        <slot name="icon">
          <HyIcon
            v-if="icon?.name"
            :name="icon?.name"
            :color="hyIconColor"
            :size="hyIconSize"
            :bold="icon?.bold"
            :customPrefix="icon?.customPrefix"
            :imgMode="icon?.imgMode"
            :width="icon?.width"
            :height="icon?.height"
            :top="icon?.top"
            :stop="icon?.stop"
            :round="icon?.round"
            :customStyle="
              Object.assign({ marginRight: '3px' }, icon?.customStyle)
            "
          ></HyIcon>
        </slot>
        <text :class="textClass" :style="textStyle">
          <slot>
            {{ text }}
          </slot>
        </text>
      </view>
      <view
        :class="['hy-tag__close', `hy-tag__close--${size}`]"
        v-if="closable"
        @tap.stop="closeHandler"
        :style="{ backgroundColor: closeColor }"
      >
        <HyIcon
          :name="IconConfig.CLOSE"
          :size="closeSize"
          color="#ffffff"
        ></HyIcon>
      </view>
    </view>
  </HyTransition>
</template>

<script lang="ts">
export default {
  name: 'hy-tag',
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
import type IProps from "./typing";
import HyTransition from "../hy-transition/hy-transition.vue";
import HyIcon from "../hy-icon/hy-icon.vue";
import { IconConfig } from "../../config";
import { colorGradient } from "@/package";

const props = withDefaults(defineProps<IProps>(), defaultProps);
const {
  text,
  name,
  shape,
  plain,
  type,
  size,
  plainFill,
  closable,
  bgColor,
  color,
  borderColor,
  icon,
  disabled,
  customStyle,
} = toRefs(props);
const emit = defineEmits(["click", "close"]);

/**
 * @description tag类名
 * */
const tagClass = computed((): string[] => {
  let classes = ["hy-tag", `hy-tag--${shape.value}`, `hy-tag--${size.value}`];
  if (disabled.value) {
    classes.push("hy-tag--disabled");
  } else {
    const arr = [
      !plain.value && `hy-tag--${type.value}`,
      plain.value && `hy-tag--${type.value}--plain`,
      plain.value && plainFill.value && `hy-tag--${type.value}--plain__fill`,
    ].filter(Boolean);
    classes = classes.concat(arr as string[]);
  }
  return classes;
});
/**
 * @description tag样式
 * */
const tagStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    marginRight: closable.value ? "10px" : 0,
    marginTop: closable.value ? "10px" : 0,
    background: bgColor.value,
    borderColor: borderColor.value,
  };

  if (color.value) {
    if (plain.value) {
      style.borderColor = color.value;
      if (plainFill.value) {
        style.background = colorGradient(color.value, "#FFFFFF", 100)[90];
      }
    } else {
      style.background = color.value;
      style.borderColor = color.value;
    }
  }

  return Object.assign(style, customStyle.value);
});

/**
 * @description 文本样式
 * */
const textStyle = computed(() => {
  const style: CSSProperties = {};
  if (color.value && plain.value) style.color = color.value;
  return style;
});
/**
 * @description 文本类名
 * */
const textClass = computed((): string[] => {
  return [`hy-tag__text`, `hy-tag__text--${size.value}`];
});

/**
 * @description 关闭图标icon大小
 */
const closeSize = computed(() => {
  return size.value === "large" ? 15 : size.value === "medium" ? 13 : 11;
});
/**
 * @description 图标大小
 * */
const hyIconSize = computed(() => {
  if (icon.value.size) {
    return icon.value.size;
  } else {
    return size.value === "large" ? 18 : size.value === "medium" ? 14 : 10;
  }
});
/**
 * @description 图标颜色
 * */
const hyIconColor = computed(() => {
  return icon.value.color
    ? icon.value.color
    : plain.value
      ? type.value
      : "#ffffff";
});

/**
 * @description 点击关闭按钮
 * */
const closeHandler = () => {
  if (!disabled.value) {
    emit("close", text.value);
  }
};
/**
 * @description 点击标签
 * */
const clickHandler = () => {
  if (!disabled.value) {
    emit("click", {
      value: text.value,
      name: name.value,
    });
  }
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
