import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
// 路由懒加载
const getComponent = (name, component) => () => import(`@/views/${name}/${component}.vue`);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      component: getComponent('layout', 'Layout'),
      children: [
        {
          path: '/home',
          name: 'home',
          component: getComponent('home', 'index'),
          meta: {
            title: '首页'
          }
        },
        {
          path: '/elementIcon',
          name: 'elementIcon',
          component: getComponent('icons', 'elementIcon'),
          meta: {
            title: 'element'
          }
        },
        {
          path: '/iconfont',
          name: 'iconfont',
          component: getComponent('icons', 'iconfont'),
          meta: {
            title: 'iconfont'
          }
        }
      ]
    },
    {
      path: '/worldmap',
      name: 'worldmap',
      component: getComponent('worldmap', 'index'),
      meta: {
        title: 'worldmap'
      }
    }
  ]
});
