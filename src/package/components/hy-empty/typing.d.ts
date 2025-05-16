import type { CSSProperties } from "vue";

export default interface HyEmptyProps {
  /**
   * @description 是否显示空状态
   * */
  show?: boolean;
  /**
   * @description 空状态图片
   * */
  imageUrl?: string;
  /**
   * @description 组件层级
   * */
  zIndex?: number;
  /**
   * @description icon宽度
   * */
  width?: number | string;
  /**
   * @description icon高度
   * */
  height?: number | string;
  /**
   * @description 提示信息
   * */
  description?: string;
  /**
   * @description 提示信息大小
   * */
  desSize?: string | number;
  /**
   * @description 提示信息颜色
   * */
  desColor?: string;
  /**
   * @description 图片margin
   * */
  imgMargin?: string;
  /**
   * @description 按钮文字
   * */
  btnText?: string;
  /**
   * @description 按钮尺寸，large，normal，mini （默认 normal）
   * */
  btnSize?: "normal" | "large" | "small" | "mini";
  /**
   * @description 按钮的预置样式，info，primary，error，warning，success (默认 'info' )
   * */
  btnType?: HyApp.ThemeType;
  /**
   * @description 按钮形状，circle（两边为半圆），square（带圆角） （默认 'square' ）
   * */
  btnShape?: HyApp.ShapeType;
  /**
   * @description 按钮是否镂空，背景色透明 （默认 false）
   * */
  btnPlain?: boolean;
  /**
   * @description 跳转地址
   * */
  navigateUrl?: string;
  /**
   * @description 自定义输入框外部样式
   * */
  customStyle?: CSSProperties;
}
