<template>
	<div class="container">
		 <div class="search">   <el-input 	 style="width:200px;padding-top: 0.5%;margin-right: 100px;" size="medium"   v-model="search"  placeholder="输入订单号关键字搜索" />
		</div>
		 <!-- stripe border:default-sort="{prop: 'orderNo', order: 'ascending'}"  默认排序方式-->
		<el-table :data="Order.filter(data => !search || (data.orderNo +='') .toLowerCase().trim().includes(search.toLowerCase().trim())).slice((currentPage-1)*pagesize,currentPage*pagesize)"
		style="width:100%" stripe border:default-sort="{prop: 'orderNo', order: 'ascending'}"
		>
			<el-table-column prop="userId" label="用户编号" width="150"></el-table-column>
			<el-table-column prop="orderNo" label="订单号" width="180"></el-table-column>
			<el-table-column prop="payment" label="付款金额" width="120"></el-table-column>
			<el-table-column prop="paymentType" label="付款类型" width="100"></el-table-column>
			<el-table-column prop="postage" label="运费" width="100"></el-table-column>
			<el-table-column prop="status" label="订单状态" width="80">
        <template slot-scope="scope">
                    <p v-if="scope.row.status=='0'">
                        已取消
                    </p>
                    <p v-else-if="scope.row.status=='10'">
                        待付款
                    </p>
                   <p v-else-if="scope.row.status=='20'">
                        已付款
                    </p>
                    <p v-else-if="scope.row.status=='40'">
                        已发货
                    </p>
                    <p v-else-if="scope.row.status=='50'">
                        交易成功
                    </p>
            </template>
      </el-table-column>
			<el-table-column prop="paymentTime" label="交易时间" width="180"></el-table-column>
			<el-table-column prop="sendTime" label="发货时间" width="180"></el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button size="mini" type="success"  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button size="mini" type="danger" @click="detail(scope.row,form)">订单详细</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination class="fy" layout="prev, pager, next" @current-change="current_change" :total="total" background>
		</el-pagination>

	</div>
</template>

<script>
import { findCustomer } from '@/api/api';
import { findOrders } from '@/api/api';
import { updateOrder } from '@/api/api';
import { addOrder } from '@/api/api';
export default {
	inject: ['reload'],
	data() {
		return {
			total: 0, //默认数据总数
			pagesize: 10, //每页的数据条数
			currentPage: 1, //默认开始页面
			fileList: [],
			Order: [],
			search: '',
			dialogInfoVisible: false,
			formLabelWidth: '100px',
			form: {},
			add: 'flase',
			input: '',
			options: [],
		};
	},
	methods: {

		handleEdit(index, row) {
			this.form = row;
		},
		detail(row,form) {
				this.dialogInfoVisible = true;
			 this.$router.push({ path: '/home/detail', query: {userId:row.userId}});
		},
		cancle() {
			//关闭弹出的框
			this.dialogInfoVisible = false;
			this.reload();
		},

		current_change: function(currentPage) {
			this.currentPage = currentPage;
		},

	},
	created: function() {
		var that = this;

		findOrders()
			.then(res => {

				 for(var i in res){
					 that.Order.push(res[i]);
           this.total = this.Order.length;
				}


			})

	}
};
</script>

<style scoped>
.add {

	height: 40px;
	width: 100%;
	background-color: white;
	text-align: right;
}

.addbtn {
	margin-right: 10px;
	border: none;
}
.fy {
		margin-left: 50%;
		margin-top: 30px;
	}
.search {
		height: 50px;
		width: 100%;
		background-color: white;
		text-align: right;
	}
</style>
