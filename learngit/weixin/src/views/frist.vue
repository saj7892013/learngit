<template>
  <div class="hello">
	  <!-- 下面是官方给的组件 -->
      <fusioncharts
      :type="type"
      :width="width"
      :height="height"
      :dataFormat="dataFormat"
      :dataSource="dataSource"
      ></fusioncharts>
  </div>
</template>

<script>
  import { findSort } from '@/api/api';
export default {
  name: 'HelloWorld',
  data () {
    return {
      type: 'pie2d', // 记住此类型需要在 main.js 内进行添加上
      width: '1250',
      height: '650',
      dataFormat: 'json',
      dataSource: {
          "chart": {
              "caption": "Split of revenue by product categories",
              "subCaption": "Last year",
              "numberPrefix": "$",
              "showPercentInTooltip": "0",
              "decimals": "1",
              "useDataPlotColorForLabels": "1",
              //Theme
              "theme": "fusion"
          },
          // data:[]
          data: [{
              label: "Food",
              value: "285040"
          }, {
              label: "Apparels",
              value: "146330"
          }, {
              label: "Electronics",
              value: "105070"
          }, {
              label: "Household",
              value: "49100"
          }]
      }
    }
  },
created: function() {
			 // this.historyWatch();


					findSort().then((res) => {
             var t={}
            for(var i in res){
              t.label=res[i].level_1_cate_name
              console.log(res[i])

            }



						})

		}

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
