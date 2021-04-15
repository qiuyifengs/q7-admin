// 自定义配置，参考 ./default/setting.config.js，需要自定义的属性在这里配置即可
module.exports = {
  layout: 'mix',
  fixedHeader: true,
  multiPage: false,
  animate: {
    disabled: true,
    name: 'fade',
    direction: 'left'
  },
  // 侧边栏默认配置
  menu: {
    asideCollapse: false,
    asideTransition: true
  },
  // 在读取持久化数据失败时默认页面
  page: {
    opened: [
      {
        name: 'index',
        fullPath: '/index',
        meta: {
          title: '首页',
          auth: false
        }
      }
    ]
  },
}
      