"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _checkbox = _interopRequireDefault(require("../../mixins/checkbox.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  name: 'q7-checkbox',
  mixins: [_checkbox["default"]],
  methods: {
    __getInner: function __getInner(h) {
      return [h('div', {
        staticClass: 'q7-checkbox__bg absolute'
      }, [h('svg', {
        staticClass: 'q7-checkbox__svg fit absolute-full',
        attrs: {
          focusable: 'false',
          viewBox: '0 0 24 24',
          'aria-hidden': 'true'
        }
      }, [h('path', {
        staticClass: 'q7-checkbox__truthy',
        attrs: {
          fill: 'none',
          d: 'M1.73,12.91 8.1,19.28 22.79,4.59'
        }
      }), h('path', {
        staticClass: 'q7-checkbox__indet',
        attrs: {
          d: 'M4,14H20V10H4'
        }
      })])])];
    }
  },
  created: function created() {
    this.type = 'checkbox';
  }
};
exports["default"] = _default;