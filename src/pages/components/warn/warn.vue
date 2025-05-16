<template>
  <view>
    <view class="hy-title">基础使用</view>
    <view class="hy-container hy-gap">
      <hy-warn
        title="唧唧复唧唧"
        type="primary"
        :effect="effect"
        :showIcon="showIcon"
        :closable="closable"
      ></hy-warn>
      <hy-warn
        title="木兰当户织"
        type="success"
        :effect="effect"
        :showIcon="showIcon"
        :closable="closable"
      ></hy-warn>
      <hy-warn
        title="不闻机杼声"
        type="info"
        :effect="effect"
        :showIcon="showIcon"
        :closable="closable"
      ></hy-warn>
      <hy-warn
        title="唯闻女叹息"
        type="warning"
        :effect="effect"
        :showIcon="showIcon"
        :closable="closable"
      ></hy-warn>
      <hy-warn
        title="问女何所思"
        type="error"
        :effect="effect"
        :showIcon="showIcon"
        :closable="closable"
      ></hy-warn>
    </view>

    <view class="hy-setting__box">
      <view class="hy-title">深色浅色</view>
      <hy-subsection :list="list_1" v-model="effect"></hy-subsection>

      <view class="hy-title">显示关闭按钮</view>
      <hy-switch v-model="closable"></hy-switch>

      <view class="hy-title">显示图标</view>
      <hy-switch v-model="showIcon"></hy-switch>
    </view>
  </view>
</template>

<script setup lang="ts">
import hyWarn from "@/package/components/hy-warn/hy-warn.vue";
import HySubsection from "@/package/components/hy-subsection/hy-subsection.vue";
import HySwitch from "@/package/components/hy-switch/hy-switch.vue";
import { reactive, ref } from "vue";

const effect = ref<HyApp.ThemeVo>("light");
const closable = ref(false);
const showIcon = ref(false);

const list_1 = reactive([
  { name: "浅色", value: "light" },
  { name: "深色", value: "dark" },
]);
</script>

<style scoped lang="scss"></style>
