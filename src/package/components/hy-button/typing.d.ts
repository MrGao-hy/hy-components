import type { CSSProperties } from "vue";
import type HyIconProps from "../hy-icon/typing";

export default interface HyButtonProps {
  /**
   * @description 是否显示按钮的细边框 (默认 true )
   * */
  hairline?: boolean;
  /**
   * @description 按钮的预置样式，info，primary，error，warning，success (默认 'primary' )
   * */
  type?: HyApp.ThemeType;
  /**
   * @description 按钮尺寸，large，medium，mini （默认 medium）
   * */
  size?: HyApp.SizeType | "mini";
  /**
   * @description 按钮形状，circle（两边为半圆），square（带圆角） （默认 'square' ）
   * */
  shape?: HyApp.ShapeType;
  /**
   * @description 按钮是否镂空，背景色透明 （默认 false）
   * */
  plain?: boolean;
  /**
   * @description 是否禁用 （默认 false）
   * */
  disabled?: boolean;
  /**
   * @description 按钮名称前是否带 loading 图标(App-nvue 平台，在 ios 上为雪花，Android上为圆圈) （默认 false）
   * */
  loading?: boolean;
  /**
   * @description 加载中提示文字
   * */
  loadingText?: string;
  /**
   * @description 加载状态图标类型 （默认 'spinner' ）
   * */
  loadingMode?: HyApp.LoadingMode;
  /**
   * @description 加载图标大小 （默认 13 ）
   * */
  loadingSize?: number;
  /**
   * @description 开放能力，具体请看uniapp稳定关于button组件部分说明
   * */
  openType?: string;
  /**
   * @description 用于 <form> 组件，点击分别会触发 <form> 组件的 submit/reset 事件
   * */
  formType?: string;
  /**
   * @description 打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效 （注：只微信小程序、QQ小程序有效）
   * */
  appParameter?: string;
  /**
   * @description 指定是否阻止本节点的祖先节点出现点击态，微信小程序有效（默认 true ）
   * */
  hoverStopPropagation?: boolean;
  /**
   * @description 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文（默认 en ）
   * */
  lang?: string;
  /**
   * @description 会话来源，openType="contact"时有效
   * */
  sessionFrom?: string;
  /**
   * @description 会话内消息卡片标题，openType="contact"时有效
   * */
  sendMessageTitle?: string;
  /**
   * @description 会话内消息卡片点击跳转小程序路径，openType="contact"时有效
   * */
  sendMessagePath?: string;
  /**
   * @description 会话内消息卡片图片，openType="contact"时有效
   * */
  sendMessageImg?: string;
  /**
   * @description 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，用户点击后可以快速发送小程序消息，openType="contact"时有效（默认false）
   * */
  showMessageCard?: boolean;
  /**
   * @description 额外传参参数，用于小程序的data-xxx属性，通过target.dataset.name获取
   * */
  dataName?: string;
  /**
   * @description 节流时间，一定时间内只能触发一次 （默认 0 )
   * */
  throttleTime?: number;
  /**
   * @description 按住后多久出现点击态，单位毫秒 （默认 0 )
   * */
  hoverStartTime?: number;
  /**
   * @description 手指松开后点击态保留时间，单位毫秒 （默认 200 )
   * */
  hoverStayTime?: number;
  /**
   * @description 按钮文字，之所以通过props传入，是因为slot传入的话（注：nvue中无法控制文字的样式）
   * */
  text?: string;
  /**
   * @description 按钮图标api集合
   * */
  icon?: Partial<HyIconProps>;
  /**
   * @description 按钮颜色，支持传入linear-gradient渐变色
   * */
  color?: string;
  /**
   * @description 阻止事件冒泡
   * */
  stop?: boolean;
  /**
   * @description 定义需要用到的外部样式
   * @note 类型问题
   * */
  customStyle?: CSSProperties;
}
