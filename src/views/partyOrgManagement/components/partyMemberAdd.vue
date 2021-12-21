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
              <!-- <el-input v-model="addForm.user_name" placeholder="请输入内容"></el-input> -->
              <el-select
                v-model="addForm.user_name"
                style="width: 100%"
                filterable
                remote
                reserve-keyword
                placeholder="请输入关键词"
                value-key="id"
                @change="handleSelectChange"
                :remote-method="remoteMethod"
                :loading="loading">
                <el-option
                  v-for="item in options"
                  :key="item.id_card"
                  :label="item.real_name"
                  :value="item">
                </el-option>
              </el-select>
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
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属党支部：" prop="party_name">
              <el-input v-model="addForm.party_name" placeholder="请输入内容"></el-input>
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
import { partyMemberAdd, partyMemberModify, searchTeacherList } from '@/api/org'
import Cookies from 'js-cookie'

export default {
  name: 'partyMemberAdd',

  props: {
    partyMemberItem: {
      type: Object
    },
    partyMemberParams: {
      type: Object,
      default: () => {
        return {
          type: 'add',
          party_id: ''
        }
      }
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
      submitLoading: false,
      options: [],
      loading: false
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
          console.log(this.partyMemberParams)
          if (this.partyMemberParams.type === 'add') {
            let params = {
              party_id: this.partyMemberParams.party_id
            }
            partyMemberAdd({ ...this.addForm, ...params }).then(res => {
              this.submitLoading = false
              if (res && res.code === 200) {
                this.$message.success('新增成功')
                this.cancel()
                this.$emit('notify')
              }
            })
          } else {
            partyMemberModify(this.addForm).then(res => {
              this.submitLoading = false
              if (res && res.code === 200) {
                this.$message.success('修改成功')
                this.cancel()
                this.$emit('notify')
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
    },
    handleSelectChange (val) {
      console.log(val)
      this.$set(this.addForm, 'user_name', val.real_name)
      this.$set(this.addForm, 'user_id', val.id)
      this.$set(this.addForm, 'id_card', val.id_card)
      this.$set(this.addForm, 'phone', val.phone)
      this.$set(this.addForm, 'party_name', this.partyMemberParams.party_name)
    },
    remoteMethod(query) {
      let params = {
        search: query,
        pageSize: 10,
        page: 1
      }
      this.loading = true
      searchTeacherList(params).then(res => {
        this.loading = false
        if (res && res.code === 200) {
          this.options = res.data.data || []
        }
      })
    }
  },
  created() {
    if (this.partyMemberParams.type === 'edit') {
      this.addForm = { ...this.partyMemberItem }
    }
  }
}
</script>

<style lang="scss" scoped>
.party-member-add {
  .title {
    padding: 0 0 16px;
    border-bottom: 1px solid #c9c9c9;
    margin-bottom: 20px;
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
