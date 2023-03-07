<template>
   <div ref="main" id="main" class="container is-fluid mt-5 p-32">
      <page-header class="is-inline-block"></page-header>
      <div class="is-pulled-right">
         <!-- <download-csv class="button is-small is-dark mr-1"
            :separator-excel="true"
            :data= "data_blokir">
            <span class="icon">
               <i class="fa-thin fa-file-spreadsheet"></i>
            </span>
            <span>to CSV</span>
         </download-csv> -->

         <button class="button is-small is-danger is-outlined mr-1" v-on:click="refresh($event)">
            <span class="icon">
               <i class="fa-solid fa-glass-citrus"></i>
            </span>
            <span>Refresh</span>
         </button>

         <button class="button is-small is-info" data-show="quickview" data-target="quickviewDefault">
            <span class="icon">
               <i class="fa-regular fa-filter-list"></i>
            </span>
            <span>Filter</span>
         </button>
      </div>

      <div id="quickviewDefault" class="quickview">
         <header class="quickview-header is-dark" style="border-bottom: 1px solid #363636 !important;">
            <p class="title"><i class="fa-regular fa-filter-list"></i></p>
            <span class="delete" data-dismiss="quickview"></span>
         </header>

         <div class="quickview-body">
            <div class="quickview-block">
               <div class="columns is-multiline m-0">
                  <div class="column pb-0 is-full">
                     <v-select id="npwp9" v-model="npwp9" placeholder="NPWP 9 DIGIT, PISAH KOMA KALAU BANYAK" ref="npwp9" taggable multiple />
                     <!-- <input 
                        class="input" 
                        v-model="npwp9" 
                        type="text" 
                        placeholder="NPWP 9 DIGIT, PISAH KOMA KALAU BANYAK" 
                        ref="npwp9"> -->
                  </div>
                  <div class="column pb-0 is-full">
                     <input class="input" v-model="nama" type="text" placeholder="NAMA PERUSAHAAN" ref="nama">
                  </div>
               
                  <div class="column pb-0 is-full">
                     <!-- Kantor -->
                     <v-select 
                           class="v-selectx v-kantor-blokir" 
                           label="nama_kantor"
                           v-model="s_kantor" 
                           :reduce="s_kantor => s_kantor.kd_kantor" 
                           placeholder="KANTOR"
                           @search="getKantorBC"
                           :options="s_kantor_options">
                     </v-select>
                  </div>
                  <div class="column pb-0 is-full">
                     <button class="button is-dark" v-on:click="cariBlokir($event)">
                        <span class="icon">
                           <i class="fa-brands fa-searchengin"></i>
                        </span>
                        <span>Cari</span>
                     </button>
                  </div>
               </div>
            </div>
         </div>

         <footer class="quickview-footer"></footer>
      </div>

      <div class="columns is-multiline is-variable is-1-mobile is-1-tablet is-1-desktop is-1-widescreen is-1-fullhd">
         <!-- 25 Komoditi Terbesar -->
         <div class="column is-full">
            <div class="is-relative">
               <loading class="loading" v-model:active="isLoading"
               :can-cancel="false"
               :background-color="'white'"
               :opacity="1"
               :height="25"
               :width="25"
               :z-index="25"
               :loader="'spinner'"
               :is-full-page="fullPage">
               </loading>
               <table class="table is-striped is-narrow is-hoverable is-fullwidth">
                  <thead>
                     <tr>
                        <th>Nama</th>
                        <th>NPWP</th>
                        <th>Kantor</th>
                        <th>No. SKEP</th>
                        <th>Tgl. Blokir</th>
                        <th>Alasan Blokir</th>
                        <th>Wk. Cabut</th>
                        <th>Alasan Cabut</th>
                        <th>Status</th>
                     </tr>
                  </thead>
                  <tbody>
                     <template v-if="data_blokir.length !== 0">
                        <tr v-for="(d, i) in data_blokir" :key="i">
                           <td style="word-wrap: break-word; white-space: pre-wrap;">{{ d.NAMA }}</td>
                           <td>{{ d.NPWP9 }}</td>
                           <td>{{ d.KD_KANTOR }}</td>
                           <td>{{ d.NO_SKEP }}</td>
                           <td>{{ d.TGL_BLOKIR }}</td>
                           <td>{{ d.ALASAN_BLOKIR }}</td>
                           <td>{{ d.WK_CABUT }}</td>
                           <td>{{ d.ALASAN_CABUT }}</td>
                           <td>{{ d.STATUS }}</td>
                        </tr>
                     </template>
                     <template v-else>
                        <tr>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td>No data..</td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                        </tr>
                     </template>
                  </tbody>
               </table>
            </div>
         </div>
         <div v-show="false" class="column is-half-widescreen is-half-fullhd"></div>
      </div>
   </div>
