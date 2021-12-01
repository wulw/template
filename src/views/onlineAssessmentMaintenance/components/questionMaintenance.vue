<template>
  <div class="question-maintenance-wrapper">
    <el-page-header @back="goBack" content="问卷维护"></el-page-header>
    <div class="flex-wrapper">
      <div class="flex-item">
        <p>新增题型选择</p>
        <el-button type="primary" size="small" icon="el-icon-plus" @click="addProblem(1)">单选题</el-button>
        <el-button type="warning" size="small" icon="el-icon-plus" @click="addProblem(2)">多选题</el-button>
        <el-button type="danger" size="small" icon="el-icon-plus" @click="addProblem(3)">问答题</el-button>
      </div>
      <div class="flex-item">
        <template v-for="(form, index) in problemList">
          <el-form ref="ruleForm" :model="form" :rules="rules" size="small" inline label-width="120px" :key="form.serial_number = (index+1)">
            <el-row>
              <el-col :span="8">
                <el-row>
                  <el-col :span="24">
                    <el-form-item :label="`问题${form.serial_number}：`" prop="problem">
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
                    <el-col v-for="(val, key) in form.option" :span="24" :key="key">
                      <el-form-item :label="`${key}.`" prop="option">
                        <el-input v-model="form.option[key]" placeholder="请输入答案"></el-input>
                      </el-form-item>
                    </el-col>
                  </template>
                </el-row> 
              </el-col>
              <el-col :span="16">
                <el-row>
                  <el-col :span="12" v-if="form.type !== 3">
                    <el-form-item label="选项数量：">
                      <el-input-number v-model="form.count" controls-position="right" @change="handleChange(form)" :min="2" :max="8"></el-input-number>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" :offset="form.type === 3 ? 12 : 0">
                    <el-form-item label="分值：">
                      <el-input v-model.number="form.score" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col v-if="form.type !== 3" :span="12" :offset="12">
                    <el-form-item label="正确选项：" prop="answer">
                      <el-select :multiple="form.type !== 1" v-model="form.answer" clearable>
                        <el-option v-for="(val, key) in form.option" :key="key" :label="key" :value="key"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row> 
            <i class="el-icon-circle-close" @click="deleteItem(form, index)"></i>
          </el-form>
        </template>
      </div>
    </div>
    <el-button class="save-btn" type="primary" size="small" @click="saveQuestionExam">保存答卷</el-button>
  </div>
</template>

<script>
import { questionMaintenanceAdd, questionMaintenanceList } from '@/api/oam'

export default {
  name: 'questionMaintenance',

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
          serial_number: '1',
          problem: '花儿为什么这样红？',
          type: 1,
          count: 3,
          option: {
            'A': '就是这样红。',
            'B': '应该这样红',
            'C': '涂了红药水'
          },
          answer: 'A',
          score: 5
        },
        {
          serial_number: '2',
          problem: '0.26的计数单位是多少？',
          type: 2,
          count: 3,
          option: {
            'A': '0.1',
            'B': '0.01',
            'C': '0.001'
          },
          answer: ['A', 'B'],
          score: 5
        },
        {
          serial_number: '3',
          problem: '中国在哪个洲？',
          type: 3,
          answer: '亚洲',
          score: 10
        },
        // {
        //   serial_number: '',
        //   problem: '',
        //   type: 1,
        //   count: 3,
        //   option: {
        //     'A': '',
        //     'B': '',
        //     'C': ''
        //   },
        //   answer: '',
        //   score: ''
        // },
        // {
        //   serial_number: '',
        //   problem: '',
        //   type: 2,
        //   count: 3,
        //   option: {
        //     'A': '',
        //     'B': '',
        //     'C': ''
        //   },
        //   answer: [],
        //   score: ''
        // },
        // {
        //   serial_number: '',
        //   problem: '',
        //   type: 3,
        //   answer: '',
        //   score: ''
        // }
      ],
      rules: {
        problem: [
          { required: true, message: '问题必填', trigger: 'blur' }
        ],
        option: [
          { required: true, message: '答案选项必填', trigger: 'blur' }
        ],
        answer: [
          { required: true, message: '答案必填', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    goBack () {
      this.$emit('goBack')
    },
    handleChange (val) {
      // console.log(val)
      let problemObj = this.problemList.find(item => item.serial_number === val.serial_number)
      if (Object.keys(problemObj.option).length > val.count) {
        delete problemObj.option[Object.keys(problemObj.option)[val.count]]
      } else {
        let list = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
        let option = new Object()
        option[list[val.count - 1]] = ''
        problemObj.option = { ...problemObj.option, ...option }
      }
    },
    addProblem (type) {
      // 单选题
      let index = this.problemList.findIndex(item => item.type === type + 1)
      if (index === -1) {
        index = this.problemList.length
      } 
      let obj = new Object()
      obj = {
        serial_number: '',
        problem: '',
        type: type,
        count: 2,
        option: {
          'A': '',
          'B': ''
        },
        answer: '',
        score: ''
      }
      if (type === 3) {
        delete obj.option
        delete obj.count
      }

      this.problemList.splice(index, 0, obj)
    },
    deleteItem (form, index) {
      this.problemList.splice(index, 1)
    },
    // 保存答卷
    saveQuestionExam () {
      // this.$refs.ruleForm.validate(valid => {
      //   if (valid) {

      //   } else {

      //   }
      // })
      // return
      console.log(this.problemList)
      this.problemList = this.problemList.map(item => {
        return { ...item, ...{ item_id: this.onlineExamItem.id } }
      })
      let formData = new FormData()
      formData.append('data', JSON.stringify(this.problemList))
      questionMaintenanceAdd(formData).then(res => {
        if (res && res.code === 200) {
          this.$message.success(res.msg)
          this.goBack()
        }
      })
    },
    // 列表
    getQuestionMaintenanceList () {
      questionMaintenanceList({
        item_id: this.onlineExamItem.id
      }).then(res => {
        if (res && res.code === 200) {
          if (res.data.length) {
            res.data.map(item => {
              item.option = JSON.parse(item.option || null) || []
              item.count = Object.keys(item.option).length
            })
            this.problemList = res.data
            console.log(this.problemList)
          }
        }
      })
    }
  },
  created() {
    this.getQuestionMaintenanceList()
  }
}
</script>

<style lang="scss" scoped>
.question-maintenance-wrapper {
  padding: 16px 16px 0 16px;
  height: 100%;
  width: 100%;
  .el-page-header {
    margin-bottom: 16px;
  }
  .flex-wrapper {
    display: flex;
    min-height: calc(100% - 40px);
    .flex-item {
      // position: relative;
      border: 1px solid #c9c9c9;
      border-radius: 4px;
      margin-bottom: 16px;
      &:nth-child(1) {
        position: sticky;
        flex: 1;
        margin-right: 16px;
        display: flex;
        flex-direction: column;
        justify-content: top;
        align-items: center;
        p {
          text-align: center;
        }
        .el-button {
          margin: 8px 0;
        }
      }
      &:nth-child(2) {
        flex: 4;
        padding: 0 16px;
        .el-form {
          position: relative;
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
          .el-icon-circle-close {
            position: absolute;
            top: -8px;
            left: -8px;
            font-size: 24px;
            color: red;
            cursor: pointer;
          }
        }
      }
    }
  }
  .save-btn {
    position: fixed;
    top: 72px;
    right: 22px;
  }
}
</style>
