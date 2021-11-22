/*
 * @Description: Do not edit
 * @Author: 前端劝退师-李逍遥
 * @Date: 2021-09-22 09:48:54
 * @LastEditors: 前端劝退师-李逍遥
 * @LastEditTime: 2021-10-18 15:47:26
 * @FilePath: \refund\src\api\index.js
 */
import request from '@/utils/request'

//获取数据
export function getData(data) {
    return request({
        url: '/BasicsApi/refundProject/getPayStatistics',
        method: 'post',
        data
    })
}
//项目列表
export function getList(params) {
    return request({
        url: '/BasicsApi/RefundProject',
        method: 'get',
        params
    })
}