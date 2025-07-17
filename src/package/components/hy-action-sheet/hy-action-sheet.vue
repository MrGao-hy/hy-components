<template>
  <view>
    <HyPopup
      :show="showPopup"
      :duration="duration"
      mode="bottom"
      :close-on-click-overlay="closeOnClickOverlay"
      :safe-area-inset-bottom="safeAreaInsetBottom"
      @open="onOpen"
      @close="onClose"
      :z-index="zIndex"
      :round="round"
    >
      <view
        :class="`hy-action-sheet ${customClass}`"
        :style="`${
          (actions && actions.length) || (panels && panels.length)
            ? 'margin: 0 10px calc(var(--window-bottom) + 10px) 10px; border-radius: 16px;'
            : 'margin-bottom: var(--window-bottom);'
        } ${customStyle}`"
      >
        <!-- 标题 -->
        <view v-if="title" :class="`hy-action-sheet__header ${customHeaderClass}`">
          {{ title }}
          <HyIcon
            customClass="hy-action-sheet__close"
            class="hy-action-sheet__close"
            name="close"
            @click="onClose"
          />
        </view>
        <!-- 标题 -->

        <!-- 选项卡 -->
        <view class="hy-action-sheet__actions" v-if="actions && actions.length">
          <button
            v-for="(action, rowIndex) in actions"
            :key="rowIndex"
            :class="`hy-action-sheet__action ${action?.disabled ? 'hy-action-sheet__action--disabled' : ''}  ${
              action?.loading ? 'hy-action-sheet__action--loading' : ''
            }`"
            :style="`color: ${action?.color}`"
            @click="onSelect(rowIndex, 'action')"
          >
            <HyLoading :show="!!action?.loading" mode="circle" />
            <view v-if="!action?.loading" class="hy-action-sheet__name">{{ action?.name }}</view>
            <view v-if="!action?.loading && action?.sub" class="hy-action-sheet__subname">
              {{ action?.sub }}
            </view>
          </button>
        </view>
        <!-- 选项卡 -->

        <!-- 自定义面板 -->
        <view v-if="formatPanels && formatPanels.length">
          <view
            v-for="(panel, rowIndex) in formatPanels"
            :key="rowIndex"
            class="hy-action-sheet__panels"
          >
            <view class="hy-action-sheet__panels-content">
              <view
                v-for="(col, colIndex) in panel"
                :key="colIndex"
                class="hy-action-sheet__panel"
                @click="onSelect(rowIndex, 'panels', colIndex)"
              >
                <image class="hy-action-sheet__panel-img" :src="(col as any).iconUrl" />
                <view class="hy-action-sheet__panel-title">{{ (col as any).name }}</view>
              </view>
            </view>
          </view>
        </view>
        <!-- 自定义面板 -->

        <!-- 面板插槽 -->
        <slot />
        <!-- 自定义面板 -->

        <!-- 取消按钮 -->
        <HyButton
          v-if="cancelText"
          :text="cancelText"
          shape="circle"
          custom-class="hy-action-sheet__cancel"
          @click="handleCancel"
        ></HyButton>
        <!-- 取消按钮 -->
      </view>
    </HyPopup>
  </view>
</template>
<script lang="ts">
export default {
  name: 'hy-action-sheet',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared',
  },
}
</script>

<script lang="ts" setup>
import { watch, ref } from 'vue'
import { isArray } from '../../utils'
import defaultProps from './props'
import IProps, { IActionSheetPanel } from './typing'

// 组件
import HyIcon from '../hy-icon/hy-icon.vue'
import HyPopup from '../hy-popup/hy-popup.vue'
import HyLoading from '../hy-loading/hy-loading.vue'
import HyButton from '../hy-button/hy-button.vue'

const props = withDefaults(defineProps<IProps>(), defaultProps)
const emit = defineEmits(['select', 'cancel', 'close', 'open', 'update:modelValue'])

const formatPanels = ref<Array<IActionSheetPanel> | Array<IActionSheetPanel[]>>([])
const showPopup = ref<boolean>(false)

watch(() => props.panels, computedValue, { deep: true, immediate: true })

watch(
  () => props.modelValue,
  (newValue) => {
    showPopup.value = newValue
  },
  { deep: true, immediate: true },
)

function isPanelArray() {
  return props.panels.length && !isArray(props.panels[0])
}
function computedValue() {
  formatPanels.value = isPanelArray()
    ? [props.panels as IActionSheetPanel[]]
    : (props.panels as IActionSheetPanel[][])
}

function onSelect(rowIndex: number, type: 'action' | 'panels', colIndex?: number) {
  if (type === 'action') {
    if (props.actions[rowIndex].disabled || props.actions[rowIndex].loading) {
      return
    }
    emit('select', {
      item: props.actions[rowIndex],
      index: rowIndex,
    })
  } else if (isPanelArray()) {
    emit('select', {
      item: props.panels[Number(colIndex)],
      index: colIndex,
    })
  } else {
    emit('select', {
      item: (props.panels as IActionSheetPanel[][])[rowIndex][Number(colIndex)],
      rowIndex,
      colIndex,
    })
  }
  if (props.closeOnClickAction) {
    onClose()
  }
}
function handleCancel() {
  emit('cancel')
  onClose()
}
function onClose() {
  emit('update:modelValue', false)
  emit('close')
}
function onOpen() {
  emit('open')
}
</script>

<style lang="scss" scoped>
@import './index.scss';
.hy-action-sheet__header {
  text-align: v-bind(titleAlign);
}
</style>
