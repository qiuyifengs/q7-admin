<style lang="scss">
.hy-scrollbar {
  .el-scrollbar__wrap {
    overflow: auto;
  }
}
</style>

<template>
  <el-scrollbar
    class="hy-scrollbar"
    ref="scrollbar"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot></slot>
  </el-scrollbar>
</template>

<script>
import { addResizeListener, removeResizeListener } from 'element-ui/src/utils/resize-event'

export default {
  name: 'hy-scrollbar',
  inheritAttrs: false,
  mounted () {
    const scrollbar = this.$refs.scrollbar
    addResizeListener(scrollbar.$el, scrollbar.update)
    this.$once('hook:beforeDestroy', () => {
      removeResizeListener(scrollbar.$el, scrollbar.update)
    })
  }
}
</script>
