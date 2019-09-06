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
    // name: 'index',
    component: BasicLayout,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        name: 'welcome',
        component: () => import('@/views/welcome'),
        meta: {
          title: '欢迎'
        }
      },
      // 保单管理
      {
        path: '/policy',
        // name: 'policy',
        component: RouteView,
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
        // name: 'news',
        component: RouteView,
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
      },
      {
        path: '/warning',
        // name: 'warning',
        component: RouteView,
        children: [
          {
            path: '/warning/monitorEdit',
            name: 'monitorEdit',
            hidden: true,
            component: () => import('@/views/warning/module/monitorEdit'),
            meta: {
              title: '舆情编辑',
              dutyName: 'warning',
              keepAlive: false
            }
          },
          {
            path: '/warning/monitorAdd',
            name: 'monitorAdd',
            hidden: true,
            component: () => import('@/views/warning/module/monitorAdd'),
            meta: {
              title: '舆情新增',
              dutyName: 'warning',
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

export const asyncRouterMap = []
