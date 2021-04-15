import utils from '@/utils'
import table from '@/mixins/crud-table'

export default {
	name: 'content-serviceInfo',

	mixins: [table],

	components: {
    componentForm: () => import('./form'),
  },
	
	render () {
		const page =
			<q7-container>
				<div class="bg-white px-12">
					{ this.vNodeSearchForm }
					{ this.vNodeTableColumnsFilter }
				</div>
				<q7-card flat bordered>
					{ this.vNodeTable }
					<div class="text-right my-4">{ this.vNodePaginationFull }</div>
				</q7-card>

				<component-form ref="form" on-success={ this.research } />
			</q7-container>
		return page
	},

	computed: {
		settingColumns () {
			return [
				{ prop: 'id', label: '信息ID', width: 65, align: 'center' },
				{
					prop: 'name', label: '信息标题', minWidth: 180, align: 'center',
					render: ({ row }) => <el-link type="primary" class="q7-multi-ellipsis--l2 inline-block" on-click={ () => this.handleDetail(row.id) }>
						{ row.name }
					</el-link>
				},
				{ prop: 'nickName', label: '用户昵称', minWidth: 120, align: 'center' },
				{
					prop: 'phone', label: '账号', minWidth: 130, align: 'center',
					render: ({ row }) => <div>{ row.user ? row.user.account : '-' }</div>
				},
				{
					prop: 'certType', label: '发布用户类型', minWidth: 100, align: 'center',
					formatter: row => utils.dict.format('certType', row.certType)
				},
				{
					prop: 'address', label: '所在地', minWidth: 130, align: 'center',
					render: ({ row }) => <div class="q7-multi-ellipsis--l2">{ row.address }{ row.address2 }</div>
				},
				{ prop: 'industryName', label: '行业', minWidth: 100, align: 'center', },
				{
					prop: 'serve', label: '服务', minWidth: 200, align: 'center',
					render: ({ row }) => <div class="q7-multi-ellipsis--l2">{ row.serve && row.serve.join('、')}</div>
				},
				{
					prop: 'createdAt', label: '发布日期', minWidth: 150, align: 'center',
					formatter: row => utils.time.format(row.createdAt),
				},
				{
					prop: 'payPrice', label: '价格', minWidth: 100, align: 'center',
					render: ({ row }) => <div>¥ { row.payPrice ? row.payPrice : '-' }</div>
				},
				{ 
					prop: 'payOfUnit', label: '价格单位', minWidth: 80, align: 'center',
					render: ({ row }) => <div>{ row.payOfUnit ? row.payOfUnit : '-' }</div>
				},
				{
					prop: 'isEnabled', label: '上架状态', minWidth: 80, align: 'center',
					formatter: row => utils.dict.format('isEnabled', row.examStatus === 'AUDIT' ? '' : row.isEnabled ? 1 : 0)
				},
				{
					prop: 'examStatus', label: '审核状态', minWidth: 100, align: 'center',
					formatter: row => <div class={ row.examStatus === 'AUDIT' ? 'danger' : row.examStatus === 'ADOPTION' ? 'success' : 'info' }>
						{utils.dict.format('examStatus', row.examStatus)}</div>
				}
			]
		},

		settingActionsConfig () {
			return ({ row }) => [
				{ icon: 'el-icon-view', action: () => this.handleDetail(row.id) },
				{
					label: '审核通过',
					type: 'success',
					confirm: `确定操作 "${ row.name }" 审核通过?`,
					action: () => this.handleAudit(row, true),
					show: row.examStatus === 'AUDIT'
				},
				{
					label: '审核不通过',
					type: 'danger',
					action: () => this.create(Object.assign(row, { auditAction: 0})),
					show: row.examStatus === 'AUDIT'
				},
				{
					label: '下架',
					type: 'danger',
					action: () => this.create(Object.assign(row, { auditAction: 1})),
					show: row.examStatus === 'ADOPTION' && row.isEnabled
				}
			]
		},

		settingSearch () {
			return [
				{
					prop: 'witkeyId',
					label: '信息ID',
					default: '',
					render: () => <el-input vModel={ this.search.form.model.witkeyId } style="width: 120px" placeholder="请输入ID" clearable/>
				},
				{
					prop: 'name',
					label: '信息标题',
					default: '',
					render: () => <el-input vModel={ this.search.form.model.name } placeholder="请输入信息标题" clearable/>
				},
				{
					prop: 'certType',
					label: '发布用户类型',
					default: '',
					render: () => <q7-dict-select vModel={ this.search.form.model.certType } name="certType" style="width: 100px" custom placeholder="请选择" clearable/>
				},
				{
					prop: 'industryId',
					label: '行业',
					default: '',
					render: () => <q7-dict-select vModel={ this.search.form.model.industryId } all allLabel="全部" allValue="" name="industryOptions" custom style="width: 110px" placeholder="全部" clearable/>
				},
				{
					prop: 'isEnabled',
					label: '上架状态',
					default: '',
					render: () => <q7-dict-select vModel={ this.search.form.model.isEnabled } name="isEnabled" custom style="width: 100px" placeholder="请选择" clearable/>
				},
				{
					prop: 'examStatus',
					label: '审核状态',
					default: '',
					render: () => <q7-dict-select vModel={ this.search.form.model.examStatus } name="examStatus" custom style="width: 110px" placeholder="请选择" clearable/>
				},
				{
					prop: 'time',
					label: '发布时间',
					default: '',
					render: () => <el-date-picker vModel={ this.search.form.model.time } default-time={ ['00:00:00', '23:59:59'] } align="right" value-format="yyyy-MM-dd HH:mm:ss" range-separator="至" start-placeholder="开始日期" start-placeholder="开始日期"
					end-placeholder="结束日期" type="datetimerange" />
				}
			]
		}
	},

	data () {
		return {
			api: {
				index: 'witkey_all'
			},
			isFilterColumn: true
		}
	},
	
	methods: {
		async searchMethod () {
			this.search.form.model.isDeleted = false
			const time = this.search.form.model.time
			if (time) {
				this.search.form.model.startAt = time[0]
        this.search.form.model.endAt = time[1]
			}
			const method = this.$q7.api[this.api.index]
			const dictData = await method(this.searchData)
			return dictData
		},

		handleDetail (id) {
			this.$router.push(`/content/detail/${id}`)
		},

		handleAudit(row) {
			this.$q7.api.witkey_audit({ id: row.id, isPass: true }).then(res => {
				console.log(res)
				this.$message.success('审核成功')
				this.research()
			})
		},

		loadDict () {
			this.loadDictOne({
				name: 'industryOptions',
				method: this.$q7.api.industry_all,
				path: 'list',
				label: 'name'
			})
		}
	}
}
