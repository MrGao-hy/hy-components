<template>
  <view class="hy-line-progress" :style="customStyle">
    <view
      class="hy-line-progress__background"
      ref="hy-line-progress__background"
      :style="{
        backgroundColor: inactiveColor,
        height: addUnit(height),
      }"
    >
    </view>
    <view class="hy-line-progress__line" :style="[progressStyle]">
      <slot>
        <text
          v-if="showText && percentage >= 10"
          class="hy-line-progress__text"
          :style="{
            fontSize: fontSize ? addUnit(fontSize) : addUnit(getPx(height)),
          }"
          >{{ innserPercentage + "%" }}</text
        >
      </slot>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'hy-line-progress',
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
  getCurrentInstance,
  onMounted,
  ref,
  toRefs,
  watch,
} from "vue";
import defaultProps from "./props";
import type IProps from "./typing";
import { addUnit, getPx, getRect, range, sleep } from "../../utils";

const props = withDefaults(defineProps<IProps>(), defaultProps);
const { percentage, activeColor, height } = toRefs(props);

const instance = getCurrentInstance();
const lineWidth = ref<string | number>(0);

watch(
  () => percentage.value,
  () => resizeProgressWidth(),
);

const progressStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {};
  style.width = lineWidth.value;
  style.backgroundColor = activeColor.value;
  style.height = addUnit(height.value);
  return style;
});

const innserPercentage = computed(() => {
  // 控制范围在0-100之间
  return range(0, 100, percentage.value);
});

onMounted(() => {
  init();
});

const init = async () => {
  await sleep(20);
  resizeProgressWidth();
};
const getProgressWidth = () => {
  return new Promise((resolve) => {
    // #ifndef APP-NVUE
    resolve(getRect(".hy-line-progress__background", false, instance));
    // #endif
  });
};

/**
 * @description 计算轨道长度
 * */
const resizeProgressWidth = async () => {
  const { width } = await getProgressWidth();
  // 通过设置的percentage值，计算其所占总长度的百分比
  lineWidth.value = addUnit((width * innserPercentage.value) / 100);
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
