import { axios } from '@/utils/request'

const api = {
  list: '/backend/warning/tab',
  column: '/backend/warning/column',
  addlist: '/backend/infoMgmt/add',
  columnsp: '/backend/infoMgmt/targetInfo',
  create: '/backend/infoMgmt/add',
  currentInfo: '/backend/infoMgmt/getById',
  keywordSystem: '/backend/infoMgmt/keywordSystem'
}

//  新增舆情预警
export function getAddlist (parameter) {
  return axios({
    url: api.addlist,
    method: 'post',
    params: parameter
  })
}

// 舆情预警 - 首页列表
export function getList (parameter) {
  return axios({
    url: api.list,
    method: 'get',
    params: parameter
  })
}

// 舆情预警 - 首页弹框
export function getColumn (parameter) {
  return axios({
    url: api.column,
    method: 'get',
    params: parameter
  })
}

export function getColumnsp (parameter) {
  return axios({
    url: api.columnsp,
    method: 'get',
    params: parameter
  })
}

//  编辑-新增
export function monitorcreate (parameter) {
  return axios({
    url: api.create,
    method: 'post',
    data: parameter
  })
}

// 编辑 - 获取当前页面信息
export function getCurrentInfo (parameter) {
  return axios({
    url: api.currentInfo,
    method: 'get',
    params: parameter
  })
}

// 编辑 - 获取搜索关键词
export function getkeywordSystem (parameter) {
  return axios({
    url: api.keywordSystem,
    method: 'post',
    params: parameter
  })
}
