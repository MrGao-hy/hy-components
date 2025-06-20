<template>
  <view class="hy-icon" @tap="clickHandler" :class="[`hy-icon--${labelPos}`]">
    <image
      class="hy-icon__img"
      v-if="isImg"
      :src="name"
      :mode="imgMode"
      :style="[imgStyle, customStyle]"
    ></image>
    <text
      v-else
      class="hy-icon__icon"
      :class="uClasses"
      :style="[iconStyle, customStyle]"
    ></text>
    <!-- 这里进行空字符串判断，如果仅仅是v-if="label"，可能会出现传递0的时候，结果也无法显示 -->
    <text
      v-if="label !== ''"
      class="hy-icon__label"
      :style="{
        color: labelColor,
        fontSize: addUnit(labelSize),
        marginLeft: labelPos == 'right' ? addUnit(space) : 0,
        marginTop: labelPos == 'bottom' ? addUnit(space) : 0,
      }"
      >{{ label }}</text
    >
  </view>
</template>

<script lang="ts">
export default {
  name: 'hy-icon',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script setup lang="ts">
import { computed, type CSSProperties, toRefs } from "vue";
import { addUnit } from "../../utils";
import defaultProps from "./props";
import type IProps from "./typing";

const props = withDefaults(defineProps<IProps>(), defaultProps);
const {
  customPrefix,
  name,
  color,
  size,
  bold,
  top,
  width,
  height,
  stop,
  index,
  isRotate,
  round,
} = toRefs(props);
const emit = defineEmits(["click"]);

const uClasses = computed(() => {
  let classes: string | string[] = [
    "iconfont",
    `${customPrefix.value}-${name.value}`,
    customPrefix.value,
  ];
  if (isRotate.value) classes.push("hy-rotate");
  if (color.value)
    // 主题色，通过类配置
    classes.push("hy-icon__icon--" + color.value);
  // 阿里，头条，百度小程序通过数组绑定类名时，无法直接使用[a, b, c]的形式，否则无法识别
  // 故需将其拆成一个字符串的形式，通过空格隔开各个类名
  //#ifdef MP-ALIPAY || MP-TOUTIAO || MP-BAIDU
  classes = classes.join(" ");
  //#endif
  return classes;
});
const iconStyle = computed<CSSProperties>(() => {
  let style: CSSProperties = {};
  style = {
    fontSize: addUnit(size.value),
    lineHeight: addUnit(size.value),
    fontWeight: bold.value ? "bold" : "normal",
    // 某些特殊情况需要设置一个到顶部的距离，才能更好的垂直居中
    top: addUnit(top.value),
    borderRadius: addUnit(round.value),
    color: color.value,
  };

  return style;
});

/**
 * @description 判断传入的name属性，是否图片路径，只要带有"/"均认为是图片形式
 * */
const isImg = computed(() => {
  return name.value.indexOf("/") !== -1;
});
const imgStyle = computed((): CSSProperties => {
  let style: CSSProperties = {};
  // 如果设置width和height属性，则优先使用，否则使用size属性
  style.width = width.value ? addUnit(width.value) : addUnit(size.value);
  style.height = height.value ? addUnit(height.value) : addUnit(size.value);
  style.borderRadius = addUnit(round.value);
  return style;
});

/**
 * @description 点击
 * */
const clickHandler = (e: any) => {
  emit("click", index.value, e);
  // 是否阻止事件冒泡
  stop.value && e.stopPropagation();
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
