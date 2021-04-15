"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _size = require("../../mixins/size.js");

var _listeners = _interopRequireDefault(require("../../mixins/listeners.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  mixins: [_listeners["default"]],
  props: {
    color: String,
    size: {
      type: [Number, String],
      "default": '1em'
    }
  },
  computed: {
    cSize: function cSize() {
      return this.size in _size.sizes ? "".concat(_size.sizes[this.size], "px") : this.size;
    },
    classes: function classes() {
      if (this.color) {
        return "text-".concat(this.color);
      }
    }
  }
};
exports["default"] = _default;