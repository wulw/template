<template>
  <div class="party-member-import-wrapper">
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
      :on-success="onSuccess">
      <el-button size="small" type="primary">导入</el-button>
      <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
    </el-upload>
  </div>
</template>

<script>
import { importPartyMemberData } from '@/api/org'
import Cookies from 'js-cookie'

export default {
  name: 'partyMemberImport',

  data () {
    return {
      fileList: []
    }
  },
  computed: {
    uploadUrl() {
      return `${process.env.VUE_APP_BASE_API}/PartyBuildingApi/partyOrganizationInfoImport`
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
      if (response && response.code === '200') {
        this.$message.error(response.msg+`${response.data&&response.data.length?response.data[0]:''}`)
        this.$emit('notify')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.party-member-import-wrapper {
  display: inline-block;
  margin: 0 12px;
}
</style>
