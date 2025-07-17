<template>
  <HyPopup
    mode="center"
    :zoom="zoom"
    :show="modelValue"
    :round="round"
    :customStyle="{
      overflow: 'hidden',
      marginTop: `-${addUnit(negativeTop)}`,
    }"
    :closeOnClickOverlay="closeOnClickOverlay"
    :safeAreaInsetBottom="false"
    :duration="400"
    @click="clickHandler"
  >
    <view
      class="hy-modal"
      :style="{
        width: addUnit(width),
      }"
    >
      <view class="hy-modal__title" v-if="title">{{ title }}</view>
      <view
        class="hy-modal__content"
        :style="{
          paddingTop: `${title ? 12 : 25}px`,
        }"
      >
        <slot>
          <text class="hy-modal__content__text">
            {{ content }}
          </text>
        </slot>
      </view>
      <view class="hy-modal__button-group--confirm-button" v-if="$slots.confirmButton">
        <slot name="confirmButton"></slot>
      </view>
      <template v-else>
        <view
          :class="[
            'hy-modal__button-group',
            showCancelButton &&
              showConfirmButton &&
              (!buttonReverse ? 'hy-modal__button-exact' : 'hy-modal__button-exact--reverse'),
          ]"
          :style="{
            flexDirection: buttonReverse ? 'row-reverse' : 'row',
          }"
        >
          <view
            class="hy-modal__button-group__wrapper hy-modal__button-group__wrapper--cancel"
            :hover-stay-time="150"
            hover-class="hy-modal__button-group__wrapper--hover"
            v-if="showCancelButton"
            @tap.stop="cancelHandler"
          >
            <text
              class="hy-modal__button-group__wrapper__text hy-modal__button-group__wrapper--cancel-text"
              :style="{
                color: cancelColor,
              }"
            >
              {{ cancelText }}
            </text>
          </view>
          <view
            class="hy-modal__button-group__wrapper hy-modal__button-group__wrapper--confirm"
            :hover-stay-time="150"
            hover-class="hy-modal__button-group__wrapper--hover"
            v-if="showConfirmButton"
            @tap="confirmHandler"
          >
            <HyLoading v-if="loading"></HyLoading>
            <text
              v-else
              class="hy-modal__button-group__wrapper__text hy-modal__button-group__wrapper--confirm-text"
              :style="{
                color: confirmColor,
              }"
            >
              {{ confirmText }}
            </text>
          </view>
        </view>
      </template>
    </view>
  </HyPopup>
</template>

<script lang="ts">
export default {
  name: 'hy-modal',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared',
  },
}
</script>

<script setup lang="ts">
import { ref, toRefs, watch } from 'vue'
import defaultProps from './props'
import type IProps from './typing'
import { addUnit } from '../../utils'

// 组件
import HyPopup from '../hy-popup/hy-popup.vue'
import HyLoading from '../hy-loading/hy-loading.vue'

const props = withDefaults(defineProps<IProps>(), defaultProps)
const { modelValue, asyncClose, closeOnClickOverlay } = toRefs(props)
const emit = defineEmits(['confirm', 'cancel', 'close', 'update:modelValue'])

const loading = ref<boolean>(false)

watch(
  () => modelValue.value,
  (newValue) => {
    if (newValue && loading.value) loading.value = false
  },
)

/**
 * @description 点击确定按钮
 * */
const confirmHandler = () => {
  // 如果配置了异步关闭，将按钮值为loading状态
  if (asyncClose.value) {
    loading.value = true
  } else {
    emit('update:modelValue', false)
  }
  emit('confirm')
}

/**
 * @description 点击取消按钮
 * */
const cancelHandler = () => {
  emit('update:modelValue', false)
  emit('cancel')
}

/**
 * @description 点击遮罩
 * */
const clickHandler = () => {
  if (closeOnClickOverlay.value) {
    emit('update:modelValue', false)
    emit('close')
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
.modal__content__text {
  text-align: v-bind(contentTextAlign);
}
</style>
