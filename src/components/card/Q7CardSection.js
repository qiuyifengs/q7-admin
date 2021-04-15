import ListenersMixin from '../../mixins/listeners.js'

import { slot } from '../../utils/slot.js'

export default {
  name: 'q7-card-section',

  mixins: [ ListenersMixin ],

  props: {
    horizontal: Boolean
  },

  computed: {
    classes () {
      return 'q7-card__section ' +
        `q7-card__section--${this.horizontal === true ? 'horiz row no-wrap' : 'vert'}`
    }
  },

  render (h) {
    return h('div', {
      class: this.classes,
      on: { ...this.q7Listeners }
    }, slot(this, 'default'))
  }
}
