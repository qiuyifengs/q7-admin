"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.margins = void 0;

var _listeners = _interopRequireDefault(require("../../mixins/listeners.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var insetMap = {
  "true": 'inset',
  item: 'item-inset',
  'item-thumbnail': 'item-thumbnail-inset'
};
var margins = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24
};
exports.margins = margins;
var _default = {
  name: 'q7-separator',
  mixins: [_listeners["default"]],
  props: {
    spaced: [Boolean, String],
    inset: [Boolean, String],
    vertical: Boolean,
    color: String,
    size: String
  },
  computed: {
    orientation: function orientation() {
      return this.vertical === true ? 'vertical' : 'horizontal';
    },
    classPrefix: function classPrefix() {
      return " q7-separator--".concat(this.orientation);
    },
    insetClass: function insetClass() {
      return this.inset !== false ? "".concat(this.classPrefix, "-").concat(insetMap[this.inset]) : '';
    },
    classes: function classes() {
      return "q7-separator".concat(this.classPrefix).concat(this.insetClass) + (this.color !== void 0 ? " bg-".concat(this.color) : '');
    },
    style: function style() {
      var style = {};

      if (this.size !== void 0) {
        style[this.vertical === true ? 'width' : 'height'] = this.size;
      }

      if (this.spaced !== false) {
        var size = this.spaced === true ? "".concat(margins.md, "px") : this.spaced in margins ? "".concat(margins[this.spaced], "px") : this.spaced;
        var props = this.vertical === true ? ['Left', 'Right'] : ['Top', 'Bottom'];
        style["margin".concat(props[0])] = style["margin".concat(props[1])] = size;
      }

      return style;
    },
    attrs: function attrs() {
      return {
        role: 'separator',
        'aria-orientation': this.orientation
      };
    }
  },
  render: function render(h) {
    return h('hr', {
      staticClass: 'q7-separator',
      "class": this.classes,
      style: this.style,
      attrs: this.attrs,
      on: _objectSpread({}, this.q7Listeners)
    });
  }
};
exports["default"] = _default;