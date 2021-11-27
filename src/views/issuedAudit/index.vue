<template>
  <div class="issue-audit-wrapper">
    <el-tabs ref="tabs" v-model="activeName" type="card" @tab-click="handleTabsClick">
      <el-tab-pane label="政策资讯" name="policyInfo">
        <policyInfo v-if="activeName === 'policyInfo'" :auditFlag="auditFlag" />
      </el-tab-pane>
      <el-tab-pane label="党建活动" name="partyActivity">
        <partyActivity v-if="activeName === 'partyActivity'" :auditFlag="auditFlag" />
      </el-tab-pane>
      <el-tab-pane label="学习专栏" name="learningColumn">
        <learningColumn v-if="activeName === 'learningColumn'" :auditFlag="auditFlag" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'issueAudit',

  components: {
    policyInfo: () => import('../policyInformation/index.vue'),
    partyActivity: () => import('../partyActivityManagement/index.vue'),
    learningColumn: () => import('../learningColumn/index.vue')
  },
  data () {
    return {
      activeName: 'policyInfo',
      auditFlag: true
    }
  },
  methods: {
    handleTabsClick (tab) {
      console.log(tab)
    }
  }
}
</script>

<style lang="scss" scoped>
.issue-audit-wrapper {
  ::v-deep.el-tabs {
    .el-tabs__header {
      margin: 16px 16px 0 16px;
      .el-tabs__item {
        &.is-active {
          background-color: var(--baseColor, '#01023c');
          color: #fff;
          font-size: 18px;
        }
      }
      .el-tabs__item:not(.is-active):hover {
        color: var(--baseColor, '#01023c');
      }
    }
    .el-tabs__content {

    }
  }
}
</style>
