import { axios } from '@/utils/request'

const api = {
  list: '/backend/warning/tab',
  column: '/backend/warning/column',
  Create: '/backend/infoMgmt/add'
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

//  编辑-新增
export function monitorcreate (parameter) {
  return axios({
    url: api.Create,
    method: 'post',
    data: parameter
  })
}
