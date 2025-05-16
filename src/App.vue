<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
onLaunch(() => {
  console.log("App Launch");
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style lang="scss">
@import "uview-plus/index.scss";
@import "~@/static/css/common.scss";
@import "~@/package/index.scss";
@import "~@/static/font/font_1/iconfont.css";
view {
  padding: 0;
  margin: 0;
}
/* #ifndef APP-NVUE */
page {
  background-color: #f8f8f8;
}
/* #endif */
</style>
