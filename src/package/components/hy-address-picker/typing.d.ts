import type { CSSProperties } from "vue";
import type HyInputProps from "../hy-input/typing";

export default interface HyAddressPickerProps {
  /**
   * @description 用于控制选择器的弹出和收起 ( 默认 false )
   * */
  show?: boolean;
  /**
   * @description 弹出层弹出方向
   * */
  popupMode?: HyApp.LayoutType;
  /**
   * @description 是否显示顶部的操作栏  ( 默认 true )
   * */
  showToolbar?: boolean;
  /**
   * @description 绑定值
   * */
  modelValue: string;
  /**
   * @description 顶部标题
   * */
  title?: string;
  /**
   * @description 字符串截取数组条件
   * */
  separator?: string;
  /**
   * @description 是否显示加载中状态   ( 默认 false )
   * */
  loading?: boolean;
  /**
   * @description 各列中，单个选项的高度   ( 默认 44 )
   * */
  itemHeight?: number;
  /**
   * @description 取消按钮的文字  ( 默认 '取消' )
   * */
  cancelText?: string;
  /**
   * @description 确认按钮的文字  ( 默认 '确认' )
   * */
  confirmText?: string;
  /**
   * @description 取消按钮的颜色  ( 默认 '#909193' )
   * */
  cancelColor?: string;
  /**
   * @description 确认按钮的颜色  ( 默认 '#3c9cff' )
   * */
  confirmColor?: string;
  /**
   * @description 每列中可见选项的数量  ( 默认 5 )
   * */
  visibleItemCount?: number;
  /**
   * @description 是否允许点击遮罩关闭选择器  ( 默认 false )
   * */
  closeOnClickOverlay?: boolean;
  /**
   * @description 各列的默认索引
   * @note 类型有问题,需要调整
   * */
  defaultIndex?: Array<any>;
  /**
   * @description 输入框是否显示边框 ( 默认 false )
   * */
  hasInput?: boolean;
  /**
   * @description 输入框集合属性
   * */
  input?: Partial<HyInputProps>;
  /**
   * @description 右边插槽
   * */
  toolbarRightSlot?: boolean;
  /**
   * @description 输入框形状
   * */
  shape?: HyApp.ShapeType;
  /**
   * @description 输入框边框
   * */
  border?: HyApp.BorderType;
  /**
   * @description 自定义输入框外部样式
   * */
  customStyle?: CSSProperties;
}
