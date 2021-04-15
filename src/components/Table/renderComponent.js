export default {
    functional: true,
    name: 'render-component',
    props: {
        renderFunction: {
            type: Function,
            required: true
        },
        scope: {
            default: null
        },
    },
    render (h, ctx) {
        return ctx.props.renderFunction(h, { row: ctx.props.scope })
    }
}