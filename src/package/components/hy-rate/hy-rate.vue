<template>
  <view class="hy-rate" :id="elId" ref="hy-rate" :style="[customStyle]">
    <view
      class="hy-rate__content"
      @touchmove.stop="touchMove"
      @touchend.stop="touchEnd"
    >
      <view
        class="hy-rate__content__item cursor-pointer"
        v-for="(item, index) in Number(count)"
        :key="index"
        :class="[elClass]"
      >
        <view
          class="hy-rate__content__item__icon-wrap"
          ref="hy-rate__content__item__icon-wrap"
          @tap.stop="clickHandler($event)"
        >
          <HyIcon
            :name="Math.floor(activeIndex) > index ? activeIcon : inactiveIcon"
            :color="
              disabled
                ? '#c8c9cc'
                : Math.floor(activeIndex) > index
                  ? activeColor
                  : inactiveColor
            "
            :custom-style="{
              padding: `0 ${addUnit(gutter / 2)}`,
            }"
            :size="size"
          ></HyIcon>
        </view>
        <view
          v-if="allowHalf"
          @tap.stop="clickHandler($event)"
          class="hy-rate__content__item__icon-wrap hy-rate__content__item__icon-wrap--half"
          :style="[
            {
              width: addUnit(rateWidth / 2),
            },
          ]"
          ref="hy-rate__content__item__icon-wrap"
        >
          <HyIcon
            :name="Math.ceil(activeIndex) > index ? activeIcon : inactiveIcon"
            :color="
              disabled
                ? '#c8c9cc'
                : Math.ceil(activeIndex) > index
                  ? activeColor
                  : inactiveColor
            "
            :custom-style="{
              padding: `0 ${addUnit(gutter / 2)}`,
            }"
            :size="size"
          ></HyIcon>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'hy-rate',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script setup lang="ts">
import { addUnit, getRect, guid, range, sleep } from "../../utils";
import { ref, watch, toRefs, onMounted, getCurrentInstance } from "vue";
import type IProps from "./typing";
import defaultProps from "./props";

// 组件
import HyIcon from "../hy-icon/hy-icon.vue";

const props = withDefaults(defineProps<IProps>(), defaultProps);
const {
  modelValue,
  touchable,
  minCount,
  count,
  disabled,
  readonly,
  allowHalf,
} = toRefs(props);
const emit = defineEmits(["update:modelValue", "change"]);

const elId = guid();
const elClass = guid();
const rateBoxLeft = ref<number>(0);
const activeIndex = ref(modelValue.value);
// 每个星星的宽度
const rateWidth = ref(0);
// 标识是否正在滑动，由于iOS事件上touch比click先触发，导致快速滑动结束后，接着触发click，导致事件混乱而出错
const moving = ref(false);

watch(
  () => modelValue.value,
  (newValue) => {
    activeIndex.value = newValue;
  },
);
watch(
  () => activeIndex.value,
  (newVal) => {
    emitEvent();
  },
);
const instance = getCurrentInstance();

onMounted(() => {
  init();
});

const init = () => {
  sleep(300).then(async () => {
    await getRateItemRect();
    await getRateIconWrapRect();
  });
};

/**
 * @description 获取评分组件盒子的布局信息
 * */
const getRateItemRect = async () => {
  await sleep();
  // #ifndef APP-NVUE
  const res: UniApp.NodeInfo = (await getRect(
    `#${elId}`,
    false,
    instance,
  )) as UniApp.NodeInfo;
  rateBoxLeft.value = res.left || 0;
  // #endif
};

/**
 * @description 获取单个星星的尺寸
 * */
const getRateIconWrapRect = async () => {
  // uView封装的获取节点的方法，详见文档
  // #ifndef APP-NVUE
  const res: UniApp.NodeInfo = (await getRect(
    `.${elClass}`,
    false,
    instance,
  )) as UniApp.NodeInfo;
  rateWidth.value = res.width || 0;
  // #endif
};
// 手指滑动
const touchMove = (e: TouchEvent) => {
  // 如果禁止通过手动滑动选择，返回
  if (!touchable.value) {
    return;
  }
  e.stopPropagation();
  const x = e.changedTouches[0].pageX;
  getActiveIndex(x);
};
// 停止滑动
const touchEnd = (e: TouchEvent) => {
  // 如果禁止通过手动滑动选择，返回
  if (!touchable.value) {
    return;
  }
  e.stopPropagation();
  const x = e.changedTouches[0].pageX;
  getActiveIndex(x);
};
// 通过点击，直接选中
const clickHandler = (e: TouchEvent) => {
  // if (moving.value) {
  //   return;
  // }
  e.stopPropagation();
  let x = 0;
  // #ifndef APP-NVUE
  x = e.changedTouches[0].pageX;
  // #endif
  getActiveIndex(x, true);
};
// 发出事件
const emitEvent = () => {
  // 发出change事件
  emit("change", activeIndex.value);
  // 同时修改双向绑定的值
  emit("update:modelValue", activeIndex.value);
};
// 获取当前激活的评分图标
const getActiveIndex = (x: number, isClick = false) => {
  if (disabled.value || readonly.value) {
    return;
  }
  // 判断当前操作的点的x坐标值，是否在允许的边界范围内
  const allRateWidth = rateWidth.value * count.value + rateBoxLeft.value;
  // 如果小于第一个图标的左边界，设置为最小值，如果大于所有图标的宽度，则设置为最大值
  x = range(rateBoxLeft.value, allRateWidth, x) - rateBoxLeft.value;
  // 滑动点相对于评分盒子左边的距离
  const distance = x;
  // 滑动的距离，相当于多少颗星星
  let index;
  // 判断是否允许半星
  if (allowHalf.value) {
    index = Math.floor(distance / rateWidth.value);
    // 取余，判断小数的区间范围
    const decimal = distance % rateWidth.value;
    if (decimal <= rateWidth.value / 2 && decimal > 0) {
      index += 0.5;
    } else if (decimal > rateWidth.value / 2) {
      index++;
    }
  } else {
    index = Math.floor(distance / rateWidth.value);
    // 取余，判断小数的区间范围
    const decimal = distance % rateWidth.value;
    // 非半星时，只有超过了图标的一半距离，才认为是选择了这颗星
    if (isClick) {
      if (decimal > 0) index++;
    } else {
      if (decimal > rateWidth.value / 2) index++;
    }
  }
  activeIndex.value = Math.min(index, count.value);
  // 对最少颗星星的限制
  if (activeIndex.value < minCount.value) {
    activeIndex.value = minCount.value;
  }

  // 设置延时为了让click事件在touchmove之前触发
  setTimeout(() => {
    moving.value = true;
  }, 10);
  // 一定时间后，取消标识为移动中状态，是为了让click事件无效
  setTimeout(() => {
    moving.value = false;
  }, 10);
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
