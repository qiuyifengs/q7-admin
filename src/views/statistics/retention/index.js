import utils from '@/utils'
import table from '@/mixins/crud-table'

export default {
  mixins: [table],
  name: 'order-bond',
  render () {
    const page =
      <q7-container>
        <div class="bg-white px-12">
          { this.vNodeSearchForm }
        </div>
        <q7-card>
          { this.vNodeTable }
          <div class="text-right my-4">{ this.vNodePaginationFull }</div>
        </q7-card>
      </q7-container>
    return page
  },
  computed: {
    settingColumns () {
      return [
        { prop: 'id', label: '序号', width: 65, align: 'center' },
        { prop: 'ranking', label: '日期', minWidth: 50, align: 'center' },
        { prop: 'industryName', label: '1日留存', minWidth: 50, align: 'center' },
        { prop: 'industryName', label: '2日留存', minWidth: 50, align: 'center' },
        { prop: 'industryName', label: '3日留存', minWidth: 50, align: 'center' },
        { prop: 'industryName', label: '4日留存', minWidth: 50, align: 'center' },
        { prop: 'industryName', label: '5日留存', minWidth: 50, align: 'center' },
        { prop: 'industryName', label: '6日留存', minWidth: 50, align: 'center' },
        { prop: 'industryName', label: '7日留存', minWidth: 50, align: 'center' },
        { prop: 'industryName', label: '15日留存', minWidth: 50, align: 'center' },
        { prop: 'industryName', label: '30日留存', minWidth: 50, align: 'center' },
      ]
    },
    settingSearch () {
      return [
        {
					prop: 'time',
					label: '日期区间',
					default: '',
					render: () => <el-date-picker vModel={ this.search.form.model.time } align="right" value-format="yyyy-MM-dd HH:mm:ss" range-separator="至" start-placeholder="开始日期" start-placeholder="开始日期"
					end-placeholder="结束日期" type="datetimerange" />
				},
        {
          prop: 'id',
          label: '终端类型',
          default: '',
          render: () => <el-input vModel={ this.search.form.model.id } style="width: 120px" placeholder="请输入ID" clearable/>
        },
        {
          prop: 'industryId',
          label: '终端版本',
          default: '',
          render: () => <q7-dict-select vModel={ this.search.form.model.industryId } name="industryOptions" custom placeholder="请选择" clearable/>
        },
6      ]
    }
  },
  data () {
    return {
      api: {
        index: 'industry_serve_all',
      }
    }
  },
  methods: {
    async searchMethod () {
			const time = this.search.form.model.time
			if (time) {
				this.search.form.model.startAt = time[0]
        this.search.form.model.endAt = time[1]
			}
			const method = this.$q7.api[this.api.index]
			const dictData = await method(this.searchData)
			return dictData
    },
    loadDict () {
      this.loadDictOne({
        name: 'industryOptions',
        method: this.$q7.api.industry_all,
        query: { isDeleted: false },
        path: 'list',
        label: 'name'
      })
    }
	}
}
