<template>
  <view
    class="hy-search"
    @tap="clickHandler"
    :style="[
      {
        margin: margin,
      },
      customStyle,
    ]"
  >
    <view
      class="hy-search__content"
      :style="{
        backgroundColor: bgColor,
        borderRadius: shape == 'circle' ? '100px' : '4px',
        borderColor: borderColor,
      }"
    >
      <template v-if="$slots.label || label !== null">
        <slot name="label">
          <text class="hy-search__content__label">{{ label }}</text>
        </slot>
      </template>
      <view class="hy-search__content__icon">
        <HyIcon
          :name="searchIcon?.name || IconConfig.SEARCH"
          :size="searchIcon?.size"
          :color="searchIcon?.color || color"
          :bold="searchIcon?.bold"
          :customPrefix="searchIcon?.customPrefix"
          :imgMode="searchIcon?.imgMode"
          :width="searchIcon?.width"
          :height="searchIcon?.height"
          :top="searchIcon?.top"
          :stop="searchIcon?.stop"
          :round="searchIcon?.round"
          :customStyle="searchIcon?.customStyle"
          @tap="clickIcon"
        ></HyIcon>
      </view>
      <input
        confirm-type="search"
        @blur="blur"
        :value="keyword"
        @confirm="search"
        @input="inputChange"
        :disabled="disabled"
        @focus="getFocus"
        :focus="focus"
        :maxlength="maxlength"
        :adjust-position="adjustPosition"
        :auto-blur="autoBlur"
        placeholder-class="hy-search__content__input--placeholder"
        :placeholder="placeholder"
        :placeholder-style="`color: ${placeholderColor}`"
        class="hy-search__content__input"
        type="text"
        :style="[
          {
            pointerEvents: disabled ? 'none' : 'auto',
            textAlign: inputAlign,
            color: color,
            backgroundColor: bgColor,
            height: addUnit(height),
          },
          inputStyle,
        ]"
      />
      <view
        class="hy-search__content__icon hy-search__content__close"
        v-if="keyword && clear && focused"
        @click="clear"
      >
        <HyIcon
          :name="IconConfig.CLOSE"
          size="11"
          color="#ffffff"
          :customStyle="{
            lineHeight: '12px',
          }"
        ></HyIcon>
      </view>
    </view>
    <text
      :style="[actionStyle]"
      class="hy-search__action"
      :class="[(showActionBtn || show) && 'hy-search__action--active']"
      @tap.stop.prevent="confirm"
      >{{ actionText }}</text
    >
  </view>
</template>

<script lang="ts">
export default {
  name: 'hy-search',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script setup lang="ts">
import { computed, nextTick, toRefs, ref, watch } from "vue";
import defaultProps from "./props";
import type IProps from "./typing";
import { sleep, addUnit } from "../../utils";
import { IconConfig } from "../../config";
import HyIcon from "../hy-icon/hy-icon.vue";

const props = withDefaults(defineProps<IProps>(), defaultProps);
const { focus, modelValue, showAction, animation, disabled } = toRefs(props);
const emit = defineEmits([
  "click",
  "change",
  "update:modelValue",
  "clickIcon",
  "search",
  "clear",
  "confirm",
  "change",
  "focus",
  "blur",
]);

const keyword = ref<string>("");
// 是否显示右边的清除图标
const showClear = ref<boolean>(false);
const show = ref<boolean>(false);
// 标记input当前状态是否处于聚焦中，如果是，才会显示右侧的清除控件
const focused = ref(focus.value);

watch(
  () => keyword.value,
  (newValue: string) => {
    emit("update:modelValue", newValue);
    emit("change", newValue);
  },
);

watch(
  () => modelValue.value,
  (newValue: string) => {
    keyword.value = newValue;
  },
  { immediate: true },
);

const showActionBtn = computed<boolean>(() => {
  return !animation.value && showAction.value;
});

/**
 * @description
 * */
const inputChange = (e: Event) => {
  keyword.value = e.detail.value;
};
/**
 * @description 清空输入
 * */
const clear = () => {
  keyword.value = "";
  // 延后发出事件，避免在父组件监听clear事件时，value为更新前的值(不为空)
  nextTick(() => {
    emit("clear");
  });
};
/**
 * @description 确定搜索
 * */
const search = (e: InputEvent) => {
  emit("search", e.detail.value);
  try {
    // 收起键盘
    uni.hideKeyboard();
  } catch (e) {}
};
/**
 * @description 点击右边自定义按钮的事件
 */
const confirm = () => {
  emit("confirm", keyword.value);
  try {
    // 收起键盘
    uni.hideKeyboard();
  } catch (e) {}
};
/**
 * @description 获取焦点
 * */
const getFocus = () => {
  focused.value = true;
  // 开启右侧搜索按钮展开的动画效果
  if (animation.value && showAction.value) show.value = true;
  emit("focus", keyword.value);
};
/**
 * @description 失去焦点
 */
const blur = async () => {
  // 最开始使用的是监听图标@touchstart事件，自从hx2.8.4后，此方法在微信小程序出错
  // 这里改为监听点击事件，手点击清除图标时，同时也发生了@blur事件，导致图标消失而无法点击，这里做一个延时
  show.value = false;
  emit("blur", keyword.value);
  await sleep(100);
  focused.value = false;
};
/**
 * @description 点击搜索框，只有disabled=true时才发出事件，因为禁止了输入，意味着是想跳转真正的搜索页
 * */
const clickHandler = () => {
  if (disabled.value) emit("click");
};
/**
 * @description 点击左边图标
 * */
const clickIcon = () => {
  emit("clickIcon", keyword.value);
  try {
    // 收起键盘
    uni.hideKeyboard();
  } catch (e) {}
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
