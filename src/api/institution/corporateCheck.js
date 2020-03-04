import { axios } from '@/utils/request'

const api = {
  list: '/backend/menu/check/info/list',
  num: '/backend/menu/check/info/num',
  detail: '/backend/menu/check/info/detail',
  judge: '/backend/menu/check/info/judge'
}

// 查询数量
export function num (parameter) {
  return axios({
    url: api.num,
    method: 'get',
    params: parameter
  })
}
// 查询列表
export function list (parameter) {
  return axios({
    url: api.list,
    method: 'get',
    params: parameter
  })
}

// 详情
export function detail (parameter) {
  return axios({
    url: api.detail,
    method: 'get',
    params: parameter
  })
}

// 审核状态
export function judge (parameter) {
  return axios({
    url: api.judge,
    method: 'post',
    params: parameter
  })
}
