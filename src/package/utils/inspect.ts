/**
 * @description 判断字符串是否是数字
 * @param {string | number} text 值
 * @return {boolean}
 * */
export const isNumericString = (text: string | number): boolean => {
  return typeof text === 'string' && !isNaN(Number(text))
}

/**
 * @description 判断是否是数字
 * @param {string | number} text 值
 * @return {boolean}
 * */
export const isNumber = (text: string | number): boolean => {
  return typeof text === 'number' || isNumericString(text)
}

/**
 * @description 判断是否数组
 * @param arr 传入数组值
 * @return {boolean}
 */
export const isArray = (arr: any): boolean => {
  if (typeof Array.isArray === 'function') {
    return Array.isArray(arr)
  }
  return Object.prototype.toString.call(arr) === '[object Array]'
}

/**
 * @description 判断是否对象
 * @param obj 传入对象值
 * @return {boolean}
 */
export const isObject = (obj: any): boolean => {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

/**
 * 是否视频格式
 * @param {String} value
 */
export function isVideo(value: string): boolean {
  const VIDEO_REGEXP = /\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv|m3u8)/i
  return VIDEO_REGEXP.test(value)
}

/**
 * 判断是否是日期格式
 * @param {number | string} value yyyy-mm-dd hh:mm:ss 或 时间戳
 */
export const isDate = (value: string | number) => {
  if (!value) return false
  // number类型，判断是否是时间戳
  if (typeof value === 'number') {
    // len === 10 秒级时间戳 len === 13 毫秒级时间戳
    if (value.toString().length !== 10 && value.toString().length !== 13) {
      return false
    }
    return !isNaN(new Date(value).getTime())
  }
  if (typeof value === 'string') {
    // 是否为string类型时间戳
    const numV = Number(value)
    if (!isNaN(numV)) {
      if (numV.toString().length === 10 || numV.toString().length === 13) {
        return !isNaN(new Date(numV).getTime())
      }
    }
    // 非时间戳，且长度在yyyy-mm-dd 至 yyyy-mm-dd hh:mm:ss 之间
    if (value.length < 10 || value.length > 19) {
      return false
    }
    const dateRegex = /^\d{4}[-\/]\d{2}[-\/]\d{2}( \d{1,2}:\d{2}(:\d{2})?)?$/
    if (!dateRegex.test(value)) {
      return false
    }
    // 检查是否为有效日期
    const dateValue = new Date(value)
    return !isNaN(dateValue.getTime())
  }
  // 非number和string类型，不做校验
  return false
}

/**
 * @description 验证是否是手机号格式
 * @param phone {string} 手机号
 */
export const isPhone = (phone: string): boolean => {
  return /^1[23456789]\d{9}$/.test(phone)
}

/**
 * @description 验证身份证号码
 * @param idCard {string} 身份证号
 * @return {boolean}
 */
export const isIdCard = (idCard: string): boolean => {
  return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(idCard)
}

/**
 * @description 验证是否是中文
 * @param {string} zh 校验值
 * @return {boolean}
 */
export const isChinese = (zh: string): boolean => {
  const reg = /^[\u4e00-\u9fa5]+$/gi
  return reg.test(zh)
}

/**
 * @description 是否为base64图片
 * @param {string} url
 * @return
 */
export function isBase64Image(url: string) {
  // 使用正则表达式检查URL是否以"data:image"开头，这是Base64图片的常见前缀
  return /^data:image\/(png|jpg|jpeg|gif|bmp);base64,/.test(url)
}

/**
 * @description 是否图片
 * @param {string} url
 * @return
 */
export function isImage(url: string) {
  // 使用正则表达式检查URL是否以"data:image"开头，这是Base64图片的常见前缀
  return /(\.jpg|\.jpeg|\.png|\.gif|\.bmp|\.webp)$/i.test(url)
}

/**
 * @description 判断环境是否是H5
 */
export const isH5 = (() => {
  let isH5 = false
  // #ifdef H5
  isH5 = true
  // #endif
  return isH5
})()
