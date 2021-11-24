<template>
  <div class="party-activity-management">
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
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column label="项目名称" prop="projectName" align="center"></el-table-column>
      <el-table-column label="考试开始时间" prop="strDate" align="center"></el-table-column>
      <el-table-column label="考试结束时间" prop="endDate" align="center"></el-table-column>
      <el-table-column label="状态" prop="auditStatus" align="center">
        <template slot-scope="scope">
          <span>{{ auditStatusList.find(item => item.valueId === scope.row.auditStatus).valueDesc }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160" align="center">
        <template slot-scope="scope">
          <el-button v-if="scope.row.auditStatus === '1'" type="primary" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { activityTypeList, auditStatusList } from '@/libs/term-mapping'
import { getOaList } from '@/api/oa'
import Cookies from 'js-cookie'

export default {
  name: 'partyActivityManagement',

  data () {
    return {
      activityTypeList,
      auditStatusList,
      filterForm: {
        // name: ''
      },
      tableData: [],
      tableLoading: false,
      queryLoading: false
    }
  },
  computed: {
    userInfo() {
      return JSON.parse(Cookies.get('user') || null)
    }
  },
  methods: {
     // 查询
    handleQuery () {
      this.queryLoading = true
      this.getOaList()
    },
    getOaList () {
      this.tableLoading = true
      let params = {
        user_id: this.userInfo.id
      }
      getOaList({ ...this.filterForm, ...params }).then(res => {
        this.queryLoading = false
        this.tableLoading = false
        if (res && res.code === 200) {
          this.tableData = res.data || []
        } 
      })
    }
  },
  created() {
    this.getOaList()
  }
}
</script>

<style lang="scss" scoped>
.party-activity-management {
  padding: 16px;
}
</style>
