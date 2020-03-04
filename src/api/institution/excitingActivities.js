import { axios } from '@/utils/request'
const isDev = process.env.NODE_ENV === 'production'

const api = {
  showActivityInformationAuditCount:
		'/backend/merchantAudit/showActivityInformationAuditCount',
  multipleScreeningActivityInformation:
		'/backend/merchantAudit/multipleScreeningActivityInformation',
  auditingActivityInformation:
		'/backend/merchantAudit/auditingActivityInformation',
  showAuditingActivityInformation:
		'/backend/merchantAudit/showAuditingActivityInformation',
  showSingleActivityInformation:
		'/backend/commercialTenantConfigure/showSingleActivityInformation',
  pagingStartActivityInformation:
		'/backend/commercialTenantConfigure/pagingStartActivityInformation',
  removeActivityInformation:
		'/backend/commercialTenantConfigure/removeActivityInformation',
  readyAddActivityInformation:
		'/backend/commercialTenantConfigure/readyAddActivityInformation',
  showBespeak: '/backend/commercialTenantConfigure/showBespeak',
  removeActivityInformationPic:
		'/backend/commercialTenantConfigure/removeActivityInformationPic',
  eidtStartActivityInformation:
		'/backend/commercialTenantConfigure/eidtStartActivityInformation',
  eidtStartSequence: '/backend/commercialTenantConfigure/eidtStartSequence',
  previewButton: '/backend/commercialTenantConfigure/previewButton',
  getActivityInformationQrCode:
		'/backend/commercialTenantConfigure/getActivityInformationQrCode',
  auditingPublish: '/backend/merchantAudit/auditingPublish',
  showSingleStartActivityInformation:
		'/backend/appActivity/showSingleStartActivityInformation'
}

export function showActivityInformationAuditCount (parameter) {
  return axios({
    url: api.showActivityInformationAuditCount,
    method: 'get',
    params: parameter
  })
}

export function multipleScreeningActivityInformation (parameter) {
  return axios({
    url: api.multipleScreeningActivityInformation,
    method: 'get',
    params: parameter
  })
}

export function auditingActivityInformation (parameter) {
  return axios({
    url: api.auditingActivityInformation,
    method: 'post',
    params: parameter
  })
}

export function showAuditingActivityInformation (parameter) {
  return axios({
    url: api.showAuditingActivityInformation,
    method: 'get',
    params: parameter
  })
}

// 列表
export function pagingStartActivityInformation (parameter) {
  return axios({
    url: api.pagingStartActivityInformation,
    method: 'get',
    params: parameter
  })
}

// 展示
export function removeActivityInformation (parameter) {
  return axios({
    url: api.removeActivityInformation,
    method: 'post',
    params: parameter
  })
}

export function readyAddActivityInformation (parameter) {
  return axios({
    url: api.readyAddActivityInformation,
    method: 'post',
    params: parameter
  })
}

export function showBespeak (parameter) {
  return axios({
    url: api.showBespeak,
    method: 'get',
    params: parameter
  })
}

export function removeActivityInformationPic (parameter) {
  return axios({
    url: api.removeActivityInformationPic,
    method: 'post',
    params: parameter
  })
}

export function eidtStartSequence (parameter) {
  return axios({
    url: api.eidtStartSequence,
    method: 'post',
    params: parameter
  })
}

// 保存
export function eidtStartActivityInformation (parameter) {
  return axios({
    url: api.eidtStartActivityInformation,
    method: 'post',
    data: parameter
  })
}

// 发布
export function auditingPublish (parameter) {
  return axios({
    url: api.auditingPublish,
    method: 'post',
    params: parameter
  })
}

// 单挑展示
export function showSingleActivityInformation (parameter) {
  return axios({
    url: api.showSingleActivityInformation,
    method: 'get',
    params: parameter
  })
}

export function showSingleStartActivityInformation (parameter) {
  return axios({
    url: api.showSingleStartActivityInformation,
    method: 'get',
    params: parameter
  })
}

// 预览
export function previewButton (parameter) {
  return axios({
    url: api.previewButton,
    method: 'post',
    data: parameter
  })
}

export function getActivityInformationQrCode (parameter) {
  return axios({
    url: api.getActivityInformationQrCode,
    method: 'post',
    params: parameter
  })
}

export const uploadUrl = {
  upload: !isDev
    ? 'https://testbiz.aifound.cn/backend/commercialTenantConfigure/updateActivityInformationPic'
    : 'https://biz.aifound.cn/backend/commercialTenantConfigure/updateActivityInformationPic',
  code: !isDev
    ? 'https://testfundnew.aifound.cn/brandData/#/activity/'
    : 'https://fundnew.aifound.cn/brandData/#/activity/'
}
