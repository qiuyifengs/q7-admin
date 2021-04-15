export default {
    name: 'q7-table-actions',
    render () {
      const actions = this.actions.map(item => {
        if (item.show !== false) {
          return item
        }
      })
      const filterActions = actions.filter(item => item)

      const render =
        <div>
          {
            filterActions.map(
              action => {
                const attrsDefault = {
                  plain: true
                }
                const attrs = this._.omit(action, [
                  'action'
                ])
                const button =
                  <q7-button
                    { ...{ attrs: Object.assign({}, attrsDefault, attrs) } }
                    class="is-thin mb-2"
                    on-click={ () => this.onAction(action) }
                  />
                return button
              }
            )
          }
        </div>
      return render
    },
    props: {
      actions: {
        type: Array,
        default: () => [],
        required: false
      }
    },
    methods: {
      onAction (action) {
        const callback = action.action || (() => {})
        if (action.confirm) {
          this.$confirm(action.confirm, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(callback)
            .catch(() => {})
        } else {
          callback()
        }
      }
    }
  }
  