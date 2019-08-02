// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        name: 'welcome',
        component: () => import('@/views/welcome'),
        meta: {
          title: '欢迎',
          keepAlive: true
        }
      },
      // 保单管理
      {
        path: '/policy',
        name: 'policy',
        redirect: '/policy/policyManagement',
        component: RouteView,
        meta: {
          title: '内容管理',
          keepAlive: true
        },
        children: [
          {
            path: '/policy/newpolicyedit',
            name: 'newPolicyEdit',
            hidden: true,
            component: () => import('@/views/policy/module/newPolicyEdit'),
            meta: {
              title: '保单管理-政策编辑',
              dutyName: 'policy',
              keepAlive: false
            }
          },
          {
            path: '/policy/newpolicyadd',
            name: 'newPolicyAdd',
            hidden: true,
            component: () => import('@/views/policy/module/newPolicyAdd'),
            meta: {
              title: '保单管理-政策编辑',
              dutyName: 'policy',
              keepAlive: false
            }
          }
        ]
      },
      // 资讯管理
      {
        path: '/news',
        name: 'news',
        redirect: '/news/newsManagement',
        component: RouteView,
        meta: {
          title: '资讯管理',
          keepAlive: true
        },
        children: [
          {
            path: '/news/newsedit',
            name: 'newsEdit',
            hidden: true,
            component: () => import('@/views/news/module/newsEdit'),
            meta: {
              title: '资讯编辑',
              dutyName: 'news',
              keepAlive: false
            }
          },
          {
            path: '/news/newsadd',
            name: 'newsAdd',
            hidden: true,
            component: () => import('@/views/news/module/newsAdd'),
            meta: {
              title: '资讯新增',
              dutyName: 'news',
              keepAlive: false
            }
          }
        ]
      }
    ]
  },
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () =>
          import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () =>
          import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () =>
          import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      }
    ]
  },
  {
    path: '/404',
    component: () =>
      import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]

export const asyncRouterMap = [
  // {
  //   path: '/',
  //   name: 'index',
  //   component: BasicLayout,
  //   meta: { title: '首页' },
  //   redirect: '/policy/policyManagement',
  //   children: [
  //     // 保单管理
  //     {
  //       path: '/policy',
  //       name: 'policy',
  //       redirect: '/policy/policyManagement',
  //       component: RouteView,
  //       meta: {
  //         title: '内容管理',
  //         keepAlive: true,
  //         icon: bxAnaalyse,
  //         permission: [10]
  //       },
  //       children: [
  //         {
  //           path: '/policy/policyManagement',
  //           name: 'policyManagement',
  //           component: () => import('@/views/policy/policyManagement'),
  //           meta: {
  //             title: '保单内容编辑',
  //             keepAlive: false,
  //             permission: [10]
  //           }
  //         },
  //         {
  //           path: '/policy/newpolicyedit',
  //           name: 'newPolicyEdit',
  //           hidden: true,
  //           component: () => import('@/views/policy/module/newPolicyEdit'),
  //           meta: {
  //             title: '保单管理-政策编辑',
  //             keepAlive: false,
  //             permission: [10]
  //           }
  //         }
  //       ]
  //     },
  //     // 资讯管理
  //     {
  //       path: '/news',
  //       name: 'news',
  //       redirect: '/news/management',
  //       component: RouteView,
  //       meta: {
  //         title: '资讯管理',
  //         keepAlive: true,
  //         icon: bxAnaalyse,
  //         permission: ['marketing']
  //       },
  //       children: [
  //         {
  //           path: '/news/management',
  //           name: 'newsManagement',
  //           component: () => import('@/views/news/newsManagement'),
  //           meta: {
  //             title: '资讯列表',
  //             keepAlive: false,
  //             permission: ['marketing']
  //           }
  //         },
  //         {
  //           path: '/news/newsedit',
  //           name: 'newsEdit',
  //           hidden: true,
  //           component: () => import('@/views/news/module/newsEdit'),
  //           meta: {
  //             title: '资讯编辑',
  //             keepAlive: false,
  //             permission: ['marketing']
  //           }
  //         },
  //         {
  //           path: '/news/newsadd',
  //           name: 'newsAdd',
  //           hidden: true,
  //           component: () => import('@/views/news/module/newsAdd'),
  //           meta: {
  //             title: '资讯新增',
  //             keepAlive: false,
  //             permission: ['marketing']
  //           }
  //         }
  //       ]
  //     },
  //     // 权限管理
  //     {
  //       path: '/rights',
  //       name: 'rights',
  //       redirect: '/rights/menumanagement',
  //       component: RouteView,
  //       meta: {
  //         title: '权限管理',
  //         keepAlive: true,
  //         icon: bxAnaalyse,
  //         permission: ['marketing']
  //       },
  //       children: [
  //         {
  //           path: '/rights/menumanagement',
  //           name: 'menuManagement',
  //           component: () => import('@/views/rights/menuManagement'),
  //           meta: {
  //             title: '菜单管理',
  //             keepAlive: false,
  //             permission: ['marketing']
  //           }
  //         },
  //         {
  //           path: '/rights/usermanagement',
  //           name: 'userManagement',
  //           component: () => import('@/views/rights/userManagement'),
  //           meta: {
  //             title: '用户管理',
  //             keepAlive: false,
  //             permission: ['marketing']
  //           }
  //         },
  //         {
  //           path: '/rights/rolemanagement',
  //           name: 'roleManagement',
  //           component: () => import('@/views/rights/roleManagement'),
  //           meta: {
  //             title: '角色管理',
  //             keepAlive: false,
  //             permission: ['marketing']
  //           }
  //         }
  //       ]
  //     },
  //     // 客服管理
  //     {
  //       path: '/customer ',
  //       name: 'customer',
  //       redirect: '/customer/management',
  //       component: RouteView,
  //       meta: {
  //         title: '客服管理',
  //         keepAlive: true,
  //         icon: bxAnaalyse,
  //         permission: ['marketing']
  //       },
  //       children: [
  //         {
  //           path: '/customer/management',
  //           name: 'customerManagement',
  //           component: () => import('@/views/customer/Customer'),
  //           meta: {
  //             title: '客服管理-保单服务',
  //             keepAlive: false,
  //             permission: ['marketing']
  //           }
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   path: '*',
  //   redirect: '/404',
  //   hidden: true
  // }
]
