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
        <el-form-item label="党组织地址：" prop="sheng">
          <el-input v-model="addForm.sheng" placeholder="省"></el-input>
        </el-form-item>
        <el-form-item prop="shi">
          <el-input v-model="addForm.shi" placeholder="市"></el-input>
        </el-form-item>
        <el-form-item prop="xian">
          <el-input v-model="addForm.xian" placeholder="区/县"></el-input>
        </el-form-item>
        <el-form-item prop="xiang">
          <el-input v-model="addForm.xiang" placeholder="详细地址"></el-input>
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
import { partyOrgAdd, partyOrgModify } from '@/api/org'
import Cookies from 'js-cookie'

export default {
  name: 'partyOrgAdd',

  props: {
    partyOrgItem: {
      type: Object
    },
    partyOrgParams: {
      type: Object,
      default: () => {
        return { 
          type: 'add',
          p_id: 0
        }
      }
    }
  },
  data () {
    return {
      addForm: {
        party_name: '',
        secretary_name: '',
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
        sheng: [
          { required: true, message: '省必填', trigger: 'blur' }
        ],
        shi: [
          { required: true, message: '市必填', trigger: 'blur' }
        ],
        xian: [
          { required: true, message: '区/县必填', trigger: 'blur' }
        ],
        xiang: [
          { required: true, message: '详细地址必填', trigger: 'blur' }
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
    // 确定
    submit () {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.submitLoading = true
          // 新增
          if (this.partyOrgParams.type === 'add') {
            let params = {
              school_id: this.userInfo.school_id,
              campus_id: this.userInfo.campus_id,
              p_id: this.partyOrgParams.p_id
            }
            partyOrgAdd({ ...this.addForm, ...params }).then(res => {
              this.submitLoading = false
              if (res && res.code === 200) {
                this.$message.success('新增成功')
                this.cancel()
                this.$emit('notifyRefresh')
              } else {

              }
            })
          } else {  // 修改
            partyOrgModify(this.addForm).then(res => {
              this.submitLoading = false
              if (res && res.code === 200) {
                this.$message.success('修改成功')
                this.cancel()
              } else {

              }
            })
          }
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
    if (this.partyOrgParams.type === 'modify') {
      this.addForm = { ...this.partyOrgItem }
    }
    console.log(this.userInfo)
  }
}
</script>

<style lang="scss" scoped>
.party-org-add {
  .title {
    padding: 0 0 16px;
    border-bottom: 1px solid #c9c9c9;
    margin-bottom: 20px;
  }
  .form-footer {
    text-align: center;
  }
}
</style>
