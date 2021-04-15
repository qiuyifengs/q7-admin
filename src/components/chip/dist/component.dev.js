"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _component = _interopRequireDefault(require("../icon/component.js"));

var _slot = require("../../utils/slot.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = {
  name: 'q7-chip',
  props: {
    dense: Boolean,
    icon: String,
    iconRight: String,
    label: [String, Number],
    color: String,
    textColor: String,
    value: {
      type: Boolean,
      "default": true
    },
    square: Boolean,
    outline: Boolean,
    tabindex: [String, Number],
    disable: Boolean
  },
  computed: {
    classes: function classes() {
      var _ref;

      var text = this.outline === true ? this.color || this.textColor : this.textColor;
      return _ref = {}, _defineProperty(_ref, "bg-".concat(this.color), this.outline === false && this.color !== void 0), _defineProperty(_ref, "text-".concat(text, " q7-chip--colored"), text), _defineProperty(_ref, "disabled", this.disable), _defineProperty(_ref, 'q7-chip--dense', this.dense), _defineProperty(_ref, 'q7-chip--outline', this.outline), _defineProperty(_ref, 'q7-chip--square', this.square), _ref;
    },
    hasLeftIcon: function hasLeftIcon() {
      return this.icon !== void 0;
    },
    leftIcon: function leftIcon() {
      return this.icon;
    }
  },
  methods: {
    __getContent: function __getContent(h) {
      var child = [];
      this.hasLeftIcon === true && child.push(h(_component["default"], {
        staticClass: 'q7-chip__icon q7-chip__icon--left',
        props: {
          name: this.leftIcon
        }
      }));
      var label = this.label !== void 0 ? [h('div', {
        staticClass: 'ellipsis'
      }, [this.label])] : void 0;
      child.push(h('div', {
        staticClass: 'q7-chip__content col row no-wrap items-center q7-anchor--skip'
      }, (0, _slot.mergeSlotSafely)(label, this, 'default')));
      return child;
    }
  },
  render: function render(h) {
    if (this.value === false) {
      return;
    }

    var data = {
      staticClass: 'q7-chip row inline no-wrap items-center',
      "class": this.classes,
      style: this.sizeStyle
    };
    return h('div', data, this.__getContent(h));
  }
};
exports["default"] = _default;