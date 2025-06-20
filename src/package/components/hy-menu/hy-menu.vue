<template>
  <view class="hy-menu" :style="{ width: addUnit(width) }">
    <template v-for="(item, i) in list">
      <view
        @click="handleClick(item, i)"
        :class="menuItemClass(item, i)"
        :style="customStyle"
      >
        <slot name="icon">
          <hy-icon
            class="hy-menu-item__icon"
            :name="item.icon"
            :color="current === i ? color || 'var(--hy-theme-color)' : ''"
            :size="icon?.size || 16"
            :bold="icon?.bold"
            :customPrefix="icon?.customPrefix"
            :imgMode="icon?.imgMode"
            :width="icon?.width"
            :height="icon?.height"
            :top="icon?.top"
            :stop="icon?.stop"
            :round="icon?.round"
            :customStyle="icon?.customStyle || { marginRight: '2px' }"
          ></hy-icon>
        </slot>
        <slot>
          <text class="hy-menu-item--title">{{ item.title }}</text>
        </slot>
        <hy-badge
          :value="item?.badge"
          :offset="badge?.offset"
          :shape="badge?.shape"
          :color="badge?.color"
          :bg-color="badge?.bgColor"
          :inverted="badge?.inverted"
          :type="badge?.type"
          :number-type="badge?.numberType"
          :is-dot="badge?.isDot"
          :absolute="badge?.absolute"
          :max="badge?.max"
          :show-zero="badge?.showZero"
          :custom-style="badge?.customStyle"
        >
        </hy-badge>
      </view>
    </template>
  </view>
</template>

<script lang="ts">
export default {
  name: "hy-menu",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared",
  },
};
</script>

<script lang="ts" setup>
import { computed, ref, toRefs, watch } from "vue";
import type IProps from "./typing";
import type { MenusType } from "./typing";
import defaultProps from "./props";
import { addUnit } from "../../utils";

// 组件
import HyIcon from "../hy-icon/hy-icon.vue";
import HyBadge from "../hy-badge/hy-badge.vue";

const props = withDefaults(defineProps<IProps>(), defaultProps);
const { modelValue, list, color } = toRefs(props);
const emit = defineEmits(["change", "update:modelValue"]);

const current = ref<string | number>(0);

watch(
  () => modelValue.value,
  (newVal: string | number) => {
    current.value = list.value.findIndex((item) => item.id === newVal);
    // current.value = newVal;
  },
);

const menuItemClass = computed(() => {
  return (temp: MenusType, i: number) => {
    const classes = [
      "hy-menu-item",
      prefix.value && "hy-menu-item--prefix",
      suffix.value && "hy-menu-item--suffix",
      temp.disabled && "hy-menu-item--disabled",
    ];
    if (current.value === i) {
      classes.push(
        "hy-menu-item--active",
        color.value && "hy-menu-item--active__color",
      );
    }

    return classes;
  };
});

const prefix = computed(() => {
  // let prefix: boolean = false;
  // if (sidebar) {
  //   let activeIndex: number = sidebar.children.findIndex((c: any) => {
  //     return c.value === sidebar.props.modelValue;
  //   });
  //
  //   let currentIndex: number = sidebar.children.findIndex((c: any) => {
  //     return c.value === props.value;
  //   });
  //
  //   if (currentIndex === activeIndex - 1) {
  //     prefix = true;
  //   }
  // }
  return prefix;
});

const suffix = computed(() => {
  let suffix: boolean = false;
  // if (sidebar) {
  //   let activeIndex: number = sidebar.children.findIndex((c: any) => {
  //     return c.value === sidebar.props.modelValue;
  //   });
  //
  //   let currentIndex: number = sidebar.children.findIndex((c: any) => {
  //     return c.value === props.value;
  //   });
  //
  //   if (currentIndex === activeIndex + 1) {
  //     suffix = true;
  //   }
  // }
  return suffix;
});

function handleClick(temp: MenusType, i: number) {
  if (temp?.disabled) {
    return;
  }
  current.value = i;
  emit("update:modelValue", temp.id);
  emit("change", temp);
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
.hy-menu-item--active__color {
  color: v-bind(color);
  &::before {
    background: v-bind(color);
  }
}
</style>
