import Vue from 'vue'
import store from './store'

/** 权限指令**/
const directive = Vue.directive('auth', {
  inserted: function (el, binding, vnode) {
    if (!Vue.prototype.$_has(binding.value)) {
      el.parentNode.removeChild(el)
    }
  }
})
// 权限检查方法
Vue.prototype.$_has = function (value) {
  let isExist = false
  let role = store.getters.roles.id

  if (role !== value) {
    return false
  } else {
    isExist = true
  }
  return isExist
}
export { directive }
