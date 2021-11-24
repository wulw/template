/**
 * @Date: 2021-11-24 23:46:05 
 * @Author: w_lw
 * @Description: 党建活动管理
 */
import request from '@/utils/request'

// 查询列表
export function queryPartyActivityList(params) {
  return request({
    url: '/PartyBuildingApi/PartyActivities',
    method: 'get',
    params
  })
}

// 新增
export function partyActivityAdd(data) {
  return request({
    url: '/PartyBuildingApi/PartyActivities',
    method: 'post',
    data
  })
}

// 修改
export function partyActivityModify(data) {
  return request({
    url: '/PartyBuildingApi/PartyActivities',
    method: 'put',
    data
  })
}

// 删除
export function partyActivityDel(data) {
  return request({
    url: '/PartyBuildingApi/PartyActivities',
    method: 'delete',
    data
  })
}

