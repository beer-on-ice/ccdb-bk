import { axios } from '@/utils/request'
const isDev = process.env.NODE_ENV === 'production'

const api = {
  keywordsMultipleQuery:
		'/backend/backstageConfigureController/keywordsMultipleQuery',
  lenovoSearch: '/backend/backstageConfigureController/lenovoSearch',
  addKeyword: '/backend/backstageConfigureController/addKeyword',
  removeKeyword: '/backend/backstageConfigureController/removeKeyword',
  editSort: '/backend/backstageConfigureController/editSort'
}
/**
 * @param parameter
 * @returns {*}
 */
export function keywordsMultipleQuery (parameter) {
  return axios({
    url: api.keywordsMultipleQuery,
    method: 'get',
    params: parameter
  })
}

export function lenovoSearch (parameter) {
  return axios({
    url: api.lenovoSearch,
    method: 'get',
    params: parameter
  })
}

export function addKeyword (parameter) {
  return axios({
    url: api.addKeyword,
    method: 'post',
    params: parameter
  })
}

export function removeKeyword (parameter) {
  return axios({
    url: api.removeKeyword,
    method: 'post',
    params: parameter
  })
}

export function editSort (parameter) {
  return axios({
    url: api.editSort,
    method: 'post',
    params: parameter
  })
}
