<template>
  <view class="hy-page" :style="{ '--hy-color-theme': 'red' }">
    <view class="hy-title">基础使用</view>
    <hy-switch v-model="value"></hy-switch>

    <view class="hy-title">禁用</view>
    <hy-switch v-model="value" disabled></hy-switch>

    <view class="hy-title">加载</view>
    <hy-switch v-model="value" loading></hy-switch>

    <view class="hy-title">自定义颜色</view>
    <hy-switch
      v-model="value"
      active-color="red"
      inactiveColor="black"
    ></hy-switch>

    <view class="hy-title">自定义大小</view>
    <view class="hy-flex">
      <hy-switch v-model="value" size="small"></hy-switch>
      <hy-switch v-model="value" size="medium"></hy-switch>
      <hy-switch v-model="value" size="large"></hy-switch>
    </view>

    <view class="hy-title">自定义图标</view>
    <hy-switch
      v-model="value"
      icon-color="red"
      :active-icon="IconConfig.SUCCESS"
      :inactive-icon="IconConfig.CLOSE"
    ></hy-switch>

    <view class="hy-title">自定义插槽</view>
    <hy-switch v-model="value">
      <view style="font-size: 16rpx">禁用</view>
    </hy-switch>
  </view>
</template>

<script setup lang="ts">
import HySwitch from "@/package/components/hy-switch/hy-switch.vue";
import { ref } from "vue";
import { IconConfig } from "hy-app";

const value = ref(true);
</script>

<style scoped lang="scss"></style>
