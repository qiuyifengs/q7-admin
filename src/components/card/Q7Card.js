import ListenersMixin from '../../mixins/listeners.js'

import { slot } from '../../utils/slot.js'

export default {
  name: 'q7-card',

  mixins: [ ListenersMixin ],

  props: {
    square: Boolean,
    flat: Boolean,
    bordered: Boolean
  },

  computed: {
    classes () {
      return 'q7-card' +
        (this.bordered === true ? ' q7-card--bordered' : '') +
        (this.square === true ? ' q7-card--square no-border-radius' : '') +
        (this.flat === true ? ' q7-card--flat no-shadow' : '')
    }
  },

  render (h) {
    return h('div', {
      class: this.classes,
      on: { ...this.q7Listeners }
    }, slot(this, 'default'))
  }
}
