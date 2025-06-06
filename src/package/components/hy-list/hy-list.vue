<template>
  <scroll-view
    ref="hyVirtualContainer"
    @scroll="onScroll"
    @scrolltolower="scrollToLower"
    :lower-threshold="showDivider ? 40 : 10"
    :scroll-y="true"
    scroll-with-animation
    class="hy-virtual-container"
  >
    <view class="hy-virtual-container__list">
      <slot
        v-if="slotDefault"
        :record="line === 1 ? virtualData : waterfall"
      ></slot>
      <template v-else>
        <view
          v-if="line === 1"
          class="hy-virtual-container__list--item"
          v-for="(item, i) in virtualData"
          :key="typeof item === 'string' ? i : item[keyField]"
          :style="itemStyle"
          @click="handleClick(item)"
        >
          <slot style="height: 100%" name="content" :record="item"></slot>
        </view>

        <view
          v-if="line === 2"
          class="hy-virtual-container__list--left hy-virtual-container__list--box"
        >
          <view
            v-if="slots.left"
            class="hy-virtual-container__list--box-item"
            v-for="item in waterfall.left"
            :key="item[keyField]"
            :style="itemStyle"
            @click="handleClick(item)"
          >
            <slot name="left" :record="item"></slot>
          </view>
          <slot v-else name="left-list" :record="waterfall.left"> </slot>
        </view>
        <view
          v-if="line === 2"
          class="hy-virtual-container__list--right hy-virtual-container__list--box"
        >
          <view
            v-if="slots.right"
            class="hy-virtual-container__list--box-item"
            v-for="item in waterfall.right"
            :key="item[keyField]"
            :style="itemStyle"
            @click="handleClick(item)"
          >
            <slot name="right" :record="item"></slot>
          </view>
          <slot v-else name="right-list" :record="waterfall.right"> </slot>
        </view>
      </template>
      <!--加载更多样式-->
    </view>
    <!--    <HyDivider :text="load" v-if="showDivider"></HyDivider>-->
  </scroll-view>
</template>

<script lang="ts">
export default {
  name: 'hy-list',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import {
  computed,
  type CSSProperties,
  getCurrentInstance,
  nextTick,
  onMounted,
  reactive,
  ref,
  toRefs,
  useSlots,
  watch,
} from "vue";
import { addUnit, getPx, getRect } from "../../utils";
import type IProps from "./typing";
import defaultProps from "./props";

const props = withDefaults(defineProps<IProps>(), defaultProps);
const {
  list,
  line,
  keyField,
  itemHeight,
  containerHeight,
  marginBottom,
  padding,
  borderRadius,
  background,
  border,
} = toRefs(props);
const emit = defineEmits(["scrollButton", "click"]);

const slots = useSlots();
// 滚动条距离顶部距离
const scrollTop = ref(0);
// 可视区域的高度
const viewHeight = ref(0);
const waterfall: {
  left: AnyObject[];
  right: AnyObject[];
} = reactive({
  left: [],
  right: [],
});
// 排列方式
const arrange = computed(() => (line.value === 1 ? "column" : "row"));
const boxHeight = getPx(itemHeight.value) + getPx(marginBottom.value);
const listHeight = addUnit(containerHeight.value);
const instance = getCurrentInstance();

onMounted(() => {
  nextTick(async () => {
    const res = await getRect(".hy-virtual-container", false, instance);
    viewHeight.value = (res as UniApp.NodeInfo).height ?? 0;
  });
});

const itemStyle = computed((): CSSProperties => {
  return {
    height: addUnit(itemHeight.value),
    padding: addUnit(padding.value),
    marginBottom: addUnit(marginBottom.value),
    borderRadius: addUnit(borderRadius.value),
    background: background.value,
    border: border.value ? "1px solid #dadbde" : "",
  };
});

/**
 * @description 虚拟列表真实展示数据：起始下标
 */
const start = computed(() => {
  const s = Math.floor(scrollTop.value / boxHeight);
  return Math.max(0, s * line.value);
});

/**
 * @description 虚拟列表真实展示数据：结束下标
 */
const over = computed(() => {
  const o = Math.floor(
    (scrollTop.value + viewHeight.value + 1) / boxHeight + 5,
  );
  return Math.min(list.value.length, o * line.value);
});

/**
 * @description 计算虚拟列表的padding(保持列表高度完整且滚动条能正常滚动)
 */
const paddingAttr = computed(() => {
  const paddingTop = start.value * boxHeight;
  const paddingBottom = (list.value.length - over.value) * boxHeight;
  return `${paddingTop / line.value}px 0 ${paddingBottom / line.value}px`;
});

/**
 * @description 虚拟列表真实展示数据
 */
const virtualData = computed(() => {
  return list.value.slice(start.value, over.value);
});

watch(
  () => virtualData.value,
  (newVal, oldValue) => {
    waterfall.left.length = 0;
    waterfall.right.length = 0;
    if (line.value === 2 && newVal.every((item) => typeof item !== "string")) {
      newVal.forEach((item, i) => {
        if (i % 2 === 0) {
          waterfall.left.push(item as AnyObject);
        } else {
          waterfall.right.push(item as AnyObject);
        }
      });
    }
  },
  { immediate: true, deep: true },
);

/**
 * @description 监听滚动条距离顶部距离，实时更新
 */
const onScroll = async (e: any) => {
  scrollTop.value = e.detail.scrollTop ?? 0;
};

/**
 * @description 滚动底部函数
 * */
const scrollToLower = () => {
  emit("scrollButton");
};

/**
 * @description 点击行触发函数
 * */
const handleClick = (temp: string | AnyObject) => {
  emit("click", temp);
};

/**
 * @description 获取默认插槽
 */
const slotDefault = useSlots().default;
</script>

<style lang="scss" scoped>
@import "./index.scss";
.hy-virtual-container {
  height: v-bind(listHeight);
  &__list {
    padding: v-bind(paddingAttr);
    display: flex;
    flex-direction: v-bind(arrange);
  }
}
</style>
