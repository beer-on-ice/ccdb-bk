import { axios } from '@/utils/request'

const api = {
  multipleScreeningAdvisers: '/backend/merchantAudit/multipleScreeningAdvisers',
  showAuditCount: '/backend/merchantAudit/showAuditCount',
  showSingleCompanyAdviser:
    '/backend/commercialTenantConfigure/showSingleCompanyAdviser',
  showWorkExperiences: '/backend/commercialTenantConfigure/showWorkExperiences',
  auditingAdviser: '/backend/merchantAudit/auditingAdviser',
  showAuditingAdviser: '/backend/merchantAudit/showAuditingAdviser'
}

// 查询数量
export function showAuditCount (parameter) {
  return axios({
    url: api.showAuditCount,
    method: 'get',
    params: parameter
  })
}

// 查询列表
export function multipleScreeningAdvisers (parameter) {
  return axios({
    url: api.multipleScreeningAdvisers,
    method: 'get',
    params: parameter
  })
}

// 查询审核页面
export function showSingleCompanyAdviser (parameter) {
  return axios({
    url: api.showSingleCompanyAdviser,
    method: 'get',
    params: parameter
  })
}

// 查询工作经历
export function showWorkExperiences (parameter) {
  return axios({
    url: api.showWorkExperiences,
    method: 'get',
    params: parameter
  })
}

// 审核是否通过
export function auditingAdviser (parameter) {
  return axios({
    url: api.auditingAdviser,
    method: 'post',
    params: parameter
  })
}

// 获取审核记录
export function showAuditingAdviser (parameter) {
  return axios({
    url: api.showAuditingAdviser,
    method: 'get',
    params: parameter
  })
}
