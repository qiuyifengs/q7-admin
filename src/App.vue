<template>
  <div id="app">
    <router-view />
    <el-backtop :bottom="100">
      <q7-icon-svg name="icon-backup" />
    </el-backtop>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'App',
  mounted() {
    this.setWeekModeTheme(this.weekMode)
  },
  watch: {
    weekMode(val) {
      this.setWeekModeTheme(val)
    },
  },
  computed: {
    ...mapState('q7admin/setting', ['theme', 'weekMode', 'lang']),
  },
  created () {
    console.log(this.$q7)
  },
  methods: {
    ...mapMutations('q7admin/setting', ['setDevice']),
    setWeekModeTheme(weekMode) {
      if (weekMode) {
        document.body.classList.add('week-mode')
      } else {
        document.body.classList.remove('week-mode')
      }
    },
  },
}
</script>

<style lang="less">
@import './style/gloabal.less';
@import './layouts/index.less';
</style>
