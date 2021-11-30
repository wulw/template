/**
 * @Date: 2021-11-22 22:17:05 
 * @Author: w_lw
 * @Description: 在线测评
 */
import request from '@/utils/request'

// 获取在线测评列表数据
export function getOaList(params) {
  return request({
      url: '/PartyBuildingApi/getItemUserId',
      method: 'get',
      params
  })
}

// 查看详情
export function onlineExamView(params) {
  return request({
    url: '/PartyBuildingApi/getItemUserIdInfo',
    method: 'get',
    params
  })
}

// 答题
export function onlineExamAnswer(data) {
  return request({
    url: '/PartyBuildingApi/OnlineTestInfo',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
