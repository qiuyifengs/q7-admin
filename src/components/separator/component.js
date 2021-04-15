
import ListenersMixin from '../../mixins/listeners.js'

const insetMap = {
  true: 'inset',
  item: 'item-inset',
  'item-thumbnail': 'item-thumbnail-inset'
}

export const margins = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24
}

export default {
  name: 'q7-separator',

  mixins: [ ListenersMixin ],

  props: {
    spaced: [ Boolean, String ],
    inset: [ Boolean, String ],
    vertical: Boolean,
    color: String,
    size: String
  },

  computed: {
    orientation () {
      return this.vertical === true
        ? 'vertical'
        : 'horizontal'
    },

    classPrefix () {
      return ` q7-separator--${this.orientation}`
    },

    insetClass () {
      return this.inset !== false
        ? `${this.classPrefix}-${insetMap[this.inset]}`
        : ''
    },

    classes () {
      return `q7-separator${this.classPrefix}${this.insetClass}` +
        (this.color !== void 0 ? ` bg-${this.color}` : '')
    },

    style () {
      const style = {}

      if (this.size !== void 0) {
        style[ this.vertical === true ? 'width' : 'height' ] = this.size
      }

      if (this.spaced !== false) {
        const size = this.spaced === true
          ? `${margins.md}px`
          : this.spaced in margins ? `${margins[this.spaced]}px` : this.spaced

        const props = this.vertical === true
          ? [ 'Left', 'Right' ]
          : [ 'Top', 'Bottom' ]

        style[`margin${props[0]}`] = style[`margin${props[1]}`] = size
      }

      return style
    },

    attrs () {
      return {
        role: 'separator',
        'aria-orientation': this.orientation
      }
    }
  },

  render (h) {
    return h('hr', {
      staticClass: 'q7-separator',
      class: this.classes,
      style: this.style,
      attrs: this.attrs,
      on: { ...this.q7Listeners }
    })
  }
}
