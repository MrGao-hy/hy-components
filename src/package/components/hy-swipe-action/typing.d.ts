import type { CSSProperties } from "vue";

interface SwipeActionOptionsVo {
  text: string;
  style?: CSSProperties;
  icon?: string;
  iconSize?: string | number;
}

export default interface SwipeActionProps {
  /**
   * @description 数据列表
   * */
  list: Record<string, any>[];
  /**
   * @description 控制打开或者关闭（默认 false ）
   * */
  show?: boolean;
  /**
   * @description 标识符，如果是v-for，可用index索引值
   * */
  name?: string;
  /**
   * @description 唯一键值
   * */
  key?: string;
  /**
   * @description 是否禁用（默认 false ）
   * */
  disabled?: boolean;
  /**
   * @description 滑动距离阈值，只有大于此值，才被认为是要打开菜单（默认 30 ）
   * */
  threshold?: number;
  /**
   * @description 是否自动关闭其他swipe按钮组（默认 true ）
   * */
  autoClose?: boolean;
  /**
   * @description 右侧按钮内容
   * */
  options?: SwipeActionOptionsVo[];
  /**
   * @description 动画过渡时间，单位ms（默认 350 ）
   * */
  duration?: number;
  /**
   * @description 是否关闭
   * */
  closeOnClick: boolean;
  /**
   * @description 定义需要用到的外部样式
   * */
  customStyle?: CSSProperties;
}
