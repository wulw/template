<template>
    <div class="login-container">
        <div class="login-logo"></div>
        <div class="login-time">
            <div class="time">{{ showTime }}</div>
            <div class="verson">{{ '版本号：' + version }}</div>
        </div>
        <el-form ref="loginForm" :model="loginForm" class="login-form" auto-complete="on" label-position="left">
            <div class="form-sanjiao"></div>
            <div class="code"></div>
            <div class="tip">扫码登录</div>
            <div class="weather">{{ city }}市 {{ weather }}</div>
            <el-form-item prop="account">
                <span class="svg-account"> </span>
                <el-input
                    v-model="loginForm.account"
                    type="text"
                    tabindex="1"
                    placeholder="账号/手机号"
                    size="mini"
                    maxlength="18"
                />
            </el-form-item>
            <el-form-item prop="password">
                <span class="svg-pwd"> </span>
                <el-input
                    v-model="loginForm.password"
                    type="password"
                    tabindex="2"
                    placeholder="密码"
                    maxlength="18"
                    @keyup.enter.native="handleLogin"
                />
            </el-form-item>
            <el-checkbox v-model="checked" class="remember" style="color:#fff;font-size:15px;margin-bottom:20px"
                >记住密码</el-checkbox
            >
            <div class="tips">账号不存在，请联系<span>管理员</span>开通！</div>
            <el-button
                :loading="loading"
                type="primary"
                class="loginBtn"
                style="width:100%;margin-bottom:10px;font-size:16px"
                @click.native.prevent="handleLogin"
                >登 录</el-button
            >
            <div class="toolbar">
                <span class="face">人脸登录</span>
                <span class="reset">重置密码</span>
            </div>
            <div class="open">
                建议使用：
                <span class="google">谷歌</span>
                <span class="firefox">火狐</span>
                <span class="qq">QQ浏览器</span>
                <span class="liumang">360浏览器</span>
            </div>
        </el-form>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { parseTime } from '@/utils/index'
import { getWeather, login, getInfo } from '@/api/login'
import Cookies from 'js-cookie'
import { setToken } from '@/utils/auth'

export default {
    name: 'Login',
    data() {
        return {
            loginForm: {
                account: '',
                password: ''
            },
            loading: false,
            // redirect: undefined,
            city: '合肥',
            weather: '',
            showTime: '',
            version: 'Smart Campus V5.0',
            checked: false
        }
    },
    computed: {
        ...mapGetters(['sidebar', 'avatar', 'skin'])
    },
    // watch: {
    //     $route: {
    //         handler: function(route) {
    //             this.redirect = route.query && route.query.redirect
    //         },
    //         immediate: true
    //     }
    // },
    created() {
        getWeather({
            city: this.city
        }).then(res => {
            if (res.code == 200) {
                this.weather = res.data.temperature + ' ' + res.data.weather
            }
        })
        setInterval(() => {
            this.showTime = parseTime(new Date().getTime(), '{y}年{m}月{d}日 {h}:{i}:{s} 星期{a}')
        }, 1000)
    },
    mounted() {
        if (Cookies.get('_n') && Cookies.get('_m')) {
            this.loginForm = {
                account: window.atob(Cookies.get('_n')),
                password: window.atob(Cookies.get('_m'))
            }
            this.checked = true
            this.loginApi()
        }
    },
    methods: {
        handleLogin() {
            if (this.loginForm.account != '' && this.loginForm.password != '') {
                this.loading = true
                if (this.checked) {
                    Cookies.set('_n', window.btoa(this.loginForm.account), {
                        expires: 7
                    })
                    Cookies.set('_m', window.btoa(this.loginForm.password), {
                        expires: 7
                    })
                } else {
                    Cookies.remove('_n')
                    Cookies.remove('_m')
                }
                this.loginApi()
            } else {
                this.$message.warning('请输入账号和密码！')
            }
        },
        async loginApi() {
            await login(this.loginForm).then(async res => {
                if (res.code == 200) {
                    this.$message.success('登录成功')
                    this.loading = false
                    await Cookies.set('token', res.data.user.token)
                    await this.$store.dispatch('user/setToken', res.data.user.token)
                    await this.$store.dispatch('skin/changeSkin', res.data.user.style)
                    await getInfo({ id: res.data.user.id, type: res.data.user.type }).then(resUser => {
                        Cookies.set('user', JSON.stringify(resUser.data))
                    })
                    location.reload()
                } else {
                    this.$message.error('登录失败')
                    this.loading = false
                }
            })
        }
    }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #4683ce;
$light_gray: #fff;
$cursor: #20a3f5;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
        color: $cursor;
    }
}

