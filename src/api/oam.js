/**
 * @Date: 2021-11-22 22:17:05 
 * @Author: w_lw
 * @Description: 
 */
import request from '@/utils/request'

// 获取在线测评维护列表数据
export function getList(params) {
  return request({
      url: '/PartyBuildingApi/OnlineTestItems',
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
    url: `/PartyBuildingApi/PartyOrganization/${params.id}`,
    method: 'delete',
    params
  })
}

// 党组织修改
export function partyOrgModify(params) {
  return request({
    url: `/PartyBuildingApi/PartyOrganization/${params.id}`,
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

// 党组织成员修改
export function partyMemberModify(params) {
  return request({
    url: `/PartyBuildingApi/PartyOrganizationInfo/${params.id}`,
    method: 'put',
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

// 导入模板下载
export function partyMemberTemplate(params) {
  return request({
    url: `/PartyBuildingApi/partyOrganizationInfoTemplate`,
    method: 'get',
    params
  })
}

// 导入数据
export function importPartyMemberData(params) {
  return request({
    url: `/PartyBuildingApi/partyOrganizationInfoImport`,
    method: 'post',
    params
  })
}


// 导出数据
export function exportPartyMemberData(params) {
  return request({
    url: `/PartyBuildingApi/partyOrganizationInfoExport/${params.id}`,
    method: 'get',
    params
  })
}

// 搜索教师下拉列表
export function searchTeacherList(params) {
  return request({
    url: '/BasicsApi/Teacher',
    method: 'get',
    params
  })
}
