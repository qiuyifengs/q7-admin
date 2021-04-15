export default {
  /**
   * 补全静态资源地址
   * @param {*} val 七牛的key值
   * @param {*} type 是否为图片数组 默认false
   */
  formatStaticUrl(val, type = false) {
    if (val === [] || val === undefined) return
    const baseUrl = process.env.VUE_APP_BASE_STATIC_URL
    const isStartWithHttp = (val) => {
      return /^https:\/\/|http:\/\//.test(val)
    }

    if (val.length > 1 && type) {
      const arr = val.map((item) => {
        if (isStartWithHttp(item)) {
          return item
        } else {
          return `${baseUrl}${item}`
        }
      })
      return arr
    } else if (!type && isStartWithHttp(val)) {
      return val
    } else {
      const url = `${baseUrl}${val}`
      return type ? [url] : url
    }
  },
  kindFilter(val) {
    const kindMap = {
      ORGAN: '机构',
      PERSON: '个人',
    }
    return val ? kindMap[val] : '--'
  },
  /**
   * 图片正方形缩略图200x200
   * @param {String} val 图片URL
   * @returns {String}
   */
  thumbSquare: (val, size = 200) => {
    if (val) {
      const ext = val.substring(val.lastIndexOf('.'));
      const names = val.substring(0, val.lastIndexOf('.'));
      return `${names}_${size}x${size}${ext}`
    } else {
      return ''
    }
  },
  /**
   * 七牛图片缩略图等比缩放600
   * @param {String} val 图片URL
   * @returns {String}
   */
  thumbSquareFull: (val, size = 600) => {
    if (val) {
      const ext = val.substring(val.lastIndexOf('.'));
      const names = val.substring(0, val.lastIndexOf('.'));
      return `${names}_${size}x${size}${ext}`
    } else {
      return ''
    }
  },
  /**
   * 视频缩略图
   * @param {String} val 图片URL
   * @returns {String}
   */
  videoThumbPost: (val, width = 300, height = 200, time = 2000) => {
    if (val && val !== "") {
      let isHeight = height === 0
      let thumb = isHeight ? `thumb-${time}-w${width}.jpg` : `thumb-${time}-w${width}-h${height}.jpg`
      if (val.includes('index.m3u8')) {
        return val.replace(/index.m3u8/, thumb)
      } else {
        return `${val}/${thumb}`
      }
    } else {
      return ""
    }
  },
  /**
   * 手机号格式化
   * @param {String} numb 手机号
   * @returns {String}
   */
  phoneFilter: numb => {
    let num = numb.toString()
    if (num === '') return
    return num.replace(/^(.{3})(.*)(.{4})$/, '$1 $2 $3')
  }
}