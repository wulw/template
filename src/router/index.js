/*
 * @Description: Do not edit
 * @Author: 前端劝退师-李逍遥
 * @Date: 2021-09-22 09:48:54
 * @LastEditors: 前端劝退师-李逍遥
 * @LastEditTime: 2021-10-19 09:07:55
 * @FilePath: \changeshift\src\router\index.js
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout/index'

export const constantRoutes = [
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true
    },

    {
        path: '/404',
        component: () => import('@/views/404'),
        hidden: true
    },
    {
        path: '/',
        component: Layout,
        redirect: '/homepage',
        meta: { title: '首页' },
        children: [
            {
                path: '/homepage',
                name: 'homepage',
                component: () => import('@/views/homepage/index'),
                meta: { title: '首页', icon: 'el-icon-s-home' }
            }
        ]
    },
    {
        path: '/partyManagement',
        component: Layout,
        redirect: '/partyOrgManagement',
        meta: { title: '党建管理', icon: 'el-icon-setting' },
        children: [
            {
                path: '/partyOrgManagement',
                name: 'partyOrgManagement',
                component: () => import('@/views/partyOrgManagement/index'),
                meta: { title: '党组织管理' }
            },
            {
                path: '/policyInformation',
                name: 'policyInformation',
                component: () => import('@/views/policyInformation/index'),
                meta: { title: '政策资讯' }
            },
            {
                path: '/partyActivityManagement',
                name: 'partyActivityManagement',
                component: () => import('@/views/partyActivityManagement/index'),
                meta: { title: '党建活动管理' }
            },
            {
                path: '/learningColumn',
                name: 'learningColumn',
                component: () => import('@/views/learningColumn/index'),
                meta: { title: '学习专栏' }
            },
            {
                path: '/onlineAssessmentMaintenance',
                name: 'onlineAssessmentMaintenance',
                component: () => import('@/views/onlineAssessmentMaintenance/index'),
                meta: { title: '在线测评维护' }
            },
            {
                path: '/onlineAssessmentMaintenance/questionMaintenance',
                name: 'questionMaintenance',
                component: () => import('@/views/onlineAssessmentMaintenance/components/questionMaintenance'),
                meta: { title: '问卷维护' },
                hidden: true
            },
            {
                path: '/onlineAssessment',
                name: 'onlineAssessment',
                component: () => import('@/views/onlineAssessment/index'),
                meta: { title: '在线测评' }
            },
            {
                path: '/readReviews',
                name: 'readReviews',
                component: () => import('@/views/readReviews/index'),
                meta: { title: '阅卷评测' }
            },
            {
                path: '/sensitiveWordsMaintenance',
                name: 'sensitiveWordsMaintenance',
                component: () => import('@/views/sensitiveWordsMaintenance/index'),
                meta: { title: '敏感词维护' }
            },
            {
                path: '/issuedAudit',
                name: 'issuedAudit',
                component: () => import('@/views/issuedAudit/index'),
                meta: { title: '发布审核' }
            }
        ]
    },
    // {
    //     path: '/',
    //     component: Layout,
    //     redirect: '/apply',
    //     meta: { title: '调班管理', icon: 'el-icon-s-management' },
    //     children: [
    //         {
    //             path: '/apply',
    //             name: 'apply',
    //             component: () => import('@/views/changeshift-management/apply'),
    //             meta: { title: '调班申请' }
    //         },
    //         {
    //             path: '/check',
    //             name: 'check',
    //             component: () => import('@/views/changeshift-management/check'),
    //             meta: { title: '调班审核' }
    //         },
    //         {
    //             path: '/record',
    //             name: 'record',
    //             component: () => import('@/views/changeshift-management/record'),
    //             meta: { title: '调班记录' }
    //         },
    //         {
    //             path: '/process',
    //             name: 'process',
    //             component: () => import('@/views/changeshift-management/process'),
    //             meta: { title: '审核流程' }
    //         }
    //     ]
    // },

    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
    new Router({
        // mode: 'history', // require service support
        scrollBehavior: () => ({ y: 0 }),
        routes: constantRoutes
    })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router
