<template>
  <div class="q7-file-uploader">
  <el-upload :class="uploadClass"
             :http-request="httpRequest"
             :show-file-list="false"
             :on-exceed="onExceed"
             :on-remove="handleUploadFileRemove"
             :on-success="handleUploadFileSuccess"
             ref="fileUploader"
             v-bind="_elProps"
  >
    <el-button :size="btnSize" type="primary" v-if="_elProps.listType === 'text' || this._elProps.listType === 'picture'">{{btnName}}</el-button>
    <div class="avatar-item-wrapper" v-else-if="this._elProps.listType === 'picture-card'"> <i class="el-icon-plus avatar-uploader-icon" /></div>
    <template v-else-if="_elProps.listType === 'avatar'">
      <div class="avatar-item-wrapper">
        <div v-if="avatarUrl !== null" class="avatar">
          <img :src="avatarUrl" >
        </div>
        <i class="el-icon-plus avatar-uploader-icon" v-else/>
      </div>
    </template>
  </el-upload>
    <el-dialog :visible.sync="dialogVisible"  v-bind="preview" append-to-body >
      <div style="text-align: center">
        <img  style="max-width: 100%;" :src="dialogImageUrl" alt="">
      </div>
    </el-dialog>
  </div>
</template>

<script>
import lodash from 'lodash'
import AWS from 'aws-sdk'

