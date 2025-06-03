import type { CSSProperties } from "vue";

interface SwipeActionOptionsVo {
  text: string;
  style?: CSSProperties;
  icon?: string;
  iconSize?: string | number;
}

export default interface SwipeActionProps {
  /**
   * @description 是否自动关闭其他swipe按钮组（默认 true ）
   * */
  autoClose?: boolean;
  borderBottom?: boolean;
  /**
   * @description 右侧按钮内容
   * */
  options?: SwipeActionOptionsVo[];
  /**
   * @description 动画过渡时间，单位ms（默认 350 ）
   * */
  duration?: number;
  /**
   * @description 定义需要用到的外部样式
   * */
  customStyle?: CSSProperties;
}
