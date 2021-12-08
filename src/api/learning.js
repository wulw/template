/**
 * @Date: 2021-11-24 23:46:05 
 * @Author: w_lw
 * @Description: 学习专栏
 */
import request from '@/utils/request'

// 查询列表
export function queryLearningColumnList(params) {
  return request({
    url: '/PartyBuildingApi/LearningColumn',
    method: 'get',
    params
  })
} 

// 新增
export function learningColumnAdd(data) {
  return request({
    url: '/PartyBuildingApi/LearningColumn',
    method: 'post',
    data
  })
} 

// 修改
export function learningColumnModify(params) {
  // console.log(params)
  return request({
    url: `/PartyBuildingApi/LearningColumn/${params.id}`,
    method: 'put',
    params
  })
} 

// 删除
export function learningColumnDel(data) {
  return request({
    url: '/PartyBuildingApi/LearningColumn',
    method: 'delete',
    data
  })
} 

// 审核
export function learningColumnAudit(data) {
  return request({
    url: '/PartyBuildingApi/examineLearningColumn',
    method: 'post',
    data
  })
}

// 置顶/取消置顶
export function learningColumnTop(data) {
  return request({
    url: '/PartyBuildingApi/learningColumnColumn',
    method: 'post',
    data
  })
}

// 评论管理
// 列表
export function queryCommentList(params) {
  return request({
    url: '/PartyBuildingApi/LearningComment',
    method: 'get',
    params
  })
}

// 删除
export function commentDel(data) {
  return request({
    url: '/PartyBuildingApi/LearningComment',
    method: 'delete',
    data
  })
}
