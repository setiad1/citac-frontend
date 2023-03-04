<template>
   <div ref="main" id="main" class="container is-fluid mt-5 p-32">
         <page-header class="is-inline-block"></page-header>
         <div class="is-pulled-right">
            <button class="button is-small is-info mb-4" data-show="quickview" data-target="quickviewDefault">
               <span class="icon">
                  <i class="fa-regular fa-filter-list"></i>
               </span>
               <span>Filter</span>
            </button>
         </div>

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
                              @search="getKantorBC"
                              :options="s_kantor_options">
                        </v-select>
                     </div>
                     <div class="column pb-0 is-full">
                        <hr class="m-0">
                     </div>

                     <!-- Base -->
                     <div class="column pb-0 is-full">
                        <v-select
                           class="v-selectx v-komoditi"
                           placeholder="Komoditi/HS"
                           v-model="s_base"
                           label="name"
                           @update:modelValue="selectedBase"
                           :reduce="s_base => s_base.code" 
                           :options="s_base_options">
                        </v-select>
                     </div>

                     <!-- Komoditi -->
                     <div v-if="s_base === 1" class="column pb-0 is-full">
                        <v-select
                           class="v-selectx v-filter" 
                           placeholder="Komoditi" 
                           v-model="s_komoditi"
                           label="komoditi"
                           :reduce="s_komoditi => s_komoditi.komoditi"
                           @update:modelValue="selectedKomoditi"
                           @search="getKomoditi"
                           :options="s_komoditi_options">
                        </v-select>
                     </div>

                     <!-- Sub-komoditi -->
                     <div v-if="s_base === 1" class="column pb-0 is-full">
                        <v-select 
                           class="v-selectx v-filter" 
                           placeholder="Sub-komoditi" 
                           v-model="s_subkomoditi"
                           :reduce="s_subkomoditi => s_subkomoditi.subkomoditi"
                           label="subkomoditi"
                           @search="subKomoditi"
                           :options="s_subkomoditi_options">
                        </v-select>
                     </div>

                     <div v-if="s_base === 2" class="column pb-0 is-full">
                        <!-- HS -->
                        <v-select 
                           class="v-selectx v-filter" 
                           placeholder="HS" 
                           v-model="s_hs"
                           label="kode"
                           @search="getHs"
                           :reduce="s_hs => s_hs.kode"
                           :options="s_hs_options">
                           <i slot="spinner" class="icon icon-spinner"></i>
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
                           @search="getNegara">
                        </v-select>
                     </div>
                     <div class="column pb-0 is-full">
                        <!-- Exim -->
                        <v-select disabled
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

         <div class="columns is-multiline is-variable is-1-mobile is-1-tablet is-1-desktop is-1-widescreen is-1-fullhd">
            <div class="column is-full-mobile is-full-tablet is-half-desktop is-one-third-widescreen">
               <!-- <div class="is-size-5 has-text-weight-bold mb-4">
                  Netto
                  <span class="is-size-6 has-text-weight-normal has-text-grey-darker is-block">Netto</span>
               </div> -->
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
                  <v-chart 
                     v-if="c_netto.series[0]?.data?.length > 0" 
                     :key="c_netto.series"
                     class="chart border box" 
                     style="width: 100%; min-height: 400px;" 
                     :option="c_netto" 
                     autoresize/>
                  <div v-else class="v-charte">
                     <span>No data..</span>
                  </div>
               </div>
            </div>
            <div class="column is-full-mobile is-full-tablet is-half-desktop is-one-third-widescreen">
               <!-- <div class="is-size-5 has-text-weight-bold mb-4">
                  Total Bayar Per Netto
                  <span class="is-size-6 has-text-weight-normal has-text-grey-darker is-block">Total bayar per netto</span>
               </div> -->
               <div class="is-relative">
                  <loading class="loading" v-model:active="isLoading"
                  :can-cancel="false"
                  :background-color="'white'"
                  :opacity="1"
                  :z-index="25"
                  :height="25"
                  :width="25"
                  :loader="'spinner'"
                  :is-full-page="fullPage">
                  </loading>
                  <v-chart 
                     v-if="c_total_bayar_per_netto.series[0]?.data?.length > 0" 
                     :key="c_total_bayar_per_netto.series"
                     class="chart border box" 
                     style="width: 100%; min-height: 400px;" 
                     :option="c_total_bayar_per_netto" 
                     autoresize/>
                  <div v-else class="v-charte">
                     <span>No data..</span>
                  </div>
               </div>
            </div>
            <div class="column is-full-mobile is-full-tablet is-half-desktop is-one-third-widescreen">
               <!-- <div class="is-size-5 has-text-weight-bold mb-4">
                  Average Bayar Per Netto
                  <span class="is-size-6 has-text-weight-normal has-text-grey-darker is-block">Average bayar per netto</span>
               </div> -->
               <div class="is-relative">
                  <loading class="loading" v-model:active="isLoading"
                  :can-cancel="false"
                  :background-color="'white'"
                  :opacity="1"
                  :z-index="25"
                  :height="25"
                  :width="25"
                  :loader="'spinner'"
                  :is-full-page="fullPage">
                  </loading>
                  <v-chart 
                     v-if="c_avg_bayar_per_netto.series[0]?.data?.length > 0" 
                     :key="c_avg_bayar_per_netto.series"
                     class="chart border box" 
                     style="width: 100%; min-height: 400px;" 
                     :option="c_avg_bayar_per_netto" 
                     autoresize/>
                  <div v-else class="v-charte">
                     <span>No data..</span>
                  </div>
               </div>
            </div>
            <div class="column is-full-mobile is-full-tablet is-half-desktop is-one-third-widescreen">
               <!-- <div class="is-size-5 has-text-weight-bold mb-4">
                  Average BM Per Netto
                  <span class="is-size-6 has-text-weight-normal has-text-grey-darker is-block">Average BM per netto</span>
               </div> -->
               <div class="is-relative">
                  <loading class="loading" v-model:active="isLoading"
                  :can-cancel="false"
                  :background-color="'white'"
                  :opacity="1"
                  :z-index="25"
                  :height="25"
                  :width="25"
                  :loader="'spinner'"
                  :is-full-page="fullPage">
                  </loading>
                  <v-chart 
                     v-if="c_avg_bm_per_netto.series[0]?.data?.length > 0" 
                     :key="c_avg_bm_per_netto.series"
                     class="chart border box" 
                     style="width: 100%; min-height: 400px;" 
                     :option="c_avg_bm_per_netto" 
                     autoresize/>
                  <div v-else class="v-charte">
                     <span>No data..</span>
                  </div>
               </div>
            </div>
            <div class="column is-full-mobile is-full-tablet is-half-desktop is-one-third-widescreen">
               <!-- <div class="is-size-5 has-text-weight-bold mb-4">
                  Teus
                  <span class="is-size-6 has-text-weight-normal has-text-grey-darker is-block">Teus bulanan</span>
               </div> -->
               <div class="is-relative">
                  <loading class="loading" v-model:active="isLoading"
                  :can-cancel="false"
                  :background-color="'white'"
                  :opacity="1"
                  :z-index="25"
                  :height="25"
                  :width="25"
                  :loader="'spinner'"
                  :is-full-page="fullPage">
                  </loading>
                  <v-chart 
                     v-if="c_teus_bulanan.series[0]?.data?.length > 0" 
                     :key="c_teus_bulanan.series"
                     class="chart border box" 
                     style="width: 100%; min-height: 400px;" 
                     :option="c_teus_bulanan" 
                     autoresize/>
                  <div v-else class="v-charte">
                     <span>No data..</span>
                  </div>
               </div>
            </div>
            <div class="column is-full-mobile is-full-tablet is-half-desktop is-one-third-widescreen">
               <!-- <div class="is-size-5 has-text-weight-bold mb-4">
                  Total Bayar Per Teus
                  <span class="is-size-6 has-text-weight-normal has-text-grey-darker is-block">Total bayar per teus</span>
               </div> -->
               <div class="is-relative">
                  <loading class="loading" v-model:active="isLoading"
                  :can-cancel="false"
                  :background-color="'white'"
                  :opacity="1"
                  :z-index="25"
                  :height="25"
                  :width="25"
                  :loader="'spinner'"
                  :is-full-page="fullPage">
                  </loading>
                  <v-chart 
                     v-if="c_total_bayar_per_teus.series[0]?.data?.length > 0" 
                     :key="c_total_bayar_per_teus.series"
                     class="chart border box" 
                     style="width: 100%; min-height: 400px;" 
                     :option="c_total_bayar_per_teus" 
                     autoresize/>
                  <div v-else class="v-charte">
                     <span>No data..</span>
                  </div>
               </div>
            </div>
            <div class="column is-full-mobile is-full-tablet is-half-desktop is-one-third-widescreen">
               <!-- <div class="is-size-5 has-text-weight-bold mb-4">
                  Average Bayar Per Teus
                  <span class="is-size-6 has-text-weight-normal has-text-grey-darker is-block">Average bayar per teus</span>
               </div> -->
               <div class="is-relative">
                  <loading class="loading" v-model:active="isLoading"
                  :can-cancel="false"
                  :background-color="'white'"
                  :opacity="1"
                  :z-index="25"
                  :height="25"
                  :width="25"
                  :loader="'spinner'"
                  :is-full-page="fullPage">
                  </loading>
                  <v-chart 
                     v-if="c_avg_bayar_per_teus.series[0]?.data?.length > 0" 
                     :key="c_avg_bayar_per_teus.series"
                     class="chart border box" 
                     style="width: 100%; min-height: 400px;" 
                     :option="c_avg_bayar_per_teus" 
                     autoresize/>
                  <div v-else class="v-charte">
                     <span>No data..</span>
                  </div>
               </div>
            </div>
            <div class="column is-full-mobile is-full-tablet is-half-desktop is-one-third-widescreen">
               <!-- <div class="is-size-5 has-text-weight-bold mb-4">
                  Average BM Per Teus
                  <span class="is-size-6 has-text-weight-normal has-text-grey-darker is-block">Average BM per teus</span>
               </div> -->
               <div class="is-relative">
                  <loading class="loading" v-model:active="isLoading"
                  :can-cancel="false"
                  :background-color="'white'"
                  :opacity="1"
                  :z-index="25"
                  :height="25"
                  :width="25"
                  :loader="'spinner'"
                  :is-full-page="fullPage">
                  </loading>
                  <v-chart 
                     v-if="c_avg_bm_per_teus.series[0]?.data?.length > 0" 
                     :key="c_avg_bm_per_teus.series" 
                     class="chart border box" 
                     style="width: 100%; min-height: 400px;" 
                     :option="c_avg_bm_per_teus" 
                     autoresize/>
                  <div v-else class="v-charte">
                     <span>No data..</span>
                  </div>
               </div>
            </div>
         </div>

         <div class="is-divider p-0 m-0 mb-5" data-content="|"></div>

         <div class="columns is-multiline is-variable is-1-mobile is-1-tablet is-1-desktop is-1-widescreen is-1-fullhd">
            <!-- 25 Komoditi Terbesar -->
            <div class="column is-full-mobile is-full-tablet is-half-desktop is-one-quarter-widescreen">
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
                  <div class="panel" style="border-radius: 4px !important;">
                     <p 
                        class="panel-heading is-size-6 has-text-centered" 
                        style="border-radius: 4px 4px 0 0 !important;">25 Besar Komoditi<br />
                        <span class="is-size-7 has-text-grey-dark">({{ s_tahun }})</span>
                     </p>
                     <div class="panel-block is-block">
                        <tabs 
                           class="tabs is-centered is-boxed is-block" 
                           :options="{ defaultTabHash: 'top-dokumen' }">
                           <tab id="top-dokumen" name="Jml. Dok">
                              <div class="mt-1">
                                 <table class="table is-striped is-narrow is-hoverable is-fullwidth">
                                    <thead>
                                       <tr>
                                          <th>Komoditi</th>
                                          <th>Dok</th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                       <tr v-for="(d, i) in topKomoditi.by_dok" :key="i">
                                          <td style="word-wrap: break-word; white-space: pre-wrap;">{{ d[0] }}</td>
                                          <td class="is-pull-right has-text-right">{{ toIDR(d[1]) }}</td>
                                       </tr>
                                    </tbody>
                                 </table>
                              </div>
                           </tab>
                           <tab id="top-teus" name="Jml. Teus">
                              <div class="mt-1">
                                 <table class="table is-striped is-narrow is-hoverable is-fullwidth">
                                    <thead>
                                       <tr>
                                          <th>Komoditi</th>
                                          <th>Teus</th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                       <tr v-for="(d, i) in topKomoditi.by_teus" :key="i">
                                          <td style="word-wrap: break-word; white-space: pre-wrap;">{{ d[0] }}</td>
                                          <td class="is-pull-right has-text-right">{{ toIDR(d[1]) }}</td>
                                       </tr>
                                    </tbody>
                                 </table>
                              </div>
                           </tab>
                           <tab id="top-netto" name="Jml. Netto">
                              <div class="mt-1">
                                 <table class="table is-striped is-narrow is-hoverable is-fullwidth">
                                    <thead>
                                       <tr>
                                          <th>Komoditi</th>
                                          <th>Netto</th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                       <tr v-for="(d, i) in topKomoditi.by_netto" :key="i">
                                          <td style="word-wrap: break-word; white-space: pre-wrap;">{{ d[0] }}</td>
                                          <td class="is-pull-right has-text-right">{{ toIDR(d[1]) }}</td>
                                       </tr>
                                    </tbody>
                                 </table>
                              </div>
                           </tab>
                           <tab id="top-nilai" name="Jml. Nilai">
                              <div class="mt-1">
                                 <table class="table is-striped is-narrow is-hoverable is-fullwidth">
                                    <thead>
                                       <tr>
                                          <th>Komoditi</th>
                                          <th>Nilai</th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                       <tr v-for="(d, i) in topKomoditi.by_nilai" :key="i">
                                          <td style="word-wrap: break-word; white-space: pre-wrap;">{{ d[0] }}</td>
                                          <td class="is-pull-right has-text-right">{{ toIDR(d[1]) }}</td>
                                       </tr>
                                    </tbody>
                                 </table>
                              </div>
                           </tab>
                        </tabs>
                     </div>
                  </div>
               </div>
            </div>
            
            <!-- 25 Besar Importir -->
            <div class="column is-full-mobile is-full-tablet is-half-desktop is-one-quarter-widescreen">
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
                  <div class="panel" style="border-radius: 4px !important;">
                     <p 
                        class="panel-heading is-size-6 has-text-centered" 
                        style="border-radius: 4px 4px 0 0 !important;">25 Besar Importir<br />
                        <span class="is-size-7 has-text-grey-dark">({{ s_tahun }})</span>
                     </p>
                     <div class="panel-block is-block">
                        <tabs 
                           class="tabs is-centered is-boxed is-block" 
                           :options="{ defaultTabHash: 'top-dokumen' }">
                           <tab id="top-dokumen" name="Jml. Dok">
                              <div class="mt-1">
                                 <table class="table is-striped is-narrow is-hoverable is-fullwidth">
                                    <thead>
                                       <tr>
                                          <th>Nama</th>
                                          <th>Dok</th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                       <tr v-for="(d, i) in topImportir.by_dok" :key="i">
                                          <td style="word-wrap: break-word; white-space: pre-wrap;">{{ d[0] }}</td>
                                          <td class="is-pull-right has-text-right">{{ toIDR(d[1]) }}</td>
                                       </tr>
                                    </tbody>
                                 </table>
                              </div>
                           </tab>
                           <tab id="top-teus" name="Jml. Teus">
                              <div class="mt-1">
                                 <table class="table is-striped is-narrow is-hoverable is-fullwidth">
                                    <thead>
                                       <tr>
                                          <th>Nama</th>
                                          <th>Teus</th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                       <tr v-for="(d, i) in topImportir.by_teus" :key="i">
                                          <td style="word-wrap: break-word; white-space: pre-wrap;">{{ d[0] }}</td>
                                          <td class="is-pull-right has-text-right">{{ toIDR(d[1]) }}</td>
                                       </tr>
                                    </tbody>
                                 </table>
                              </div>
                           </tab>
                           <tab id="top-netto" name="Jml. Netto">
                              <div class="mt-1">
                                 <table class="table is-striped is-narrow is-hoverable is-fullwidth">
                                    <thead>
                                       <tr>
                                          <th>Nama</th>
                                          <th>Netto</th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                       <tr v-for="(d, i) in topImportir.by_netto" :key="i">
                                          <td style="word-wrap: break-word; white-space: pre-wrap;">{{ d[0] }}</td>
                                          <td class="is-pull-right has-text-right">{{ toIDR(d[1]) }}</td>
                                       </tr>
                                    </tbody>
                                 </table>
                              </div>
                           </tab>
                           <tab id="top-nilai" name="Jml. Nilai">
                              <div class="mt-1">
                                 <table class="table is-striped is-narrow is-hoverable is-fullwidth">
                                    <thead>
                                       <tr>
                                          <th>Nama</th>
                                          <th>Nilai Pabean</th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                       <tr v-for="(d, i) in topImportir.by_nilai" :key="i">
                                          <td style="word-wrap: break-word; white-space: pre-wrap;">{{ d[0] }}</td>
                                          <td class="is-pull-right has-text-right">{{ toIDR(d[1]) }}</td>
                                       </tr>
                                    </tbody>
                                 </table>
                              </div>
                           </tab>
                        </tabs>
                     </div>
                  </div>
               </div>
            </div>

            <!-- 25 Besar Neg Asal -->
            <div class="column is-full-mobile is-full-tablet is-half-desktop is-one-quarter-widescreen">
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
                  <div class="panel" style="border-radius: 4px !important;">
                     <p 
                        class="panel-heading is-size-6 has-text-centered" 
                        style="border-radius: 4px 4px 0 0 !important;">25 Besar Negara Asal<br />
                        <span class="is-size-7 has-text-grey-dark">({{ s_tahun }})</span>
                     </p>
                     <div class="panel-block is-block">
                        <tabs 
                           class="tabs is-centered is-boxed is-block" 
                           :options="{ defaultTabHash: 'top-dokumen' }">
                           <tab id="top-dokumen" name="Jml. Dok">
                              <div class="mt-1">
                                 <table class="table is-striped is-narrow is-hoverable is-fullwidth">
                                    <thead>
                                       <tr>
                                          <th>Nama</th>
                                          <th>Dok</th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                       <tr v-for="(d, i) in topNegaraAsal.by_dok" :key="i">
                                          <td style="word-wrap: break-word; white-space: pre-wrap;">{{ d[0] }}</td>
                                          <td class="is-pull-right has-text-right">{{ toIDR(d[1]) }}</td>
                                       </tr>
                                    </tbody>
                                 </table>
                              </div>
                           </tab>
                           <tab id="top-teus" name="Jml. Teus">
                              <div class="mt-1">
                                 <table class="table is-striped is-narrow is-hoverable is-fullwidth">
                                    <thead>
                                       <tr>
                                          <th>Nama</th>
                                          <th>Teus</th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                       <tr v-for="(d, i) in topNegaraAsal.by_teus" :key="i">
                                          <td style="word-wrap: break-word; white-space: pre-wrap;">{{ d[0] }}</td>
                                          <td class="is-pull-right has-text-right">{{ toIDR(d[1]) }}</td>
                                       </tr>
                                    </tbody>
                                 </table>
                              </div>
                           </tab>
                           <tab id="top-netto" name="Jml. Netto">
                              <div class="mt-1">
                                 <table class="table is-striped is-narrow is-hoverable is-fullwidth">
                                    <thead>
                                       <tr>
                                          <th>Nama</th>
                                          <th>Netto</th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                       <tr v-for="(d, i) in topNegaraAsal.by_netto" :key="i">
                                          <td style="word-wrap: break-word; white-space: pre-wrap;">{{ d[0] }}</td>
                                          <td class="is-pull-right has-text-right">{{ toIDR(d[1]) }}</td>
                                       </tr>
                                    </tbody>
                                 </table>
                              </div>
                           </tab>
                           <tab id="top-nilai" name="Jml. Nilai">
                              <div class="mt-1">
                                 <table class="table is-striped is-narrow is-hoverable is-fullwidth">
                                    <thead>
                                       <tr>
                                          <th>Nama</th>
                                          <th>Nilai</th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                       <tr v-for="(d, i) in topNegaraAsal.by_nilai" :key="i">
                                          <td style="word-wrap: break-word; white-space: pre-wrap;">{{ d[0] }}</td>
                                          <td class="is-pull-right has-text-right">{{ toIDR(d[1]) }}</td>
                                       </tr>
                                    </tbody>
                                 </table>
                              </div>
                           </tab>
                        </tabs>
                     </div>
                  </div>
               </div>
            </div>

            <!-- Kantor Bea Cukai -->
            <div class="column is-full-mobile is-full-tablet is-half-desktop is-one-quarter-widescreen">
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
                  <div class="panel" style="border-radius: 4px !important;">
                     <p 
                        class="panel-heading is-size-6 has-text-centered" 
                        style="border-radius: 4px 4px 0 0 !important;">Kantor Bea Cukai<br />
                        <span class="is-size-7 has-text-grey-dark">({{ s_tahun }})</span>
                     </p>
                     <div class="panel-block is-block">
                        <tabs 
                           class="tabs is-centered is-boxed is-block" 
                           :options="{ defaultTabHash: 'top-dokumen' }">
                           <tab id="top-dokumen" name="Jml. Dok">
                              <div class="mt-1">
                                 <table class="table is-striped is-narrow is-hoverable is-fullwidth">
                                    <thead>
                                       <tr>
                                          <th>Nama</th>
                                          <th>Dok</th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                       <tr v-for="(d, i) in summaryByDok" :key="i">
                                          <td style="word-wrap: break-word; white-space: pre-wrap;">{{ d[0] }}</td>
                                          <td class="is-pull-right has-text-right">{{ toIDR(d[1]) }}</td>
                                       </tr>
                                    </tbody>
                                 </table>
                              </div>
                           </tab>
                           <tab id="top-teus" name="By/Bruto">
                              <div class="mt-1">
                                 <table class="table is-striped is-narrow is-hoverable is-fullwidth">
                                    <thead>
                                       <tr>
                                          <th>Nama</th>
                                          <th>Teus</th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                       <tr v-for="(d, i) in summaryByAvgBayarPerBruto" :key="i">
                                          <td style="word-wrap: break-word; white-space: pre-wrap;">{{ d[0] }}</td>
                                          <td class="is-pull-right has-text-right">{{ toIDR(d[1]) }}</td>
                                       </tr>
                                    </tbody>
                                 </table>
                              </div>
                           </tab>
                           <tab id="top-netto" name="By/Teus">
                              <div class="mt-1">
                                 <table class="table is-striped is-narrow is-hoverable is-fullwidth">
                                    <thead>
                                       <tr>
                                          <th>Nama</th>
                                          <th>Netto</th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                       <tr v-for="(d, i) in summaryByAvgBayarPerTeus" :key="i">
                                          <td style="word-wrap: break-word; white-space: pre-wrap;">{{ d[0] }}</td>
                                          <td class="is-pull-right has-text-right">{{ toIDR(d[1]) }}</td>
                                       </tr>
                                    </tbody>
                                 </table>
                              </div>
                           </tab>
                           <tab id="top-nilai" name="NP/Teus">
                              <div class="mt-1">
                                 <table class="table is-striped is-narrow is-hoverable is-fullwidth">
                                    <thead>
                                       <tr>
                                          <th>Nama</th>
                                          <th>Nilai</th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                       <tr v-for="(d, i) in summaryByAvgNilaiPerTeus" :key="i">
                                          <td style="word-wrap: break-word; white-space: pre-wrap;">{{ d[0] }}</td>
                                          <td class="is-pull-right has-text-right">{{ toIDR(d[1]) }}</td>
                                       </tr>
                                    </tbody>
                                 </table>
                              </div>
                           </tab>
                        </tabs>
                     </div>
                  </div>
               </div>
            </div>
         </div>
   </div>
