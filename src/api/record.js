/*
 * @Description: Do not edit
 * @Author: 前端劝退师-李逍遥
 * @Date: 2021-09-26 11:04:54
 * @LastEditors: 前端劝退师-李逍遥
 * @LastEditTime: 2021-10-22 11:56:06
 * @FilePath: \changeshift\src\api\record.js
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

//删除
export function Del(data) {
    return request({
        url: '/BasicsApi/AdjustClass',
        method: 'delete',
        data
    })
}

