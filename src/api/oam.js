/**
 * @Date: 2021-11-22 22:17:05 
 * @Author: w_lw
 * @Description: 在线测评维护
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

// 测验项目
// 添加
export function testProjectAdd(data) {
  return request({
    url: '/PartyBuildingApi/OnlineTestItems',
    method: 'post',
    data
  })
}

// 删除
export function testProjectDel(data) {
  return request({
    url: '/PartyBuildingApi/OnlineTestItems',
    method: 'delete',
    data
  })
}

// 问卷维护
// 添加
export function questionMaintenanceAdd(data) {
  return request({
    url: '/PartyBuildingApi/OnlineTestQuestions',
    method: 'post',
    data
  })
}

// 列表
export function questionMaintenanceList(params) {
  return request({
    url: '/PartyBuildingApi/OnlineTestQuestions',
    method: 'get',
    params
  })
}

// 统计
// 列表

// 问题选项查询


// 成绩查看
// 列表
export function queryscoreViewList(params) {
  return request({
    url: '/PartyBuildingApi/getItemIdInfo',
    method: 'get',
    params
  })
}
