function noEmpty(val) {
  return val !== undefined && val !== null
}

export default {
  functional: true,
  render (h, ctx) {
    const { component, span, bordered, label, content } = ctx.props
    const itemPrefixCls = 'q7-descriptions'
    if (bordered) {
      return (
        <component
          class={[
            {
              [`${itemPrefixCls}-item-label`]: noEmpty(label),
              [`${itemPrefixCls}-item-content`]: noEmpty(content)
            },
          ]} colSpan={span}>
          {noEmpty(label) ? label : content}
        </component>
      )
    }

    return (
      <component class={`${itemPrefixCls}-item`} colSpan={span}>
        {label && (
          <span
            class={[
              `${itemPrefixCls}-item-label`,
            ]}>
            {label}
          </span>
        )}
        {content && <span class={`${itemPrefixCls}-item-content`}>{content}</span>}
      </component>
    )
  }
}