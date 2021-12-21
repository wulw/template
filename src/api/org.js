/**
 * @Date: 2021-11-22 22:17:05 
 * @Author: w_lw
 * @Description: 党组织管理
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
export function partyOrgAdd(data) {
  return request({
    url: '/PartyBuildingApi/PartyOrganization',
    method: 'post',
    data
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
export function partyOrgModify(data) {
  return request({
    url: `/PartyBuildingApi/PartyOrganization/${data.id}`,
    method: 'put',
    data
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
export function importPartyMemberData(data) {
  return request({
    url: `/PartyBuildingApi/partyOrganizationInfoImport`,
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 导出数据
// export function exportPartyMemberData(params) {
//   return request({
//     url: `/PartyBuildingApi/partyOrganizationInfoExport/${params.party_id}`,
//     method: 'get',
//     params
//   })
// }

// 搜索教师下拉列表
export function searchTeacherList(params) {
  return request({
    url: '/BasicsApi/Teacher',
    method: 'get',
    params
  })
}

// 通用上传接口
export function commonUpload(data) {
  return request({
    url: '/webApi/upload',
    method: 'post',
    data
  })
}