/* reset element-ui css */
.login-container {
    .el-input {
        display: inline-block;
        width: unset !important;

        // height: 47px;
        // width: 85%;
        .el-input__inner::-webkit-input-placeholder {
            color: #fff;
            font-size: 16px;
        }

        .el-input__inner:-moz-placeholder {
            color: #fff;
            font-size: 16px;
        }

        .el-input__inner:-ms-input-placeholder {
            color: #fff;
            font-size: 16px;
        }

        input {
            background: transparent;
            border: 0px;
            -webkit-appearance: none;
            border-radius: 0px;
            padding: 12px 5px 12px 10px;
            color: $light_gray;
            caret-color: $cursor;
            font-size: 16px;

            &:-webkit-autofill,
            &:-webkit-autofill:hover,
            &:-webkit-autofill:focus,
            &:-webkit-autofill:active {
                -webkit-transition-delay: 99999s;
                -webkit-transition: color 99999s ease-out, background-color 99999s ease-out;
            }
        }
    }

    .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #454545;
    }

    .el-checkbox__inner {
        border: 2.5px solid rgb(25, 102, 168);
        background-color: rgba(25, 102, 168, 0.5);

        &::after {
            top: -0.5px;
            left: 2px;
        }
    }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
    padding-top: 20px;
    min-height: 100%;
    width: 100%;
    background-image: url('../../assets/login_images/bg.png');
    background-size: 100%;
    background-repeat: no-repeat;
    overflow: hidden;
    position: relative;

    .login-logo {
        display: inline-block;
        width: 300px;
        height: 50px;
        margin-left: 150px;
        background-image: url('../../assets/login_images/logo.png');
        background-size: auto 100%;
        background-repeat: no-repeat;
    }

    .login-time {
        float: right;
        width: 300px;
        height: 50px;
        margin-right: 150px;
        color: #fff;
        text-align: right;

        .time {
            line-height: 25px;
        }

        .verson {
            font-size: 10px;
            line-height: 25px;
        }
    }

    .login-form {
        background-image: url('../../assets/login_images/border.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        position: absolute;
        width: 400px;
        top: 200px;
        right: 200px;
        height: 400px;
        padding: 0 45px;

        .el-form-item {
            border-radius: unset;
            border: 2.5px solid rgb(25, 102, 168);
            background-color: rgba(25, 102, 168, 0.5);
            margin-bottom: 15px;
        }

        .form-sanjiao {
            width: 0;
            height: 0;
            border-top: 80px solid #20a3f5;
            border-left: 80px solid transparent;
            position: absolute;
            top: 1px;
            right: 2px;
            cursor: pointer;
        }

        .code {
            position: absolute;
            top: 0;
            right: 0;
            width: 30px;
            height: 30px;
            background-image: url('../../assets/login_images/code.png');
            background-size: 100% 100%;
            background-repeat: no-repeat;
            transform: translate(-35%, 35%);
            cursor: pointer;
        }

        .tip {
            position: absolute;
            top: 20px;
            right: 60px;
            width: 80px;
            height: 25px;
            line-height: 25px;
            font-size: 13px;
            text-align: center;
            color: #fff;
            background-image: url('../../assets/login_images/tips.png');
            background-repeat: no-repeat;
            background-size: 100% 100%;
        }

        .weather {
            color: #fff;
            font-size: 16px;
            line-height: 50px;
            margin-bottom: 40px;
        }
    }

    .tips {
        color: #fff;
        margin-bottom: 10px;
        font-size: 15px;

        span {
            color: #20a3f5;
        }
    }

    .toolbar {
        font-size: 15px;
        color: #fff;

        .face {
            text-align: left;
        }

        .reset {
            float: right;
        }
    }

    .open {
        color: #fff;
        font-size: 10px;
        line-height: 20px;
        position: absolute;
        bottom: 5px;

        span {
            padding-left: 15px;
            padding-right: 5px;
            background-repeat: no-repeat;
            background-size: 13px 13px;
        }

        .google {
            background-image: url('../../assets/login_images/google.png');
        }

        .firefox {
            background-image: url('../../assets/login_images/firefox.png');
        }

        .qq {
            background-image: url('../../assets/login_images/qq.png');
        }

        .liumang {
            background-image: url('../../assets/login_images/360.png');
        }
    }

    .svg-account {
        background-image: url('../../assets/login_images/account.png');
    }

    .svg-pwd {
        background-image: url('../../assets/login_images/password.png');
    }

    .svg-account,
    .svg-pwd {
        display: inline-block;
        width: 17px;
        height: 17px;
        margin-left: 10px;
        transform: translateY(25%);
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
}
</style>
