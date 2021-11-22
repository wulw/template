<template>
  <div class="party-member-add">
    <div class="title">
      <strong>班子成员维护</strong>
    </div>
    <div class="content">
      <el-form ref="addForm" :model="addForm" :rules="rules" label-width="120px" size="small">
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名：" prop="name">
              <el-input v-model="addForm.name" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身份证号：" prop="idcardNo">
              <el-input v-model="addForm.idcardNo" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="党员类型：" prop="partyType">
              <el-select v-model="addForm.partyType" style="width: 100%">
                <el-option v-for="item in partyTypeList" :key="item.valueId" :label="item.valueDesc" :value="item.valueId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="入党时间：" prop="joinPartyTime">
              <el-date-picker
                style="width: 100%"
                v-model="addForm.joinPartyTime"
                type="date"
                placeholder="选择时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属党支部：" prop="partyBranch">
              <el-input v-model="addForm.partyBranch" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="职位：" prop="post">
              <el-input v-model="addForm.post" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号：" prop="telephoneNo">
              <el-input v-model="addForm.telephoneNo" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="form-footer">
      <el-button type="primary" size="small" @click="submit">确 定</el-button>
      <el-button type="default" size="small" @click="cancel">取 消</el-button>
    </div>
  </div>
</template>

<script>
import { partyTypeList } from '@/libs/term-mapping'

export default {
  name: 'partyMemberAdd',

  data () {
    return {
      partyTypeList,
      addForm: {
        name: '',
        idcardNo: '',
        partyType: '',
        joinPartyTime: '',
        partyBranch: '',
        post: '',
        telephoneNo: ''
      },
      rules: {
        name: [
          { required: true, message: '姓名必填', trigger: 'blur' }
        ],
        idcardNo: [
          { required: true, message: '身份证号必填', trigger: 'blur' }
        ],
        partyType: [
          { required: true, message: '党员类型必填', trigger: 'blur' }
        ],
        joinPartyTime: [
          { required: true, message: '入党时间必填', trigger: 'blur' }
        ],
        partyBranch: [
          { required: true, message: '所属党支部必填', trigger: 'blur' }
        ],
        post: [
          { required: true, message: '职位必填', trigger: 'blur' }
        ],
        telephoneNo: [
          { required: true, message: '手机号必填', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 确定
    submit () {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.cancel()
        } else {
          console.log('submit error')
        }
      })
    },
    // 取消
    cancel () {
      this.$emit('closeDialog')
    }
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
