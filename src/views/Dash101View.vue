<template>
  <div id="main" class="container is-fluid mt-5">
    <div class="charts-wrapper">
      <vue-echarts :option="option" style="height: 500px" ref="chart" />
    </div>
  </div>
  
</template>
  
<script>
import { VueEcharts } from 'vue3-echarts'

export default {
  name: 'Dash100View',
  components: {
    VueEcharts
  },
  data() {
    return {
      option: {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)'
      }
    }
  ]
}
    }
  },
  mounted() {
    console.log(VueEcharts)
  }

}
</script>
  
<style scoped>
  .chart {
    height: 400px;
  }
  .charts-wrapper {
    border: 1px solid rgb(223, 216, 214);
  }
</style>