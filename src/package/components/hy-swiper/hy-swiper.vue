<template>
  <view
    class="hy-swiper"
    :style="{
      backgroundColor: bgColor,
      height: addUnit(height),
      borderRadius: addUnit(radius),
    }"
  >
    <view class="hy-swiper__loading" v-if="loading">
      <HyIcon :is-rotate="loading" :name="IconConfig.LOADING"></HyIcon>
    </view>
    <swiper
      v-else
      class="hy-swiper__wrapper"
      :style="{
        flex: '1',
        height: addUnit(height),
      }"
      @change="change"
      :circular="circular"
      :interval="interval"
      :duration="duration"
      :autoplay="autoplay"
      :current="current"
      :currentItemId="currentItemId"
      :previousMargin="addUnit(previousMargin)"
      :nextMargin="addUnit(nextMargin)"
      :acceleration="acceleration"
      :displayMultipleItems="list.length > 0 ? displayMultipleItems : 0"
      :easingFunction="easingFunction"
    >
      <swiper-item
        class="hy-swiper__wrapper__item"
        v-for="(item, index) in list"
        :key="index"
      >
        <slot :record="item" :index="index">
          <view
            class="hy-swiper__wrapper__item__wrapper"
            :style="[itemStyle(index)]"
          >
            <!-- 在nvue中，image图片的宽度默认为屏幕宽度，需要通过flex:1撑开，另外必须设置高度才能显示图片 -->
            <image
              class="hy-swiper__wrapper__item__wrapper__image"
              v-if="getItemType(item) === 'image'"
              :src="getSource(item)"
              :mode="imgMode"
              @tap="clickHandler(index)"
              :style="{
                height: addUnit(height),
                borderRadius: addUnit(radius),
              }"
            ></image>
            <video
              class="hy-swiper__wrapper__item__wrapper__video"
              v-if="getItemType(item) === 'video'"
              :id="`video-${index}`"
              :enable-progress-gesture="false"
              :src="getSource(item)"
              :poster="getPoster(item)"
              :title="showTitle && hasTitle(item)"
              :style="{
                height: addUnit(height),
              }"
              controls
              @tap="clickHandler(index)"
            ></video>
            <view
              v-if="showTitle && hasTitle(item)"
              class="hy-swiper__wrapper__item__wrapper__title"
            >
              <text class="hy-line-1">{{ hasTitle(item) }}</text>
            </view>
          </view>
        </slot>
      </swiper-item>
    </swiper>
    <view class="hy-swiper__indicator" :style="[indicatorStyle]">
      <slot name="indicator">
        <HySwiperIndicator
          v-if="!loading && indicator && !showTitle"
          :indicatorActiveColor="indicatorActiveColor"
          :indicatorInactiveColor="indicatorInactiveColor"
          :length="list.length"
          :current="currentIndex"
          :indicatorMode="indicatorMode"
        ></HySwiperIndicator>
      </slot>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'hy-swiper',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script setup lang="ts">
import {
  computed,
  toRefs,
  ref,
  watch,
  getCurrentInstance,
  type CSSProperties,
} from "vue";
import { addUnit, isVideo } from "../../utils";
import defaultProps from "./props";
import { IconConfig } from "../../config";
import type IProps from "./typing";
import type { SwiperVo } from "./typing";

// 组件
import HyIcon from "../hy-icon/hy-icon.vue";
import HySwiperIndicator from "./hy-swiper-indicator.vue";

const props = withDefaults(defineProps<IProps>(), defaultProps);
const { keyName, list, current, nextMargin, previousMargin, radius } =
  toRefs(props);
const emit = defineEmits(["click", "update:current", "change"]);

const instance = getCurrentInstance();
const currentIndex = ref<string | number>(0);

watch(
  () => current.value,
  (newVal) => {
    currentIndex.value = newVal;
  },
);

const hasTitle = computed(() => {
  return (item: string | Record<string, any>) => {
    if (typeof item === "object") {
      return item.title ?? "";
    } else {
      return "";
    }
  };
});

/**
 * @description 轮播图3D效果
 * */
const itemStyle = computed(() => {
  return (index: number): CSSProperties => {
    const style: CSSProperties = {};
    // #ifndef APP-NVUE || MP-TOUTIAO
    // 左右流出空间的写法不支持nvue和头条
    // 只有配置了此二值，才加上对应的圆角，以及缩放
    if (nextMargin.value && previousMargin.value) {
      style.borderRadius = addUnit(radius.value);
      if (index !== currentIndex.value) style.transform = "scale(0.92)";
    }
    // #endif
    return style;
  };
});

/**
 * @description 获取目标路径，可能数组中为字符串，对象的形式，额外可指定对象的目标属性名keyName
 * */
const getSource = (item: string | Record<string, any>): string => {
  if (typeof item === "string") return item;
  if (typeof item === "object" && keyName.value) return item[keyName.value];
  return "";
};

/**
 * @description 轮播切换事件
 */
const change = (e: SwiperVo) => {
  // 当前的激活索引
  const { current } = e.detail;
  pauseVideo(currentIndex.value);
  currentIndex.value = current;
  emit("update:current", currentIndex.value);
  emit("change", e.detail);
};

/**
 * @description 切换轮播时，暂停视频播放
 * */
const pauseVideo = (index: number | string) => {
  const lastItem = getSource(list.value[Number(index)]);
  if (isVideo(lastItem)) {
    // 当视频隐藏时，暂停播放
    const video = uni.createVideoContext(`video-${index}`, instance);
    video.pause();
  }
};

/**
 * @description 当一个轮播item为视频时，获取它的视频海报
 * */
const getPoster = (item: string | Record<string, unknown>): string => {
  return typeof item === "object" && item.poster ? item.poster : "";
};

/**
 * @description 点击某个item
 * */
const clickHandler = (index: number) => {
  emit("click", index);
};

/**
 * @description 判断链接是视频还是图片
 * */
const getItemType = computed(() => {
  return (item: string | Record<string, unknown>) => {
    if (typeof item === "string") return isVideo(item) ? "video" : "image";
    if (typeof item === "object" && keyName.value) {
      if (!item.type)
        return isVideo(item[keyName.value] as string) ? "video" : "image";
      if (item.type === "image") return "image";
      if (item.type === "video") return "video";
      return "image";
    }
  };
});
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
