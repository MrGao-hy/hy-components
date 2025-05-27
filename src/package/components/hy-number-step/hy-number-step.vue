<template>
  <view class="hy-number-box">
    <!-- 减号 -->
    <view
      v-if="showMinus && !hideMinus && $slots.minus"
      class="hy-number-box__slot cursor-pointer"
      @tap.stop="clickHandler('minus')"
      @touchstart="onTouchStart('minus')"
      @touchend.stop="onClearTimeout"
    >
      <slot name="minus" />
    </view>
    <view
      v-else-if="showMinus && !hideMinus"
      @tap.stop="clickHandler('minus')"
      @touchstart="onTouchStart('minus')"
      @touchend.stop="onClearTimeout"
      hover-class="hy-number-box__minus--hover"
      hover-stay-time="150"
      :class="[
        { 'hy-number-box__minus--disabled': isDisabled('minus') },
        'hy-number-box__minus',
        'cursor-pointer',
      ]"
      :style="buttonStyle('minus')"
    >
      <HyIcon
        :name="minusIcon?.name || IconConfig.MINUS"
        :color="isDisabled('minus') ? '#c8c9cc' : minusIcon?.color"
        :size="minusIcon?.size"
        :bold="minusIcon?.bold"
        :customPrefix="minusIcon?.customPrefix"
        :imgMode="minusIcon?.imgMode"
        :width="minusIcon?.width"
        :height="minusIcon?.height"
        :top="minusIcon?.top"
        :stop="minusIcon?.stop"
        :round="minusIcon?.round"
        :customStyle="minusIcon?.customStyle"
      ></HyIcon>
    </view>
    <!-- 减号 -->

    <template v-if="!hideMinus">
      <slot name="input" :record="currentValue">
        <!-- #ifdef MP-WEIXIN -->
        <input
          :disabled="disabledInput || disabled"
          :cursor-spacing="getCursorSpacing"
          :class="[
            {
              'hy-number-box__input--disabled': disabled || disabledInput,
            },
            'hy-number-box__input',
          ]"
          :value="currentValue"
          @blur="onBlur"
          @focus="onFocus"
          @input="onInput"
          type="number"
          :style="[inputStyle]"
        />
        <!-- #endif -->
        <!-- #ifndef MP-WEIXIN -->
        <input
          :disabled="disabledInput || disabled"
          :cursor-spacing="getCursorSpacing"
          :class="[
            {
              'hy-number-box__input--disabled': disabled || disabledInput,
            },
            'hy-number-box__input',
          ]"
          v-model="currentValue"
          @blur="onBlur"
          @focus="onFocus"
          @input="onInput"
          type="number"
          :style="[inputStyle]"
        />
        <!-- #endif -->
      </slot>
    </template>

    <!-- 加号 -->
    <view
      class="hy-number-box__slot cursor-pointer"
      @tap.stop="clickHandler('plus')"
      @touchstart="onTouchStart('plus')"
      v-if="showPlus && $slots.plus"
      @touchend.stop="onClearTimeout"
    >
      <slot name="plus" />
    </view>
    <view
      v-else-if="showPlus"
      @tap.stop="clickHandler('plus')"
      @touchstart="onTouchStart('plus')"
      @touchend.stop="onClearTimeout"
      hover-class="hy-number-box__plus--hover"
      hover-stay-time="150"
      :class="[
        { 'hy-number-box__minus--disabled': isDisabled('plus') },
        'hy-number-box__plus',
        'cursor-pointer',
      ]"
      :style="[buttonStyle('plus')]"
    >
      <HyIcon
        :name="plusIcon?.name || IconConfig.PLUS"
        :color="isDisabled('plus') ? '#c8c9cc' : plusIcon?.color"
        :size="plusIcon?.size"
        :bold="plusIcon?.bold"
        :customPrefix="plusIcon?.customPrefix"
        :imgMode="plusIcon?.imgMode"
        :width="plusIcon?.width"
        :height="plusIcon?.height"
        :top="plusIcon?.top"
        :stop="plusIcon?.stop"
        :round="plusIcon?.round"
        :customStyle="plusIcon?.customStyle"
      ></HyIcon>
    </view>
    <!-- 加号 -->
  </view>
</template>

