<template>
  <Transition name="fade">
    <view class="dialog dialog-shade" v-if="show">
      <view class="dialog-container" v-if="show">
        <image class="dialog-container__icon" :src="param.icon"></image>
        <view class="dialog-container__title">{{ param.title }}</view>
        <view class="dialog-container__content">{{ param.content }}</view>

        <view class="dialog-container__btn">
          <u-button
            v-if="param.showCancel"
            :text="param.cancelText"
            :color="param.cancelColor"
            :shape="param.shape"
            size="large"
            @click="result(false)"
          ></u-button>
          <u-button
            :text="param.confirmText"
            :color="param.confirmColor"
            :shape="param.shape"
            size="large"
            @click="result(true)"
          ></u-button>
        </view>
      </view>
    </view>
  </Transition>
</template>

<script lang="ts" setup>
import { ref, toRefs } from "vue";
import DialogService from "./index";
/**
 * @用途
 * @author Pino
 * @创建时间 2023-01-11 15:19
 **/

export interface DialogParam {
  icon?: string;
  title?: string;
  content?: string;
  confirmText?: string;
  cancelText?: string;
  shape?: "circle" | "square";
  confirmColor?: string;
  cancelColor?: string;
  showCancel?: boolean;
  result?: Function; // 回调用户操作结果
}
// const props = withDefaults(defineProps<DialogParam>(), {
//   icon: "https://pic1.imgdb.cn/item/67a74cbdd0e0a243d4fd160b.png",
//   title: "提示",
//   content: "",
//   confirmText: "确认",
//   cancelText: "取消",
//   shape: "circle",
//   confirmColor: "#906FFE",
//   cancelColor: "",
//   showCancel: false,
//   result: () => {}
// });
const show = ref(false);
const param = ref<DialogParam>({
  icon: "https://pic1.imgdb.cn/item/67a74cbdd0e0a243d4fd160b.png",
  title: "提示",
  content: "",
  confirmText: "确认",
  cancelText: "取消",
  shape: "circle",
  confirmColor: "#906FFE",
  cancelColor: "",
  showCancel: false,
  result: () => {}
});

const open = (options: DialogParam) => {
  show.value = true;
  param.value = Object.assign(param.value, options);
};

const close = () => {
  show.value = false;
  DialogService.close();
};

const result = (isSure: boolean) => {
  if (param.value.result) {
    param.value.result({
      confirm: isSure,
      cancel: !isSure
    });
  }
  close();
};

defineExpose({ open, close }); // 暴露方法供外部调用
</script>

<style lang="scss" scoped>
/* Vue Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.dialog {
  position: fixed;
  z-index: 999999;
  &-shade {
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
  &-container {
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    border-radius: 40px;
    background: #ffffff;
    width: 90%;
    padding: 40px 20px;
    text-align: center;
    animation: slideIn 0.4s ease;
    @keyframes slideIn {
      from {
        transform: translate(-50%, 50%);
        opacity: 0;
      }
      to {
        transform: translate(-50%, -50%);
        opacity: 1;
      }
    }

    &__icon {
      width: 140px;
      height: 140px;
      position: absolute;
      top: -110px;
      left: 50%;
      transform: translateX(-50%);
    }

    &__title {
      margin: 20px 0;
      font-size: 50rpx;
    }
    &__content {
      margin: 20px 0;
      font-size: 30rpx;
      color: #c3d8db;
    }
    &__btn {
      display: flex;
      .u-button {
        margin: 30px 10px 20px;
      }
    }
  }
}
</style>
