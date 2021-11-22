<template>
  <div class="party-org-add">
    <div class="title">
      <strong>党组织维护</strong>
    </div>
    <div class="content">
      <el-form ref="addForm" :model="addForm" :rules="rules" label-width="120px" size="small">
        <el-form-item label="党组织名称：" prop="name">
          <el-input v-model="addForm.name" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="书记：" prop="secretary">
          <el-input v-model="addForm.secretary" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="联系方式：" prop="contact">
          <el-input v-model="addForm.contact" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="党组织地址：" prop="address">
          <el-input v-model="addForm.address" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="form-footer">
      <el-button type="primary" size="small" @click="submit">确 定</el-button>
      <el-button type="default" size="small" @click="cancel">取 消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'partyOrgAdd',

  data () {
    return {
      addForm: {
        name: '',
        secretary: '',
        contact: '',
        address: ''
      },
      rules: {
        name: [
          { required: true, message: '党组织名称必填', trigger: 'blur' }
        ],
        secretary: [
          { required: true, message: '书记必填', trigger: 'blur' }
        ],
        contact: [
          { required: true, message: '联系方式必填', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '党组织地址必填', trigger: 'blur' }
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
.party-org-add {
  .title {
    padding: 0 0 16px;
  }
  .form-footer {
    text-align: center;
  }
}
</style>
