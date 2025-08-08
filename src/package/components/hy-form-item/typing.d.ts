export interface FormContext {
  formData: Record<string, any>
  errors: Record<string, string>
  rules: any
  labelWidth: any
  labelPosition: any
  labelAlign: any
  addFormItem: (item: any) => void
  removeFormItem: (item: any) => void
  validateField: (field: string, value: any, trigger?: 'blur' | 'change') => boolean
  setFieldValue: (field: string, value: any) => void
  getFieldValue: (field: string) => any
}

export interface FormItemContext {
  /**
   * 失去焦点触发表单校验
   * */
  handleBlur: (value: string | number) => void
  /**
   * 值改变触发表单校验
   * */
  handleChange: (value: string | number) => void
}

export default interface HyFormItemProps {
  /**
   * 标签文本
   */
  label?: string
  /**
   * 表单字段名
   */
  prop?: string
  /**
   * 是否必填
   */
  required?: boolean
  /**
   * 验证规则
   */
  rules?: any
}
