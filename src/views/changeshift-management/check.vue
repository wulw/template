<!--
 * @Description: Do not edit
 * @Author: 前端劝退师-李逍遥
 * @Date: 2021-09-15 09:24:01
 * @LastEditors: 前端劝退师-李逍遥
 * @LastEditTime: 2021-10-22 10:54:29
 * @FilePath: \changeshift\src\views\changeshift-management\check.vue
-->
<template>
    <div class="content">
        <div class="right">
            <div class="btn">
                <el-button size="small" @click="delAll">批量删除</el-button>
            </div>
            <el-table
                :data="tableData"
                stripe
                style="width: 100%"
                fit
                v-loading="loading"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55"> </el-table-column>
                <el-table-column prop="student_account" label="学号" align="center"> </el-table-column>
                <el-table-column prop="student_name" label="姓名" align="center"> </el-table-column>
                <el-table-column prop="student_sex" label="性别" align="center"> </el-table-column>
                <el-table-column prop="now_grade_name" label="现年级" align="center"> </el-table-column>
                <el-table-column prop="now_class_name" label="现班级" align="center"> </el-table-column>
                <el-table-column prop="original_grade" label="原年级" align="center"> </el-table-column>
                <el-table-column prop="original_class" label="原班级" align="center"> </el-table-column>
                <el-table-column prop="status_name" label="状态" align="center"> </el-table-column>
                <el-table-column label="操作" width="150" align="center">
                    <template slot-scope="scope">
                        <el-tooltip
                            class="item"
                            effect="dark"
                            content="审核"
                            placement="top"
                            v-if="scope.row.status_name == '审核中'"
                            ><el-link icon="iconfont icon-shenhe" :underline="false" @click="check(scope.row)"></el-link
                        ></el-tooltip>
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
        <el-dialog :title="title" :visible.sync="dialogVisible" width="28%" @close="close">
            <div class="dialog-head">
                <div class="left">
                    <div class="title">
                        <i class="el-icon-s-operation" style="fontSize:20px"></i>
                        <span>原班级</span>
                    </div>
                    <p>学号：{{ info.student_account }}</p>
                    <p>性别：{{ info.student_sex }}</p>
                    <p>年级：{{ info.original_grade }}</p>
                    <p>班级：{{ info.original_class }}</p>
                </div>
                <div class="img-wrap">
                    <img src="../../assets/index_images/4.jpg" alt="" />
                </div>
            </div>
            <div class="dialog-middle">
                <div class="left">
                    <div class="title">
                        <i class="el-icon-s-operation" style="fontSize:20px"></i>
                        <span>调整到</span>
                    </div>
                    <p>年级：{{ info.now_grade_name }}</p>
                    <p>班级：{{ info.now_class_name }}</p>
                </div>
                <div class="img-wrap"></div>
            </div>
            <div class="dialog-middle" v-if="title == '审核'">
                <div class="left">
                    <div class="title">
                        <i class="el-icon-s-operation" style="fontSize:20px"></i>
                        <span>审核意见</span>
                    </div>
                </div>
            </div>
            <el-form :model="form" label-width="80px" v-if="title == '审核'">
                <el-form-item label="审核结果">
                    <el-select v-model="form.status" placeholder="请选择">
                        <el-option v-for="item in checkOptions" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="审核意见" v-show="form.status == 2">
                    <el-input v-model="form.refuse"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button type="primary" size="small" @click="commit" v-if="title == '审核'">确认</el-button>
                <el-button size="small" @click="close">关闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { getList, Del, Check } from '@/api/check'
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
                id: '',
                status: '',
                refuse: ''
            },
            checkOptions: [
                { id: 1, name: '审核通过' },
                { id: 2, name: '不通过，拒绝' }
            ],
            info: {},
            id:'',
            multipleSelection:[],
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
        //批量导入
        daoru() {},
        //查看
        see(row) {
            this.dialogVisible = true
            this.title = '查看'
            this.info = { ...row }
        },
        //审核
        check(row) {
            this.dialogVisible = true
            this.title = '审核'
            this.info = { ...row }
            this.form.id = row.id
        },
        commit() {
            Check(this.form).then(res => {
                if (res.code == 200) {
                    this.$message.success('审核成功')
                    this.dialogVisible = false
                    this.form = {}
                    this.getListData()
                }
            })
        },
        //批量删除
        delAll() {
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
                    Del({ id: this.id }).then(res => {
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
        },

        handleSelectionChange(val) {
            this.multipleSelection = val
            let arr = []
            this.multipleSelection.map(el => {
                return arr.push(el.id)
            })
            this.id = arr.toString()
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
.dialog-head {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
        flex: 1;
        display: flex;
        flex-direction: column;
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
        p {
            margin-left: 8%;
        }
    }

    .img-wrap {
        width: 138px;
        height: 179px;
        margin-right: 5%;
        img {
            width: 138px;
            height: 179px;
        }
    }
}
.dialog-middle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
        flex: 1;
        display: flex;
        flex-direction: column;
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
        p {
            margin-left: 8%;
        }
    }
    .img-wrap {
        width: 138px;
        height: 179px;
        margin-right: 5%;
    }
}
::v-deep.el-form {
    margin-top: 4%;
}
</style>
