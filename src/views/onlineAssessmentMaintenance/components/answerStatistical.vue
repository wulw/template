<template>
  <div class="answer-statistical-wrapper">
    <div class="title">
      <strong>答卷统计</strong>
    </div>

    <div class="form-footer">
      <el-button type="primary" size="small" :loading="submitLoading" @click="submit">确 定</el-button>
      <el-button type="default" size="small" @click="cancel">取 消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'scoreView',

  data () {
    return {
      submitLoading: false
    }
  },
  methods: {
    submit () {

    },
    cancel () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.answer-statistical-wrapper {
  .title {
    padding: 0 0 16px;
    border-bottom: 1px solid #c9c9c9;
    margin-bottom: 20px;
  }
  .form-footer {
    text-align: center;
    margin-top: 16px;
  }
}
</style>
