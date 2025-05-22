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
//@import "https://at.alicdn.com/t/c/font_4305932_jcbef3d08o8.css";
view {
  padding: 0;
  margin: 0;
}
/* #ifndef APP-NVUE */
page {
  background-color: #f8f8f8;
}
.hy-theme--dark {
  background-color: #000000;
}
/* #endif */
</style>
