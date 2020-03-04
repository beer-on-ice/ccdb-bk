import { axios } from '@/utils/request'
const isDev = process.env.NODE_ENV === 'production'

const api = {
  getAutoDic: '/backend/institution/getAutoDic',
  addInsPageSave: '/backend/institution/addInsPageSave',
  deleteFile: '/backend/upload/deleteFile',
  editViewIns: '/backend/institution/editViewIns',
  examineOption: '/backend/institution/examineOption',
  modifyInsPage: '/backend/institution/modifyInsPage'
}

// 机构 - 权限
export function getAutoDic (parameter) {
  return axios({
    url: api.getAutoDic,
    method: 'get',
    params: parameter
  })
}

// 机构 - 删除图片
export function deleteFile (parameter) {
  return axios({
    url: api.deleteFile,
    method: 'post',
    params: parameter
  })
}

// 机构 - 提交审核
export function addInsPageSave (parameter) {
  return axios({
    url: api.addInsPageSave,
    method: 'post',
    data: parameter
  })
}

// 机构审核 - 详情
export function editViewIns (parameter) {
  return axios({
    url: api.editViewIns,
    method: 'get',
    params: parameter
  })
}

// 机构审核 - 审核
export function examineOption (parameter) {
  return axios({
    url: api.examineOption,
    method: 'post',
    params: parameter
  })
}

// 编辑保存
export function modifyInsPage (parameter) {
  return axios({
    url: api.modifyInsPage,
    method: 'post',
    data: parameter
  })
}

export const uploadUrl = !isDev
  ? 'https://testapp.aifound.cn/backend/upload/uploadFile'
  : 'https://app.aifound.cn/backend/upload/uploadFile'
