<template>
	<div class="container">
		<div class="add">
		 <el-input  style="width:200px;padding-top: 0.5%;margin-right: 1%"    v-model="search"  placeholder="输入商品名称关键字搜索" />
				<el-button   size="mini" type="danger" @click="detail()">返回</el-button>
						  <el-button  type="danger" size="mini"  @click="exportExcel" style="margin-top: 10px;margin-right: 4%" >导出表格</el-button>
		</div>
		<el-table :data="orderdetail.filter(data => !search || data.productName.toLowerCase().includes(search.toLowerCase())).slice((currentPage-1)*pagesize,currentPage*pagesize)"
		 style="width:100%" stripe border:default-sort="{prop: 'orderNo', order: 'ascending'}"
		 id="out-table">
      <el-table-column prop="userId" label="用户编号" width="150"></el-table-column>
			<el-table-column prop="orderNo" label="订单号" width="180"></el-table-column>
      <el-table-column prop="productName" label="产品名称" width="150"></el-table-column>
      <el-table-column prop="quantity" label="数量" width="120"></el-table-column>
			<el-table-column prop="totalPrice" label="付款金额" width="120"></el-table-column>
			<el-table-column prop="paymentType" label="付款类型" width="100"></el-table-column>
			<el-table-column prop="postage" label="运费" width="100"></el-table-column>
			<el-table-column prop="createTime" label="下单时间" width="180"></el-table-column>
			<el-table-column prop="sendTime" label="发货时间" width="180"></el-table-column>
		</el-table>
		<el-pagination class="fy" layout="prev, pager, next" @current-change="current_change" :total="total" background>
		</el-pagination>

	</div>
</template>

<script>
 import FileSaver from "file-saver";
	import XLSX from "xlsx";
import { OrderDetail } from '@/api/api';
import { updateOrder } from '@/api/api';

export default {
	inject: ['reload'],
	data() {
		return {
			total: '', //默认数据总数
			pagesize: 10, //每页的数据条数
			currentPage: 1, //默认开始页面
			search: '',
			fileList: [],
			orderdetail: [],
			dialogInfoVisible: false,
			formLabelWidth: '100px',
			form: {},
			add: 'flase',
			input: '',
			options: [],
			text:{}

		};
	},
	methods: {
		exportExcel() {
		/* 从表生成工作簿对象 */
		var wb = XLSX.utils.table_to_book(document.querySelector("#out-table"));
		/* 获取二进制字符串作为输出 */
		var wbout = XLSX.write(wb, {
		    bookType: "xlsx",
		    bookSST: true,
		    type: "array"
		});
		try {
		    FileSaver.saveAs(
		    //Blob 对象表示一个不可变、原始数据的类文件对象。
		    //Blob 表示的不一定是JavaScript原生格式的数据。
		    //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
		    //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
		    new Blob([wbout], { type: "application/octet-stream" }),
		    //设置导出文件名称
		    "sheetjs.xlsx"
		    );
		} catch (e) {
		    if (typeof console !== "undefined") console.log(e, wbout);
		}
		return wbout;
		},
		handleEdit(index, row) {

			this.form = row;
		},
		detail() {

			 this.$router.push({ path: '/home/lists'});
		},


		current_change: function(currentPage) {
			this.currentPage = currentPage;
		},

	},
	created: function() {
   {
		var that = this;
   var t={}
		OrderDetail({"userid":this.$route.query.userId})
			.then(res => {
         console.log(res)
				 for(var i in res[0]){
           for(var j in arr){
         that.orderdetail.push(arr[j]);
           }
             var arr=res[0][i].orderItemList
				}

			})
this.total = this.orderdetail.length;
	}
  }
};
</script>

<style>
.add {
	height: 50px;
	width: 100%;
	background-color: white;
	text-align: right;
}
.fy {
		margin-left: 50%;
		margin-top: 30px;
	}
.addbtn {
	margin-right: 10px;
	border: none;
}
</style>
