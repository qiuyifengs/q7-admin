"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  functional: true,
  name: 'render-component',
  props: {
    renderFunction: {
      type: Function,
      required: true
    },
    scope: {
      "default": null
    }
  },
  render: function render(h, ctx) {
    return ctx.props.renderFunction(h, {
      row: ctx.props.scope
    });
  }
};
exports["default"] = _default;