<template>
  <view class="hy-radio-group" :class="bemClass">
    <template v-for="(item, i) in columns_1" :key="i">
      <view
        class="hy-radio cursor-pointer"
        @tap.stop="wrapperClickHandler($event, item)"
        :style="radioStyle"
        :class="[
          `hy-radio-label--${iconPlacement}`,
          borderBottom && placement === 'column' && 'hy-border__bottom',
        ]"
      >
        <view
          class="hy-radio__icon-wrap cursor-pointer"
          @tap.stop="iconClickHandler($event, item)"
          :class="iconClasses(item)"
          :style="iconWrapStyle(item)"
        >
          <slot
            name="icon"
            :iconColor="iconColor"
            :iconSize="addUnit(sizeType[size] ?? iconSize)"
          >
            <HyIcon
              class="hy-radio__icon-wrap__icon"
              :name="IconConfig.CHECK_MASK"
              :size="addUnit(sizeType[size] ?? iconSize)"
              :color="iconColorCom(item.checked)"
            />
          </slot>
        </view>
        <view
          class="hy-radio__label-wrap cursor-pointer"
          @tap.stop="labelClickHandler($event, item)"
        >
          <slot name="label" :record="item">
            <text
              :class="[
                'hy-radio__text',
                disabled && 'hy-radio__label-wrap--disabled',
              ]"
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
  name: "hy-radio",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared",
  },
};
</script>

<script setup lang="ts">
import type IProps from "./typing";
import type { CheckboxColumnsVo } from "../hy-check-button/typing";
import defaultProps from "./props";
import {
  computed,
  type CSSProperties,
  reactive,
  ref,
  toRefs,
  watch,
} from "vue";
import { addUnit, bem, error } from "../../utils";
import { IconConfig } from "../../config";

// 组件
import HyIcon from "../hy-icon/hy-icon.vue";

const props = withDefaults(defineProps<IProps>(), defaultProps);
const {
  modelValue,
  columns,
  fieldNames,
  disabled,
  shape,
  size,
  activeColor,
  inactiveColor,
  customStyle,
  borderBottom,
  placement,
  iconColor,
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
  (newValue) => {
    columns_1.value = columns.value.map((item: any) => {
      item[fieldNames.value.checked] =
        newValue === item[fieldNames.value.value];
      return item;
    });
  },
  { immediate: true },
);

const isDisabled = (disabledVal?: boolean): boolean =>
  disabled.value || !!disabledVal;

/**
 * @description icon颜色
 * */
const iconColorCom = computed(() => {
  return (check: boolean) => {
    if (disabled.value) {
      if (check) {
        return "#c8c9cc";
      } else {
        return "#F5F5F5";
      }
    } else {
      return iconColor.value || "#ffffff";
    }
  };
});
/**
 * @description 单选框样式
 * */
const radioStyle = computed(() => {
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
  return bem("radio-group", props, ["placement"]);
});

/**
 * @description 定义icon的Class类名
 * */
const iconClasses = computed(() => {
  return (temp: CheckboxColumnsVo): string[] => {
    let classes: string[] = [];
    // 组件的形状
    classes.push("hy-radio__icon-wrap--" + shape.value);
    if (isDisabled(temp?.disabled)) {
      classes.push("hy-radio__icon-wrap--disabled");
    }
    if (temp[fieldNames.value.checked]) {
      classes.push("hy-radio__icon-wrap--checked");
      if (isDisabled(temp?.disabled)) {
        classes.push("hy-radio__icon-wrap--disabled--checked");
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
 * @description 点击整体
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
  columns_1.value = columns_1.value.map((item) => {
    if (temp[fieldNames.value.value] === item[fieldNames.value.value]) {
      item[fieldNames.value.checked] = true;
    } else {
      item[fieldNames.value.checked] = false;
    }
    return item;
  });
  emit("change", temp);
  emit("update:modelValue", temp[fieldNames.value.value]);
  // 双向绑定
  // if (this.usedAlone) {
  // 	this.$emit('update:checked', this.isChecked)
  // }
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
