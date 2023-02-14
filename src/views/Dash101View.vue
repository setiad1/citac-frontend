<template>
  <div id="main" class="container is-fluid mt-5">
      <div class="columns is-multiline is-tablet">
          <div class="column">
              <div class="is-size-5 has-text-weight-bold mb-4">Test</div>
              <div><v-chart class="chart border" :option="bar1" autoresize/></div>
          </div>
          <div class="column">
              <div class="is-size-5 has-text-weight-bold mb-4">Test</div>
              <div><v-chart class="chart border" :option="linee" autoresize/></div>
          </div>
      </div>
      <div class="columns is-multiline is-tablet">
          <div class="column">
              <div class="is-size-5 has-text-weight-bold mb-4">Test</div>
              <div><v-chart class="chart border" :option="line2" autoresize/></div>
          </div>
          <div class="column">
              <div class="is-size-5 has-text-weight-bold mb-4">Test</div>
              <div><v-chart class="chart border" :option="pie1" autoresize/></div>
          </div>
      </div>
  </div>
</template>

<script>
import { use } from "echarts/core";
import { CanvasRenderer, SVGRenderer } from "echarts/renderers";
import { PieChart, BarChart, LineChart } from "echarts/charts";
import {
  VisualMapComponent,
  GridComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent 
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { ref, defineComponent } from "vue";

use([
  ToolboxComponent,
  VisualMapComponent,
  CanvasRenderer,
  SVGRenderer,
  GridComponent,
  PieChart,
  BarChart,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent
]);

export default defineComponent({
  name: "Dash101View",
  components: {
      VChart
  },
  provide: {
      [THEME_KEY]: "ovilia-green"
  },
  data() {
      return {
          bar1: ref({
              legend: {},
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
          }),
          linee: ref({
              xAxis: {
                  type: 'category',
                  boundaryGap: false
              },
              yAxis: {
                  type: 'value',
                  boundaryGap: [0, '30%']
              },
              visualMap: {
                  type: 'piecewise',
                  show: false,
                  dimension: 0,
                  seriesIndex: 0,
                  pieces: [
                  {
                      gt: 1,
                      lt: 3,
                      color: 'rgba(0, 0, 180, 0.4)'
                  },
                  {
                      gt: 5,
                      lt: 7,
                      color: 'rgba(0, 0, 180, 0.4)'
                  }
                  ]
              },
              series: [
                  {
                  type: 'line',
                  smooth: 0.6,
                  symbol: 'none',
                  lineStyle: {
                      color: '#5470C6',
                      width: 5
                  },
                  markLine: {
                      symbol: ['none', 'none'],
                      label: { show: false },
                      data: [{ xAxis: 1 }, { xAxis: 3 }, { xAxis: 5 }, { xAxis: 7 }]
                  },
                  areaStyle: {},
                  data: [
                      ['2019-10-10', 200],
                      ['2019-10-11', 560],
                      ['2019-10-12', 750],
                      ['2019-10-13', 580],
                      ['2019-10-14', 250],
                      ['2019-10-15', 300],
                      ['2019-10-16', 450],
                      ['2019-10-17', 300],
                      ['2019-10-18', 100]
                  ]
                  }
              ]
          }),
          line2: ref(
              {
                  tooltip: {
                      trigger: 'axis'
                  },
                  toolbox: {
                      show: true,
                      feature: {
                      dataZoom: {
                          yAxisIndex: 'none'
                      },
                      dataView: { readOnly: false },
                      magicType: { type: ['line', 'bar'] },
                      restore: {},
                      saveAsImage: {}
                      }
                  },
                  xAxis: {
                      type: 'category',
                      boundaryGap: false,
                      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                  },
                  yAxis: {
                      type: 'value',
                      axisLabel: {
                      formatter: '{value} °C'
                      }
                  },
                  series: [
                      {
                      name: 'Highest',
                      type: 'line',
                      data: [10, 11, 13, 11, 12, 12, 9],
                      markPoint: {
                          data: [
                          { type: 'max', name: 'Max' },
                          { type: 'min', name: 'Min' }
                          ]
                      },
                      markLine: {
                          data: [{ type: 'average', name: 'Avg' }]
                      }
                      },
                      {
                      name: 'Lowest',
                      type: 'line',
                      data: [1, -2, 2, 5, 3, 2, 0],
                      markPoint: {
                          data: [{ name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }]
                      },
                      markLine: {
                          data: [
                          { type: 'average', name: 'Avg' },
                          [
                              {
                              symbol: 'none',
                              x: '90%',
                              yAxis: 'max'
                              },
                              {
                              symbol: 'circle',
                              label: {
                                  position: 'start',
                                  formatter: 'Max'
                              },
                              type: 'max',
                              name: '最高点'
                              }
                          ]
                          ]
                      }
                      }
                  ]
              }
          ),
          pie1: ref(
              {
              legend: {
                  show: false
                  // top: 'bottom',
                  // left: 'left'
              },
              toolbox: {
                  show: true,
                  feature: {
                  mark: { show: true },
                  dataView: { show: true, readOnly: false },
                  restore: { show: true },
                  saveAsImage: { show: true }
                  }
              },
              series: [
                  {
                  name: 'Nightingale Chart',
                  type: 'pie',
                  radius: [30, 150],
                  center: ['50%', '50%'],
                  roseType: 'area',
                  itemStyle: {
                      borderRadius: 8
                  },
                  data: [
                      { value: 40, name: 'rose 1' },
                      { value: 38, name: 'rose 2' },
                      { value: 32, name: 'rose 3' },
                      { value: 30, name: 'rose 4' },
                      { value: 28, name: 'rose 5' },
                      { value: 26, name: 'rose 6' },
                      { value: 22, name: 'rose 7' },
                      { value: 18, name: 'rose 8' }
                  ]
                  }
              ]
              }
          )
      }
  }
});
</script>

<style scoped>
.chart {
  min-height: 400px;
}
</style>