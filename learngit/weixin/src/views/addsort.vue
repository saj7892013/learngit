<template>
	<div class="container" >
		<div class="add" align="right">
			<template >
								<b style="margin-right: 30px  ;">一级分类：</b>
						  <el-select size="medium" v-model="value" placeholder="请选择种类"
						  style="width:200px;margin-right: 30px  ; text-align: left;"
						  @change="selectSort(addsort)" ref="selectProvince">
						    <el-option   v-for="item in options"
			:key="item.level_1_cate_name"
			:label="item.parentId"
			:value="item.level_1_cate_name">
							</el-option>
						  </el-select>
						</template>
		<el-input style="text-align: right;width:200px;margin-right: 30px ;" size="medium"   v-model="search"  placeholder="输入种类名称关键字搜索" />
			<el-button class="addbtn" type="warning" @click="handleAdd" style="text-align: right;margin-right: 60px;"><b>添加种类</b></el-button>
		</div>
		<el-table :data="addsort.filter(data => !search || (data.nameCategory +='') .toLowerCase().trim().includes(search.toLowerCase().trim())).slice((currentPage-1)*pagesize,currentPage*pagesize)"
		 style="width: 100%;padding-top: 30px;" stripe border:default-sort="{prop: 'id', order: 'ascending'}"
	 >
	    <el-table-column prop="parentId" label="一级分类编号" width="250px" align="center"></el-table-column>
			<el-table-column prop="id" label="二级分类编号" sortable width="250px" align="center"></el-table-column>
			<el-table-column prop="nameCategory" label="二级分类" width="400px" align="center"></el-table-column>
			<el-table-column  label="操作"  width="300px" align="right">
				<template slot-scope="scope">
				  <el-button style="margin-left: 10px;" size="small" type="success"  @click="handleEdit(scope.row,form)" >种类修改</el-button>
				  <el-button style="margin-left: 10px;" size="small" type="danger"  @click="delete(scope.row,form)" >删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination class="fy" layout="prev, pager, next" @current-change="current_change" :total="total" background></el-pagination>
		<!-- 弹窗信息 -->
		<el-dialog title="商品信息" :visible.sync="dialogInfoVisible" @close="closeDialog(form)"  center>
			<el-form :model="form" >
				<el-form-item label="一级分类编号" >
				  <el-input v-model="form.parentId" disabled></el-input>
				</el-form-item>
			  <el-form-item label="一级分类名">
				  <el-input v-model="form.level_1_cate_name" ></el-input>
			 </el-form-item>
			 <el-form-item label="二级分类名:">
			 	<el-input v-model="form.nameCategory"  ></el-input>
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

	export default {
		inject:['reload'],
		data() {
			return {

				total: 0, //默认数据总数
				pagesize: 10, //每页的数据条数
				currentPage: 1, //默认开始页面
				addsort: [], //商品信息
				search: '',
				dialogInfoVisible: false,
				formLabelWidth: '100px',
				form: {},
				add: 'flase',

				          options: [ ],
				          value: ''
				       }


		},



		methods: {
       selectSort(addsort){
		   findSort().then((res) => {
		   var t=this.$refs.selectProvince.selectedLabel;
		   	for(var i=0;i<res.length;i++){
		   		var r=res[i].level_1_cate_name;
				if(t=="全部"){
						for(var i=0;i<res.length;i++){
							var t={};
							t.level_1_cate_name=res[i].level_1_cate_name;
							for(var j=0;j<res[i].level_2_cate_with_products.length;j++){
								var tt={};
								tt.nameCategory=res[i].level_2_cate_with_products[j].nameCategory;
								tt.id=res[i].level_2_cate_with_products[j].id;
								tt.parentId=res[i].level_2_cate_with_products[j].parentId;
								this.addsort.push(tt);
							}
						}
				}else if(t==r){
				this.addsort=[];
				for(var j=0;j<res[i].level_2_cate_with_products.length;j++){
					var tt={};
					tt.nameCategory=res[i].level_2_cate_with_products[j].nameCategory;
					tt.id=res[i].level_2_cate_with_products[j].id;
					tt.parentId=res[i].level_2_cate_with_products[j].parentId;
				   this.addsort.push(tt);
				}
				}


		   	}


		   	}).catch(error => {
		   	console.log(error);
		   	alert('网络错误,不能访问');
		   });
		   },
			handleEdit(row,form) {
				this.dialogInfoVisible = true;

						var t=this.$refs.selectProvince.selectedLabel;
						  findSort().then((res) => {
							 	for(var i=0;i<res.length;i++){
							 	var r=res[i].level_1_cate_name;
							 	if(t==r){
									var tt={};
									tt.level_1_cate_name=res[i].level_1_cate_name;
									tt.parentId=row.parentId;
									tt.nameCategory=row.nameCategory;
									this.form=tt;

							 	}
							 }
						  }).catch(error => {
		   	console.log(error);
		   	alert('网络错误,不能访问');
		   });

			},
			current_change: function(currentPage) {
				this.currentPage = currentPage;
			},
			handleAdd() {
				this.add = 'true';
				this.dialogInfoVisible = true;
				this.total = this.addsort.length;
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
  var  that =this;

			findSort().then((res) => {

				var a={};
				a.level_1_cate_name="全部";
				that.options.push(a);
				for(var i=0;i<res.length;i++){
					var t={};
					t.level_1_cate_name=res[i].level_1_cate_name;

					for(var j=0;j<res[i].level_2_cate_with_products.length;j++){
						var tt={};
						tt.nameCategory=res[i].level_2_cate_with_products[j].nameCategory;
						tt.id=res[i].level_2_cate_with_products[j].id;
						tt.parentId=res[i].level_2_cate_with_products[j].parentId;
						that.addsort.push(tt);



					}

					 that.options.push(t);


				}
that.total = that.addsort.length;

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

	.add {
		height: 50px;
		width: 100%;
		background-color: white;
		padding-top: 1%;
	}

	.addbtn {
		border: none;
	}

</style>
