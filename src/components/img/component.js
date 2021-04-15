import { slot } from '../../utils/slot.js'

import RatioMixin from '../../mixins/ratio.js'
import ListenersMixin from '../../mixins/listeners.js'

import Q7Spinner from '../spinner/component.js'

import ImageViewer from './ImageViewer'

let prevOverflow = ''

export default {
  name: 'q7-img',

  mixins: [ ListenersMixin, RatioMixin ],

  components: {
    ImageViewer
  },

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
      default: '50% 50%'
    },

    transition: {
      type: String,
      default: 'fade'
    },

    imgClass: [ Array, String, Object],
    imgStyle: Object,

    noDefaultSpinner: Boolean,
    spinnerColor: String,
    spinnerSize: String, 

    lazy: Boolean,
    previewSrcList: {
      type: Array,
      default: () => []
    },
    zIndex: {
      type: Number,
      default: 2000
    }
  },

  data () {
    return {
      currentSrc: '',
      image: null,
      isLoading: !!this.src,
      hasError: false,
      naturalRatio: void 0,
      show: !this.lazy,
      showViewer: false
    }
  },

  watch: {
    src () {
      this.__load()
    }
  },

  computed: {
    url () {
      return this.currentSrc || this.placeholderSrc || void 0
    },

    attrs () {
      const attr = { role: 'img' }
      if (this.alt !== void 0) {
        attr['aria-label'] = this.alt
      }
      return attr
    },

    imgContainerStyle () {
      return Object.assign(
        {
          backgroundSize: this.contain === true ? 'contain' : 'cover',
          backgroundPosition: this.position
        },
        this.imgStyle,
        { backgroundImage: `url(${this.url})` }
      )
    },

    preview () {
      const { previewSrcList } = this
      return Array.isArray(previewSrcList) && previewSrcList.length > 0
    },

    imageIndex () {
      let previewIndex = 0
      const srcIndex = this.previewSrcList.indexOf(this.src)
      if (srcIndex >= 0) {
        previewIndex = srcIndex
      }
      return previewIndex
    },

    style () {
      return {
        width: this.width,
        height: this.height
      }
    },

    classes () {
      return 'q7-img overflow-hidden'
    }
  },

  methods: {
    clickHandler () {
      console.log(1111)
      if (!this.preview) {
        return
      }

      prevOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      this.showViewer = true
    },

    closeViewer () {
      console.log(2222)
      document.body.style.overflow = prevOverflow
      this.showViewer = false
    },

    __onLoad (img) {
      this.isLoading = false
      this.hasError = false
      this.__computeRatio(img)
      this.__updateSrc()
      this.$emit('load', this.currentSrc)
    },

    __onError (err) {
      clearTimeout(this.ratioTimer)
      this.isLoading = false
      this.hasError = true
      this.currentSrc = ''
      this.$emit('error', err)
    },

    __computeRatio (img) {
      const { naturalHeight, naturalWidth } = img

      if (naturalHeight || naturalWidth) {
        this.naturalRatio = naturalHeight === 0
          ? 1
          : naturalWidth / naturalHeight
      } else {
        this.ratioTimer = setTimeout(() => {
          if (this.image === img && this.destroyed !== true) {
            this.__computeRatio(img)
          }
        })
      }
    },

    __updateSrc () {
      if (this.image !== void 0 && this.isLoading === false) {
        const src = this.image.currentSrc || this.image.src
        if (this.currentSrc !== src) {
          this.currentSrc = src
        }
      }
    },

    __load () {
      clearTimeout(this.ratioTimer)
      this.hasError = false

      if (!this.src) {
        this.isLoading = false
        this.image = void 0
        this.currentSrc = ''
        return
      }

      this.isLoading = true

      const img = new Image()
      this.image = img

      img.onerror = err => {
        // if we are still rendering same image
        if (this.image === img && this.destroyed !== true) {
          this.__onError(err)
        }
      }

      img.onload = () => {
        if (this.destroyed === true) {
          return
        }

        // if we are still rendering same image
        if (this.image === img) {
          if (img.decode !== void 0) {
            img
              .decode()
              .catch(err => {
                if (this.image === img && this.destroyed !== true) {
                  this.__onError(err)
                }
              })
              .then(() => {
                if (this.image === img && this.destroyed !== true) {
                  this.__onLoad(img)
                }
              })
          }
          else {
            this.__onLoad(img)
          }
        }
      }

      img.src = this.src

      Object.assign(img, {
        height: this.height,
        width: this.width
      })
    },

    __getImagePreview () {
      return this.preview && this.showViewer 
        ? <ImageViewer zIndex={ this.zIndex } close={ this.closeViewer } url-list={ this.previewSrcList } />
        : null
    },

    __getImage () {

      const content = this.url !== void 0 
        ? <div key={ this.url }  class={ `q7-img__image absolute-full ${ this.imgClass }` } style={ this.imgContainerStyle } /> 
        : null
      
      return this.basic === true
        ? content
        : <transition { ...{ props: { name: `q7-transition--${this.transition}` } } }>{ content }</transition>

    },

    __getContent () {
      const slotVm = slot(this, this.hasError === true ? 'error' : 'default')

      if (this.basic === true) {
        return <div key='content' class="q7-img__content absolute-full">{ slotVm }</div>
      }

      const content = this.isLoading === true
        ? <div key="placeholder" class="q7-img__loading absolute-full flex justify-center items-center">
          { 
            this.$scopedSlots.loading !== void 0 
              ? this.$scopedSlots.loading()
              : (
                  this.noDefaultSpinner === false
                    ? <Q7Spinner { ...{ props: { color: this.spinnerColor, size: this.spinnerSize }} } />
                    : void 0
                )
          }
          </div>
        : <div key="content" class="q7-img__content absolute-full">{ slotVm }</div>

      return <transition { ...{ props: { name: 'q7-transition--fade' } } }>{ content }</transition>
    }
  },

  render () {

    return <div class={ this.classes } style={ this.style } attrs={ this.attrs }>
      <div style={ this.ratioStyle } on-click={ this.clickHandler }>
        { this.__getImage() }
        { this.__getContent() }
      </div>
      { this.__getImagePreview() }
    </div>

  },

  beforeMount () {
    if (this.placeholderSrc !== void 0 && this.ratio === void 0) {
      const img = new Image()
      img.src = this.placeholderSrc
      this.__computeRatio(img)
    }
    this.isLoading === true && this.__load()
  },

  beforeDestroy () {
    this.destroyed = true
    clearTimeout(this.ratioTimer)
  }
}
