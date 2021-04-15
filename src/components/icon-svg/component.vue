<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="icon" />
  </svg>
</template>

<script>
export default {
  name: 'q7-icon-svg',
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  computed: {
    icon() {
      return `#hy-${this.name}`
    },
  },
}
</script>

<style lang="less" scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
