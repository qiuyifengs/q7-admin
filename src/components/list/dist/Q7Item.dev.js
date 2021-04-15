"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slot = require("../../utils/slot.js");

var _listeners = _interopRequireDefault(require("../../mixins/listeners.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  name: 'q7-item',
  mixins: [_listeners["default"]],
  methods: {
    __getContent: function __getContent(h) {
      var child = (0, _slot.uniqueSlot)(this, 'default', []);
      return child;
    }
  },
  render: function render(h) {
    return h('div', {
      staticClass: 'q7-item q7-item-type row no-wrap'
    }, this.__getContent(h));
  }
};
exports["default"] = _default;