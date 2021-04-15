import Q7Icon from '../icon/component.js'

import { mergeSlotSafely } from '../../utils/slot.js'

export default {
  name: 'q7-chip',

  props: {
    dense: Boolean,

    icon: String,
    iconRight: String,
    label: [String, Number],

    color: String,
    textColor: String,

    value: {
      type: Boolean,
      default: true
    },

    square: Boolean,
    outline: Boolean,

    tabindex: [String, Number],
    disable: Boolean
  },

  computed: {
    classes () {
      const text = this.outline === true
        ? this.color || this.textColor
        : this.textColor

      return {
        [`bg-${this.color}`]: this.outline === false && this.color !== void 0,
        [`text-${text} q7-chip--colored`]: text,
        disabled: this.disable,
        'q7-chip--dense': this.dense,
        'q7-chip--outline': this.outline,
        'q7-chip--square': this.square,
      }
    },

    hasLeftIcon () {
      return this.icon !== void 0
    },

    leftIcon () {
      return this.icon
    },

  },

  methods: {
    __getContent (h) {
      const child = []

      this.hasLeftIcon === true && child.push(
        h(Q7Icon, {
          staticClass: 'q7-chip__icon q7-chip__icon--left',
          props: { name: this.leftIcon }
        })
      )

      const label = this.label !== void 0
        ? [ h('div', { staticClass: 'ellipsis' }, [ this.label ]) ]
        : void 0

      child.push(
        h('div', {
          staticClass: 'q7-chip__content col row no-wrap items-center q7-anchor--skip'
        }, mergeSlotSafely(label, this, 'default'))
      )

      return child
    }
  },

  render (h) {
    if (this.value === false) { return }

    const data = {
      staticClass: 'q7-chip row inline no-wrap items-center',
      class: this.classes,
      style: this.sizeStyle
    }

    return h('div', data, this.__getContent(h))
  }
}