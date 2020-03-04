import { axios } from '@/utils/request'

const api = {
  list: '/backend/ins/apply/list',
  deal: '/backend/ins/apply/deal'
}

export function list (parameter) {
  return axios({
    url: api.list,
    method: 'get',
    params: parameter
  })
}

export function deal (parameter) {
  return axios({
    url: api.deal,
    method: 'post',
    params: parameter
  })
}
