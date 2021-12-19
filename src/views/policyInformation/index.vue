<template>
  <div class="policy-information" v-if="!showComments">
    <!-- 筛选 -->
    <el-form :model="filterForm" :inline="true" size="small">
      <el-form-item>
        <el-input v-model="filterForm.name" placeholder="文章标题/发布人" clearable @keydown.enter.native="querySearch"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="filterForm.type" placeholder="请选择资讯类型" clearable @change="querySearch">
          <el-option v-for="item in informationTypeList" :key="item.valueId" :label="item.valueDesc" :value="item.valueId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          style="width: 240px"
          v-model="filterForm.release_time"
          type="date"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          placeholder="选择时间"
          clearable
          @change="querySearch">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-select v-model="filterForm.status" placeholder="请选择审核状态" clearable @change="querySearch">
          <el-option v-for="item in auditStatusList" :key="item.valueId" :label="item.valueDesc" :value="item.valueId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="queryLoading" @click="querySearch">查询</el-button>
      </el-form-item>
      <el-form-item style="float: right; margin-right: 0" v-if="!auditFlag">
        <el-button type="primary" @click="() => { dialogVisible = true; policyInfoItem = null }">新增</el-button>
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
      <el-table-column label="标题" prop="title" width="240" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="资讯类型" prop="type" align="center">
        <template slot-scope="scope">
          <span>{{ informationTypeList.find(item => item.valueId === scope.row.type).valueDesc }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发布人" prop="user_name" align="center"></el-table-column>
      <el-table-column label="来源" prop="source" align="center"></el-table-column>
      <el-table-column label="发布时间" prop="release_time" align="center"></el-table-column>
      <el-table-column label="单位" prop="user_department" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="审核状态" prop="status" align="center">
        <template slot-scope="scope">
          <span>{{ auditStatusList.find(item => item.valueId === scope.row.status).valueDesc }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="360" align="center">
        <template slot-scope="scope">
          <template v-if="auditFlag">
            <el-button type="primary" size="small" @click="handleEdit(scope.row)">查看</el-button>
          </template>
          <template v-else>
            <el-button v-if="scope.row.status === 0" type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <template v-else>
              <el-button type="primary" size="small" @click="handleEdit(scope.row)">查看</el-button>
              <el-button v-if="scope.row.is_top === 0 && scope.row.status === 1" type="primary" size="small" @click="handleTop(scope.row, 1)">置顶</el-button>
              <el-button v-else-if="scope.row.is_top === 1 && scope.row.status === 1" type="primary" size="small" @click="handleTop(scope.row, 2)">取消置顶</el-button>
            </template>
            <el-button v-if="scope.row.status === 1" type="primary" size="small" @click="() => { showComments = true; policyInfoItem = scope.row }">评论管理</el-button>
          </template>
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
    <!-- 新增dialog -->
    <el-dialog
      custom-class="dialog-wrapper"
      width="50%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="dialogVisible"
    >
      <policy-info-add v-if="dialogVisible" :policyInfoItem="policyInfoItem" :auditFlag="auditFlag" @notifyRefresh="getPolicyInfoList" @close="dialogVisible = false" />
    </el-dialog>
  </div>
  <comments-manage v-else :policyInfoItem="policyInfoItem" @goBack="showComments = false" />
</template>

<script>
import { informationTypeList, auditStatusList } from '@/libs/term-mapping'
import { getPolicyInfoList, policyInfoDel, policyInfoTop } from '@/api/policyInfo'
import policyInfoAdd from './components/policyInfoAdd.vue'

// 页数
const pagination = {
  page: 1,
  pageSize: 10,
  total: 0
}

export default {
  name: 'policyInformation',
  
  props: {
    auditFlag: {
      type: Boolean,
      default: false
    }
  },
  components: {
    policyInfoAdd,
    commentsManage: () => import('./components/commentsManage.vue')
  },
  data () {
    return {
      pagination,
      informationTypeList,
      auditStatusList,
      filterForm: {
        name: '',
        type: '',
        release_time: '',
        status: 0
      },
      queryLoading: false,
      tableData: [],
      tableLoading: false,
      dialogVisible: false,
      multipleSelection: [],
      policyInfoItem: null,
      showComments: false
    }
  },
  computed: {

  },
  created() {
    this.getPolicyInfoList()
  },
  methods: {
    // 查询按钮
    querySearch () {
      this.queryLoading = true
      this.pagination.page = 1
      this.getPolicyInfoList()
    },
    getPolicyInfoList () {
      this.tableLoading = true
      getPolicyInfoList({ ...this.filterForm, ...this.pagination}).then(res => {
        if (res && res.code === 200) {
          if (res.data) {
            this.tableData = res.data.data || []
            this.pagination.total = res.data.total
          }
        }
        this.tableLoading = false
        this.queryLoading = false
      })
    },
    sizeChange (pageSize) {
      this.pagination.pageSize = pageSize
      this.pagination.currentPage = 1
      this.getPolicyInfoList()
    },
    currentChange (currentPage) {
      this.pagination.page = currentPage
      this.getPolicyInfoList()
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
        policyInfoDel({
          id: this.multipleSelection.map(item => item.id).join(',')
        }).then(res => {
          if (res && res.data) {
            this.$message.success('删除成功')
            // 判断删除时 该条数据是不是当前页最后一条
            if (this.pagination.pageSize * (this.pagination.page - this.multipleSelection.length) + 1 === this.pagination.total) {
              this.pagination.page--
            }
            this.getPolicyInfoList()
          }
        })
      }).catch(() => {

      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 编辑
    handleEdit (row) {
      this.dialogVisible = true
      this.policyInfoItem = { ...row }
    },
    // 置顶/取消置顶
    handleTop (row, val) {
      let params = {
        id: row.id,
        is_top: val,
        // sort: 
      }
      policyInfoTop(params).then(res => {
        if (res && res.code === 200) {
          this.$message.success(res.msg)
          this.pagination.page = 1
          this.getPolicyInfoList()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.policy-information {
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
