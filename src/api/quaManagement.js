import { axios } from '@/utils/request'

const api = {
  showCompanyAptitudesCount: '/backend/merchantAudit/showCompanyAptitudesCount',
  multipleCompanyAptitudes: '/backend/merchantAudit/multipleCompanyAptitudes',
  showSingleCompanyAptitude:
    '/backend/commercialTenantConfigure/showSingleCompanyAptitude',
  auditingCompanyAptitude: '/backend/merchantAudit/auditingCompanyAptitude',
  showAuditingCompanyAptitude:
    '/backend/merchantAudit/showAuditingCompanyAptitude'
}

// 查询数量
export function showCompanyAptitudesCount (parameter) {
  return axios({
    url: api.showCompanyAptitudesCount,
    method: 'get',
    params: parameter
  })
}
// 查询列表
export function multipleCompanyAptitudes (parameter) {
  return axios({
    url: api.multipleCompanyAptitudes,
    method: 'get',
    params: parameter
  })
}

// 详情
export function showSingleCompanyAptitude (parameter) {
  return axios({
    url: api.showSingleCompanyAptitude,
    method: 'get',
    params: parameter
  })
}

// 审核状态
export function auditingCompanyAptitude (parameter) {
  return axios({
    url: api.auditingCompanyAptitude,
    method: 'post',
    params: parameter
  })
}

// 审核记录
export function showAuditingCompanyAptitude (parameter) {
  return axios({
    url: api.showAuditingCompanyAptitude,
    method: 'get',
    params: parameter
  })
}
