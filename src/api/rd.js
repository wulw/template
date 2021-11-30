/**
 * @Date: 2021-11-22 22:17:05 
 * @Author: w_lw
 * @Description: 阅卷评测api
 */
import request from '@/utils/request'

// 列表
export function queryRdList(params) {
  return request({
    url: '/PartyBuildingApi/OnlineTestItems',
    method: 'get',
    params
  })
}

// 查看
export function viewMarkExamList(params) {
  return request({
    url: '/PartyBuildingApi/getItemIdInfo',
    method: 'get',
    params
  })
}

// 阅卷
export function markExamItemInfo(data) {
  return request({
    url: '/PartyBuildingApi/markingItemIdInfo',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
