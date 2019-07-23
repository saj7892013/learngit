// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import qs from 'qs'
import '../config/style/theme.css'
import '../config/style/character.css'
// 必须引入 vue-fusioncharts 和 fusioncharts
import VueFusionCharts from 'vue-fusioncharts';
import FusionCharts from 'fusioncharts/core';
// 可选，引入扁平画主题
import FusionTheme from 'fusioncharts/themes/es/fusioncharts.theme.fusion'
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
// 想显示图形，必须引入图形类型模块。
// 比如饼状图如下
import Pie2D from 'fusioncharts/viz/pie2d'
import Vuex from 'vuex'
Vue.use(Vuex)
Vue.use(VueFusionCharts, FusionCharts, FusionTheme, Pie2D); // 添加多个类型图形，就在后面添加上
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;
Vue.prototype.HOST = "/api";

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	axios,
	// render: h => h(App)
	components: {
		App
	},
	template: '<App/>'
})
router.beforeEach((to, from, next) => {
	if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
		if (localStorage.getItem('login')) { // 通过vuex state获取当前的token是否存在,通过一个变量（vuex中或localstorage中），如果为真，那么跳转
			next();
		} else {
			alert("请登录")
			next(
				'../' //如果为假，则重定向到这个路由路劲
			)
		}
	} else {
		next()
	}
})
