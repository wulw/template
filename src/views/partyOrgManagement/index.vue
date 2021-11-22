<template>
  <div class="party-org-management">
    <div class="flex-item-wrapper">
      <el-tree
        class="filter-tree"
        :data="treeData"
        :props="defaultProps"
        default-expand-all
        :filter-node-method="filterNode"
        :expand-on-click-node="false"
        @node-click="handleNodeClick"
        ref="tree">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span :title="node.label">{{ node.label }}</span>
          <span>
            <!-- <span>{{ data.id }}</span> -->
            <el-button
              v-show="data.p_id === 0"
              type="text"
              size="mini"
              @click="() => append(data)">
              新增
            </el-button>
            <el-button
              v-show="data.p_id !== 0"
              type="text"
              size="mini"
              @click="() => modify(node, data)">
              修改
            </el-button>
            <el-button
              v-show="data.p_id !== 0"
              type="text"
              size="mini"
              @click="() => remove(node, data)">
              删除
            </el-button>
          </span>
        </span>
      </el-tree>
    </div>
    <div class="flex-item-wrapper">
      <!-- 当前位置 -->
      <div class="title-wrapper">
        <span class="name">党组织名称：</span>
        <span>{{ partyOrgItem.party_name }}</span>
        <span class="name">书记：</span>
        <span>{{ partyOrgItem.secretary_name }}</span>
        <span class="name">联系方式：</span>
        <span>{{ partyOrgItem.tel }}</span>
        <span class="name">党组织地址：</span>
        <span>{{ `${partyOrgItem.sheng}${partyOrgItem.shi}${partyOrgItem.xian}${partyOrgItem.xiang}`}}</span>
        <span class="name">人数：</span>
        <span v-if="partyOrgItem.children">{{ partyOrgItem.children.length }}</span>
      </div>
      <!-- 筛选操作 -->
      <el-form :model="filterForm" inline size="small">
        <el-form-item>
          <el-input v-model="filterForm.user_name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filterForm.id_card" placeholder="身份证号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="filterForm.type" placeholder="党员类型">
            <el-option v-for="item in partyTypeList" :key="item.valueId" :label="item.valueDesc" :value="item.valueId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            style="width: 160px"
            v-model="filterForm.party_date"
            type="date"
            range-separator="/"
            start-placeholder="开始日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filterForm.position" placeholder="职位"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery" :loading="queryLoading">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="btns-wrapper">
        <el-button type="primary" size="small" @click="handleAdd">新增</el-button>
        <el-button type="danger" size="small" @click="handleDelete">删除</el-button>
        <el-button type="primary" size="small" @click="handleImport">导入</el-button>
        <el-button type="primary" size="small" @click="handleExport">导出</el-button>
      </div>
      <!-- 列表 -->
      <el-table
        v-loading="tableLoading"
        :data="tableData" 
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column type="index" width="50" label="序号" align="center"></el-table-column>
        <el-table-column label="姓名" prop="user_name" align="center"></el-table-column>
        <el-table-column label="身份证号" prop="id_card" align="center"></el-table-column>
        <el-table-column label="党员类型" prop="type" align="center">
          <template slot-scope="scope">
            <span>{{ partyTypeList.find(item => item.valueId === scope.row.type).valueDesc }}</span>
          </template>
        </el-table-column>
        <el-table-column label="入党时间" prop="party_date" align="center"></el-table-column>
        <el-table-column label="所属党组织" prop="joinPartyTime" align="center"></el-table-column>
        <el-table-column label="职位" prop="position" align="center"></el-table-column>
        <el-table-column label="手机号" prop="phone" align="center"></el-table-column>
        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row" @click="edit(scope.row)" size="small">编辑</el-button>
          </template>
        </el-table-column>  
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page.sync="pagination.page"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pagination.pageSize"
        layout="total, prev, pager, next, sizes"
        :total="pagination.total"
        background
        :pager-count="5"
      >
      </el-pagination>
    </div>
    <el-dialog
      custom-class="dialog-wrapper"
      :width="dialogTag === 'partyOrg' ? '30%' : '50%'"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="dialogVisible"
    >
      <party-org-add v-if="dialogVisible && dialogTag === 'partyOrg'" @closeDialog="dialogVisible = false" :partyOrgItem="partyOrgItem" />
      <party-member-add v-if="dialogVisible && dialogTag === 'partyMember'" @closeDialog="dialogVisible = false" :partyMemberItem="partyMemberItem" />
    </el-dialog>
  </div>
</template>

<script>
import { informationTypeList, auditStatusList, partyTypeList } from '@/libs/term-mapping'
import PartyOrgAdd from './components/partyOrgAdd.vue'
import PartyMemberAdd from './components/partyMemberAdd.vue'
import { getTreeList, partyOrgDel, getPartyMemberList, partyMemberDel, partyMemberAdd } from '@/api/org'

