<template>
    <div :class="classObj" class="app-wrapper">
        <div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
        <div :class="{ 'fixed-header': fixedHeader }">
            <navbar />
        </div>

        <div class="main-container">
            <sidebar class="sidebar-container" />
            <app-main />
        </div>
    </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import Cookies from 'js-cookie'

export default {
    name: 'LayoutL',
    components: {
        Navbar,
        Sidebar,
        AppMain
    },
    mixins: [ResizeMixin],
    computed: {
        sidebar() {
            return this.$store.state.app.sidebar
        },
        device() {
            return this.$store.state.app.device
        },
        fixedHeader() {
            return this.$store.state.settings.fixedHeader
        },
        classObj() {
            return {
                hideSidebar: !this.sidebar.opened,
                openSidebar: this.sidebar.opened,
                withoutAnimation: this.sidebar.withoutAnimation,
                mobile: this.device === 'mobile'
            }
        }
    },
    methods: {
        handleClickOutside() {
            this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
        }
    },
    created() {
        if (Cookies.get('skin') == 'green') {
            console.log('green')
            document.getElementsByTagName('body')[0].style.setProperty('--baseColor', '#417505')
            document.getElementsByTagName('body')[0].style.setProperty('--baseFont', '#4a4a4a')
            document.getElementsByTagName('body')[0].style.setProperty('--activeFont', '#000')
            document.getElementsByTagName('body')[0].style.setProperty('--menuBg', '#fff')
            document.getElementsByTagName('body')[0].style.setProperty('--hbg', '#4175054d')
            document.getElementsByTagName('body')[0].style.setProperty('--subMenuBg', '#fff')
            document.getElementsByTagName('body')[0].style.setProperty('--borderColor', '#417505')
        } else if (Cookies.get('skin') == 'light') {
            console.log('light')
            document.getElementsByTagName('body')[0].style.setProperty('--baseColor', '#2a75da')
            document.getElementsByTagName('body')[0].style.setProperty('--baseFont', '#4a4a4a')
            document.getElementsByTagName('body')[0].style.setProperty('--activeFont', '#000')
            document.getElementsByTagName('body')[0].style.setProperty('--menuBg', '#fff')
            document.getElementsByTagName('body')[0].style.setProperty('--hbg', '#2a75da4d')
            document.getElementsByTagName('body')[0].style.setProperty('--subMenuBg', '#fff')
            document.getElementsByTagName('body')[0].style.setProperty('--borderColor', '#2a75da')
        } else {
            console.log('dark')
            document.getElementsByTagName('body')[0].style.setProperty('--baseColor', '#01023c')
            document.getElementsByTagName('body')[0].style.setProperty('--baseFont', '#fff')
            document.getElementsByTagName('body')[0].style.setProperty('--activeFont', '#fff')
            document.getElementsByTagName('body')[0].style.setProperty('--menuBg', '#01023c')
            document.getElementsByTagName('body')[0].style.setProperty('--hbg', '#2553964d')
            document.getElementsByTagName('body')[0].style.setProperty('--subMenuBg', '#010125')
            document.getElementsByTagName('body')[0].style.setProperty('--borderColor', '#255396')
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';

.app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar {
        position: fixed;
        top: 0;
    }
}
.drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
}

.fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
}

.hideSidebar .fixed-header {
    width: 100%;
}

.mobile .fixed-header {
    width: 100%;
}
</style>
