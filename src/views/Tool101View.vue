<template>
   <div ref="main" id="main" class="container is-fluid mt-5 p-32">
         <page-header></page-header>

         <!-- QUickview -->
         <div id="quickviewDefault" class="quickview">
            <header class="quickview-header">
               <p class="title"><i class="fa-regular fa-filter-list"></i></p>
               <span class="delete" data-dismiss="quickview"></span>
            </header>

            <div class="quickview-body">
               <div class="quickview-block">
                  <div class="columns is-multiline m-0">
                     <div class="column pb-0 is-full">
                        <!-- Tahun -->
                        <v-select 
                              class="v-selectx v-tahun" 
                              v-model="s_tahun" 
                              placeholder="Tahun" 
                              :options="['2023','2022','2021']"></v-select>
                     </div>

                     <div class="column pb-0 is-full">
                        <!-- Kantor -->
                        <v-select 
                              class="v-selectx v-kantor" 
                              label="nama_kantor"
                              v-model="s_kantor" 
                              :reduce="s_kantor => s_kantor.kd_kantor" 
                              placeholder="Kantor"
                              @search="kantorBc"
                              :options="s_kantor_options">
                        </v-select>
                     </div>
                     <div class="column pb-0 is-full">
                        <hr class="m-0">
                     </div>
                     <div class="column pb-0 is-full">
                        <!-- Komoditi -->
                        <v-select
                           class="v-selectx v-komoditi"
                           placeholder="Base"
                           v-model="s_komoditi"
                           label="name"
                           :reduce="s_komoditi => s_komoditi.code" 
                           :options="[{name: 'Komoditi', code: 1}, {name: 'HS Code', code: 2}]">
                        </v-select>
                     </div>

                     <div class="column pb-0 is-full">
                        <!-- Filter -->
                        <v-select class="v-selectx v-filter" placeholder="Komoditi/HS" v-model="s_filter" >
                        </v-select>
                     </div>
                     <div class="column pb-0 is-full">
                        <!-- Filter 2 -->
                        <v-select class="v-selectx v-filter" placeholder="Sub-komoditi" v-model="s_filter" >
                        </v-select>
                     </div>

                     <div class="column pb-0 is-full">
                        <hr class="m-0">
                     </div>
                     
                     <div class="column pb-0 is-full">
                        <!-- Negara -->
                        <v-select 
                           class="v-selectx v-negara" 
                           placeholder="Negara" 
                           v-model="s_negara" 
                           :reduce="s_negara => s_negara.kode"
                           :options="s_negara_options"
                           label="nama"
                           @search="negara">
                        </v-select>
                     </div>
                     <div class="column pb-0 is-full">
                        <!-- Exim -->
                        <v-select 
                           class="v-selectx v-exim" 
                           placeholder="Exim"
                           v-model="s_exim"
                           :options="[{name: 'Ekspor', code: 1}, {name: 'Impor', code: 2}]"
                           label="name"
                           :reduce="s_exim => s_exim.code"
                           >
                        </v-select>
                     </div>
                  </div>
               </div>
            </div>

            <footer class="quickview-footer"></footer>
         </div>

         <div class="columns is-multiline">
            <div class="column" style="width: 200px; flex-grow: 0;">
               <button class="button is-small is-danger mb-4" data-show="quickview" data-target="quickviewDefault">
                  <span class="icon">
                     <i class="fa-regular fa-filter-list"></i>
                  </span>
                  <span>Filter & Pencarian</span>
               </button>
               <hr class="m-0">
            </div>
         </div>

         <div class="columns is-multiline">
            <div class="column is-full-mobile is-full-tablet is-half-desktop is-half-widescreen">
               <div class="is-size-5 has-text-weight-bold mb-4">
                  Teus
                  <span class="is-size-6 has-text-weight-normal has-text-grey-darker is-block">Teus bulanan</span>
               </div>
               <div class="is-relative">
                  <loading class="loading" v-model:active="isLoading"
                  :can-cancel="false"
                  :background-color="'white'"
                  :opacity="1"
                  :z-index="25"
                  :loader="'spinner'"
                  :is-full-page="fullPage">
                  </loading>
                  <v-chart v-if="c_teus_bulanan.series[0]?.data?.length > 0" class="chart border" style="width: 100%; min-height: 400px;" :option="c_teus_bulanan" autoresize/>
                  <div v-else class="v-charte">
                     <span>No data..</span>
                  </div>
               </div>
            </div>
         </div>
   </div>
</template>
 
<script>
import bulmaQuickview from "bulma-extensions/bulma-quickview/dist/js/bulma-quickview";
import Loading from "vue-loading-overlay";
import vSelect from "vue-select";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
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
import Shimmer101 from "@/components/Shimmer101.vue";
import Loading101 from "@/components/Loading101.vue";

use([
   DataZoomComponent,
   ToolboxComponent,
   VisualMapComponent,
   CanvasRenderer,
   GridComponent,
   LineChart,
   TitleComponent,
   TooltipComponent,
   LegendComponent
]);

