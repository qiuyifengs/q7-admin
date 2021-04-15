// import Row from './row'
import { filterEmpty } from '../_util/props-util'
import { cloneElement } from '../_util/vnode'

import Cell from './cell'
const Row = {
  name: 'q7-description-item',
  components: {
    Cell
  },
  props: {
    bordered: {
      type: Boolean,
      default: true
    },
    label: String,
    span: Number,
    component: String,
    key: Number
  },
  render() {
    const { key, component, bordered, span, label, $slots } = this
    if (typeof component === 'string') {
      return (
        <Cell key={`label-${key}`} component={component} bordered={bordered} span={span} label={label}>{this.$slots.default}</Cell>
      )
    }

    return [
      <Cell key={`label-${key}`} component={component[0]} bordered={bordered} span={span} label={label}>{$slots.default}</Cell>,
      <Cell key={`content-${key}`} component={component[1]} bordered={bordered} span={span * 2 - 1} content={label}>{$slots.default}</Cell>
    ]
  }
}

export default {
  name: 'q7-descriptions',
  Item: Row,
  props: {
    title: String,
    extra: String,
    bordered: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: 'default'
    }
  },
  render () {
    const { size, bordered = false, title, extra, $slots } = this
    console.log($slots.default)

    const prefixCls = 'q7-descriptions'

    return (
      <div class={[
        prefixCls,
        {
          [`${prefixCls}-${size}`]: size !== 'default',
          [`${prefixCls}-bordered`]: !!bordered,
        }
      ]}>
        {title && (
          <div class={`${prefixCls}-header`}>
            <div class={`${prefixCls}-title`}>{title}</div>
            <div class={`${prefixCls}-extra`}>{extra}</div>
          </div>
        )}
        <div class={`${prefixCls}-view`}>
          <table>
            <tbody>
              {$slots.default}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}