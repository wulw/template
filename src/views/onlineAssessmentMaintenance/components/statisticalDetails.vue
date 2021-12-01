<template>
  <el-dialog
    custom-class="statistical-details-dialog-wrapper"
    width="50%"
    top="35vh"
    :append-to-body="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :visible.sync="detailsDialogVisible"
  >
    <div class="dialog-header">
      <strong>答案</strong>
      <i class="el-icon-close" @click="close"></i>
    </div>
    <div class="dialog-content">
      <!-- 列表 -->
      <el-table 
        v-loading="tableLoading" 
        stripe 
        fit 
        :data="tableData" 
        style="width: 100%">
        <el-table-column label="姓名" prop="user_name" align="center"></el-table-column>
        <el-table-column label="答案" prop="answer" align="center" show-overflow-tooltip></el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page.sync="pagination.page"
        :page-size="pagination.pageSize"
        layout="total, prev, pager, next"
        :total="pagination.total"
        background
        :pager-count="5"
      >
      </el-pagination>
    </div>
    <div class="dialog-footer">
      <el-button type="default" size="small" @click="close">关 闭</el-button>
    </div>
  </el-dialog>  
</template>

<script>
import { getItemUserAnswer } from '@/api/oam'

// 分页
const pagination = {
  page: 1,
  pageSize: 10,
  total: 0
}

export default {
  name: 'statisticalDetails',

  props: {
    detailsDialogVisible: {
      type: Boolean,
      default: false
    },
    answerDetailsItem: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      pagination,
      tableLoading: false,
      tableData: []
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    sizeChange (pageSize) {
      this.pagination.pageSize = pageSize
      this.pagination.currentPage = 1
      this.getAnswerInfoList()
    },
    currentChange (currentPage) {
      this.pagination.page = currentPage
      this.getAnswerInfoList()
    },
    getAnswerInfoList () {
      this.tableLoading = true
      getItemUserAnswer({ ...this.answerDetailsItem, ...this.pagination }).then(res => {
        if (res && res.code === 200) {
          // console.log(res.data)
          this.tableData = res.data.data || []
          this.pagination.total = res.data.total
          this.tableLoading = false
        }
      })
    }
  },
  created() {
    this.getAnswerInfoList()
  }
}
</script>

<style lang="scss">
.statistical-details-dialog-wrapper {  
  .el-dialog__header {
    display: none;
  }
  .dialog-header {
    padding-bottom: 12px;
    border-bottom: 1px solid #c9c9c9;
    i.el-icon-close {
      cursor: pointer;
      float: right;
    }
  }
  .dialog-content {
    margin: 16px 0;
  }
  .el-dialog__body {
    padding: 16px;
    .dialog-footer {
      text-align: right;
    }
  }
}
</style>
