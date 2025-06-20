<template>
  <view
    class="hy-textarea"
    :class="textareaClass"
    :style="[textareaStyle, borderStyle(isFocus)]"
  >
    <textarea
      class="hy-textarea--field"
      :value="innerValue"
      :style="{ height: addUnit(height) }"
      :placeholder="placeholder || ''"
      :placeholder-style="placeholderStyle"
      :placeholder-class="placeholderClass"
      :disabled="disabled"
      :focus="focus"
      :autoHeight="autoHeight"
      :fixed="fixed"
      :cursorSpacing="cursorSpacing"
      :cursor="cursor"
      :showConfirmBar="showConfirmBar"
      :selectionStart="selectionStart"
      :selectionEnd="selectionEnd"
      :adjustPosition="adjustPosition"
      :disableDefaultPadding="disableDefaultPadding"
      :holdKeyboard="holdKeyboard"
      :maxlength="maxlength"
      :confirm-type="confirmType"
      @focus="onFocus"
      @blur="onBlur"
      @linechange="onLinechange"
      @input="onInput"
      @confirm="onConfirm"
      @keyboardheightchange="onKeyboardheightchange"
    ></textarea>
    <!-- #ifndef MP-ALIPAY -->
    <text
      class="hy-textarea--count"
      :style="{
        'background-color': disabled ? 'transparent' : '',
      }"
      v-if="count"
      >{{ innerValue.length }}/{{ maxlength }}</text
    >
    <!-- #endif -->
  </view>
</template>

<script lang="ts">
export default {
  name: "hy-textarea",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared",
  },
};
</script>

<script setup lang="ts">
import {
  computed,
  type CSSProperties,
  ref,
  toRefs,
  watch,
  nextTick,
} from "vue";
import type IProps from "./typing";
import defaultProps from "./props";
import { addUnit } from "../../utils";
import { ColorConfig } from "@/package";

const props = withDefaults(defineProps<IProps>(), defaultProps);
const { modelValue, customStyle, border, disabled, formatter } = toRefs(props);
const emit = defineEmits([
  "update:modelValue",
  "linechange",
  "focus",
  "blur",
  "change",
  "confirm",
  "keyboardheightchange",
]);

// 输入框的值
const innerValue = ref<string>("");
// 是否处于获得焦点状态
const focused = ref<boolean>(false);
// value是否第一次变化，在watch中，由于加入immediate属性，会在第一次触发，此时不应该认为value发生了变化
const firstChange = ref<boolean>(true);
// value绑定值的变化是由内部还是外部引起的
const changeFromInner = ref<boolean>(false);
// 是否获取焦点
const isFocus = ref<boolean>(false);
// 过滤处理方法
let innerFormatter = (value: string) => value;

watch(
  () => modelValue.value,
  (newVal) => {
    innerValue.value = newVal;
    /* #ifdef H5 */
    // 在H5中，外部value变化后，修改input中的值，不会触发@input事件，此时手动调用值变化方法
    if (firstChange.value === false && changeFromInner.value === false) {
      valueChange();
    }
    /* #endif */
    firstChange.value = false;
    // 重置changeFromInner的值为false，标识下一次引起默认为外部引起的
    changeFromInner.value = false;
  },
  { immediate: true },
);

// 组件的类名
const textareaClass = computed(() => {
  let classes: string[] = [];
  border.value === "surround" &&
    (classes = classes.concat(["hy-border", "hy-textarea--radius"]));
  border.value === "bottom" &&
    (classes = classes.concat(["hy-border__bottom", "hy-textarea--no-radius"]));
  disabled.value && classes.push("hy-textarea--disabled");
  return classes.join(" ");
});
// 组件的样式
const textareaStyle = computed(() => {
  const style: CSSProperties = {};

  return Object.assign(style, customStyle.value);
});
/**
 * @description 边框颜色
 * */
const borderStyle = computed(() => {
  return (isFocus: boolean) => {
    let style: CSSProperties = {};
    if (isFocus) {
      switch (border.value) {
        case "surround":
          style = { border: `1px solid var(--hy-theme-color, #3c9cff)` };
          break;
        case "bottom":
          style = { borderBottom: `1px solid var(--hy-theme-color, #3c9cff)` };
          break;
        default:
          break;
      }
    }
    return style;
  };
});

const onFocus = (e: FocusEvent) => {
  isFocus.value = true;
  emit("focus", e);
};
const onBlur = (e: FocusEvent) => {
  isFocus.value = false;
  emit("blur", e);
  // 尝试调用u-form的验证方法
  // formValidate(this, "blur");
};
const onLinechange = (e: Event) => {
  emit("linechange", e);
};
const onInput = (e: Event) => {
  let { value } = e?.detail;
  // 格式化过滤方法
  const format = formatter.value || innerFormatter;
  const formatValue = format(value);
  // 为了避免props的单向数据流特性，需要先将innerValue值设置为当前值，再在$nextTick中重新赋予设置后的值才有效
  innerValue.value = value;
  nextTick(() => {
    innerValue.value = formatValue;
    valueChange();
  });
};
/**
 * @description 内容发生变化，进行处理
 * */
const valueChange = () => {
  const value = innerValue.value;
  nextTick(() => {
    emit("update:modelValue", value);
    // 标识value值的变化是由内部引起的
    changeFromInner.value = true;
    emit("change", value);
    // 尝试调用u-form的验证方法
    // formValidate(this, "change");
  });
};
const onConfirm = (e: Event) => {
  emit("confirm", e);
};
const onKeyboardheightchange = (e: Event) => {
  emit("keyboardheightchange", e);
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
