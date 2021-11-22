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
        ref="tree">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span :title="node.label">{{ node.label }}</span>
          <span>
            <!-- <span>{{ data.id }}</span> -->
            <el-button
              v-show="data.fileType !== '0'"
              type="text"
              size="mini"
              @click="() => append(data)">
              新增
            </el-button>
            <el-button
              v-show="data.parentId !== null"
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
        <span>XXXXXX</span>
        <span class="name">书记：</span>
        <span>XXXXXX</span>
        <span class="name">联系方式：</span>
        <span>XXXXXX</span>
        <span class="name">党组织地址：</span>
        <span>XXXXXX</span>
        <span class="name">人数：</span>
        <span>XXXXXX</span>
      </div>
      <!-- 筛选操作 -->
      <el-form :model="filterForm" inline size="small">
        <el-form-item>
          <el-input v-model="filterForm.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filterForm.idcardNo" placeholder="身份证号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="filterForm.partyType" placeholder="党员类型">
            <el-option v-for="item in partyTypeList" :key="item.valueId" :label="item.valueDesc" :value="item.valueId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            style="width: 240px"
            v-model="filterForm.dateRange"
            type="daterange"
            range-separator="/"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filterForm.idcardNo" placeholder="职位"></el-input>
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
      <el-table v-loading="tableLoading" :data="tableData" style="width: 100%">
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column label="姓名" prop="name" align="center"></el-table-column>
        <el-table-column label="身份证号" prop="idcardNo" align="center"></el-table-column>
        <el-table-column label="党员类型" prop="partyType" align="center">

        </el-table-column>
        <el-table-column label="入党时间" prop="joinPartyTime" align="center"></el-table-column>
        <el-table-column label="所属党组织" prop="joinPartyTime" align="center"></el-table-column>
        <el-table-column label="职位" prop="joinPartyTime" align="center"></el-table-column>
        <el-table-column label="手机号" prop="joinPartyTime" align="center"></el-table-column>
        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row">编辑</el-button>
          </template>
        </el-table-column>  
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page.sync="pagination.currentPage"
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
      <party-org-add v-if="dialogVisible && dialogTag === 'partyOrg'" @closeDialog="dialogVisible = false" />
      <party-member-add v-if="dialogVisible && dialogTag === 'partyMember'" @closeDialog="dialogVisible = false" />
    </el-dialog>
  </div>
</template>

<script>
import { informationTypeList, auditStatusList, partyTypeList } from '@/libs/term-mapping'
import PartyOrgAdd from './components/partyOrgAdd.vue'
import PartyMemberAdd from './components/partyMemberAdd.vue'

// 页数
const pagination = {
  currentPage: 1,
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
      treeData: [{
        id: 1,
        label: '一级 1一级 1一级 1一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      filterForm: {
        name: '',
        idcardNo: '',
        partyType: '',
        dateRange: []
      },
      pagination,
      tableLoading: false,
      tableData: [],
      queryLoading: false,
      dialogVisible: false,
      dialogTag: 'partyOrg'
    }
  },
  methods: {
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    append () {
      this.dialogTag = 'partyOrg'
      this.dialogVisible = true
    },
    // 查询
    handleQuery () {
      this.queryLoading = true
      window.setTimeout(() => {
        this.queryLoading = false
      }, 1000)
    },
    handleAdd () {
      this.dialogTag = 'partyMember'
      this.dialogVisible = true
    },
    handleDelete () {},
    handleImport () {},
    handleExport () {},
    sizeChange (pageSize) {
      this.pagination.pageSize = pageSize
      this.pagination.currentPage = 1
    },
    currentChange (currentPage) {
      this.pagination.currentPage = currentPage
    }
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
      padding: 16px;
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
