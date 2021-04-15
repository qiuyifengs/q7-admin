export default {
    name: 'q7-bar',
    render (createElement) {
      return createElement('div', {
        style: {
          margin: '0 -5px'
        },
        attrs: {
          class: 'q7-bar items-center',
        }
      }, [
        this.$slots.default
      ])
    }
  }
  