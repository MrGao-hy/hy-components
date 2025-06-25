<template>
  <view class="hy-empty" v-if="show" :style="emptyStyle">
    <view class="hy-empty__img" :style="imgStyle">
      <HyIcon
        :name="imageUrl || emptyIcon[mode].icon"
        :width="width"
        :height="height"
        img-mode="widthFix"
      ></HyIcon>
    </view>
    <view v-if="$slots.default">
      <slot></slot>
    </view>
    <view class="hy-empty__description" v-else>
      <slot v-if="$slots.description" name="description"></slot>
      <text v-else :style="descriptionStyle">{{ emptyDescription || emptyIcon[mode].name }}</text>
      <view class="hy-empty__button" v-if="button?.text">
        <HyButton
          :text="button?.text"
          :size="button?.size"
          :type="button?.type"
          :shape="button?.shape"
          :plain="button?.plain"
          :custom-style="button?.customStyle"
          @click="handleClick"
        ></HyButton>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'hy-empty',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared',
  },
}
</script>

<script setup lang="ts">
import { computed, type CSSProperties, toRefs } from 'vue'
import defaultProps from './props'
import type IProps from './typing'
import { addUnit } from '../../utils'
import emptyIcon from './icon'

// 组件
import HyButton from '../hy-button/hy-button.vue'
import HyIcon from '../hy-icon/hy-icon.vue'

const props = withDefaults(defineProps<IProps>(), defaultProps)
const { zIndex, width, height, imgMargin, navigateUrl, desSize, desColor, customStyle } =
  toRefs(props)
const emit = defineEmits(['click'])

const emptyDescription = computed(() => {
  return props.description
})

/**
 * @description 整体样式
 * */
const emptyStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    zIndex: zIndex.value,
  }
  return Object.assign(style, customStyle.value)
})

/**
 * @description 提示信息样式
 * */
const descriptionStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    fontSize: addUnit(desSize.value),
    color: desColor.value,
  }
  return style
})

/**
 * @description 图片样式
 * */
const imgStyle = computed<CSSProperties>(() => {
  return {
    width: addUnit(width.value),
    height: addUnit(height.value),
    margin: imgMargin.value,
  }
})

/**
 * @description 点击按钮，跳转页面
 * */
const handleClick = () => {
  emit('click')
  if (navigateUrl.value) {
    uni.navigateTo({
      url: navigateUrl.value,
    })
  }
}
</script>
<style scoped lang="scss">
@import './index.scss';
</style>
