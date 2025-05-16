<template>
  <view class="hy-page">
    <view class="hy-title">基础使用</view>
    <hy-rate v-model="value"></hy-rate>

    <view class="hy-title">星星间距</view>
    <hy-rate v-model="value" :gutter="20"></hy-rate>

    <view class="hy-title">星星大小</view>
    <hy-rate v-model="value" :size="10"></hy-rate>
    <view style="height: 20px"></view>
    <hy-rate v-model="value" :size="30"></hy-rate>

    <view class="hy-title">自定义颜色</view>
    <hy-rate v-model="value" inactiveColor="green" activeColor="red"></hy-rate>

    <view class="hy-title">使用图片</view>
    <hy-rate
      v-model="value"
      activeIcon="https://pic1.imgdb.cn/item/67d6820788c538a9b5bf333a.png"
      inactiveIcon="https://pic1.imgdb.cn/item/67d6820788c538a9b5bf333b.png"
    ></hy-rate>

    <view class="hy-title">最多评分</view>
    <hy-rate v-model="value" :count="10"></hy-rate>

    <view class="hy-title">允许半星</view>
    <hy-rate v-model="value" allowHalf></hy-rate>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import HyRate from "@/package/components/hy-rate/hy-rate.vue";

const value = ref(3);
</script>

<style scoped lang="scss"></style>
