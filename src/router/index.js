import Vue from 'vue'
import VueRouter from 'vue-router'

import Cookies from 'js-cookie';

Vue.use(VueRouter)

  const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/',
    name: 'NULL',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/index',
    name: 'Index',
    component: () => import('../views/Index.vue'),
    children: [
      {
        path: '/area',
        name: 'area',
        component: () => import('../views/page/area.vue')
      },
      {
        path: '/year',
        name: 'year',
        component: () => import('../views/page/year.vue')
      },
      {
        path: '/progress',
        name: 'progress',
        component: () => import('../views/page/progress.vue')
      },
      {
        path: '/channel',
        name: 'channel',
        component: () => import('../views/page/channel.vue')
      },
      {
        path: '/hometype',
        name: 'hometype',
        component: () => import('../views/page/hometype.vue')
      },
      {
        path: '/project',
        name: 'project',
        component: () => import('../views/page/project.vue')
      },
      {
        path: '/log',
        name: 'log',
        component: () => import('../views/page/log.vue')
      },
      {
        path: '/projectDetail',
        name: 'projectDetail',
        component: () => import('../views/page/projectDetail.vue')
      },
      {
        path: '/projectEdit',
        name: 'projectEdit',
        component: () => import('../views/page/projectEdit.vue')
      },
      {
        path: '/villages',
        name: 'villages',
        component: () => import('../views/page/villages.vue')
      },
      {
        path: '/searchVillages',
        name: 'projectEsearchVillagesdit',
        component: () => import('../views/page/searchVillages.vue')
      },
      {
        path: '/villagesDetail',
        name: 'villagesDetail',
        component: () => import('../views/page/villagesDetail.vue')
      },
      {
        path: '/office',
        name: 'villages',
        component: () => import('../views/page/office.vue')
      },
      {
        path: '/searchOffice',
        name: 'searchOffice',
        component: () => import('../views/page/searchOffice.vue')
      },
      {
        path: '/officeDetail',
        name: 'officeDetail',
        component: () => import('../views/page/officeDetail.vue')
      },
      {
        path: '/residence',
        name: 'villages',
        component: () => import('../views/page/residence.vue')
      },
      {
        path: '/searchResidence',
        name: 'projectEsearchVillagesdit',
        component: () => import('../views/page/searchResidence.vue')
      },
      {
        path: '/residenceDetail',
        name: 'residenceDetail',
        component: () => import('../views/page/residenceDetail.vue')
      },
      {
        path: '/park',
        name: 'villages',
        component: () => import('../views/page/park.vue')
      },
      {
        path: '/searchPark',
        name: 'projectEsearchVillagesdit',
        component: () => import('../views/page/searchPark.vue')
      },
      {
        path: '/parkDetail',
        name: 'parkDetail',
        component: () => import('../views/page/parkDetail.vue')
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // 如果未匹配到路由

  if (to.matched.length === 0) {
    // 跳转至登陆页面
    next('/login');
  } else {
    try {
      // 判断cookie是否未登录，未记录则拦截，跳转至登陆页面
      if (!Cookies.get('user')) {
        // 前往的页面是不是登录页，不是则跳转到登录页
        if (to.name !== 'Login') {
          next('/login');
        } else {
          next();
        }
      } else {
        if (to.name === 'Login') {
          next('/home');
        } else {
          next();
        }
      }
    } catch (e) {
      next();
    }
  }
});

export default router
