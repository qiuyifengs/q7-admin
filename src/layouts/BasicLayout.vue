<template>
<!-- <q7-layout>

  <q7-header elevated>
    <q7-toolbar style="z-index: 1">
      <q7-trigger-collapse :layout="layout" :asideCollapse="asideCollapse" @asideCollapseToggle="toggleCollapse">
        <template slot="icon">
          <i class="el-icon-s-unfold" v-if="asideCollapse" />
          <i class="el-icon-s-fold" v-else />
        </template>
      </q7-trigger-collapse>
      <q7-menu 
        :options="layout === 'head' ? menuData : headMenuData" 
        mode="horizontal" 
        v-if="layout !== 'side'" 
        :layout="layout" />
    </q7-toolbar>
  </q7-header>
    
  <q7-drawer
    :showing="asideCollapse"
    bordered>
    <q7-menu 
      :layout="layout" 
      :asideCollapse="asideCollapse" 
      :asideTransition="asideTransition" 
      :options="layout === 'side' || layout === 'mix' ? sideMenuData : menuData" />

    <div class="hy-pro-sider-links">
      
    </div>
  </q7-drawer>

  <q7-page-container>
    <q7-page>
       <slot />
    </q7-page>
  </q7-page-container>

</q7-layout> -->


  <div class="hy-design-pro hy-pro-basicLayout" :class="`hy-layout-${layout} ${layout ? 'dark' : 'light'} ${fixedSideBar ? 'hy-pro-basicLayout-fix-siderbar' : ''}`">
    <section class="hy-layout hy-layout-has-sider min-h-screen">
      <aside
        class="hy-layout-sider beauty-scroll hy-pro-sider hy-pro-sider-layout-side"
        :class="classObject"
        :style="`width: ${sideMenuWidth}; flex: 0 0 ${sideMenuWidth}; min-width: ${sideMenuWidth};max-width: ${sideMenuWidth};`"
      >
        <div class="hy-layout-sider-children">
          <div class="hy-pro-sider-logo text-white" :class="logoClassObject">
            <router-link to="/" class="no-underline">
              <h1 v-if="!asideCollapse">{{ systemName }}</h1>
            </router-link>
          </div>
          <div class="flex-auto overflow-x-hidden overflow-y-auto beauty-scroll">
            <q7-menu :layout="layout" :asideCollapse="asideCollapse" :asideTransition="asideTransition" :options="layout === 'side' || layout === 'mix' ? sideMenuData : menuData" />
          </div>
          <div class="hy-pro-sider-links">
            <q7-trigger-collapse :layout="layout" :asideCollapse="asideCollapse" @asideCollapseToggle="toggleCollapse">
              <template slot="icon">
                <i class="el-icon-s-unfold" v-if="asideCollapse" />
                <i class="el-icon-s-fold" v-else />
              </template>
            </q7-trigger-collapse>
          </div>
        </div>
      </aside>
      
      <div v-if="fixedSideBar" :style="`overflow: hidden; width: ${sideMenuWidth}; flex: 0 0 ${sideMenuWidth}; min-width: ${sideMenuWidth};max-width: ${sideMenuWidth};`" />
      <!-- <el-drawer :visible.sync="drawer" direction="rtl" :with-header="false" size="300px">
        <hy-setting />
      </el-drawer>
      <div class="hy-pro-setting-drawer-handle" @click="toggleDrawer" :style="drawerStyle">
        <i :class="[drawer ? 'el-icon-close' : 'el-icon-setting']" />
      </div> -->
      <section class="hy-layout relative">
        <header class="hy-layout-header" style="background: transparent none repeat scroll 0% 0%" v-if="fixedHeader || layout === 'mix'" />
        <hy-header
          :style="headerStyle"
          :fixedHeader="fixedHeader"
          :options="layout === 'head' ? menuData : headMenuData"
          :layout="layout"
          :asideCollapse="asideCollapse"
          @toggleCollapse="toggleCollapse"
        />
        <main class="hy-layout-content hy-pro-basicLayout-content hy-pro-basicLayout-has-header">
          <slot />
        </main>
      </section>
    </section>
  </div>
</template>

<script>
import HyHeader from './components/header'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  components: {
    HyHeader,
  },
  name: 'BasicLayout',
  data() {
    return {
      drawer: true,
    }
  },
  watch: {
    $route(val) {
      this.setActivated(val)
    },
    layout() {
      this.setActivated(this.$route)
    },
  },
  computed: {
    ...mapState('q7admin/setting', ['layout', 'fixedHeader', 'fixedSideBar', 'asideCollapse', 'asideTransition', 'systemName']),
    ...mapGetters('q7admin/setting', ['firstMenu', 'subMenu', 'menuData']),
    sideMenuWidth() {
      return this.asideCollapse ? '64px' : '210px'
    },
    classObject() {
      return {
        'hy-layout-sider-collapsed': !this.asideCollaps,
        'hy-pro-sider-fixed': this.fixedSideBar || this.layout === 'mix',
      }
    },
    logoClassObject() {
      return {
        'px-6 justify-start': !this.asideCollapse,
        'justify-center': this.asideCollapse,
      }
    },
    headerStyle() {
      let width = this.fixedHeader ? `calc(100% - ${this.sideMenuWidth})` : '100%'
      // let position = this.fixedHeader ? 'fixed' : 'static'
      return `width: ${width}; right: 0; padding: 0; height: 48px; line-height: 48px; z-index: 2000;`
    },
    drawerStyle() {
      const pos = this.drawer ? 'right: 300px' : 'right: 0'
      return `${pos}; transition: all .28s`
    },
    headMenuData() {
      const { layout, menuData, firstMenu } = this
      return layout === 'mix' ? firstMenu : menuData
    },
    sideMenuData() {
      const { layout, menuData, subMenu } = this
      return layout === 'mix' ? subMenu : menuData
    },
  },
  created() {
    this.setActivated(this.$route)
  },
  methods: {
    ...mapActions('q7admin/setting', ['asideCollapseToggle', 'asideCollapseLoad']),
    ...mapMutations('q7admin/setting', ['setActivatedFirst']),
    toggleCollapse() {
      this.asideCollapseToggle()
    },
    setActivated(route) {
      if (this.layout === 'mix') {
        let matched = route.matched
        matched = matched.slice(0, matched.length - 1)
        const { firstMenu } = this
        for (let menu of firstMenu) {
          if (matched.findIndex((item) => item.path === menu.fullPath) !== -1) {
            this.setActivatedFirst(menu.fullPath)
            break
          }
        }
      }
    },
    toggleDrawer() {
      this.drawer = !this.drawer
    },
  },
}
</script>
<style scoped>
.logo-h-32 {
  height: 32px;
}

.hy-pro-sider-links {
  border-top: 1px solid #e2e8f059;
}

.hy-pro-setting-drawer-handle {
  position: fixed;
  top: 240px;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  font-size: 24px;
  background-color: #1890ff;
  color: white;
  border-radius: 4px 0 0 4px;
  cursor: pointer;
  pointer-events: auto;
  z-index: 9999;
}
</style>
