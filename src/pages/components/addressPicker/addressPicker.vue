<template>
  <hy-config-provider  :custom-style="themeColor" :theme="darkMode">
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
  </hy-config-provider>
</template>

<script setup lang="ts">
import {ref, toRefs} from "vue";
import HyAddressPicker from "@/package/components/hy-address-picker/hy-address-picker.vue";
import HyConfigProvider from "@/package/components/hy-config-provider/hy-config-provider.vue";
import {useThemeStore} from "@/store";
const themeStore = useThemeStore();

const { themeColor, darkMode } = toRefs(themeStore);
const value = ref("");
</script>

<style scoped lang="scss"></style>
