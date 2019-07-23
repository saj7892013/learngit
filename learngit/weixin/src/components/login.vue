<template>
	<div>
			<div class="login_div" align="center"><img  src="../assets/tiger.png" />
		<h1 align="center">欢迎登录小程序后台系统</h1>
	</div>
		<div class="login_form" align="center">
			<el-input placeholder="请输入用户名" prefix-icon="el-icon-search" v-model="userName" class="user"></el-input>
			<el-input placeholder="请输入密码" prefix-icon="el-icon-unlock" v-model="password" show-password class="password"></el-input>
			<el-button class="login_btn" @click.native="login" type="primary" round>登录</el-button>
		</div>
	</div>
</template>

<script>
import { findAdmin } from '@/api/api';

export default {
	data() {
		return {
			userName: '',
			password: ''
		};
	},
	methods: {
		login() {
			console.log('用户名是' + this.userName + '   密码是' + this.password);
			var that = this;
			if (that.userName == '' || that.password == '') {
				alert('请输入用户名或密码');
			} else {

				findAdmin({username:that.userName, password:that.password })
				.then(res => {
					if (res.status == 0) {
						var obj = {
							username: that.userName,
							password: that.password
						};
						localStorage.setItem('login', JSON.stringify(this.login)), this.$router.push('/home/frist');
						 localStorage.setItem('userName', JSON.stringify(this.userName));
					} else {
						if (res.status == 1) {
							alert(res.msg);
						} else {
							alert(res.msg);
						}
					}
				});
			}
		}
	}
};
</script>
<style>
.el-input {
	clearable: true;
}

.login_form {
	width: 30%;
	padding-top: 2%;
	padding-left: 20%;
	padding-right: 10%;
	margin: 0 10% 0 15%;
}

.login_div{
	padding-top: 5%;

}
.user {
	background-size: 13px 15px;
	background-position: 3%;
}

.password {
	background-size: 13px 15px;
	background-position: 3%;
	margin-bottom: 20px;
}



.login_btn {
	width: 100%;
	padding-top: 2%;
	font-size: 16px;
	background-color: #1e90ff;

}

.login_btn:hover {
	background-color: #1e90ff;
}
</style>
