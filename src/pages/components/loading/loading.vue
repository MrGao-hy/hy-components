<template>
  <view class="hy-page" :class="themeClass" :style="themeColor">
    <view class="hy-title">基础使用</view>
    <hy-loading></hy-loading>

    <view class="hy-title">圆形</view>
    <hy-loading mode="circle"></hy-loading>

    <view class="hy-title">半圆</view>
    <hy-loading mode="semicircle"></hy-loading>

    <view class="hy-title">自定义颜色</view>
    <view class="hy-flex">
      <hy-loading mode="circle" color="#19be6b"></hy-loading>
      <hy-loading mode="spinner" color="#19be6b"></hy-loading>
    </view>

    <view class="hy-title">自定义文字</view>
    <hy-loading mode="circle" text="加载中..."></hy-loading>
  </view>
</template>

<script setup lang="ts">
import HyLoading from "@/package/components/hy-loading/hy-loading.vue";
import { useThemeStore } from "@/store";
const themeStore = useThemeStore();

const { themeColor, themeClass } = themeStore;
</script>

<style scoped lang="scss"></style>
