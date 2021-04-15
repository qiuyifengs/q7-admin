import * as clipboard from 'clipboard-polyfill'

export default {
  name: 'KeyPopover',
  props: {
    secretKey: String,
  },
  methods: {
    hanldeClipboardKey() {
      clipboard.writeText(this.key)
      this.$message.success('已拷贝至剪贴板')
    },
  },
  render() {
      const { secretKey, hanldeClipboardKey } = this
      return (
        secretKey ? <el-popover placement="left-start" trigger="hover">
          <el-link class="flex items-center justify-end" underline={false} onClick={hanldeClipboardKey}>复制</el-link>
          <p class="pt-4 max-w-md overflow-y-auto" style="max-height: 300px">{ secretKey }</p>
          <el-button plain size="mini" icon="el-icon-view" slot="reference"/>
        </el-popover> : ''
      )
  }
}