import Q7Icon from '../icon/component.js'

import { mergeSlotSafely } from '../../utils/slot.js'
import ListenersMixin from '../../mixins/listeners.js'

export default {
  name: 'q7-avatar',

  mixins: [ ListenersMixin ],

  props: {
    fontSize: String,

    color: String,
    textColor: String,

    icon: String,
    square: Boolean,
    rounded: Boolean
  },

  computed: {
    classes () {
      return {
        [`bg-${this.color}`]: this.color,
        [`text-${this.textColor} q7-chip--colored`]: this.textColor,
        'q7-avatar--square': this.square,
        'rounded': this.rounded
      }
    },

    contentStyle () {
      if (this.fontSize) {
        return { fontSize: this.fontSize }
      }
    }
  },

  render (h) {
    const icon = this.icon !== void 0
      ? [ h(Q7Icon, { props: { name: this.icon } }) ]
      : void 0

    return h('div', {
      staticClass: 'q7-avatar',
      style: this.sizeStyle,
      class: this.classes,
      on: { ...this.qListeners }
    }, [
      h('div', {
        staticClass: 'q7-avatar__content row items-center overflow-hidden',
        style: this.contentStyle
      }, mergeSlotSafely(icon, this, 'default'))
    ])
  }
}