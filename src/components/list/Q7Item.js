import { uniqueSlot } from '../../utils/slot.js'
import ListenersMixin from '../../mixins/listeners.js'

export default {
  name: 'q7-item',

  mixins: [ ListenersMixin ],

  methods: {
    __getContent (h) {
      const child = uniqueSlot(this, 'default', [])
      return child
    },
  },

  render (h) {
    return h('div', {
      staticClass: 'q7-item q7-item-type row no-wrap'
    }, this.__getContent(h))
  }
}