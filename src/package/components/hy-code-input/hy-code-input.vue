<template>
  <view class="hy-code-input">
    <view
      :class="[
        'hy-code-input--item',
        `hy-code-input--item__${mode}`,
        current > index && `hy-code-input--item__${mode}__border`,
        isFocus && current === index && `hy-code-input--item__${mode}__active`,
      ]"
      :style="[itemStyle(index)]"
      v-for="(item, index) in codeLength"
      :key="index"
    >
      <view
        class="hy-code-input--item__dot"
        v-if="dot && current > index"
        :style="{ color: color }"
      ></view>
      <text
        v-else
        class="hy-code-input--item__text"
        :style="{
          fontSize: addUnit(fontSize),
          fontWeight: bold ? 'bold' : 'normal',
          color: color,
        }"
        >{{ codeArray[index] }}</text
      >
    </view>
    <input
      :disabled="disabledKeyboard"
      type="number"
      :focus="focus"
      :value="inputValue"
      :maxlength="maxlength"
      :adjustPosition="adjustPosition"
      class="hy-code-input__input"
      @input="inputHandler"
      :style="{
        height: boxSize,
      }"
      @focus="isFocus = true"
      @blur="isFocus = false"
    />
  </view>
</template>

<script lang="ts">
export default {
  name: "hy-code-input",
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
  nextTick,
  onUnmounted,
  ref,
  toRefs,
  watch,
} from "vue";
import type IProps from "./typing";
import defaultProps from "./props";
import { addUnit, getPx } from "../../utils";

const props = withDefaults(defineProps<IProps>(), defaultProps);
const {
  modelValue,
  focus,
  maxlength,
  disabledDot,
  size,
  mode,
  hairline,
  space,
  borderColor,
} = toRefs(props);
const emit = defineEmits(["change", "finish", "update:modelValue"]);

const current = ref(0);
const inputValue = ref("");
const isFocus = ref(focus.value);
let timer: ReturnType<typeof setInterval>;
const opacity = ref(1);
const borderWidth = computed(() => (hairline.value ? "0.5px" : "2px"));
const lineHeight = computed(() => (hairline.value ? "2px" : "4px"));
const boxSize = addUnit(size.value);

watch(
  () => modelValue.value,
  (newValue: string | number) => {
    inputValue.value = String(newValue).substring(0, maxlength.value);
    current.value = newValue.toString().length;
  },
  { immediate: true },
);

watch(
  () => isFocus.value,
  (newValue) => {
    // #ifdef APP-NVUE
    if (newValue) {
      timer = setInterval(() => {
        opacity.value = Math.abs(opacity.value - 1);
      }, 600);
    } else {
      clearInterval(timer);
    }
    // #endif
  },
);

onUnmounted(() => {
  // #ifdef APP-NVUE
  clearInterval(timer);
  // #endif
});

// 根据长度，循环输入框的个数，因为头条小程序数值不能用于v-for
const codeLength = computed(() => {
  return new Array(Number(maxlength.value));
});
// 循环item的样式
const itemStyle = computed(() => {
  return (index: number) => {
    const style: CSSProperties = {
      width: boxSize,
      height: boxSize,
      "--hy-border-color": borderColor.value,
    };
    // 盒子模式下，需要额外进行处理
    if (mode.value === "box") {
      // 设置盒子的边框，如果是细边框，则设置为1px宽度
      style.borderWidth = borderWidth.value;
      style.borderStyle = "solid";
      style.borderColor = borderColor.value;
      // 如果盒子间距为0的话
      if (getPx(space.value) === 0) {
        // 给第一和最后一个盒子设置圆角
        if (index === 0) {
          style.borderTopLeftRadius = "3px";
          style.borderBottomLeftRadius = "3px";
        }
        if (index === codeLength.value.length - 1) {
          style.borderTopRightRadius = "3px";
          style.borderBottomRightRadius = "3px";
        }
        // 最后一个盒子的右边框需要保留
        if (index !== codeLength.value.length - 1) {
          style.borderRight = "none";
        }
      }
    }
    if (index !== codeLength.value.length - 1) {
      // 设置验证码字符之间的距离，通过margin-right设置，最后一个字符，无需右边框
      style.marginRight = addUnit(space.value);
    } else {
      // 最后一个盒子的有边框需要保留
      style.marginRight = 0;
    }

    return style;
  };
});

/**
 * @description 将输入的值，转为数组，给item历遍时，根据当前的索引显示数组的元素
 */
const codeArray = computed(() => {
  return String(inputValue.value).split("");
});

/**
 * @description 监听输入框的值发生变化
 * */
const inputHandler = (e: any) => {
  const value = e.detail.value;
  inputValue.value = value;
  // 是否允许输入“.”符号
  if (disabledDot.value) {
    nextTick(() => {
      inputValue.value = value.replace(".", "");
    });
  }
  // 未达到maxlength之前，发送change事件，达到后发送finish事件
  emit("change", value);
  // 修改通过v-model双向绑定的值
  emit("update:modelValue", value);
  // 达到用户指定输入长度时，发出完成事件
  if (String(value).length >= Number(maxlength.value)) {
    emit("finish", value);
  }
};
</script>

<style scoped lang="scss">
@import "./index.scss";
@import "../../libs/css/mixin.scss";
@import "../../theme.scss";
@include b(code-input) {
  @include m(item) {
    &__box {
      &__active {
        width: v-bind(boxSize);
        height: v-bind(boxSize);
        border-width: v-bind(borderWidth);
      }
    }
    &__line {
      &::after {
        height: v-bind(lineHeight);
        background-color: $hy-border-color;
      }
    }
  }
}
</style>
