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
            path: '/policy/slideshowedit',
            name: 'slideShowEdit',
            hidden: true,
            component: () => import('@/views/policy/modules/slideShowEdit'),
            meta: {
              title: '保单管理-政策编辑',
              dutyName: 'policy',
              keepAlive: false
            }
          },
          {
            path: '/policy/slideshowadd',
            name: 'slideShowAdd',
            hidden: true,
            component: () => import('@/views/policy/modules/slideShowAdd'),
            meta: {
              title: '保单管理-政策新增',
              dutyName: 'policy',
              keepAlive: false
            }
          },
          {
            path: '/policy/newsedit',
            name: 'policyNewsEdit',
            hidden: true,
            component: () => import('@/views/policy/modules/newsEdit'),
            meta: {
              title: '保单管理-保险课堂内容编辑',
              dutyName: 'policy',
              keepAlive: false
            }
          },
          {
            path: '/policy/newsadd',
            name: 'policyNewsAdd',
            hidden: true,
            component: () => import('@/views/policy/modules/newsAdd'),
            meta: {
              title: '保单管理-保险课堂内容新增',
              dutyName: 'policy',
              keepAlive: false
            }
          },
          {
            path: '/policy/reportedit',
            name: 'reportEdit',
            hidden: true,
            component: () => import('@/views/policy/modules/reportEdit'),
            meta: {
              title: '行研报告-内容编辑',
              dutyName: 'policy',
              keepAlive: false
            }
          },
          {
            path: '/policy/reportadd',
            name: 'reportAdd',
            hidden: true,
            component: () => import('@/views/policy/modules/reportAdd'),
            meta: {
              title: '行研报告-内容新增',
              dutyName: 'policy',
              keepAlive: false
            }
          },
          {
            path: '/policy/viewactivities',
            name: 'viewActivities',
            hidden: true,
            component: () => import('@/views/policy/modules/ViewActivities'),
            meta: {
              title: '精彩活动管理-查看活动',
              dutyName: 'policy',
              keepAlive: false
            }
          },
          {
            path: '/policy/addactivities',
            name: 'addActivities',
            hidden: true,
            component: () => import('@/views/policy/modules/AddActivities'),
            meta: {
              title: '精彩活动管理-新增活动',
              dutyName: 'policy',
              keepAlive: false
            }
          },
          {
            path: '/policy/editactivities',
            name: 'editActivities',
            hidden: true,
            component: () => import('@/views/policy/modules/EditActivities'),
            meta: {
              title: '精彩活动管理-编辑活动',
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
            component: () => import('@/views/news/modules/newsEdit'),
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
            component: () => import('@/views/news/modules/newsAdd'),
            meta: {
              title: '资讯新增',
              dutyName: 'news',
              keepAlive: false
            }
          }
        ]
      },
      // 舆情管理
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
      },
      // 机构管理
      {
        path: '/institutionsAction',
        // name: 'institutionsAction',
        component: RouteView,
        children: [
          {
            path: 'addInstitution',
            name: 'addInstitution',
            hidden: true,
            component: () =>
							import('@/views/institutionsmanage/modules/bd/addInstitution'),
            meta: {
              title: '新增机构',
              dutyName: 'institutionsAction',
              keepAlive: false
            }
          },
          {
            path: 'editInstitution',
            name: 'editInstitution',
            hidden: true,
            component: () =>
							import('@/views/institutionsmanage/modules/bd/editInstitution'),
            meta: {
              title: '修改机构',
              dutyName: 'institutionsAction',
              keepAlive: false
            }
          },
          {
            path: 'addBrand',
            name: 'addBrand',
            hidden: true,
            component: () =>
							import('@/views/institutionsmanage/modules/bd/addBrand'),
            meta: {
              title: '新增品牌',
              dutyName: 'institutionsAction',
              keepAlive: false
            }
          },
          {
            path: 'editBrand',
            name: 'editBrand',
            hidden: true,
            component: () =>
							import('@/views/institutionsmanage/modules/bd/editBrand'),
            meta: {
              title: '修改品牌',
              dutyName: 'institutionsAction',
              keepAlive: false
            }
          },
          {
            path: 'corporateCheck',
            name: 'corporateCheck',
            hidden: true,
            component: () =>
							import('@/views/institutionsmanage/modules/check/corporateCheck'),
            meta: {
              title: '企业信息审核',
              dutyName: 'institutionsAction',
              keepAlive: false
            }
          },
          {
            path: 'businessBcheck',
            name: 'businessBcheck',
            hidden: true,
            component: () =>
							import('@/views/institutionsmanage/modules/check/businessBcheck'),
            meta: {
              title: '企业品牌',
              dutyName: 'institutionsAction',
              keepAlive: false
            }
          },
          {
            path: 'projectBcheck',
            name: 'projectBcheck',
            hidden: true,
            component: () =>
							import('@/views/institutionsmanage/modules/check/projectBcheck'),
            meta: {
              title: '项目品牌审核',
              dutyName: 'institutionsAction',
              keepAlive: false
            }
          },
          {
            path: 'institutionCheck',
            name: 'institutionCheck',
            hidden: true,
            component: () =>
							import(
							  '@/views/institutionsmanage/modules/check/institutionCheck'
							),
            meta: {
              title: '机构审核',
              dutyName: 'institutionsAction',
              keepAlive: false
            }
          },
          {
            path: 'brandCheck',
            name: 'brandCheck',
            hidden: true,
            component: () =>
							import('@/views/institutionsmanage/modules/check/brandCheck'),
            meta: {
              title: '品牌审核',
              dutyName: 'institutionsAction',
              keepAlive: false
            }
          },
          {
            path: 'consultantCheck',
            name: 'consultantCheck',
            hidden: true,
            component: () =>
							import(
							  '@/views/institutionsmanage/modules/check/consultantCheck'
							),
            meta: {
              title: '顾问审核',
              dutyName: 'institutionsAction',
              keepAlive: false
            }
          },
          {
            path: 'branchCheck',
            name: 'branchCheck',
            hidden: true,
            component: () =>
							import('@/views/institutionsmanage/modules/check/branchCheck'),
            meta: {
              title: '分支机构审核',
              dutyName: 'institutionsAction',
              keepAlive: false
            }
          },
          {
            path: 'sServiceCheck',
            name: 'sServiceCheck',
            hidden: true,
            component: () =>
							import('@/views/institutionsmanage/modules/check/sServiceCheck'),
            meta: {
              title: '特色服务审核',
              dutyName: 'institutionsAction',
              keepAlive: false
            }
          },
          {
            path: 'quaCheck',
            name: 'quaCheck',
            hidden: true,
            component: () =>
							import('@/views/institutionsmanage/modules/check/quaCheck'),
            meta: {
              title: '企业资质审核',
              dutyName: 'institutionsAction',
              keepAlive: false
            }
          },
          {
            path: 'honorCheck',
            name: 'honorCheck',
            hidden: true,
            component: () =>
							import('@/views/institutionsmanage/modules/check/honorCheck'),
            meta: {
              title: '企业荣誉审核',
              dutyName: 'institutionsAction',
              keepAlive: false
            }
          },
          {
            path: 'excitingCheck',
            name: 'excitingCheck',
            hidden: true,
            component: () =>
							import('@/views/institutionsmanage/modules/check/excitingCheck'),
            meta: {
              title: '精彩活动审核',
              dutyName: 'institutionsAction',
              keepAlive: false
            }
          }
        ]
      },
      // 用户管理
      {
        path: '/userlist',
        // name: 'userlist',
        component: RouteView,
        children: [
          {
            path: '/userlist/detail',
            name: 'userlistDetail',
            hidden: true,
            component: () => import('@/views/userlist/module/detail'),
            meta: {
              title: '用户详情',
              dutyName: 'userlist',
              keepAlive: true
            }
          }
        ]
      },
      // 客服管理
      {
        path: '/customer',
        // name: 'userlist',
        component: RouteView,
        children: [
          {
            name: 'businessAuthList',
            path: '/customeraction/businessAuthList',
            hidden: true,
            component: () =>
							import('@/views/customer/modules/businessAuthList'),
            meta: {
              title: '申请列表',
              dutyName: 'customer',
              keepAlive: true
            }
          },
          {
            name: 'businessAuthAdd',
            path: '/customeraction/businessAuthAdd',
            hidden: true,
            component: () => import('@/views/customer/modules/businessAuthAdd'),
            meta: {
              title: '提交认证信息',
              dutyName: 'customer',
              keepAlive: true
            }
          },
          {
            name: 'businessAuthEdit',
            path: '/customeraction/businessAuthEdit',
            hidden: true,
            component: () =>
							import('@/views/customer/modules/businessAuthEdit'),
            meta: {
              title: '修改认证信息',
              dutyName: 'customer',
              keepAlive: true
            }
          },
          {
            name: 'businessAuthTicket',
            path: '/customeraction/businessAuthTicket',
            hidden: true,
            component: () =>
							import('@/views/customer/modules/businessAuthTicket'),
            meta: {
              title: '企业认证申请',
              dutyName: 'customer',
              keepAlive: true
            }
          },
          {
            name: 'businessAuthHandle',
            path: '/customeraction/businessAuthHandle',
            hidden: true,
            component: () =>
							import('@/views/customer/modules/businessAuthHandle'),
            meta: {
              title: '企业认证详情',
              dutyName: 'customer',
              keepAlive: true
            }
          },
          {
            name: 'businessAuthCheck',
            path: '/customeraction/businessAuthCheck',
            hidden: true,
            component: () =>
							import('@/views/customer/modules/businessAuthCheck'),
            meta: {
              title: '企业认证详情',
              dutyName: 'customer',
              keepAlive: true
            }
          },
          {
            path: '/activityaction/addactivities',
            name: 'addActivities',
            hidden: true,
            component: () => import('@/views/policy/modules/AddActivities'),
            meta: {
              title: '精彩活动管理-新增活动',
              dutyName: 'activities',
              keepAlive: false
            }
          },
          {
            path: '/activityaction/editactivities',
            name: 'editActivities',
            hidden: true,
            component: () => import('@/views/policy/modules/EditActivities'),
            meta: {
              title: '精彩活动管理-编辑活动',
              dutyName: 'activities',
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
