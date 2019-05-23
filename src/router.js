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
          component: getComponent('home', 'index'),
          meta: {
            title: '首页'
          }
        }
      ]
    }
  ]
});
