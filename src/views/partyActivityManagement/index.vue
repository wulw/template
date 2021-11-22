<template>
  <div class="party-activity-management">
    <!-- 筛选 -->
    <el-form :model="filterForm" :inline="true" size="small">
      <el-form-item>
        <el-input v-model="filterForm.keywords" placeholder="活动名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="filterForm.activityType" placeholder="请选择活动类型">
          <el-option v-for="item in activityTypeList" :key="item.valueId" :label="item.valueDesc" :value="item.valueId"></el-option>
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
        <el-select v-model="filterForm.auditStatus" placeholder="请选择审核状态">
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
      <el-table-column label="活动名称" prop="activityName" align="center"></el-table-column>
      <el-table-column label="活动类型" prop="activityType" align="center">
        <template slot-scope="scope">
          <span>{{ activityTypeList.find(item => item.valueId === scope.row.activityType).valueDesc }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发布人" prop="publisher" align="center"></el-table-column>
      <el-table-column label="单位" prop="unit" align="center"></el-table-column>
      <el-table-column label="时间" prop="date" align="center"></el-table-column>
      <el-table-column label="地点" prop="location" align="center"></el-table-column>
      <el-table-column label="参加人数" prop="joinCount" align="center"></el-table-column>
      <el-table-column label="审核状态" prop="auditStatus" align="center">
        <template slot-scope="scope">
          <span>{{ auditStatusList.find(item => item.valueId === scope.row.auditStatus).valueDesc }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160" align="center">
        <template slot-scope="scope">
          <el-button v-if="scope.row.auditStatus === '1'" type="primary" size="small">编辑</el-button>
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
</template>

<script>
import { activityTypeList, auditStatusList } from '@/libs/term-mapping'

// 页数
const pagination = {
  currentPage: 1,
  pageSize: 10,
  total: 0
}

export default {
  name: 'partyActivityManagement',

  data () {
    return {
      activityTypeList,
      auditStatusList,
      filterForm: {
        keywords: '',
        activityType: ''
      },
      tableData: [],
      pagination,
      loading: false
    }
  }
}
</script>

<style lang="scss" scoped>
.party-activity-management {
  padding: 16px;
}
</style>
