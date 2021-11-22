<template>
  <div class="party-member-add">
    <div class="title">
      <strong>班子成员维护</strong>
    </div>
    <div class="content">
      <el-form ref="addForm" :model="addForm" :rules="rules" label-width="120px" size="small">
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名：" prop="user_name">
              <el-input v-model="addForm.user_name" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身份证号：" prop="id_card">
              <el-input v-model="addForm.id_card" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="党员类型：" prop="type">
              <el-select v-model="addForm.type" style="width: 100%">
                <el-option v-for="item in partyTypeList" :key="item.valueId" :label="item.valueDesc" :value="item.valueId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="入党时间：" prop="party_date">
              <el-date-picker
                style="width: 100%"
                v-model="addForm.party_date"
                type="date"
                placeholder="选择时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属党支部：" prop="party_id">
              <el-input v-model="addForm.party_id" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="职位：" prop="position">
              <el-input v-model="addForm.position" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号：" prop="phone">
              <el-input v-model="addForm.phone" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="form-footer">
      <el-button type="primary" size="small" :loading="submitLoading" @click="submit">确 定</el-button>
      <el-button type="default" size="small" @click="cancel">取 消</el-button>
    </div>
  </div>
</template>

<script>
import { partyTypeList } from '@/libs/term-mapping'
import { partyMemberAdd } from '@/api/org'

export default {
  name: 'partyMemberAdd',

  props: {
    partyMemberItem: {
      type: Object
    }
  },
  data () {
    return {
      partyTypeList,
      addForm: {
        user_name: '',
        id_card: '',
        type: '',
        party_date: '',
        party_id: '',
        position: '',
        phone: ''
      },
      rules: {
        user_name: [
          { required: true, message: '姓名必填', trigger: 'blur' }
        ],
        id_card: [
          { required: true, message: '身份证号必填', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '党员类型必填', trigger: 'blur' }
        ],
        party_date: [
          { required: true, message: '入党时间必填', trigger: 'blur' }
        ],
        party_id: [
          { required: true, message: '所属党支部必填', trigger: 'blur' }
        ],
        position: [
          { required: true, message: '职位必填', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '手机号必填', trigger: 'blur' }
        ]
      },
      submitLoading: false
    }
  },
  methods: {
    // 确定
    submit () {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.submitLoading = true
          partyMemberAdd(this.addForm).then(res => {
            this.submitLoading = false
            if (res && res.data) {
              this.cancel()
            }
          })
        } else {
          console.log('submit error')
        }
      })
    },
    // 取消
    cancel () {
      this.$emit('closeDialog')
    }
  },
  created() {
    this.addForm = this.partyMemberItem
  }
}
</script>

<style lang="scss" scoped>
.party-member-add {
  .title {
    padding: 0 0 16px;
  }
  .el-form {
    .el-form-item {
      .el-form-item__content {

      }
    }
  }
  .form-footer {
    text-align: center;
  }
}
</style>
