import { axios } from '@/utils/request'

const api = {
  allList: '/api/backend/insurancePolicyEdit/multipleConditionsPolicyList',

}
/**
* @param parameter
* @returns {*}
*/
export function getAllList (parameter) {
  return axios({
    url: api.allList,
    methods: 'get',
    params: parameter
  })

}
