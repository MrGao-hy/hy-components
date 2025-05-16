<template>
  <Hy-cell title="基础组件" :list="list_1"></Hy-cell>
  <hy-cell title="表单组件" :list="list_2"></hy-cell>
  <hy-cell title="布局组件" :list="list_3"></hy-cell>
  <hy-cell title="反馈组件" :list="list_4"></hy-cell>
  <hy-cell title="导航组件" :list="list_5"></hy-cell>
  <hy-cell title="其他组件" :list="list_6"></hy-cell>
  <hy-cell title="业务组件" :list="list_7"></hy-cell>
</template>

<script setup lang="ts">
import HyCell from "hy-app/components/hy-cell/hy-cell.vue";

import {
  list_1,
  list_2,
  list_3,
  list_4,
  list_5,
  list_6,
  list_7,
} from "./index1";
</script>

<style lang="scss" scoped></style>
