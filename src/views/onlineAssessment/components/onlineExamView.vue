<template>
  <div class="online-exam-view-wrapper">
    <div class="page-header">
      <!-- <el-button type="primary" size="small" @click="goBack">返回</el-button> -->
      <el-button type="primary" size="small" @click="submit">提交</el-button>
      <i class="el-icon-question"></i>
      <span>注意：请确定答卷完成后再进行提交操作，一旦提交，则不可进行修改！</span>
      <strong>{{ onlineExamItem.name }}</strong>
      <span v-if="onlineExamItem.status === 3" style="float: right">{{ `总分：${problemList.total}` }}</span>
    </div>
    <div class="content-wrapper">
      <template v-for="form in problemList">
          <el-form :model="form" size="small" inline label-width="120px" :key="form.serial_number">
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
                      <el-form-item label="解答：">
                        <el-input type="textarea" v-model="form.result" placeholder="请输入答案"/>
                      </el-form-item>
                    </el-col>
                  </template>
                  <template v-else-if="form.type === 1">  
                    <el-col :span="24">
                        <el-radio-group v-model="form.result">
                          <el-form-item style="margin-left: 96px" v-for="val, key in form.option" :key="key">
                            <el-radio :label="key">{{ `${key}. ${val}` }}</el-radio>
                          </el-form-item>
                        </el-radio-group>
                    </el-col>
                  </template>
                  <template v-else>  
                    <el-col :span="24">
                        <el-checkbox-group v-model="form.result">
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
                  <el-col :span="8">
                    <el-form-item label="分值：">
                      <span>{{ `${form.score}分` }}</span>
                      <!-- <el-input v-model.number="form.score" placeholder="请输入内容" readonly></el-input> -->
                    </el-form-item>
                  </el-col>
                  <el-col v-if="onlineExamItem.status === 3" :span="16">
                    <el-form-item label="得分：">
                      <span>{{ `${form.score}分` }}</span>
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
      problemList: [
        {
          serial_number: 1,
          problem: '花儿为什么这样红？',
          type: 1,
          option: {
            'A': '就是这样红。',
            'B': '应该这样红',
            'C': '涂了红药水'
          },
          answer: '',
          score: 5,
          rules: {}
        },
        {
          serial_number: 2,
          problem: '0.26的计数单位是多少？',
          type: 2,
          option: {
            'A': '0.1',
            'B': '0.01',
            'C': '0.001'
          },
          answer: [],
          score: 5
        },
        {
          serial_number: 3,
          problem: '中国在哪个洲？',
          type: 3,
          answer: '亚洲',
          score: 10
        }
      ],
    }
  },
  computed: {
    userInfo() {
      return JSON.parse(Cookies.get('user') || null)
    }
  },
  methods: {
    // 答题提交
    submit () {
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
      onlineExamAnswer(formData).then(res => {
        if (res && res.code === 200) {
          this.$message.success(res.msg)
          this.$emit('goBack')
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
          if (res.data.length) {
            res.data.map(item => {
              item.option = JSON.parse(item.option)
              item.result = item.type === 2 ? [] : ''
            })
            this.problemList = res.data
            console.log(this.problemList)
          }
        }
      })
    }
  },
  created () {
    this.getOnlineExamView()
  }
}
</script>

<style lang="scss" scoped>
.online-exam-view-wrapper {
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
