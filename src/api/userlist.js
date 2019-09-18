import { axios } from '@/utils/request'

const api = {
  list: '/backend/warning/tab', // 待删
  column: '/backend/warning/column', // 待删
  getPushInfoCount: '/backend/infoMgmt/getPushInfoCount',
  getInfoByUserId: '/backend/infoMgmt/getInfoByUserId'
}

// 待删
export function getList (parameter) {
  return axios({
    url: api.list,
    method: 'get',
    params: parameter
  })
}

// 获取舆情预警数量
export function getPushInfoCount (parameter) {
  return axios({
    url: api.getPushInfoCount,
    method: 'get',
    params: parameter
  })
}

// 获取舆情预警列表
export function getInfoByUserId (parameter) {
  return axios({
    url: api.getInfoByUserId,
    method: 'get',
    params: parameter
  })
}
