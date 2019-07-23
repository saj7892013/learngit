<template>
	<div>
		<el-container>
			<el-header>
				<span>
				<img src="../assets/login1.png" align="left" />
				 <img src="../assets/admin.gif"  align="right"/>
				<h1>后台管理系统</h1>
				</span>

			</el-header>
			<el-container>
				<el-aside width="200px">
					<el-menu :unique-opened="true" class="el-menu-vertical-demo" style="background: whitesmoke;">

							<el-submenu index="28"   >
								<template slot="title">
									<i class="el-icon-s-home"></i>
									<span slot="title">
                     <router-link to="/home/frist">
                    首页
                    </router-link>
                  </span>
								</template>
             <el-menu-item index="70-1"><router-link to="/home/frist">订单扇形统计图</router-link></el-menu-item>
             <el-menu-item index="70-2"><router-link to="/home/ShapeOne">订单统计图</router-link></el-menu-item>
							</el-submenu>

						<router-link to="/home/customer">
							<el-menu-item index="29">
								<i class="el-icon-s-custom"></i>
								<span slot="title">客户列表</span>
							</el-menu-item>
						</router-link>
						 <el-submenu index="n">
						    <template slot="title" ><i class="el-icon-s-management"></i><span >产品分类</span></template>
						 	<el-submenu v-for="(item,index1) in goodsproductlist"  :key="index1" :index="index1+''"
							 >
						 		<template slot="title">
									<i class="el-icon-star-on"></i>
								{{item.level_1_cate_name}}</template>
						 		<el-menu-item v-for="(item2,index2) in item.level_2_cate_with_products" :key="index2" :index="index2+''"
								:class = "active == index2 ? 'addclass' : '' " @click='dowm(index2)'>
									<router-link  :to="{ path: '/home/sort',
									 query: { id: item2.id ,sort1:item.level_1_cate_name,sort2:item2.nameCategory} }"
									  exact>
									  <i class="el-icon-star-off"></i>
									      <span  >{{ item2.nameCategory }}
										  </span>
									</router-link>
								</el-menu-item>
						 	</el-submenu>
						  </el-submenu>

						<router-link to="/home/loading">
							<el-menu-item index="30">
								<i class="el-icon-s-operation"></i>
								<span slot="title">服务订单</span>
							</el-menu-item>
						</router-link>
						<router-link to="/home/lists">
							<el-menu-item index="31">
								<i class="el-icon-s-order"></i>
								<span slot="title">订单中心</span>
							</el-menu-item>
						</router-link>
						<router-link to="/home/message">
							<el-menu-item index="32">
								<i class="el-icon-s-comment"></i>
								<span slot="title">客户留言</span>
							</el-menu-item>
						</router-link>
						<router-link to="/home/evaluation">
							<el-menu-item index="33">
								<i class="el-icon-edit-outline"></i>
								<span slot="title">客户评价</span>
							</el-menu-item>
						</router-link>
						<router-link to="/home/seePicture">
							<el-menu-item index="34">
								<i class="el-icon-s-finance"></i>
								<span slot="title">查看商品图</span>
							</el-menu-item>
						</router-link>
						<router-link to="/home/addsort">
							<el-menu-item index="35">
								<i class="el-icon-circle-plus"></i>
								<span slot="title">添加种类</span>
							</el-menu-item>
						</router-link>

						<el-submenu index="35">
							<template slot="title">
								<i class="el-icon-s-tools"></i>
								<span slot="title">系统设置</span>
							</template>
							<el-menu-item index="35-1">帮助文档</el-menu-item>
							<el-menu-item index="35-2">选项2</el-menu-item>
							<el-menu-item index="35-3">选项3</el-menu-item>
							<el-menu-item index="35-4">选项4</el-menu-item>
						</el-submenu>
					</el-menu>
				</el-aside>
				<el-main><router-view></router-view></el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
	import { findSort } from '@/api/api';
export default {
	data() {
		return {
			userName:'',
			goodsproductlist:[],
			   active:""
			    }
			},
		  methods:{
			  dowm(index2){
    //将点击的元素的索引赋值给变量
    this.active = index2
}
		  },
			created: function() {
                this.userName = localStorage.getItem('userName')
				var that = this;
				findSort().then((res) => {
          console.log(res)
					that.goodsproductlist = res;
					}).catch(error => {
					console.log(error);
					alert('网络错误,不能访问');
				});

			}
			};

</script>

<style scoped>
.el-header {
	background: linear-gradient(to right bottom, #1e90ff 0%, #00ffff 90%);
}


.el-header h1 {
	color: white;
	font-size: 20px;
	line-height: 30px;
	margin-left: 296px;
}

.el-aside {

	height: 661px;
}
.addclass{
   border-bottom: 50px solid #CCEEFF;
   color:#33CCFF;
}
.Retract {
	text-align: center;
}

a {
	text-decoration: none;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
	width: 200px;
	border: none;
	/* background: whitesmoke; */
    color: white;
    font-size: 100px;
}

.el-main {
	background-color: #e6e6e6;
}
</style>
