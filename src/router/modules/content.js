import PageView from '@/layouts/PageView'
import utils from '@/utils'

const meta = { auth: true, cache: true }

export default {
  path: '/content',
  name: 'content',
  component: PageView,
  meta: {
    icon: 'content',
    title: '内容管理'
  },
  children: (pre => [
    { 
      path: `${pre}serviceInfo`, 
      name: 'content-serviceInfo', 
      component: utils.import('content/serviceInfo'), 
      meta: { ...meta, title: '服务信息管理' },
    },
    {
      path: `${pre}detail/:id`, 
      name: 'content-detail', 
      component: utils.import('content/detail'), 
      meta: { ...meta, title: '信息详情', invisible: true }
    },
    { 
      path: `${pre}industry`, 
      name: 'content-industry', 
      component: utils.import('content/industry'), 
      meta: { ...meta, title: '行业管理' }
    },
    { 
      path: `${pre}service`, 
      name: 'content-service', 
      component: utils.import('content/service'), 
      meta: { ...meta, title: '服务管理' }
    },
    // { 
    //   path: `${pre}comment`, 
    //   name: 'content-comment', 
    //   component: utils.import('content/comment'), 
    //   meta: { ...meta, title: '评论管理', icon: 'content-comment' }
    // },
  ])('/content/')
}