// 文件上传组件
export default {
  name: 'q7-file-uploader',
  props: {
    btnSize: { default: 'small' },
    btnName: { default: '选择文件' },
    // 可选哪些类型的文件
    accept: {},
    // 值：url<br/>
    // 或 [url1,url2]<br/>
    // 或 {url:'url',md5:'',size:number}<br/>
    // 或 [{url:'url',md5:'',size:number}]<br/>
    // <br/>
    // limit=1 时 input事件返回 {url:'url',md5:'',size:number}<br/>
    // limit>1 时 input事件返回 数组<br/>
    value: {
      type: [String, Array, Object]
    },
    // 内部封装[el-upload](https://element.eleme.cn/#/zh-CN/component/upload)组件的属性参数<br/>
    elProps: {
      type: Object
    },
    // 预览对话框的配置
    preview: {
      type: Object
    },
    // 文件大小限制 <br/>
    // 如果传入{limit,tip(fileSize,limit){vm.$message('可以自定义提示')}}
    sizeLimit: {
      type: Number, Object
    },
    // 上传组件参数，会临时覆盖全局上传配置参数
    uploader: {
      type: Object,
      default () { return {} }
    }
  },

  data () {
    return {
      fileList: [],
      dialogImageUrl: '',
      dialogVisible: false,
    }
  },

  created () {
    this.emitValue = this.value
    this.initValue(this.value)
  },

  watch: {
    value (value) {
      this.$emit('change', value)
      if (this.emitValue === value) {
        return
      }
      this.emitValue = value
      this.initValue(value)
    }
  },

  computed: {
    _elProps () {
      const defaultElProps = this.getDefaultElProps()
      Object.assign(defaultElProps, this.elProps)
      return defaultElProps
    },

    avatarUrl () {
      if (this.fileList.length > 0) {
        const file = this.fileList[0]
        if (file && file.value != null) {
          return file.value
        }
      }
      return null
    },

    uploadClass () {
      if (this._elProps.listType === 'avatar') {
        return 'avatar-uploader'
      } else if (this._elProps.listType === 'picture-card') {
        return 'image-uploader'
      }
      return 'file-uploader'
    }
  },

  methods: {
    getDefaultElProps () {
      return {
        limit: 0,
        listType: 'text',
        showFileList: true,
        action: '',

        onPreview: (file) => {
          if (this._elProps.listType === 'picture-card' || this._elProps.listType === 'picture' || this._elProps.listType === 'avatar') {
            this.dialogImageUrl = file.url
            this.dialogVisible = true
          } else {
            window.open(file.url)
          }
        },

        beforeUpload: (file) => {
          if (this.sizeLimit == null) {
            return true
          }

          let limit = this.sizeLimit
          let showMessage = null

          if (typeof limit === 'number') {
            limit = this.sizeLimit
            showMessage = (fileSize, limit) => {
              if (this.$message) {
                const limitTip = this.computeFileSize(limit)
                const fileSizeTip = this.computeFileSize(file.size)
                this.$message({ message: '文件大小不能超过' + limitTip + '，当前文件大小:' + fileSizeTip, type: 'warning' })
              }
            }
          } else {
            limit = this.sizeLimit.limit
            showMessage = this.sizeLimit.tip
          }

          if (file.size > limit) {
            console.log('文件大小超过限制：', file.size)
            showMessage(file.size, limit)
            return false
          }
        }
      }
    },

    setValue (value) {
      this.initValue(value)
    },

    initValue (value) {
      let fileList = []
      if (value === null) {
        return
      } else if (typeof (value) === 'string') {
        if (value !== '') {
          const fileName = value.substring(value.lastIndexOf('/') + 1)
          fileList = [{ value: `${process.env.VUE_APP_BASE_STATIC_URL}${value}`, name: fileName }]
        }
      } else if (value instanceof Array) {
        if (value.length > 0 && typeof (value[0]) === 'string') {
          const tmp = []
          value.forEach(item => {
            const fileName = item.substring(item.lastIndexOf('/') + 1)
            tmp.push({ value: item, name: fileName })
          })
          fileList = tmp
        } else {
          fileList = value
        }
      } else if (value instanceof Object) {
        fileList = [value]
      }
      this.resetFileList(fileList)
    },

    computeFileSize (fileSize) {
      let sizeTip = fileSize
      if (fileSize > (1024 * 1024 * 1024)) {
        sizeTip = (fileSize / (1024 * 1024 * 1024)).toFixed(2) + 'G'
      } else if (fileSize > (1024 * 1024)) {
        sizeTip = (fileSize / (1024 * 1024)).toFixed(2) + 'M'
      } else {
        sizeTip = Math.round(fileSize / (1024)) + 'K'
      }
      return sizeTip
    },

    resetFileList (fileList) {
      this.$set(this, 'fileList', fileList)
    },

    handleUploadFileSuccess (res, file, fileList) {
      res.size = res.size != null ? res.size : file.size
      res.name = res.name != null ? res.name : file.name
      res.value = this.getReturnValue(res)
      const value = this.returnType === 'object' ? res.url : res.value
      const url = this.buildUrl(value, res)
      file.url = res.url = url
      this.resetFileList(fileList)
      this.$emit('success', res, file)
      const list = []
      for (const item of fileList) {
        if (item.status === 'uploading') {
          console.log('当前文件上传完成，等待剩下的文件全部上传成功后再更新value')
          return
        }
        if (item.response != null && item.response.url != null) {
          list.push({ ...item.response })
        } else {
          list.push(item)
        }
      }
      console.log('handleUploadFileSuccess list', list, res)
      this.emit(res, list)
    },

    handleUploadFileRemove (file, fileList) {
      this.fileList = fileList
      this.emitList(fileList)
    },

    handleUploadeFileError (err, file, fileList) {
      console.error('文件上传失败', err, file, fileList)
      this.$message({ type: 'error', message: '文件上传失败' })
    },

    previewAvatar ($event) {
      $event.stopPropagation()
      this._elProps.onPreview(this.fileList[0])
    },

    removeAvatar ($event) {
      $event.stopPropagation()
      this.resetFileList([])
      this.emit() // 返回undefined，相当于清空已有的值
    },

    emit (value) {
      if (this._elProps.limit === 1) {
        this.emitValue = value
        this.$emit('input', value)
      } 
    },

    emitList (list) {
      if (list) {
        const tmp = []
        list.forEach(item => {
          tmp.push(item.value)
        })
        list = tmp
      }
      this.emitValue = list
      this.$emit('input', list)
    },

    getReturnValue (item) {
      const value = item[this.returnType]
      if (value != null) {
        return value
      }
      return item
    },

    httpRequest (option) {
      let config = this.uploader
      if (config == null) {
        config = {}
      }
      if (!lodash.isEmpty(this._elProps.action)) {
        config.action = this._elProps.action
      }
      if (!lodash.isEmpty(this._elProps.name)) {
        config.name = this._elProps.name
      }
      if (!lodash.isEmpty(this._elProps.data)) {
        config.data = this._elProps.data
      }
      if (!lodash.isEmpty(this._elProps.headers)) {
        config.headers = this._elProps.headers
      }
      if (!lodash.isEmpty(this.custom)) {
        config.custom = this.custom
      }

      this.doUpload(option)
    },

    doUpload (option) {
      console.log(option)
      this.$q7.api.upload_aws_s3().then(token => {
        const config = {
          accessKeyId: token.accessKey,
          secretAccessKey: token.accessSecret,
          apiVersion: `2006-03-01`,
          s3ForcePathStyle: true,
          signatureVersion: 'v2',
        }
        const bucket = new AWS.S3(config)
        console.log(bucket)
        const ext = option.file.name.substring(option.file.name.lastIndexOf('.'))

        const params = {
          Key: `${token.key}${ext}`,
          ContentType: option.file.type,
          Body: option.file,
          ACL: 'public-read',
          Bucket: token.bucketName,
        }
        const req = bucket.putObject(params)
        console.log(req)

        console.log('VUE_APP_UPLOAD', process.env.VUE_APP_UPLOAD)

        req.on('sign', function() {
          req.httpRequest.endpoint = new AWS.Endpoint('http://up1.besmile.me/')
        })

        req.send((err) => {
          if (err) {
            console.log('err', err)
          } else {
            const path = `${token.bucketName}/${token.key}${ext}`
            console.log(`${process.env.VUE_APP_BASE_STATIC_URL}${path}`)
            const value = `${process.env.VUE_APP_BASE_STATIC_URL}${path}`
            
            this.resetFileList([])
            this.emit(path)
            this.fileList.push({ value: value, name: token.key })
          }
        })
      })
    },

    onExceed (files) {
      console.log('文件数量超出限制')

      if (this._elProps.limit === 1) {
        this.clearFiles()
        this.$refs.fileUploader.handleStart(files[0])
        this.$refs.fileUploader.submit()
        return
      }

      this.$message({
        showClose: true,
        message: '已达最大限制数量，请删除一个文件后再上传',
        type: 'warning'
      })
    },

    clearFiles () {
      if (this.$refs.fileUploader != null) {
        this.$refs.fileUploader.clearFiles()
      }
    },

    getFileList () {
      return this.fileList
    }
  }
}
</script>

