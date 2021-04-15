<template>
  <div class="hy-pro-page-container">
    <hy-multi-tab v-if="multiPage" />
    <div class="hy-pro-page-container-warp">
      <div class="hy-page-header has-breadcrumb has-footer hy-page-header-ghost">
        <el-breadcrumb separator="/">
          <template v-for="item in breadcrumb">
            <el-breadcrumb-item :key="item.path">{{ item.title }}</el-breadcrumb-item>
          </template>
        </el-breadcrumb>
      </div>
    </div>
    <div class="hy-pro-grid-content">
      <slot />
    </div>
  </div>
</template>

<script>
import { Breadcrumb } from 'element-ui'
import { mapState } from 'vuex'
import HyMultiTab from './components/multi-tab'

export default {
  name: 'PageLayout',
  components: {
    HyMultiTab,
  },
  computed: {
    ...mapState('q7admin/setting', ['multiPage']),
    breadcrumb() {
      return this.getRouteBreadcrumb()
    },
  },
  methods: {
    getRouteBreadcrumb() {
      let routes = this.$route.matched
      let breadcrumb = []
      routes.forEach((route) => {
        if (route.path === '/content/detail/:id') {
          const detailDefaultPrefix = { path: '', title: '信息管理' }
          breadcrumb.push(detailDefaultPrefix)
          breadcrumb.push({ path: route.path, title: route.meta.title })
        } else {
          breadcrumb.push({ path: route.path === '' ? '/' : route.path, title: route.meta.title })
        }
      })
      return breadcrumb
    },
  },
}
</script>

<style lang="less">
.page-header {
  margin: 0 -24px 0;
}
.link {
  /*margin-top: 16px;*/
  line-height: 24px;
  a {
    font-size: 14px;
    margin-right: 32px;
    i {
      font-size: 22px;
      margin-right: 8px;
    }
  }
}
.page-content {
  position: relative;
  padding: 24px 0 0;
  &.head.fixed {
    margin: 0 auto;
    max-width: 1400px;
  }
}
</style>
