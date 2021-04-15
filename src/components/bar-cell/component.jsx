export default {
    name: 'q7-bar-cell',
    render (createElement) {
      return createElement('div', {
        style: {
          margin: '0 0 12px 0'
        },
        attrs: {
          'class': 'q7-bar-cell',
        }
      }, [
        this.$slots.default
      ])
    }
  }
  