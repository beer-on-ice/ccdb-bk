import { axios } from '@/utils/request'
const isDev = process.env.NODE_ENV === 'production'

const api = {
  // 香港
  warrantyList: '/backend/infoMgmt/warrantyList',
  addPolicy: '/backend/infoMgmt/addPolicy',
  update: '/backend/infoMgmt/update',
  getById: '/backend/infoMgmt/getById',
  enable: '/backend/infoMgmt/enable',
  pushTop: '/backend/infoMgmt/pushTop',
  pushHot: '/backend/infoMgmt/pushHot',
  getCategoryLevel: '/upload/getCategoryLevel',
  coverImgUpload: '/backend/infoMgmt/coverImgUpload',
  removeCoverImg: '/backend/infoMgmt/removeCoverImg',
  contentImgUpload: '/backend/infoMgmt/contentImgUpload',
  removeContentImg: '/backend/infoMgmt/removeContentImg',
  getInfomationQrCode: '/backend/infoMgmt/getInfomationQrCode',
  listPolicy: '/backend/infoMgmt/listPolicy',
  removeInfo: '/backend/infoMgmt/removeInfo',
  pagingInsuranceConfigure:
    '/backend/insurancePolicyEdit/pagingInsuranceConfigure',
  showInsurancePolicy: '/backend/insurancePolicyEdit/showInsurancePolicy',
  deleteInsuranceConfigure:
    '/backend/insurancePolicyEdit/deleteInsuranceConfigure',
  saveUploadInsurancePolicy:
    '/zuul/backend/insurancePolicyEdit/saveUploadInsurancePolicy',
  editRemoveInsurancePolicy:
    '/backend/insurancePolicyEdit/editRemoveInsurancePolicy',
  uploadInsurancePolicyDoc:
    '/zuul/backend/insurancePolicyEdit/uploadInsurancePolicyDoc',
  uploadInsurancePolicyPic:
    '/zuul/backend/insurancePolicyEdit/uploadInsurancePolicyPic',
  showTwoStageCosByCos: '/backend/insurancePolicyEdit/showTwoStageCosByCos',
  showTwoStageCosByCosMoreover:
    '/backend/insurancePolicyEdit/showTwoStageCosByCosMoreover',
  /// / 保险课堂 ////
  addInsurance: '/backend/insuranceClassroom/addInsurance',
  updateInsurance: '/backend/insuranceClassroom/updateInsurance',
  listInsurance: '/backend/insuranceClassroom/listInsurance',
  /// ///////  头条推荐///////////
  listLeadNews: '/backend/insuranceClassroom/listLeadNews',
  /// /// 轮播图 ///////
  listInsuranceBanner: '/backend/infoMgmt/listInsuranceBanner',
  addInsuranceBanner: '/backend/infoMgmt/addInsuranceBanner'
}

/// //////////// 香港保险 ///////////////////
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

// 删除政策
export function getRemoveInfo (parameter) {
  return axios({
    url: api.removeInfo,
    method: 'post',
    params: parameter
  })
}

// 保单服务查询
export function getPagingInsuranceConfigure (parameter) {
  return axios({
    url: api.pagingInsuranceConfigure,
    method: 'get',
    params: parameter
  })
}

// 上传文档
export function getUploadInsurancePolicyDoc (parameter) {
  return axios({
    url: api.uploadInsurancePolicyDoc,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 上传样例
export function getUploadInsurancePolicyPic (parameter) {
  return axios({
    url: api.uploadInsurancePolicyPic,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 保单服务新增-保存
export function getSaveUploadInsurancePolicy (parameter) {
  return axios({
    url: api.saveUploadInsurancePolicy,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 保单服务 删除
export function getDeleteInsuranceConfigure (parameter) {
  return axios({
    url: api.deleteInsuranceConfigure,
    method: 'post',
    params: parameter
  })
}

// 获取单条保单信息
export function getShowInsurancePolicy (parameter) {
  return axios({
    url: api.showInsurancePolicy,
    method: 'get',
    params: parameter
  })
}

export function getEditRemoveInsurancePolicy (parameter) {
  return axios({
    url: api.editRemoveInsurancePolicy,
    method: 'post',
    params: parameter
  })
}

export function getShowTwoStageCosByCos (parameter) {
  return axios({
    url: api.showTwoStageCosByCos,
    method: 'get',
    params: parameter
  })
}

// 获取二级分类
export function getShowTwoStageCosByCosMoreover (parameter) {
  return axios({
    url: api.showTwoStageCosByCosMoreover,
    method: 'get',
    params: parameter
  })
}

/// /////////////// 保险课堂 /////////////////////////
// 获取列表
export function getListInsurance (parameter) {
  return axios({
    url: api.listInsurance,
    method: 'get',
    params: parameter
  })
}

// 新增列表
export function getAddInsurance (parameter) {
  return axios({
    url: api.addInsurance,
    method: 'post',
    data: parameter
  })
}

// 更新列表
export function getUpdateInsurance (parameter) {
  return axios({
    url: api.updateInsurance,
    method: 'post',
    data: parameter
  })
}

/// // 头条推荐////////
export function getListLeadNews (parameter) {
  return axios({
    url: api.listLeadNews,
    method: 'get',
    params: parameter
  })
}

/// /// 轮播图 ///////
export function getListInsuranceBanner (parameter) {
  return axios({
    url: api.listInsuranceBanner,
    method: 'get',
    params: parameter
  })
}

export function getAddInsuranceBanner (parameter) {
  return axios({
    url: api.addInsuranceBanner,
    method: 'post',
    data: parameter
  })
}

export let specialUrl = {
  code: !isDev
    ? 'https://testinfo.aifound.cn/newDetail.html?id='
    : 'https://info.aifound.cn/newDetail.html?id=',
  upload: !isDev
    ? 'https://testapp.aifound.cn/backend/infoMgmt/coverImgUpload'
    : 'https://app.aifound.cn/backend/infoMgmt/coverImgUpload',
  policyUpload: !isDev
    ? 'https://testapp.aifound.cn/zuul/backend/insurancePolicyEdit/uploadPhysicalPdfAndPic'
    : 'https://app.aifound.cn/zuul/backend/insurancePolicyEdit/uploadPhysicalPdfAndPic'
}