<script lang="ts">
export default {
  name: 'hy-number-step',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script setup lang="ts">
import {
  computed,
  type CSSProperties,
  toRefs,
  ref,
  watch,
  onMounted,
  nextTick,
} from "vue";
import defaultProps from "./props";
import type IProps from "./typing";
import { addUnit } from "../../utils";
import { IconConfig } from "../../config";
import HyIcon from "../hy-icon/hy-icon.vue";

const props = withDefaults(defineProps<IProps>(), defaultProps);
const {
  modelValue,
  miniMode,
  cursorSpacing,
  inputBgColor,
  inputWidth,
  buttonSize,
  buttonWidth,
  bgColor,
  color,
  buttonRadius,
  disabledInput,
  disabled,
  integer,
  max,
  min,
  decimalLength,
  disablePlus,
  disableMinus,
  longPress,
  asyncChange,
  step,
} = toRefs(props);
const emit = defineEmits([
  "update:modelValue",
  "focus",
  "blur",
  "overLimit",
  "change",
  "plus",
  "minus",
]);
type StepType = "plus" | "minus";

// 输入框实际操作的值
const currentValue = ref<number>(0);
// 定时器
const longPressTimer = ref<null | number | NodeJS.Timeout>(null);

const stepType = ref<StepType>("plus");

/**
 * @description 格式化整理数据，限制范围
 * @param value 处理值
 * */
const format = (value: number): number => {
  // 如果为空字符串，那么设置为0，同时将值转为Number类型
  value = !value ? 0 : +value;
  // 对比最大最小值，取在min和max之间的值
  value = Math.max(Math.min(max.value, value), min.value);
  // 如果设定了最大的小数位数，使用toFixed去进行格式化
  if (decimalLength.value !== null) {
    value = parseFloat(value.toFixed(decimalLength.value));
  }
  return value;
};

// 用于监听多个值发生变化
const watchChange = computed(() => {
  return [integer.value, decimalLength.value, min.value, max.value];
});

watch(
  () => watchChange.value,
  () => check(),
);
watch(
  () => modelValue.value,
  (newValue: number) => {
    if (newValue !== currentValue.value) {
      currentValue.value = format(modelValue.value);
    }
  },
  { immediate: true },
);

const hideMinus = computed(() => {
  return currentValue.value == 0 && miniMode.value;
});
const getCursorSpacing = computed(() => {
  // 判断传入的单位，如果为px单位，需要转成px
  return cursorSpacing.value;
});
// 按钮的样式
const buttonStyle = computed(() => {
  return (type: string) => {
    const style: CSSProperties = {
      backgroundColor: bgColor.value,
      width: addUnit(buttonWidth.value),
      height: addUnit(buttonSize.value),
      color: color.value,
      borderRadius: buttonRadius.value,
    };
    return style;
  };
});
// 输入框的样式
const inputStyle = computed<CSSProperties>(() => {
  // const disabled_1 = disabled.value || disabledInput.value;
  return {
    color: color.value,
    backgroundColor: inputBgColor.value || bgColor.value,
    height: addUnit(buttonSize.value),
    width: addUnit(inputWidth.value),
  };
});

const isDisabled = computed(() => {
  return (type: string) => {
    if (type === "plus") {
      // 在点击增加按钮情况下，判断整体的disabled，是否单独禁用增加按钮，以及当前值是否大于最大的允许值
      return (
        disabled.value || disablePlus.value || currentValue.value >= max.value
      );
    }
    // 点击减少按钮同理
    return (
      disabled.value || disableMinus.value || currentValue.value <= min.value
    );
  };
});

onMounted(() => {
  init();
});

const init = () => {
  currentValue.value = format(modelValue.value);
};
const check = () => {
  // 格式化了之后，如果前后的值不相等，那么设置为格式化后的值
  const val = format(currentValue.value);
  if (val !== currentValue.value) {
    currentValue.value = val;
    emitChange(val);
  }
};

/**
 * @description 输入框活动焦点
 */
const onFocus = (event: Event) => {
  emit("focus", event.detail);
};
/**
 * @description 输入框失去焦点
 */
const onBlur = (event: Event) => {
  // 对输入值进行格式化
  format(event.detail.value);
  // 发出blur事件
  emit("blur", event.detail);
};
/**
 * @description 输入框值发生变化
 */
const onInput = (e: Event) => {
  const { value = "" } = e.detail || {};
  // 为空返回
  if (value === "") return;
  let formatted = value;
  // https://github.com/ijry/uview-plus/issues/613
  emitChange(value);
  // 最大允许的小数长度
  if (decimalLength.value !== null && formatted.indexOf(".") !== -1) {
    const pair = formatted.split(".");
    formatted = `${pair[0]}.${pair[1].slice(0, decimalLength.value)}`;
  }
  formatted = format(formatted);
  emitChange(formatted);
  // #ifdef MP-WEIXIN
  return formatted;
  // #endif
};
/**
 * @description 发出change事件
 * @param value 值
 */
const emitChange = (value: number) => {
  // 如果开启了异步变更值，则不修改内部的值，需要用户手动在外部通过v-model变更
  if (!asyncChange.value) {
    nextTick(() => {
      emit("update:modelValue", value);
      currentValue.value = value;
      // this.$forceUpdate()
    });
  }
  emit("change", value);
};
const onChange = () => {
  if (isDisabled.value(stepType.value)) {
    return emit("overLimit", stepType.value);
  }
  const diff = stepType.value === "minus" ? -step.value : +step.value;
  const value = format(add(+currentValue.value, diff));
  emitChange(value);
  emit(stepType.value, value);
};
/**
 * @description 对值扩大后进行四舍五入，再除以扩大因子，避免出现浮点数操作的精度问题
 * @param num1
 * @param num2
 * */
const add = (num1: number, num2: number) => {
  const cardinal = Math.pow(10, 10);
  return Math.round((num1 + num2) * cardinal) / cardinal;
};
// 点击加减按钮
const clickHandler = (type: StepType) => {
  stepType.value = type;
  onChange();
};
const longPressStep = () => {
  // 每隔一段时间，重新调用longPressStep方法，实现长按加减
  onClearTimeout();
  longPressTimer.value = setTimeout(() => {
    onChange();
    longPressStep();
  }, 250) as NodeJS.Timeout;
};
const onTouchStart = (type: StepType) => {
  if (!longPress.value) return;
  onClearTimeout();
  stepType.value = type;
  // 一定时间后，默认达到长按状态
  longPressTimer.value = setTimeout(() => {
    onChange();
    longPressStep();
  }, 600);
};
// 触摸结束，清除定时器，停止长按加减
const onTouchEnd = () => {
  if (!longPress.value) return;
  onClearTimeout();
};
// 清除定时器
const onClearTimeout = () => {
  clearTimeout(longPressTimer.value as number);
  longPressTimer.value = null;
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
