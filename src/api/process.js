/*
 * @Description: Do not edit
 * @Author: 前端劝退师-李逍遥
 * @Date: 2021-09-28 17:14:54
 * @LastEditors: 前端劝退师-李逍遥
 * @LastEditTime: 2021-10-20 14:39:39
 * @FilePath: \changeshift\src\api\process.js
 */
import request from '@/utils/request'

export function getList(params) {
    return request({
        url: '/BasicsApi/AdjustClassAudit',
        method: 'get',
        params
    })
}
export function Del(data) {
    return request({
        url: `/BasicsApi/AdjustClassAudit`,
        method: 'delete',
        data
    })
}
export function Add(data) {
    return request({
        url: `/BasicsApi/AdjustClassAudit`,
        method: 'post',
        data
    })
}
// 教职工列表
export function getWorkers(params) {
    return request({
        method: 'get',
        url: "/BasicsApi/Teacher",
        params: params
    })
}
// 职工树
export function getTeacherTree(params) {
    return request({
      method: "get",
      url: "/BasicsApi/OrganizeTree",
      params: params
    })
}

// 负责人
export function getLeader(params) {
    return request({
      method: "get",
      url: "BasicsApi/DeptLeader",
      params: params
    })
}
// 编辑
export function Edit(data) {
    return request({
      method: "put",
      url: `BasicsApi/AdjustClassAudit/${data.id}`,
      data
    })
}
// 启用
export function Use(data) {
    return request({
      method: "post",
      url: `BasicsApi/isUseAdjustClass`,
      data
    })
}