<template>
  <view
    :style="FloatButtonStyle"
    :id="soleId"
    :class="[
      'hy-float-button',
      {
        'hy-float-button__animation': float,
        'hy-float-button__shadow': shadow,
      },
      `hy-float-button__${shape}`,
    ]"
  >
    <view
      :class="['hy-float-button__container']"
      @tap.stop="handleClick"
      :style="{ backgroundColor: bgColor }"
    >
      <slot>
        <HyIcon
          :name="icon"
          :color="iconColor"
          :size="iconSize ? iconSize : addUnit(getPx(getFloatBtnSize) * 0.7)"
        />
        <text v-if="text" :style="{ color: textColor, fontSize: fontSize }">{{
          text
        }}</text>
      </slot>
    </view>

    <!-- 菜单栏 -->
    <view
      :class="['hy-float-button__menus', `hy-float-button__menus--${shape}`]"
      :style="menusStyle"
    >
      <template v-for="(item, i) in menus" :key="i">
        <view
          class="hy-float-button__menus--item"
          :style="{
            width: getFloatBtnSize,
            height: getFloatBtnSize,
            color: textColor,
          }"
          @click="handleMenuItemClick(item, i)"
        >
          {{ typeof item === "string" ? item : item.label }}
        </view>
        <HyLine
          v-if="i !== menus.length - 1"
          :length="addUnit(getPx(getFloatBtnSize) * 0.7)"
          :direction="direction === 'row' ? 'column' : 'row'"
          :custom-style="{ margin: 'auto' }"
        ></HyLine>
      </template>
    </view>
    <!-- 菜单栏 -->
  </view>
</template>

<script lang="ts">
export default {
  name: 'hy-float-button',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import {
  computed,
  type CSSProperties,
  getCurrentInstance,
  onMounted,
  ref,
  toRefs,
} from "vue";
import type IProps from "./typing";
import type { MenusType } from "./typing";
import defaultProps from "./props";
import { addUnit, getPx, getRect, getWindowInfo, guid } from "../../utils";

// 组件
import HyIcon from "../hy-icon/hy-icon.vue";
import HyLine from "../hy-line/hy-line.vue";

const props = withDefaults(defineProps<IProps>(), defaultProps);
const {
  menus,
  customStyle,
  left,
  bottom,
  zIndex,
  bgColor,
  text,
  textColor,
  size,
  fixed,
  direction,
} = toRefs(props);
const emit = defineEmits(["click", "clickItem"]);

const instance = getCurrentInstance();
const btnSize: AnyObject = {
  small: "50px",
  medium: "60px",
  large: "70px",
};
const open = ref(false);
const rotate = computed(() => (open.value && !text.value ? "45deg" : "0deg"));
const soleId = `hy-float-button__${guid()}`;
const showLeft = ref(false);

/**
 * @description 获取组件大小
 * */
const getFloatBtnSize = computed(() => {
  if (
    typeof size.value === "string" &&
    Object.keys(btnSize).includes(size.value)
  ) {
    return btnSize[size.value];
  } else {
    return addUnit(size.value);
  }
});

/**
 * @description 悬浮按钮样式
 * */
const FloatButtonStyle = computed(() => {
  const style: CSSProperties = {
    bottom: addUnit(bottom.value),
    left: addUnit(left.value),
    backgroundColor: bgColor.value,
    zIndex: zIndex.value,
    color: textColor.value,
  };
  if (fixed.value) style.position = "fixed";

  style.height = getFloatBtnSize.value;
  style.width = getFloatBtnSize.value;
  return Object.assign(style, customStyle.value);
});
const menusStyle = computed(() => {
  const style: CSSProperties = {
    backgroundColor: bgColor.value,
  };

  // 判断横向展示还是纵向展示
  if (direction.value === "row") {
    if (showLeft.value) {
      style.transform = "translateX(-100%)";
      style.left = "100%";
      style.paddingRight = getFloatBtnSize.value;
      style.flexDirection = "row-reverse";
    } else {
      style.paddingLeft = getFloatBtnSize.value;
    }
    style.bottom = 0;
    style.transition = "width 0.5s ease";
    style.height = getFloatBtnSize.value;
    style.width = open.value
      ? addUnit(
          getPx(getFloatBtnSize.value) * menus.value.length +
            getPx(getFloatBtnSize.value),
        )
      : 0;
  } else {
    style.bottom = 0;
    style.left = 0;
    style.transition = "height 0.5s ease";
    style.width = getFloatBtnSize.value;
    style.height = open.value
      ? addUnit(
          getPx(getFloatBtnSize.value) * menus.value.length +
            getPx(getFloatBtnSize.value),
        )
      : 0;
    style.paddingBottom = getFloatBtnSize.value;
  }
  return style;
});

onMounted(() => {
  const { windowWidth } = getWindowInfo();
  getRect(`#${soleId}`, false, instance).then((rect) => {
    const { left } = rect as UniApp.NodeInfo;
    if (left && left > windowWidth / 2) showLeft.value = true;
  });
});

/**
 * @description 点击悬浮按钮
 * */
const handleClick = () => {
  emit("click");
  open.value = !open.value;
};

/**
 * @description 点击单条菜单栏
 * */
const handleMenuItemClick = (temp: MenusType, index: number) => {
  emit("clickItem", temp, index);
  open.value = false;
  if (typeof temp !== "string" && temp?.url) {
    uni.navigateTo({
      url: temp.url,
    });
  }
};
</script>

<style scoped lang="scss">
@import "./index.scss";
.hy-float-button {
  &__container {
    rotate: v-bind(rotate);
  }
  &__menus {
    display: flex;
    flex-direction: v-bind(direction);
  }
}
</style>
