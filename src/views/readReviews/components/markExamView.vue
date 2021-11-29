<template>
  <div class="mark-exam-view-wrapper">
    <div class="page-header">
      <el-button type="primary" size="small" @click="goBack">返回</el-button>
      <el-button type="primary" size="small" @click="submit">提交</el-button>
      <i class="el-icon-question"></i>
      <span>注意：请确定阅卷完成后再进行提交操作，一旦提交，则不可进行修改！</span>
    </div>
    <div class="content-wrapper">
      <template v-for="(form, index) in answerList">
          <el-form :model="form" size="small" inline label-width="120px" :key="form.serial_number = (index+1)">
            <el-row>
              <el-col :span="8">
                <el-row>
                  <el-col :span="24">
                    <el-form-item :label="`问题${form.serial_number}：`">
                      <el-input v-model="form.problem" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                  <template v-if="form.type === 3">
                    <el-col :span="24">
                      <el-form-item label="答案：">
                        <el-input type="textarea" v-model="form.answer" placeholder="请输入答案"/>
                      </el-form-item>
                    </el-col>
                  </template>
                  <template v-else>  
                    <el-col v-for="(val, key, i) in form.option" :span="24" :key="key">
                      <el-form-item v-if="i < form.count" :label="`${key}.`">
                        <el-input v-model="form.option[key]" placeholder="请输入答案"></el-input>
                      </el-form-item>
                    </el-col>
                  </template>
                </el-row> 
              </el-col>
              <el-col :span="16">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="分值：">
                      <el-input v-model.number="form.score" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="得分：">
                      <el-input-number v-model="form.count" controls-position="right" :min="0" :max="15"></el-input-number>
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

  data () {
    return {
      answerList: [
        {
          serial_number: '1',
          problem: '',
          type: 1,
          count: 2,
          option: {
            'A': '',
            'B': '',
            'C': '',
            'D': '',
            'E': '',
            'F': '',
            'G': '',
            'H': ''
          },
          answer: '',
          score: ''
        },
        {
          serial_number: '2',
          problem: '',
          type: 2,
          count: 2,
          option: {
            'A': '',
            'B': '',
            'C': '',
            'D': '',
            'E': '',
            'F': '',
            'G': '',
            'H': ''
          },
          answer: '',
          score: ''
        },
        {
          serial_number: '3',
          problem: '',
          type: 3,
          count: 2,
          option: {
            'A': '',
            'B': '',
            'C': '',
            'D': '',
            'E': '',
            'F': '',
            'G': '',
            'H': ''
          },
          answer: '',
          score: ''
        }
      ],
    }
  },
  methods: {
    goBack () {
      this.$emit('goBack')
    },
    // 提交
    submit () {
      markExamItemInfo(JSON.stringify(this.answerList)).then(res => {
        if (res && res.code === 200) {
          this.$message.success(res.msg)
        }
      })
    }
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
