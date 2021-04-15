export default {
  name: 'q7-trigger-collapse',
  props: {
    layout: {
      type: String,
      required: true,
      default: 'mix'
    },
    asideCollapse: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    asideCollapseToggle() {
      this.$emit('asideCollapseToggle')
    }
  },
  render () {
    return <el-menu
        mode = { this.mode }
        collapse = { this.asideCollapse }
        backgroundColor = { this.layout === 'side' ? '#001529' : '' }
        textColor = { this.layout === 'side' ? '#fff' : '' }
        activeTextColor = { this.layout === 'side' ? '#409EFF' : '' }
        onSelect = { this.asideCollapseToggle }
        ref="trigger">
        <el-menu-item> { this.$slots.icon } </el-menu-item>
    </el-menu>
  }
}