</template>
 
<script>
// all lodash, not efective
var _ = require('lodash');
import debounce from 'lodash.debounce';
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
         from: new Date().getFullYear().toString() + '-01-01',
         to: new Date().getFullYear().toString() + '-12-31',
         s_tahun: 2023,
         s_tahun_options: ['2021','2022','2023'],
         s_kantor: null,
         s_kantor_options: [],
         s_base: null,
         s_base_options: [{name: 'Komoditi', code: 1}, {name: 'HS Code', code: 2}],
         s_komoditi: null,
         s_komoditi_options: [],
         s_subkomoditi: null,
         s_subkomoditi_options: [],
         s_hs: null,
         s_hs_options: [],
         s_negara: null,
         s_negara_options: [],
         s_exim: 2,
         s_pelabuhan_utama: [
            {
               nama_kantor: "PELABUHAN UTAMA", 
               kd_kantor: '040300,060100,070100'
            }
         ],
         c_teus_bulanan: {
            title: {
               show: true,
               text: 'Teus',
               subtext: 'Teus bulanan',
               left: 'center'
            },
            toolbox: {
               show: true,
               top: 113,
               orient: 'vertical',
               feature: {
                  mark: { show: true },
                  saveAsImage: { show: true }
               }
            },
            legend: {
               show: true,
               orient: 'horizontal',
               textStyle: {
                  fontSize: 10
               },
               top: 60
            },
            tooltip: {
               trigger: 'axis',
               formatter: function (params) {
                  var f = `${params[0].name}<br/>`;
                  for (var i=0; i<params.length; i++) {
                     f += `${params[i].marker} ${params[i].seriesName}: `+
                          `<b>` + new Intl.NumberFormat('id').format(params[i].value[1].toFixed(0)) + `</b><br/>`;
                  }
                  return f;
               }
            },
            grid: {
               show: true,
               left: 40,
               top: 120,
               right: 40,
               bottom: 30
            },
            xAxis: {
               type: 'category',
               data: ['Jan', 'Feb', 'Mar', 'Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'], 
            },
            yAxis: {
               type: 'value',
               axisLabel: {
                  formatter: function(v) {
                     return new Intl.NumberFormat('id', {notation: "compact", maximumFractionDigits: 1}).format(v)
                  }
               }
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
         },
         c_netto: {
            title: {
               show: true,
               text: 'Netto',
               subtext: 'Netto',
               left: 'center'
            },
            toolbox: {
               show: true,
               top: 113,
               orient: 'vertical',
               feature: {
                  mark: { show: true },
                  saveAsImage: { show: true }
               }
            },
            legend: {
               show: true,
               orient: 'horizontal',
               textStyle: {
                  fontSize: 10
               },
               top: 60
            },
            tooltip: {
               trigger: 'axis',
               formatter: function (params) {
                  var f = `${params[0].name}<br/>`;
                  for (var i=0; i<params.length; i++) {
                     f += `${params[i].marker} ${params[i].seriesName}: `+
                          `<b>` + new Intl.NumberFormat('id').format(params[i].value[1].toFixed(0)) + `</b><br/>`;
                  }
                  return f;
               }
            },
            grid: {
               show: true,
               left: 40,
               top: 120,
               right: 40,
               bottom: 30
            },
            xAxis: {
               type: 'category',
               data: ['Jan', 'Feb', 'Mar', 'Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'], 
            },
            yAxis: {
               type: 'value',
               axisLabel: {
                  formatter: function(v) {
                     return new Intl.NumberFormat('id', {notation: "compact", maximumFractionDigits: 1}).format(v)
                  }
               }
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
         },
         c_total_bayar_per_netto: {
            title: {
               show: true,
               text: 'Total Bayar Per Netto',
               subtext: 'Total bayar per netto',
               left: 'center'
            },
            toolbox: {
               show: true,
               top: 113,
               orient: 'vertical',
               feature: {
                  mark: { show: true },
                  saveAsImage: { show: true }
               }
            },
            legend: {
               show: true,
               orient: 'horizontal',
               textStyle: {fontSize: 10},
               top: 60
            },
            tooltip: {
               trigger: 'axis',
               formatter: function (params) {
                  var f = `${params[0].name}<br/>`;
                  for (var i=0; i<params.length; i++) {
                     f += `${params[i].marker} ${params[i].seriesName}: `+
                          `<b>` + new Intl.NumberFormat('id').format(params[i].value[1].toFixed(0)) + `</b><br/>`;
                  }
                  return f;
               }
            },
            grid: {
               show: true,
               left: 40,
               top: 120,
               right: 40,
               bottom: 30
            },
            xAxis: {
               type: 'category',
               data: ['Jan', 'Feb', 'Mar', 'Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'], 
            },
            yAxis: {
               type: 'value',
               axisLabel: {
                  formatter: function(v) {
                     return new Intl.NumberFormat('id', {notation: "compact", maximumFractionDigits: 1}).format(v)
                  }
               }
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
         },
         c_total_bayar_per_teus: {
            title: {
               show: true,
               text: 'Total Bayar Per Teus',
               subtext: 'Total bayar per teus',
               left: 'center'
            },
            toolbox: {
               show: true,
               top: 113,
               orient: 'vertical',
               feature: {
                  mark: { show: true },
                  saveAsImage: { show: true }
               }
            },
            legend: {
               show: true,
               orient: 'horizontal',
               textStyle: {
                  fontSize: 10
               },
               top: 60
            },
            tooltip: {
               trigger: 'axis',
               formatter: function (params) {
                  var f = `${params[0].name}<br/>`;
                  for (var i=0; i<params.length; i++) {
                     f += `${params[i].marker} ${params[i].seriesName}: `+
                          `<b>` + new Intl.NumberFormat('id').format(params[i].value[1].toFixed(0)) + `</b><br/>`;
                  }
                  return f;
               }
            },
            grid: {
               show: true,
               left: 50,
               top: 120,
               right: 40,
               bottom: 30
            },
            xAxis: {
               type: 'category',
               data: ['Jan', 'Feb', 'Mar', 'Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'], 
            },
            yAxis: {
               type: 'value',
               axisLabel: {
                  formatter: function(v) {
                     return new Intl.NumberFormat('id', {notation: "compact", maximumFractionDigits: 1}).format(v)
                  }
               }
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
         },
         c_avg_bayar_per_netto: {
            title: {
               show: true,
               text: 'Average Bayar Per Netto',
               subtext: 'Average bayar per netto',
               left: 'center'
            },
            toolbox: {
               show: true,
               top: 113,
               orient: 'vertical',
               feature: {
                  mark: { show: true },
                  saveAsImage: { show: true }
               }
            },
            legend: {
               show: true,
               orient: 'horizontal',
               textStyle: {fontSize: 10},
               top: 60
            },
            tooltip: {
               trigger: 'axis',
               formatter: function (params) {
                  var f = `${params[0].name}<br/>`;
                  for (var i=0; i<params.length; i++) {
                     f += `${params[i].marker} ${params[i].seriesName}: `+
                          `<b>` + new Intl.NumberFormat('id').format(params[i].value[1].toFixed(0)) + `</b><br/>`;
                  }
                  return f;
               }
            },
            grid: {
               show: true,
               left: 50,
               top: 120,
               right: 40,
               bottom: 30
            },
            xAxis: {
               type: 'category',
               data: ['Jan', 'Feb', 'Mar', 'Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'], 
            },
            yAxis: {
               type: 'value',
               axisLabel: {
                  formatter: function(v) {
                     return new Intl.NumberFormat('id', {notation: "compact", maximumFractionDigits: 1}).format(v)
                  }
               }
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
         },
         c_avg_bayar_per_teus: {
            title: {
               show: true,
               text: 'Average Bayar Per Teus',
               subtext: 'Teus bulanan',
               left: 'center'
            },
            toolbox: {
               show: true,
               top: 113,
               orient: 'vertical',
               feature: {
                  mark: { show: true },
                  saveAsImage: { show: true }
               }
            },
            legend: {
               show: true,
               orient: 'horizontal',
               textStyle: {fontSize:10},
               top: 60
            },
            tooltip: {
               trigger: 'axis',
               formatter: function (params) {
                  var f = `${params[0].name}<br/>`;
                  for (var i=0; i<params.length; i++) {
                     f += `${params[i].marker} ${params[i].seriesName}: `+
                          `<b>` + new Intl.NumberFormat('id').format(params[i].value[1].toFixed(0)) + `</b><br/>`;
                  }
                  return f;
               }
            },
            grid: {
               show: true,
               left: 40,
               top: 120,
               right: 40,
               bottom: 30
            },
            xAxis: {
               type: 'category',
               data: ['Jan', 'Feb', 'Mar', 'Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'], 
            },
            yAxis: {
               type: 'value',
               axisLabel: {
                  formatter: function(v) {
                     return new Intl.NumberFormat('id', {notation: "compact", maximumFractionDigits: 1}).format(v)
                  }
               }
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
         },
         c_avg_bm_per_netto: {
            title: {
               show: true,
               text: 'Average BM Per Netto',
               subtext: 'Average BM Per Netto',
               left: 'center'
            },
            toolbox: {
               show: true,
               top: 113,
               orient: 'vertical',
               feature: {
                  mark: { show: true },
                  saveAsImage: { show: true }
               }
            },
            legend: {
               show: true,
               orient: 'horizontal',
               textStyle: {fontSize: 10},
               top: 60
            },
            tooltip: {
               trigger: 'axis',
               formatter: function (params) {
                  var f = `${params[0].name}<br/>`;
                  for (var i=0; i<params.length; i++) {
                     f += `${params[i].marker} ${params[i].seriesName}: `+
                          `<b>` + new Intl.NumberFormat('id').format(params[i].value[1].toFixed(0)) + `</b><br/>`;
                  }
                  return f;
               }
            },
            grid: {
               show: true,
               left: 40,
               top: 120,
               right: 40,
               bottom: 30
            },
            xAxis: {
               type: 'category',
               data: ['Jan', 'Feb', 'Mar', 'Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'], 
            },
            yAxis: {
               type: 'value',
               axisLabel: {
                  formatter: function(v) {
                     return new Intl.NumberFormat('id', {notation: "compact", maximumFractionDigits: 1}).format(v)
                  }
               }
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
         },
         c_avg_bm_per_teus: {
            title: {
               show: true,
               text: 'Average BM Per Teus',
               subtext: 'Teus bulanan',
               left: 'center'
            },
            toolbox: {
               show: true,
               top: 113,
               orient: 'vertical',
               feature: {
                  mark: { show: true },
                  saveAsImage: { show: true }
               }
            },
            legend: {
               show: true,
               orient: 'horizontal',
               textStyle: {fontSize: 10},
               top: 60
            },
            tooltip: {
               trigger: 'axis',
               formatter: function (params) {
                  var f = `${params[0].name}<br/>`;
                  for (var i=0; i<params.length; i++) {
                     f += `${params[i].marker} ${params[i].seriesName}: `+
                          `<b>` + new Intl.NumberFormat('id').format(params[i].value[1].toFixed(0)) + `</b><br/>`;
                  }
                  return f;
               }
            },
            grid: {
               show: true,
               left: 40,
               top: 120,
               right: 40,
               bottom: 30
            },
            xAxis: {
               type: 'category',
               data: ['Jan', 'Feb', 'Mar', 'Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'], 
            },
            yAxis: {
               type: 'value',
               axisLabel: {
                  formatter: function(v) {
                     return new Intl.NumberFormat('id', {notation: "compact", maximumFractionDigits: 1}).format(v)
                  }
               }
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
         },
         topImportir: [],
         topKomoditi: [],
         topNegaraAsal: [],
         summaryByDok: [],
         summaryByAvgNilaiPerTeus: [],
         summaryByAvgBayarPerTeus: [],
         summaryByAvgBayarPerBruto: []
      }
   },
   watch: {
      s_tahun: function() {
         this.from = `${this.s_tahun}-01-01`;
         this.to = `${this.s_tahun}-12-31`;
         this.impor();
         this.imporTop();
      },
      s_kantor: function() {
         this.impor();
         this.imporTop();
      },
      s_komoditi: function() {
         this.subKomoditi();
         this.impor();
      },
      s_subkomoditi: function() {
         this.impor();
      },
      s_negara: function() {
         this.impor();
      },
      s_hs: function() {
         this.impor();
      }
   },
   mounted() {
      var quickviews = bulmaQuickview.attach();
      this.s_kantor_options = this.s_pelabuhan_utama;
      this.s_kantor = "040300,060100,070100";
      this.impor();

      this.imporTop();
      this.imporSummary();
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
      getNegara: function() {
         if (this.negara) {
            return debounce(
               this.negara, 500
            )
         } else {
            return null
         }
      },
      getHs: function() {
         if (this.hs) {
            return debounce(
               this.hs, 500
            )
         } else {
            return null
         }
      },
      getKomoditi: function() {
         if (this.komoditi) {
            return debounce(
               this.komoditi, 500
            )
         } else {
            return null
         }
      },
   },
   methods: {
      toIDR: function (value) {
         if (typeof value !== "number") {
               return value;
         }
         var formatter = new Intl.NumberFormat('id', {});
         return formatter.format(value.toFixed(0));
         return value
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
            res.data = this.s_pelabuhan_utama.concat(res.data);
            this.s_kantor_options = res.data;
            l(false);
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
            setTimeout(() => {
               this.isLoading = false;
               this.c_teus_bulanan.series = res.data.map(e => ({
                  name: e.name,
                  data: e.data.map(e => [[null,'Jan', 'Feb', 'Mar', 'Apr','Mei','Jun','Jul','Aug','Sep','Okt','Nov','Dec'][e[0]],e[1]]),
                  type: 'line',
               }));
            }, 1000)
         })
      },
      komoditi: function(s, l) {
         if (s === "")
            return;
         l(true);
         this.axios.get("/komoditi", {
            params: {
               q: s
            }
         }).then((res) => {
            this.s_komoditi_options = res.data;
            l(false);
         })
      },
      selectedBase: function() {
         this.s_hs = null;
         this.s_hs_options = [];
         this.s_komoditi = null;
         this.s_komoditi_options = [];
         this.s_subkomoditi = null;
         this.s_subkomoditi_options = [];
      },
      selectedKomoditi: function() {
         this.s_subkomoditi = null;
         this.s_subkomoditi_options = [];
      },
      subKomoditi: function(s, l) {
         // // kalau multiple
         // var tx = JSON.parse(JSON.stringify(this.s_komoditi));
         // var qq = [];
         // tx.forEach(e => {
         //    qq.push(e.komoditi);
         // });
         // qq.join("|")
         // if (!this.komoditi)
         //    return; 
         if (l) {
            if (s === "")
               return;
            l(true);
         }
         this.axios.get("/subkomoditi", {
            params: {
               q: this.s_komoditi
            }
         }).then((res) => {
            this.s_subkomoditi_options = res.data;
            if (l) {
               l(false);
            }
         })
      },
      hs: function(s, l) {
         if (s === "")
            return;
         l(true);
         this.axios.get("/hs", {
            params: {
               q: s
            }
         }).then((res) => {
            this.s_hs_options = res.data;
            l(false);
         })
      },
      negara: function(s, l) {
         if (s === "")
            return;
         l(true);
         this.axios.get("/negara", {
            params: {
               q: s
            }
         }).then((res) => {
            this.s_negara_options = res.data;
            l(false);
         })
      },
      impor: function() {
         if (!this.s_kantor) 
            return; 
         this.isLoading = true;
         this.axios.get("/chart/impor", {
            params: {
               kd_kantor: this.s_kantor,
               from: this.from,
               to: this.to,
               neg_asal: this.s_negara,
               komoditi: this.s_komoditi,
               subkomoditi: this.s_subkomoditi,
               hs: this.s_hs
            }
         }).then((res) => {
            setTimeout(() => {
               this.isLoading = false;

               this.c_teus_bulanan.series = res.data.teus.map(e => ({
                  name: e.name,
                  data: e.data.map(e => [[null,'Jan', 'Feb', 'Mar', 'Apr','Mei','Jun','Jul','Aug','Sep','Okt','Nov','Dec'][e[0]],e[1]]),
                  type: 'line',
               }));

               this.c_netto.series = res.data.netto.map(e => ({
                  name: e.name,
                  data: e.data.map(e => [[null,'Jan', 'Feb', 'Mar', 'Apr','Mei','Jun','Jul','Aug','Sep','Okt','Nov','Dec'][e[0]],e[1]]),
                  type: 'line',
               }));

               this.c_avg_bayar_per_netto.series = res.data.avg_bayar_per_netto.map(e => ({
                  name: e.name,
                  data: e.data.map(e => [[null,'Jan', 'Feb', 'Mar', 'Apr','Mei','Jun','Jul','Aug','Sep','Okt','Nov','Dec'][e[0]],e[1]]),
                  type: 'line',
               }));

               this.c_avg_bayar_per_teus.series = res.data.avg_bayar_per_teus.map(e => ({
                  name: e.name,
                  data: e.data.map(e => [[null,'Jan', 'Feb', 'Mar', 'Apr','Mei','Jun','Jul','Aug','Sep','Okt','Nov','Dec'][e[0]],e[1]]),
                  type: 'line',
               }));

               this.c_avg_bm_per_netto.series = res.data.avg_bm_per_netto.map(e => ({
                  name: e.name,
                  data: e.data.map(e => [[null,'Jan', 'Feb', 'Mar', 'Apr','Mei','Jun','Jul','Aug','Sep','Okt','Nov','Dec'][e[0]],e[1]]),
                  type: 'line',
               }));

               this.c_avg_bm_per_teus.series = res.data.avg_bm_per_teus.map(e => ({
                  name: e.name,
                  data: e.data.map(e => [[null,'Jan', 'Feb', 'Mar', 'Apr','Mei','Jun','Jul','Aug','Sep','Okt','Nov','Dec'][e[0]],e[1]]),
                  type: 'line',
               }));

               this.c_total_bayar_per_netto.series = res.data.total_bayar_per_netto.map(e => ({
                  name: e.name,
                  data: e.data.map(e => [[null,'Jan', 'Feb', 'Mar', 'Apr','Mei','Jun','Jul','Aug','Sep','Okt','Nov','Dec'][e[0]],e[1]]),
                  type: 'line',
               }));

               this.c_total_bayar_per_teus.series = res.data.total_bayar_per_teus.map(e => ({
                  name: e.name,
                  data: e.data.map(e => [[null,'Jan', 'Feb', 'Mar', 'Apr','Mei','Jun','Jul','Aug','Sep','Okt','Nov','Dec'][e[0]],e[1]]),
                  type: 'line',
               }));
            }, 1000)
         })
      },
      imporTop: function() {
         var number = 25;
         this.axios.get(`/chart/impor/top/${number}`, {
            params: {
               kd_kantor: this.s_kantor,
               from: this.from,
               to: this.to
            }
         }).then((res) => {
            this.topImportir = res.data.importir;
            this.topKomoditi = res.data.komoditi;
            this.topNegaraAsal = res.data.negara;
         })
      },
      imporSummary: function() {
         var number = 25;
         this.axios.get(`/chart/impor/summary/${number}`, {
            params: {
               from: this.from,
               to: this.to
            }
         }).then((res) => {
            this.summaryByDok = res.data.by_dok;
            this.summaryByAvgNilaiPerTeus = res.data.by_avg_nilai_per_teus;
            this.summaryByAvgBayarPerTeus = res.data.by_avg_bayar_per_teus;
            this.summaryByAvgBayarPerBruto = res.data.by_avg_bayar_per_bruto;
         })
      }
   }
}
</script>
 
<style scoped>
@import "vue-select/dist/vue-select.css";
@import "bulma-extensions/bulma-quickview/dist/css/bulma-quickview.min.css";
@import "bulma-extensions/bulma-divider/dist/css/bulma-divider.min.css";
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
.table td, .table th {
   font-size: 0.93 !important;
}
</style>
 
<style>
.tabs li a {
   font-weight: bold !important;
}
.v-tahun, .v-tahun .vs__dropdown-option, .v-tahun .vs__dropdown-menu {
   width: 121px !important;
}
.v-kantor .vs__dropdown-toggle {
   border: var(--vs-border-width) var(--vs-border-style) #cc0f3563;
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
   