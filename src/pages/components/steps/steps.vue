<template>
  <view>
    <view class="hy-title">基本使用</view>
    <hy-steps
      :list="list"
      :current="current"
      :direction="direction"
      :dot="dot"
    ></hy-steps>

    <view class="hy-setting__box">
      <view class="hy-title">指示点</view>
      <hy-subsection :list="list_1" v-model="direction"></hy-subsection>

      <view class="hy-title">指示点</view>
      <hy-switch v-model="dot"></hy-switch>

      <view class="hy-title">前进</view>
      <hy-number-step v-model="current" :min="0"></hy-number-step>
    </view>
  </view>
</template>

<script setup lang="ts">
import HySteps from "@/package/components/hy-steps/hy-steps.vue";
import HyNumberStep from "@/package/components/hy-number-step/hy-number-step.vue";
import HySwitch from "@/package/components/hy-switch/hy-switch.vue";
import HySubsection from "@/package/components/hy-subsection/hy-subsection.vue";
import { ref } from "vue";

const direction = ref<HyApp.DirectionType>("column");
const dot = ref(false);

const current = ref(0);
const list = ref([
  { title: "已下单", desc: "2024-10-13" },
  { title: "发货中", desc: "2024-10-13" },
  { title: "已发货", desc: "2024-10-13" },
  { title: "发货失败", desc: "2024-10-14", error: true },
]);
const list_1 = [
  { name: "横向", value: "row" },
  { name: "竖向", value: "column" },
];
</script>

<style scoped lang="scss"></style>
