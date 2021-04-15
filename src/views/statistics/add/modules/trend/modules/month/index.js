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

        <v-chart forceFit={ true } height={ this.height } data={ this.data }>
          <v-tooltip />
          <v-axis />
          <v-legend />
          <v-bar position="月份*月均降雨量" color="name" adjust={ this.adjust } />
        </v-chart>
      </q7-container>
    return page
  },

  data () {
    const DataSet = require('@antv/data-set');

    const sourceData = [
      { name: 'London', 'Jan.': 18.9, 'Feb.': 28.8, 'Mar.': 39.3, 'Apr.': 81.4, 'May': 47, 'Jun.': 20.3, 'Jul.': 24, 'Aug.': 35.6 },
      { name: 'Berlin', 'Jan.': 12.4, 'Feb.': 23.2, 'Mar.': 34.5, 'Apr.': 99.7, 'May': 52.6, 'Jun.': 35.5, 'Jul.': 37.4, 'Aug.': 42.4 },
    ];
  
    const dv = new DataSet.View().source(sourceData);
    dv.transform({
      type: 'fold',
      fields: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.'],
      key: '月份',
      value: '月均降雨量',
    });
    const data = dv.rows;

    return {
      api: {},
      data,
      height: 400,
      adjust: [{
        type: 'dodge',
        marginRatio: 1 / 32,
      }],
      value1: '',
      
    }
  },
  computed: {
    settingSearch () {
			return [
        {
					prop: 'year',
					label: '选择年份',
					default: '',
					render: () => <el-date-picker vModel={ this.search.form.model.year } placeholder="请选择年份" value-format="yyyy-MM-dd" type="year" />
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