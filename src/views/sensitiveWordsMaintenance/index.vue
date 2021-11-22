<template>
  <div class="sensitive-words-maintenance">
    <el-tag
      v-for="(tag, index) in dynamicTags"
      :key="tag"
      closable
      :disable-transitions="false"
      @close="handleClose(tag, index)">
      {{tag}}
    </el-tag>
    <el-input
      v-if="inputVisible"
      class="input-new-tag"
      v-model="inputValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    >
    </el-input>
    <el-button v-else class="button-new-tag" type="primary" size="small" icon="el-icon-plus" @click="showInput">新 增</el-button>
  </div>
</template>

<script>
export default {
  name: 'sensitiveWordsMaintenance',

  data () {
    return {
      dynamicTags: ['标签一', '标签二', '标签三'],
      inputVisible: false,
      inputValue: ''
    }
  },
  methods: {
    handleClose (tag, index) {
      this.dynamicTags.splice(index, 1)
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.sensitive-words-maintenance {
  padding: 16px;
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
}
</style>
