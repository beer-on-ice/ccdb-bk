import { axios } from '@/utils/request'
const isDev = process.env.NODE_ENV === 'production'

const api = {
  newslist: '/backend/infoMgmt/list',
  activeUser: '/backend/app/activeUser',
  startData: '/backend/app/startData',
  appNewRegSituation: '/backend/appSituation/appNewRegSituation',
  retentionRate: '/backend/app/retentionRate',
  retentionRateExcel: !isDev
    ? 'https://testapp.aifound.cn/backend/app/retentionRateExcel'
    : 'https://app.aifound.cn/backend/app/retentionRateExcel',
  startDataExcel: !isDev
    ? 'https://testapp.aifound.cn/backend/app/startDataExcel'
    : 'https://app.aifound.cn/backend/app/startDataExcel',
  activeUserExcel: !isDev
    ? 'https://testapp.aifound.cn/backend/app/activeUserExcel'
    : 'https://app.aifound.cn/backend/app/activeUserExcel',
  newRegSituationExcel: !isDev
    ? 'https://testapp.aifound.cn/backend/appSituation/newRegSituationExcel'
    : 'https://app.aifound.cn/backend/appSituation/newRegSituationExcel',
  newRegSituationNumExcel: !isDev
    ? 'https://testapp.aifound.cn/backend/appSituation/newRegSituationNumExcel'
    : 'https://app.aifound.cn/backend/appSituation/newRegSituationNumExcel',
  activitySituationExcel: !isDev
    ? 'https://testapp.aifound.cn/backend/appSituation/activitySituationExcel'
    : 'https://app.aifound.cn/backend/appSituation/activitySituationExcel',
  activitySituationNumExcel: !isDev
    ? 'https://testapp.aifound.cn/backend/appSituation/activitySituationNumExcel'
    : 'https://app.aifound.cn/backend/appSituation/activitySituationNumExcel'
}

// 获取活跃用户
export function getActiveUser (parameter) {
  return axios({
    url: api.activeUser,
    method: 'get',
    params: parameter
  })
}

// 获取活跃用户详情
export function getStartData (parameter) {
  return axios({
    url: api.startData,
    method: 'get',
    params: parameter
  })
}

// 导出活跃用户
export function getActiveUserExcel (parameter) {
  return api.activeUserExcel
}

// 导出活跃用户详情
export function getStartDataExcel (parameter) {
  return api.startDataExcel
}

// 获取用户留存
export function getAppNewRegSituation (parameter) {
  return axios({
    url: api.appNewRegSituation,
    method: 'get',
    params: parameter
  })
}

// 获取留存用户详情
export function getRetentionRate (parameter) {
  return axios({
    url: api.retentionRate,
    method: 'get',
    params: parameter
  })
}

// 导出用户留存详情
export function getRetentionRateExcel (parameter) {
  return api.retentionRateExcel
}

// 导出用户留存
export function getNewRegSituationExcel (parameter) {
  return api.newRegSituationExcel
}

// 导出用户留存
export function getNewRegSituationNumExcel (parameter) {
  return api.newRegSituationNumExcel
}

// 导出用户留存
export function getAactivitySituationExcel (parameter) {
  return api.activitySituationExcel
}

// 导出用户留存
export function getActivitySituationNumExcel (parameter) {
  return api.activitySituationNumExcel
}
