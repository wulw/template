<!--
 * @Description: Do not edit
 * @Author: 前端劝退师-李逍遥
 * @Date: 2021-09-15 09:24:01
 * @LastEditors: 前端劝退师-李逍遥
 * @LastEditTime: 2021-10-22 11:56:26
 * @FilePath: \changeshift\src\views\changeshift-management\record.vue
-->
<template>
    <div class="content">
        <div class="right">
            <div class="btn" v-if="type==1">
                <el-input v-model="searchV.name" placeholder="请输入学生姓名/学号" size="small"></el-input>
                <el-button type="primary" size="small" @click="search">查询</el-button>
                <el-button type="primary" size="small" @click="delAll">批量删除</el-button>
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
                <el-table-column prop="now_class_name" label="现年级" align="center"> </el-table-column>
                <el-table-column prop="original_grade" label="原年级" align="center"> </el-table-column>
                <el-table-column prop="original_class" label="原班级" align="center"> </el-table-column>
                <el-table-column prop="status_name" label="状态" align="center"> </el-table-column>
                <el-table-column prop="create_at" label="调整时间" align="center"> </el-table-column>
                <el-table-column label="操作" width="150" align="center">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" content="删除" placement="top" v-if="type==1"
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
        <el-dialog :title="title" :visible.sync="dialogVisible" width="33%" @close="close">
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
                    <img src="../../assets/index_images/pass.png" alt="" class="pass" v-if="info.status == 1" />
                    <img src="../../assets/index_images/no.png" alt="" class="pass" v-if="info.status == 2" />
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
            <div class="dialog-foot" v-if="info.refuse">
                <div class="left">
                    <div class="title">
                        <i class="el-icon-s-operation" style="fontSize:20px"></i>
                        <span>审核意见</span>
                    </div>
                    <div class="refuse">
                        {{ info.refuse }}
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { getList, Del } from '@/api/record'
import Cookies from 'js-cookie'
export default {
    data() {
        return {
            searchV: {
                name: '',
                pageSize: 10,
                page: 1,
                type: '',
                student_id: ''
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
            multipleSelection: [],
            dialogVisible: false,
            title: '',
            id: '',
            loading: false,
            treeData: [],
            total: 1000,
            tableData: [],
            type:''
        }
    },

    created() {
        this.getListData()
        let user = JSON.parse(Cookies.get('user'))
        this.type = user.type
    },

    methods: {
        //获取列表
        getListData() {
            this.loading = true
            let user = JSON.parse(Cookies.get('user'))
            this.searchV.type = user.type
            if (this.searchV.type == 2) {
                this.searchV.student_id = user.id
            }
            getList(this.searchV).then(res => {
                if (res.code == 200) {
                    this.tableData = res.data.data
                    this.total = res.data.total
                    this.loading = false
                }
            })
        },
        //查看
        see(row) {
            this.dialogVisible = true
            this.title = '查看'
            this.info = { ...row }
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
            .el-input {
                width: unset;
                margin-right: 8px;
            }
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
        position: relative;
        img {
            width: 138px;
            height: 179px;
        }
        .pass {
            position: absolute;
            width: 72px;
            height: 72px;
            right: -36px;
            top: -8px;
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
.dialog-foot {
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
        .refuse {
            margin-left: 6%;
            font-size: 18px;
            margin-top: 14px;
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
