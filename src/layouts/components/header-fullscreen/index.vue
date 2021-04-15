<template>
  <div class="flex items-center">
    <el-tooltip effect="dark" :content="active ? '退出全屏' : '全屏'" placement="bottom">
      <q7-icon-svg @click.native="toggle" :name="active ? 'icon-fullScreen-mini' : 'icon-fullScreen'" />
    </el-tooltip>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('q7admin/fullscreen', ['active']),
  },
  methods: {
    ...mapActions('q7admin/fullscreen', ['toggle']),
  },
}
</script>
