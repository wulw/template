<template>
  <div class="party-activity-management" v-if="showModule === 'onlineAssessmentMaintenance'">
    <!-- 筛选 -->
    <el-form :model="filterForm" :inline="true" size="small">
      <el-form-item>
        <el-input v-model="filterForm.name" placeholder="项目名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQuery" :loading="queryLoading">查询</el-button>
      </el-form-item>
      <el-form-item style="float: right; margin-right: 0">
        <el-button type="primary" @click="() => { dialogVisible = true; dialogTag = 'addTestProject' }">新增项目</el-button>
        <el-button type="danger" @click="handleDelete">删除</el-button>
      </el-form-item>
    </el-form>
    <!-- 列表 -->
    <el-table 
      v-loading="tableLoading" 
      stripe 
      fit 
      :data="tableData" 
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
      <el-table-column label="项目名称" prop="name" align="center"></el-table-column>
      <el-table-column label="考试开始时间" prop="start_time" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column label="考试结束时间" prop="end_time" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column label="提交数量" prop="quantity" align="center">
        <template slot-scope="scope">
          <span>{{ `${scope.row.quantity_p}/${scope.row.quantity}` }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="is_star" align="center">
        <template slot-scope="scope">
          <span>{{ examStatusList.find(item => item.valueId === scope.row.is_star).valueDesc }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="360" align="center">
        <template slot-scope="scope">
          <el-button v-if="scope.row.is_star === 1" type="primary" size="small" @click="showModule = 'questionMaintenance'; onlineExamItem = scope.row">问卷维护</el-button>
          <el-button v-else type="primary" size="small" @click="showModule = 'scoreViewList'; onlineExamItem = scope.row">成绩查看</el-button>
          <el-button v-if="scope.row.is_star === 3" type="primary" size="small" @click="() => { dialogVisible = true; dialogTag = 'answerStatistical'; onlineExamItem = scope.row }">统计</el-button>
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
    <!-- 新增项目dialog -->
    <el-dialog
      custom-class="dialog-wrapper"
      width="50%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="dialogVisible"
    >
      <add-test-project v-if="dialogVisible && dialogTag === 'addTestProject'" @close="dialogVisible = false" @notifyRefresh="getOamList" />
      <answer-statistical v-if="dialogVisible && dialogTag === 'answerStatistical'" :onlineExamItem="onlineExamItem" @close="dialogVisible = false" />
    </el-dialog>
  </div>
  <question-maintenance v-else-if="showModule === 'questionMaintenance'" :onlineExamItem="onlineExamItem" @goBack="showModule = 'onlineAssessmentMaintenance'" />
  <score-view-list v-else-if="showModule === 'scoreViewList'" :onlineExamItem="onlineExamItem" @goBack="showModule = 'onlineAssessmentMaintenance'" />
</template>

<script>
import { examStatusList } from '@/libs/term-mapping'
import { getList, testProjectDel } from '@/api/oam'

// 页数
const pagination = {
  page: 1,
  pageSize: 10,
  total: 0
}

export default {
  name: 'partyActivityManagement',

  components: {
    addTestProject: () => import('./components/addTestProject.vue'),
    answerStatistical: () => import('./components/answerStatistical.vue'),
    questionMaintenance: () => import('./components/questionMaintenance.vue'),
    scoreViewList: () => import('./components/scoreViewList.vue')
  },
  data () {
    return {
      examStatusList,
      filterForm: {
        name: ''
      },
      tableData: [],
      pagination,
      tableLoading: false,
      queryLoading: false,
      dialogVisible: false,
      dialogTag: '',
      multipleSelection: [],
      onlineExamItem: null,
      showModule: 'onlineAssessmentMaintenance'
    }
  },
  methods: {
     // 查询
    handleQuery () {
      this.queryLoading = true
      this.getOamList()
    },
    sizeChange (pageSize) {
      this.pagination.pageSize = pageSize
      this.pagination.page = 1
      this.getOamList()
    },
    currentChange (currentPage) {
      this.pagination.page = currentPage
      this.getOamList()
    },
    getOamList () {
      this.tableLoading = true
      getList({ ...this.filterForm, ...this.pagination }).then(res => {
        this.tableLoading = false
        this.queryLoading = false
        if (res && res.code === 200) {
          this.tableData = res.data.data || []
          this.pagination.total = res.data.total
        } 
      })
    },
    // 批量删除
    handleDelete () {
      if (this.multipleSelection.length === 0) {
        return this.$message.warning('请选择需要删除的数据')
      }
      this.$confirm('确认要删除数据？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        testProjectDel({
          id: this.multipleSelection.map(item => item.id).join(',')
        }).then(res => {
          if (res && res.code === 200) {
            this.$message.success('删除成功')
            // 判断删除时 该条数据是不是当前页最后一条
            if (this.pagination.pageSize * (this.pagination.page - this.multipleSelection.length) + 1 === this.pagination.total) {
              this.pagination.page--
            }
            this.getOamList()
          }
        })
      }).catch(() => {

      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    }
  },
  created() {
    this.getOamList()
  }
}
</script>

<style lang="scss" scoped>
.party-activity-management {
  padding: 16px;
  ::v-deep.dialog-wrapper {
    .el-dialog__header {
      display: none;
    }
    .el-dialog__body {
      padding: 16px;
    }
  }
}
</style>
