<template>
  <hy-config-provider  :custom-style="themeColor" :theme="darkMode">
    <view class="hy-title">基础使用</view>
    <hy-image :src="config.avatar"></hy-image>

    <view class="hy-title">大小</view>
    <hy-image :src="config.avatar" width="50px" height="50px"></hy-image>

    <view class="hy-title">预览大图</view>
    <hy-image :src="config.avatar" preview-image></hy-image>

    <view class="hy-title">圆形</view>
    <hy-image
      :src="config.avatar"
      width="100px"
      height="100px"
      shape="circle"
    ></hy-image>
  </hy-config-provider>
</template>

<script setup lang="ts">
import HyImage from "@/package/components/hy-image/hy-image.vue";
import { config } from "@/config/config";
import HyConfigProvider from "@/package/components/hy-config-provider/hy-config-provider.vue";
import {useThemeStore} from "@/store";
const themeStore = useThemeStore();

const { themeColor, darkMode } = themeStore;
</script>

<style scoped lang="scss"></style>
