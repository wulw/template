<template>
  <div class="party-activity-add-wrapper">
    <div class="title">
      <strong>活动维护</strong>
    </div>
    <el-form ref="addForm" :model="form" :rules="rules" label-width="96px" size="small" :disabled="disabled">
      <el-row>
        <el-col :span="12">
          <el-form-item label="活动标题：" prop="title">
            <el-input v-model="form.title" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="活动类型：" prop="type">
            <el-select v-model="form.type" placeholder="请选择活动类型" style="width: 100%">
              <el-option v-for="item in activityTypeList" :key="item.valueId" :label="item.valueDesc" :value="item.valueId"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="活动时间：" prop="activity_time">
            <el-date-picker
              style="width: 100%"
              v-model="form.activity_time"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="活动地点：" prop="place">
            <el-input v-model="form.place" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="参与人数：" prop="number_people">
            <el-input v-model="form.number_people" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发布人：" prop="user_name">
            <el-input v-model="form.user_name" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="单位：" prop="user_department">
            <el-input v-model="form.user_department" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="标题图片：" prop="file_picture">
            <upload-file :accept="'.png,.jpg,.jpeg,.gif'" @uploadSuccess="uploadImgSuccess" />
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
          <el-form-item label="活动内容：" prop="text">
            <tinymce-editor ref="editor" v-model="form.text" :disabled="disabled"></tinymce-editor>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="附件一：">
            <upload-file :accept="'.txt'" @uploadSuccess="uploadTextSuccess" />
          </el-form-item>
        </el-col>
        <el-col v-if="form.file_text.length" :span="24">
          <el-form-item>
            <ol class="text-wrapper">
              <li v-for="(item, index) in form.file_text" :key="index">
                <a :href="item.path">{{ item.name }}</a>
              </li>
            </ol>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="form-footer">
      <el-button type="primary" size="small" :loading="submitLoading" @click="submit">确 定</el-button>
      <el-button type="default" size="small" @click="cancel">取 消</el-button>
    </div>
  </div>
</template>

<script>
import TinymceEditor from '@/components/tinymce-vue'
import { activityTypeList } from '@/libs/term-mapping'
import { partyActivityAdd, partyActivityModify } from '@/api/activity'
import Cookies from 'js-cookie'

export default {
  name: 'partyActivityAdd',

  props: {
    partyActivityItem: {
      type: Object,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  components: {
    TinymceEditor,
    UploadFile: () => import('@/components/UploadFile/index.vue')
  },
  data () {
    return {
      activityTypeList,
      form: {
        title: '',
        type: '',
        activity_time: '',
        place: '',
        number_people: '',
        user_name: '',
        user_id: '',
        user_department: '',
        file_picture: '',
        text: '',
        file_text: []
      },
      rules: {
        title: [
          { required: true, message: '活动标题必填', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '活动类型必填', trigger: 'change' }
        ],
        activity_time: [
          { required: true, message: '活动时间必填', trigger: 'blur' }
        ],
        place: [
          { required: true, message: '活动地点必填', trigger: 'blur' }
        ],
        number_people: [
          { required: true, message: '参与人数必填', trigger: 'blur' }
        ],
        user_name: [
          { required: true, message: '发布人必填', trigger: 'blur' }
        ],
        user_department: [
          { required: true, message: '单位必填', trigger: 'blur' }
        ],
        file_picture: [
          { required: true, message: '标题图片必填', trigger: 'change' }
        ],
        text: [
          { required: true, message: '活动内容必填', trigger: 'blur' }
        ],
        file_text: [
          { required: true, message: '附件一必填', trigger: 'change' }
        ]
      },
      submitLoading: false
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
            partyActivityModify(this.form).then(res => {
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
              if (key === 'file_text') {
                formData.append(key, JSON.stringify(this.form[key]))
              } else {
                formData.append(key, this.form[key])
              }
            }
            partyActivityAdd(formData).then(res => {
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
    // 图片上传成功
    uploadImgSuccess (params) {
      this.form.file_picture = params.path
      params && this.$refs.addForm.clearValidate(['file_picture'])
    },
    // 附件上传成功
    uploadTextSuccess (params) {
      this.form.file_text.push(params)
      params && this.$refs.addForm.clearValidate(['file_text'])
    }
  },
  created() {
    this.form.user_name = this.userInfo.real_name
    this.form.user_id = this.userInfo.id
    if (this.partyActivityItem) {
      this.partyActivityItem.file_text = JSON.parse(this.partyActivityItem.file_text || [])
      this.form = this.partyActivityItem
    }
  }
}
</script>

<style lang="scss" scoped>
.party-activity-add-wrapper {
  .title {
    padding: 0 0 16px;
    border-bottom: 1px solid #c9c9c9;
    margin-bottom: 20px;
  }
  ol.text-wrapper {
    // list-style: none;
    margin: 0;
    padding-left: 16px;
  }
  .form-footer {
    text-align: center;
    margin-top: 16px;
  }
}
</style>
