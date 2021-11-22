/*
 * @Description: Do not edit
 * @Author: 前端劝退师-李逍遥
 * @Date: 2021-09-26 11:04:54
 * @LastEditors: 前端劝退师-李逍遥
 * @LastEditTime: 2021-10-22 09:33:30
 * @FilePath: \changeshift\src\api\apply.js
 */
import request from '@/utils/request'
//获取列表数据
export function getList(params) {
    return request({
        url: '/BasicsApi/AdjustClass',
        method: 'get',
        params
    })
}
//导入模板
export function getTemplate(params) {
    return request({
        url: '/BasicsApi/templateAdjustClass',
        method: 'get',
        responseType:'blob'
    })
}
//新增
export function Add(data) {
    return request({
        url: '/BasicsApi/AdjustClass',
        method: 'post',
        data
    })
}
//校区获取年级
export function getGrade(params) {
    return request({
        url: `/BasicsApi/campusToGrade/${params.id}`,
        method: 'get',
    })
}
//年级获取班级
export function getClass(params) {
    return request({
        url: `/BasicsApi/gradeToClass/${params.id}`,
        method: 'get',
    })
}
//删除
export function Del(data) {
    return request({
        url: '/BasicsApi/AdjustClass',
        method: 'delete',
        data
    })
}
//学生
export function studentInfo(data) {
    return request({
        url: '/BasicsApi/getStudentAccount',
        method: 'post',
        data
    })
}
