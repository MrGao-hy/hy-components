<template>
  <view
    class="hy-notice-bar"
    v-if="show"
    :style="[
      {
        backgroundColor: bgColor,
      },
      customStyle,
    ]"
  >
    <template v-if="direction === 'column' || (direction === 'row' && step)">
      <HyColumnNotice
        :color="color"
        :bgColor="bgColor"
        :text="text"
        :mode="mode"
        :step="step"
        :icon="icon"
        :disable-touch="disableTouch"
        :fontSize="fontSize"
        :duration="duration"
        :justifyContent="justifyContent"
        @close="close"
        @click="click"
      ></HyColumnNotice>
    </template>
    <template v-else>
      <HyRowNotice
        :color="color"
        :bgColor="bgColor"
        :text="text"
        :mode="mode"
        :fontSize="fontSize"
        :speed="speed"
        :url="url"
        :linkType="linkType"
        :icon="icon"
        @close="close"
        @click="click"
      ></HyRowNotice>
    </template>
  </view>
</template>

<script lang="ts">
export default {
  name: 'hy-notice-bar',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script setup lang="ts">
import { ref, toRefs } from "vue";
import defaultProps from "./props";
import type IProps from "./typing";
// 组件
import HyRowNotice from "./hy-row-notice.vue";
import HyColumnNotice from "./hy-column-notice.vue";

const show = ref(true);

const props = withDefaults(defineProps<IProps>(), defaultProps);
const { mode, linkType, url } = toRefs(props);
const emit = defineEmits(["click", "close"]);

/**
 * @description 点击通告栏
 * */
const click = (index: number) => {
  emit("click", index);
  if (url.value && linkType.value && mode.value === "link") {
    (uni as any)[linkType.value]({ url: url.value });
  }
};
/**
 * @description 点击关闭按钮
 * */
const close = () => {
  show.value = false;
  emit("close");
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
