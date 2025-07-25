<template>
  <view
    :style="FloatButtonStyle"
    :id="soleId"
    :class="[
      'hy-float-button',
      {
        'hy-float-button__animation': float,
        'hy-float-button__shadow': shadow,
      },
      `hy-float-button__${shape}`,
    ]"
    @touchmove.stop.prevent="handleTouchMove"
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd"
  >
    <view
      :class="['hy-float-button__container']"
      @tap.stop="handleClick"
      :style="{ backgroundColor: bgColor }"
    >
      <slot>
        <HyIcon
          :name="icon"
          :color="iconColor"
          :size="iconSize ? iconSize : addUnit(getPx(getFloatBtnSize) * 0.7)"
        />
        <text v-if="text" :style="{ color: textColor, fontSize: fontSize }">{{ text }}</text>
      </slot>
    </view>

    <!-- 菜单栏 -->
    <view
      :class="['hy-float-button__menus', `hy-float-button__menus--${shape}`]"
      :style="menusStyle"
    >
      <template v-for="(item, i) in menus" :key="i">
        <view
          class="hy-float-button__menus--item"
          :style="{
            width: getFloatBtnSize,
            height: getFloatBtnSize,
            color: textColor,
          }"
          @click="handleMenuItemClick(item, i)"
        >
          {{ typeof item === 'string' ? item : item.label }}
        </view>
        <HyLine
          v-if="i !== menus.length - 1"
          color="#FFFFFF"
          :length="addUnit(getPx(getFloatBtnSize) * 0.7)"
          :direction="direction === 'row' ? 'column' : 'row'"
          :custom-style="{ margin: 'auto' }"
        ></HyLine>
      </template>
    </view>
    <!-- 菜单栏 -->
  </view>
</template>

<script lang="ts">
export default {
  name: 'hy-float-button',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared',
  },
}
</script>

<script lang="ts" setup>
import { computed, type CSSProperties, getCurrentInstance, onMounted, ref, toRefs } from 'vue'
import type IProps from './typing'
import type { MenusType } from './typing'
import defaultProps from './props'
import { addUnit, getPx, getRect, guid, isH5 } from '../../utils'
import { HyApp } from '../../typing/modules/common'

// 组件
import HyIcon from '../hy-icon/hy-icon.vue'
import HyLine from '../hy-line/hy-line.vue'

const props = withDefaults(defineProps<IProps>(), defaultProps)
const {
  menus,
  customStyle,
  gap,
  zIndex,
  bgColor,
  text,
  textColor,
  size,
  fixed,
  direction,
  draggable,
  position,
  expandable,
} = toRefs(props)
const emit = defineEmits(['click', 'clickItem'])

const instance = getCurrentInstance()
const btnSize: AnyObject = {
  small: '50px',
  medium: '60px',
  large: '70px',
}
const open = ref(false)
const rotate = computed(() => (open.value && !text.value ? '45deg' : '0deg'))
const soleId = `hy-float-button__${guid()}`
const fabSize = reactive({ width: 0, height: 0 }) // 悬浮按钮大小
const screen = reactive({ width: 0, height: 0 })
const currentCoordinate = reactive({
  top: 0,
  left: 0,
})
// 按下时坐标相对于元素的偏移量
const touchOffset = reactive({ x: 0, y: 0 })
const attractTransition = ref<boolean>(false)
const fabDirection = ref<HyApp.LeftRightType>('left')
const fabDirection2 = ref<HyApp.TopBottomType>('top')
const bounding = reactive({
  minLeft: 10,
  minTop: 10,
  maxLeft: 380,
  maxTop: 680,
})

onMounted(async () => {
  await getFatRect()
  await getBounding()
  initPosition()
})

watch(
  () => position.value,
  () => initPosition(),
)

/**
 * @description 初始化距离
 * */
const initPosition = () => {
  const { minLeft, minTop, maxLeft, maxTop } = bounding
  const centerY = (maxTop + minTop) / 2
  const centerX = (maxLeft + minLeft) / 2

  switch (position.value) {
    case 'left-top':
      currentCoordinate.top = minTop
      currentCoordinate.left = minLeft
      fabDirection.value = 'left'
      fabDirection2.value = 'top'
      break
    case 'right-top':
      currentCoordinate.top = minTop
      currentCoordinate.left = maxLeft
      fabDirection.value = 'right'
      fabDirection2.value = 'top'
      break
    case 'left-bottom':
      currentCoordinate.top = maxTop
      currentCoordinate.left = minLeft
      fabDirection.value = 'left'
      fabDirection2.value = 'bottom'
      break
    case 'right-bottom':
      currentCoordinate.top = maxTop
      currentCoordinate.left = maxLeft
      fabDirection.value = 'right'
      fabDirection2.value = 'bottom'
      break
    case 'left-center':
      currentCoordinate.top = centerY
      currentCoordinate.left = minLeft
      fabDirection.value = 'left'
      fabDirection2.value = 'bottom'
      break
    case 'right-center':
      currentCoordinate.top = centerY
      currentCoordinate.left = maxLeft
      fabDirection.value = 'right'
      fabDirection2.value = 'bottom'
      break
    case 'top-center':
      currentCoordinate.top = minTop
      currentCoordinate.left = centerX
      fabDirection.value = 'left'
      fabDirection2.value = 'top'
      break
    case 'bottom-center':
      currentCoordinate.top = maxTop
      currentCoordinate.left = centerX
      fabDirection.value = 'left'
      fabDirection2.value = 'bottom'
      break
  }
}

