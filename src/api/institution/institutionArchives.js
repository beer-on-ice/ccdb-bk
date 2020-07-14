import { axios } from '@/utils/request'
const isDev = process.env.NODE_ENV === 'production'

const api = {
  theChannelList: '/backend/backstageConfigureController/theChannelList',
  listOfInstitutions:
		'/backend/backstageConfigureController/listOfInstitutions',
  chageRecord: '/infor/companyAttributeSearch/chageRecord',
  investmentAbroad: '/infor/companyAttributeSearch/investmentAbroad',
  showBasicInformation:
		'/backend/backstageConfigureController/showBasicInformation',
  basicInformationSubmissionRecord:
		'/backend/backstageConfigureController/basicInformationSubmissionRecord',
  auditLogging: '/backend/backstageConfigureController/auditLogging',
  viewModificationRecords:
		'/backend/backstageConfigureController/viewModificationRecords',
  showIACDetails: '/backend/backstageConfigureController/showIACDetails',
  editIACDetails: '/backend/backstageConfigureController/editIACDetails',
  showCompanyType: '/backend/backstageConfigureController/showCompanyType',
  showOperationStatus:
		'/backend/backstageConfigureController/showOperationStatus',
  showIndustryInvolved:
		'/backend/backstageConfigureController/showIndustryInvolved'
}

// 品牌 - 概览
export function theChannelList (parameter) {
  return axios({
    url: api.theChannelList,
    method: 'get',
    params: parameter
  })
}

// 品牌 - 删除图片
export function listOfInstitutions (parameter) {
  return axios({
    url: api.listOfInstitutions,
    method: 'get',
    params: parameter
  })
}

// 历史变更
export function chageRecord (parameter) {
  return axios({
    url: api.chageRecord,
    method: 'get',
    params: parameter
  })
}

// 对外投资
export function investmentAbroad (parameter) {
  return axios({
    url: api.investmentAbroad,
    method: 'get',
    params: parameter
  })
}

// 基本信息详情
export function showBasicInformation (parameter) {
  return axios({
    url: api.showBasicInformation,
    method: 'get',
    params: parameter
  })
}

// 基本信息编辑
export function basicInformationSubmissionRecord (parameter) {
  return axios({
    url: api.basicInformationSubmissionRecord,
    method: 'post',
    data: parameter
  })
}

// 工商信息详情
export function showIACDetails (parameter) {
  return axios({
    url: api.showIACDetails,
    method: 'get',
    params: parameter
  })
}

// 工商信息编辑
export function editIACDetails (parameter) {
  return axios({
    url: api.editIACDetails,
    method: 'post',
    data: parameter
  })
}

// 审核记录
export function auditLogging (parameter) {
  return axios({
    url: api.auditLogging,
    method: 'get',
    params: parameter
  })
}

// 审核记录-查看详情
export function viewModificationRecords (parameter) {
  return axios({
    url: api.viewModificationRecords,
    method: 'get',
    params: parameter
  })
}

export function showCompanyType (parameter) {
  return axios({
    url: api.showCompanyType,
    method: 'get',
    params: parameter
  })
}

export function showOperationStatus (parameter) {
  return axios({
    url: api.showOperationStatus,
    method: 'get',
    params: parameter
  })
}

export function showIndustryInvolved (parameter) {
  return axios({
    url: api.showIndustryInvolved,
    method: 'get',
    params: parameter
  })
}

export const uploadUrl = !isDev
  ? 'https://testapp.aifound.cn/backend/backstageConfigureController/uploadingLogoUrl'
  : 'https://app.aifound.cn/backend/backstageConfigureController/uploadingLogoUrl'
