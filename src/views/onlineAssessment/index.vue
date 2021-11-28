<template>
  <div class="party-activity-management" v-if="!showOnlineExamView">
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
    <el-table
      v-loading="tableLoading"
      stripe
      fit 
      :data="tableData" 
      style="width: 100%">
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
      <el-table-column label="项目名称" prop="projectName" align="center"></el-table-column>
      <el-table-column label="考试开始时间" prop="strDate" align="center"></el-table-column>
      <el-table-column label="考试结束时间" prop="endDate" align="center"></el-table-column>
      <el-table-column label="状态" prop="status" align="center">
        <template slot-scope="scope">
          <span>{{ markStatusList.find(item => item.valueId === scope.row.status).valueDesc }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160" align="center">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status === 0" type="primary" size="small" @click="showOnlineExamView = true">进入</el-button>
          <el-button v-else type="primary" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <online-exam-view v-else @submit="showOnlineExamView = false" />
</template>

<script>
import { markStatusList } from '@/libs/term-mapping'
import { getOaList } from '@/api/oa'
import Cookies from 'js-cookie'

export default {
  name: 'onlineAssessment',

  components: {
    onlineExamView: () => import('./components/onlineExamView.vue')
  },
  data () {
    return {
      markStatusList,
      filterForm: {
        name: ''
      },
      tableData: [
        {
          status: 0
        }
      ],
      tableLoading: false,
      queryLoading: false,
      showOnlineExamView: false
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
          // this.tableData = res.data || []
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
