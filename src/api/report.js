import { axios } from '@/utils/request'
const isDev = process.env.NODE_ENV === 'production'

const api = {
  getReportByList: '/backend/getReportByList',
  broadcast: '/backend/report/broadcast',
  setReportOrder: '/backend/setReportOrder',
  forbidReportById: '/backend/forbidReportById',
  getUserNameList: '/backend/infoMgmt/getUserNameList',
  addReport: '/backend/addReport',
  updateReportById: '/backend/updateReportById',
  remove: '/backend/infoMgmt/removeCoverImg',
  addBannerInfo: '/backend/infoMgmt/addBannerInfo',
  generateCode: '/backend/infoMgmt/getInfomationQrCode',
  getReportById: '/backend/getReportById'
}

// 列表
export function getReportByList (parameter) {
  return axios({
    url: api.getReportByList,
    method: 'get',
    params: parameter
  })
}

// 具有权限的用户名
export function getUserNameList () {
  return axios({
    url: api.getUserNameList,
    method: 'get'
  })
}

// 推送
export function broadcast (parameter) {
  return axios({
    url: api.broadcast,
    method: 'post',
    params: parameter
  })
}

// 设置顺序
export function setReportOrder (parameter) {
  return axios({
    url: api.setReportOrder,
    method: 'post',
    params: parameter
  })
}

// 启用/禁用
export function forbidReportById (parameter) {
  return axios({
    url: api.forbidReportById,
    method: 'post',
    params: parameter
  })
}

export function getReportById (parameter) {
  return axios({
    url: api.getReportById,
    method: 'get',
    params: parameter
  })
}

export function addReport (parameter) {
  return axios({
    url: api.addReport,
    method: 'post',
    data: parameter
  })
}

export function updateReportById (parameter) {
  return axios({
    url: api.updateReportById,
    method: 'post',
    data: parameter
  })
}

// 添加bannerifno
export function getNewsAddBanner (parameter) {
  return axios({
    url: api.addBannerInfo,
    method: 'post',
    data: parameter
  })
}

// 移除图片
export function getRemoveUpload (parameter) {
  return axios({
    url: api.remove,
    method: 'post',
    params: parameter
  })
}

// 生成快报二维码
export function getFastCode (parameter) {
  return axios({
    url: api.generateCode,
    method: 'post',
    params: parameter
  })
}

export let specialUrl = {
  code: !isDev
    ? 'https://testfundnew.aifound.cn/brandData/#/report/'
    : 'https://fundnew.aifound.cn/brandData/#/report/',
  upload: !isDev
    ? 'https://testapp.aifound.cn/backend/infoMgmt/coverImgUpload'
    : 'https://app.aifound.cn/backend/infoMgmt/coverImgUpload'
}
