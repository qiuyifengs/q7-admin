"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slot = require("../../utils/slot.js");

var _ratio = _interopRequireDefault(require("../../mixins/ratio.js"));

var _listeners = _interopRequireDefault(require("../../mixins/listeners.js"));

var _component = _interopRequireDefault(require("../spinner/component.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = {
  name: 'q7-img',
  mixins: [_listeners["default"], _ratio["default"]],
  props: {
    src: String,
    alt: String,
    width: String,
    height: String,
    placeholderSrc: String,
    basic: Boolean,
    contain: Boolean,
    position: {
      type: String,
      "default": '50% 50%'
    },
    transition: {
      type: String,
      "default": 'fade'
    },
    imgClass: [Array, String, Object],
    imgStyle: Object,
    noDefaultSpinner: Boolean,
    spinnerColor: String,
    spinnerSize: String
  },
  data: function data() {
    return {
      currentSrc: '',
      image: null,
      isLoading: !!this.src,
      hasError: false,
      naturalRatio: void 0
    };
  },
  watch: {
    src: function src(val) {
      this.__load();
    }
  },
  computed: {
    url: function url() {
      return this.currentSrc || this.placeholderSrc || void 0;
    },
    attrs: function attrs() {
      var attr = {
        role: 'img'
      };

      if (this.alt !== void 0) {
        attr['aria-label'] = this.alt;
      }

      return attr;
    },
    imgContainerStyle: function imgContainerStyle() {
      return Object.assign({
        backgroundSize: this.contain === true ? 'contain' : 'cover',
        backgroundPosition: this.position
      }, this.imgStyle, {
        backgroundImage: "url(".concat(this.url, ")")
      });
    },
    style: function style() {
      return {
        width: this.width,
        height: this.height
      };
    },
    classes: function classes() {
      return 'q7-img overflow-hidden';
    }
  },
  methods: {
    __onLoad: function __onLoad(img) {
      this.isLoading = false;
      this.hasError = false;

      this.__computeRatio(img);

      this.__updateSrc();

      this.$emit('load', this.currentSrc);
    },
    __onError: function __onError(err) {
      clearTimeout(this.ratioTimer);
      this.isLoading = false;
      this.hasError = true;
      this.currentSrc = '';
      this.$emit('error', err);
    },
    __computeRatio: function __computeRatio(img) {
      var _this = this;

      var naturalHeight = img.naturalHeight,
          naturalWidth = img.naturalWidth;

      if (naturalHeight || naturalWidth) {
        this.naturalRatio = naturalHeight === 0 ? 1 : naturalWidth / naturalHeight;
      } else {
        this.ratioTimer = setTimeout(function () {
          if (_this.image === img && _this.destroyed !== true) {
            _this.__computeRatio(img);
          }
        });
      }
    },
    __updateSrc: function __updateSrc() {
      if (this.image !== void 0 && this.isLoading === false) {
        var src = this.image.currentSrc || this.image.src;

        if (this.currentSrc !== src) {
          this.currentSrc = src;
        }
      }
    },
    __load: function __load() {
      var _this2 = this;

      clearTimeout(this.ratioTimer);
      this.hasError = false;

      if (!this.src) {
        this.isLoading = false;
        this.image = void 0;
        this.currentSrc = '';
        return;
      }

      this.isLoading = true;
      var img = new Image();
      this.image = img;

      img.onerror = function (err) {
        // if we are still rendering same image
        if (_this2.image === img && _this2.destroyed !== true) {
          _this2.__onError(err);
        }
      };

      img.onload = function () {
        if (_this2.destroyed === true) {
          return;
        } // if we are still rendering same image


        if (_this2.image === img) {
          if (img.decode !== void 0) {
            img.decode()["catch"](function (err) {
              if (_this2.image === img && _this2.destroyed !== true) {
                _this2.__onError(err);
              }
            }).then(function () {
              if (_this2.image === img && _this2.destroyed !== true) {
                _this2.__onLoad(img);
              }
            });
          } else {
            _this2.__onLoad(img);
          }
        }
      };

      img.src = this.src;
      Object.assign(img, {
        height: this.height,
        width: this.width
      });
    },
    __getImage: function __getImage(h) {
      var content = this.url !== void 0 ? h('div', {
        key: this.url,
        staticClass: 'q7-img__image absolute-full',
        "class": this.imgClass,
        style: this.imgContainerStyle
      }) : null;
      return this.basic === true ? content : h('transition', {
        props: {
          name: 'q7-transition--' + this.transition
        }
      }, [content]);
    },
    __getContent: function __getContent(h) {
      var slotVm = (0, _slot.slot)(this, this.hasError === true ? 'error' : 'default');

      if (this.basic === true) {
        return h('div', {
          key: 'content',
          staticClass: 'q7-img__content absolute-full'
        }, slotVm);
      }

      var content = this.isLoading === true ? h('div', {
        key: 'placeholder',
        staticClass: 'q7-img__loading absolute-full flex flex-center'
      }, this.$scopedSlots.loading !== void 0 ? this.$scopedSlots.loading() : this.noDefaultSpinner === false ? [h(_component["default"], {
        props: {
          color: this.spinnerColor,
          size: this.spinnerSize
        }
      })] : void 0) : h('div', {
        key: 'content',
        staticClass: 'q7-img__content absolute-full'
      }, slotVm);
      return h('transition', {
        props: {
          name: 'q7-transition--fade'
        }
      }, [content]);
    }
  },
  render: function render(h) {
    return h('div', {
      "class": this.classes,
      style: this.style,
      attrs: this.attrs,
      on: _objectSpread({}, this.q7Listeners)
    }, [h('div', {
      style: this.ratioStyle
    }), this.__getImage(h), this.__getContent(h)]);
  },
  beforeMount: function beforeMount() {
    if (this.placeholderSrc !== void 0 && this.ratio === void 0) {
      var img = new Image();
      img.src = this.placeholderSrc;

      this.__computeRatio(img);
    }

    this.isLoading === true && this.__load();
  },
  beforeDestroy: function beforeDestroy() {
    this.destroyed = true;
    clearTimeout(this.ratioTimer);
  }
};
exports["default"] = _default;