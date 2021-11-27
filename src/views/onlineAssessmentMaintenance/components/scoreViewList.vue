<template>
  <div class="score-view-wrapper">
    <!-- <el-button type="primary" size="small" @click="back">返回</el-button> -->
    <el-page-header @back="goBack" content="测验成绩"></el-page-header>
    <!-- 筛选 -->
    <el-form :model="filterForm" inline size="small">
      <el-form-item>
        <el-input v-model="filterForm.name" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="queryLoading" @click="querySearch">查询</el-button>
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
      <el-table-column label="姓名" prop="name" align="center"></el-table-column>
      <el-table-column label="提交时间" prop="start_time" align="center"></el-table-column>
      <el-table-column label="选择题分数" prop="end_time" align="center"></el-table-column>
      <el-table-column label="问答题分数" prop="quantity" align="center"></el-table-column>
      <el-table-column label="总分" prop="status" align="center"></el-table-column>
      <el-table-column label="操作" width="160" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="scoreViewDetails(scope.row)">查看</el-button>
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
</template>

<script>
import { EventBus } from '@/utils/eventBus'
import { queryscoreViewList } from '@/api/oam'

const pagination = {
  pageSize: 10,
  page: 1,
  total: 0
}

export default {
  name: 'scoreView',

  data () {
    return {
      filterForm: {
        name: ''
      },
      queryLoading: false,
      tableData: [],
      pagination,
      tableLoading: false,
      item_id: ''
    }
  },
  methods: {
    goBack () {
      EventBus.$emit('back', 'partyActivityManagement')
    },
    // 查看
    scoreViewDetails () {

    },
    querySearch () {
      this.queryLoading = true
    },
    sizeChange (pageSize) {
      this.pagination.pageSize = pageSize
      this.pagination.page = 1
      this.getScoreViewList()
    },
    currentChange (currentPage) {
      this.pagination.page = currentPage
      this.getScoreViewList()
    },
    getScoreViewList () {
      let params = {
        item_id: this.item_id
      }
      queryscoreViewList({ ...this.filterForm, ...this.pagination, ...params }).then(res => {
        if (res && res.code === 200) {
          this.tableData = res.data.data || []
        }
      })
    },
    handleSelectionChange (val) {
      console.log(val)
    }
  },
  created() {
    EventBus.$on('scoreView', (id) => {
      this.item_id = id
      this.getScoreViewList()
    })
  }
}
</script>

<style lang="scss" scoped>
.score-view-wrapper {
  padding: 16px;
  .el-page-header {
    margin-bottom: 16px;
  }
}
</style>
