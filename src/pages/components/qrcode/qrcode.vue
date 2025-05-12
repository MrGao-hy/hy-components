<template>
  <view class="hy-page">
    <view class="hy-title">基础使用</view>
    <hy-qrcode cid="qrcode_1" text="https://gxh151.top/h5"></hy-qrcode>

    <view class="hy-title">带logo</view>
    <hy-qrcode
      cid="qrcode_2"
      text="https://gxh151.top/h5"
      :icon="logo"
    ></hy-qrcode>

    <view class="hy-title">图片错误加载中</view>
    <hy-qrcode
      cid="qrcode_3"
      text="https://uview-plus.jiangruyi.com/uview-plus/common/logo.png"
      icon="https://uview-plus.jiangruyi.com/uview-plus/common/logo.png"
    ></hy-qrcode>
  </view>
</template>

<script setup lang="ts">
import HyQrcode from "@/package/components/hy-qrcode/hy-qrcode.vue";
import logo from "@/static/image/diary_logo.png";
</script>

<style scoped lang="scss"></style>
