<template>
	<div class="container">
		<div class="add">

   <el-button  style="margin-right: 150px;"  size="mini" type="danger" @click="remain()" >三星以下</el-button>
		<el-input style="width:200px;padding-top: 0.5%;padding-right: 3%" size="medium"     v-model="search"  placeholder="输入评论等级关键字搜索" />
    <el-button  type="success" size="mini"  @click="exportExcel"  >导出表格</el-button>
			<el-button style="margin-right: 50px;"  align="left" size="mini" type="danger" @click="to()" >返回</el-button>
			</div>
		<el-table :data="content .filter(data => !search || (data.level +='') .toLowerCase().trim().includes(search.toLowerCase().trim())).slice((currentPage-1)*pagesize,currentPage*pagesize)"
		style="width:100%;" stripe border:default-sort="{prop: 'level', order: 'ascending'}"
		id="out-table" >
			<el-table-column  prop="userId"  label="客户编号" width="150px"></el-table-column>
			<el-table-column prop="productId" label="产品编号" width="150px"></el-table-column>
			<el-table-column  prop="level"  label="评论等级" width="100px"></el-table-column>
			<el-table-column  prop="commentContent"  label="评论内容" width="350px"></el-table-column>
      <el-table-column  prop="attentionTime"  label="评论时间" width="200px"></el-table-column>
      <el-table-column    label="审核状态" width="100px"></el-table-column>
			<el-table-column label="操作" align="center" >
				<template slot-scope="scope">
				<el-button size="mini" @click="Reply(scope.row)">评论回复</el-button>
        <el-button type="danger" size="mini" @click="check(scope.row)">审核/取消审核</el-button>
				</template>
			</el-table-column>
		</el-table>
    <el-pagination class="fy" layout="prev, pager, next" @current-change="current_change" :total="total" background>
    </el-pagination>
		<el-dialog title="商品信息" :visible.sync="dialogInfoVisible" @close="closeDialog(form)"  center>

		</el-dialog>

	</div>
</template>

<script>
	  import FileSaver from "file-saver";
	import XLSX from "xlsx";
	import { comment } from '@/api/api';
	export default {
  data() {
    return {
		total: '', //默认数据总数
		pagesize: 10, //每页的数据条数
		currentPage: 1, //默认开始页面
		search: '',
		 textarea:"",
		 dialogInfoVisible: false,
		 content:[]
    }
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
remain(){
    this.content=[];
comment({"userId":this.$route.query.id})
  		.then(res => {
      var that =this
			for(var item in res){
        if(res[item].level<3){
          that.content.push(res[item]);
        }

			}
this.total = this.content.length;
  		})
},
current_change: function(currentPage) {
			this.currentPage = currentPage;
		},
check(row){
  var a="已审核";var b="未审核"
  console.log(row)


},
	  to() {

	  	 this.$router.push({ path: '/home/evaluation'});
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

  	comment({"userId":this.$route.query.id})
  		.then(res => {
        console.log(res)
      var that =this
			for(var item in res){
					that.content.push(res[item]);
			}
  		}
)

  }
}
</script>

<style>
  .fy {
  	margin-left: 50%;
  	margin-top: 30px;
  }
	.add {
		height: 50px;
		width: 100%;
		background-color: white;
		text-align: right;
	}
</style>
