<template>
  <div>
    <PageToggleTransition :disabled="animate.disabled" :animate="animate.name" :direction="animate.direction">
      <router-view ref="page" />
    </PageToggleTransition>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'BlankView',
  computed: {
    ...mapState('q7admin/setting', ['animate']),
  },
}
</script>

<style lang="less" scoped>
.extraImg {
  margin-top: -60px;
  text-align: center;
  width: 195px;
  img {
    width: 100%;
  }
}
</style>
