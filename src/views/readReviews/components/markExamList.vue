<template>
  <div class="mark-exam-list-wrapper" v-if="!showMarkExamView">
    <el-page-header @back="goBack" content="阅卷详情"></el-page-header>
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
      style="width: 100%">
      <!-- <el-table-column type="selection" width="50"></el-table-column> -->
      <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
      <el-table-column label="姓名" prop="answer_user_name" align="center"></el-table-column>
      <el-table-column label="提交时间" prop="completion_time" align="center"></el-table-column>
      <el-table-column label="选择题分数" prop="xztfs" align="center"></el-table-column>
      <el-table-column label="问答题分数" prop="wdtfs" align="center"></el-table-column>
      <el-table-column label="总分" prop="total_score" align="center"></el-table-column>
      <el-table-column label="操作" width="160" align="center">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status === 1" type="primary" size="small" @click="() => { showMarkExamView = true; markExamItem = scope.row }">阅卷</el-button>
          <el-button v-else type="primary" size="small" @click="() => { showMarkExamView = true; markExamItem = scope.row }">查看</el-button>
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
  <mark-exam-view v-else :markExamItem="markExamItem" @goBack="showMarkExamView = false" @notifyRefresh="getMarkExamList" />
</template>

<script>
import { viewMarkExamList } from '@/api/rd'

// 分页
const pagination = {
  page: 1,
  pageSize: 10,
  total: 0
}

export default {
  name: 'markExamList',

  props: {
    readReviewItem: {
      type: Object
    }
  },
  components: {
    markExamView: () => import('./markExamView.vue')
  },
  data () {
    return {
      pagination,
      filterForm: {
        name: ''
      },
      queryLoading: false,
      tableLoading: false,
      tableData: [],
      showMarkExamView: false,
      markExamItem: null
    }
  },
  methods: {
    // 返回
    goBack () {
      this.$emit('goBack')
    },
    querySearch () {
      this.queryLoading = true
      this.pagination.page = 1
      this.getMarkExamList()
    },
    sizeChange (pageSize) {
      this.pagination.pageSize = pageSize
      this.pagination.page = 1
      this.getMarkExamList()
    },
    currentChange (currentPage) {
      this.pagination.page = currentPage
      this.getMarkExamList()
    },
    getMarkExamList () {
      let params = {
        item_id: this.readReviewItem.id
      }
      this.tableLoading = true
      viewMarkExamList({ ...params, ...this.pagination }).then(res => {
        if (res && res.code === 200) {
          this.tableData = res.data.data || []
          this.pagination.total = res.data.total
        }
        this.queryLoading = false
        this.tableLoading = false
      })
    }
  },
  created() {
    if (this.readReviewItem && this.readReviewItem.id) {
      this.getMarkExamList()
    }
  }
}
</script>

<style lang="scss" scoped>
.mark-exam-list-wrapper {
  padding: 16px;
  .el-page-header {
    margin-bottom: 16px;
  }
}
</style>
