<template>
  <view class="hy-page">
    <view class="hy-title">基础使用</view>
    <view class="hy-container">
      <hy-address-picker v-model="value" has-input></hy-address-picker>
    </view>

    <view class="hy-title">分割线</view>
    <view class="hy-container">
      <hy-address-picker
        v-model="value"
        has-input
        separator="/"
      ></hy-address-picker>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import HyAddressPicker from "@/package/components/hy-address-picker/hy-address-picker.vue";

const value = ref("");
</script>

<style scoped lang="scss"></style>
