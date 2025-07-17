<template>
  <view class="hy-qrcode" @longpress="onLongPress">
    <view class="hy-qrcode__content" @click="preview">
      <!-- #ifndef APP-NVUE -->
      <canvas
        class="hy-qrcode__canvas"
        :id="cid"
        :canvas-id="cid"
        :style="{ width: addUnit(size), height: addUnit(size) }"
      />
      <!-- #endif -->
      <view
        v-if="showLoading && loading"
        class="hy-qrcode__loading"
        :style="{ width: addUnit(size), height: addUnit(size) }"
      >
        <HyLoading></HyLoading>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'hy-qrcode',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared',
  },
}
</script>

<script setup lang="ts">
import { getCurrentInstance, toRefs, ref, onMounted } from 'vue'
import defaultProps from './props'
import type IProps from './typing'
import QRCode from './qrcode.js'
import { addUnit, error } from '../../utils'
import { IconConfig } from '../../config'

// 组件
import HyIcon from '../hy-icon/hy-icon.vue'
import HyLoading from '../hy-loading/hy-loading.vue'

const props = withDefaults(defineProps<IProps>(), defaultProps)
const { text, allowPreview } = toRefs(props)
const emit = defineEmits(['result', 'preview', 'longPress'])

const instance = getCurrentInstance()
const loading = ref(false)
const qrcode = ref('')
const result = ref('')

onMounted(() => {
  initQrCode()
})

const initQrCode = () => {
  if (text.value) {
    loading.value = true
    qrcode.value = new QRCode({
      context: instance, // 上下文环境
      canvasId: props.cid, // canvas-id
      usingComponents: props.usingComponents, // 是否是自定义组件
      showLoading: false, // 是否显示loading
      loadingText: props.loadingText, // loading文字
      text: text.value, // 生成内容
      size: props.size, // 二维码大小
      background: props.background, // 背景色
      foreground: props.foreground, // 前景色
      pdground: props.pdGround, // 定位角点颜色
      correctLevel: props.lv, // 容错级别
      image: props.icon, // 二维码图标
      imageSize: props.iconSize, // 二维码图标大小
      cbResult: function (res: any) {
        // 生成二维码的回调
        _result(res)
      },
    })
  } else {
    error('二维码内容不能为空')
  }
}

const _result = (res: any) => {
  loading.value = false
  result.value = res
  emit('result', res)
}

const _saveCode = () => {
  if (result.value != '') {
    uni.saveImageToPhotosAlbum({
      filePath: result.value,
      success: function () {
        uni.showToast({
          title: '二维码保存成功',
          icon: 'success',
          duration: 2000,
        })
      },
    })
  }
}
/**
 * @description 预览
 * */
const preview = (e) => {
  // 预览图片
  // console.log(this.result)
  if (allowPreview.value) {
    uni.previewImage({
      urls: [result.value],
      longPressActions: {
        itemList: ['保存二维码图片'],
        success: function (data) {
          // console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
          switch (data.tapIndex) {
            case 0:
              _saveCode()
              break
          }
        },
        fail: function (err) {
          console.error(err.errMsg)
        },
      },
    })
  }
  emit('preview', result.value, e)
}

const onLongPress = () => {
  emit('longPress')
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
