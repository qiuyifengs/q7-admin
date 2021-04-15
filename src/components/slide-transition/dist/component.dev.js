"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slot = require("../../utils/slot.js");

var _cache = _interopRequireDefault(require("../../utils/cache.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  name: 'q7-side-transition',
  props: {
    appear: Boolean,
    duration: {
      type: Number,
      "default": 300
    }
  },
  methods: {
    __begin: function __begin(el, height, done) {
      el.style.overflowY = 'hidden';

      if (height !== void 0) {
        el.style.height = "".concat(height, "px");
      }

      el.style.transition = "height ".concat(this.duration, "ms cubic-bezier(.25, .8, .50, 1)");
      this.animating = true;
      this.done = done;
    },
    __end: function __end(el, event) {
      el.style.overflowY = null;
      el.style.height = null;
      el.style.transition = null;

      this.__cleanup();

      event !== this.lastEvent && this.$emit(event);
    },
    __cleanup: function __cleanup() {
      this.done && this.done();
      this.done = null;
      this.animating = false;
      clearTimeout(this.timer);
      clearTimeout(this.timerFallback);
      this.el !== void 0 && this.el.removeEventListener('transitionend', this.animListener);
      this.animListener = null;
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.animating && this.__cleanup();
  },
  render: function render(h) {
    var _this = this;

    return h('transition', {
      props: {
        css: false,
        appear: this.appear
      },
      on: (0, _cache["default"])(this, 'tr', {
        enter: function enter(el, done) {
          var pos = 0;
          _this.el = el;

          if (_this.animating === true) {
            _this.__cleanup();

            pos = el.offsetHeight === el.scrollHeight ? 0 : void 0;
          } else {
            _this.lastEvent = 'hide';
          }

          _this.__begin(el, pos, done);

          _this.timer = setTimeout(function () {
            el.style.height = "".concat(el.scrollHeight, "px");

            _this.animListener = function (ev) {
              if (Object(ev) !== ev || ev.target === el) {
                _this.__end(el, 'show');
              }
            };

            el.addEventListener('transitionend', _this.animListener);
            _this.timerFallback = setTimeout(_this.animListener, _this.duration * 1.1);
          }, 100);
        },
        leave: function leave(el, done) {
          var pos;
          _this.el = el;

          if (_this.animating === true) {
            _this.__cleanup();
          } else {
            _this.lastEvent = 'show';
            pos = el.scrollHeight;
          }

          _this.__begin(el, pos, done);

          _this.timer = setTimeout(function () {
            el.style.height = 0;

            _this.animListener = function (ev) {
              if (Object(ev) !== ev || ev.target === el) {
                _this.__end(el, 'hide');
              }
            };

            el.addEventListener('transitionend', _this.animListener);
            _this.timerFallback = setTimeout(_this.animListener, _this.duration * 1.1);
          }, 100);
        }
      })
    }, (0, _slot.slot)(this, 'default'));
  }
};
exports["default"] = _default;