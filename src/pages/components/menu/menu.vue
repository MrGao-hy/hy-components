<template>
  <hy-config-provider :custom-style="themeColor" :theme="darkMode">
    <view class="menu">
      <hy-menu v-model="current" :list="list" @change="onChange"></hy-menu>

      <scroll-view
        class="scroll-view"
        scroll-y
        scroll-with-animation
        :scroll-top="scrollTop"
        :throttle="false"
        @scroll="onScroll"
      >
        <view :class="['item', `item--${item.id}`]" v-for="(item, index) in data" :key="index">
          <view class="hy-title">
            <text class="text">{{ item.name }}</text>
          </view>
          <view class="hy-container">
            <hy-grid
              :list="item.children"
              :col="2"
              :custom-keys="{ icon: 'url', name: 'name' }"
              :icon-config="{ size: 50 }"
            ></hy-grid>
          </view>
        </view>
      </scroll-view>
    </view>
  </hy-config-provider>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, onMounted, ref } from 'vue'
import { useThemeStore } from '@/store'
import { data } from './data'
import { IconConfig } from 'hy-app'

// 组件
import HyMenu from '@/package/components/hy-menu/hy-menu.vue'
import HyGrid from '@/package/components/hy-grid/hy-grid.vue'
import HyConfigProvider from '@/package/components/hy-config-provider/hy-config-provider.vue'
import type { MenusType } from '@/package/components/hy-menu/typing'
import { getRect } from '@/package'

const themeStore = useThemeStore()

interface ItemTopVo {
  id: string | number
  top: number
}

const instance = getCurrentInstance()
const { themeColor, darkMode } = themeStore
const scrollTop = ref<number>(0)
const itemScrollTop = ref<ItemTopVo[]>([])
const current = ref<string | number>(1)
const execute = ref(false) // 防止点击change事件时候执行onScroll事件
const list = [
  { id: 1, title: '盖浇饭', icon: IconConfig.PHOTO },
  { id: 2, title: '炒菜', value: 'title', disabled: true },
  { id: 3, title: '米粉面条', value: 'showCancelButton', badge: 6 },
  { id: 4, title: '汉堡披萨', value: 'buttonReverse' },
  { id: 5, title: '饮品甜品', value: 'buttonReverse' },
  { id: 6, title: '面点粥水饺混沌', value: 'buttonReverse' },
  { id: 7, title: '小吃麻辣烫', value: 'buttonReverse' },
  { id: 8, title: '中餐', value: 'buttonReverse' },
  { id: 9, title: '西餐', value: 'buttonReverse' },
  { id: 10, title: '大餐', value: 'buttonReverse' },
]

onMounted(() => {
  list.forEach((item) => {
    getRect(`.item--${item.id}`, false, instance).then((rect) => {
      itemScrollTop.value.push({
        id: item.id,
        top: (rect as UniApp.NodeInfo).top || 0,
      })
    })
  })
})

function onScroll(e: any) {
  const { scrollTop } = e.detail
  if (execute.value) {
    return (execute.value = false)
  }

  const res = itemScrollTop.value
    .sort((a, b) => b.top - a.top)
    .find((item) => scrollTop >= item.top)
  current.value = res?.id || 1
}

const onChange = (temp: MenusType) => {
  const res: ItemTopVo | undefined = itemScrollTop.value.find((item) => item.id === temp.id)
  scrollTop.value = res?.top || 0
  execute.value = true
}
</script>

<style scoped lang="scss">
.menu {
  display: flex;
}
.scroll-view {
  padding: 20rpx;
  /* #ifdef H5 */
  height: calc(100vh - 44px);
  /* #endif */
  /* #ifndef H5 */
  height: 100vh;
  /* #endif */
  box-sizing: border-box;
}
</style>
