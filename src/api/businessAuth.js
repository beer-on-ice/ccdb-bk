import { axios } from '@/utils/request'

const api = {
  companyCertificationMultipleConditional:
		'/backend/identification/companyCertificationMultipleConditional',
  workforceMultipleConditional:
		'/backend/identification/workforceMultipleConditional',
  createSources: '/backend/identification/createSources',
  showOwnership: '/backend/identification/showOwnership',
  getBackendUserData: '/backend/identification/getBackendUserData',
  singleWorkforce: '/backend/identification/singleWorkforce',
  assignment: '/backend/identification/assignment',
  setWorkOrderStatus: '/backend/identification/setWorkOrderStatus',
  submitProveCommunicationRecord:
		'/backend/identification/submitProveCommunicationRecord',
  showProveCommunicationRecords:
		'/backend/identification/showProveCommunicationRecords',
  searchCompany: '/backend/identification/searchCompany',
  bdSubmitIdentification: '/backend/identification/bdSubmitIdentification',
  identificationButton: '/backend/identification/identificationButton',
  submitButton: '/backend/identification/submitButton',
  editNPP: '/backend/identification/editNPP'
}

export function companyCertificationMultipleConditional (parameter) {
  return axios({
    url: api.companyCertificationMultipleConditional,
    method: 'get',
    params: parameter
  })
}

export function workforceMultipleConditional (parameter) {
  return axios({
    url: api.workforceMultipleConditional,
    method: 'get',
    params: parameter
  })
}

export function createSources (parameter) {
  return axios({
    url: api.createSources,
    method: 'get',
    params: parameter
  })
}

export function showOwnership (parameter) {
  return axios({
    url: api.showOwnership,
    method: 'get',
    params: parameter
  })
}

export function getBackendUserData (parameter) {
  return axios({
    url: api.getBackendUserData,
    method: 'get',
    params: parameter
  })
}

// 分配工单
export function assignment (parameter) {
  return axios({
    url: api.assignment,
    method: 'post',
    params: parameter
  })
}

// 设置工单状态
export function setWorkOrderStatus (parameter) {
  return axios({
    url: api.setWorkOrderStatus,
    method: 'post',
    params: parameter
  })
}

// 单条工单详情
export function singleWorkforce (parameter) {
  return axios({
    url: api.singleWorkforce,
    method: 'get',
    params: parameter
  })
}

// 提交工单处理
export function submitProveCommunicationRecord (parameter) {
  return axios({
    url: api.submitProveCommunicationRecord,
    method: 'post',
    params: parameter
  })
}

// 工单处理记录
export function showProveCommunicationRecords (parameter) {
  return axios({
    url: api.showProveCommunicationRecords,
    method: 'get',
    params: parameter
  })
}

// 搜索公司
export function searchCompany (parameter) {
  return axios({
    url: api.searchCompany,
    method: 'get',
    params: parameter
  })
}

// 提交工单
export function bdSubmitIdentification (parameter) {
  return axios({
    url: api.bdSubmitIdentification,
    method: 'post',
    params: parameter
  })
}

export function identificationButton (parameter) {
  return axios({
    url: api.identificationButton,
    method: 'post',
    params: parameter
  })
}

export function submitButton (parameter) {
  return axios({
    url: api.submitButton,
    method: 'post',
    params: parameter
  })
}

export function editNPP (parameter) {
  return axios({
    url: api.editNPP,
    method: 'post',
    params: parameter
  })
}
