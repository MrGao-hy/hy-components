<template>
  <view>
    <view class="hy-title">基础使用</view>
    <hy-subsection :list="list" v-model="value"></hy-subsection>

    <view class="hy-title">模式</view>
    <hy-subsection
      :list="list"
      v-model="value"
      mode="subsection"
    ></hy-subsection>

    <view class="hy-title">颜色</view>
    <hy-subsection
      :list="list"
      v-model="value"
      activeColor="#f56c6c"
      mode="subsection"
    ></hy-subsection>
  </view>
</template>

<script setup lang="ts">
import HySubsection from "../../../package/components/hy-subsection/hy-subsection.vue";
import { ref } from "vue";

const value = ref("");
const list = ["未付款", "待评价", "已付款"];
</script>

<style scoped lang="scss"></style>
