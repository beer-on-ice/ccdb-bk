import { axios } from '@/utils/request'

const api = {
  showCompanyHonorsCount: '/backend/merchantAudit/showCompanyHonorsCount',
  multipleCompanyHonors: '/backend/merchantAudit/multipleCompanyHonors',
  showSingleCompanyHonor:
    '/backend/commercialTenantConfigure/showSingleCompanyHonor',
  auditingCompanyHonor: '/backend/merchantAudit/auditingCompanyHonor',
  showAuditingCompanyHonor: '/backend/merchantAudit/showAuditingCompanyHonor'
}

// 查询数量
export function showCompanyHonorsCount (parameter) {
  return axios({
    url: api.showCompanyHonorsCount,
    method: 'get',
    params: parameter
  })
}
// 查询列表
export function multipleCompanyHonors (parameter) {
  return axios({
    url: api.multipleCompanyHonors,
    method: 'get',
    params: parameter
  })
}

// 详情
export function showSingleCompanyHonor (parameter) {
  return axios({
    url: api.showSingleCompanyHonor,
    method: 'get',
    params: parameter
  })
}

// 审核状态
export function auditingCompanyHonor (parameter) {
  return axios({
    url: api.auditingCompanyHonor,
    method: 'post',
    params: parameter
  })
}

// 审核记录
export function showAuditingCompanyHonor (parameter) {
  return axios({
    url: api.showAuditingCompanyHonor,
    method: 'get',
    params: parameter
  })
}
