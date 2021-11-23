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
 