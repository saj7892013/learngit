<template>
	<div class="container">
		<div class="add">
		<el-input style="width:200px;padding-top: 0.5%; padding-right: 3%;" size="medium"   v-model="search"  placeholder="输入留言时间关键字搜索" />
			<el-button  align="left" size="mini" type="danger" style="margin-right: 50px;"  @click="news()" >
				返回</el-button>
			</div>
		<el-table :data="newsdata .filter(data => !search || (data.orderNo +='') .toLowerCase().trim().includes(search.toLowerCase().trim())).slice((currentPage-1)*pagesize,currentPage*pagesize)"
		style="width:100%" stripe border:default-sort="{prop: 'orderNo', order: 'ascending'}">
			<el-table-column prop="username" label="客户微信昵称" width="150px"></el-table-column>
			<el-table-column  prop="wxopenid"  label="客户微信编号" width="300px"></el-table-column>
			<el-table-column  prop="clientGrade"  label="客户等级" width="150px"></el-table-column>
			<el-table-column  prop="attentionTime"  label="关注日期" width="200px"></el-table-column>
			<el-table-column  prop="attentionTime"  label="问题描述" width="200px"></el-table-column>
			<el-table-column    label="留言时间" width="200px"></el-table-column>
			<el-table-column label="操作" align="center" >
				<template slot-scope="scope">
				<el-button size="mini" @click="Reply(scope.row)">留言回复
				</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog title="留言信息" :visible.sync="dialogInfoVisible" @close="closeDialog(form)"  center>
		
		<el-input type="textarea" :rows="8"  placeholder="请输入内容"  v-model="textarea"></el-input>
		<div slot="footer" class="dialog-footer">
		<el-button  @click="clear()">清空</el-button>
		<el-button  type="primary" @click="confirm(form)">发送</el-button>
		</div>
		</el-dialog>
	</div>
</template>

<script>
	
	import { findCustomer } from '@/api/api';
	export default {
  data() {
    return {
		total: '', //默认数据总数
		pagesize: 10, //每页的数据条数
		currentPage: 1, //默认开始页面
		search: '',
		 textarea:"",
		 dialogInfoVisible: false,
		 newsdata:[]
    }
  },
  
  methods: {
	  news() {
	  
	  	 this.$router.push({ path: '/home/message'});
	  },
	 clear(textarea){
		 this.textarea="";
		 },
		 send(textarea,row){
			 
			 },
  	Reply(index, row) {
  		this.dialogInfoVisible = true;
		
  		
  	},
	
	},
  created: function() {
  	var that = this;
  	findCustomer()
  		.then(res => {
			var tt={};
			for(var i=0;i<res.length;i++){
				if(this.$route.query.id==res[i].wxopenid){
					tt = res[i];
					that.newsdata.push(tt);
				}
			}
			
  			
			
  		})
  		
  }
}
</script>

<style>
	.add {
		height: 50px;
		width: 100%;
		background-color: white;
		text-align: right;
	}
</style>
