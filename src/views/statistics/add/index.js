export default {
  name: 'statistics-add',

  components: {
    timeIntervalChart: () => import('./modules/timeInterval'),
    trendChart: () => import('./modules/trend'),
    detailedChart: () => import('./modules/detailed')
  },

  render () {
    const page = 
      <q7-container>
        <timeIntervalChart />
        <trendChart />
        <detailedChart />
      </q7-container>
    return page
  }
}