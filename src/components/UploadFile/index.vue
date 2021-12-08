<template>
  <div class="upload-file-wrapper">
    <el-upload
      class="upload-demo"
      :action="uploadUrl"
      :headers="headers"
      :before-upload="beforeUpload"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      multiple
      :limit="10"
      :on-exceed="handleExceed"
      :show-file-list="false"
      :file-list="fileList"
      :accept="accept"
      :on-success="onSuccess">
      <el-button size="small" type="primary">点击上传</el-button>
      <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
    </el-upload>
  </div>
</template>

<script>
import { importPartyMemberData } from '@/api/org'
import Cookies from 'js-cookie'

let loading = null

export default {
  name: 'partyMemberImport',

  props: {
    accept: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      fileList: []
    }
  },
  computed: {
    uploadUrl() {
      if (process.env.NODE_ENV === 'development') {
        return `${process.env.VUE_APP_BASE_API}/webApi/upload`
      } else {
        return `${process.env.VUE_APP_BASE_API}/webApi/upload`
      }
    },
    headers() {
      return {
        token: Cookies.get('token')
      }
    }
  },
  methods: {
    submit () {
      if (this.fileList.length) {
        let formData = new FormData()
        for (let file of this.fileList) {
          formData.append('file', file)
        }
        console.log(formData)
        importPartyMemberData(formData).then(res => {
          if (res && res.code === 200) {
            this.$message.success('文件上传成功')
            this.cancel()
            this.$emit('notify')
          }
        })
      } else {
        this.$message.info('请上传文件')
      }
    },
    cancel () {
      this.$emit('closeDialog')
    },
    beforeUpload(file) {
      loading = this.$loading({
        lock: true,
        text: '正在上传...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      console.log(file);
      if (file.name.length > 80) {
        this.$message({
          type: 'error',
          message: `${file.name}文件名过长`
        })
        return false
      }
      // const regex = /\.(doc)|\.(docx)(\?.*)?$/i;
      // if (regex.test(file.name)) {
        // 校验文件大小
        if (file.size < 50 * 1024 * 1024) {
          if (file.size === 0) {
            this.$message.closeAll()
            this.$message({
              type: 'info',
              message: '上传文件不能为空'
            })
            return false
          }
          // 校验同名文件
          // if (this.fileList.length > 0) {
          //   for (let i = 0; i < this.fileList.length; i++) {
          //     if (this.fileList[i].name === file.name) {
          //       this.$message({
          //         type: 'error',
          //         message: `${file.name}文件已存在`,
          //         offset: 20 + 40 * i
          //       })
          //       return false
          //     }
          //   }
          // }
        } else {
          this.$message.closeAll()
          this.$message({
            type: 'info',
            message: `${file.name}文件大小不能超过50M`
          })
          return false
        }
        this.fileList = [...this.fileList, file];
      // } else {
      //   this.$message.closeAll()
      //   this.$message({
      //     type: 'error',
      //     message: '文件格式不正确'
      //   })
      // }
      // return false;
    },
    handleRemove(file, fileList) {
      if (file.status === 'success') {
        for (let i = 0; i < this.fileList.length; i++) {
          if (file.name === this.fileList[i].name) {
            this.fileList.splice(i, 1)
          }
        }
      }
    },
    beforeRemove() {},
    handlePreview() {},
    handleExceed(file, fileList) {
      this.$message.info('文件个数限制为10个以内')
    },
    // 文件上传成功
    onSuccess(response, file, fileList) {
      console.log(response, file, fileList)
      if (response && response.code === 200) {
        loading.close()
        this.$message.success(response.msg)
        let params = {
          name: file.name,
          path: response.data.path
        }
        this.$emit('uploadSuccess', params)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-file-wrapper {
  display: inline-block;
}
</style>
