<template>
  <view>
    <hy-login @login="loginFn"></hy-login>
  </view>
</template>

<script setup lang="ts">
import HyLogin from "@/package/components/hy-login/hy-login.vue";

const loginFn = () => {
  uni.showToast({ title: "登录成功" });
};
</script>

<style scoped lang="scss"></style>
