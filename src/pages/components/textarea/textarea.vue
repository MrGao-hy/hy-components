<template>
  <hy-config-provider :custom-style="themeColor" :theme="darkMode">
    <view class="hy-title">基础使用</view>
    <view class="hy-container">
      <hy-textarea
        v-model="value"
        :disabled="disabled"
        :count="count"
        :auto-height="autoHeight"
      ></hy-textarea>
    </view>

    <view class="hy-setting__box">
      <view class="hy-title">自动增加高度</view>
      <hy-switch v-model="autoHeight"></hy-switch>

      <view class="hy-title">显示统计字数</view>
      <hy-switch v-model="count"></hy-switch>

      <view class="hy-title">禁用</view>
      <hy-switch v-model="disabled"></hy-switch>
    </view>
  </hy-config-provider>
</template>

<script setup lang="ts">
import HyTextarea from '@/package/components/hy-textarea/hy-textarea.vue'
import { ref } from 'vue'
import HySwitch from '@/package/components/hy-switch/hy-switch.vue'
import HyConfigProvider from '@/package/components/hy-config-provider/hy-config-provider.vue'
import { useThemeStore } from '@/store'
const themeStore = useThemeStore()

const { themeColor, darkMode } = themeStore
const value = ref('')
const autoHeight = ref(false)
const count = ref(false)
const disabled = ref(false)
</script>

<style scoped lang="scss"></style>
