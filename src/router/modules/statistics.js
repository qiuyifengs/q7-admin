import PageView from '@/layouts/PageView'
import utils from '@/utils'

const meta = { auth: true, cache: true }

export default {
	path: '/statistics',
	name: 'statistics',
	component: PageView,
	meta: {
		icon: 'statistics',
		title: '数据统计'
	},
	children: (pre => [
		{ 
			path: `${pre}add`, 
			name: 'statistics-add', 
			component: utils.import('statistics/add'), 
			meta: { ...meta, title: '新增明细' }
		},
		{ 
			path: `${pre}dailyLife`, 
			name: 'statistics-dailyLife', 
			component: utils.import('statistics/dailyLife'), 
			meta: { ...meta, title: '活跃明细' } 
    },
    { 
			path: `${pre}retention`, 
			name: 'statistics-retention', 
			component: utils.import('statistics/retention'), 
			meta: { ...meta, title: '留存明细' } 
		}
	])('/statistics/')
}
