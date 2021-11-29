<template>
  <el-dialog
    custom-class="audit-form-dialog-wrapper"
    width="25%"
    top="35vh"
    :append-to-body="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :visible.sync="auditDialogVisible"
  >
    <div class="dialog-header">
      <strong>审核</strong>
    </div>
    <div class="dialog-body">
      <el-form ref="auditForm" :model="auditForm" :rules="rules" label-width="96px" size="small">
        <el-form-item label="审核结果：" prop="status">
          <el-select v-model="auditForm.status" placeholder="请选择" style="width: 100%">
            <el-option v-for="item in auditOptions" :key="item.valueId" :label="item.valueDesc" :value="item.valueId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核意见：" v-if="auditForm.status === 2" prop="opinion">
          <el-input type="textarea" v-model="auditForm.opinion" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="dialog-footer">
      <el-button type="primary" size="small" :loading="submitLoading" @click="submit">确 定</el-button>
      <el-button type="default" size="small" @click="cancel">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { policyInfoAudit } from '@/api/policyInfo'
import { partyActivityAudit } from '@/api/activity'
import { learningColumnAudit } from '@/api/learning'
import Cookies from 'js-cookie'
import { EventBus } from '@/utils/eventBus'

// 审核结果
const auditOptions = [
  {
    valueDesc: '通过',
    valueId: 1
  },
  {
    valueDesc: '不通过',
    valueId: 2
  }
]

export default {
  name: 'auditForm',

  props: {
    auditDialogVisible: {
      type: Boolean,
      default: false
    },
    auditModule: {
      type: String,
      default: ''
    },
    id: {
      type: String | Number,
      default: ''
    }
  },
  data () {
    return {
      auditOptions,
      auditForm: {
        status: '',
        opinion: ''
      },
      rules: {
        status: [
          { required: true, message: '审核结果必填', trigger: 'change' }
        ],
        opinion: [
          { required: true, message: '审核内容必填', trigger: 'change' }
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
      this.$refs.auditForm.validate(valid => {
        if (valid) {
          this.submitLoading = true
          let params = {
            id: this.id,
            reviewer: this.userInfo.id,
            reviewer_name: this.userInfo.real_name
          }
          if (this.auditModule === 'policyInfo') {
            try {
              policyInfoAudit({ ...this.auditForm, ...params }).then(res => {
                if (res && res.code === 200) {
                  this.$message.success(res.msg)
                  this.cancel()
                  EventBus.$emit('notifyRefresh')
                }
                this.submitLoading = false
              })
            } catch(e) {
              console.log('资讯审核失败', e)
              this.submitLoading = false
            }
          } else if (this.auditModule === 'partyActivity') {
            try {
              partyActivityAudit({ ...this.auditForm, ...params }).then(res => {
                if (res && res.code === 200) {
                  this.$message.success(res.msg)
                  this.cancel()
                  EventBus.$emit('notifyRefresh')
                }
                this.submitLoading = false
              })
            } catch(e) {
              console.log('党建活动审核失败', e)
              this.submitLoading = false
            }
          } else if (this.auditModule === 'learningColumn') {
            try {
              learningColumnAudit({ ...this.auditForm, ...params }).then(res => {
                if (res && res.code === 200) {
                  this.$message.success(res.msg)
                  this.cancel()
                  EventBus.$emit('notifyRefresh')
                }
                this.submitLoading = false
              })
            } catch(e) {
              console.log('学习专栏审核失败', e)
              this.submitLoading = false
            }
          }
        } else {

        }
      })
    },
    cancel () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss">
.audit-form-dialog-wrapper {
  .el-dialog__header {
    display: none;
  }
  .el-dialog__body {
    padding: 16px;
  }
}
.dialog-header {
  padding-bottom: 12px;
  border-bottom: 1px solid #c9c9c9;
}
.dialog-body {
  padding: 16px;
}
.dialog-footer {
  text-align: center;
}
</style>
