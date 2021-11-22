<template>
  <div class="party-org-add">
    <div class="title">
      <strong>党组织维护</strong>
    </div>
    <div class="content">
      <el-form ref="addForm" :model="addForm" :rules="rules" label-width="120px" size="small">
        <el-form-item label="党组织名称：" prop="party_name">
          <el-input v-model="addForm.party_name" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="书记：" prop="secretary_name">
          <el-input v-model="addForm.secretary_name" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="联系方式：" prop="tel">
          <el-input v-model="addForm.tel" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="党组织地址：" prop="xiang">
          <el-input v-model="addForm.xiang" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="form-footer">
      <el-button type="primary" size="small" :loading="submitLoading" @click="submit">确 定</el-button>
      <el-button type="default" size="small" @click="cancel">取 消</el-button>
    </div>
  </div>
</template>

<script>
import { partyOrgAdd } from '@/api/org'

export default {
  name: 'partyOrgAdd',

  props: {
    partyOrgItem: {
      type: Object
    }
  },
  data () {
    return {
      addForm: {
        party_name: '',
        secretary_name: '',
        secretary_id: 50,
        tel: '',
        xiang: ''
      },
      rules: {
        party_name: [
          { required: true, message: '党组织名称必填', trigger: 'blur' }
        ],
        secretary_name: [
          { required: true, message: '书记必填', trigger: 'blur' }
        ],
        tel: [
          { required: true, message: '联系方式必填', trigger: 'blur' }
        ],
        xiang: [
          { required: true, message: '党组织地址必填', trigger: 'blur' }
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
          partyOrgAdd(this.addForm).then(res => {
            if (res && res.data) {
              this.submitLoading = false
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
    this.addForm = this.partyOrgItem
  }
}
</script>

<style lang="scss" scoped>
.party-org-add {
  .title {
    padding: 0 0 16px;
  }
  .form-footer {
    text-align: center;
  }
}
</style>
