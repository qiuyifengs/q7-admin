"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slot = require("../../utils/slot.js");

var _listeners = _interopRequireDefault(require("../../mixins/listeners.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = {
  name: 'q7-badge',
  mixins: [_listeners["default"]],
  props: {
    color: String,
    textColor: String,
    floating: Boolean,
    transparent: Boolean,
    multiLine: Boolean,
    outline: Boolean,
    label: [Number, String],
    align: {
      type: String,
      validator: function validator(v) {
        return ['top', 'middle', 'bottom'].includes(v);
      }
    }
  },
  computed: {
    style: function style() {
      if (this.align !== void 0) {
        return {
          verticalAlign: this.align
        };
      }
    },
    classes: function classes() {
      var text = this.outline === true ? this.color || this.textColor : this.textColor;
      return 'q7-badge flex inline items-center no-wrap' + " q7-badge--".concat(this.multiLine === true ? 'multi' : 'single', "-line") + (this.outline === true ? ' q7-badge--outline' : this.color !== void 0 ? " bg-".concat(this.color) : '') + (text !== void 0 ? " text-".concat(text) : '') + (this.floating === true ? ' q7-badge--floating' : '') + (this.transparent === true ? ' q7-badge--transparent' : '');
    },
    attrs: function attrs() {
      return {
        role: 'alert',
        'aria-label': this.label
      };
    }
  },
  render: function render(h) {
    return h('div', {
      style: this.style,
      "class": this.classes,
      attr: this.attr,
      on: _objectSpread({}, this.q7Listeners)
    }, this.label !== void 0 ? [this.label] : (0, _slot.slot)(this, 'default'));
  }
};
exports["default"] = _default;