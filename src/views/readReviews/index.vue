<template>
  <div class="party-activity-management" v-if="!showMarkExamList">
    <!-- 筛选 -->
    <el-form :model="filterForm" :inline="true" size="small">
      <el-form-item>
        <el-input v-model="filterForm.name" placeholder="项目名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQuery" :loading="queryLoading">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 列表 -->
    <el-table v-loading="tableLoading" stripe fit :data="tableData" style="width: 100%">
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
      <el-table-column label="项目名称" prop="projectName" align="center"></el-table-column>
      <el-table-column label="考试开始时间" prop="strDate" align="center"></el-table-column>
      <el-table-column label="考试结束时间" prop="endDate" align="center"></el-table-column>
      <el-table-column label="提交数量" prop="subCount" align="center"></el-table-column>
      <el-table-column label="操作" width="160" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="() => { showMarkExamList = true; readReviewItem = scope.row }">查看</el-button>
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
  <mark-exam-list v-else @goBack="showMarkExamList = false" :readReviewItem="readReviewItem" />
</template>

<script>
import { queryRdList } from '@/api/rd'
// 页数
const pagination = {
  page: 1,
  pageSize: 10,
  total: 0
}

export default {
  name: 'readReviews',

  components: {
    markExamList: () => import('./components/markExamList.vue')
  },
  data () {
    return {
      filterForm: {
        name: ''
      },
      tableData: [],
      pagination,
      tableLoading: false,
      queryLoading: false,
      showMarkExamList: false,
      readReviewItem: {}
    }
  },
  methods: {
    // 查询
    handleQuery () {
      this.queryLoading = true
      this.pagination.page = 1
      this.getRdList()
    },
    sizeChange (pageSize) {
      this.pagination.pageSize = pageSize
      this.pagination.page = 1
      this.getRdList()
    },
    currentChange (currentPage) {
      this.pagination.page = currentPage
      this.getRdList()
    },
    getRdList () {
      this.tableLoading = true
      queryRdList({ ...this.filterForm, ...this.pagination }).then(res => {
        this.queryLoading = false
        this.tableLoading = false
        if (res && res.code === 200) {
          this.tableData = res.data.data || []
          this.pagination.total = res.data.total
        } 
      })
    }
  },
  created() {
    this.getRdList()
  }
}
</script>

<style lang="scss" scoped>
.party-activity-management {
  padding: 16px;
}
</style>