export default {
   name: "Tool101View",
   components: {
      Loading,
      Shimmer101,
      Loading101,
      VChart,
      vSelect,
      bulmaQuickview
   },
   data() {
      return {
         isLoading: false,
         fullPage: false,
         loader: 'spinner',
         disops: {
            's_kantor': false,
            's_negara': false
         },
         from: null,
         to: null,
         s_tahun: 2023,
         s_tahun_options: ['2021','2022','2023'],
         s_kantor: null,
         s_kantor_options: [],
         s_komoditi: null,
         s_filter: null,
         s_negara: null,
         s_negara_options: [],
         s_exim: 1,
         s_pelabuhan_utama: [
            {
               nama_kantor: "PELABUHAN UTAMA", 
               kd_kantor: '040300,060100,070100'
            }
         ],
         c_teus_bulanan: {
            title: {
               show: false,
               text: 'Teus',
               subtext: 'Teus bulanan',
               left: 'left'
            },
            toolbox: {
               show: true,
               top: 53,
               orient: 'vertical',
               feature: {
                  mark: { show: true },
                  saveAsImage: { show: true }
               }
            },
            legend: {
               show: true,
               orient: 'horizontal',
               // left: 0,
               // top: 60
            },
            tooltip: {
               trigger: 'axis',
               axisPointer: {
                  type: 'cross'
               }
            },
            grid: {
               show: true,
               left: 58,
               top: 60,
               right: 40,
               bottom: 30
            },
            xAxis: {
               type: 'category',
               data: ['Jan', 'Feb', 'Mar', 'Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'], 
            },
            yAxis: {
               type: 'value'
            },
            series: [
               {
                  areaStyle: {},
                  markLine: {
                     symbol: ['none', 'none'],
                     label: { show: false },
                     data: [{ xAxis: 1 }, { xAxis: 3 }, { xAxis: 5 }, { xAxis: 7 }]
                  },
                  data: [],
                  type: 'line',
                  smooth: true
               }
            ]
         }
      }
   },
   watch: {
      s_negara: function() {
         this.negara();
      },
      s_kantor: function() {
         this.teusBulanan();
         // console.log(this.s_kantor);
      },
      s_tahun: function() {
         this.from = `${this.s_tahun}-01-01`;
         this.to = `${this.s_tahun}-12-31`;
         this.teusBulanan();
      },
      s_komoditi: function() {
         // console.log(this.s_komoditi);
      }
   },
   mounted() {
   // console.log(process.env.VUE_APP_TITLE);
   // console.log(process.env.NODE_ENV);
   this.kantorBc();
   this.s_kantor = '040300';

   // 
   // this.komoditi();
   // this.subKomoditi();
   this.negara();

   var quickviews = bulmaQuickview.attach();
   },
   methods: {
      kantorBc: function(s, l) {
         this.axios.get(`/kantor`, {
            params: {
               q: s
            }
         }).then((res) => {
            res.data = this.s_pelabuhan_utama.concat(res.data);
            this.s_kantor_options = res.data;
         })
      },
      teusBulanan: function() {
         this.isLoading = true;
         if (!this.s_kantor) 
            return; 
         this.axios.get("/chart/teus_bulanan", {
            params: {
               kd_kantor: [this.s_kantor].toString(),
               from: this.from,
               to: this.to
            }
         }).then((res) => {
            // this.c_teus_bulanan.series = [];
            // this.c_teus_bulanan.series = res.data.map(e => ({
            //    name: e.name,
            //    data: e.data.map(e => [['Jan', 'Feb', 'Mar', 'Apr','Mei','Jun','Jul','Aug','Sep','Okt','Nov','Dec'][e[0]],e[1]]),
            //    type: 'line',
            // }));
            setTimeout(() => {
               this.isLoading = false;
               this.c_teus_bulanan.series = res.data.map(e => ({
                  name: e.name,
                  data: e.data.map(e => [['Jan', 'Feb', 'Mar', 'Apr','Mei','Jun','Jul','Aug','Sep','Okt','Nov','Dec'][e[0]],e[1]]),
                  type: 'line',
               }));
            }, 1000)
         })
      },
      komoditi: function() {
         this.axios.get("/komoditi", {

         }).then((res) => {
            // console.log(res.data);
         })
      },
      subKomoditi: function() {
         this.axios.get("/subkomoditi", {

         }).then((res) => {
            // console.log(res.data);
         })
      },
      negara: function(s, l) {
         this.axios.get("/negara", {
            params: {
               q: s
            }
         }).then((res) => {
            // console.log(res.data);
            this.s_negara_options = res.data;
            // console.log(this.nega)
         })
      }
   }
}
</script>
 
<style scoped>
@import "vue-select/dist/vue-select.css";
@import "bulma-extensions/bulma-quickview/dist/css/bulma-quickview.min.css";
.chart {
   width: 100%;
   min-height: 400px;
   padding: 15px 13px 13px 13px;
   border-radius: 4px;
}
.loading {
   border: 1px solid #d9d9d9;
   border-radius: 4px;
}
.v-charte {
   text-align: center;
   width: 100%;
   min-height: 400px;
   border: 1px solid gainsboro;
   border-radius: 4px;
   padding-top: 170px;
}
.quickview-header {
   min-height: 3.3em !important;
}
.quickview-footer {
   border-top: none !important;
}
</style>
 
<style>
.v-tahun, .v-tahun .vs__dropdown-option, .v-tahun .vs__dropdown-menu {
   width: 121px !important;
}
.v-kantor, .v-kantor .vs__dropdown-option, .v-kantor .vs__dropdown-menu {
   width: 100% !important;
}
.v-komoditi, .v-komoditi .vs__dropdown-option, .v-komoditi .vs__dropdown-menu {
   width: 150px !important;
}
.v-filter, .v-filter .vs__dropdown-option, .v-filter .vs__dropdown-menu {
   width: 100% !important;
}
.v-negara, .v-negara .vs__dropdown-option, .v-negara .vs__dropdown-menu {
   width: 100% !important;
}
.v-exim, .v-exim .vs__dropdown-option, .v-exim .vs__dropdown-menu {
   width: 130px !important;
}
</style>
   