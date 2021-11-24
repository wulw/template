/**
 * @Date: 2021-11-24 00:17:05 
 * @Author: w_lw
 * @Description: 敏感词维护
 */
import request from '@/utils/request'

// 查询列表
export function querySensitiveWordsList(params) {
  return request({
    url: '/PartyBuildingApi/SensitiveWords',
    method: 'get',
    params
  })
}

// 添加
export function sensitiveWordsAdd(data) {
  return request({
    url: '/PartyBuildingApi/SensitiveWords',
    method: 'post',
    data
  })
}

// 删除
export function sensitiveWordsDel(data) {
  return request({
    url: `/PartyBuildingApi/SensitiveWords/${data.id}`,
    method: 'delete',
    data
  })
}
