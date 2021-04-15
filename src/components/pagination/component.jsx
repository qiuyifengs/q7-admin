export default {
  name: 'q7-pagination',
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 0
    },
    pageSizes: {
      type: Array,
      require: false,
      default: () => {
          return [10, 20, 30, 40]
      }
    },
    background: {
      type: Boolean,
      require: false,
      default: true
    },
    layout: {
      type: String,
      require: false,
      default: 'total, sizes, prev, pager, next, jumper'
    }
  },
  methods: {
    onSizeChange () {
      this.$emit('change')
    },
    onCurrentChange () {
      this.$emit('change')
    }
  },
  render () {
    const { $props } = this
    return (
      <el-pagination { ...{ $props } } size-change={ this.onSizeChange } current-change={ this.onCurrentChange }></el-pagination>
    )
  }
}
