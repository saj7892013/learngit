<template>
	<div class="container">
		<el-table :data="evaluation" style="width: 100%"  stripe border:default-sort="{prop: 'userId', order: 'ascending'}" >
			<el-table-column prop="id" label="用户编号" width="100px"></el-table-column>
			<el-table-column prop="clientGrade" label="等级" width="100px"></el-table-column>
			<el-table-column prop="wxopenid" label="微信编号" width="300px" align="center"></el-table-column>
			<el-table-column prop="wxnickname" label="微信昵称" width="150px" align="center" ></el-table-column>
			<el-table-column prop="createTime" label="关注日期" align="center" sortable="true" width="250px"></el-table-column>
			<el-table-column prop="updateTime" label="更新日期" align="center" sortable="true" width="250px"></el-table-column>

				<el-table-column label="评论内容" >
					<template slot-scope="scope">
				<el-button size="mini" type="success" @click="see(scope.row)">点击查看</el-button>
				</template>
				</el-table-column>
		</el-table>
		<el-pagination class="fy" layout="prev, pager, next" @current-change="current_change" :total="total" background>
		</el-pagination>
	</div>
</template>

<script>
	import { findCustomer } from '@/api/api';

	export default {
  data() {
    return {
		total: 0, //默认数据总数
		pagesize: 10, //每页的数据条数
		currentPage: 1, //默认开始页面
		evaluation: [],
    }
  },
  methods: {
  	see(row) {
  		this.$router.push({ path: '/home/content', query: {id:row.id}});
  	},
	current_change: function(currentPage) {
		this.currentPage = currentPage;
	},
	},
  created: function() {
  	var that = this;

  	findCustomer()
  		.then(res => {
  			that.evaluation = res;
that.total=that.evaluation.length;
  		}).catch(error => {
  					console.log(error);
  					alert('网络错误,不能访问');
  				});

  }
}
</script>
.fy {
		margin-left: 50%;
		margin-top: 30px;
	}
<style scoped></style>
