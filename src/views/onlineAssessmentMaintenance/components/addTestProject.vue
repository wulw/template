<template>
  <div class="add-test-project-wrapper">
    <div class="title">
      <strong>新增测验项目</strong>
    </div>
    <el-form ref="form" :model="form" size="small" :rules="rules" label-width="96px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="项目名称：" prop="name">
            <el-input v-model="form.name" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="开始时间：" prop="start_time">
            <el-date-picker
              style="width: 100%"
              v-model="form.start_time"
              :picker-options="pickerOptions"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              placeholder="开始时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="结束时间：" prop="end_time">
            <el-date-picker
              style="width: 100%"
              v-model="form.end_time"
              :picker-options="pickerOptions"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              placeholder="结束时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <div class="flex-wrapper">
            <div class="flex-item">
              <p>党组织人员</p>
              <el-tree
                ref="leftTree"
                :props="props"
                :load="loadNode"
                lazy
                node-key="id"
                show-checkbox
                check-strictly
                :default-expand-all="true"
                @check-change="handleLeftCheckChange">
                <span class="custom-tree-node" slot-scope="{ node, data }">
                  <span v-if="node.level === 3">{{ data.user_name }}</span>
                  <span v-else>{{ data.party_name }}</span>
                </span>
              </el-tree>
            </div>
            <div class="flex-item">
              <el-button type="primary" icon="el-icon-arrow-right" size="small" @click="rightClick"></el-button>
              <el-button type="primary" icon="el-icon-arrow-left" size="small" @click="leftClick"></el-button>
              <el-button type="primary" icon="el-icon-d-arrow-right" size="small" @click="rightAllClick"></el-button>
              <el-button type="primary" icon="el-icon-d-arrow-left" size="small" @click="leftAllClick"></el-button>
            </div>
            <div class="flex-item">
              <p>已选择人员</p>
              <el-tree
                ref="rightTree"
                :props="props"
                :data="data"
                node-key="id"
                show-checkbox
                empty-text="请选择人员"
                :default-expand-all="false"
                @check-change="handleRightCheckChange">
                <span class="custom-tree-node" slot-scope="{ node, data }">
                  <span v-if="node.level === 1">{{ data.user_name }}</span>
                  <span v-else>{{ data.party_name }}</span>
                </span>
              </el-tree>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <div class="form-footer">
      <el-button type="primary" size="small" :loading="submitLoading" @click="submit">确 定</el-button>
      <el-button type="default" size="small" @click="cancel">取 消</el-button>
    </div>
  </div>
</template>

<script>
import { testProjectAdd } from '@/api/oam'
import { getTreeList, getPartyMemberList } from '@/api/org'
import Cookies from 'js-cookie'

