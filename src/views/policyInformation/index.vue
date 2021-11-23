<template>
  <div class="policy-information">
    <!-- 筛选 -->
    <el-form :model="filterForm" :inline="true" size="small">
      <el-form-item>
        <el-input v-model="filterForm.name" placeholder="文章标题/发布人"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="filterForm.type" placeholder="请选择资讯类型">
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
          placeholder="发布时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-select v-model="filterForm.status" placeholder="请选择审核状态">
          <el-option v-for="item in auditStatusList" :key="item.valueId" :label="item.valueDesc" :value="item.valueId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
      </el-form-item>
      <el-form-item style="float: right; margin-right: 0">
        <el-button type="primary">新增</el-button>
        <el-button type="primary">删除</el-button>
      </el-form-item>
    </el-form>
    <!-- 列表 -->
    <el-table v-loading="loading" stripe fit :data="tableData" style="width: 100%">
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column label="标题" prop="title" width="240" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="资讯类型" prop="type" align="center">
        <template slot-scope="scope">
          <span>{{ informationTypeList.find(item => item.valueId === scope.row.type).valueDesc }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发布人" prop="publisher" align="center"></el-table-column>
      <el-table-column label="来源" prop="source" align="center"></el-table-column>
      <el-table-column label="发布时间" prop="release_time" align="center"></el-table-column>
      <el-table-column label="单位" prop="unit" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="审核状态" prop="auditStatus" align="center">
        <template slot-scope="scope">
          <span>{{ auditStatusList.find(item => item.valueId === scope.row.status).valueDesc }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160" align="center">
        <template slot-scope="scope">
          <el-button v-if="scope.row.auditStatus === '1'" type="primary" size="small">置顶</el-button>
          <el-button v-if-else="scope.row.auditStatus === '3'" type="primary" size="small">编辑</el-button>
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
import { informationTypeList, auditStatusList } from '@/libs/term-mapping'
import { getPolicyInfoList } from '@/api/policyInfo'

// 页数
const pagination = {
  page: 1,
  pageSize: 10,
  total: 0
}

export default {
  name: 'policyInformation',
  
  data () {
    return {
      pagination,
      informationTypeList,
      auditStatusList,
      filterForm: {
        name: '',
        type: '',
        release_time: '',
        status: ''
      },
      tableData: [],
      loading: false
    }
  },
  computed: {

  },
  created() {
    this.getPolicyInfoList()
  },
  methods: {
    getPolicyInfoList () {
      getPolicyInfoList({ ...this.filterForm, ...this.pagination}).then(res => {
        if (res && res.code === 200) {
          if (res.data) {
            this.tableData = res.data.data || []
            this.pagination.total = res.data.total
          }
        }
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
    }
  }
}
</script>

<style lang="scss" scoped>
.policy-information {
  padding: 16px;
}
</style>
