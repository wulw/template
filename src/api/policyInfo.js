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
    url: `/PartyBuildingApi/PolicyInformation/${data.get('id')}`,
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

// 审核
export function policyInfoAudit(data) {
  return request({
    url: '/PartyBuildingApi/examinePolicyInformation',
    method: 'post',
    data
  })
}

// 置顶/取消置顶
export function policyInfoTop(data) {
  return request({
    url: '/PartyBuildingApi/policyInformationTop',
    method: 'post',
    data
  })
}

// 点赞/取消点赞
export function policyInfoLike(data) {
  return request({
    url: '/PartyBuildingApi/policyInformationLike',
    method: 'post',
    data
  })
}

// 查看
export function policyInfoSee(data) {
  return request({
    url: '/PartyBuildingApi/policyInformationSee',
    method: 'post',
    data
  })
}

// 转载
export function policyInfoRepost(data) {
  return request({
    url: '/PartyBuildingApi/policyInformationReprint',
    method: 'post',
    data
  })
}

// 评论管理
// 列表
export function queryCommentList(params) {
  return request({
    url: '/PartyBuildingApi/InformationComment',
    method: 'get',
    params
  })
}

// 删除
export function commentDel(params) {
  return request({
    url: `/PartyBuildingApi/InformationComment/${params.id}`,
    method: 'delete',
    params
  })
}
