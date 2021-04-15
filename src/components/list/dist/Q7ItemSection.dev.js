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
  name: 'q7-item-section',
  mixins: [_listeners["default"]],
  props: {
    avatar: Boolean,
    thumbnail: Boolean,
    side: Boolean,
    top: Boolean,
    nowrap: Boolean
  },
  computed: {
    classes: function classes() {
      var side = this.avatar || this.side || this.thumbnail;
      return _defineProperty({
        'q7-item__section--top': this.top,
        'q7-item__section--avatar': this.avatar,
        'q7-item__section--thumbnail': this.thumbnail,
        'q7-item__section--side': this.side,
        'q7-item__section--nowrap': this.nowrap,
        'q7-item__section--main': !side
      }, "justify-".concat(this.top ? 'start' : 'center'), true);
    }
  },
  render: function render(h) {
    return h('div', {
      staticClass: 'q7-item__section column',
      "class": this.classes,
      on: _objectSpread({}, this.q7Listeners)
    }, (0, _slot.slot)(this, 'default'));
  }
};
exports["default"] = _default;