<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only'

// onLaunch(() => {
//   console.log('App Launch')
// })
// onShow(() => {
//   console.log('App Show')
// })
// onHide(() => {
//   console.log('App Hide')
// })
</script>

<style lang="scss">
/* stylelint-disable selector-type-no-unknown */
@import '~@/style/common.scss';
@import '~@/package/index.scss';
button::after {
  border: none;
}
</style>
