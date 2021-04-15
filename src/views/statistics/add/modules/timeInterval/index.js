import search from '@/mixins/curd-search-toolbar'
export default {
  name: 'timeInterval-add',

  mixins: [ search ],

  render () {
    const page =
      <q7-container>
        <q7-card flat bordered class="p-0">
          <q7-toolbar>
            <q7-toolbar-title>时段新增</q7-toolbar-title>
          </q7-toolbar>

          <q7-toolbar>
            { this.vNodeSearchForm }
          </q7-toolbar>

          <q7-separator />

          <q7-chart-timeInterval />
        </q7-card>
      </q7-container>
    return page
  },

  data () {
    return {
      chartData: {
        type: 'map',
        position1:['13:00', 0],
        position2:['14:00', 4180],
        content1:'服务器宕机\n低值：0',
        content2:'宕机导致服务积压，恢复后达峰值\n高值：4108',
        label:{
          textStyle: {
            fill: '#aaaaaa'
          }
        },
        labelFormater: {
          textStyle: {
            fill: '#aaaaaa'
          },
          formatter: function formatter(text) {
            return text.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
          }
        },
        style:{
          text: {
            textAlign: 'left',
            fontSize: 12,
            stroke: 'white',
            lineWidth: 2
          }
        },
        color:['date', ['#d9d9d9', '#1890ff']],
        scale:[{
          dataKey:'time',
          tickCount: 12
        },{
          dataKey:'date',
          type: 'cat'
        }],
        padding:[20, 90, 80, 50],
        sourceData: [{"Time":"2018/8/9 0:00","Count":489},{"Time":"2018/8/9 1:00","Count":389},{"Time":"2018/8/9 2:00","Count":0},{"Time":"2018/8/9 3:00","Count":0},{"Time":"2018/8/9 4:00","Count":0},{"Time":"2018/8/9 5:00","Count":0},{"Time":"2018/8/9 6:00","Count":0},{"Time":"2018/8/9 7:00","Count":0},{"Time":"2018/8/9 8:00","Count":632},{"Time":"2018/8/9 9:00","Count":2250},{"Time":"2018/8/9 10:00","Count":2858},{"Time":"2018/8/9 11:00","Count":3287},{"Time":"2018/8/9 12:00","Count":2899},{"Time":"2018/8/9 13:00","Count":3224},{"Time":"2018/8/9 14:00","Count":3296},{"Time":"2018/8/9 15:00","Count":3458},{"Time":"2018/8/9 16:00","Count":3610},{"Time":"2018/8/9 17:00","Count":3780},{"Time":"2018/8/9 18:00","Count":3654},{"Time":"2018/8/9 19:00","Count":1804},{"Time":"2018/8/9 20:00","Count":1476},{"Time":"2018/8/9 21:00","Count":1209},{"Time":"2018/8/9 22:00","Count":1033},{"Time":"2018/8/9 23:00","Count":785},{"Time":"2018/8/10 0:00","Count":1680},{"Time":"2018/8/10 1:00","Count":672},{"Time":"2018/8/10 2:00","Count":244},{"Time":"2018/8/10 3:00","Count":0},{"Time":"2018/8/10 4:00","Count":0},{"Time":"2018/8/10 5:00","Count":0},{"Time":"2018/8/10 6:00","Count":0},{"Time":"2018/8/10 7:00","Count":198},{"Time":"2018/8/10 8:00","Count":1032},{"Time":"2018/8/10 9:00","Count":2855},{"Time":"2018/8/10 10:00","Count":3390},{"Time":"2018/8/10 11:00","Count":3767},{"Time":"2018/8/10 12:00","Count":3259},{"Time":"2018/8/10 13:00","Count":0},{"Time":"2018/8/10 14:00","Count":4180},{"Time":"2018/8/10 15:00","Count":3850},{"Time":"2018/8/10 16:00","Count":3742},{"Time":"2018/8/10 17:00","Count":3803},{"Time":"2018/8/10 18:00","Count":3624},{"Time":"2018/8/10 19:00","Count":2456},{"Time":"2018/8/10 20:00","Count":2318},{"Time":"2018/8/10 21:00","Count":2217},{"Time":"2018/8/10 22:00","Count":1809},{"Time":"2018/8/10 23:00","Count":1255}]
      }
    }
  },

  computed: {
    settingSearch () {
			return [
        {
					prop: 'time',
					label: '选择日期',
					default: '',
					render: () => <el-date-picker vModel={ this.search.form.model.time } placeholder="请选择日期" value-format="yyyy-MM-dd"type="date" />
				},
				{
					prop: 'terminalType',
					label: '终端类型',
					default: '',
					render: () => <q7-dict-select vModel={ this.search.form.model.terminalType } multiple name="terminalType" custom clearable/>
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
