<template>
  <div class="party-activity-management" v-if="!showOnlineExamView">
    <!-- 筛选 -->
    <el-form :model="filterForm" :inline="true" size="small">
      <el-form-item>
        <el-input v-model="filterForm.name" placeholder="项目名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="querySearch" :loading="queryLoading">查询</el-button>
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
      <el-table-column label="项目名称" prop="name" align="center"></el-table-column>
      <el-table-column label="考试开始时间" prop="start_time" align="center"></el-table-column>
      <el-table-column label="考试结束时间" prop="end_time" align="center"></el-table-column>
      <el-table-column label="状态" prop="status" align="center">
        <template slot-scope="scope">
          <span>{{ markStatusList.find(item => item.valueId === scope.row.status).valueDesc }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160" align="center">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status === 1" type="primary" size="small" @click="showOnlineExamView = true; onlineExamItem = scope.row">进入</el-button>
          <el-button type="primary" size="small" @click="handleView(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <online-exam-view v-else @goBack="showOnlineExamView = false" @notifyRefresh="getOaList" :onlineExamItem="onlineExamItem" />
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
          status: 1
        }
      ],
      tableLoading: false,
      queryLoading: false,
      showOnlineExamView: false,
      onlineExamItem: null
    }
  },
  computed: {
    userInfo() {
      return JSON.parse(Cookies.get('user') || null)
    }
  },
  methods: {
     // 查询
    querySearch () {
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
    },
    handleView (row) {
      if (row.status === 2) {
        this.$confirm('阅卷尚未完成，不可查看试卷！', '系统提示', {
          // confirmButtonText: '确定',
          // cancelButtonText: '取消',
          showConfirmButton: false,
          showCancelButton: false,
          type: 'warning'
        }).then(() => {

        }).catch(() => {

        })
      } else {
        this.onlineExamItem = row
        this.showOnlineExamView = true
      }
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
