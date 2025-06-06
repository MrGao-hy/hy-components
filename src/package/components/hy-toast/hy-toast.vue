<template>
  <HyOverlay
    :show="isShow"
    :zIndex="tmpConfig.overlay ? 10070 : -1"
    :custom-style="overlayStyle"
  >
    <view
      :style="[contentStyle]"
      :class="[
        'hy-toast__content',
        'hy-toast--' + tmpConfig.type,
        tmpConfig.type === 'loading' || tmpConfig.loading
          ? 'hy-toast__content--loading'
          : '',
      ]"
    >
      <HyLoading
        v-if="tmpConfig.loading"
        :mode="tmpConfig.loadMode || 'circle'"
        :color="loadingIconColor"
        inactiveColor="#F0E6EF"
        size="25"
        :customStyle="{ marginBottom: '20px' }"
      ></HyLoading>
      <HyIcon
        v-else-if="iconNameCom"
        :name="iconNameCom"
        size="17"
        :color="tmpConfig.type"
        :customStyle="iconStyle"
      ></HyIcon>
      <text
        :class="[
          'hy-toast__content__text',
          'hy-toast__content__text--' + tmpConfig.type,
        ]"
        style="max-width: 400rpx"
        >{{ tmpConfig.message }}</text
      >
    </view>
  </HyOverlay>
</template>

<script lang="ts">
export default {
  name: 'hy-toast',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script setup lang="ts">
import { computed, type CSSProperties, reactive, ref, toRefs } from "vue";
import type ToastParamsVo from "./typing";
import { getWindowInfo, hexToRgb } from "../../utils";
import { ColorConfig, iconName } from "../../config";

// 组件
import HyOverlay from "../hy-overlay/hy-overlay.vue";
import HyIcon from "../hy-icon/hy-icon.vue";
import HyLoading from "../hy-loading/hy-loading.vue";

const isShow = ref(false);
const tmpConfig = ref<ToastParamsVo>({});
const config: ToastParamsVo = reactive({
  message: "",
  type: "info",
  duration: 2000,
  icon: false,
  position: "center",
  complete: null,
  overlay: true,
  loading: false,
});
let timer: any = null;

const isThemeType = (type: string): boolean =>
  ["error", "warning", "success", "primary", "info"].includes(type);

const overlayStyle = computed(() => {
  const style: CSSProperties = {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  };
  // 将遮罩设置为100%透明度，避免出现灰色背景
  style.backgroundColor = "rgba(0, 0, 0, 0)";
  return style;
});

const iconNameCom = computed(() => {
  // 只有不为none，并且type为error|warning|succes|info时候，才显示图标
  if (!tmpConfig.value.icon || !tmpConfig.value.type) {
    return "";
  }
  if (tmpConfig.value.icon === true) {
    if (isThemeType(tmpConfig.value.type)) {
      return iconName(tmpConfig.value.type);
    } else {
      return "";
    }
  } else {
    return tmpConfig.value.icon;
  }
});
const iconStyle = computed(() => {
  const style: CSSProperties = {};
  // 图标需要一个右边距，以跟右边的文字有隔开的距离
  style.marginRight = "4px";
  return style;
});

/**
 * @description 内容盒子的样式
 * */
const contentStyle = computed(() => {
  const windowHeight = getWindowInfo().windowHeight,
    style: CSSProperties = {};
  let value = 0;
  // 根据top和bottom，对Y轴进行窗体高度的百分比偏移
  if (tmpConfig.value.position === "top") {
    value = -windowHeight * 0.25;
  } else if (tmpConfig.value.position === "bottom") {
    value = windowHeight * 0.25;
  }
  style.transform = `translateY(${value}px)`;
  return style;
});

const loadingIconColor = computed(() => {
  let colorTmp = "rgb(255, 255, 255)";
  if (isThemeType(tmpConfig.value.type)) {
    // loading-icon组件内部会对color参数进行一个透明度处理，该方法要求传入的颜色值
    // 必须为rgb格式的，所以这里做一个处理
    colorTmp = hexToRgb(ColorConfig[tmpConfig.value.type]) as string;
  }
  return colorTmp;
});

/**
 * @description 显示toast组件，由父组件通过xxx.show(options)形式调用
 * */
const show = (options: ToastParamsVo) => {
  // 不将结果合并到this.config变量，避免多次调用u-toast，前后的配置造成混乱
  tmpConfig.value = Object.assign(config, options);
  // 清除定时器
  clearTimer();
  isShow.value = true;
  // -1时不自动关闭
  if (tmpConfig.value.duration !== -1) {
    timer = setTimeout(() => {
      // 倒计时结束，清除定时器，隐藏toast组件
      clearTimer();
      // 判断是否存在callback方法，如果存在就执行
      typeof tmpConfig.value.complete === "function" &&
        tmpConfig.value.complete();
    }, tmpConfig.value.duration);
  }
};

// 隐藏toast组件，由父组件通过this.$refs.xxx.hide()形式调用
const hide = () => {
  clearTimer();
};
/**
 * @description 清除定时任务
 * */
const clearTimer = () => {
  isShow.value = false;
  // 清除定时器
  clearTimeout(timer);
  timer = null;
};

defineExpose({
  show,
  hide,
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
