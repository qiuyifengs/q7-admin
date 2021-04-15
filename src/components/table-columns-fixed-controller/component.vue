<style lang="scss" scoped>
.hy-table-columns-fixed-controller {
  .q7-button {
    padding: 2px;
    font-size: 14px;
  }
}
</style>

<template>
  <el-button-group size="medium" class="hy-table-columns-fixed-controller">
    <q7-button v-for="option of options" :key="option.icon" :type="value === option.value ? 'primary' : 'default'" size="medium" :icon="option.icon" @click="submit(option.value)" />
  </el-button-group>
</template>

<script>
export default {
  name: 'hy-table-columns-fixed-controller',
  props: {
    value: {
      default: false,
    },
  },
  data() {
    return {
      options: [
        {
          value: 'left',
          icon: 'el-icon-arrow-left',
        },
        {
          value: false,
          icon: 'el-icon-close',
        },
        {
          value: 'right',
          icon: 'el-icon-arrow-right',
        },
      ],
    }
  },
  methods: {
    submit(value) {
      this.$emit('input', value)
      this.$emit('change', value)
    },
  },
}
</script>
