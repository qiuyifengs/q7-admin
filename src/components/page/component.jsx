export default {
  name: 'q7-page',
  inject: {
    pageContainer: {
      default () {
        console.error('Q7Page needs to be child of Q7PageContainer')
      }
    },
    layout: {}
  },

  props: {
    padding: Boolean,
    styleFn: Function
  },

  computed: {
    style () {
      const offset =
        (this.layout.header.space === true ? this.layout.header.size : 0) +
        (this.layout.footer.space === true ? this.layout.footer.size : 0)

      if (typeof this.styleFn === 'function') {
        const height = this.layout.container === true
          ? this.layout.containerHeight
          : this.$q.screen.height

        return this.styleFn(offset, height)
      }

      const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight

      return {
        minHeight: this.layout.container === true
          ? (this.layout.containerHeight - offset) + 'px'
          : (
            height === 0
              ? `calc(100vh - ${offset}px)`
              : (height - offset) + 'px'
          )
      }
    },

    classes () {
      if (this.padding === true) {
        return 'q7-layout-padding'
      } else {
        return ''
      }
    }
  },

  render() {
    const { style, classes, $slots } = this
    return (
      <main class={ `q7-page ${classes}` }>
        { $slots.default }
      </main>
    )
  }
}