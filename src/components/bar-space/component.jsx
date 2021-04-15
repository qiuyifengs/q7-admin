export default {
  name: 'q7-bar-space',
  props: {
    width: {
      type: String,
      default: ''
    }
  },
  render (createElement) {
    return createElement('div', {
      style: {
        maxWidth: this.width
      },
      // 普通的 HTML 特性
      attrs: {
        'class': 'q7-bar-space',
      }
    }, [])
  }
}
  