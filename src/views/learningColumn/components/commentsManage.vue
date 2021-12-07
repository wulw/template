<template>
  <div class="comments-manage-wrapper">
    <el-page-header @back="goBack" content="评论管理"></el-page-header>
    <!-- 列表 -->
    <el-table 
      v-loading="tableLoading" 
      stripe 
      fit 
      :data="tableData" 
      style="width: 100%">
      <!-- <el-table-column type="selection" width="50"></el-table-column> -->
      <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
      <el-table-column label="用户" prop="reply_name" align="center"></el-table-column>
      <el-table-column label="内容" prop="comment" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column label="时间" prop="create_at" align="center"></el-table-column>
      <el-table-column label="操作" width="160" align="center">
        <template slot-scope="scope">
          <el-button type="danger" size="small" @click="handleDel(scope.row)">删除</el-button>
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
import { queryCommentList, commentDel } from '@/api/learning'

// 分页
const pagination = {
  page: 1,
  pageSize: 10,
  total: 0
}

export default {
  name: 'commentsManage',

  props: {
    learningColumnItem: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      pagination,
      tableLoading: false,
      tableData: [],

    }
  },
  methods: {
    // 返回
    goBack () {
      this.$emit('goBack')
    },
    // 删除
    handleDel (row) {
      this.$confirm('确认要删除数据？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        commentDel({
          id: row.id
        }).then(res => {
          if (res && res.code) {
            this.$message.success(res.msg)
          }
        })
      }).catch(() => {

      })
    },
    getCommentList () {
      let params = {
        learning_id: this.learningColumnItem.id
      }
      queryCommentList({ ...this.pagination, ...params }).then(res => {
        if (res && res.code === 200) {
          this.tableData = res.data.data || []
          this.pagination.total = res.data.total
        }
      })
    },
    sizeChange (pageSize) {
      this.pagination.pageSize = pageSize
      this.pagination.page = 1
      this.getCommentList()
    },
    currentChange (currentPage) {
      this.pagination.page = currentPage
      this.getCommentList()
    }
  },
  created() {
    if (this.learningColumnItem && this.learningColumnItem.id) {
      this.getCommentList()
    }
  }
}
</script>

<style lang="scss" scoped>
.comments-manage-wrapper {
  padding: 16px;
  .el-page-header {
    margin-bottom: 16px;
  }
}
</style>
