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
              <el-button type="primary" icon="el-icon-arrow-right" size="small" @click="leftClick"></el-button>
              <el-button type="primary" icon="el-icon-arrow-left" size="small" @click="rightClick"></el-button>
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
      submitLoading: false,
      props: {
        label: 'party_name',
        children: 'children',
        isLeaf: 'leaf'
      },
      data: []
    }
  },
  computed: {
    userInfo() {
      return JSON.parse(Cookies.get('user') || null)
    }
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
    leftClick () {
      this.data = this.$refs.leftTree.getCheckedNodes()
      this.$nextTick(() => {
        this.$refs.leftTree.getCheckedNodes().map(item => {
          this.$refs.rightTree.setChecked(item.id, true)
        })
      })
    },
    rightClick () {
      let rightTreeList = [ ...this.data ]
      rightTreeList.forEach((list, index) => {
        this.$refs.rightTree.getCheckedNodes().map(item => {
          if (list.id === item.id) {
            rightTreeList.splice(index, 1)
          }
        })
      })
      console.log(rightTreeList)
      rightTreeList.map(item => {
        this.$refs.leftTree.setChecked(item.id, false)
      })
    },
    // 确定
    submit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.submitLoading = true
          this.form.member = this.$refs.rightTree.getCheckedNodes().map(item => item.id).join(',')
          let params = {
            user_id: this.userInfo.id,
            user_name: this.userInfo.real_name,
            quantity: this.$refs.rightTree.getCheckedNodes().map(item => item.id).length
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
          &:nth-child(2) {
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
