import table from '@/mixins/crud-table'

export default {
  name: 'statistics-dailyLife',

  mixins: [table],
  
  render () {
    const page = 
      <q7-container>
        <div class="text-lg m-8">正在开发中</div>
      </q7-container>
    return page
  },

  computed: {
    settingColumns () {
      return [
      ]
    },

    settingActionsConfig () {
      return () => []
    },

    settingSearch () {
      return []
    }
  },

  data () {
    return {
      api: {
        index: 'certification_all',
        delete: ''
      }
    }
  }
}