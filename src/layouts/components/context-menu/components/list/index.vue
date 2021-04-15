<template>
  <div class="hy-contentmenu-list" @click="rowClick">
    <div v-for="item in menulist" :key="item.value" :data-value="item.value" class="hy-contentmenu-item">
      <i v-if="item.icon" :class="item.icon"></i>
      <div class="hy-contentmenu-item-title">
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hy-contextmenu-list',
  props: {
    menulist: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    rowClick(event) {
      let target = event.target
      while (!target.dataset.value) {
        target = target.parentNode
      }
      this.$emit('rowClick', target.dataset.value)
    },
  },
}
</script>

<style lang="scss">
.hy-contentmenu-list {
  .hy-contentmenu-item {
    clear: both;
    margin: 0;
    padding: 5px 12px;
    color: rgba(0, 0, 0, 0.65);
    font-weight: normal;
    font-size: 14px;
    line-height: 22px;
    white-space: nowrap;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      background: #e6f7ff;
    }

    .hy-contentmenu-item-title {
      margin-left: 10px;
    }
  }
}
</style>
