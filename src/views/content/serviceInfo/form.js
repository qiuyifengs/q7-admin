import form from '@/mixins/crud-form'

export default {
  name: 'content-service-audit-form',

	mixins: [form],
	
	data () {
		return {
			api: {
				create: 'witkey_audit',
			},
			dialog: { 
				width: '700px',
			},
		}
  },

  watch: {
    'detail.auditAction': function (val) {
      this.api.create = val === 0 ? 'witkey_audit' : 'witkey_pub'
    }
  },

	computed: {
    title () {
      return this.detail.auditAction === 0 ? '审核不通过' : '下架'
		},
		
		

		setting () {
			return [
				{
					prop: 'reason',
          default: '',
          label: `${ this.detail.auditAction === 0 ? '不通过原因' : '下架原因' }`,
					rule: { required: true, message: '必填', trigger: 'blur' },
					render: () => <el-input vModel={ this.form.model.reason } rows="5" type="textarea" maxlength="100" show-word-limit placeholder="请输入内容" />,
				},
			]
		}
  },
  
	methods: {
		transformSubmitData (data) {
      if (this.detail.auditAction === 0) {
        return { isPass: false, id: data.id, rejectReason: data.reason }
      } else {
        return { isPub: false, id: data.id, disableReason: data.reason }
      }
			
		}
	}
}