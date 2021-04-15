// 图片行展示组件
export default {
  name: 'q7-image-format',

  props: {
    // 图片的url
    // 'url' 或 ['url1','url2']
    value: {
      type: [ String, Array ],
      require: true
    },

    width: {
      require: false,
      default: 30
    },

    height: {
      require: false,
      default: 30
    },

    fit: {
      default: 'contain'
    },

    elProps: {
      type: Object
    },

    error: {
      default: undefined
    },

    // 构建下载URL方法
    buildUrl: {
      type: Function,
      default: function (value) { return value}
    }
  },

  render () {
    return <el-image></el-image>
  },

  computed: {
    urls () {
      const urls = []
      if (this.value == null || this.value === '') {
        return urls
      }
      if (typeof (this.value) === 'string') {
        urls.push(this.value)
      } else if (this.value instanceof Array) {
        for (const item of this.value) {
          if (item.url != null) {
            urls.push(item.url)
          } else {
            urls.push(item)
          }
        }
      } else {
        urls.push(this.value.url)
      }
      const arr = []
      for (const url of urls) {
        arr.push(this.buildUrl(url))
      }
      return arr
    },

    imgHeight () {
      if (typeof (this.height) === 'number') {
        return this.height + 'px'
      }
      return this.height
    },

    imgWidth () {
      if (typeof (this.width) === 'number') {
        return this.width + 'px'
      }
      return this.width
    },

    _elProps () {
      const defaultElProps = { fit: 'contain', previewSrcList: this.urls }
      Object.assign(defaultElProps, this.elProps)
      return defaultElProps
    }
  },
}