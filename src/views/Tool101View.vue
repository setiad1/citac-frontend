<template>
  <div ref="main" id="main" class="container is-fluid mt-5 p-32">
    <page-header></page-header>
    
    <div class="columns is-multiline">
      <div class="column is-full">
        <v-select 
          class="v-selectx v-tahun" 
          v-model="s_tahun" 
          placeholder="Tahun" 
          :options="['2023','2022','2021']"></v-select>
        <v-select 
          class="v-selectx ml-2 v-kantor" 
          label="nama_kantor"
          v-model="s_kantor" 
          :reduce="s_kantor => s_kantor.kd_kantor" 
          placeholder="Kantor"
          @search="kantorBc"
          :options="s_kantor_options">
        </v-select>
      </div>
    </div>

    <div class="columns is-multiline">
      <div class="column is-full-mobile is-full-tablet is-half-desktop is-half-widescreen">
          <div class="is-size-5 has-text-weight-bold mb-4">Line</div>
          <div ref="l2" class="is-relative"><v-chart class="chart border" style="width: 100%; min-height: 400px;" :option="line" autoresize/></div>
      </div>
  </div>
  </div>
</template>

<script>
import vSelect from "vue-select";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { 
    PieChart, 
    BarChart, 
    LineChart, 
    ScatterChart, 
    EffectScatterChart,
    CandlestickChart 
} from "echarts/charts";
import {
    VisualMapComponent,
    GridComponent,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    ToolboxComponent,
    DataZoomComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";

use([
    EffectScatterChart,
    DataZoomComponent,
    ToolboxComponent,
    VisualMapComponent,
    CanvasRenderer,
    GridComponent,
    ScatterChart,
    PieChart,
    BarChart,
    LineChart,
    CandlestickChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent
]);

export default {
  name: "Tool101View",
  components: {
    VChart,
    vSelect
  },
  data() {
    return {
      disops: {
        's_kantor': false
      },
      from: null,
      to: null,
      s_tahun: 2023,
      s_tahun_options: ['2021','2022','2023'],
      s_kantor: null,
      s_kantor_options: [],
      s_pelabuhan_utama: [{nama_kantor: 'Pelabuhan Utama', kd_kantor: '040300,060100,070100'}],
      line: {
        legend: {show: true},
        xAxis: {
          type: 'category',
          data: ['Jan', 'Feb', 'Mar', 'Apr','Mei','Jun','Jul','Aug','Sep','Okt','Nov','Dec'], 
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [],
            type: 'line',
            smooth: true
          }
        ]
      }
    }
  },
  watch: {
    s_kantor: function() {
      this.teusBulanan();
    },
    s_tahun: function() {
      this.from = `${this.s_tahun}-01-01`;
      this.to = `${this.s_tahun}-12-31`;
      this.teusBulanan();
    }
  },
  mounted() {
    console.log(process.env.VUE_APP_TITLE);
    console.log(process.env.NODE_ENV);
    this.kantorBc();
    // this.teusBulanan();
  },
  methods: {
    kantorBc: function(s, l) {
      this.axios.get(`/kantor`, {
        params: {
          q: s
        }
      }).then((res) => {
        res.data = res.data.concat(this.s_pelabuhan_utama);
        this.s_kantor_options = res.data;
      })
    },
    teusBulanan: function() {
      if (!this.s_kantor) 
        return; 
      this.axios.get("/chart/teus_bulanan", {
        params: {
          kd_kantor: [this.s_kantor].toString(),
          from: this.from,
          to: this.to
        }
      }).then((res) => {
        console.log(res.data);
        this.line.series = [];
        // this.line.xAxis = res.data.map(e) 
        this.line.series = res.data.map(e => ({
          name: e.name,
          data: e.data.map(e => [['Jan', 'Feb', 'Mar', 'Apr','Mei','Jun','Jul','Aug','Sep','Okt','Nov','Dec'][e[0]],e[1]]),
          type: 'line',
        }));
      })
    }
  }
}
</script>


<style scoped>
@import "vue-select/dist/vue-select.css";
.chart {
    width: 100%;
    min-height: 400px;
}
</style>

<style>
.v-selectx {
  display: inline-block;
}
.v-tahun {
  width: 121px !important;
}
.v-tahun .vs__dropdown-option, .v-tahun .vs__dropdown-menu {
  width: 121px !important;
}
.v-tahun .vs__dropdown-menu {
  min-width: auto !important;
  overflow-x: hidden;
}

.v-kantor {
  width: 500px !important;
}
.v-kantor .vs__dropdown-option, .v-kantor .vs__dropdown-menu {
  width: 500px !important;
}
.v-kantor .vs__dropdown-menu {
  min-width: auto !important;
  overflow-x: hidden;
}
</style>
  