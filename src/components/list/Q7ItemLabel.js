import { slot } from '../../utils/slot.js'
import ListenersMixin from '../../mixins/listeners.js'

export default {
  name: 'q7-item-label',

  mixins: [ ListenersMixin ],

  props: {
    overline: Boolean,
    caption: Boolean,
    header: Boolean,
    lines: [Number, String]
  },

  computed: {
    classes () {
      return {
        'q7-item__label--overline text-overline': this.overline,
        'q7-item__label--caption text-caption': this.caption,
        'q7-item__label--header': this.header,
        'ellipsis': parseInt(this.lines, 10) === 1
      }
    },

    style () {
      if (this.lines !== void 0 && parseInt(this.lines, 10) > 1) {
        return {
          overflow: 'hidden',
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': this.lines
        }
      }
    }
  },

  render (h) {
    return h('div', {
      staticClass: 'q7-item__label',
      style: this.style,
      class: this.classes,
      on: { ...this.q7Listeners }
    }, slot(this, 'default'))
  }
}