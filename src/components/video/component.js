
import RatioMixin from '../../mixins/ratio.js'
import ListenersMixin from '../../mixins/listeners.js'

export default {
  name: 'q7-video',

  mixins: [ RatioMixin, ListenersMixin ],

  props: {
    src: {
      type: String,
      required: true
    }
  },

  computed: {
    iframeData () {
      return {
        attrs: {
          src: this.src,
          frameborder: '0',
          allowfullscreen: true
        }
      }
    },

    classes () {
      return 'q7-video' +
        (this.ratio !== void 0 ? ' q7-video--responsive' : '')
    }
  },

  render (h) {
    return h('div', {
      class: this.classes,
      style: this.ratioStyle,
      on: { ...this.qListeners }
    }, [
      h('iframe', this.iframeData)
    ])
  }
}