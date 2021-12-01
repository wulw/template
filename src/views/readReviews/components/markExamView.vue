<template>
  <div class="mark-exam-view-wrapper">
    <div class="page-header">
      <el-button type="primary" size="small" @click="goBack">返回</el-button>
      <el-button v-if="markExamItem.status === 1" type="primary" size="small" @click="submit">提交</el-button>
      <i class="el-icon-question"></i>
      <span>注意：请确定阅卷完成后再进行提交操作，一旦提交，则不可进行修改！</span>
      <span style="float: right" v-if="markExamItem.status === 2">{{ `${markExamItem.total_score}分` }}</span>
    </div>
    <div class="content-wrapper">
      <template v-for="(form, index) in answerList">
          <el-form :model="form" size="small" inline label-width="120px" :key="index + 1">
            <el-row>
              <el-col :span="8">
                <el-row>
                  <el-col :span="24">
                    <el-form-item :label="`问题${index + 1}：`">
                      <!-- <el-input v-model="form.problem" placeholder="请输入内容"></el-input> -->
                      <span>{{ form.problem }}</span>
                    </el-form-item>
                  </el-col>
                  <template v-if="form.type === 3">
                    <el-col :span="24">
                      <el-form-item label="答案：">
                        <!-- <el-input type="textarea" v-model="form.answer.answer" placeholder="请输入答案" readonly /> -->
                        <span>{{ form.answer.answer }}</span>
                      </el-form-item>
                    </el-col>
                  </template>
                  <template v-else-if="form.type === 1">  
                    <el-col :span="24">
                        <el-radio-group v-model="form.answer.answer">
                          <el-form-item style="margin-left: 96px" v-for="val, key in form.option" :key="key">
                            <el-radio :label="key">{{ `${key}. ${val}` }}</el-radio>
                          </el-form-item>
                        </el-radio-group>
                    </el-col>
                  </template>
                  <template v-else>  
                    <el-col :span="24">
                        <el-checkbox-group v-model="form.answer.answer">
                          <el-form-item style="margin-left: 96px" v-for="val, key in form.option" :key="key">
                            <el-checkbox :label="key">{{ `${key}. ${val}` }}</el-checkbox>
                          </el-form-item>
                        </el-checkbox-group>
                    </el-col>
                  </template>
                </el-row> 
              </el-col>
              <el-col :span="16">
                <el-row>
                  <el-col :span="6">
                    <el-form-item label="分值：">
                      <!-- <el-input v-model.number="form.score" placeholder="请输入内容"></el-input> -->
                      <span>{{ `${form.score}分` }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="得分：">
                      <el-input-number v-if="form.type === 3" v-model="form.answer.defen" controls-position="right" :min="0" :max="15"></el-input-number>
                      <span v-else>{{ form.answer.defen }}</span>
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
import { markExamItemInfo } from '@/api/rd'

export default {
  name: 'markExamView',

  props: {
    markExamItem: {
      type: Object
    }
  },
  data () {
    return {
      answerList: [],
    }
  },
  methods: {
    goBack () {
      this.$emit('goBack')
    },
    // 提交
    submit () {
      let scoreList = this.answerList.map(item => {
        if (item.type === 3) {
          return {
            id: item.answer.id,
            defen: item.answer.defen
          }
        }
      })
      let formData = new FormData()
      formData.append('info_id', this.markExamItem.id)
      formData.append('fraction', JSON.stringify(scoreList))
      markExamItemInfo(formData).then(res => {
        if (res && res.code === 200) {
          this.$message.success(res.msg)
          this.goBack()
          this.$emit('notifyRefresh')
        }
      })
    }
  },
  created() {
    this.markExamItem.questions.map(item => {
      if (typeof item.option === 'string') {
        item.option = JSON.parse(item.option)
      }
    })
    this.answerList = this.markExamItem.questions
    console.log(this.answerList)
  }
}
</script>

<style lang="scss" scoped>
.mark-exam-view-wrapper {
  padding: 16px;
  .page-header {
    .el-icon-question {
      font-size: 24px;
      vertical-align: middle;
      margin-left: 12px;
    }
    span {
      vertical-align: middle;
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
      }
    }
  }
}
</style>
