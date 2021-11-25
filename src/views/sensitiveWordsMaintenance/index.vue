<template>
  <div class="sensitive-words-maintenance">
    <el-tag
      v-for="(tag, index) in dynamicTags"
      :key="tag"
      closable
      :disable-transitions="false"
      @close="handleClose(tag, index)">
      {{tag.content}}
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
import { querySensitiveWordsList, sensitiveWordsAdd, sensitiveWordsDel } from '@/api/words'

export default {
  name: 'sensitiveWordsMaintenance',

  data () {
    return {
      dynamicTags: [],
      inputVisible: false,
      inputValue: ''
    }
  },
  methods: {
    getSensitiveWordsList () {
      querySensitiveWordsList().then(res => {
        if (res && res.code === 200) {
          this.dynamicTags = res.data || []
        }
      })
    },
    handleClose (tag, index) {
      this.$confirm('确认要删除数据？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        sensitiveWordsDel({
          id: tag.id
        }).then(res => {
          if (res && res.code === 200) {
            this.$message.success(res.msg)
            // this.getSensitiveWordsList()
            this.dynamicTags.splice(index, 1)
          }
        })
      }).catch(() => {

      })
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
        sensitiveWordsAdd({
          content: inputValue
        }).then(res => {
          if (res && res.code === 200) {
            this.$message.success(res.msg)
            this.dynamicTags.push({
              content: inputValue
            })
            this.getSensitiveWordsList()
          }
        })
      }
      
      this.inputValue = ''
      this.inputVisible = false
    }
  },
  created() {
    this.getSensitiveWordsList()
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
