import { axios } from '@/utils/request'
const isDev = process.env.NODE_ENV === 'production'

const api = {
  prepareAdvertisement:
		'/backend/backstageConfigureController/prepareAdvertisement',
  addAdvertisement: '/backend/backstageConfigureController/addAdvertisement',
  editAdvertisement: '/backend/backstageConfigureController/editAdvertisement',
  showAdvertisement: '/backend/backstageConfigureController/showAdvertisement',
  editFunction: '/backend/backstageConfigureController/editFunction',
  showAdvertisements:
		'/backend/backstageConfigureController/showAdvertisements',
  removeAdvertisement:
		'/backend/backstageConfigureController/removeAdvertisement',
  showOwnership: '/backend/identification/showOwnership'
}
/**
 * @param parameter
 * @returns {*}
 */
export function prepareAdvertisement (parameter) {
  return axios({
    url: api.prepareAdvertisement,
    method: 'post',
    params: parameter
  })
}

export function addAdvertisement (parameter) {
  return axios({
    url: api.addAdvertisement,
    method: 'post',
    params: parameter
  })
}

export function editAdvertisement (parameter) {
  return axios({
    url: api.editAdvertisement,
    method: 'post',
    params: parameter
  })
}

export function showAdvertisement (parameter) {
  return axios({
    url: api.showAdvertisement,
    method: 'get',
    params: parameter
  })
}

export function editFunction (parameter) {
  return axios({
    url: api.editFunction,
    method: 'post',
    params: parameter
  })
}

export function showOwnership (parameter) {
  return axios({
    url: api.showOwnership,
    method: 'get',
    params: parameter
  })
}

export function showAdvertisements (parameter) {
  return axios({
    url: api.showAdvertisements,
    method: 'get',
    params: parameter
  })
}

export const uploadUrl = !isDev
  ? 'https://testapp.aifound.cn/backend/backstageConfigureController/updatePic'
  : 'https://app.aifound.cn/backend/backstageConfigureController/updatePic'
