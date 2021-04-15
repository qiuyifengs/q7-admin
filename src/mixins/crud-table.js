import utils from '@/utils'
import dict from './crud-dict'
import pagination from './crud-pagination'

export default {
  mixins: [
    dict,
    pagination
  ],
  provide () {
    return {
      search: this.search
    }
  },
  data () {
    return {
      // 主体表格
      table: {
        data: [],
        columns: []
      },
      // 搜索
      search: {
        panel: {
          active: true
        },
        form: {
          model: {},
          inline: true,
          labelPosition: 'top'
        }
      },
      // 主体表格列过滤
      columnsFilter: {
        options: []
      },
      // 页面状态
      status: {
        isLoadingData: false,
        isLoadingDict: false
      },
      // 排序
      sort: {
        prop: '',
        type: ''
      },
      isFilterColumn: false,
      multipleSelection: undefined,
      vNodeButtonCreateLabel: '新建'
    }
  },
  computed: {
    // 主体表格
    vNodeTable () {
      const node =
        <q7-crud
          ref="table"
          { ...{ attrs: this.table } }
          loading={ this.isTableLoading }
          on-selection-change={ this.onTableSelectionChange }
          on-sort-change={ this.onTableSortChange }/>
      return node
    },
    // 搜索表单
    vNodeSearchForm () {
      const node =
        <el-form { ...{ attrs: this.search.form } } class="is-thin">
          {
            this.settingSearchFilteredShow
              .map(item => {
                const formItem =
                  <el-form-item
                    label={ item.label }
                    prop={ item.prop }>
                    { item.render }
                  </el-form-item>
                return formItem
              })
          }
          <el-form-item label="操作">
            { this.vNodeButtonSearchInForm }
            { this.vNodeButtonSearchFormResetInForm }
            { this.isFilterColumn ? this.vNodeButtonTableColumnsFilterTrigger : '' }
          </el-form-item>
        </el-form>
      return node
    },
    // 搜索表单中的搜索按钮
    vNodeButtonSearchInForm () {
      const node =
        <q7-button
          icon="el-icon-search"
          label="搜索"
          type="primary"
          loading={ this.isSearchButtonLoading }
          on-click={ () => this.research() }
          thin/>
      return node
    },
    // 搜索表单中的重置按钮
    vNodeButtonSearchFormResetInForm () {
      const node =
        <q7-button
          icon="el-icon-refresh"
          label="重置"
          on-click={ () => this.searchFormReset() }
          plain
          thin/>
      return node
    },
    // 顶栏始终显示的搜索按钮
    vNodeButtonSearch () {
      const node =
        <q7-button
          icon="el-icon-refresh"
          label="刷新"
          loading={ this.isSearchButtonLoading }
          on-click={ () => this.research() }/>
      return node
    },
    // 列过滤触发按钮
    vNodeButtonTableColumnsFilterTrigger () {
      const node =
        <q7-button
          icon="el-icon-setting"
          label="设置列"
          on-click={ () => this.tableColumnsFilterStart() }/>
      return node
    },
    // 表格列设置
    vNodeTableColumnsFilter () {
      const node =
        <hy-table-columns-filter
          ref="hy-table-columns-filter"
          { ...{ attrs: this.columnsFilter } }
          vModel={ this.table.columns }/>
      return node
    },
    // 批量删除按钮
    vNodeButtonDelete () {
      const node =
        <q7-button
          type="danger"
          icon="el-icon-delete"
          label="删除"
          disabled={ !this.multipleSelection || this.multipleSelection.length === 0 }
          on-click={ () => this.batchDelete() } />
      return node
    },
    // 新建按钮
    vNodeButtonCreate () {
      const node =
        <q7-button
          type="primary"
          icon="el-icon-plus"
          label={ this.vNodeButtonCreateLabel }
          on-click={ () => this.create() } />
      return node
    },
    // 新建按钮 { parent_id: 0 }
    vNodeButtonCreateWithParentId0 () {
      const node =
        <q7-button
          type="primary"
          icon="el-icon-plus"
          label="新建"
          on-click={ () => this.create({ parent_id: 0 }) }/>
      return node
    },
    // 新建按钮
    vNodeSearchPanelAlertNoPermissionQuery () {
      const node =
        <el-alert
          title="无查询权限 请联系管理员"
          type="error"
          closable={ false }
          style={
            {
              padding: '5px 20px'
            }
          }
          center/>
      return node
    },
    // 表格列
    // 建议的书写顺序 [prop] -> [label] -> [align] -> [minWidth][width] -> [fixed] -> [other] -> [render][formatter] -> [if][show]
    settingColumns () {
      return []
    },
    // 表格操作列配置
    settingActionsConfig () {
      return () => []
    },
    // 表格操作列
    // 建议的书写顺序 [prop] -> [label] -> [align] -> [minWidth][width] -> [fixed] -> [other] -> [render][formatter] -> [if][show]
    settingActions () {
      const config = this.settingActionsConfig
      // 赋值假数据 获得基本的设置信息
      const configStatic = config({ row: {}, column: {}, $index: 0 })
      // 如果设置项数量是 0 就不显示操作列
      if (configStatic.length === 0) return []

      // // 宽度额外余量
      const extra = 10
      const width = configStatic.length > 0 ? configStatic.reduce((result, item) => {
        if (item.icon) result += 12
        if (item.label) result += item.label.length * 12
        if (item.icon && item.label) result += 12
        result += 18
        return result
      }, extra + 20 + 4 + 12) : 0

      // 返回计算完成的操作列
      return [
        {
          label: '操作',
          align: 'left',
          minWidth: configStatic[0].width || width + 'px',
          fixed: 'right',
          render: scope => <q7-table-actions actions={ config(scope) }/>
        }
      ]
    },
    // 表格搜索条件
    // 建议的书写顺序 [prop] -> [label] -> [default] -> [render] -> [if][show]
    settingSearch () {
      return []
    },
    // 表单设置
    // 过滤掉不显示的字段
    settingSearchFilteredShow () {
      return this.settingSearch.filter(item => item.show !== false)
    },
    // 搜索按钮 loading 状态
    // 正在加载原始数据 || 正在加载字典
    isSearchButtonLoading () {
      return this.status.isLoadingData || this.status.isLoadingDict
    },
    // 表格 loading 状态
    // 正在加载原始数据 || 正在加载字典
    isTableLoading () {
      return this.status.isLoadingData || this.status.isLoadingDict
    },
    // 搜索时发送的数据
    // 自动整合 [搜索项] [分页设置] [排序]
    searchData () {
      const obj = this.search.form.model
      let _newPar = {}
      for (var key in obj) {
          if ((obj[key] === 0 || obj[key] === false || obj[key]) && obj[key].toString().replace(/(^\s*)|(\s*$)/g, '') !== '') {
              _newPar[key] = obj[key];
          }
      }
      delete _newPar.time
      return {
        ..._newPar,
        ...this.paginationSearchData || {},
        // order_column_name: this.sort.prop,
        // order_type: this.sort.type
      }
    }
  },
  watch: {
    settingColumns: 'initTableColumns',
    settingActions: 'initTableColumns'
  },
  async created () {
    this.initSearchForm()
    this.initTableColumns()
    this.research()
  },
  methods: {
    /**
     * @description 搜索方法 这个方法可以在外部自定义
     * @returns 数据
     */
    searchMethod () {
      const method = this.$q7.api[this.api.index]
      if (!this._.isFunction(method)) {
        this.$message.error('未找到 API')
        return Promise.reject(new Error('未找到 API'))
      }
      return method(this.searchData)
    },
    /**
     * @description 加载数据
     */
    async research () {
      try {
        // 表格显示无需等待字典加载完成 所以这里不需要 await
        this.doLoadDict(this.loadDict)
        const result = await this.doLoadData(this.searchMethod)
        if (this._.isArray(result)) {
          this.table.data = result
        } else if (this._.isObject(result) && this._.isArray(result.list) && this._.isObject(result.page)) {
          const { list, page } = result
          this.paginationUpdate(page)
          this.table.data = list
        } else {
          this.table.data = []
        }
      } catch (error) {
        console.log(error)
      }
    },
    /**
     * @description 新建
     * @param {Object} data 新建时默认数据
     * @param {String} ref 表单组件的 ref
     */
    create (data = {}, ref = 'form') {
      this.$refs[ref].create(data)
    },
    /**
     * @description 编辑
     * @param {Number} id 编辑行的 id
     * @param {String} ref 表单组件的 ref
     */
    edit (id, ref = 'form') {
      this.$refs[ref].edit(id)
    },
    customEdit (row, ref = 'form') {
      this.$refs[ref].customEdit(row)
    },
    other (data = {}, ref = 'form') {
      this.$refs[ref].other(data)
    },
    /**
     * @description 删除
     * @param {Number} id 删除行的 id
     */
    delete (id) {
      const deleteFunction = this.$q7.api[this.api.delete]
      if (!this._.isFunction(deleteFunction)) {
        this.$message.error('未找到 API')
        return
      }
      deleteFunction(id)
        .then(() => {
          this.$message.success('删除成功')
          this.research()
        })
        .catch(() => {})
    },
    // 批量删除
    batchDelete () {
      if (this.multipleSelection === null || this.multipleSelection.length === 0) {
        this.$message({
          message: '您还未选择数据',
          type: 'warning'
        })
        return
      }
      
      const ids = []
      let rowKey = this.table.columns[0].prop
      for (const row of this.multipleSelection) {
        ids.push(row[rowKey])
      }
      return this.$confirm(`确定要批量删除这 ${ ids.length } 条数据吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.customDelete(ids)
      }).catch((err) => {
        console.log('取消删除', err)
      })
    },
    customDelete(row) {
      const deleteFunction = this.$q7.api[this.api.delete]
      if (!this._.isFunction(deleteFunction)) {
        this.$message.error('未找到 API')
        return
      }
      deleteFunction(row)
        .then(() => {
          this.$message.success('删除成功')
          this.research()
        })
        .catch(() => {})
    },
    onTableSelectionChange (val) {
      this.multipleSelection = val
    },
    /**
     * @description 表格排序变化时触发
     */
    onTableSortChange ({ prop, order }) {
      this.sort.prop = prop
      switch (order) {
        case 'ascending':
          this.sort.type = 'ASC'
          break
        case 'descending':
          this.sort.type = 'DESC'
          break
        default:
          this.sort.type = ''
          break
      }
      this.research()
    },
    /**
     * @description 触发列设置面板显示
     */
    tableColumnsFilterStart () {
      this.$refs['hy-table-columns-filter'].start()
    },
    /**
     * @description init
     * @description 根据 settingSearch 初始化搜索条件
     */
    initSearchForm () {
      const data = {}
      this.settingSearch.forEach(setting => {
        data[setting.prop] = setting.default
      })
      this.$set(this.search.form, 'model', data)
    },
    /**
     * @description 重置搜索表单
     */
    searchFormReset () {
      this.initSearchForm()
      this.paginationReset()
      this.research()
    },
    /**
     * @description init
     * @description 合并 settingColumns 和 settingActions
     * @description 并加上 id
     */
    initTableColumns () {
      const columns = utils.fn.arrayAddUniqueId([
        ...this.settingColumns,
        ...this.settingActions
      ])
      this.table.columns = this._.cloneDeep(columns.filter(e => e.show !== false && e.if !== false))
      this.columnsFilter.options = this._.cloneDeep(columns.filter(e => e.if !== false))
    },
    /**
     * @description 请求表格数据
     * @param {Function} fn 请求函数 需要返回 Promise
     */
    async doLoadData (fn = () => {}) {
      this.status.isLoadingData = true
      try {
        const data = await fn()
        this.status.isLoadingData = false
        return Promise.resolve(data)
      } catch (error) {
        this.status.isLoadingData = false
        return Promise.reject(error)
      }
    }
  }
}
