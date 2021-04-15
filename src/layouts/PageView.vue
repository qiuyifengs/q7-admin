<template>
  <page-layout>
    <PageToggleTransition :disabled="animate.disabled" :animate="animate.name" :direction="animate.direction">
      <router-view ref="page" />
    </PageToggleTransition>
  </page-layout>
</template>

<script>
import PageLayout from './PageLayout'
import { mapState } from 'vuex'

export default {
  name: 'PageView',
  components: { PageLayout },
  computed: {
    ...mapState('q7admin/setting', ['animate']),
  },
}
</script>
