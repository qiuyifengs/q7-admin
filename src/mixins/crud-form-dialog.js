
export default {
  data () {
    return {
      dialog: {
        size: 'medium',
        visible: false,
        showClose: true,
        // top: '0px',
        width: '500px',
        customClass: 'el-dialog__no-top-border hy-crud-dialog',
        appendToBody: true,
        fullscreen: false,
        otherTitle: ''
      },
    }
  },
  computed: {
    title () {
      return this.switchByMode('新建', '编辑', this.dialog.otherTitle)
    }
  },
  methods: {
    vNodeDialog (content) {
      return <el-dialog
          { ...{ attrs: this.dialog } }
          v-drag-dialog
          on-close={ this.cancle }>
            <template slot="title">
              {this.title}
              <button type="button" class="el-dialog__headerbtn fullscreen" on-click={ () => this.dialog.fullscreen = !this.dialog.fullscreen }>
                <i class="el-dialog__close el-icon el-icon-full-screen"/>
              </button>
            </template>
          { content }
        </el-dialog>
    },

    open () {
      this.dialog.visible = true
      this.$nextTick(() => this.clearValidate())
    },

    cancle () {
      this.clearValidate()
      this.dialog.visible = false
    },

    clearValidate () {
      this.$nextTick(() => {
        this.$refs.form && this.$refs.form.clearValidate()
      })
    }
  }
}
  