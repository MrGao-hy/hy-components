<template>
  <HyTransition mode="fade" :show="show">
    <view
      class="hy-warn"
      :class="[`hy-warn--${type}--${theme}`]"
      @tap.stop="clickHandler"
      :style="[customStyle]"
    >
      <view class="hy-warn__icon--left" v-if="showIcon">
        <HyIcon :name="iconName(type)" size="21" :color="iconColor"></HyIcon>
      </view>
      <view
        class="hy-warn__content"
        :style="[
          {
            paddingRight: closable ? '20px' : 0,
          },
        ]"
      >
        <text
          class="hy-warn__content__title"
          v-if="title"
          :style="[
            {
              fontSize: addUnit(fontSize),
              textAlign: center ? 'center' : 'left',
            },
          ]"
          :class="[
            theme === 'dark'
              ? 'hy-warn__text--dark'
              : `hy-warn__text--${type}--light`,
          ]"
          >{{ title }}</text
        >
        <text
          class="hy-warn__content__desc"
          v-if="description"
          :style="[
            {
              fontSize: addUnit(fontSize),
              textAlign: center ? 'center' : 'left',
            },
          ]"
          :class="[
            theme === 'dark'
              ? 'hy-warn__text--dark'
              : `hy-warn__text--${type}--light`,
          ]"
          >{{ description }}</text
        >
      </view>
      <view class="hy-warn__close" v-if="closable" @tap.stop="closeHandler">
        <HyIcon :name="IconConfig.CLOSE" :color="iconColor" size="15"></HyIcon>
      </view>
    </view>
  </HyTransition>
</template>

<script lang="ts">
export default {
  name: 'hy-warn',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script setup lang="ts">
import { computed, ref, toRefs } from "vue";
import defaultProps from "./props";
import type IProps from "./typing";
import { addUnit } from "../../utils";
import { IconConfig, iconName } from "../../config";

// 组件
import HyTransition from "../hy-transition/hy-transition.vue";
import HyIcon from "../hy-icon/hy-icon.vue";

const props = withDefaults(defineProps<IProps>(), defaultProps);
const { type, theme } = toRefs(props);
const emit = defineEmits(["click", "close"]);

const show = ref<boolean>(true);

/**
 * @description icon颜色
 * */
const iconColor = computed(() => {
  return theme.value === "light" ? type.value : "#fff";
});

/**
 * @description 点击内容
 * */
const clickHandler = () => {
  emit("click");
};
/**
 * @description 点击关闭按钮
 * */
const closeHandler = () => {
  show.value = false;
  emit("close");
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
