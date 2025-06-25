<template>
  <view class="hy-text" v-if="show" :style="wrapStyle" @tap="clickHandler">
    <text
      :class="['hy-text__price', type && `hy-text__value--${type}`]"
      v-if="mode === 'price'"
      :style="[valueStyle]"
    >
      ￥
    </text>
    <view class="hy-text__prefix-icon" v-if="prefixIcon">
      <HyIcon :name="prefixIcon" :customStyle="iconStyle"></HyIcon>
    </view>
    <template v-if="openType && isMp">
      <button
        class="hy-reset-button hy-text__value"
        :style="[valueStyle]"
        :data-index="index"
        :openType="openType"
        @getuserinfo="onGetUserInfo"
        @contact="onContact"
        @getphonenumber="onGetPhoneNumber"
        @error="onError"
        @launchapp="onLaunchApp"
        @opensetting="onOpenSetting"
        :lang="lang"
        :session-from="sessionFrom"
        :send-message-title="sendMessageTitle"
        :send-message-path="sendMessagePath"
        :send-message-img="sendMessageImg"
        :show-message-card="showMessageCard"
        :app-parameter="appParameter"
      >
        {{ value }}
      </button>
    </template>
    <text
      v-else
      class="hy-text__value"
      :style="[valueStyle]"
      :class="[
        type && `hy-text__value--${type}`,
        lines && `hy-text__value--lines`,
        mode === 'link' && `hy-text__value--link`,
      ]"
    >
      {{ value }}
    </text>
    <view class="hy-text__suffix-icon" v-if="suffixIcon">
      <HyIcon :name="suffixIcon" :customStyle="iconStyle"></HyIcon>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'hy-text',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared',
  },
}
</script>

<script setup lang="ts">
import { computed, type CSSProperties, nextTick, toRefs } from 'vue'
import type IProps from './typing'
import defaultProps from './props'
import { addUnit, error, formatName, formatTime, isDate, priceFormat } from '../../utils'

// 组件
import HyIcon from '../hy-icon/hy-icon.vue'

const props = withDefaults(defineProps<IProps>(), defaultProps)
const {
  type,
  show,
  text,
  mode,
  call,
  bold,
  block,
  color,
  size,
  decoration,
  margin,
  lines,
  lineHeight,
  align,
  flex,
  href,
  format,
  customStyle,
} = toRefs(props)
const emit = defineEmits(['click'])

const wrapStyle = computed(() => {
  const style: CSSProperties = {
    margin: margin.value,
    justifyContent:
      align.value === 'left' ? 'flex-start' : align.value === 'center' ? 'center' : 'flex-end',
  }
  // 占满剩余空间
  if (flex.value) {
    style.flex = 1
    // #ifndef APP-NVUE
    style.width = '100%'
    // #endif
  }
  return style
})
const valueStyle = computed(() => {
  const style: CSSProperties = {
    textDecoration: decoration.value,
    fontWeight: bold.value ? 'bold' : 'normal',
    fontSize: addUnit(size.value),
  }
  !type.value && (style.color = color.value)
  lineHeight.value && (style.lineHeight = addUnit(lineHeight.value))
  block.value && (style.display = 'block')
  return Object.assign(style, customStyle.value)
})

/**
 * @description 格式化值
 * */
const value = computed(() => {
  switch (mode.value) {
    case 'price':
      // 如果text不为金额进行提示
      if (!/^\d+(\.\d+)?$/.test(text.value.toString())) {
        error('金额模式下，text参数需要为金额格式')
      }
      // 进行格式化，判断用户传入的format参数为正则，或者函数，如果没有传入format，则使用默认的金额格式化处理
      if (typeof format.value === 'function') {
        // 如果用户传入的是函数，使用函数格式化
        return format.value(text.value)
      }
      // 如果format非正则，非函数，则使用默认的金额格式化方法进行操作
      return priceFormat(text.value, 2)
    case 'date':
      // 判断是否合法的日期或者时间戳
      !isDate(text.value) && error('日期模式下，text参数需要为日期或时间戳格式')
      // 进行格式化，判断用户传入的format参数为正则，或者函数，如果没有传入format，则使用默认的格式化处理
      if (typeof format.value === 'function') {
        // 如果用户传入的是函数，使用函数格式化
        return format.value(text)
      }
      if (format.value) {
        // 如果format非正则，非函数，则使用默认的时间格式化方法进行操作
        return formatTime(text.value, format.value)
      }
      // 如果没有设置format，则设置为默认的时间格式化形式
      return formatTime(text.value, 'yyyy-MM-dd')
    case 'phone':
      // 判断是否合法的手机号
      // !test.mobile(text) && error('手机号模式下，text参数需要为手机号码格式')
      if (typeof format.value === 'function') {
        // 如果用户传入的是函数，使用函数格式化
        return format.value(text)
      }
      if (format.value === 'encrypt') {
        // 如果format为encrypt，则将手机号进行星号加密处理
        return `${text.value.toString().substring(0, 3)}****${text.value.toString().substring(7)}`
      }
      return text.value
    case 'name':
      // 判断是否合法的字符粗
      if (typeof text.value !== 'string') {
        error('姓名模式下，text参数需要为字符串格式')
      } else {
        if (typeof format.value === 'function') {
          // 如果用户传入的是函数，使用函数格式化
          return format.value(text)
        }
        if (format.value === 'encrypt') {
          // 如果format为encrypt，则将姓名进行星号加密处理
          return formatName(text.value)
        }
      }
      return text.value
    case 'link':
      return text.value
    default:
      return text.value
  }
})

const isMp = computed(() => {
  let mp = false
  // #ifdef MP
  mp = true
  // #endif
  return mp
})

const clickHandler = (e) => {
  // 如果为手机号模式，拨打电话
  if (call.value && mode.value === 'phone') {
    uni.makePhoneCall({
      phoneNumber: text.value,
    })
  }
  // 如果是有链接跳转
  if (href.value && mode.value === 'link') {
    toLink()
  }
  emit('click', e)
}

const toLink = () => {
  // #ifdef APP-PLUS
  plus.runtime.openURL(href.value)
  // #endif
  // #ifdef H5
  window.open(href.value)
  // #endif
  // #ifdef MP
  uni.setClipboardData({
    data: href.value,
    success: () => {
      uni.hideToast()
      nextTick(() => {
        uni.showToast({ title: '链接已复制，请在浏览器打开' })
      })
    },
  })
  // #endif
}
</script>

<style scoped lang="scss">
@import './index.scss';
@import '../../libs/css/mixin.scss';
/*超出出现省略号*/
.hy-text__value--lines {
  @include multiEllipsis(v-bind(lines));
}
</style>
