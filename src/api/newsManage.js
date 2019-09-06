import { axios } from '@/utils/request'
const isDev = process.env.NODE_ENV === 'production'

const api = {
  newslist: '/backend/infoMgmt/list',
  top: '/backend/infoMgmt/pushTop',
  hot: '/backend/infoMgmt/pushHot',
  enable: '/backend/infoMgmt/enable',
  broadcast: '/backend/info/broadcast',
  danger: '/upload/getCategoryLevel',
  add: '/backend/infoMgmt/add',
  remove: '/backend/infoMgmt/removeCoverImg',
  addBannerInfo: '/backend/infoMgmt/addBannerInfo',
  generateCode: '/backend/infoMgmt/getInfomationQrCode',
  currentInfo: '/backend/infoMgmt/getById',
  update: '/backend/infoMgmt/update',
  getUserNameList: '/backend/infoMgmt/getUserNameList',
  updateScannCount: '/backend/infoMgmt/updateScannCount'
}
// 获取资讯信息列表
export function getNewsList (parameter) {
  return axios({
    url: api.newslist,
    method: 'get',
    params: parameter
  })
}

// 置顶
export function getTop (parameter) {
  return axios({
    url: api.top,
    method: 'post',
    params: parameter
  })
}
// 热门
export function getHot (parameter) {
  return axios({
    url: api.hot,
    method: 'post',
    params: parameter
  })
}

// 禁用
export function getEnable (parameter) {
  return axios({
    url: api.enable,
    method: 'post',
    params: parameter
  })
}

// 推送
export function getBroadcast (parameter) {
  return axios({
    url: api.broadcast,
    method: 'post',
    params: parameter
  })
}

// 风险分类
export function getDangerList () {
  return axios({
    url: api.danger,
    method: 'get'
  })
}

// 新增
export function getNewsAdd (parameter) {
  return axios({
    url: api.add,
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

// 获取当前页面信息
export function getCurrentInfo (parameter) {
  return axios({
    url: api.currentInfo,
    method: 'get',
    params: parameter
  })
}

// 更新
export function getUpdate (parameter) {
  return axios({
    url: api.update,
    method: 'post',
    data: parameter
  })
}

// 具有权限的用户名
export function getUserNameList () {
  return axios({
    url: api.getUserNameList,
    method: 'get'
  })
}

// 编辑浏览量
export function getUpdateScannCount (parameter) {
  return axios({
    url: api.updateScannCount,
    method: 'post',
    params: parameter
  })
}

export let specialUrl = {
  code: !isDev
    ? 'https://testinfo.aifound.cn/newDetail.html?id='
    : 'https://info.aifound.cn/newDetail.html?id=',
  upload: !isDev
    ? 'https://testapp.aifound.cn/backend/infoMgmt/coverImgUpload'
    : 'https://app.aifound.cn/backend/infoMgmt/coverImgUpload'
}
