export default {
  name: 'trend-add',

  components: {
    componentDay: () => import('./modules/day') ,
    componentMonth: () => import('./modules/month')
  },

  render () {
    const page =
      <q7-container>
        <q7-card flat bordered>
          <q7-toolbar>
            <q7-toolbar-title>新增趋势</q7-toolbar-title>
          </q7-toolbar>

          <el-tabs type="border-card" vModel={ this.activeName }>
            { this.tabOptions.map((item, index) => <el-tab-pane name={ item.name } label={ item.label } key={ index } >
              { this.activeName === 'day' ? <component-day /> : <component-month /> }
            </el-tab-pane> ) }
          </el-tabs>

        </q7-card>
      </q7-container>
    return page
  },

  data () {
    return {
      activeName: 'day',
      tabOptions: [
        {
          name: 'day',
          label: '日新增'
        },
        {
          name: 'month',
          label: '月新增'
        }
      ]
    }
  },

  methods: {

  }
}
