import type { CSSProperties } from 'vue'
import { HyApp } from 'hy-app/typing/modules/common'
export interface IActionSheetAction {
  /**
   * 选项名称
   */
  name: string
  /**
   * 描述信息
   */
  sub?: string
  /**
   * 颜色
   */
  color?: string
  /**
   * 禁用
   */
  disabled?: boolean
  /**
   * 加载中状态
   */
  loading?: boolean
}
export interface IActionSheetPanel {
  /**
   * 图片地址
   */
  iconUrl: string
  /**
   * 标题内容
   */
  name: string
}
export default interface HyActionSheetProps {
  /**
   * @description 操作菜单是否展示 ( 默认 false )
   * */
  modelValue?: boolean
  /**
   * @description 菜单选项
   * */
  actions?: IActionSheetAction[]
  /**
   * @description 自定义面板项,可以为字符串数组，也可以为对象数组，如果为二维数组，则为多行展示
   * */
  panels?: Array<IActionSheetPanel | IActionSheetPanel[]>
  /**
   * @description 圆角值 (默认 20 )
   * */
  round?: string | number
  /**
   * @description 标题
   * */
  title?: string
  /**
   * @description 标题文字位置
   * */
  titleAlign?: HyApp.RowCenterType
  /**
   * @description 取消按钮的提示文字,不为空时显示按钮
   * */
  cancelText?: string
  /**
   * @description 点击某个菜单项时是否关闭弹窗 （默认 true ）
   * */
  closeOnClickAction?: boolean
  /**
   * @description 点击遮罩是否允许关闭  (默认 true )
   * */
  closeOnClickOverlay?: boolean
  /**
   * @description 弹框动画持续时间 ( 默认 200 )
   * */
  duration?: number
  /**
   * @description 菜单层级 ( 默认 100 )
   * */
  zIndex?: number
  /**
   * @description 处理底部安全区 （默认 true ）
   * */
  safeAreaInsetBottom?: boolean
  /**
   * @description 自定义外部样式
   * */
  customStyle?: CSSProperties
  /**
   * @description 自定义外部类名
   * */
  customClass?: string
  /**
   * @description 自定义标题类名
   * */
  customHeaderClass?: string
}
