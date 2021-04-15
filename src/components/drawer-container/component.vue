<style lang="scss" scoped>
.q7-drawer-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .q7-drawer-container--body {
    padding-left: 20px;
    padding-right: 5px;
    width: auto;
    height: 0;
    flex-shrink: 1;
    flex-grow: 1;
    .q7-drawer-container--body-wrap {
      padding-right: 15px;
    }
  }
  .q7-drawer-container--footer {
    padding: 12px;
    height: auto;
    flex-shrink: 0;
    flex-grow: 0;
    border-top: 1px solid #ddd;
  }
}
</style>

<template>
  <div class="q7-drawer-container">
    <div class="q7-drawer-container--body">
      <hy-scrollbar style="height: 100%">
        <div class="q7-drawer-container--body-wrap">
          <slot></slot>
        </div>
      </hy-scrollbar>
    </div>
    <div class="q7-drawer-container--footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'q7-drawer-container',
}
</script>
