<template>
  <view :class="[`hy-steps--${direction}`, 'hy-steps']">
    <template v-for="(item, i) in list" :key="i">
      <view
        ref="hy-steps-item"
        :class="[`hy-steps-item--${direction}`, 'hy-steps-item']"
      >
        <!--	线条	-->
        <view
          v-if="i > 0"
          :class="[
            `hy-steps-item__line--${direction}`,
            'hy-steps-item__line',
            statusClass(i, item.error),
          ]"
          :style="lineStyle(item, i)"
        ></view>
        <!--	线条	-->

        <!-- 步骤状态 -->
        <view
          :class="[
            `hy-steps-item__wrapper--${direction}`,
            dot ? `hy-steps-item__wrapper--dot` : statusClass(i, item.error),
            'hy-steps-item__wrapper',
          ]"
          :style="itemStyleInner"
        >
          <slot name="icon" :error="item?.error" :index="i">
            <view
              :class="[
                'hy-steps-item__wrapper--dot__item',
                `hy-steps-item__wrapper--dot__${statusClass(i, item.error)}`,
              ]"
              v-if="dot"
              :style="{
                backgroundColor: statusColor(i, item?.error),
              }"
            >
            </view>
            <view
              class="hy-steps-item__wrapper__icon"
              v-else-if="activeIcon || inactiveIcon"
            >
              <HyIcon
                :name="i <= current ? activeIcon : inactiveIcon"
                :size="iconSize"
                :color="i <= current ? activeColor : inactiveColor"
              >
              </HyIcon>
            </view>
            <view
              v-else
              :style="{
                backgroundColor:
                  statusClass(i, item.error) === 'process'
                    ? activeColor
                    : 'transparent',
                borderColor: statusColor(i, item?.error),
              }"
              class="hy-steps-item__wrapper__circle"
            >
              <text
                v-if="
                  statusClass(i, item.error) === 'process' ||
                  statusClass(i, item.error) === 'wait'
                "
                class="hy-steps-item__wrapper__circle__text"
                :style="{
                  color: i == current ? '#ffffff' : inactiveColor,
                }"
                >{{ i + 1 }}</text
              >
              <HyIcon
                v-else
                :color="
                  statusClass(i, item.error) === 'error' ? 'error' : activeColor
                "
                :size="iconSize"
                :name="
                  statusClass(i, item.error) === 'error'
                    ? IconConfig.CLOSE
                    : IconConfig.CHECK_MASK
                "
              ></HyIcon>
            </view>
          </slot>
        </view>
        <!-- 步骤状态 -->

        <!-- 内容区域 -->
        <view
          class="hy-steps-item__content"
          :class="[`hy-steps-item__content--${direction}`]"
          :style="[contentStyle]"
        >
          <slot name="content" :record="item" :index="i">
            <slot name="title" :title="item.title" :index="i">
              <text
                :class="[
                  current == i && 'hy-steps-item__content__title--active',
                ]"
                :style="{
                  lineHeight: '20px',
                  fontSize: current == i ? '14px' : '13px',
                }"
                >{{ item.title }}</text
              >
            </slot>
            <slot name="desc" :desc="item.desc" :index="i">
              <text :style="{ fontSize: '12px', color: '#999' }">{{
                item.desc
              }}</text>
            </slot>
          </slot>
        </view>
        <!-- 内容区域 -->
      </view>
    </template>
  </view>
</template>

<script lang="ts">
export default {
  name: "hy-steps",
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
  toRefs,
  ref,
  onMounted,
  getCurrentInstance,
  watch,
} from "vue";
import defaultProps from "./props";
import type IProps from "./typing";
import type { StepListVo } from "./typing";
import { addUnit, getRect } from "../../utils";
import { ColorConfig, IconConfig } from "../../config";

// 组件
import HyIcon from "../hy-icon/hy-icon.vue";

const props = withDefaults(defineProps<IProps>(), defaultProps);
const { current, list, direction, dot, inactiveColor, activeColor } =
  toRefs(props);
const emit = defineEmits(["click", "update:current"]);

const size = ref<UniApp.NodeInfo>({
  height: 0,
  width: 0,
});
const instance = getCurrentInstance();

watch(
  () => current.value,
  (newVal: number) => {
    if (list.value[newVal - 1]?.error) {
      const index = list.value.findIndex((item) => item.error);
      emit("update:current", index);
    }
  },
);

/**
 * @description 线条样式
 * */
const lineStyle = computed(() => {
  return (temp: StepListVo, index: number): CSSProperties => {
    const style: CSSProperties = {};
    if (direction.value === "row") {
      style.width = addUnit(size.value.width! - 25);
      style.left = addUnit(-size.value.width! / 2 + 12);
    } else {
      style.height = addUnit(size.value.height! - 30);
      style.top = addUnit(25);
    }
    style.backgroundColor = temp.error
      ? ""
      : index < current.value
        ? activeColor.value
        : inactiveColor.value;
    return style;
  };
});

const itemStyleInner = computed(() => {
  return {};
});
/**
 * @description 状态类名
 * */
const statusClass = computed(() => {
  return (index: number, error: boolean = false) => {
    if (current.value == index) {
      return error ? "error" : "process";
    } else if (current.value > index) {
      return "finish";
    } else {
      return "wait";
    }
  };
});
const statusColor = computed(() => {
  return (index: number, error?: boolean) => {
    let colorTmp = "";
    switch (statusClass.value(index, error)) {
      case "finish":
        colorTmp = activeColor.value;
        break;
      case "error":
        colorTmp = ColorConfig.error;
        break;
      case "process":
        colorTmp = dot.value ? activeColor.value : "transparent";
        break;
      default:
        colorTmp = inactiveColor.value;
        break;
    }
    return colorTmp;
  };
});

const contentStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {};
  if (direction.value === "column") {
    style.marginLeft = dot.value ? "2px" : "6px";
    style.marginTop = dot.value ? "0px" : "6px";
  } else {
    style.marginTop = dot.value ? "2px" : "6px";
    style.marginLeft = dot.value ? "2px" : "6px";
  }

  return style;
});

onMounted(() => {
  getStepsItemRect();
});

// 获取组件的尺寸，用于设置横线的位置
const getStepsItemRect = () => {
  getRect(".hy-steps-item", false, instance).then((rect) => {
    size.value = rect as UniApp.NodeInfo;
  });
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
