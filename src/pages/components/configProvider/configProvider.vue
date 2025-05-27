<template>
  <hy-config-provider  :custom-style="themeColor" :theme="darkMode">
    <view class="hy-title">设置暗色</view>
    <view class="hy-container">
      <hy-switch v-model="darkMode" activeValue="dark" inactiveValue="light"></hy-switch>
    </view>

    <view class="hy-title">主题色</view>
    <view class="hy-container">
    </view>
  </hy-config-provider>
</template>

<script setup lang="ts">
import HyConfigProvider from "@/package/components/hy-config-provider/hy-config-provider.vue";
import HySwitch from "@/package/components/hy-switch/hy-switch.vue";
import { toRefs } from "vue";
import {useThemeStore} from "@/store";
const themeStore = useThemeStore();

const { themeColor, darkMode } = toRefs(themeStore);

</script>


<style scoped lang="scss">

</style>
