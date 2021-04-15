import utils from '@/utils'
import helper from './crud-form-helper'
import status from './crud-status'
import dict from './crud-dict'
import dialog from './crud-form-dialog'

export default {
  mixins: [
    helper,
    status,
    dict,
    dialog
  ],
  inject: {
    search: {
      default: () => ({})
    }
  },
  render () {
    return this.vNodeDialog([
      this.vNodeForm,
      this.vNodeFormSubmit
    ])
  },
  data () {
    return {
      api: {
        detail: '',
        create: '',
        update: '',
        other: ''
      },
      form: {
        size: 'medium',
        initialized: false,
        model: {},
        labelWidth: '110px',
        row: {
          getter: 10
        }
      },
      buttons: {
        cancle: {
          label: '取消',
          plain: true
        },
        submit: {
          label: '保存',
          type: 'primary',
          icon: 'el-icon-check'
        }
      },
      mode: '',
      detail: {}
    }
  },
  computed: {
    // 表单设置
    setting () { return [] },
    // 根据表单设置计算出校验规则
    rulesFromSetting () { return this._.fromPairs(this.setting.filter(item => item.rule).map(item => [item.prop, item.rule])) },
    // 根据表单设置计算出表单默认值
    formFromSetting () { return this._.fromPairs(this.setting.map(item => [item.prop, item.default])) },
    // 根据表单设置和详情计算出表单值
    formFromSettingAndDetail () { return Object.assign({}, this.formFromSetting, this.detail) },
    // 表单是否发生变化
    isFormChanged () { return !utils.helper.isIdenticalObject(this.formFromSettingAndDetail, this.form.model) },
    // vNode 表单
    vNodeForm () {
      /**
       * @description 表单组件
       * @param {Object} item 本表单项目的设置数据
       */
      const formItem = item => {
        const node =
          <el-col { ...{ attrs: item.col } }>
            <el-form-item
              label={ item.label }
              prop={ item.prop }>
              { item.render() }
            </el-form-item>
          </el-col>
        return node
      }
      return <el-form
          ref="form"
          { ...{ attrs: this.form } }
          rules={ this.rulesFromSetting }
          disabled={ this.isFormDisabled }
          v-loading={ this.isFormLoading }>
          <el-row { ...{ attrs: this.form.row } }>
            {
              this.setting
                .filter(item => item.show !== false)
                .map(formItem)
            }
          </el-row>
        </el-form>
    },
    // 提交按钮
    vNodeFormSubmit () {
      const node =
        <el-form label-width={ this.form.labelWidth }>
          <el-form-item>
            <q7-button { ...{ attrs: this.buttons.cancle } } on-click={ this.cancle }/>
            <q7-button { ...{ attrs: this.buttons.submit } } loading={ this.isSubmitButtonLoading } disabled={ this.isSubmitButtonDisabled } on-click={ this.submit }/>
          </el-form-item>
        </el-form>
      return node
    }
  },
  watch: {
    rulesFromSetting: 'clearValidate'
  },
  methods: {
    /**
     * @description 重新计算 model
     * @param {Object} config {Array} pick 需要从旧的表单数据中保留的字段
     * @param {Object} config {Object} data 需要特殊设置的数据
     */
    modelReload ({
      pick = [],
      data = {}
    } = {}) {
      // this.form.model 没有赋值过的时候 要先根据 formFromSetting 初始化
      // 因为 setting 中会有根据 this.form.model.xxx 动态生成的数据
      if (!this.form.initialized) {
        this.$set(this.form, 'model', this.formFromSetting)
        this.form.initialized = true
      }
      // 这时候才保证 formFromSettingAndDetail 是正确的
      const model = Object.assign(
        {},
        this.formFromSettingAndDetail,
        this._.pick(this.form.model, pick),
        data
      )
      this.$set(this.form, 'model', model)
    },
    /**
     * @description 设置 model 的某个属性值
     * @param {String} keyname 属性名称
     * @param {String} value 值
     */
    modelSet (keyname = '', value = '') {
      this.$set(this.form.model, keyname, value)
    },
    
    async edit (id) {
      this.setMode('edit')
      this.open()
      try {
        const result = await Promise.all([
          this.doLoadData(() => (this.$q7.api[this.api.detail] || function () {})(id)),
          this.doLoadDict(this.loadDict)
        ])
        this.detail = result[0]
        this.modelReload()
      } catch (error) {
        console.log(error)
        this.cancle()
      }
    },

    customEdit (row) {
      this.setMode('edit')
      this.open()
      this.detail = row
      this.modelReload()
    },

    async other (data = {}) {
      this.setMode('other')
      this.detail = data
      this.modelReload()
      this.open()
      await this.doLoadDict(this.loadDict)
    },

    async create (data = {}) {
      this.setMode('create')
      this.detail = data
      this.modelReload()
      this.open()
      await this.doLoadDict(this.loadDict)
    },

    /**
     * @description 在提交表单之前可选进行数据处理
     * @param {Object} data 默认的表单数据
     */
    transformSubmitData (data) { return data },
    submit () {
      this.$refs.form.validate(async valid => {
        if (!valid) return
        const data = this.transformSubmitData(this.form.model)
        console.log(data)
        const submit = this.switchByMode(
          () => (this.$q7.api[this.api.create] || Promise.reject)(data),
          () => (this.$q7.api[this.api.update] || Promise.reject)(data),
          () => (this.$q7.api[this.api.other] || Promise.reject)(data)
        )
        try {
          await this.doSubmit(submit)
          this.$message({ message: '提交成功', type: 'success' })
          this.$emit('success')
          this.cancle()
        } catch (error) {
          console.log(error)
        }
      })
    }
  }
}
