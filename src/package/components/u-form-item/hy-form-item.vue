<template>
  <view
    class="u-form-item"
    :class="{
      'u-form-item--error':
        !!message.value && parentData.errorType === 'message'
    }"
  >
    <view
      class="u-form-item__body"
      @tap="clickHandler"
      :style="[
        customStyle,
        {
          flexDirection:
            (labelPosition || parentData.labelPosition) === 'left'
              ? 'row'
              : 'column'
        }
      ]"
    >
      <!-- 微信小程序中，将一个参数设置空字符串，结果会变成字符串"true" -->
      <slot name="label">
        <!-- {{required}} -->
        <view
          class="u-form-item__body__left"
          v-if="required.value || leftIcon.value || label.value"
          :style="{
            width: addUnit(labelWidth.value || parentData.value.labelWidth),
            marginBottom: parentData.value.labelPosition === 'left' ? 0 : '5px'
          }"
        >
          <!-- 为了块对齐 -->
          <view class="u-form-item__body__left__content">
            <!-- nvue不支持伪元素before -->
            <text
              v-if="required.value"
              class="u-form-item__body__left__content__required"
              >*</text
            >
            <view
              class="u-form-item__body__left__content__icon"
              v-if="leftIcon.value"
            >
              <u-icon
                :name="leftIcon.value"
                :custom-style="leftIconStyle.value"
              ></u-icon>
            </view>
            <text
              class="u-form-item__body__left__content__label"
              :style="[
                parentData.value.labelStyle,
                {
                  justifyContent:
                    parentData.value.labelAlign === 'left'
                      ? 'flex-start'
                      : parentData.value.labelAlign === 'center'
                      ? 'center'
                      : 'flex-end'
                }
              ]"
              >{{ label.value }}</text
            >
          </view>
        </view>
      </slot>
      <view class="u-form-item__body__right">
        <view class="u-form-item__body__right__content">
          <view class="u-form-item__body__right__content__slot">
            <slot />
          </view>
          <view class="item__body__right__content__icon" v-if="$slots.right">
            <slot name="right" />
          </view>
        </view>
      </view>
    </view>
    <slot name="error">
      <text
        v-if="!!message.value && parentData.value.errorType === 'message'"
        class="u-form-item__body__right__message"
        :style="{
          marginLeft: addUnit(
            parentData.value.labelPosition === 'top'
              ? 0
              : labelWidth.value || parentData.value.labelWidth
          )
        }"
        >{{ message.value }}</text
      >
    </slot>
    <u-line
      v-if="borderBottom.value"
      :color="
        message.value && parentData.value.errorType === 'border-bottom'
          ? error
          : propsLine.value.color
      "
      :customStyle="`margin-top: ${
        message.value && parentData.value.errorType === 'message' ? '5px' : 0
      }`"
    ></u-line>
  </view>
</template>

<script setup lang="ts">
// import { props } from "./props";
// import defProps from "../../libs/config/props.js";
import { ColorConfig } from "../../config";
import { getProperty, setProperty } from "../u-form/utils";
import { addUnit, error } from "../../utils";
import {
  ref,
  reactive,
  onMounted,
  watch,
  defineProps,
  nextTick,
  provide
} from "vue";

/**
 * Form 表单
 * @description 此组件一般用于表单场景，可以配置Input输入框，Select弹出框，进行表单验证等。
 * @tutorial https://ijry.github.io/uview-plus/components/form.html
 * @property {String}			label			input的label提示语
 * @property {String}			prop			绑定的值
 * @property {Array}			rules			绑定的规则
 * @property {String | Boolean}	borderBottom	是否显示表单域的下划线边框
 * @property {String | Number}	labelWidth		label的宽度，单位px
 * @property {String}			rightIcon		右侧图标
 * @property {String}			leftIcon		左侧图标
 * @property {String | Object} leftIconStyle    左侧图标的样式
 * @property {Boolean}			required		是否显示左边的必填星号，只作显示用，具体校验必填的逻辑，请在rules中配置 (默认 false )
 *
 * @example <u-form-item label="姓名" prop="userInfo.name" borderBottom ref="item1"></u-form-item>
 */
import defProps from "./formItem";
const props = defineProps({
  // input的label提示语
  label: {
    type: String,
    default: () => defProps.formItem.label
  },
  // 绑定的值
  prop: {
    type: String,
    default: () => defProps.formItem.prop
  },
  // 绑定的规则
  rules: {
    type: Array,
    default: () => defProps.formItem.rules
  },
  // 是否显示表单域的下划线边框
  borderBottom: {
    type: [String, Boolean],
    default: () => defProps.formItem.borderBottom
  },
  // label的位置，left-左边，top-上边
  labelPosition: {
    type: String,
    default: () => defProps.formItem.labelPosition
  },
  // label的宽度，单位px
  labelWidth: {
    type: [String, Number],
    default: () => defProps.formItem.labelWidth
  },
  // 右侧图标
  rightIcon: {
    type: String,
    default: () => defProps.formItem.rightIcon
  },
  // 左侧图标
  leftIcon: {
    type: String,
    default: () => defProps.formItem.leftIcon
  },
  // 是否显示左边的必填星号，只作显示用，具体校验必填的逻辑，请在rules中配置
  required: {
    type: Boolean,
    default: () => defProps.formItem.required
  },
  leftIconStyle: {
    type: [String, Object],
    default: () => defProps.formItem.leftIconStyle
  }
});

// 定义发射的事件
const emit = defineEmits(["click"]);

const formItemRef = reactive({
  children: [111]
});

nextTick(() => {
  formItemRef.children.push(11122);
  provide("formItemRef", formItemRef);
});

// 错误提示语
const message = ref("");
// 父组件数据
const parentData = reactive({
  // 提示文本的位置
  labelPosition: "left",
  // 提示文本对齐方式
  labelAlign: "left",
  // 提示文本的样式
  labelStyle: {},
  // 提示文本的宽度
  labelWidth: 45,
  // 错误提示方式
  errorType: "message"
});
const color = ref(ColorConfig.error);
const itemRules = ref([]);

// 计算属性
const propsLine = ref("");

// 方法
const clickHandler = () => {
  emit("click");
};

const addUnitFunc = addUnit;

const init = () => {
  // 父组件的实例
  updateParentData();
  if (!parent) {
    error("u-form-item需要结合u-form组件使用");
  }
};

// 手动设置校验的规则，如果规则中有函数的话，微信小程序中会过滤掉，所以只能手动调用设置规则
const setRules = (rules) => {
  // 判断是否有规则
  if (rules.length === 0) {
    itemRules.value = [];
    return;
  }
  itemRules.value = rules;
};

// 获取父组件的参数
const updateParentData = () => {
  // 此方法写在mixin中
  // getParentData("u-form");
};

// 移除u-form-item的校验结果
const clearValidate = () => {
  message.value = null;
};

// 清空当前的组件的校验结果，并重置为初始值
const resetField = () => {
  // 找到原始值
  const value = getProperty(parent.originalModel, prop);
  // 将u-form的model的prop属性链还原原始值
  setProperty(parent.model, prop, value);
  // 移除校验结果
  message.value = null;
};

onMounted(() => {
  init();
});

watch(() => props.rules, {
  immediate: true,
  handler(n) {
    setRules(n);
  }
});
</script>

<style lang="scss" scoped>
@import "../../libs/css/mixin.scss";

.u-form-item {
  @include flex(column);
  font-size: 14px;
  color: $u-main-color;

  &__body {
    @include flex;
    padding: 10px 0;

    &__left {
      @include flex;
      align-items: center;

      &__content {
        position: relative;
        @include flex;
        align-items: center;
        padding-right: 10rpx;
        flex: 1;

        &__icon {
          margin-right: 8rpx;
        }

        &__required {
          position: absolute;
          left: -9px;
          color: $u-error;
          line-height: 20px;
          font-size: 20px;
          top: 3px;
        }

        &__label {
          @include flex;
          align-items: center;
          flex: 1;
          color: $u-main-color;
          font-size: 15px;
        }
      }
    }

    &__right {
      flex: 1;

      &__content {
        @include flex;
        align-items: center;
        flex: 1;

        &__slot {
          flex: 1;
          /* #ifndef MP */
          @include flex;
          align-items: center;
          /* #endif */
        }

        &__icon {
          margin-left: 10rpx;
          color: $u-light-color;
          font-size: 30rpx;
        }
      }

      &__message {
        font-size: 12px;
        line-height: 12px;
        color: $u-error;
      }
    }
  }
}
</style>
