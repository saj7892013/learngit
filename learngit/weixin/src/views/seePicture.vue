<template>
	<div style="width: 300px;">
		<el-row>
  <el-col :span="8" v-for="(o, index) in 1" :key="o" :offset="index > 0 ? 1 : 0">
    <el-card :body-style="{ padding: '0px' }">
      <img src="https://www.diannaohu.com/woweimage/c4c11b6a-5bda-4954-807a-d12a1888c78e.jpg">
      <div style="padding: 14px;">
        <span>无线鼠标</span>
        <div >
          <time class="time"></time>
        </div>
      </div>
    </el-card>
  </el-col>
</el-row>

  
</el-upload>
	</div>
</template>

<script>
	export default {
		
		data() {		
			return {
			}
			},
	
	}
	
</script>

<style scoped>
	.time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }
/* 
  .image {
    width: 10%;
    display: block;
  } */

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  
</style>
