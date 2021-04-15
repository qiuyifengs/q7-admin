import ListenersMixin from '../../mixins/listeners.js'

import AlignMixin from '../../mixins/align.js'

import { slot } from '../../utils/slot.js'

export default {
  name: 'q7-card-actions',

  mixins: [ ListenersMixin, AlignMixin ],

  props: {
    vertical: Boolean
  },

  computed: {
    classes () {
      return `q7-card__actions--${this.vertical === true ? 'vert column' : 'horiz row'} ${this.alignClass}`
    }
  },

  render (h) {
    return h('div', {
      staticClass: 'q7-card__actions',
      class: this.classes,
      on: { ...this.q7Listeners }
    }, slot(this, 'default'))
  }
}
