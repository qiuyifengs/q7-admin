import { getScrollbarWidth } from '@/utils/scroll.js'

import ListenersMixin from '../../mixins/listeners.js'

const width = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight

export default {
  name: 'q7-layout',

  provide () {
    return {
      layout: this
    }
  },

  props: {
    container: Boolean,
    view: {
      type: String,
      default: 'hhh lpr fff',
      validator: v => /^(h|l)h(h|r) lpr (f|l)f(f|r)$/.test(v.toLowerCase())
    }
  },

  mixins: [ ListenersMixin ],

  data() {
    return {
      // page related
      width: this.container === true ? 0 : width,
      height: height,
      // container only prop
      containerHeight: 0,
      scrollbarWidth: getScrollbarWidth(),
      header: {
        size: 55,
        offset: 0,
        space: true
      },
      left: {
        size: 200,
        offset: 0,
        space: true
      },
      right: {
        size: 200,
        offset: 0,
        space: true
      },
      footer: {
        size: 0,
        offset: 0,
        space: false
      },

      scroll: {
        position: 0,
        direction: 'down'
      }
    }
  },
  computed: {
    rows () {
      const rows = this.view.toLowerCase().split(' ')
      return {
        top: rows[0].split(''),
        middle: rows[1].split(''),
        bottom: rows[2].split('')
      }
    },

    style () {
      return this.container === true
        ? null
        : { minHeight: this.height + 'px' }
    },

    // used by container only
    targetStyle () {
      if (this.scrollbarWidth !== 0) {
        return { ['left']: `${this.scrollbarWidth}px` }
      }
    },

    targetChildStyle () {
      if (this.scrollbarWidth !== 0) {
        return {
          ['right']: 0,
          ['left']: `-${this.scrollbarWidth}px`,
          width: `calc(100% + ${this.scrollbarWidth}px)`
        }
      }
    },

    totalWidth () {
      return this.width + this.scrollbarWidth
    },

    classes () {
      return 'q7-layout q7-layout--' +
        (this.container === true ? 'containerized' : 'standard')
    }
  },

  created() {
    this.instances = {}
  },

  render() {
    const { classes, targetStyle, targetChildStyle, style, $slots, container } = this
    const layout = <div class={ classes } style={ style }>{ $slots.default }</div>
    const staticClass = 'q7-layout-container overflow-hidden'
    return (
      container === true ? <div class={ staticClass }>
        <div class='absolute-full' style={ targetStyle }>
          <div class='scroll' style={ targetChildStyle }>{ $slots.default }</div>
        </div>
      </div> 
      : layout
    )
  }
}