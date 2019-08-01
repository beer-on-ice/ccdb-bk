import { axios } from '@/utils/request'

const api = {
  newslist: '/api/backend/infoMgmt/list',
  top: '/api/backend/infoMgmt/pushTop',
  hot: '/api/backend/infoMgmt/pushHot',
  enable: '/api/backend/infoMgmt/enable',
  broadcast: '/api/backend/info/broadcast',
  danger: '/api/upload/getCategoryLevel',
  add: '/api/backend/infoMgmt/add',
  remove: '/api/backend/infoMgmt/removeCoverImg',
  addBannerInfo: '/api/backend/infoMgmt/addBannerInfo',
  generateCode: '/api/backend/infoMgmt/getInfomationQrCode',
  currentInfo: '/api/backend/infoMgmt/getById',
  update: '/api/backend/infoMgmt/update'
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
