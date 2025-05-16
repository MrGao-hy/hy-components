<template>
  <view class="hy-page">
    <view class="hy-title">按钮颜色</view>
    <view class="hy-grid">
      <hy-button type="info" text="默认按钮"></hy-button>
      <hy-button type="success" text="主要按钮"></hy-button>
      <hy-button type="primary" text="信息按钮"></hy-button>
      <hy-button type="error" text="危险按钮"></hy-button>
      <hy-button type="warning" text="警告按钮"></hy-button>
      <hy-button
        text="渐变色按钮"
        color="linear-gradient(to right, #4bfcfc, #FB39F5)"
      ></hy-button>
    </view>

    <view class="hy-title">按钮镂空（背景色）</view>
    <view class="hy-grid">
      <hy-button type="info" text="默认按钮" plain></hy-button>
      <hy-button type="success" text="主要按钮" plain></hy-button>
      <hy-button type="primary" text="信息按钮" plain></hy-button>
      <hy-button type="error" text="危险按钮" plain></hy-button>
      <hy-button type="warning" text="警告按钮" plain></hy-button>
    </view>

    <view class="hy-title">加载按钮</view>
    <view class="hy-container">
      <hy-button
        type="error"
        text="删除"
        :icon="{ name: IconConfig.DELETE }"
        :custom-style="{ marginBottom: '20px' }"
      ></hy-button>
      <hy-button
        type="error"
        text="删除"
        plain
        :icon="{ name: IconConfig.DELETE }"
      ></hy-button>
    </view>

    <view class="hy-title">加载按钮</view>
    <view class="hy-container">
      <hy-button type="success" text="主要按钮" loading></hy-button>
    </view>

    <view class="hy-title">按钮大小</view>
    <view class="hy-container">
      <hy-button
        type="success"
        text="大尺寸按钮"
        size="large"
        :custom-style="{ marginBottom: '20px' }"
      ></hy-button>
      <hy-button
        type="success"
        text="默认按钮"
        size="medium"
        :custom-style="{ marginBottom: '20px' }"
      ></hy-button>
      <hy-button
        type="success"
        text="小尺寸按钮"
        size="small"
        :custom-style="{ marginBottom: '20px' }"
      ></hy-button>
      <hy-button
        type="success"
        text="迷你按钮"
        size="mini"
        :custom-style="{ marginBottom: '20px' }"
      ></hy-button>
    </view>

    <view class="hy-title">按钮形状</view>
    <view class="hy-flex">
      <hy-button type="success" text="方形按钮" shape="square"></hy-button>
      <hy-button type="success" text="圆形按钮" shape="circle"></hy-button>
    </view>
  </view>
</template>

<script setup lang="ts">
import HyButton from "@/package/components/hy-button/hy-button.vue";
import { IconConfig } from "@/package/config";
</script>

<style scoped lang="scss"></style>
