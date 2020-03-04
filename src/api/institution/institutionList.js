import { axios } from '@/utils/request'

const api = {
  queryDicList: '/backend/institution/queryDicList',
  queryBrandDicList: '/backend/brand/queryBrandDicList',
  validateBrand: '/backend/brand/validateBrand',
  queryListWithState: '/backend/institution/queryListWithState',
  queryListNum: '/backend/institution/queryListNum'
}

// 审核列表数量
export function queryListNum (parameter) {
  return axios({
    url: api.queryListNum,
    method: 'get',
    params: parameter
  })
}

// 开通 - 搜索机构
export function queryDicList (parameter) {
  return axios({
    url: api.queryDicList,
    method: 'get',
    params: parameter
  })
}

// 开通 - 搜索品牌
export function queryBrandDicList (parameter) {
  return axios({
    url: api.queryBrandDicList,
    method: 'get',
    params: parameter
  })
}

// 审核列表
export function queryListWithState (parameter) {
  return axios({
    url: api.queryListWithState,
    method: 'get',
    params: parameter
  })
}

// 审核列表
export function validateBrand (parameter) {
  return axios({
    url: api.validateBrand,
    method: 'get',
    params: parameter
  })
}
