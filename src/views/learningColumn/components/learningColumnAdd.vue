<template>
  <div class="learning-column-add-wrapper">
    <div class="title">
      <strong>文章维护</strong>
    </div>
    <el-form ref="addForm" :model="form" :rules="rules" label-width="96px" size="small">
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
          <el-form-item label="单位：" prop="place">
            <el-input v-model="form.place" placeholder="请输入内容" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="标题图片：" prop="file_picture">
            <el-upload
              class="upload-demo"
              action=""
              :before-upload="beforeUpload"
              multiple
              :limit="1"
              :show-file-list="false"
              :file-list="form.file_picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col v-if="form.type !== 2" :span="24">
          <tinymce-editor ref="editor" v-model="form.text" :disabled="disabled"></tinymce-editor>
        </el-col>
        <el-col v-else :span="24">
          <el-form-item label="视频：" prop="file_video">
            <el-upload
              class="upload-demo"
              action=""
              :before-upload="beforeUpload"
              multiple
              :limit="1"
              :show-file-list="false"
              :file-list="form.file_video">
              <el-button size="small" type="primary">点击上传</el-button>
              <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
            </el-upload>
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
import { articleTypeList } from '@/libs/term-mapping'
import { learningColumnAdd, learningColumnModify } from '@/api/learning'
import Cookies from 'js-cookie'

export default {
  name: 'learningColumnAdd',

  props: {
    learnColumnItem: {
      type: Object,
      default: null
    }
  },
  components: {
    TinymceEditor
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
        file_picture: [],
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
      submitLoading: false
    }
  },
  computed: {
    userInfo() {
      return JSON.parse(Cookies.get('user') || null)
    }
  },
  methods: {
    submit () {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          let formData = new FormData()
          for (let key in this.form) {
            if (key === 'file_picture') {
              formData.append(key, this.form[key][0])
            } else {
              formData.append(key, this.form[key])
            }
          }
          if (this.partyActivityItem) {
            learningColumnAdd(formData).then(res => {
              if (res && res.code === 200) {

              }
            })
          } else {
            learningColumnModify(formData).then(res => {
              if (res && res.code === 200) {
                
              }
            })
          }
        } else {

        }
      })
    },
    cancel () {
      this.$emit('close')
    }
  },
  created() {
    this.form.user_name = this.userInfo.real_name
    this.form.user_id = this.userInfo.id
    if (this.learnColumnItem) {
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
  .form-footer {
    text-align: center;
    margin-top: 16px;
  }
}
</style>
