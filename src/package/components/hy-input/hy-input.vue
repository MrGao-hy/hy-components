<template>
  <view
    :class="['hy-input', inputClass]"
    :style="[wrapperStyle, borderStyle(focused)]"
  >
    <view class="hy-input__content">
      <view
        class="hy-input__content__prefix-icon"
        v-if="prefixIcon?.name || $slots.prefix"
        @tap="onPrefix"
      >
        <slot name="prefix">
          <HyIcon
            :name="prefixIcon?.name"
            :size="prefixIcon?.size"
            :color="prefixIcon?.color"
            :bold="prefixIcon?.bold"
            :customPrefix="prefixIcon?.customPrefix"
            :imgMode="prefixIcon?.imgMode"
            :width="prefixIcon?.width"
            :height="prefixIcon?.height"
            :top="prefixIcon?.top"
            :stop="prefixIcon?.stop"
            :round="prefixIcon?.round"
            :customStyle="prefixIcon?.customStyle"
          ></HyIcon>
        </slot>
      </view>
      <view class="hy-input__content__field-wrapper" @tap="clickHandler">
        <!-- 根据uni-app的input组件文档，H5和APP中只要声明了password参数(无论true还是false)，type均失效，此时
					为了防止type=number时，又存在password属性，type无效，此时需要设置password为undefined
				 -->
        <input
          ref="input-native"
          class="hy-input__content__field-wrapper__field"
          :style="[inputStyle]"
          :type="type"
          :focus="focus"
          :cursor="cursor"
          :value="innerValue"
          :auto-blur="autoBlur"
          :disabled="disabled || readonly"
          :maxlength="maxlength"
          :placeholder="placeholder || ''"
          :placeholder-style="formatObject(placeholderStyle)"
          :placeholder-class="placeholderClass"
          :confirm-type="confirmType"
          :confirm-hold="confirmHold"
          :hold-keyboard="holdKeyboard"
          :cursor-spacing="cursorSpacing"
          :adjust-position="adjustPosition"
          :selection-end="selectionEnd"
          :selection-start="selectionStart"
          :password="password || type === 'password' || false"
          :ignoreCompositionEvent="ignoreCompositionEvent"
          @input="onInput"
          @blur="onBlur"
          @focus="onFocus"
          @confirm="onConfirm"
          @keyboardheightchange="onkeyboardheightchange"
          @nicknamereview="onnicknamereview"
        />
      </view>
      <view
        class="hy-input__content__clear"
        v-if="isShowClear"
        @click="onClear"
      >
        <HyIcon
          :name="IconConfig.CLOSE"
          size="11"
          color="#ffffff"
          :customStyle="{ lineHeight: '12px' }"
        ></HyIcon>
      </view>
      <view
        class="hy-input__content__subfix-icon"
        v-if="suffixIcon?.name || $slots.suffix"
        @tap="onSuffix"
      >
        <slot name="suffix">
          <HyIcon
            :name="suffixIcon?.name"
            :size="suffixIcon?.size"
            :color="suffixIcon?.color"
            :bold="suffixIcon?.bold"
            :customPrefix="suffixIcon?.customPrefix"
            :imgMode="suffixIcon?.imgMode"
            :width="suffixIcon?.width"
            :height="suffixIcon?.height"
            :top="suffixIcon?.top"
            :stop="suffixIcon?.stop"
            :round="suffixIcon?.round"
            :customStyle="suffixIcon?.customStyle"
          ></HyIcon>
        </slot>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: "hy-input",
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
  nextTick,
  ref,
  toRefs,
  watch,
  getCurrentInstance,
} from "vue";
import type { CSSProperties } from "vue";
import HyIcon from "../hy-icon/hy-icon.vue";
import { addUnit, formatObject } from "../../utils";
import defaultProps from "./props";
import { IconConfig } from "../../config";
import type IProps from "./typing";

const props = withDefaults(defineProps<IProps>(), defaultProps);
const {
  disabled,
  disabledColor,
  border,
  color,
  inputAlign,
  customStyle,
  fontSize,
  readonly,
  placeholderStyle,
} = toRefs(props);
const emit = defineEmits([
  "blur",
  "focus",
  "confirm",
  "keyboardheightchange",
  "nicknamereview",
  "change",
  "update:modelValue",
  "clear",
  "onPrefix",
  "onSuffix",
]);

const instance = getCurrentInstance();
// 清除操作
const clearInput = ref<boolean>(false);
// 输入框的值
const innerValue = ref<string | number>("");
// 是否处于获得焦点状态
const focused = ref<boolean>(false);
// value是否第一次变化，在watch中，由于加入immediate属性，会在第一次触发，此时不应该认为value发生了变化
const firstChange = ref<boolean>(true);
// value绑定值的变化是由内部还是外部引起的
const changeFromInner = ref<boolean>(false);
const innerFormatter = (value: string) => value;

