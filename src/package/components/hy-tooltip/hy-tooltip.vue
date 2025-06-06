<template>
  <view class="hy-tooltip" :style="customStyle">
    <HyOverlay
      :show="showTooltip && tooltipTop !== -10000 && overlay"
      :customStyle="{ backgroundColor: 'rgba(0, 0, 0, 0)' }"
      @click="overlayClickHandler"
    ></HyOverlay>
    <view class="hy-tooltip__wrapper">
      <text
        class="hy-tooltip__wrapper__text"
        :id="textId"
        :ref="textId"
        :userSelect="false"
        :selectable="false"
        @longpress.stop="longPressHandler"
        :style="{
          color: color,
          backgroundColor:
            bgColor && showTooltip && tooltipTop !== -10000
              ? bgColor
              : 'transparent',
        }"
        >{{ text }}</text
      >
      <HyTransition
        mode="fade"
        :show="showTooltip"
        :duration="300"
        :customStyle="{
          position: 'absolute',
          top: addUnit(tooltipTop),
          zIndex: zIndex,
          ...tooltipStyle,
        }"
      >
        <view
          class="hy-tooltip__wrapper__popup"
          :id="tooltipId"
          :ref="tooltipId"
        >
          <view
            v-if="showCopy || buttons.length"
            class="hy-tooltip__wrapper__popup__indicator"
            hover-class="hy-tooltip__wrapper__popup__indicator--hover"
            :style="[
              indicatorStyle,
              {
                width: addUnit(indicatorWidth),
                height: addUnit(indicatorWidth),
              },
            ]"
          >
            <!-- 由于nvue不支持三角形绘制，这里就做一个四方形，再旋转45deg，得到露出的一个三角 -->
          </view>
          <view class="hy-tooltip__wrapper__popup__list">
            <view
              v-if="showCopy"
              class="hy-tooltip__wrapper__popup__list__btn"
              hover-class="hy-tooltip__wrapper__popup__list__btn--hover"
              @tap="setClipboardData"
            >
              <text class="hy-tooltip__wrapper__popup__list__btn__text"
                >复制</text
              >
            </view>
            <HyLine
              direction="column"
              color="#8d8e90"
              v-if="showCopy && buttons.length > 0"
              length="18"
            ></HyLine>
            <block v-for="(item, index) in buttons" :key="index">
              <view
                class="hy-tooltip__wrapper__popup__list__btn"
                hover-class="hy-tooltip__wrapper__popup__list__btn--hover"
              >
                <text
                  class="hy-tooltip__wrapper__popup__list__btn__text"
                  @tap="btnClickHandler(index)"
                  >{{ item }}</text
                >
              </view>
              <HyLine
                direction="column"
                color="#8d8e90"
                v-if="index < buttons.length - 1"
                length="18"
              ></HyLine>
            </block>
          </view>
        </view>
      </HyTransition>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'hy-tooltip',
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
  onMounted, getCurrentInstance,
} from "vue";
import defaultProps from "./props";
import type IProps from "./typing";
import { addUnit, getRect, guid, sleep } from "../../utils";

// 组件
import HyOverlay from "../hy-overlay/hy-overlay.vue";
import HyTransition from "../hy-transition/hy-transition.vue";
import HyLine from "../hy-line/hy-line.vue";

const props = withDefaults(defineProps<IProps>(), defaultProps);
const { showToast, copyText, text, showCopy, buttons, direction } =
  toRefs(props);
const emit = defineEmits(["click"]);

const instance = getCurrentInstance();
const showTooltip = ref<boolean>(true);
const textId = ref(guid());
const tooltipId = ref(guid());
const tooltipTop = ref<number>(-10000);
// 气泡的位置信息
const tooltipInfo = ref<UniApp.NodeInfo>({
  width: 0,
  left: 0,
});
const textInfo = ref<UniApp.NodeInfo>({
  width: 0,
  left: 0,
  right: 0,
});
// 三角形指示器的样式
const indicatorStyle = ref<CSSProperties>({
  left: 0,
  right: 0,
});
// 气泡在可能超出屏幕边沿范围时，重新定位后，距离屏幕边沿的距离
const screenGap = ref(12);
// 三角形指示器的宽高，由于对元素进行了角度旋转，精确计算指示器位置时，需要用到其尺寸信息
const indicatorWidth = ref(14);

