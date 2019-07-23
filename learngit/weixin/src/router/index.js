import Vue from 'vue'
import Router from 'vue-router'

import login from '@/components/login'
import Home from '@/views/Home'
import Customer from '@/views/Customer'
import Lists from '@/views/Lists'

import Loading from '@/components/Loading'
import detail from '@/components/detail'
import news from '@/components/news'
import content from '@/components/content'
import Sort from '@/views/Sort'
import addSort from '@/views/addSort'
import ShapeOne from '@/Shape/ShapeOne'
import frist from '@/views/frist'
import message from '@/views/message'
import seePicture  from '@/views/seePicture'
import evaluation from '@/views/evaluation'

Vue.use(Router)



export default new Router({
	routes: [{
		path: '/',
		name: 'login',
		 meta: {
		 requireAuth: false, // 添加该字段，表示进入这个路由是需要登录的
		},
		component: login
	}, {
		path: '/home',
		name: 'Home',
		component: Home,
		 meta: {
		 requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
		},

		children:[
      {
      	path:'ShapeOne',
      	name:'ShapeOne',
      	meta: {
      	 requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      	},
      	component:ShapeOne
      },

			{
			path:'customer',
			name:'customer',
			meta: {
			 requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
			},
			component:Customer
		},{
			path:'lists',
			name:'lists',
			meta: {
			 requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
			},
			component:Lists
		},{
			path:'loading',
			name:'loading',
			meta: {
			 requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
			},
			component:Loading
		},
		{
			path:'detail',
			name:'detail',
			meta: {
			 requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
			},
			component:detail
		},{
			path:'news',
			name:'news',
			meta: {
			 requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
			},
			component:news
		},
		{
			path:'content',
			name:'content',
			meta: {
			 requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
			},
			component:content
		},
		{
			path:'message',
			name:'message',
			meta: {
			 requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
			},
			component:message
		},{
			path:'sort',
			name:'sort',
			meta: {
			 requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
			},
			component:Sort
			},


			{
				path:'addSort',
				name:'addSort',
				meta: {
				 requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
				},
				component:addSort
				},
				{
				path:'seePicture',
				name:'seePicture',
				meta: {
				 requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
				},
				component:seePicture
				},

			{
				path:'evaluation',
				name:'evaluation',
				meta: {
				 requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
				},
				component:evaluation
				},{
			path:'frist',
			name:'frist',
			meta: {
			 requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
			},
			component:frist
			}]
	}]
})
