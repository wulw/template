<template>
  <div class="online-exam-view-wrapper">
    <div class="page-header">
      <template v-if="onlineExamItem.status === 1">
        <el-button type="primary" size="small" @click="submit">提交</el-button>
        <i class="el-icon-question"></i>
        <span>注意：请确定答卷完成后再进行提交操作，一旦提交，则不可进行修改！</span>
      </template>
      <el-button v-else type="primary" size="small" @click="goBack">返回</el-button>
      <strong>{{ onlineExamItem.name }}</strong>
      <span v-if="onlineExamItem.status === 3" style="float: right">{{ `总分：${totalScore}分` }}</span>
    </div>
    <div class="content-wrapper">
      <template v-for="form, index in problemList">
          <el-form :ref="`ruleForm_${index}`" :model="form" size="small" inline label-width="120px" :key="form.serial_number">
            <el-row>
              <el-col :span="8">
                <el-row>
                  <el-col :span="24">
                    <el-form-item :label="`问题${form.serial_number}：`">
                      <!-- <el-input v-model="form.problem" placeholder="请输入内容"></el-input> -->
                      <span>{{ form.problem }}</span>
                    </el-form-item>
                  </el-col>
                  <template v-if="form.type === 3">
                    <el-col :span="24">
                      <el-form-item label="解答：" prop="result" :rules="[{ required: true, message: '答案必填', trigger: 'blur' }]">
                        <el-input type="textarea" v-model="form.result" placeholder="请输入答案"/>
                      </el-form-item>
                    </el-col>
                  </template>
                  <template v-else-if="form.type === 1">  
                    <el-col :span="24">
                      <el-form-item prop="result" :rules="[{ required: true, message: '答案必填', trigger: 'change' }]">
                        <el-radio-group v-model="form.result">
                          <el-form-item style="margin-left: 96px" v-for="val, key in form.option" :key="key">
                            <el-radio :label="key">{{ `${key}. ${val}` }}</el-radio>
                          </el-form-item>
                        </el-radio-group>
                      </el-form-item>  
                    </el-col>
                  </template>
                  <template v-else>  
                    <el-col :span="24">
                      <el-form-item prop="result" :rules="[{ required: true, message: '答案必选', trigger: 'change' }]">
                        <el-checkbox-group v-model="form.result">
                          <el-form-item style="margin-left: 96px" v-for="val, key in form.option" :key="key">
                            <el-checkbox :label="key">{{ `${key}. ${val}` }}</el-checkbox>
                          </el-form-item>
                        </el-checkbox-group>
                      </el-form-item>  
                    </el-col>
                  </template>
                </el-row> 
              </el-col>
              <el-col :span="16">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="分值：">
                      <span>{{ `${form.score}分` }}</span>
                      <!-- <el-input v-model.number="form.score" placeholder="请输入内容" readonly></el-input> -->
                    </el-form-item>
                  </el-col>
                  <el-col v-if="onlineExamItem.status === 3" :span="16">
                    <el-form-item label="得分：">
                      <span>{{ `${form.user_answer.defen}分` }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row> 
          </el-form>
        </template>
    </div>
  </div>
</template>

<script>
import { onlineExamView, onlineExamAnswer } from '@/api/oa'
import { formatTime } from '@/libs/utils'
import Cookies from 'js-cookie'

export default {
  name: 'markExamView',

  props: {
    onlineExamItem: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      problemList: [],
      totalScore: 0,
      startTime: 0, // 开始答卷时间
    }
  },
  computed: {
    userInfo() {
      return JSON.parse(Cookies.get('user') || null)
    }
  },
  methods: {
    // 返回
    goBack () {
      this.$emit('goBack')
    },
    // 答题提交
    async submit () {
      let validateList = this.problemList.map((item, index) => {
        console.log(this.$refs['ruleForm_'+index])
        return this.$refs['ruleForm_'+index][0].validate()
      })
      console.log(validateList)
      try {
        await Promise.all(validateList)
      } catch (error) {
        return
      }
      let time = parseInt(((Date.now() - this.startTime)/60000).toFixed())
      console.log(time)
      let answerList = this.problemList.map(item => {
        return {
          questions_id: item.id || item.serial_number,
          answer: item.result
        }
      })
      let formData = new FormData()
      formData.append('answer_user_id', this.userInfo.id)
      formData.append('answer_user_name', this.userInfo.real_name)
      formData.append('completion_time', formatTime(new Date(), '-').date)
      formData.append('item_id', this.onlineExamItem.id)
      formData.append('answer', JSON.stringify(answerList))
      formData.append('answer_time', time)
      onlineExamAnswer(formData).then(res => {
        if (res && res.code === 200) {
          this.$message.success(res.msg)
          this.$emit('goBack')
          this.$emit('notifyRefresh')
        }
      })
    },
    getOnlineExamView () {
      let params = {
        item_id: this.onlineExamItem.id,
        user_id: this.userInfo.id
      }
      onlineExamView(params).then(res => {
        if (res && res.code === 200) {
          if (res.data.length) { // 进入答题
            res.data.map(item => {
              item.option = JSON.parse(item.option)
              item.result = item.type === 2 ? [] : ''
            })
            this.problemList = res.data
            console.log(this.problemList)
          } else if (typeof res.data === 'object') {  // 查看答案
            res.data.questions.map(item => {
              item.option = JSON.parse(item.option)
              item.result = item.user_answer.answer
            })
            this.problemList = res.data.questions
            this.totalScore = res.data.total_score
          }
        }
      })
    }
  },
  created () {
    this.getOnlineExamView()
    this.startTime = Date.now()
  }
}
</script>

<style lang="scss" scoped>
.online-exam-view-wrapper {
  padding: 16px;
  .page-header {
    position: relative;
    .el-icon-question {
      font-size: 24px;
      vertical-align: middle;
      margin-left: 12px;
    }
    strong {
      position: absolute;
      left: 55%;
      top: 8px;
      transform: translateX(-50%);
    }
    span {
      vertical-align: middle;
      margin-top: 8px;
    }
  }
  .content-wrapper {
    border: 1px solid #c9c9c9;
    margin: 16px 0;
    border-radius: 4px;
    padding: 16px;
    .el-form {
      // position: relative;
      margin: 16px 0;
      border-bottom: 1px dashed #c9c9c9;
      ::v-deep.el-form-item {
        width: 100%;
        .el-form-item__content {
          width: calc(100% - 120px);
          .el-input,
          .el-select,
          .el-input-number {
            width: 100%;
          }
        }
        .el-form-item__error {
          margin-left: 120px;
        }
        .el-textarea + .el-form-item__error {
          margin-left: 0;
        }
      }
    }
  }
}
</style>
