/**
 * @Date: 2021-11-22 22:17:05 
 * @Author: w_lw
 * @Description: 
 */
import request from '@/utils/request'

// 获取党组织树形数据
export function getTreeList(params) {
  return request({
      url: '/PartyBuildingApi/PartyOrganization',
      method: 'get',
      params
  })
}

// 党组织新增
export function partyOrgAdd(params) {
  return request({
    url: '/PartyBuildingApi/PartyOrganization',
    method: 'post',
    params
  })
}

// 党组织删除
export function partyOrgDel(params) {
  return request({
    url: '/PartyBuildingApi/PartyOrganization/9',
    method: 'delete',
    params
  })
}

// 党组织修改
export function partyOrgModify(params) {
  return request({
    url: '/PartyBuildingApi/PartyOrganization/9',
    method: 'put',
    params
  })
}

// 党组织成员列表
export function getPartyMemberList(params) {
  return request({
    url: '/PartyBuildingApi/PartyOrganizationInfo',
    method: 'get',
    params
  })
}

// 党组织成员新增
export function partyMemberAdd(params) {
  return request({
    url: '/PartyBuildingApi/PartyOrganizationInfo',
    method: 'post',
    params
  })
}

// 党组织成员批量删除
export function partyMemberDel(params) {
  return request({
    url: '/PartyBuildingApi/PartyOrganizationInfo',
    method: 'delete',
    params
  })
}
