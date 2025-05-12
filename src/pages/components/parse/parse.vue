<template>
  <view>
    <view class="hy-title">基础使用</view>
    <hy-parse :content="parseContent" :tag-style="tagStyle" lazy-load scroll-table selectable use-anchor></hy-parse>
  </view>
</template>

<script setup lang="ts">
import HyParse from "@/package/components/hy-parse/hy-parse.vue";
import parseContent from './content.js';

const tagStyle = {
  table: 'box-sizing: border-box; border-top: 1px solid #dfe2e5; border-left: 1px solid #dfe2e5;',
      th: 'border-right: 1px solid #dfe2e5; border-bottom: 1px solid #dfe2e5;',
      td: 'border-right: 1px solid #dfe2e5; border-bottom: 1px solid #dfe2e5;',
      li: 'margin: 5px 0;'
}
</script>


<style scoped lang="scss">

</style>
