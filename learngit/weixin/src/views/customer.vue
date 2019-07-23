<template>
	<div class="container">
		<el-table :data="tableData" stripe border:default-sort="{prop: 'id', order: 'ascending'}" >
			<el-table-column prop="id" label="编号" sortable="true" width="100px"></el-table-column>
			<el-table-column prop="username" label="姓名" sortable="true" width="100px"></el-table-column>
			<el-table-column prop="gender" label="性别" width="55px"></el-table-column>
			<el-table-column prop="attentionTime" label="关注日期" sortable="true" width="120px"></el-table-column>
			<el-table-column prop="address" label="地址"></el-table-column>
			<el-table-column prop="phone" label="电话"></el-table-column>
			<el-table-column prop="clientGrade" label="等级" width="80px"></el-table-column>
			<el-table-column prop="company" label="公司"></el-table-column>
			<el-table-column prop="customerIntegral" label="积分"></el-table-column>
			<el-table-column prop="wxopenid" label="微信id"></el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button slot="trigger" size="small" type="primary"  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
				</template>
			</el-table-column>
		</el-table>
<el-pagination class="fy" layout="prev, pager, next" @current-change="current_change" :total="total" background>
		</el-pagination>
		<el-dialog title="客户信息" :visible.sync="dialogInfoVisible" center>
			<el-form :model="form" ref="form" >
				<el-form-item label="客户姓名:" ><el-input v-model="form.username"></el-input></el-form-item>
				<el-form-item label="性别:" ><el-input v-model="form.gender"></el-input></el-form-item>
				<el-form-item label="客户地址:" ><el-input v-model="form.address"></el-input></el-form-item>
				<el-form-item label="客户公司:" ><el-input v-model="form.company"></el-input></el-form-item>
				<el-form-item label="客户电话:" ><el-input v-model="form.phone"></el-input></el-form-item>
				<el-form-item label="客户等级:" ><el-input v-model="form.clientGrade" :disabled="true"></el-input></el-form-item>
				<el-form-item label="客户积分:" ><el-input v-model="form.customerIntegral" :disabled="true"></el-input></el-form-item>
				<el-form-item label="微信id:" ><el-input v-model="form.wxopenid" ></el-input></el-form-item>
				<el-form-item label="email:" ><el-input v-model="form.email" ></el-input></el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="cancle()">取 消</el-button>
				<el-button type="primary" @click="confirm(form)">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import { findCustomer } from '@/api/api';
import { customerUpdate } from '@/api/api';

export default {
	inject: ['reload'],
	data() {
		return {
			total: 0, //默认数据总数
			pagesize: 10, //每页的数据条数
			currentPage: 1, //默认开始页面
			tableData: [],
			dialogInfoVisible: false,
			formLabelWidth: '80px',
			form: {},
		};
	},
	methods: {
		handleEdit(index, row) {
			this.dialogInfoVisible = true;
			this.form = row;
		},
		current_change: function(currentPage) {
			this.currentPage = currentPage;
		},
		cancle() {
			this.dialogInfoVisible = false;
			var that = this;
			this.total = this.tableData.length;
			findCustomer()
				.then(response => {
					that.tableData = response;

				})
				.catch(error => {
					console.log(error);
					alert('网络错误,不能访问');
				});
		},
		confirm(form) {
			var that = this;
				customerUpdate(form).then(res => {
					this.dialogInfoVisible = false;
					// 重新刷新main
					this.reload();
				}).catch(error => {
					console.log(error);
					alert('网络错误,不能访问');
				});
			// 重新刷新main
		}
	},
	created: function() {
		var that = this;

		findCustomer({})
			.then(response => {
				that.tableData = response;
        that.total=that.tableData.length

			})
			.catch(error => {
				console.log(error);
				alert('网络错误,不能访问');
			});
	}
};
</script>

<style scoped>
.el-form {
	width: 400px;
}

.el-form .el-input {
	width: 90px;
}
.addbtn {
	margin-right: 10px;
	border: none;
}
.fy {
		margin-left: 50%;
		margin-top: 30px;
	}
.add {
	height: 40px;
	width: 100%;
	background-color: white;
	text-align: right;
}
</style>
