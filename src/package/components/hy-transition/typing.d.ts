import type { CSSProperties } from "vue";

export default interface HyTransitionProps {
  /**
   * @description 是否展示组件
   * */
  show: boolean;
  /**
   * @description 使用的动画模式（默认：fade）
   * */
  mode?: HyApp.TransitionMode;
  /**
   * @description 动画的执行时间，单位ms
   * */
  duration?: number;
  /**
   * @description 使用的动画过渡函数（默认：ease-out）
   * */
  timingFunction?: string;
  /**
   * @description 定义需要用到的外部样式
   * */
  customStyle?: CSSProperties;
}
