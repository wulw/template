<!--
 * @Description: Do not edit
 * @Author: 前端劝退师-李逍遥
 * @Date: 2021-09-15 09:24:01
 * @LastEditors: 前端劝退师-李逍遥
 * @LastEditTime: 2021-10-22 10:56:39
 * @FilePath: \changeshift\src\views\changeshift-management\process.vue
-->
<template>
    <div class="content">
        <div class="btn">
            <el-button size="small" type="primary" @click="add">新增</el-button>
            <el-button size="small" @click="del">删除</el-button>
        </div>
        <el-table
            :data="tableData"
            stripe
            style="width: 100%"
            fit
            @selection-change="handleSelectionChange"
            v-loading="loading"
        >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column type="index" label="序号" align="center"> </el-table-column>
            <el-table-column prop="name" label="项目名称" align="center"> </el-table-column>
            <el-table-column prop="type_name" label="流程类型" align="center"> </el-table-column>
            <el-table-column label="操作" width="150" align="center">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" content="编辑" placement="top"
                        ><el-link icon="iconfont icon-bianji1" :underline="false" @click="edit(scope.row)"></el-link
                    ></el-tooltip>
                    <el-switch
                        v-model="scope.row.is_use"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        :active-value="1"
                        :inactive-value="2"
                        @change="use(scope.row)"
                    >
                    </el-switch>
                    <!-- <el-button type="text" v-if="scope.row.is_use == 2" size="small" @click="use(scope.row)"
                        >启用</el-button
                    >
                    <el-button type="text" v-else size="small" @click="use(scope.row)">关闭</el-button> -->
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="sizeChange"
            @current-change="currentChange"
            :current-page.sync="seachV.page"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="seachV.pageSize"
            layout="total, prev, pager, next, sizes"
            :total="total"
            background
            :pager-count="5"
        >
        </el-pagination>
        <!-- 新增流程 -->
        <el-dialog :title="title" :visible.sync="dialogVisibleC" width="45%" @close="closeC">
            <el-form :model="formC" label-width="80px" :rules="rules" ref="formC">
                <el-form-item label="流程名称" prop="name">
                    <el-input v-model="formC.name" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="流程类型" prop="type">
                    <el-select v-model="formC.type" placeholder="请选择">
                        <el-option v-for="item in typeOptions" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="审核次数" prop="num">
                    <el-select v-model="formC.num" placeholder="请选择" @change="changeN">
                        <el-option v-for="item in timesOptions" :key="item.id" :label="item.num" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="审核人员1" prop="one_user">
                    <el-radio
                        v-model="formC.status"
                        label="1"
                        style="display:block;margin-top:12px;"
                        >班主任</el-radio
                    >
                    <el-radio
                        v-model="formC.status"
                        label="2"
                        style="display:block;margin-top:12px;"
                    >
                        <el-cascader
                            v-if="formC.status == 1"
                            v-model="formC.one_user"
                            :options="deptOptionsOne"
                            :props="SetKesDeptOne"
                            :show-all-levels="false"
                            @change="deptChange"
                            clearable
                            filterable
                            disabled
                        ></el-cascader>
                        <el-cascader
                            v-else
                            v-model="formC.one_user"
                            :options="deptOptionsOne"
                            :props="SetKesDeptOne"
                            :show-all-levels="false"
                            @change="deptChange"
                            clearable
                            filterable
                        ></el-cascader>
                    </el-radio>
                </el-form-item>
                <el-form-item label="审核人员2" v-if="formC.num != 1" prop="two_user">
                    <el-cascader
                        class="choose"
                        v-model="formC.two_user"
                        :options="deptOptionsOne"
                        :props="SetKesDeptOne"
                        :show-all-levels="false"
                        @change="deptChange"
                        clearable
                        filterable
                    ></el-cascader>
                </el-form-item>
                <el-form-item label="审核人员3" v-if="formC.num == 3" prop="three_user">
                    <el-cascader
                        class="choose"
                        v-model="formC.three_user"
                        :options="deptOptionsOne"
                        :props="SetKesDeptOne"
                        :show-all-levels="false"
                        @change="deptChange"
                        clearable
                        filterable
                    ></el-cascader>
                </el-form-item>
                <el-form-item label="抄送人员" prop="copy_user">
                    <el-cascader
                        class="choose"
                        v-model="formC.copy_user"
                        :options="deptOptions"
                        :props="SetKesDept"
                        :show-all-levels="false"
                        @change="deptChange"
                        clearable
                        filterable
                    ></el-cascader>
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button type="primary" size="small" @click="submit(formC)">保 存</el-button>
                <el-button size="small" @click="closeC">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { getList, bankSet, Del, Add, getWorkers, getTeacherTree, getLeader, Edit,Use } from '@/api/process'
