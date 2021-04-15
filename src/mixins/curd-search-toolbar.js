import utils from '@/utils'
import dict from './crud-dict'

export default {
  mixins: [ dict ],

  provide () {
    return {
      search: this.search
    }
  },

  data() {
    return {
      table: {
        data: []
      },
      // 搜索
      search: {
        form: {
          model: {},
          inline: true,
          labelPosition: 'left'
        }
      },
      status: {
        isLoadingData: false,
        isLoadingDict: false
      },
    }
  },
  computed: {
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
          <el-form-item>
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

    // 搜索时发送的数据
    // 自动整合 [搜索项]
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
        ..._newPar
      }
    }
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
        } else {
          this.table.data = []
        }
      } catch (error) {
        console.log(error)
      }
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
      this.research()
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

