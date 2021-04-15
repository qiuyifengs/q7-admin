<template>
  <header class="hy-layout-header" :class="classObject">
    <div class="hy-pro-global-header hy-pro-global-header-layout-side">
      <!-- <div @click="toggleCollapse" class="trigger text-3xl px-3 inline-blok cursor-pointer" v-if="layout !== 'head'">
        <i class="el-icon-s-unfold text-white text-lg" v-if="asideCollapse" />
        <i class="el-icon-s-fold" v-else />
      </div> -->
      <q7-menu :options="options" mode="horizontal" v-if="layout !== 'side'" :layout="layout" />
      <div class="hy-pro-components-global-header-index-right">
        <!-- <div class="hy-pro-components-global-header-index-action">
          <HeaderLog />
        </div> -->
        <div class="hy-pro-components-global-header-index-action">
          <HeaderFullscreen class="text-white text-2xl" />
        </div>
        <div class="hy-pro-components-global-header-index-action mr-6">
          <HeaderUser :layout="layout" />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import HeaderUser from '../header-user'
import HeaderFullscreen from '../header-fullscreen'
// import HeaderLog from '../header-log'

import { mapGetters } from 'vuex'
export default {
  name: 'AdminHeader',
  props: ['options', 'asideCollapse', 'layout', 'fixedHeader'],
  components: {
    HeaderUser,
    HeaderFullscreen,
    // HeaderLog
  },
  data() {
    return {
      langList: [
        { key: 'CN', name: '简体中文', alias: '简体' },
        { key: 'HK', name: '繁體中文', alias: '繁體' },
        { key: 'US', name: 'English', alias: 'English' },
      ],
    }
  },
  computed: {
    ...mapGetters({
      // 获得登录后的用户信息
      userInfo: 'q7admin//user/user',
    }),
    classObject() {
      return {
        'bg-light': this.layout === 'side',
        'hy-pro-fixed-header': this.fixedHeader || this.layout === 'mix',
      }
    },
  },
  methods: {
    toggleCollapse() {
      this.$emit('toggleCollapse')
    },
    handleCommand(command) {
      switch (command) {
        case 'logout':
          this.$store
            .dispatch('q7admin/user/logout')
            .then(() => {
              this.$router.push('/login')
            })
            .catch((err) => {
              this.$message.error(err)
            })
          break
        default:
          break
      }
    },
  },
}
</script>
