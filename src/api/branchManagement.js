import { axios } from '@/utils/request'

const api = {
  showBranchOrganizationCount:
    '/backend/merchantAudit/showBranchOrganizationCount',
  multipleBranchOrganizations:
    '/backend/merchantAudit/multipleBranchOrganizations',
  showSingleBranchOrganization:
    '/backend/commercialTenantConfigure/showSingleBranchOrganization',
  auditingBranchOrganization:
    '/backend/merchantAudit/auditingBranchOrganization',
  showAuditingBranchOrganization:
    '/backend/merchantAudit/showAuditingBranchOrganization'
}

// 查询数量
export function showBranchOrganizationCount (parameter) {
  return axios({
    url: api.showBranchOrganizationCount,
    method: 'get',
    params: parameter
  })
}
// 查询列表
export function multipleBranchOrganizations (parameter) {
  return axios({
    url: api.multipleBranchOrganizations,
    method: 'get',
    params: parameter
  })
}

// 详情
export function showSingleBranchOrganization (parameter) {
  return axios({
    url: api.showSingleBranchOrganization,
    method: 'get',
    params: parameter
  })
}

// 审核状态
export function auditingBranchOrganization (parameter) {
  return axios({
    url: api.auditingBranchOrganization,
    method: 'post',
    params: parameter
  })
}

// 审核记录
export function showAuditingBranchOrganization (parameter) {
  return axios({
    url: api.showAuditingBranchOrganization,
    method: 'get',
    params: parameter
  })
}