</template>

<script>
var _ = require('lodash');
import debounce from 'lodash.debounce';
import bulmaQuickview from "bulma-extensions/bulma-quickview/dist/js/bulma-quickview";
import Loading from "vue-loading-overlay";
import vSelect from "vue-select";
import { useToast } from "vue-toastification";

export default {
   name: "BlokirView",
   setup() {
      const toast = useToast();
      return { toast }
   },
   components: {
      bulmaQuickview,
      Loading,
      vSelect,
      useToast
   },
   data() {
      return {
         isLoading: false,
         fullPage: false,
         loader: 'spinner',
         disops: {
            's_kantor': false
         },
         npwp9: [],
         nama: null,
         s_kantor: null,
         s_kantor_options: [],
         data_blokir: []
      }
   },
   watch: {
   },
   mounted() {
      var quickviews = bulmaQuickview.attach();
   },
   computed: {
      getKantorBC: function() {
         if (this.kantorBc) {
            return debounce(
               this.kantorBc, 500
            )
         } else {
            return null
         }
      },
   },
   methods: {
      refresh: function() {
         this.isLoading = true;
         setTimeout(() => {
            this.npwp9 = []
            this.nama = null;
            this.s_kantor = null;
            this.s_kantor_options = [];
            this.data_blokir = [];
            this.isLoading = false;
         }, 500)
      },
      blokir: function() {
         // this.npwp9 = "023795024";
         // this.nama = "OCTA";
         this.isLoading = true;
         this.axios.get("/blokir", {
            params: {
               npwp9: this.npwp9.join(','),
               kd_kantor: this.s_kantor,
               nama: this.nama
            }
         }).then((res) => {
            setTimeout(() => {
               this.data_blokir = res.data;
               this.isLoading = false;
            }, 500)
         })
         
      },
      kantorBc: function(s, l) {
         if (s.length === 0)
            return;
         l(true);
         this.axios.get(`/kantor`, {
            params: {
               q: s
            }
         }).then((res) => {
            this.s_kantor_options = res.data;
            l(false);
         })
      },
      cariBlokir: function(e) {
         var n1 = this.$refs.nama;
         // var n2 = this.$refs.npwp9;
         var n2 = document.getElementById("npwp9").firstElementChild;
         var isNine = false;
         var isNotEmpty = false;
         if (this.npwp9.length === 0) {
            isNotEmpty = false;
         } else {
            isNotEmpty = true;
            this.npwp9.forEach((e) => {
               if (e.length >= 9) {
                  isNine = true;
               }
            });
         }
         if (isNotEmpty && isNine) {
            n1.classList.remove("is-danger");
            // n2.classList.remove("is-danger");
            n2.style.border = "1px solid gray";
            this.blokir();
         } else if (this.nama && this.nama.length >= 3) {
            n1.classList.remove("is-danger");
            // n2.classList.remove("is-danger");
            n2.style.border = "1px solid gray";
            this.blokir();
         } else {
            if (this.nama || isNotEmpty) {
               if (this.nama && this.nama.length < 3) {
                  n1.classList.add("is-danger");
                  this.toast.error("MINIMAL 3 KARAKTER NAMA PERUSAHAAN");
               }
               if (isNotEmpty && !isNine) {
                  // n2.classList.add("is-danger");
                  n2.style.border = "1px solid hsl(348deg, 86%, 61%)";
                  this.toast.error("HARUS NPWP 9 DIGIT");
               }
               if (this.nama && this.nama.length >= 3 && isNotEmpty && isNine) {
                  n1.classList.remove("is-danger");
                  // n2.classList.remove("is-danger");
                  n2.style.border = "1px solid gray";
                  this.blokir();
               }
            } else {
               n1.classList.add("is-danger");
               // n2.classList.add("is-danger");
               n2.style.border = "1px solid hsl(348deg, 86%, 61%)";
               this.toast.error("NPWP DAN/ATAU NAMA HARUS ADA");
            }
         }
      }
   }
}
</script>

<style scoped>
@import "vue-select/dist/vue-select.css";
@import "bulma-extensions/bulma-quickview/dist/css/bulma-quickview.min.css";
@import "bulma-extensions/";
</style>

<style>
.v-kantor-blokir, .v-kantor-blokir .vs__dropdown-option, .v-kantor-blokir .vs__dropdown-menu {
   width: 100% !important;
}
</style>


