"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _listeners = _interopRequireDefault(require("../../mixins/listeners.js"));

var _slot = require("../../utils/slot.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = {
  name: 'q7-card',
  mixins: [_listeners["default"]],
  props: {
    square: Boolean,
    flat: Boolean,
    bordered: Boolean
  },
  computed: {
    classes: function classes() {
      return 'q7-card' + (this.bordered === true ? ' q7-card--bordered' : '') + (this.square === true ? ' q7-card--square no-border-radius' : '') + (this.flat === true ? ' q7-card--flat no-shadow' : '');
    }
  },
  render: function render(h) {
    return h('div', {
      "class": this.classes,
      on: _objectSpread({}, this.q7Listeners)
    }, (0, _slot.slot)(this, 'default'));
  }
};
exports["default"] = _default;