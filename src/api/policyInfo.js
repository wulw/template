/**
 * @Date: 2021-11-24 00:17:05 
 * @Author: w_lw
 * @Description: 政策资讯
 */
 import request from '@/utils/request'

 // 列表
export function getPolicyInfoList(params) {
  return request({
    url: '/PartyBuildingApi/PolicyInformation',
    method: 'get',
    params
  })
}

// 新增
export function policyInfoAdd(data) {
  return request({
    url: '/PartyBuildingApi/PolicyInformation',
    method: 'post',
    data
  })
}

// 修改
export function policyInfoModify(data) {
  return request({
    url: '/PartyBuildingApi/PolicyInformation',
    method: 'put',
    data
  })
}

// 删除
export function policyInfoDel(data) {
  return request({
    url: '/PartyBuildingApi/PolicyInformation',
    method: 'delete',
    data
  })
}
 