// 特别处理H5的复制，因为H5浏览器是自带系统复制功能的，在H5环境
// 当一些依赖参数变化时，需要重新计算气泡和指示器的位置信息
const propsChange = computed(() => {
  return [text.value, buttons.value];
});
// 计算气泡和指示器的位置信息
const tooltipStyle = computed(() => {
  const style: CSSProperties = {
      transform: `translateY(${direction.value === "top" ? "-100%" : "100%"})`,
    },
    // #ifdef APP || H5 || MP-WEIXIN
    sysInfo = uni.getWindowInfo();
  // #endif
  if (
    tooltipInfo.value.width! / 2 >
    textInfo.value.left! + textInfo.value.width! / 2 - screenGap.value
  ) {
    indicatorStyle.value = {};
    style.left = `-${addUnit(textInfo.value.left! - screenGap.value)}`;
    indicatorStyle.value.left = addUnit(
      textInfo.value.width! / 2 - Number(style.left) - indicatorWidth.value / 2,
    );
  } else if (
    tooltipInfo.value.width! / 2 >
    sysInfo.windowWidth -
      textInfo.value.right! +
      textInfo.value.width! / 2 -
      screenGap.value
  ) {
    indicatorStyle.value = {};
    style.right = `-${addUnit(
      sysInfo.windowWidth - textInfo.value.right! - screenGap.value,
    )}`;
    indicatorStyle.value.right = addUnit(
      textInfo.value.width! / 2 -
        Number(style.right) -
        indicatorWidth.value / 2,
    );
  } else {
    const left = Math.abs(
      textInfo.value.width! / 2 - tooltipInfo.value.width! / 2,
    );
    style.left =
      textInfo.value.width! > tooltipInfo.value.width!
        ? addUnit(left)
        : -addUnit(left);
    indicatorStyle.value = {};
  }
  if (direction.value === "top") {
    style.marginTop = "-10px";
    indicatorStyle.value.bottom = "-4px";
  } else {
    style.marginBottom = "-10px";
    indicatorStyle.value.top = "-4px";
  }
  return style;
});

onMounted(() => {
  getElRect();
});

/**
 * @description 长按触发事件
 * */
const longPressHandler = () => {
  tooltipTop.value = 0;
  showTooltip.value = true;
};

/**
 * @description 点击透明遮罩
 * */
const overlayClickHandler = () => {
  showTooltip.value = false;
};

/**
 * @description 点击弹出按钮
 * */
const btnClickHandler = (index: number) => {
  showTooltip.value = false;
  // 如果需要展示复制按钮，此处index需要加1，因为复制按钮在第一个位置
  emit("click", showCopy.value ? index + 1 : index);
};

/**
 * @description 元素尺寸
 * */
const getElRect = () => {
  // 调用之前，先将指示器调整到屏幕外，方便获取尺寸
  showTooltip.value = true;
  tooltipTop.value = -10000;
  sleep(500).then(() => {
    getRect(`#${tooltipId.value}`, false, instance).then((size) => {
      tooltipInfo.value = size as UniApp.NodeInfo;
      // 获取气泡尺寸之后，将其隐藏，为了让下次切换气泡显示与隐藏时，有淡入淡出的效果
      showTooltip.value = false;
    });
    getRect(`#${textId.value}`, false, instance).then((size) => {
      textInfo.value = size as UniApp.NodeInfo;
    });
  });
};
/**
 * @description 复制文本到粘贴板
 * */
const setClipboardData = () => {
  // 关闭组件
  showTooltip.value = false;
  emit("click", 0);
  uni.setClipboardData({
    // 优先使用copyText字段，如果没有，则默认使用text字段当做复制的内容
    data: copyText.value || text.value,
    success: () => {
      showToast.value &&
        uni.showToast({
          title: "复制成功",
        });
    },
    fail: () => {
      showToast.value &&
        uni.showToast({
          title: "复制失败",
        });
    },
    complete: () => {
      showTooltip.value = false;
    },
  });
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
