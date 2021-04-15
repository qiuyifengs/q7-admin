<template>
  <el-card class="hy-detail-list" shadow="never">
    <div slot="header" v-if="title" class="title">
      {{ title }}
    </div>
    <el-row>
      <slot></slot>
    </el-row>
  </el-card>
</template>

<script>
import { Col } from 'element-ui'

const Item = {
  name: 'DetailListItem',
  props: {
    term: {
      type: String,
      required: false,
    },
  },
  inject: {
    col: {
      type: Number,
    },
  },
  methods: {
    renderTerm(h, term) {
      return term
        ? h(
            'div',
            {
              attrs: {
                class: 'term',
              },
            },
            [term]
          )
        : null
    },
    renderContent(h, content) {
      return h(
        'div',
        {
          attrs: {
            class: 'content',
          },
        },
        [content]
      )
    },
  },
  render(h) {
    const term = this.renderTerm(h, this.$props.term)
    const content = this.renderContent(h, this.$slots.default)
    return h(
      Col,
      {
        props: responsive[this.col],
      },
      [term, content]
    )
  },
}

const responsive = {
  1: { xs: 24 },
  2: { xs: 24, sm: 12 },
  3: { xs: 24, sm: 12, md: 8 },
  4: { xs: 24, sm: 12, md: 6 },
}

export default {
  name: 'DetailList',
  Item: Item,
  props: {
    title: {
      type: String,
      required: false,
    },
    col: {
      type: Number,
      required: false,
      default: 3,
    },
    layout: {
      type: String,
      required: false,
      default: 'horizontal',
    },
  },
  provide() {
    return {
      col: this.col > 4 ? 4 : this.col,
    }
  },
}
</script>

<style lang="less">
.hy-detail-list {
  .title {
    font-size: 16px;
    color: #409EFF;
    font-weight: bolder;
  }
  .term {
    color: #999999;
    font-weight: 500;
    white-space: nowrap;
    // display: table-cell;
    min-width: 120px;
    margin-right: 40px;
    &:after {
      content: ':';
      margin: 0 8px 0 2px;
      position: relative;
      top: -0.5px;
    }
  }
  .content {
    width: 100%;
    font-weight: 500;
    color: #333333;
    // display: table-cell;
  }
}
</style>