// 页数
const pagination = {
  page: 1,
  pageSize: 10,
  total: 0
}

export default {
  name: 'partyOrgManagement',

  components: {
    PartyOrgAdd,
    PartyMemberAdd
  },
  data () {
    return {
      informationTypeList,
      auditStatusList,
      partyTypeList,
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'party_name'
      },
      filterForm: {
        user_name: '',
        id_card: '',
        type: '',
        party_date: '',
        position: ''
      },
      pagination,
      tableLoading: false,
      tableData: [],
      queryLoading: false,
      dialogVisible: false,
      dialogTag: 'partyOrg',
      partyOrgItem: {},
      partyMemberItem: {},
      multipleSelection: []
    }
  },
  methods: {
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    // 查询
    handleQuery () {
      this.queryLoading = true
      this.getPartyMemberList()
    },
    handleAdd () {
      this.dialogTag = 'partyMember'
      this.dialogVisible = true
    },
    handleDelete () {
      if (this.multipleSelection.length === 0) {
        return this.$message.info('请先选择')
      }
      this.$confirm('是否删除所选？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        partyMemberDel({
          id: this.multipleSelection.map(item => item.id).join(',')
        }).then(res => {
          if (res && res.data) {
            this.$message.success('删除成功')
            // 判断删除时 该条数据是不是当前页最后一条
            if (this.pagination.pageSize * (this.pagination.page - 1) + 1 === this.pagination.total) {
              this.pagination.page--
            }
            this.getPartyMemberList()
          }
        })
      }).catch(() => {

      })
    },
    handleImport () {},
    handleExport () {},
    sizeChange (pageSize) {
      this.pagination.pageSize = pageSize
      this.pagination.page = 1
    },
    currentChange (currentPage) {
      this.pagination.page = currentPage
    },
    // 新增
    append (data) {
      this.dialogTag = 'partyOrg'
      this.dialogVisible = true
      console.log(data)
    },
    // 修改
    modify (node, data) {
      this.dialogTag = 'partyOrg'
      this.dialogVisible = true
      console.log(node, data)
      this.partyOrgItem = data
    },
    // 删除
    remove (node, data) {
      console.log(node, data)
      partyOrgDel(data).then(res => {
        console.log(res)
      })
    },
    handleNodeClick (data, node, item) {
      // console.log(data, node, item)
      this.partyOrgItem = data
    },
    // 党组织树形列表
    getTreeList () {
      let params = {
        school_id: '', // ?
        campus_id: '' // ?
      }
      getTreeList(params).then(res => {
        console.log(res)
        if (res && res.data) {
          this.treeData = res.data
          this.partyOrgItem = res.data[0]
        }
      })
    },
    // 党组织成员列表
    getPartyMemberList() {
      getPartyMemberList({ ...this.filterForm, ...this.pagination, ...{party_id: '2'} }).then(res => {
        console.log(res)
        this.queryLoading = false
        if (res && res.data) {
          this.tableData = res.data.data
          this.pagination.total = res.data.total
        }
      })
    },
    // 编辑
    edit (row) {
      this.dialogTag = 'partyMember'
      this.dialogVisible = true
      this.partyMemberItem = row
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    }
  },
  created() {
    this.getTreeList()
    this.getPartyMemberList()
  }
}
</script>

<style lang="scss" scoped>
.party-org-management {
  padding: 16px;
  display: flex;
  min-height: 100%;
  width: 100%;
  .flex-item-wrapper {
    background-color: #fff;
    border-radius: 8px;
    &:nth-child(1) {
      flex: none;
      width: 240px;
      margin-right: 16px;
      padding: 16px 8px;
      ::v-deep.el-tree {
        height: 100%;
        overflow: auto;
        .el-tree-node__content {
          &:hover {
            .custom-tree-node {
              .el-button {
                display: inline;
              }
            }
          }
        }
        .el-tree-node__expand-icon {
          font-size: 16px;
          transform: none;
          &.expand {
            transform: none;
          }
          &::before {
            content: "\E78A";
            // background-image: url('../../assets/images/robot.png');
            // width: 16px;
            // height: 16px;
            // display: block;
          }
        }
      }
    }
    &:nth-child(2) {
      flex: none;
      width: calc(100% - 256px);
      padding: 16px;
      .title-wrapper {
        padding: 0 0 16px 0;
        .name + span {
          margin-right: 32px;
        }
      }
      .el-table {
        margin-top: 16px;
      }
    }
  }
  ::v-deep.dialog-wrapper {
    .el-dialog__body {
      padding: 16px;
    }
  }
}
</style>

<style lang="scss">
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
  width: 72px;
  span {
    &:first-child {
      float: right;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .el-button {
    display: none;
  }
}
</style>
