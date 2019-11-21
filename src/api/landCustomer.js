import { axios } from '@/utils/request'

const api = {
  allList: '/backend/internalPolicyEdit/multipleConditionsPolicyList',
  multipleConsultServiceList:
    '/backend/internalPolicyEdit/multipleConsultServiceList',
  physicalExaminationFeedback:
    '/backend/insurancePolicyEdit/physicalExaminationFeedback',
  showConsultService: '/backend/insurancePolicyEdit/showConsultService',
  insuranceConsultationFeedback:
    '/backend/insurancePolicyEdit/insuranceConsultationFeedback',
  currentUser: '/backend/insurancePolicyEdit/singlePolicyList',
  updatePolicy: '/backend/insurancePolicyEdit/updatePolicy'
}
/**
 * @param parameter
 * @returns {*}
 */
export function getAllList (parameter) {
  return axios({
    url: api.allList,
    method: 'get',
    params: parameter
  })
}

// 获取体检预约-咨询预约
export function getMultipleConsultServiceList (parameter) {
  return axios({
    url: api.multipleConsultServiceList,
    method: 'get',
    params: parameter
  })
}

// 体检反馈
export function getPhysicalExaminationFeedback (parameter) {
  return axios({
    url: api.physicalExaminationFeedback,
    method: 'post',
    params: parameter
  })
}

// 咨询反馈
export function getInsuranceConsultationFeedback (parameter) {
  return axios({
    url: api.insuranceConsultationFeedback,
    method: 'post',
    params: parameter
  })
}

// 单条信息
export function getShowConsultService (parameter) {
  return axios({
    url: api.showConsultService,
    method: 'get',
    params: parameter
  })
}

// 选中单条数据点击操作 获取当前用户的信息
export function getCurrentUser (parameter) {
  return axios({
    url: api.currentUser,
    method: 'get',
    params: parameter
  })
}

// 更新审批结果  审批通过或者驳回
export function updatePolicy (parameter) {
  return axios({
    url: api.updatePolicy,
    method: 'post',
    params: parameter
  })
}
