import { axios } from '@/utils/request'

const api = {
  showResource: '/api/backend/employee/showResource',
  insertResource: '/api/backend/employee/insertResource',
  modifyResource: '/api/backend/employee/modifyResource',
  getAllRole: '/api/backend/employee/getAllRole',
  getAllRoles: '/api/backend/employee/getAllRoles',
  showSingleRole: '/api/backend/employee/showSingleRole',
  insertRoleAndDistributionResouce:
    '/api/backend/employee/insertRoleAndDistributionResouce',
  modifyRole: '/api/backend/employee/modifyRole',
  getAllUser: '/api/backend/employee/getAllUser',
  insertUser: '/api/backend/employee/insertUser',
  modifyPassword: '/api/backend/employee/modifyPassword',
  getUser: 'backend/employee/getUser',
  userRoleMap: 'backend/employee/userRoleMap'
}

export function getShowResource () {
  return axios({
    url: api.showResource,
    method: 'get'
  })
}
export function getInsertResource (parameter) {
  return axios({
    url: api.insertResource,
    method: 'post',
    params: parameter
  })
}
export function getModifyResource (parameter) {
  return axios({
    url: api.modifyResource,
    method: 'post',
    params: parameter
  })
}

export function getAllRole (parameter) {
  return axios({
    url: api.getAllRole,
    method: 'get',
    params: parameter
  })
}

export function getShowSingleRole (parameter) {
  return axios({
    url: api.showSingleRole,
    method: 'get',
    params: parameter
  })
}

export function getInsertRoleAndDistributionResouce (parameter) {
  return axios({
    url: api.insertRoleAndDistributionResouce,
    method: 'post',
    params: parameter
  })
}

export function getModifyRole (parameter) {
  return axios({
    url: api.modifyRole,
    method: 'post',
    params: parameter
  })
}

export function getAllUser (parameter) {
  return axios({
    url: api.getAllUser,
    method: 'get',
    params: parameter
  })
}

export function getInsertUser (parameter) {
  return axios({
    url: api.insertUser,
    method: 'post',
    params: parameter
  })
}

export function getModifyPassword (parameter) {
  return axios({
    url: api.modifyPassword,
    method: 'post',
    params: parameter
  })
}

export function getAllRoles () {
  return axios({
    url: api.getAllRoles,
    method: 'get'
  })
}

export function getUser (parameter) {
  return axios({
    url: api.getUser,
    method: 'get',
    params: parameter
  })
}

export function getUserRoleMap (parameter) {
  return axios({
    url: api.userRoleMap,
    method: 'get',
    params: parameter
  })
}
