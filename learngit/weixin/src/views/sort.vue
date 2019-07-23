<template>
	<div class="container" >
		<div class="add">

		<el-input style="width:200px;padding-top: 0.5%;padding-right: 2%;" size="medium"   v-model="search"  placeholder="输入商品名称关键字搜索" />
			<el-button class="addbtn" type="warning" @click="handleAdd" >添加商品</el-button>
		</div>
		<el-table :data="sort.filter(data => !search || data.nameProduct.toLowerCase().trim().includes(search.toLowerCase().trim())).slice((currentPage-1)*pagesize,currentPage*pagesize)"
		 style="width: 100%" stripe border:default-sort="{prop: 'id', order: 'ascending'}"
	 >

			<el-table-column prop="id" label="商品编号" sortable width="150px"></el-table-column>
			<el-table-column prop="nameProduct" label="商品名称" width="250px"></el-table-column>
			<el-table-column prop="price" label="商品价格" width="130px"></el-table-column>
	        <el-table-column prop="detail" label="商品描述" width="300px"></el-table-column>
			<el-table-column prop="stock" label="库存" width="100px"></el-table-column>
			<el-table-column prop="status" label="产品状态" width="100px"></el-table-column>
			<el-table-column  label="操作" align="center">
				<template slot-scope="scope">
					<el-upload
						class="upload-demo"	action="/dnh/product/fileUploadProduct"
						:data="uploadData"
						list-type="picture"
						style="padding-bottom: 10px;"
						>
						  <el-button slot="trigger" style="margin-left: 10px;" size="small" type="success"  @click="update(scope.row)" >上传主图</el-button>
					</el-upload>
					<el-upload
						class="upload-demo"	action="/dnh/picture/fileUpload"
						:data="uploadData"
						list-type="picture"
						>
						<el-button slot="trigger" size="small" type="primary"   @click="update(scope.row)">点击上传</el-button>
						  <el-button style="margin-left: 10px;" size="small" type="danger"  @click="handleEdit(scope.row,form)" >编辑</el-button>
						<div slot="tip" class="el-upload__tip">上传jpg/png格式不超过500kb</div>
					</el-upload>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination class="fy" layout="prev, pager, next" @current-change="current_change" :total="total" background></el-pagination>
		<!-- 弹窗信息 -->
		<el-dialog title="商品信息" :visible.sync="dialogInfoVisible" @close="closeDialog(form)"  center>
			<el-form :model="form" >
			  <el-form-item label="一级分类名">
				  <el-input v-model="form.level_1_cate_name" disabled></el-input>
			 </el-form-item>
			 <el-form-item label="二级分类名:">
			 	<el-input v-model="form.nameCategory" disabled ></el-input>
			 </el-form-item>
			 <el-form-item label="产品编号">
			    <el-input v-model="form.id" disabled></el-input>
			 </el-form-item>
				<el-form-item label="商品价格:">
					<el-input v-model="form.price" ></el-input>
				</el-form-item>
				<el-form-item label="产品名称:" >
					<el-input v-model="form.nameProduct" ></el-input>
				</el-form-item>
				<el-form-item label="产品描述:" >
					<el-input v-model="form.detail"></el-input>
				</el-form-item>
				<el-form-item label="库存:" >
					<el-input v-model="form.stock"></el-input>
				</el-form-item>
				<el-form-item label="产品状态:" >
					<el-input v-model="form.status"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="cancle()">取 消</el-button>
				<el-button type="primary" @click="confirm(form)">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import { findSort } from '@/api/api';
	import { findSortId } from '@/api/api';
	import { updateSort } from '@/api/api';
	import { addSort } from '@/api/api';
	export default {
		inject:['reload'],
		data() {
			return {
				uploadData:{},
				total: 0, //默认数据总数
				pagesize: 10, //每页的数据条数
				currentPage: 1, //默认开始页面
				sort: [], //商品信息
				search: '',
				dialogInfoVisible: false,
				formLabelWidth: '100px',
				form: {},
				add: 'flase',
				 all:[ ],
				  options:[],
				  value:''
			}
		},

		　
        watch: {
			  '$route' (to)
				{ //监听路由是否变化

						findSortId({"id":this.$route.query.id}).then((res) => {
								this.sort = res;
                this.total = this.sort.length;
							})

				}

			},

		methods: {
                   update(row){
					   console.log(row.id);
					   var t={};
					   t.id=row.id;
					  this.uploadData=t;
				   },

			handleEdit(row,form) {
				this.dialogInfoVisible = true;
				this.add = 'flase';
						this.form=row;
						var t={};
						t.level_1_cate_name=this.$route.query.sort1;
						t.nameCategory=this.$route.query.sort2;
				 		this.form.level_1_cate_name=t.level_1_cate_name;
						this.form.nameCategory=t.nameCategory;

			},
			current_change: function(currentPage) {
				this.currentPage = currentPage;
			},
			handleAdd() {
				this.add = 'true';
				this.dialogInfoVisible = true;
				var t={};
				t.level_1_cate_name=this.$route.query.sort1;
				t.nameCategory=this.$route.query.sort2;
				this.form.level_1_cate_name=t.level_1_cate_name;
				this.form.nameCategory=t.nameCategory;
				var that=this;

			},
			 closeDialog(form){
				 var t={};
				this.form=t;
			},
			cancle() {
				this.dialogInfoVisible = false;
				var that = this;
				findSortId({"id":this.$route.query.id}).then((response) => {
						that.sort = response;

					})
			},
			confirm(form) {
				var that = this;
				if (this.add == 'flase') {
					updateSort(form)
				.then((res) => {
						this.dialogInfoVisible = false;
						console.log(form);
							this.reload()
					})
				} else if (this.add == 'true') {
					addSort(form).then((res) => {
					this.dialogInfoVisible = false;
							this.reload()

					});
				}
			}
		},
		created: function() {
					findSortId({"id":this.$route.query.id}).then((res) => {
						this.sort = res;

this.total = this.sort.length;
						})

		}
	}
</script>

<style scoped>
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

	.addbtn {
		margin-right: 50px;
		border: none;
	}

</style>
