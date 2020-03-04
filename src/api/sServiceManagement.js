import { axios } from '@/utils/request'

const api = {
  showCompanyFeaturesCount: '/backend/merchantAudit/showCompanyFeaturesCount',
  multipleCompanyFeatures: '/backend/merchantAudit/multipleCompanyFeatures',
  showCompanyFeatures: '/backend/commercialTenantConfigure/showCompanyFeatures',
  auditingCompanyFeature: '/backend/merchantAudit/auditingCompanyFeature',
  showAuditingCompanyFeature:
    '/backend/merchantAudit/showAuditingCompanyFeature'
}

// 查询数量
export function showCompanyFeaturesCount (parameter) {
  return axios({
    url: api.showCompanyFeaturesCount,
    method: 'get',
    params: parameter
  })
}
// 查询列表
export function multipleCompanyFeatures (parameter) {
  return axios({
    url: api.multipleCompanyFeatures,
    method: 'get',
    params: parameter
  })
}

// 详情
export function showCompanyFeatures (parameter) {
  return axios({
    url: api.showCompanyFeatures,
    method: 'get',
    params: parameter
  })
}

// 审核状态
export function auditingCompanyFeature (parameter) {
  return axios({
    url: api.auditingCompanyFeature,
    method: 'post',
    params: parameter
  })
}

// 审核记录
export function showAuditingCompanyFeature (parameter) {
  return axios({
    url: api.showAuditingCompanyFeature,
    method: 'get',
    params: parameter
  })
}
