<template>
	<div class="container">
		<el-table :data="message" stripe border:default-sort="{prop: 'username', order: 'ascending'}" >
			<el-table-column prop="username" label="客户微信昵称" width="150px"></el-table-column>
			<el-table-column  prop="wxopenid"  label="客户微信编号" width="300px"></el-table-column>
			<el-table-column  prop="clientGrade"  label="客户等级" width="150px"></el-table-column>
			<el-table-column  prop="attentionTime"  label="关注日期" width="200px"></el-table-column>
			<el-table-column  prop="updateTime"  label="更新时间" width="200px"></el-table-column>
				<el-table-column label="操作" align="center" >
					<template slot-scope="scope">
					<el-button size="mini"  type="primary" @click="see(scope.row)">留言查看
					</el-button>
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
		 textarea:"",
		 message:[]
    }
  },

  methods: {
  	see(row) {
  		this.$router.push({ path: '/home/news', query: {id:row.wxopenid}});
  	},
	current_change: function(currentPage) {
		this.currentPage = currentPage;
	},
	},
  created: function() {
  	var that = this;

  	findCustomer()
  		.then(res => {
  			that.message = res;
        this.total = this.message.length;
  		}).catch(error => {
					console.log(error);
					alert('网络错误,不能访问');
				});

  }
}
</script>

<style scoped>
  .fy {
  	margin-left: 50%;
  	margin-top: 30px;
  }
</style>