export default {
    data() {
        return {
            seachV: {
                search: '',
                pageSize: 10,
                page: 1
            },
            loading: false,
            treeData: [],
            deptOptions: [],
            total: 1000,
            tableData: [],
            dialogVisible: false,
            dialogVisibleC: false,
            title: '',
            ids: '',
            deptOptions: [],
            multipleSelection: [],
            typeOptions: [
                { id: 1, name: '普通' },
                { id: 2, name: '重要' }
                // { id: 3, name: '紧急' }
            ],
            radio: '',
            peopleOptions: [],
            deptOptionsOne: [],
            SetKesDeptOne: {
                value: 'id',
                label: 'name',
                children: 'child',
                emitPath: false
            },
            SetKesDept: {
                value: 'id',
                label: 'name',
                children: 'child',
                multiple: true,
                emitPath: false
            }, //自定义  级联选择器value label(多选)
            timesOptions: [
                { id: 1, num: '1' },
                { id: 2, num: '2' },
                { id: 3, num: '3' }
            ],
            formC: {
                status: '',
                name: '',
                type: '',
                num: 1,
                one_user: '',
                two_user: '',
                three_user: '',
                copy_user: '',
            },
            rules: {
                name: [{ required: true, message: '请输入流程名称', trigger: 'blur' }],
                type: [{ required: true, message: '请选择类型', trigger: 'change' }],
                num: [{ required: true, message: '请选择次数', trigger: 'change' }],
                // one_user: [{ required: true, message: '请选择审批人', trigger: 'change' }],
                two_user: [{ required: true, message: '请选择审批人2', trigger: 'change' }],
                three_user: [{ required: true, message: '请选择审批人3', trigger: 'change' }],
                copy_user: [{ required: true, message: '请选择抄送人', trigger: 'change' }]
            },
            orgIdData: {
                school_id: '',
                campus_id: '',
                dept_id: '',
                people_id: ''
            }
        }
    },

    created() {
        this.getListData()
        this.getWorkList()
    },

    methods: {
        //获取列表
        getListData() {
            this.loading = true
            getList(this.seachV).then(res => {
                if (res.code == 200) {
                    this.tableData = res.data.data
                    this.total = res.data.total
                    this.loading = false
                }
            })
        },

        //获取员工
        getWorkList() {
            getWorkers().then(res => {
                if (res.code == 200) {
                    this.peopleOptions = res.data.data
                    var arr = []
                    var keyMap = { real_name: 'name' }
                    this.peopleOptions.forEach(item => {
                        var objs = Object.keys(item).reduce((newData, key) => {
                            let newKey = keyMap[key] || key
                            newData[newKey] = item[key]
                            return newData
                        }, {})
                        arr.push(objs)
                    })
                    this.peopleOptions = arr
                    //职工树
                    getTeacherTree().then(res => {
                        if (res.code == 200) {
                            var test = res.data
                            for (var i = 0; i < test.length; i++) {
                                for (var j = 0; j < test[i].child.length; j++) {
                                    this.deptOptions.push(test[i].child[j])
                                }
                            }
                            for (var i = 0; i < this.deptOptions.length; i++) {
                                for (var j = 0; j < this.deptOptions[i].child.length; j++) {
                                    for (var k = 0; k < this.deptOptions[i].child[j].child.length; k++) {
                                        for (var h = 0; h < this.peopleOptions.length; h++) {
                                            if (
                                                this.peopleOptions[h].dept_id ==
                                                this.deptOptions[i].child[j].child[k].id
                                            ) {
                                                this.deptOptions[i].child[j].child[k].child.push(this.peopleOptions[h])
                                            }
                                        }
                                    }
                                }
                            }
                            this.deptOptionsOne = this.deptOptions
                        }
                    })
                } else {
                    this.$message.error(res.msg)
                }
            })
        },

        //部门
        deptChange(val) {
            console.log('dept', val)
            if (val) {
                this.orgIdData.school_id = val[0]
                this.orgIdData.campus_id = val[1]
                this.orgIdData.dept_id = val[2]
                if (val[3]) {
                    this.orgIdData.people_id = val[3]
                }
            }
        },

        // 开户行设置

        // 新增
        add() {
            this.dialogVisibleC = true
            this.title = '新增'
        },

        edit(row) {
            this.dialogVisibleC = true
            this.title = '编辑'
            this.formC = { ...row }
            this.formC.status = String(row.status)
            this.formC.copy_user = this.formC.copy_user.split(',')
            console.log(this.formC.copy_user)
        },

        submit() {
            if (this.title == '新增') {
                if (this.formC.status == 1) {
                   delete this.formC.one_user
                }
                this.$refs['formC'].validate(valid => {
                    if (valid) {
                        this.formC.copy_user = this.formC.copy_user.toString()
                        Add(this.formC).then(res => {
                            if (res.code == 200) {
                                this.$message.success('新增成功')
                                this.dialogVisibleC = false
                                this.formC = {}
                                this.formC.num = 1
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
            } else {
                if (this.formC.status == 1) {
                   delete this.formC.one_user
                }
                this.$refs['formC'].validate(valid => {
                    if (valid) {
                        this.formC.copy_user = this.formC.copy_user.toString()
                        delete this.formC.create_at
                        delete this.formC.update_at
                        Edit(this.formC).then(res => {
                            if (res.code == 200) {
                                this.$message.success('新增成功')
                                this.dialogVisibleC = false
                                this.formC = {}
                                this.formC.num = 1
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

        changeN(e) {
            if (e == 2) {
                this.formC.three_user = ''
            }
            if (e == 1) {
                this.formC.two_user = ''
                this.formC.three_user = ''
            }
        },

        // 启用
        use(row) {
            Use({ id: row.id, is_use: row.is_use }).then(res => {
                if (res.code == 200) {
                    this.$message.success('操作成功')
                    this.getListData()
                }else{
                    this.getListData()
                }
            })
        },

        // 删除
        del() {
            if (this.multipleSelection.length == 0) {
                this.$message.warning('请选择需要删除的数据')
                return
            }
            this.$confirm('确认要删除数据？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    Del({ id: this.ids }).then(res => {
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
        // 组织树
        teacherTree() {
            getTeacherTree().then(res => {
                this.treeData = res.data
                var test = res.data
                for (var i = 0; i < test.length; i++) {
                    for (var j = 0; j < test[i].child.length; j++) {
                        this.deptOptions.push(test[i].child[j])
                    }
                }
                console.log('deptOptions', this.deptOptions)
                for (var i = 0; i < this.deptOptions.length; i++) {
                    for (var j = 0; j < this.deptOptions[i].child.length; j++) {
                        for (var k = 0; k < this.deptOptions[i].child[j].child.length; k++) {
                            this.deptOptions[i].child[j].child[k].child = undefined
                        }
                    }
                }
                console.log('dept', this.deptOptions)
            })
        },

        closeC() {
            this.dialogVisibleC = false
            this.formC = {
                status: '',
                name: '',
                type: '',
                num: 1,
                one_user: '',
                two_user: '',
                three_user: '',
                copy_user: '',
                is_use: '1'
            }
            this.$refs['formC'].resetFields()
            // this.formC.num = '1'
            this.teacherform = {}
            this.getListData()
        },

        sizeChange(val) {
            this.seachV.pageSize = val
            this.seachV.page = 1
            this.getListData()
        },

        currentChange(val) {
            this.seachV.page = val
            this.getListData()
        },

        handleSelectionChange(val) {
            this.multipleSelection = val
            let arr = []
            this.multipleSelection.map(el => {
                return arr.push(el.id)
            })
            this.ids = arr.toString()
        }
    }
}
</script>
<style lang="scss" scoped>
.content {
    height: 100%;
    background-color: #fff;
    padding: 1%;
    border-radius: 8px;
    border-radius: 8px;
    .btn {
        margin-bottom: 20px;
        display: flex;
    }
    .btns {
        margin-bottom: 20px;
    }
}
.el-select {
    width: 100%;
}
.el-cascader {
    width: calc(100% - 24px);
}
::v-deep.el-radio__inner {
    width: 14px;
    height: 14px;
}
::v-deep.el-radio__label {
    padding-left: 10px;
}
::v-deep.el-dialog__footer {
    padding-bottom: 110px;
}
::v-deep.el-form .el-form-item__label {
    width: 100px !important;
}
::v-deep.el-form .el-form-item__content {
    margin-left: 100px !important;
}
.choose {
    width: 100%;
}
</style>
