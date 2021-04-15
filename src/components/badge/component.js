import { slot } from '../../utils/slot.js'
import ListenersMixin from '../../mixins/listeners.js'

export default {
  name: 'q7-badge',

  mixins: [ ListenersMixin ],

  props: {
    color: String,
    textColor: String,

    floating: Boolean,
    transparent: Boolean,
    multiLine: Boolean,
    outline: Boolean,

    label: [Number, String],

    align: {
      type: String,
      validator: v => ['top', 'middle', 'bottom'].includes(v)
    }
  },

  computed: {
    style () {
      if (this.align !== void 0) {
        return { verticalAlign: this.align }
      }
    },

    classes () {
      const text = this.outline === true
        ? this.color || this.textColor
        : this.textColor

      return 'q7-badge flex inline items-center no-wrap' + 
        ` q7-badge--${this.multiLine === true ? 'multi' : 'single'}-line` +
        (this.outline === true
          ? ' q7-badge--outline'
          : (this.color !== void 0 ? ` bg-${this.color}` : '')  
        ) +
        (text !== void 0 ? ` text-${text}` : '') +
        (this.floating === true ? ' q7-badge--floating' : '') +
        (this.transparent === true ? ' q7-badge--transparent' : '')
    },

    attrs () {
      return {
        role: 'alert',
        'aria-label': this.label
      }
    }
  },

  render (h) {
    return h('div', {
      style: this.style,
      class: this.classes,
      attr: this.attr,
      on: { ...this.q7Listeners }
    }, this.label !== void 0 ? [this.label] : slot(this, 'default'))
  }
}