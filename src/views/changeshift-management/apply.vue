<!--
 * @Description: Do not edit
 * @Author: 前端劝退师-李逍遥
 * @Date: 2021-09-15 09:24:01
 * @LastEditors: 前端劝退师-李逍遥
 * @LastEditTime: 2021-10-22 10:53:41
 * @FilePath: \changeshift\src\views\changeshift-management\apply.vue
-->
<template>
    <div class="content">
        <div class="right">
            <div class="btn">
                <el-button type="primary" size="small" @click="add">新增</el-button>
                <el-button type="primary" size="small" @click="download">模板下载</el-button>
                <el-upload
                    class="improt"
                    ref="upload"
                    :on-success="daoru"
                    :headers="headers"
                    :action="$AllPath.imgPath + '/BasicsApi/importAdjustClass'"
                    :show-file-list="false"
                    :auto-upload="true"
                    style="float: left; margin-left: 10px"
                >
                    <el-button size="small" slot="trigger">批量导入</el-button>
                </el-upload>
            </div>
            <el-table :data="tableData" stripe style="width: 100%" fit v-loading="loading">
                <el-table-column prop="student_account" label="学号" align="center"> </el-table-column>
                <el-table-column prop="student_name" label="姓名" align="center"> </el-table-column>
                <el-table-column prop="student_sex" label="性别" align="center"> </el-table-column>
                <el-table-column prop="now_grade_name" label="现年级" align="center"> </el-table-column>
                <el-table-column prop="now_class_name" label="现班级" align="center"> </el-table-column>
                <el-table-column prop="original_grade" label="原年级" align="center"> </el-table-column>
                <el-table-column prop="original_class" label="原班级" align="center"> </el-table-column>
                <el-table-column label="操作" width="150" align="center">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" content="删除" placement="top"
                            ><el-link icon="iconfont icon-shanchu" :underline="false" @click="del(scope.row)"></el-link
                        ></el-tooltip>
                        <el-tooltip class="item" effect="dark" content="查看" placement="top"
                            ><el-link
                                icon="iconfont icon-chakanliebiao"
                                :underline="false"
                                @click="see(scope.row)"
                            ></el-link
                        ></el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="sizeChange"
                @current-change="currentChange"
                :current-page.sync="searchV.page"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="searchV.pageSize"
                layout="total, prev, pager, next, sizes"
                :total="total"
                background
                :pager-count="5"
            >
            </el-pagination>
        </div>
        <el-dialog :title="title" :visible.sync="dialogVisible" width="40%" @close="close">
            <el-form :model="form" label-width="80px" :rules="rules" ref="ruleForm">
                <div class="title">
                    <i class="el-icon-s-operation" style="fontSize:20px"></i>
                    <span>原班级</span>
                </div>
                <el-form-item label="学号" prop="student_account" v-show="title == '查看'">
                    <el-input v-model="form.student_account" disabled></el-input>
                </el-form-item>
                <el-form-item label="学号" prop="student_account" v-show="title == '新增'">
                    <el-input v-model="form.student_account" @change="getStudentInfo" clearable></el-input>
                </el-form-item>

                <el-form-item label="姓名" prop="student_name">
                    <el-input v-model="form.student_name" disabled></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="student_sex">
                    <el-input v-model="form.student_sex" disabled></el-input>
                </el-form-item>
                <el-form-item label="年级" prop="original_grade">
                    <el-input v-model="form.original_grade" disabled></el-input>
                </el-form-item>
                <el-form-item label="班级" prop="original_class">
                    <el-input v-model="form.original_class" disabled></el-input>
                </el-form-item>
                <div class="title">
                    <i class="el-icon-s-operation" style="fontSize:20px"></i>
                    <span>调整到</span>
                </div>
                <el-form-item label="年级" prop="now_grade_id" v-if="title == '查看'">
                    <el-select v-model="form.now_grade_id" filterable placeholder="请选择" disabled @change="classL">
                        <el-option v-for="item in gradeList" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="年级" prop="now_grade_id" v-else>
                    <el-select v-model="form.now_grade_id" filterable placeholder="请选择" clearable @change="classL">
                        <el-option v-for="item in gradeList" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="班级" prop="now_class_id" v-if="title == '查看'">
                    <el-select v-model="form.now_class_id" filterable placeholder="请选择" disabled>
                        <el-option v-for="item in classList" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="班级" prop="now_class_id" v-else>
                    <el-select v-model="form.now_class_id" filterable placeholder="请选择" clearable>
                        <el-option v-for="item in classList" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!-- <div class="title">
                    <i class="el-icon-s-operation" style="fontSize:20px"></i>
                    <span>调班事由</span>
                </div>
                <el-form-item label="事由" prop="reason">
                    <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.apply_uid"> </el-input>
                </el-form-item> -->
            </el-form>
            <span slot="footer" v-if="title == '新增'">
                <el-button type="primary" size="small" @click="submit(form)">保 存</el-button>
                <el-button size="small" @click="close(form)">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { getList, Del, studentInfo, getGrade, getClass, Add, getTemplate } from '@/api/apply'
