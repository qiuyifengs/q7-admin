import { slot } from '../../utils/slot.js'
import ListenersMixin from '../../mixins/listeners.js'

export default {
  name: 'q7-item-section',

  mixins: [ ListenersMixin ],

  props: {
    avatar: Boolean,
    thumbnail: Boolean,
    side: Boolean,
    top: Boolean,
    nowrap: Boolean,
  },

  computed: {
    classes () {
      const side = this.avatar || this.side || this.thumbnail

      return {
        'q7-item__section--top': this.top,
        'q7-item__section--avatar': this.avatar,
        'q7-item__section--thumbnail': this.thumbnail,
        'q7-item__section--side': this.side,
        'q7-item__section--nowrap': this.nowrap,
        'q7-item__section--main': !side,
        [`justify-${this.top ? 'start' : 'center'}`]: true
      }
    }
  },

  render (h) {
    return h('div', {
      staticClass: 'q7-item__section column',
      class: this.classes,
      on: { ...this.q7Listeners }
    }, slot(this, 'default'))
  }
}