/**
 * @description 获取组件大小
 * */
const getFloatBtnSize = computed(() => {
  if (typeof size.value === 'string' && Object.keys(btnSize).includes(size.value)) {
    return btnSize[size.value]
  } else {
    return addUnit(size.value)
  }
})

/**
 * @description 悬浮按钮样式
 * */
const FloatButtonStyle = computed(() => {
  const style: CSSProperties = {
    top: currentCoordinate.top + 'px',
    left: currentCoordinate.left + 'px',
    backgroundColor: bgColor.value,
    zIndex: zIndex.value,
    color: textColor.value,
    transition: 'all ease 0.3s',
  }
  if (fixed.value) style.position = 'fixed'

  style.height = getFloatBtnSize.value
  style.width = getFloatBtnSize.value
  return Object.assign(style, customStyle.value)
})
const menusStyle = computed(() => {
  const style: CSSProperties = {
    backgroundColor: bgColor.value,
  }

  // 判断横向展示还是纵向展示
  if (direction.value === 'row') {
    if (fabDirection.value === 'right') {
      style.transform = 'translateX(-100%)'
      style.left = '100%'
      style.paddingRight = getFloatBtnSize.value
      style.flexDirection = 'row-reverse'
    } else {
      style.paddingLeft = getFloatBtnSize.value
    }
    style.bottom = 0
    style.transition = 'width 0.5s ease'
    style.height = getFloatBtnSize.value
    style.width = open.value
      ? addUnit(getPx(getFloatBtnSize.value) * menus.value.length + getPx(getFloatBtnSize.value))
      : 0
  } else {
    if (fabDirection2.value === 'top') {
      style.transform = 'translateX(-100%)'
      style.height = '100%'
      style.left = getFloatBtnSize.value
      style.top = '0px'
      style.paddingTop = getFloatBtnSize.value
    } else {
      style.paddingBottom = getFloatBtnSize.value
      style.bottom = 0
    }
    style.transition = 'height 0.5s ease'
    style.width = getFloatBtnSize.value
    style.height = open.value
      ? addUnit(getPx(getFloatBtnSize.value) * menus.value.length + getPx(getFloatBtnSize.value))
      : 0
  }
  return style
})

/**
 * @description 获取悬浮按钮大小
 * */
const getFatRect = () => {
  return new Promise((resolve, reject) => {
    getRect(`#${soleId}`, false, instance).then((rect) => {
      const { width, height } = rect as UniApp.NodeInfo
      fabSize.width = width
      fabSize.height = height
      resolve(rect)
    })
  })
}

/**
 * @description 点击悬浮按钮
 * */
const handleClick = () => {
  emit('click')
  if (expandable.value) {
    open.value = !open.value
  }
}

/**
 * @description 点击单条菜单栏
 * */
const handleMenuItemClick = (temp: MenusType, index: number) => {
  emit('clickItem', temp, index)
  open.value = false
  if (typeof temp !== 'string' && temp?.url) {
    uni.navigateTo({
      url: temp.url,
    })
  }
}

const getBounding = () => {
  return new Promise((resolve) => {
    const sysInfo = uni.getSystemInfoSync()

    const { top = 16, left = 16, right = 16, bottom = 16 } = gap.value
    screen.width = sysInfo.windowWidth
    screen.height = isH5 ? sysInfo.windowTop + sysInfo.windowHeight : sysInfo.windowHeight
    bounding.minTop = isH5 ? sysInfo.windowTop + top : top
    bounding.minLeft = left
    bounding.maxLeft = screen.width - fabSize.width - right
    bounding.maxTop = screen.height - fabSize.height - bottom
    resolve(bounding)
  })
}

const handleTouchStart = (e: TouchEvent) => {
  if (!draggable.value) return

  const touch = e.touches[0]
  touchOffset.x = touch.clientX - getPx(currentCoordinate.left)
  touchOffset.y = touch.clientY - getPx(currentCoordinate.top)
  attractTransition.value = false
}

function handleTouchMove(e: TouchEvent) {
  if (!draggable.value) return

  const touch = e.touches[0]
  const { minLeft, minTop, maxLeft, maxTop } = bounding
  let x = touch.clientX - touchOffset.x
  let y = touch.clientY - touchOffset.y

  if (x < minLeft) x = minLeft
  else if (x > maxLeft) x = maxLeft

  if (y < minTop) y = minTop
  else if (y > maxTop) y = maxTop

  currentCoordinate.top = y
  currentCoordinate.left = x
}

function handleTouchEnd() {
  if (props.draggable === false) return

  const screenCenterX = screen.width / 2
  const fabCenterX = currentCoordinate.left + fabSize.width / 2
  attractTransition.value = true
  if (fabCenterX < screenCenterX) {
    currentCoordinate.left = bounding.minLeft
    fabDirection.value = 'left'
  } else {
    currentCoordinate.left = bounding.maxLeft
    fabDirection.value = 'right'
  }
}
</script>

<style scoped lang="scss">
@import './index.scss';
.hy-float-button {
  &__container {
    rotate: v-bind(rotate);
  }
  &__menus {
    display: flex;
    flex-direction: v-bind(direction);
  }
}
</style>