import Cookies from 'js-cookie'
export default {
    data() {
        return {
            searchV: {
                id: '',
                pageSize: 10,
                page: 1,
                status: ''
            },
            form: {
                student_id: '',
                student_name: '',
                student_account: '',
                student_sex: '',
                original_campus: '',
                original_grade: '',
                original_class: '',
                now_grade_id: '',
                now_class_id: '',
                now_campus_id: 1,
                apply_uid: '',
                original_class_id: ''
            },
            rules: {
                student_account: [{ required: true, message: '请输入学号', trigger: 'blur' }],
                now_grade_id: [{ required: true, message: '请选择年级', trigger: 'change' }],
                now_class_id: [{ required: true, message: '请选择班级', trigger: 'change' }]
            },
            headers: {
                token: Cookies.get('token')
            },
            gradeList: [],
            classList: [],
            dialogVisible: false,
            title: '',
            loading: false,
            treeData: [],
            total: 1000,
            tableData: []
        }
    },

    created() {
        this.getListData()
        this.getGradeList()
    },

    methods: {
        //获取列表
        getListData() {
            this.loading = true
            getList(this.searchV).then(res => {
                if (res.code == 200) {
                    this.tableData = res.data.data
                    this.total = res.data.total
                    this.loading = false
                }
            })
        },
        //新增
        add() {
            this.dialogVisible = true
            this.title = '新增'
            let user = JSON.parse(Cookies.get('user'))
            this.form.apply_uid = user.id
        },
        submit() {
            if (this.title == '新增') {
                this.$refs['ruleForm'].validate(valid => {
                    if (valid) {
                        Add(this.form).then(res => {
                            if (res.code == 200) {
                                this.$message.success('新增成功')
                                this.dialogVisible = false
                                this.form = {}
                                this.getListData()
                            } else {
                                this.$message.info('新增失败')
                            }
                        })
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })
            }
        },
        //获取学生信息
        getStudentInfo() {
            studentInfo({ account: this.form.student_account }).then(res => {
                if (res.code == 200) {
                    this.$set(this.form, 'student_name', res.data.real_name)
                    this.$set(this.form, 'student_sex', res.data.sex)
                    this.$set(this.form, 'original_grade', res.data.grade_name)
                    this.$set(this.form, 'original_class', res.data.class_name)
                    this.$set(this.form, 'student_id', res.data.id)
                    this.$set(this.form, 'original_campus', res.data.campus_name)
                    this.$set(this.form, 'original_class_id', res.data.class_id)
                }
            })
        },
        classL() {
            this.getClassList()
        },
        //获取年级列表
        getGradeList() {
            let user = JSON.parse(Cookies.get('user'))
            getGrade({ id: user.campus_id }).then(res => {
                if (res.code == 200) {
                    let obj = res.data
                    this.gradeList = [].concat.apply([], Object.values(obj))
                }
            })
        },
        //获取年级列表
        getClassList() {
            getClass({ id: this.form.now_grade_id }).then(res => {
                if (res.code == 200) {
                    this.classList = res.data
                }
            })
        },
        //批量导入
        daoru(res, file, fileList) {
            if (res.code == 200) {
                this.searchV.page = 1
                this.getListData()
                this.$message.success(res.msg)
            }
        },
        //模板下载
        download() {
            getTemplate().then(res => {
                const blob = new Blob([res], {
                    type: 'application/vnd.ms-excel;charset=utf-8'
                })
                const fileName = '调班导入模板.xlsx'
                const elink = document.createElement('a')
                elink.download = fileName
                elink.style.display = 'none'
                elink.href = URL.createObjectURL(blob)
                document.body.appendChild(elink)
                elink.click()
                URL.revokeObjectURL(elink.href) // 释放URL 对象
                document.body.removeChild(elink)
            })
        },
        see(row) {
            this.title = '查看'
            this.dialogVisible = true
            this.form = { ...row }
            this.getClassList()
        },

        //删除
        del(row) {
            this.$confirm('确认要删除数据？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    Del({ id: row.id }).then(res => {
                        if (res.code == 200) {
                            this.$message.success('删除成功')
                            this.getListData()
                        }
                    })
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
        },
        // 查询
        search() {
            this.getListData()
        },

        close() {
            this.dialogVisible = false
            this.getListData()
            this.form = {}
            this.$refs['ruleForm'].resetFields()
        },

        sizeChange(val) {
            this.searchV.pageSize = val
            this.searchV.page = 1
            this.getListData()
        },

        currentChange(val) {
            this.searchV.page = val
            this.getListData()
        }
    }
}
</script>
<style lang="scss" scoped>
.content {
    min-height: 100%;
    display: flex;
    .right {
        flex: 1;
        background-color: #fff;
        border-radius: 8px;
        padding: 1% 1%;
        overflow: auto;
        .btn {
            margin-bottom: 20px;
            display: flex;
            align-items: center;
        }
    }
}
.el-select {
    width: 100%;
}
.el-cascader {
    width: 100%;
}
.title {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    span {
        margin-left: 8px;
        font-family: PingFangSC-Regular;
        font-size: 18px;
        color: #4a4a4a;
    }
}
</style>