export default {
  name: 'addProject',

  data () {
    return {
      form: {
        name: '',
        start_time: '',
        end_time: '',
        member: []
      },
      rules: {
        name: [
          { required: true, message: '项目名称必填', trigger: 'blur' }
        ],
        start_time: [
          { required: true, message: '开始时间必填', trigger: 'blur' }
        ],
        end_time: [
          { required: true, message: '结束时间必填', trigger: 'blur' }
        ],
        member: [
          { required: true, message: '成员必填', trigger: 'change' }
        ]
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now()
        }
      },
      pickerEndOptions: {},
      submitLoading: false,
      props: {
        label: 'party_name',
        children: 'children',
        isLeaf: 'leaf'
      },
      leftTreeData: [],
      data: []
    }
  },
  computed: {
    userInfo() {
      return JSON.parse(Cookies.get('user') || null)
    }
  },
  watch: {
    // 'form.start_time'(val) {
    //   this.pickerEndOptions = {
    //     disabledDate(time) {
    //       return time.getTime() < new Date(val).getTime()
    //     }
    //   }
    // }
  },
  methods: {
    loadNode (node, resolve) {
      console.log(node)
      let params = {
        school_id: this.userInfo.school_id, // ?
        campus_id: this.userInfo.campus_id // ?
      }
      if (node.level === 0) {
        getTreeList(params).then(res => {
          if (res && res.code === 200) {
            resolve(res.data.map(item => {
              return { ...item, ...{ disabled: true } }
            }))
          }
        })
      } else if (node.level === 1) {
        getTreeList(params).then(res => {
          if (res && res.code === 200) {
            resolve(res.data[0].children.map(item => {
              return { ...item, ...{ disabled: true } }
            }))
          }
        })
      } else if (node.level === 2) {
        getPartyMemberList({
          party_id: node.data.id,
          pageSize: 99999,
          page: 1
        }).then(res => {
          if (res && res.code === 200) {
            if (res.data.data.length) {
              res.data.data = res.data.data.map(item => {
                return { ...item, ...{ leaf: true } }
              })
              this.leftTreeData = this.leftTreeData.concat(res.data.data)
              resolve(res.data.data)
            } else {
              resolve([])
            }
          }
        })
      } else {
        resolve([])
      }
    },
    handleLeftCheckChange (node) {
      console.log(node)
    },
    handleRightCheckChange (node) {

    },
    rightClick () {
      this.data = this.$refs.leftTree.getCheckedNodes()
      if (!this.data.length) {
        return this.$message.info('请选择人员')
      }
      this.$nextTick(() => {
        this.$refs.leftTree.getCheckedNodes().map(item => {
          this.$refs.rightTree.setChecked(item.id, false)
        })
      })
    },
    leftClick () {
      this.$refs.rightTree.getCheckedNodes().map((item) => {
        this.$refs.leftTree.setChecked(item.id, false)
        this.data.forEach((tree, index) => {
          if (tree.id === item.id) {
            this.data.splice(index, 1)
          }
        })
      })
    },
    rightAllClick () {
      this.$refs.leftTree.setCheckedNodes(this.leftTreeData)
      this.data = JSON.parse(JSON.stringify(this.leftTreeData))
      this.$nextTick(() => {
        this.$refs.leftTree.getCheckedNodes().map(item => {
          this.$refs.rightTree.setChecked(item.id, true)
        })
      })
    },
    leftAllClick () {
      this.data = []
      this.$refs.leftTree.getCheckedNodes().map(item => {
        this.$refs.leftTree.setChecked(item.id, false)
      })
    },
    // 确定
    submit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.submitLoading = true
          this.form.member = this.data.map(item => item.user_id).join(',')  // this.$refs.rightTree.getCheckedNodes()
          let params = {
            user_id: this.userInfo.id,
            user_name: this.userInfo.real_name,
            quantity: this.data.map(item => item.user_id).length // this.$refs.rightTree.getCheckedNodes()
          }
          testProjectAdd({ ...this.form, ...params }).then(res => {
            if (res && res.code === 200) {
              this.$message.success(res.msg)
              this.cancel()
              this.$emit('notifyRefresh')
            }
            this.submitLoading = false
          })
        } else {

        }
      })
    },
    // 取消
    cancel () {
      this.$emit('close')
    }
  },
  created() {
    // this.initOrgTreeList()
  }
}
</script>

<style lang="scss" scoped>
.add-test-project-wrapper {
  .title {
    padding: 0 0 16px;
    border-bottom: 1px solid #c9c9c9;
    margin-bottom: 20px;
  }
  .flex-wrapper {
    display: flex;
    .flex-item {
      border: 1px solid #c9c9c9;
      &:nth-child(1),
      &:nth-child(3) {
        flex: 1;
        p {
          text-align: center;
          padding-bottom: 12px;
          border-bottom: 1px solid #c9c9c9;
        }
      }
      &:nth-child(2) {
        border-left: none;
        border-right: none;
        flex: none;
        width: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .el-button {
          &:nth-child(2),
          &:nth-child(3),
          &:nth-child(4) {
            margin: 16px 0 0 0;
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
