<template>
  <hy-config-provider :custom-style="themeColor" :theme="darkMode">
    <view class="hy-title">基础使用</view>
    <view class="hy-container">
      <hy-checkbox :columns="columns" v-model="value" :size="size" :shape="shape"></hy-checkbox>
    </view>

    <view class="hy-title">禁用</view>
    <view class="hy-container">
      <hy-checkbox
        :columns="columns"
        v-model="value"
        :size="size"
        :shape="shape"
        disabled
      ></hy-checkbox>
    </view>

    <view class="hy-title">布局</view>
    <view class="hy-container">
      <hy-checkbox
        :columns="columns"
        v-model="value"
        :size="size"
        :shape="shape"
        placement="column"
      ></hy-checkbox>
    </view>
    <view class="hy-container" style="margin-top: 10px">
      <hy-checkbox
        :columns="columns"
        v-model="value"
        :size="size"
        :shape="shape"
        placement="column"
        iconPlacement="right"
        borderBottom
      ></hy-checkbox>
    </view>

    <view class="hy-title">颜色配置</view>
    <view class="hy-container">
      <hy-checkbox
        :columns="columns"
        v-model="value"
        :size="size"
        :shape="shape"
        activeColor="red"
        inactiveColor="green"
      ></hy-checkbox>
    </view>

    <view class="hy-setting__box">
      <view class="hy-title">形状</view>
      <hy-subsection :list="list_1" v-model="shape"></hy-subsection>

      <view class="hy-title">大小</view>
      <hy-subsection :list="list_2" v-model="size"></hy-subsection>
    </view>
  </hy-config-provider>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import HyCheckbox from '@/package/components/hy-checkbox/hy-checkbox.vue'
import HySubsection from '../../../package/components/hy-subsection/hy-subsection.vue'
import HyConfigProvider from '@/package/components/hy-config-provider/hy-config-provider.vue'
import { useThemeStore } from '@/store'
const themeStore = useThemeStore()

const { themeColor, darkMode } = themeStore
const value = ref([])
const size = ref<HyApp.SizeType>('medium')
const shape = ref<HyApp.ShapeType>('square')

const columns = reactive([
  { label: '老师', value: 0 },
  { label: '护士', value: 1 },
  { label: '空姐', value: 2 },
])

const list_1 = reactive([
  { name: '圆形', value: 'circle' },
  { name: '方形', value: 'square' },
])
const list_2 = reactive([
  { name: '小', value: 'small' },
  { name: '中', value: 'medium' },
  { name: '大', value: 'large' },
])
</script>

<style scoped lang="scss"></style>
