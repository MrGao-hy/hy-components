<template>
  <hy-config-provider  :custom-style="themeColor" :theme="darkMode">
    <hy-float-button
      :shape="shape"
      :size="size"
      :menus="menus"
      :float="float"
      :direction="direction"
      :shadow="shadow"
      :opacity="opacity"
    ></hy-float-button>

    <hy-float-button
      :shape="shape"
      left="80vw"
      :size="size"
      :menus="menus"
      :direction="direction"
      text="客服"
      :icon="IconConfig.CUSTOMER_SERVICE"
      iconSize="25"
      :float="float"
      :shadow="shadow"
      :opacity="opacity"
    ></hy-float-button>

    <view class="hy-setting__box">
      <view class="hy-title">悬浮按钮形状</view>
      <hy-subsection :list="list_1" v-model="shape"></hy-subsection>

      <view class="hy-title">悬浮按钮大小</view>
      <hy-subsection :list="list_2" v-model="size"></hy-subsection>

      <view class="hy-title">悬浮按钮打开方向</view>
      <hy-subsection :list="list_3" v-model="direction"></hy-subsection>

      <view class="hy-title">是否浮动</view>
      <hy-switch v-model="float"></hy-switch>

      <view class="hy-title">显示阴影</view>
      <hy-switch v-model="shadow"></hy-switch>
    </view>
  </hy-config-provider>
</template>

<script setup lang="ts">
import HyFloatButton from "@/package/components/hy-float-button/hy-float-button.vue";
import HySubsection from "@/package/components/hy-subsection/hy-subsection.vue";
import HySwitch from "@/package/components/hy-switch/hy-switch.vue";
import HyConfigProvider from "@/package/components/hy-config-provider/hy-config-provider.vue";
import { reactive, ref } from "vue";
import { IconConfig } from "hy-app";
import { useThemeStore } from "@/store";
const themeStore = useThemeStore();

const { themeColor, darkMode } = themeStore;
const menus = ["菜单1", "菜单2", "菜单3"];

const shape = ref("circle");
const size = ref("medium");
const direction = ref("column");
const float = ref(true);
const shadow = ref(true);
const opacity = ref(1);

const list_1 = reactive([
  { name: "圆形", value: "circle" },
  { name: "方形", value: "square" },
]);

const list_2 = reactive([
  { name: "大", value: "large" },
  { name: "中", value: "medium" },
  { name: "小", value: "small" },
]);

const list_3 = reactive([
  { name: "横向", value: "row" },
  { name: "竖直", value: "column" },
]);
</script>

<style scoped lang="scss"></style>
