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
         <header class="quickview-header is-light">
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

      <div class="columns mt-1 is-multiline is-variable is-1-mobile is-1-tablet is-1-desktop is-1-widescreen is-1-fullhd">
         <div class="is-size-6 has-text-weight-bold mb-5">Data Blokir</div>
         <div class="column box is-full">
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
                        <th>#</th>
                        <th>Nama</th>
                        <th>NPWP</th>
                        <th class="is-hidden-touch">Kantor</th>
                        <th class="is-hidden-touch">No. SKEP</th>
                        <th class="is-hidden-touch">Tgl. Blokir</th>
                        <th class="is-hidden-touch">Alasan Blokir</th>
                        <th class="is-hidden-touch">Wk. Cabut</th>
                        <th class="is-hidden-touch">Alasan Cabut</th>
                        <th>Status</th>
                        <th></th>
                     </tr>
                  </thead>
                  <tbody>
                     <template v-if="data_blokir.length !== 0">
                        <tr v-for="(d, i) in data_blokir" :key="i">
                           <td>{{ i + 1 }}</td>
                           <td style="word-wrap: break-word; white-space: pre-wrap;">{{ d.NAMA }}</td>
                           <td>{{ d.NPWP9 }}</td>
                           <td class="is-hidden-touch">{{ d.KD_KANTOR }}</td>
                           <td class="is-hidden-touch">{{ d.NO_SKEP }}</td>
                           <td class="is-hidden-touch">{{ d.TGL_BLOKIR }}</td>
                           <td class="is-hidden-touch">{{ d.ALASAN_BLOKIR }}</td>
                           <td class="is-hidden-touch">{{ d.WK_CABUT }}</td>
                           <td class="is-hidden-touch">{{ d.ALASAN_CABUT }}</td>
                           <td>{{ d.STATUS }}</td>
                           <td>
                              <button class="button is-small is-dark is-pulled-right" data-target="blokir-modal" v-on:click="openBlModal($event, i)">
                                 <i class="fa-light fa-memo-circle-info"></i>
                              </button>
                           </td>
                        </tr>
                     </template>
                     <template v-else>
                        <tr>
                           <td>No data..</td>
                           <td></td>
                           <td></td>
                           <td class="is-hidden-touch"></td>
                           <td class="is-hidden-touch"></td>
                           <td class="is-hidden-touch"></td>
                           <td class="is-hidden-touch"></td>
                           <td class="is-hidden-touch"></td>
                           <td class="is-hidden-touch"></td>
                           <td></td>
                           <td></td>
                        </tr>
                     </template>
                  </tbody>
               </table>
            </div>
            <!-- modal start -->
            <div id="blokir-modal" class="modal" ref="blmodal">
               <div class="modal-background"></div>
               <div class="modal-card">
                  <header class="modal-card-head">
                     <p class="modal-card-title">Details</p>
                     <button class="delete" aria-label="close" v-on:click="closeBlModal"></button>
                  </header>
                  <section class="modal-card-body">
                     <!-- {{ selected_data_blokir }} -->
                     <!-- Nama -->
                     <div class="field is-horizontal">
                        <div class="field-label is-normal is-flex-grow-2">
                           <label class="label has-text-left">Nama</label>
                        </div>
                        <div class="field-body">
                           <input class="input" type="text" :value="selected_data_blokir.NAMA">
                        </div>
                     </div>
                     <!-- NPWP -->
                     <div class="field is-horizontal">
                        <div class="field-label is-normal is-flex-grow-2">
                           <label class="label has-text-left">NPWP</label>
                        </div>
                        <div class="field-body">
                           <input class="input" type="text" :value="selected_data_blokir.NPWP9">
                        </div>
                     </div>
                     <!-- KODE KANTOR -->
                     <div class="field is-horizontal">
                        <div class="field-label is-normal is-flex-grow-2">
                           <label class="label has-text-left">Kantor</label>
                        </div>
                        <div class="field-body">
                           <input class="input" type="text" :value="selected_data_blokir.KD_KANTOR">
                        </div>
                     </div>
                     <!-- TGL BLOKIR -->
                     <div class="field is-horizontal">
                        <div class="field-label is-normal is-flex-grow-2">
                           <label class="label has-text-left">Tgl. Blokir</label>
                        </div>
                        <div class="field-body">
                           <input class="input" type="text" :value="selected_data_blokir.TGL_BLOKIR">
                        </div>
                     </div>
                     <!-- ALASAN BLOKIR -->
                     <div class="field is-horizontal">
                        <div class="field-label is-normal is-flex-grow-2">
                           <label class="label has-text-left">Alasan Blokir</label>
                        </div>
                        <div class="field-body">
                           <textarea class="textarea" rows="3" type="text" :value="selected_data_blokir.ALASAN_BLOKIR"></textarea>
                        </div>
                     </div>
                     <!-- NO. SKEP -->
                     <div class="field is-horizontal">
                        <div class="field-label is-normal is-flex-grow-2">
                           <label class="label has-text-left">No. SKEP</label>
                        </div>
                        <div class="field-body">
                           <input class="input" type="text" :value="selected_data_blokir.NO_SKEP">
                        </div>
                     </div>
                     <!-- TGL> SKEP -->
                     <div class="field is-horizontal">
                        <div class="field-label is-normal is-flex-grow-2">
                           <label class="label has-text-left">Tgl. SKEP</label>
                        </div>
                        <div class="field-body">
                           <input class="input" type="text" :value="selected_data_blokir.TGL_SKEP">
                        </div>
                     </div>
                     <!-- WK CABUT -->
                     <div class="field is-horizontal">
                        <div class="field-label is-normal is-flex-grow-2">
                           <label class="label has-text-left">Wk. Cabut</label>
                        </div>
                        <div class="field-body">
                           <input class="input" type="text" :value="selected_data_blokir.WK_CABUT">
                        </div>
                     </div>
                     <!-- ALASAN CABUT -->
                     <div class="field is-horizontal">
                        <div class="field-label is-normal is-flex-grow-2">
                           <label class="label has-text-left">Alasan Cabut</label>
                        </div>
                        <div class="field-body">
                           <textarea class="textarea" rows="3" type="text" :value="selected_data_blokir.ALASAN_CABUT"></textarea>
                        </div>
                     </div>
                     <!-- Status -->
                     <div class="field is-horizontal">
                        <div class="field-label is-normal is-flex-grow-2">
                           <label class="label has-text-left">Status</label>
                        </div>
                        <div class="field-body">
                           <input class="input" type="text" :value="selected_data_blokir.STATUS">
                        </div>
                     </div>
                  </section>
                  <footer class="modal-card-foot">
                     <!-- <button class="button is-success">Save changes</button>
                     <button class="button">Cancel</button> -->
                  </footer>
               </div>
            </div>
            <!-- end -->
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
         data_blokir: [],
         selected_data_blokir: []
      }
   },
   watch: {
   },
   mounted() {
      var quickviews = bulmaQuickview.attach();
      // document.addEventListener('DOMContentLoaded', () => {
      //    function openModal
      // });
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
      },
      openBlModal: function(e, i) {
         var el = this.$refs.blmodal;
         el.classList.add('is-active');
         this.selected_data_blokir = this.data_blokir[i];
         console.log(this.selected_data_blokir);
      },
      closeBlModal: function() {
         var el = this.$refs.blmodal;
         el.classList.remove('is-active');
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


