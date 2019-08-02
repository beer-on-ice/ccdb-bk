import { axios } from '@/utils/request'

const api = {
  // 待修改
  warrantyList: '/api/backend/infoMgmt/warrantyList',
  addPolicy: '/api/backend/infoMgmt/addPolicy',
  update: '/api/backend/infoMgmt/update',
  getById: '/api/backend/infoMgmt/getById',
  enable: '/api/backend/infoMgmt/enable',
  pushTop: '/api/backend/infoMgmt/pushTop',
  pushHot: '/api/backend/infoMgmt/pushHot',
  getCategoryLevel: '/api/upload/getCategoryLevel',
  coverImgUpload: '/api/backend/infoMgmt/coverImgUpload',
  removeCoverImg: '/api/backend/infoMgmt/removeCoverImg',
  contentImgUpload: '/api/backend/infoMgmt/contentImgUpload',
  removeContentImg: '/api/backend/infoMgmt/removeContentImg',
  getInfomationQrCode: '/api/backend/infoMgmt/getInfomationQrCode',
  listPolicy: '/api/backend/infoMgmt/listPolicy',
  removeInfo: '/api/backend/infoMgmt/removeInfo'
}
// 待修改
export function getWarrantyList (parameter) {
  return axios({
    url: api.warrantyList,
    method: 'get',
    params: parameter
  })
}

// 新增咨询
export function getAddPolicy (parameter) {
  return axios({
    url: api.addPolicy,
    method: 'post',
    data: parameter
  })
}

// 更新咨询
export function getUpdate (parameter) {
  return axios({
    url: api.update,
    method: 'post',
    data: parameter
  })
}

//  根据id查询咨询
export function getById (parameter) {
  return axios({
    url: api.getById,
    method: 'get',
    params: parameter
  })
}

// 禁用/启用资讯
export function getEnable (parameter) {
  return axios({
    url: api.enable,
    method: 'post',
    params: parameter
  })
}

//  置顶/撤销置顶 资讯
export function getPushTop (parameter) {
  return axios({
    url: api.pushTop,
    method: 'post',
    params: parameter
  })
}

//  热门/撤销热门 资讯
export function getPushHot (parameter) {
  return axios({
    url: api.pushHot,
    method: 'post',
    params: parameter
  })
}

// 查询咨询分类信息
export function getCategoryLevel () {
  return axios({
    url: api.getCategoryLevel,
    method: 'get'
  })
}

// 封面图片上传接口
export function getCoverImgUpload (parameter) {
  return axios({
    url: api.coverImgUpload,
    method: 'post',
    params: parameter
  })
}

// 移除咨询封面图片
export function getRemoveUpload (parameter) {
  return axios({
    url: api.removeCoverImg,
    method: 'post',
    params: parameter
  })
}

//  内容图上传

export function getContentImgUpload (parameter) {
  return axios({
    url: api.contentImgUpload,
    method: 'post',
    params: parameter
  })
}

// 内容图片删除
export function getRemoveContentImg (parameter) {
  return axios({
    url: api.removeContentImg,
    method: 'post',
    params: parameter
  })
}

//  生成资讯展示二维码
export function getInfomationQrCode (parameter) {
  return axios({
    url: api.getInfomationQrCode,
    method: 'post',
    params: parameter
  })
}

// 政策列表展示
export function getListPolicy (parameter) {
  return axios({
    url: api.listPolicy,
    method: 'get',
    params: parameter
  })
}

export function getRemoveInfo (parameter) {
  return axios({
    url: api.removeInfo,
    method: 'post',
    params: parameter
  })
}
