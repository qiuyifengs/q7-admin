import search from '@/mixins/curd-search-toolbar'

export default {
  name: 'timeInterval-add',

  mixins: [ search ],

  render () {
    const page = 
      <q7-container>
        <q7-toolbar>
          { this.vNodeSearchForm }
        </q7-toolbar>

        <q7-chart-trend />
        
      </q7-container>
    return page
  },

  data () {
    return {
      chartData: {
        type: 'fold',
        fields: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.'],
        key: '月份',
        value: '月均降雨量',
        height: 400,
        sourceData: [
          { name: 'London', 'Jan.': 18.9, 'Feb.': 28.8, 'Mar.': 39.3, 'Apr.': 81.4, 'May': 47, 'Jun.': 20.3, 'Jul.': 24, 'Aug.': 35.6 },
          { name: 'Berlin', 'Jan.': 12.4, 'Feb.': 23.2, 'Mar.': 34.5, 'Apr.': 99.7, 'May': 52.6, 'Jun.': 35.5, 'Jul.': 37.4, 'Aug.': 42.4 },
        ],
      }
    }
  },

  computed: {
    settingSearch () {
			return [
        {
					prop: 'time',
					label: '日期区间',
					default: '',
					render: () => <el-date-picker vModel={ this.search.form.model.time } align="right" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" start-placeholder="开始日期"
					end-placeholder="结束日期" type="daterange" />
				},
				{
					prop: 'terminalType',
					label: '终端类型',
					default: '',
					render: () => <q7-dict-select vModel={ this.search.form.model.terminalType } name="terminalType" custom clearable/>
				},
				{
					prop: 'terminalVersion',
					label: '终端版本',
					default: '',
					render: () => <q7-dict-select vModel={ this.search.form.model.terminalVersion } name="terminalVersion" custom clearable/>
				},
				
			]
    },
  },

  methods: {
    
  }
}