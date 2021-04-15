export function uniqueSlot (vm, slotName, otherwise) {
  return vm.$scopedSlots[slotName] !== void 0
    ? vm.$scopedSlots[slotName]().slice()
    : otherwise
}

export default {
  name: 'q7-header',
  inject: {
    layout: {
      default () {
        console.error('Q7Header needs to be child of Q7Layout')
      }
    }
  },

  props: {
    value: {
      type: Boolean,
      default: true
    },
    reveal: Boolean,
    bordered: Boolean,
    elevated: Boolean,

    heightHint: {
      type: [String, Number],
      default: 50
    }
  },

  computed: {
    classes () {
      return 'fixed-top' +
        (this.bordered === true ? ' q7-header--bordered' : '') +
        (this.hidden === true ? ' q7-header--hidden' : '')
    },
  },

  render (h) {
    const child = uniqueSlot(this, 'default', [])

    this.elevated === true && child.push(
      h('div', {
        staticClass: 'q7-layout__shadow absolute-full overflow-hidden no-pointer-events'
      })
    )

    return h('header', {
      staticClass: 'q7-header q7-layout__section--marginal',
      class: this.classes,
      style: this.style,
    }, child)
  },
}