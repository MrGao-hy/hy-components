import type { CSSProperties } from "vue";

export default interface HyRateProps {
  /**
   * @description v-model绑定的值
   * */
  modelValue: number;
  /**
   * @description 星星的数量
   * */
  count?: number;
  /**
   * @description 是否禁用
   * */
  disabled?: boolean;
  /**
   * @description 是否只读
   * */
  readonly?: boolean;
  /**
   * @description 星星的大小
   * */
  size?: number | string;
  /**
   * @description 未激活星星的颜色
   * */
  inactiveColor?: string;
  /**
   * @description 激活星星的颜色
   * */
  activeColor?: string;
  /**
   * @description 星星之间的间距
   * */
  gutter?: number;
  /**
   * @description 最小星星数量
   * */
  minCount?: number;
  /**
   * @description 是否允许半星
   * */
  allowHalf?: boolean;
  /**
   * @description 激活状态的图标
   * */
  activeIcon?: string;
  /**
   * @description 未激活状态的图标
   * */
  inactiveIcon?: string;
  /**
   * @description 是否可触摸
   * */
  touchable?: boolean;
  /**
   * @description 自定义样式
   * */
  customStyle?: CSSProperties;
}
