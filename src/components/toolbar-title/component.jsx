export default {
  name: 'q7-toolbar-title',
  props: {
    shrink: Boolean
  },
  computed: {
    classes () {
      return 'q7-toolbar__title truncate' +
        (this.shrink === true ? ' col-shrink' : '')
    }
  },
  render() {
    const { classes, $slots } = this
    return (
      <div class={ classes }>{ $slots.default }</div>
    )
  }
}