import { axios } from '@/utils/request'
const isDev = process.env.NODE_ENV === 'production'

const api = {
  deleteFile: '/backend/upload/deleteFile',
  addBrandPageView: '/backend/brand/addBrandPageView',
  getBussiness: '/backend/brand/getBussiness',
  addBrandPageSave: '/backend/brand/addBrandPageSave',
  editViewBrand: '/backend/brand/editViewBrand',
  examineOption: '/backend/brand/examineOption',
  queryInstitutionListWithState: '/backend/brand/queryInstitutionListWithState',
  modifyBrandPage: '/backend/brand/modifyBrandPage'
}

// 品牌 - 概览
export function addBrandPageView (parameter) {
  return axios({
    url: api.addBrandPageView,
    method: 'get',
    params: parameter
  })
}

// 品牌 - 删除图片
export function deleteFile (parameter) {
  return axios({
    url: api.deleteFile,
    method: 'post',
    params: parameter
  })
}

// 获取关联公司
export function getBussiness (parameter) {
  return axios({
    url: api.getBussiness,
    method: 'get',
    params: parameter
  })
}

// 新增品牌 - 提交审核
export function addBrandPageSave (parameter) {
  return axios({
    url: api.addBrandPageSave,
    method: 'post',
    data: parameter
  })
}

// 品牌审核 - 概览
export function editViewBrand (parameter) {
  return axios({
    url: api.editViewBrand,
    method: 'get',
    params: parameter
  })
}

// 品牌审核 - 审核通过/驳回
export function examineOption (parameter) {
  return axios({
    url: api.examineOption,
    method: 'post',
    params: parameter
  })
}

// 修改后提交审核
export function modifyBrandPage (parameter) {
  return axios({
    url: api.modifyBrandPage,
    method: 'post',
    data: parameter
  })
}

export const uploadUrl = !isDev
  ? 'https://testapp.aifound.cn/backend/upload/uploadFile'
  : 'https://app.aifound.cn/backend/upload/uploadFile'
