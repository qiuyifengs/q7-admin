"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _component = _interopRequireDefault(require("../icon/component.js"));

var _slot = require("../../utils/slot.js");

var _listeners = _interopRequireDefault(require("../../mixins/listeners.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = {
  name: 'q7-avatar',
  mixins: [_listeners["default"]],
  props: {
    fontSize: String,
    color: String,
    textColor: String,
    icon: String,
    square: Boolean,
    rounded: Boolean
  },
  computed: {
    classes: function classes() {
      var _ref;

      return _ref = {}, _defineProperty(_ref, "bg-".concat(this.color), this.color), _defineProperty(_ref, "text-".concat(this.textColor, " q7-chip--colored"), this.textColor), _defineProperty(_ref, 'q7-avatar--square', this.square), _defineProperty(_ref, 'rounded', this.rounded), _ref;
    },
    contentStyle: function contentStyle() {
      if (this.fontSize) {
        return {
          fontSize: this.fontSize
        };
      }
    }
  },
  render: function render(h) {
    var icon = this.icon !== void 0 ? [h(_component["default"], {
      props: {
        name: this.icon
      }
    })] : void 0;
    return h('div', {
      staticClass: 'q7-avatar',
      style: this.sizeStyle,
      "class": this.classes,
      on: _objectSpread({}, this.qListeners)
    }, [h('div', {
      staticClass: 'q7-avatar__content row items-center overflow-hidden',
      style: this.contentStyle
    }, (0, _slot.mergeSlotSafely)(icon, this, 'default'))]);
  }
};
exports["default"] = _default;