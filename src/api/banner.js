import { axios } from '@/utils/request'
const isDev = process.env.NODE_ENV === 'production'

const api = {
  getBannerList: '/backend/getBannerList',
  getBannerType: '/backend/getBannerType',
  enable: '/backend/infoMgmt/enable',
  removeBannerImg: '/backend/removeBannerImg',
  addBanner: '/backend/addBanner',
  updateBanner: '/backend/updateBanner',
  getUserNameList: '/backend/infoMgmt/getUserNameList',
  getBannerById: '/backend/getBannerById'
}
/**
 * @param parameter
 * @returns {*}
 */
export function getBannerList (parameter) {
  return axios({
    url: api.getBannerList,
    method: 'get',
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

export function getBannerById (parameter) {
  return axios({
    url: api.getBannerById,
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

export function getBannerType (parameter) {
  return axios({
    url: api.getBannerType,
    method: 'get',
    params: parameter
  })
}

export function removeBannerImg (parameter) {
  return axios({
    url: api.removeBannerImg,
    method: 'post',
    params: parameter
  })
}

export function addBanner (parameter) {
  return axios({
    url: api.addBanner,
    method: 'post',
    data: parameter
  })
}

export function updateBanner (parameter) {
  return axios({
    url: api.updateBanner,
    method: 'post',
    data: parameter
  })
}

export const uploadUrl = !isDev
  ? 'https://testbiz.aifound.cn/backend/BannerImgUpload'
  : 'https://biz.aifound.cn/backend/BannerImgUpload'
