<template>
  <div class="add-test-project-wrapper">
    <div class="title">
      <strong>新增测验项目</strong>
    </div>
    <el-form ref="form" :model="form" :rules="rules" label-width="96px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="项目名称：" prop="name">
            <el-input v-model="form.name" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="开始时间：" prop="start_time">
            <el-date-picker
              style="width: 100%"
              v-model="form.start_time"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="开始时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="结束时间：" prop="end_time">
            <el-date-picker
              style="width: 100%"
              v-model="form.end_time"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="结束时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-transfer v-model="value" :data="data"></el-transfer>
        </el-col>
      </el-row>
    </el-form>
    <div class="form-footer">
      <el-button type="primary" size="small" :loading="submitLoading" @click="submit">确 定</el-button>
      <el-button type="default" size="small" @click="cancel">取 消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'addProject',

  data () {
    const generateData = _ => {
      const data = [];
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `备选项 ${ i }`,
          disabled: i % 4 === 0
        });
      }
      return data;
    }
    return {
      data: generateData(),
      value: [1, 4],
      form: {
        name: '',
        start_time: '',
        end_time: ''
      },
      rules: {
        name: [
          { required: true, message: '项目名称必填', trigger: 'blur' }
        ],
        start_time: [
          { required: true, message: '开始时间必填', trigger: 'blur' }
        ],
        end_time: [
          { required: true, message: '结束时间必填', trigger: 'blur' }
        ]
      },
      submitLoading: false
    }
  },
  methods: {
    submit () {
      this.$refs.form.validate(valid => {
        if (valid) {

        } else {

        }
      })
    },
    // 取消
    cancel () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.add-test-project-wrapper {
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
