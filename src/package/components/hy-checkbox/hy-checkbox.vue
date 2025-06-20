<template>
  <view class="hy-checkbox-group" :class="bemClass">
    <template v-for="(item, i) in columns_1" :key="i">
      <view
        class="hy-checkbox cursor-pointer"
        @tap.stop="wrapperClickHandler($event, item)"
        :style="checkboxStyle"
        :class="[
          `hy-checkbox-label--${iconPlacement}`,
          borderBottom && placement === 'column' && 'hy-border__bottom',
        ]"
      >
        <view
          class="hy-checkbox__icon-wrap cursor-pointer"
          @tap.stop="iconClickHandler($event, item)"
          :class="iconClasses(item)"
          :style="iconWrapStyle(item)"
        >
          <slot
            name="icon"
            :iconColor="iconColor"
            :iconSize="addUnit(iconSize)"
          >
            <HyIcon
              class="hy-checkbox__icon-wrap__icon"
              :name="IconConfig.CHECK_MASK"
              :size="addUnit(sizeType[size] ?? iconSize)"
              :color="iconColor || '#ffffff'"
            />
          </slot>
        </view>
        <view
          :class="[
            'hy-checkbox__label-wrap',
            'cursor-pointer',
            disabled && 'hy-checkbox__label-wrap--disabled',
          ]"
          @tap.stop="labelClickHandler($event, item)"
        >
          <slot name="label" :record="item">
            <text
              :style="{
                color: labelColor,
                fontSize: addUnit(sizeType[size] ?? labelSize),
              }"
              >{{ item[fieldNames.label] }}</text
            >
          </slot>
        </view>
      </view>
    </template>
  </view>
</template>

<script lang="ts">
export default {
  name: "hy-checkbox",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared",
  },
};
</script>

<script setup lang="ts">
import defaultProps from "./props";
import type { CheckboxColumnsVo } from "./typing";
import type IProps from "./typing";
import { computed, toRefs, watch, ref, reactive } from "vue";
import type { CSSProperties } from "vue";
import { addUnit, bem, error } from "../../utils";
import { IconConfig } from "../../config";
import HyIcon from "../hy-icon/hy-icon.vue";

const props = withDefaults(defineProps<IProps>(), defaultProps);
const {
  modelValue,
  columns,
  fieldNames,
  disabled,
  shape,
  size,
  iconSize,
  activeColor,
  inactiveColor,
  customStyle,
  borderBottom,
  placement,
  labelDisabled,
} = toRefs(props);
const emit = defineEmits(["change", "update:modelValue"]);

const columns_1 = ref();
const sizeType: AnyObject = reactive({
  small: 14,
  medium: 18,
  large: 22,
});

watch(
  () => modelValue.value,
  (newValue: boolean | (string | number)[]) => {
    // 判断数组长度为1可以传true/false
    if (columns.value?.length === 1 && typeof newValue === "boolean") {
      columns.value[0][fieldNames.value.checked] = newValue;
      columns_1.value = columns.value;
    } else if (Array.isArray(newValue)) {
      columns_1.value = columns.value.map((item) => {
        item[fieldNames.value.checked] = newValue.includes(
          item[fieldNames.value.value] as string,
        );
        return item;
      });
    } else {
      error("传入值不是数组，请传数组值");
    }
  },
  { immediate: true },
);

const isDisabled = (disabledVal?: boolean): boolean =>
  disabled.value || !!disabledVal;

const checkboxStyle = computed(() => {
  const style: CSSProperties = {};
  if (borderBottom.value && placement.value === "row") {
    error(
      "检测到您将borderBottom设置为true，需要同时将u-checkbox-group的placement设置为column才有效",
    );
  }
  // 当父组件设置了显示下边框并且排列形式为纵向时，给内容和边框之间加上一定间隔
  if (borderBottom.value && placement.value === "column") {
    style.paddingBottom = "8px";
  }
  return Object.assign(style, customStyle.value);
});
const bemClass = computed(() => {
  return bem("checkbox-group", props, ["placement"]);
});

/**
 * @description 定义icon的Class类名
 * */
const iconClasses = computed(() => {
  return (temp: CheckboxColumnsVo): string[] => {
    let classes: string[] = [];
    // 组件的形状
    classes.push("hy-checkbox__icon-wrap--" + shape.value);
    if (isDisabled(temp?.disabled)) {
      classes.push("hy-checkbox__icon-wrap--disabled");
    }
    if (temp[fieldNames.value.checked]) {
      classes.push("hy-checkbox__icon-wrap--checked");
      if (isDisabled(temp?.disabled)) {
        classes.push("hy-checkbox__icon-wrap--disabled--checked");
      }
    }
    return classes;
  };
});

/**
 * @description 定义icon的样式
 * */
const iconWrapStyle = computed(() => {
  return (temp: CheckboxColumnsVo): CSSProperties => {
    // checkbox的整体样式
    const style: CSSProperties = {};
    style.backgroundColor =
      temp[fieldNames.value.checked] && !isDisabled(temp?.disabled)
        ? activeColor.value
        : !isDisabled(temp?.disabled)
          ? "#ffffff"
          : "";
    style.borderColor =
      temp[fieldNames.value.checked] && !isDisabled(temp?.disabled)
        ? activeColor.value
        : inactiveColor.value;
    style.width = addUnit(sizeType[size.value] ?? size.value);
    style.height = addUnit(sizeType[size.value] ?? size.value);
    return style;
  };
});

/**
 * @description 点击图标
 * */
const iconClickHandler = (e: Event, temp: CheckboxColumnsVo) => {
  e.stopPropagation();
  if (!isDisabled(temp?.disabled)) {
    setRadioCheckedStatus(temp);
  }
};
/**
 * @description 点击整行
 * */
const wrapperClickHandler = (e: Event, temp: CheckboxColumnsVo) => {
  e.stopPropagation();
  if (!isDisabled(temp?.disabled) || !labelDisabled.value) {
    setRadioCheckedStatus(temp);
  }
};
/**
 * @description 点击label
 * */
const labelClickHandler = (e: Event, temp: CheckboxColumnsVo) => {
  e.stopPropagation();
  if (!isDisabled(temp?.disabled) || !labelDisabled.value) {
    setRadioCheckedStatus(temp);
  }
};

/**
 * @description 执行函数改变状态传给父值
 * */
const setRadioCheckedStatus = (temp: CheckboxColumnsVo) => {
  // 将本组件标记为与原来相反的状态
  columns_1.value = columns_1.value.map((item: CheckboxColumnsVo) => {
    if (temp[fieldNames.value.value] === item[fieldNames.value.value]) {
      item[fieldNames.value.checked] = !item[fieldNames.value.checked];
    }
    return item;
  });
  emit("change", temp);
  emit(
    "update:modelValue",
    columns_1.value.length === 1
      ? columns_1.value[0].checked
      : columns_1.value
          .filter((item: CheckboxColumnsVo) => item[fieldNames.value.checked])
          .map((item: CheckboxColumnsVo) => item[fieldNames.value.value]),
  );
  // 双向绑定
  // if (this.usedAlone) {
  // 	this.$emit('update:checked', this.isChecked)
  // }
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
