<template>
  <hy-config-provider :custom-style="themeColor" :theme="darkMode">
    <view class="hy-title">基础使用</view>
    <view class="hy-container">
      <hy-signature></hy-signature>
    </view>

    <view class="hy-title">自定义画笔</view>
    <view class="hy-container">
      <hy-signature pen-color="red" :lineWidth="5"></hy-signature>
    </view>

    <view class="hy-title">历史记录操作</view>
    <view class="hy-container">
      <hy-signature enableHistory></hy-signature>
    </view>

    <view class="hy-setting__box">
      <view class="hy-title">搜索文字</view>
      <hy-input v-model="label"></hy-input>

      <view class="hy-title">开启动画</view>
      <hy-switch v-model="showClose"></hy-switch>

      <view class="hy-title">禁用</view>
      <hy-switch v-model="disabled"></hy-switch>

      <view class="hy-title">搜索框形状</view>
      <hy-subsection :list="list" v-model="shape"></hy-subsection>

      <view class="hy-title">输入框内文本位置</view>
      <hy-subsection :list="list_1" v-model="inputAlign"></hy-subsection>
    </view>
  </hy-config-provider>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import HySignature from "@/package/components/hy-signature/hy-signature.vue";
import HySubsection from "@/package/components/hy-subsection/hy-subsection.vue";
import HySwitch from "@/package/components/hy-switch/hy-switch.vue";
import HyInput from "@/package/components/hy-input/hy-input.vue";
import HyConfigProvider from "@/package/components/hy-config-provider/hy-config-provider.vue";
import type { HyApp } from "hy-app/typing/modules/common";
import { useThemeStore } from "@/store";
const themeStore = useThemeStore();

const { themeColor, darkMode } = themeStore;
const value = ref("");
const label = ref("搜索");
const disabled = ref(false);
const shape = ref<HyApp.ShapeType>("circle");
const showClose = ref(false);
const inputAlign = ref<HyApp.LeftRightType>("left");
const list = reactive([
  { name: "圆形", value: "circle" },
  { name: "方形", value: "square" },
]);

const list_1 = reactive([
  { name: "左", value: "left" },
  { name: "中", value: "center" },
  { name: "右", value: "right" },
]);
</script>

<style scoped lang="scss">
.hy-container {
  padding: 0;
}
</style>
