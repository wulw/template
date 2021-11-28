/**
 * @Date: 2021-11-22 22:17:05 
 * @Author: w_lw
 * @Description: 首页
 */
import request from '@/utils/request'

// 获取首页数据
export function getHomeList(params) {
  return request({
      url: '/PartyBuildingApi/BigDataKanban',
      method: 'get',
      params
  })
}

