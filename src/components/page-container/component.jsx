export default {
  name: 'q7-page-container',
  inject: {
    layout: {
      default () {
        console.error('Q7PageContainer needs to be child of QLayout')
      }
    }
  },

  provide: {
    pageContainer: true
  },

  computed: {
    style () {
      const css = {}

      if (this.layout.header.space === true) {
        css.paddingTop = `${this.layout.header.size}px`
      }
      if (this.layout.footer.space === true) {
        css.paddingBottom = `${this.layout.footer.size}px`
      }
      if (this.layout.left.space === true) {
        css['paddingLeft'] = `${this.layout.left.size}px`
      }

      return css
    }
  },

  render () {
    const { style, $slots } = this
    return (
      <div class="q7-page-container" style={ style }>
        { $slots.default }
      </div>
    )
  }
}