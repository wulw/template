<template>
  <div class="policy-info-add-wrapper">
    <div class="title">
      <strong>{{ `资讯${!auditFlag ? '维护' : '详情'}` }}</strong>
    </div>
    <el-form ref="addForm" :model="form" :rules="rules" label-width="96px" size="small" :disabled="auditFlag">
      <el-row>
        <el-col :span="12">
          <el-form-item label="文章标题：" prop="title">
            <el-input v-model="form.title" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="资讯类型：" prop="type">
            <el-select v-model="form.type" placeholder="请选择资讯类型" style="width: 100%">
              <el-option v-for="item in informationTypeList" :key="item.valueId" :label="item.valueDesc" :value="item.valueId"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发布人：" prop="user_name">
            <el-input v-model="form.user_name" placeholder="请输入内容" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="来源：" prop="source">
            <el-input v-model="form.source" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发布时间：" prop="release_time">
            <el-date-picker
              style="width: 100%"
              v-model="form.release_time"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="单位：" prop="user_department">
            <el-input v-model="form.user_department" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="标题图片：" prop="file_picture">
            <upload-file :accept="'.jpg,.png,.jpeg,.gif'" @uploadSuccess="uploadSuccess" />
          </el-form-item>
        </el-col>
        <el-col v-if="form.file_picture" :span="24">
          <el-form-item>
            <el-image
              style="width: 100px; height: 100px"
              :src="file_picture_url"
              fit="fill"></el-image>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <tinymce-editor ref="editor" v-model="form.text" :disabled="auditFlag"></tinymce-editor>
        </el-col>
      </el-row>
    </el-form>
    <div class="form-footer">
      <el-button v-if="auditFlag && policyInfoItem.status === 0" type="primary" size="small" @click="auditDialogVisible = true">审 核</el-button>
      <el-button v-else type="primary" size="small" :loading="submitLoading" @click="submit">确 定</el-button>
      <el-button type="default" size="small" @click="cancel">{{ `${policyInfoItem.status !== 0 ? '关 闭' : '取 消'}` }}</el-button>
    </div>
    <audit-form :auditDialogVisible="auditDialogVisible" auditModule="policyInfo" :id="policyInfoItem.id" @close="auditDialogVisible = false" />
  </div>
</template>

<script>
import TinymceEditor from '@/components/tinymce-vue'
import { informationTypeList } from '@/libs/term-mapping'
import { policyInfoAdd, policyInfoModify } from '@/api/policyInfo'
import Cookies from 'js-cookie'
import AuditForm from '@/components/AuditForm/auditForm.vue'

export default {
  name: 'policyInfoAdd',

  components: {
    TinymceEditor,
    UploadFile: () => import('@/components/UploadFile/index.vue'),
    AuditForm
  },
  props: {
    policyInfoItem: {
      type: Object,
      default: null
    },
    auditFlag: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      informationTypeList,
      submitLoading: false,
      form: {
        title: '',
        type: '',
        user_name: '',
        user_id: '',
        source: '',
        release_time: '',
        user_department: '',
        file_picture: '', // 标题图片
        text: '' // 内容
      },
      rules: {
        title: [
          { required: true, message: '文章标题必填', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '资讯类型必填', trigger: 'change' }
        ],
        user_name: [
          { required: true, message: '发布人必填', trigger: 'blur' }
        ],
        source: [
          { required: true, message: '来源必填', trigger: 'blur' }
        ],
        release_time: [
          { required: true, message: '发布时间必填', trigger: 'blur' }
        ],
        user_department: [
          { required: true, message: '单位必填', trigger: 'blur' }
        ],
        file_picture: [
          { required: true, message: '标题图片必填', trigger: 'change' }
        ]
      },
      // disabled: false,
      auditDialogVisible: false
    }
  },
  computed: {
    userInfo() {
      return JSON.parse(Cookies.get('user') || null)
    },
    file_picture_url() {
      if (process.env.NODE_ENV === 'development') {
        return `${process.env.VUE_APP_BASE_API}${this.form.file_picture}`
      } else {
        return `${this.form.file_picture}`
      }
    }
  },
  methods: {
    submit () {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.submitLoading = true
          if (this.policyInfoItem) {
            policyInfoModify(this.form).then(res => {
              if (res && res.code === 200) {
                this.submitLoading = false
                this.$message.success(res.msg)
                this.$emit('notifyRefresh')
                this.cancel()
              }
            })
          } else {
            let formData = new FormData()
            for (let key in this.form) {
              formData.append(key, this.form[key])
            }
            policyInfoAdd(formData).then(res => {
              if (res && res.code === 200) {
                this.submitLoading = false
                this.$message.success(res.msg)
                this.$emit('notifyRefresh')
                this.cancel()
              }
            })
          }
        } else {

        }
      })
    },
    cancel () {
      this.$emit('close')
    },
    uploadSuccess (params) {
      this.form.file_picture = params.path
      params && this.$refs.addForm.clearValidate(['file_picture'])
    }
  },
  created() {
    this.form.user_name = this.userInfo.real_name
    this.form.user_id = this.userInfo.id
    if (this.policyInfoItem) {
      this.form = this.policyInfoItem
    }
  }
}
</script>

<style lang="scss" scoped>
.policy-info-add-wrapper {
  .title {
    padding: 0 0 16px;
    border-bottom: 1px solid #c9c9c9;
    margin-bottom: 20px;
  }
  .form-footer {
    text-align: center;
    margin-top: 16px;
  }
}
</style>