<style lang="less">
  .q7-file-uploader{
    &.is-disabled{
      .avatar-item-wrapper{
        background-color: #F5F7FA;
        border-color: #E4E7ED;
        color: #C0C4CC;
        cursor: not-allowed
      }
      li{
        cursor: not-allowed
      }
      .el-upload-list__item-actions{
        cursor: not-allowed
      }
    }
    .avatar-uploader{
      display: flex;
      .el-upload{
        width: 100px;
        height: 100px;
        background-color: #fbfdff;
        border: 1px dashed #c0ccda;
        border-radius: 6px;
      }
      .el-upload img{
        max-width: 100px;
        max-height: 100px;
      }
      .el-icon-plus.avatar-uploader-icon {
        vertical-align: top;
        font-size: 28px;
        color: #8c939d;
        line-height: 100px;
      }
    }
    .el-upload--picture-card .el-icon-plus.avatar-uploader-icon {
      vertical-align: top;
      font-size: 28px;
      color: #8c939d;
      line-height: 100px;
    }
    .image-uploader .el-upload-list--picture-card .el-upload-list__item-thumbnail {
      max-width: 100%;
      max-height: 100%;
      width:auto;
      height: auto;
    }
     .el-upload-list--picture .el-upload-list__item-thumbnail {
      max-height: 100%;
      height: auto;
    }
    .image-uploader .el-upload-list--picture-card .el-upload-list__item {
      /*display: flex;*/
      /*justify-content: center;*/
      /*align-items: center;*/
      text-align: center;
      line-height: 125px;
    }
    .image-uploader{
      /*display: flex;flex-wrap: wrap;*/
      .el-upload-list--picture-card .el-upload-list__item-actions{
        line-height: 100px;
      }
      .el-upload-list--picture-card {
        /*display: flex;*/
        /*flex-wrap: wrap;*/
      }
      .el-upload-list__item-status-label{
        line-height: 1;
      }
    }

    .el-upload--picture-card {
      background-color: #fbfdff;
      border: 1px dashed #c0ccda;
      border-radius: 6px;
      box-sizing: border-box;
      width: 100px;
      height: 100px;
      cursor: pointer;
      /*display: flex;*/
      /*justify-content: center;*/
      /*align-items: center;*/
    }
    .el-upload-list--picture-card {
      .el-upload-list__item{
        width: 100px;
        height: 100px;
      }
      .el-progress-circle{
        width: 70px !important;
        height: 70px !important;
      }
      .el-progress{
        width: 70px !important;
        height: 70px !important;
      }
    }
    .avatar-item-wrapper{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      position: relative;
      .avatar{
        display: contents;
      }
    }

    .preview{
      border-radius: 6px;
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      cursor: default;
      text-align: center;
      color: #fff;
      opacity: 0;
      font-size: 20px;
      background-color: rgba(0,0,0,.9);
      -webkit-transition: opacity .3s;
      transition: opacity .3s;
      &:hover{
        opacity: 0.9;
      }
      display: flex;
      justify-content: center;
      align-items: center;
      i{
        margin: 0 7px;
        cursor: pointer;
      }
    }
  }

</style>