watch(
  () => props.modelValue,
  (newVal) => {
    if (changeFromInner.value || innerValue.value === newVal) {
      changeFromInner.value = false; // 重要否则会出现双向绑定失效问题https://github.com/ijry/uview-plus/issues/419
      return;
    }
    innerValue.value = newVal;
    // 在H5中，外部value变化后，修改input中的值，不会触发@input事件，此时手动调用值变化方法
    if (firstChange.value === false && changeFromInner.value === false) {
      valueChange(innerValue.value, true);
    } else {
      // 尝试调用up-form的验证方法
      // if (!firstChange.value) formValidate(this, "change");
    }
    firstChange.value = false;
    // 重置changeFromInner的值为false，标识下一次引起默认为外部引起的
    changeFromInner.value = false;
  },
  { immediate: true },
);

/**
 * @description 是否显示清除控件
 * */
const isShowClear = computed(() => {
  const { clearable, readonly } = props;
  return clearable && !readonly && !!focused.value && innerValue.value !== "";
});
/**
 * @description 组件的类名
 * */
const inputClass = computed((): string => {
  let classes: string[] = [],
    { border, shape } = props;
  border === "surround" &&
    (classes = classes.concat(["hy-border", "hy-input--radius"]));
  classes.push(`hy-input--${shape}`);
  border === "bottom" &&
    (classes = classes.concat(["hy-border__bottom", "hy-input--no-radius"]));
  disabled.value && classes.push("hy-input--disabled");
  return classes.join(" ");
});

/**
 * @description 组件的样式
 * */
const wrapperStyle = computed((): CSSProperties => {
  const style: CSSProperties = {};
  style.paddingTop = "6px";
  style.paddingBottom = "6px";
  style.paddingLeft = "9px";
  style.paddingRight = "9px";
  // 禁用状态下，被背景色加上对应的样式
  if (disabled.value) {
    style.backgroundColor = disabledColor.value;
  }
  return Object.assign(style, customStyle.value);
});
/**
 * @description 输入框的样式
 * */
const inputStyle = computed((): CSSProperties => {
  return {
    color: color.value,
    fontSize: addUnit(fontSize.value),
    textAlign: inputAlign.value,
  };
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

/**
 * @description 当键盘输入时，触发input事件
 */
const onInput = (e: any) => {
  let { value = "" } = e.detail || {};
  // 为了避免props的单向数据流特性，需要先将innerValue值设置为当前值，再在$nextTick中重新赋予设置后的值才有效
  // console.log('onInput', value, this.innerValue)
  innerValue.value = value;
  nextTick(() => {
    let formatValue = innerFormatter(value);
    innerValue.value = formatValue;
    valueChange(formatValue);
  });
};
/**
 * @description 输入框失去焦点时触发
 * */
const onBlur = (event: Event) => {
  emit("blur", event.detail.value);
  // H5端的blur会先于点击清除控件的点击click事件触发，导致focused
  // 瞬间为false，从而隐藏了清除控件而无法被点击到
  setTimeout(() => {
    focused.value = false;
  }, 150);
};
/**
 * @description 输入框聚焦时触发
 * */
const onFocus = () => {
  focused.value = true;
  emit("focus");
};

/**
 * @description 点击完成按钮时触发
 * */
const onConfirm = (event: string) => {
  emit("confirm", innerValue.value);
};
/**
 * 键盘高度发生变化的时候触发此事件
 * 兼容性：微信小程序2.7.0+、App 3.1.0+
 * */
const onkeyboardheightchange = (event: any) => {
  emit("keyboardheightchange", event);
};
const onnicknamereview = (event: any) => {
  emit("nicknamereview", event);
};
/**
 * 内容发生变化，进行处理
 */
const valueChange = (value: string | number, isOut = false) => {
  if (clearInput.value) {
    innerValue.value = "";
    clearInput.value = false;
  }
  nextTick(() => {
    if (!isOut || clearInput.value) {
      // 标识value值的变化是由内部引起的
      changeFromInner.value = true;
      emit("change", value);

      emit("update:modelValue", value);
    }
  });
};
/**
 * @description 点击清除控件
 */
const onClear = () => {
  clearInput.value = true;
  innerValue.value = "";
  nextTick(() => {
    valueChange("");
    emit("clear");
  });
};
/**
 * 在安卓nvue上，事件无法冒泡
 * 在某些时间，我们希望监听u-from-item的点击事件，此时会导致点击u-form-item内的u-input后
 * 无法触发u-form-item的点击事件，这里通过手动调用u-form-item的方法进行触发
 */
const clickHandler = () => {
  // 隐藏键盘
  if (disabled.value || readonly.value) {
    uni.hideKeyboard();
  }
};

/**
 * @description 点击前缀
 * */
const onPrefix = () => {
  emit("onPrefix");
};
/**
 * @description 点击后缀
 * */
const onSuffix = () => {
  emit("onSuffix");
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
