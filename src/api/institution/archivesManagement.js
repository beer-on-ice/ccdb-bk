import { axios } from '@/utils/request'
const isDev = process.env.NODE_ENV === 'production'

const api = {
  listOfaudit: '/backend/backstageConfigureController/listOfaudit',
  numberOfAudit: '/backend/backstageConfigureController/numberOfAudit',
  auditDetails: '/backend/backstageConfigureController/auditDetails',
  auditOperation: '/backend/backstageConfigureController/auditOperation'
}

export function listOfaudit (parameter) {
  return axios({
    url: api.listOfaudit,
    method: 'get',
    params: parameter
  })
}

export function numberOfAudit (parameter) {
  return axios({
    url: api.numberOfAudit,
    method: 'get',
    params: parameter
  })
}

// 审核详情
export function auditDetails (parameter) {
  return axios({
    url: api.auditDetails,
    method: 'get',
    params: parameter
  })
}

// 审核
export function auditOperation (parameter) {
  return axios({
    url: api.auditOperation,
    method: 'post',
    data: parameter
  })
}
