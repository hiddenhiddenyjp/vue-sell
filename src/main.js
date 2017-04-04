import Vue from 'vue'
import App from './App'
import vueResource from 'vue-resource'
import VueRouter from 'vue-router'
import goods from 'components/goods/goods';
import ratings from 'components/ratings/ratings';
import seller from 'components/seller/seller';
import './common/stylus/index.styl';
/* eslint-disable no-new */
Vue.use(vueResource);
Vue.use(VueRouter);

const routes = [
{
   path: '/',
   component: goods
},
{
   path: '/goods',
   component: goods
},
{
   path: '/ratings',
   component: ratings
},
{
   path: '/seller',
   component: seller
}
];

const router = new VueRouter({
   linkActiveClass: 'active',
   routes
});

new Vue({
   el: '#app',
   router,
   render: h => h(App)
})
