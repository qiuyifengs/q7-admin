
import HeightUtil from '../../utils/height.js'
import { slot } from '../../utils/slot.js'

export default {
  name: 'q7-crud',

  props: {
    columns: {
      type: Array,
      default: () => [],
      required: false
    }
  },

  data () {
    return {
      crud: {
        options: {
          rowKey: 'id',
          border: true,
          highlightCurrentRow: true,
          maxHeightAdjust: undefined,
          headerCellStyle: {
            background: '#fafafa',
            color: 'rgba(0,0,0,.85)',
          },
        },
      }
    }
  },

  render (h) {
          
    return h('el-table', {
      ref: 'table',
      props: Object.assign(this.crud.options, this.$attrs),
      on: this.$listeners,
      directives: [
        {
          name: 'loading',
          value: this.$attrs.loading || false
        }
      ],
    }, this.columns.map(column => {

      const scopedSlots = column.render ? {
        scopedSlots: {
          default: scope => column.render(scope)
        }
      } : null

      return h('el-table-column', {
        props: column,
        ...scopedSlots || {}
      })

    }))
  },

  watch: {
    columns () {
      this.$nextTick(this.$refs.table.doLayout)
    }
  },

  mounted () {
    this.reComputeCrudHeight()
  },

  methods: {
    method (methodName, ...arg) {
      const fn = this.$refs.table[methodName]
      if (fn) {
        fn(...arg)
      }
    },

    reComputeCrudHeight () {
      if (this.crud && this.crud.options && (this.crud.options.height === '100%' || this.crud.options.height === 'auto')) {
        return
      }
      this.$nextTick(() => {
        this.crud.options.maxHeight = this.computeCrudHeight()
      })
    },

    /**
     * 动态计算crud表格高度，当表格数据大于一屏的时候不会撑开，给翻页组件留出空间
     * crud表格高度 = 可视窗口高度 - crud表头的top位置 - adjust高度
     * @param ref 表格的ref name
     * @param adjust 自定义调整高度（一般传翻页footer组件的高度）
     * @returns {string}
     */
    computeCrudHeight ({ targetRef, targetSubClass, footerRef, adjust } = {}) {
      if (targetRef == null) {
        targetRef = 'table'
      }
      if (footerRef == null) {
        footerRef = 'footer'
      }
      if (targetSubClass == null) {
        targetSubClass = 'el-table'
      }
      let target = this.$refs[targetRef]
      if (target != null) {
        target = target.$el
      }

      let footer = this.$refs[footerRef]
      if (footer != null) {
        footer = footer.$el
      }
      // if (adjust == null) {
      //   adjust = this.crud.options.maxHeightAdjust
      // }

      return HeightUtil.computeMaxHeight({ target, targetSubClass, footer, adjust })
    },

  }
}
