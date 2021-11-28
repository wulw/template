<template>
  <div class="learning-column-add-wrapper">
    <div class="title">
      <strong>{{ `文章${!auditFlag ? '维护' : '详情'}` }}</strong>
    </div>
    <el-form ref="addForm" :model="form" :rules="rules" label-width="96px" size="small" :disabled="auditFlag">
      <el-row>
        <el-col :span="12">
          <el-form-item label="文章标题：" prop="title">
            <el-input v-model="form.title" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="类型：" prop="type">
            <el-select v-model="form.type" placeholder="请选择类型" style="width: 100%">
              <el-option v-for="item in articleTypeList" :key="item.valueId" :label="item.valueDesc" :value="item.valueId"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发布人：" prop="user_name">
            <el-input v-model="form.user_name" placeholder="请输入内容"></el-input>
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
        <el-col :span="12">
          <el-form-item label="标题图片：" prop="file_picture">
            <upload-file :accept="'.jpeg,.jpg,.png,.gif'" @uploadSuccess="uploadImgSuccess" />
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
        <el-col v-if="form.type !== 2" :span="24">
          <tinymce-editor ref="editor" v-model="form.text" :disabled="auditFlag"></tinymce-editor>
        </el-col>
        <el-col v-else :span="24">
          <el-form-item label="视频：" prop="file_video">
            <upload-file :accept="'.mp4,.wav'" @uploadSuccess="uploadVideoSuccess" />
          </el-form-item>
        </el-col>
        <el-col v-if="form.file_video.length" :span="24">
          <el-form-item>
            <ol class="video-wrapper">
              <li v-for="(item, index) in form.file_video" :key="index"><video :src="item.path">{{ item.name }}</video></li>
            </ol>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="form-footer">
      <el-button v-if="auditFlag && learningColumnItem.status === 0" type="primary" size="small" @click="auditDialogVisible = true">审 核</el-button>
      <el-button v-else type="primary" size="small" :loading="submitLoading" @click="submit">确 定</el-button>
      <el-button type="default" size="small" @click="cancel">{{ `${learningColumnItem.status !== 0 ? '关 闭' : '取 消'}` }}</el-button>
    </div>
    <audit-form :auditDialogVisible="auditDialogVisible" auditModule="learningColumn" :id="learningColumnItem.id" @close="auditDialogVisible = false" />
  </div>
</template>

<script>
import TinymceEditor from '@/components/tinymce-vue'
import { articleTypeList } from '@/libs/term-mapping'
import { learningColumnAdd, learningColumnModify } from '@/api/learning'
import Cookies from 'js-cookie'

export default {
  name: 'learningColumnAdd',

  props: {
    learningColumnItem: {
      type: Object,
      default: null
    },
    auditFlag: {
      type: Boolean,
      default: false
    }
  },
  components: {
    TinymceEditor,
    UploadFile: () => import('@/components/UploadFile/index.vue'),
    AuditForm: () => import('@/components/AuditForm/auditForm.vue')
  },
  data () {
    return {
      articleTypeList,
      form: {
        title: '',
        type: 1,
        release_time: '',
        user_name: '',
        user_id: '',
        source: '',
        user_department: '',
        file_picture: '',
        file_video: [],
        text: ''
      },
      rules: {
        title: [
          { required: true, message: '文章标题必填', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '类型必填', trigger: 'change' }
        ],
        release_time: [
          { required: true, message: '发布时间必填', trigger: 'blur' }
        ],
        user_name: [
          { required: true, message: '发布人必填', trigger: 'blur' }
        ],
        source: [
          { required: true, message: '来源必填', trigger: 'blur' }
        ],
        user_department: [
          { required: true, message: '单位必填', trigger: 'blur' }
        ],
        file_picture: [
          { required: true, message: '标题图片必填', trigger: 'change' }
        ],
        file_video: [
          { required: true, message: '视频必填', trigger: 'change' }
        ],
        text: [
          { required: true, message: '内容必填', trigger: 'blur' }
        ]
      },
      submitLoading: false,
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
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.submitLoading = true
          if (this.partyActivityItem) {
            learningColumnModify(this.form).then(res => {
              if (res && res.code === 200) {
                this.submitLoading = false
              }
            })
          } else {
            let formData = new FormData()
            for (let key in this.form) {
              if (key === 'file_video') {
                formData.append(key, JSON.stringify(this.form[key]))
              } else {
                formData.append(key, this.form[key])
              }
            }
            learningColumnAdd(formData).then(res => {
              if (res && res.code === 200) {
                this.submitLoading = false
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
    // 标题图片上传成功
    uploadImgSuccess (params) {
      this.form.file_picture = params.path
      params && this.$refs.addForm.clearValidate(['file_picture'])
    },
    uploadVideoSuccess (params) {
      this.form.file_video.push(params)
      params && this.$refs.addForm.clearValidate(['file_video'])
    }
  },
  created() {
    this.form.user_name = this.userInfo.real_name
    this.form.user_id = this.userInfo.id
    if (this.learnColumnItem) {
      this.learnColumnItem.file_video = JSON.parse(this.learnColumnItem.file_video || [])
      this.form = this.learnColumnItem
    }
  }
}
</script>

<style lang="scss" scoped>
.learning-column-add-wrapper {
  .title {
    padding: 0 0 16px;
    border-bottom: 1px solid #c9c9c9;
    margin-bottom: 20px;
  }
  ol.video-wrapper {
    margin: 0;
    padding-left: 16px;
  }
  .form-footer {
    text-align: center;
    margin-top: 16px;
  }
}
</style>
