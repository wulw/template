<template>
  <div class="answer-statistical-wrapper">
    <div class="title">
      <strong>答卷统计</strong>
    </div>
    <div class="dialog-body">
      <div class="total">
        <span>浏览量：{{ total.viewCount }}</span>
        <span>回收量：{{ total.recycleCount }}</span>
        <span>平均作答时间：{{ total.AverageResponseTime }}</span>
      </div>
      <div class="content-wrapper">
        <template v-for="(form, index) in problemList">
          <el-form :model="form" size="small" label-width="120px" :key="index + 1">
            <el-row>
              <el-col :span="24">
                <el-row>
                  <el-col :span="24">
                    <el-form-item :label="`问题${index + 1}：`">
                      <!-- <el-input v-model="form.problem" placeholder="请输入内容"></el-input> -->
                      <span>{{ form.problem }}</span>
                      <el-button v-if="form.type === 3" type="text" @click="viewDetails(form.id)">详情</el-button>
                    </el-form-item>
                  </el-col>
                  <!-- <template v-if="form.type === 3">
                    <el-col :span="24">
                      <el-form-item label="答案：">
                        <span>{{ form.answer.answer }}</span>
                      </el-form-item>
                    </el-col>
                  </template> -->
                  <template v-if="form.type === 1">  
                    <el-col :span="24">
                      <el-form-item class="answer" label-width="88px" v-for="val, key in form.option" :key="key">
                        <span :title="`${key}. ${val}`">{{ `${key}. ${val}` }}</span>
                        <span>答题人数3-答题半分比30%</span>
                        <el-button type="text">详情</el-button>
                      </el-form-item>
                    </el-col>
                  </template>
                  <template v-else>  
                    <el-col :span="24">
                      <el-form-item class="answer" label-width="88px" v-for="val, key in form.option" :key="key">
                        <span>{{ `${key}. ${val}` }}</span>
                        <span>答题人数3-答题半分比30%</span>
                        <el-button type="text">详情</el-button>
                      </el-form-item>
                    </el-col>
                  </template>
                </el-row> 
              </el-col>
            </el-row> 
          </el-form>
        </template>
      </div>
    </div>
    <div class="form-footer">
      <el-button type="primary" size="small" :loading="submitLoading" @click="submit">确 定</el-button>
      <el-button type="default" size="small" @click="cancel">取 消</el-button>
    </div>
    <statistical-details :detailsDialogVisible="detailsDialogVisible" @close="detailsDialogVisible = false" />
  </div>
</template>

<script>
import statisticalDetails from './statisticalDetails.vue'

export default {
  name: 'scoreView',

  components: { statisticalDetails },
  data () {
    return {
      submitLoading: false,
      total: {
        viewCount: 16,
        recycleCount: 10,
        AverageResponseTime: 15
      },
      problemList: [
        {
          serial_number: 1,
          problem: '花儿为什么这样红？',
          type: 1,
          option: {
            'A': '就是这样红。就是这样红。就是这样红。就是这样红。就是这样红。',
            'B': '应该这样红',
            'C': '涂了红药水'
          },
          answer: '',
          score: 5
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
      detailsDialogVisible: false
    }
  },
  methods: {
    submit () {

    },
    cancel () {
      this.$emit('close')
    },
    // 详情
    viewDetails (id) {
      this.detailsDialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.answer-statistical-wrapper {
  .title {
    padding: 0 0 16px;
    border-bottom: 1px solid #c9c9c9;
    margin-bottom: 20px;
  }
  .dialog-body {
    .total {
      display: flex;
      justify-content: space-between;
    }
    .content-wrapper {
      margin: 16px 0;
      ::v-deep .el-form {
        .el-form-item.answer {
          .el-form-item__content {
            span {
              display: inline-block;
              vertical-align: middle;
              &:nth-child(1) {
                width: 120px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
              margin-right: 24px;
            }
          }
        }
      }
    }
  }
  .form-footer {
    text-align: center;
    margin-top: 16px;
  }
}
</style>
