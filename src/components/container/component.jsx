export default {
  name: 'q7-container',
  props: {
    // 容器样式
    type: {
      type: String,
      required: false,
      default: 'full'
    },
  },
  computed: {
    // 始终返回渲染组件
    component () {
        return 'div'
    }
  },
  render (h) {
    const slots = [ this.$slots.default ]
    if (this.$slots.header) slots.push(h('template', { slot: 'header' }, [ this.$slots.header ]))
    if (this.$slots.footer) slots.push(h('template', { slot: 'footer' }, [ this.$slots.footer ]))
    return h('div', {
      ref: 'container',
      class: 'container-component'
    }, [
      h(this.component, {
        ref: 'component',
        props: this.$attrs,
        on: {
          scroll: e => this.$emit('scroll', e)
        }
      }, slots),
    ])
  }
}
