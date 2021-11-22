<template>
    <div class="navbar">
        <div class="logo">智慧校园管理系统</div>
        <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
        <div class="right-menu">
            <div class="avatar-container">
                <div class="avatar-wrapper">
                    <img src="../../assets/index_images/avatar.png" class="user-avatar" />
                </div>
            </div>
            <div class="name">{{ user.real_name }}，欢迎您！</div>
            <el-dropdown trigger="click" size="default" type="primary">
                <span class="el-dropdown-link">
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown" class="user-dropdown">
                    <el-dropdown-item>修改密码</el-dropdown-item>
                    <el-dropdown-item>后台管理</el-dropdown-item>
                    <el-dropdown-item>个人信息</el-dropdown-item>
                    <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-divider direction="vertical"></el-divider>
            <div class="backIndex" @click="backHome"><span>我的桌面</span></div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { parseTime } from '@/utils/index'
import { getWeather } from '@/api/login'
import Cookies from 'js-cookie'
import { getType, getApp } from '@/api/index'

export default {
    data() {
        return {
            user: {},
            city: '合肥',
            showTime: '2021年6月15日 星期四',
            weather: '晴 25/28℃',
            dialogVisible: false,
            activeIndex: '0',
            typeList: [],
            appList: [],
            radio: Cookies.get('skin')
        }
    },
    components: {
        Breadcrumb,
        Hamburger
    },
    computed: {
        ...mapGetters(['sidebar', 'avatar', 'skin'])
    },
    methods: {
        toggleSideBar() {
            this.$store.dispatch('app/toggleSideBar')
        },
        logout() {
            this.$store.dispatch('user/logout')
            this.$router.push(`/login?redirect=${this.$route.fullPath}`)
        },
        backHome() {
            if (Cookies.get('skin') == 'dark') {
                window.open('http://47.96.171.165:9006/#/indexD', '_self')
            } else {
                window.open('http://47.96.171.165:9006/#/indexL', '_self')
            }
        }
    },
    created() {
        this.user = JSON.parse(Cookies.get('user'))
    }
}
</script>

<style lang="scss" scoped>
.navbar {
    height: 60px;
    line-height: 60px;
    position: relative;
    background: $base-color;
    padding-right: 30px;
    box-shadow: 0px 2px 9px 2px rgba(0, 0, 0, 0.18);
    .hamburger-container {
        line-height: 60px;
        height: 100%;
        float: left;
        cursor: pointer;
        transition: background 0.3s;
        -webkit-tap-highlight-color: transparent;

        &:hover {
            background: rgba(0, 0, 0, 0.025);
        }
    }

    .breadcrumb-container {
        float: left;
    }
    .logo {
        float: left;
        height: 100%;
        padding: 0 12px;
        font-size: 22px;
        color: #fff;
        // background-image: url('../../assets/index_images/logo.png');
        background-repeat: no-repeat;
        background-size: 100%;
        background-position-y: center;
    }
    .nav {
        display: inline-block;
        margin-left: 90px;
        .el-menu {
            background-color: unset;
            .el-menu-item {
                color: #fff;
                height: 50px;
                line-height: 60px;
                padding: 0 10px;
                &:hover {
                    background-color: unset !important;
                }
                &:focus {
                    background-color: unset !important;
                }
            }
            .el-submenu {
                padding: 0 10px;
                ::v-deep .el-submenu__title {
                    color: #fff;
                    height: 50px;
                    line-height: 60px;
                    padding: unset;
                    i {
                        display: none;
                    }
                    &:hover {
                        background-color: unset !important;
                    }
                }
                ::v-deep .el-menu--horizontal {
                    .el-menu--popup {
                        min-width: unset;
                        margin-top: 0;
                        .el-menu-item {
                            color: #000;
                            height: 30px;
                            line-height: 30px;
                            min-width: 76px;
                        }
                    }
                }
            }
            .is-active {
                border-bottom: 2px solid #fff;
            }
        }
    }
    .right-menu {
        float: right;
        height: 100%;
        line-height: 60px;
        display: flex;
        &:focus {
            outline: none;
        }

        .right-menu-item {
            display: inline-block;
            padding: 0 8px;
            height: 100%;
            font-size: 18px;
            color: #5a5e66;
            vertical-align: text-bottom;

            &.hover-effect {
                cursor: pointer;
                transition: background 0.3s;

                &:hover {
                    background: rgba(0, 0, 0, 0.025);
                }
            }
        }

        .avatar-container {
            margin-right: 9px;
            .avatar-wrapper {
                .user-avatar {
                    width: 35px;
                    height: 35px;
                    border-radius: 10px;
                    vertical-align: middle;
                }

                .el-icon-caret-bottom {
                    position: absolute;
                    right: -20px;
                    top: 25px;
                    font-size: 12px;
                }
            }
        }
        .el-dropdown {
            i {
                color: #fff;
                cursor: pointer;
            }
        }
        .name {
            color: #fff;
            font-size: 15px;
        }
        .el-divider {
            width: 2px;
            height: 20px;
            margin: auto 15px;
        }
        .weather {
            width: 140px;
            div {
                color: #fff;
                font-size: 13px;
                line-height: 25px;
                text-align: center;
            }
        }
        .skin {
            width: 17px;
            height: 17px;
            margin: auto;
            background-image: url('../../assets/index_images/skin.png');
            background-repeat: no-repeat;
            background-size: 100%;
            cursor: pointer;
        }
        .backIndex {
            color: #fff;
            font-size: 15px;
            span {
                cursor: pointer;
            }
        }
    }
}
</style>
<style lang="scss">
.navbarL {
    .el-dialog {
        background: $base-color;
        border-radius: 20px;
        border: 1px solid rgba(255, 255, 255, 0.3);
        .el-dialog__header {
            padding: 0 20px;
            line-height: 46px;
            border-bottom: 1px solid #d8d8d8;
            .el-dialog__title {
                color: #fff;
                font-size: 16px;
            }
            .el-dialog__headerbtn {
                top: 15px;
                i {
                    color: #fff;
                }
            }
        }
        .el-dialog__body {
            background-color: #fff;
            .window {
                display: flex;
                justify-content: space-around;
                .dark,
                .light,
                .green {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 30%;
                    height: 160px;
                    img {
                        width: 100%;
                        margin-bottom: 20px;
                    }
                    .el-radio__inner {
                        border: 1px solid #d8d8d8;
                    }
                    .el-radio__label {
                        font-size: 16px;
                    }
                }
            }
        }
        .el-dialog__footer {
            background-color: #fff;
            border-radius: 0 0 20px 20px;
        }
    }
}
</style>
