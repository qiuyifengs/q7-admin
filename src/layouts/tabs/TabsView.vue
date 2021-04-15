<template>
  <BasicLayout :class="{ grayMode: active }">
    <PageToggleTransition :disabled="animate.disabled" :animate="animate.name" :direction="animate.direction">
      <router-view :key="$route.fullPath" />
    </PageToggleTransition>
  </BasicLayout>
</template>

<script>
import BasicLayout from '@/layouts/BasicLayout'
import { mapState } from 'vuex'

export default {
  name: 'TabsView',
  components: {
    BasicLayout,
  },
  computed: {
    ...mapState('q7admin/setting', ['animate']),
    ...mapState('q7admin/gray', ['active']),
  },
}
</script>
