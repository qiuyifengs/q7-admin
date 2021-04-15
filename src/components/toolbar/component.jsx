export default {
  name: 'q7-toolbar',
  props: {
    inset: Boolean
  },
  render() {
    const { inset, $slots } = this
    const staticClass = 'q7-toolbar flex flex-no-wrap items-center'
    return (
      <div class={ `${ staticClass } ${ this.inset ? 'q7-toolbar--inset' : '' }` }>{ $slots.default }</div>
    )
  }
}