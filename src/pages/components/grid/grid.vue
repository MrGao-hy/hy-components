<template>
  <view class="hy-page">
    <view class="hy-title">基本使用</view>
    <view class="hy-container">
      <hy-grid :list="list" :col="col" :border="border"></hy-grid>
    </view>

    <view class="hy-setting__box">
      <view class="hy-title">自定义列数</view>
      <hy-subsection :list="list_1" v-model="col"></hy-subsection>

      <view class="hy-title">显示边框</view>
      <hy-switch :list="list_1" v-model="border"></hy-switch>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { config } from "@/config/config";
import HySubsection from "@/package/components/hy-subsection/hy-subsection.vue";
import HySwitch from "@/package/components/hy-switch/hy-switch.vue";
import HyGrid from "@/package/components/hy-grid/hy-grid.vue";

const list = [
  {
    icon: config.image,
    name: "菜单1",
  },
  {
    icon: config.image,
    name: "菜单1",
  },
  {
    icon: config.image,
    name: "菜单1",
  },
  {
    icon: config.image,
    name: "菜单1",
  },
  {
    icon: config.image,
    name: "菜单1",
  },
  {
    icon: config.image,
    name: "菜单1",
  },
  {
    icon: config.image,
    name: "菜单1",
  },
  {
    icon: config.image,
    name: "菜单1",
  },
];

const col = ref(4);
const border = ref(false);
const list_1 = [2, 3, 4, 5];
</script>

<style scoped lang="scss"></style>
