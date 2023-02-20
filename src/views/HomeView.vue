<template>
    <div id="main" class="container is-fluid mt-5 p-32">
        <div class="columns is-multiline">
            <!-- <div class="column is-full">
                <h1 class="title">Title</h1>
                <h2 class="subtitle">Subtitle</h2>
            </div> -->
            <div class="column is-full is-hidden-touch">
                <div class="field has-addons has-addons-centered">
                    <p class="control">
                        <v-select class="v-tahun" v-model="s_tahun" :options="['2023','2022','2021']"></v-select>
                    </p>
                    <p class="control">
                        <v-select class="v-kantor" v-model="s_kantor" placeholder="Seluruh kantor.." :options="['KPUBC Soekarno Hatta','KPUBC Tanjung Priok','KPPBC TMP A Jakarta']"></v-select>
                    </p>
                    <p class="control">
                        <a class="button is-info">
                            <i class="fa-light fa-arrow-rotate-right"></i>
                        </a>
                    </p>
                </div>
            </div>

            <div class="column is-full is-hidden-desktop">
                <v-select class="v-tahun-s" v-model="s_tahun" :options="['2023','2022','2021']"></v-select>
                <v-select class="v-kantor-s mt-2" v-model="s_kantor" placeholder="Seluruh kantor.." :options="['KPUBC Soekarno Hatta','KPUBC Tanjung Priok','KPPBC TMP A Jakarta']"></v-select>
                <a class="button is-outlined is-danger mt-2">
                    <i class="fa-light fa-arrow-rotate-right"></i>
                </a>
            </div>

        </div>
        <div class="columns is-multiline">
            <div class="column is-half-tablet is-half-desktop is-one-third-widescreen">
                <div class="is-size-5 has-text-weight-bold mb-4">Bar</div>
                <div ref="l1" class="is-relative"><v-chart class="chart border" style="width: 100%; min-height: 400px;" :option="bar" autoresize/></div>
            </div>
            <div class="column is-half-tablet is-half-desktop is-one-third-widescreen">
                <div class="is-size-5 has-text-weight-bold mb-4">Line</div>
                <div ref="l2" class="is-relative"><v-chart class="chart border" style="width: 100%; min-height: 400px;" :option="line" autoresize/></div>
            </div>
            <div class="column is-half-tablet is-half-desktop is-one-third-widescreen">
                <div class="is-size-5 has-text-weight-bold mb-4">Pie</div>
                <div ref="l3" class="is-relative"><v-chart class="chart border" style="width: 100%; min-height: 400px;" :option="pie" autoresize/></div>
            </div>
            <div class="column is-half-tablet is-half-desktop is-one-third-widescreen">
                <div class="is-size-5 has-text-weight-bold mb-4">Scatter</div>
                <div ref="l4" class="is-relative"><v-chart class="chart border" style="width: 100%; min-height: 400px;" :option="scatter" autoresize/></div>
            </div>
            <div class="column is-half-tablet is-half-desktop is-one-third-widescreen">
                <div class="is-size-5 has-text-weight-bold mb-4">Cadlestick</div>
                <div ref="l5" class="is-relative"><v-chart class="chart border" style="width: 100%; min-height: 400px;" :option="cadlestick" autoresize/></div>
            </div>
        </div>
    </div>
</template>
  
<script>
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
    ToolboxComponent 
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import vSelect from "vue-select";

use([
    EffectScatterChart,
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
    name: "HomeView",
    components: {
        VChart,
        vSelect
    },
    provide: {
        [THEME_KEY]: "light"
    },
    data() {
        return {
            s_tahun: 2023,
            s_kantor: null,
            bar: {
                legend: {
                    show: true
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: { show: true },
                        restore: { show: true },
                        myTool1: {
                            show: true,
                            title: 'Save as CSV',
                            icon: 'path fill="none" stroke="currentColor" d="M2.5 3.5v-2a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-10a1 1 0 0 1-1-1v-2m0-6l4 4m-4 0l4-4m-5-2h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1Z"',
                            onclick: function () {
                                alert('Your custom tool handler here..')
                            }
                        },
                        saveAsImage: { show: true }
                    }
                },
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
            },
            line: {
                toolbox: {
                    show: true,
                    feature: {
                        mark: { show: true },
                        restore: { show: true },
                        myTool1: {
                            show: true,
                            title: 'Save as CSV',
                            icon: 'path fill="none" stroke="currentColor" d="M2.5 3.5v-2a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-10a1 1 0 0 1-1-1v-2m0-6l4 4m-4 0l4-4m-5-2h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1Z"',
                            onclick: function () {
                                alert('Your custom tool handler here..')
                            }
                        },
                        saveAsImage: { show: true }
                    }
                },
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
            },
            pie: {
                toolbox: {
                    show: true,
                    feature: {
                        mark: { show: true },
                        restore: { show: true },
                        myTool1: {
                            show: true,
                            title: 'Save as CSV',
                            icon: 'path fill="none" stroke="currentColor" d="M2.5 3.5v-2a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-10a1 1 0 0 1-1-1v-2m0-6l4 4m-4 0l4-4m-5-2h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1Z"',
                            onclick: function () {
                                alert('Your custom tool handler here..')
                            }
                        },
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
            },
            scatter: {
                toolbox: {
                    show: true,
                    feature: {
                        mark: { show: true },
                        restore: { show: true },
                        myTool1: {
                            show: true,
                            title: 'Save as CSV',
                            icon: 'path fill="none" stroke="currentColor" d="M2.5 3.5v-2a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-10a1 1 0 0 1-1-1v-2m0-6l4 4m-4 0l4-4m-5-2h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1Z"',
                            onclick: function () {
                                alert('Your custom tool handler here..')
                            }
                        },
                        saveAsImage: { show: true }
                    }
                },
                xAxis: {
                    scale: true
                },
                yAxis: {
                    scale: true
                },
                series: [
                    {
                    type: 'effectScatter',
                    symbolSize: 20,
                    data: [
                        [172.7, 105.2],
                        [153.4, 42]
                    ]
                    },
                    {
                    type: 'scatter',
                    // prettier-ignore
                    data: [[161.2, 51.6], [167.5, 59.0], [159.5, 49.2], [157.0, 63.0], [155.8, 53.6],
                                [170.0, 59.0], [159.1, 47.6], [166.0, 69.8], [176.2, 66.8], [160.2, 75.2],
                                [172.5, 55.2], [170.9, 54.2], [172.9, 62.5], [153.4, 42.0], [160.0, 50.0],
                                [147.2, 49.8], [168.2, 49.2], [175.0, 73.2], [157.0, 47.8], [167.6, 68.8],
                                [159.5, 50.6], [175.0, 82.5], [166.8, 57.2], [176.5, 87.8], [170.2, 72.8],
                                [174.0, 54.5], [173.0, 59.8], [179.9, 67.3], [170.5, 67.8], [160.0, 47.0],
                                [154.4, 46.2], [162.0, 55.0], [176.5, 83.0], [160.0, 54.4], [152.0, 45.8],
                                [162.1, 53.6], [170.0, 73.2], [160.2, 52.1], [161.3, 67.9], [166.4, 56.6],
                                [168.9, 62.3], [163.8, 58.5], [167.6, 54.5], [160.0, 50.2], [161.3, 60.3],
                                [167.6, 58.3], [165.1, 56.2], [160.0, 50.2], [170.0, 72.9], [157.5, 59.8],
                                [167.6, 61.0], [160.7, 69.1], [163.2, 55.9], [152.4, 46.5], [157.5, 54.3],
                                [168.3, 54.8], [180.3, 60.7], [165.5, 60.0], [165.0, 62.0], [164.5, 60.3],
                                [156.0, 52.7], [160.0, 74.3], [163.0, 62.0], [165.7, 73.1], [161.0, 80.0],
                                [162.0, 54.7], [166.0, 53.2], [174.0, 75.7], [172.7, 61.1], [167.6, 55.7],
                                [151.1, 48.7], [164.5, 52.3], [163.5, 50.0], [152.0, 59.3], [169.0, 62.5],
                                [164.0, 55.7], [161.2, 54.8], [155.0, 45.9], [170.0, 70.6], [176.2, 67.2],
                                [170.0, 69.4], [162.5, 58.2], [170.3, 64.8], [164.1, 71.6], [169.5, 52.8],
                                [163.2, 59.8], [154.5, 49.0], [159.8, 50.0], [173.2, 69.2], [170.0, 55.9],
                                [161.4, 63.4], [169.0, 58.2], [166.2, 58.6], [159.4, 45.7], [162.5, 52.2],
                                [159.0, 48.6], [162.8, 57.8], [159.0, 55.6], [179.8, 66.8], [162.9, 59.4],
                                [161.0, 53.6], [151.1, 73.2], [168.2, 53.4], [168.9, 69.0], [173.2, 58.4],
                                [171.8, 56.2], [178.0, 70.6], [164.3, 59.8], [163.0, 72.0], [168.5, 65.2],
                                [166.8, 56.6], [172.7, 105.2], [163.5, 51.8], [169.4, 63.4], [167.8, 59.0],
                                [159.5, 47.6], [167.6, 63.0], [161.2, 55.2], [160.0, 45.0], [163.2, 54.0],
                                [162.2, 50.2], [161.3, 60.2], [149.5, 44.8], [157.5, 58.8], [163.2, 56.4],
                                [172.7, 62.0], [155.0, 49.2], [156.5, 67.2], [164.0, 53.8], [160.9, 54.4],
                                [162.8, 58.0], [167.0, 59.8], [160.0, 54.8], [160.0, 43.2], [168.9, 60.5],
                                [158.2, 46.4], [156.0, 64.4], [160.0, 48.8], [167.1, 62.2], [158.0, 55.5],
                                [167.6, 57.8], [156.0, 54.6], [162.1, 59.2], [173.4, 52.7], [159.8, 53.2],
                                [170.5, 64.5], [159.2, 51.8], [157.5, 56.0], [161.3, 63.6], [162.6, 63.2],
                                [160.0, 59.5], [168.9, 56.8], [165.1, 64.1], [162.6, 50.0], [165.1, 72.3],
                                [166.4, 55.0], [160.0, 55.9], [152.4, 60.4], [170.2, 69.1], [162.6, 84.5],
                                [170.2, 55.9], [158.8, 55.5], [172.7, 69.5], [167.6, 76.4], [162.6, 61.4],
                                [167.6, 65.9], [156.2, 58.6], [175.2, 66.8], [172.1, 56.6], [162.6, 58.6],
                                [160.0, 55.9], [165.1, 59.1], [182.9, 81.8], [166.4, 70.7], [165.1, 56.8],
                                [177.8, 60.0], [165.1, 58.2], [175.3, 72.7], [154.9, 54.1], [158.8, 49.1],
                                [172.7, 75.9], [168.9, 55.0], [161.3, 57.3], [167.6, 55.0], [165.1, 65.5],
                                [175.3, 65.5], [157.5, 48.6], [163.8, 58.6], [167.6, 63.6], [165.1, 55.2],
                                [165.1, 62.7], [168.9, 56.6], [162.6, 53.9], [164.5, 63.2], [176.5, 73.6],
                                [168.9, 62.0], [175.3, 63.6], [159.4, 53.2], [160.0, 53.4], [170.2, 55.0],
                                [162.6, 70.5], [167.6, 54.5], [162.6, 54.5], [160.7, 55.9], [160.0, 59.0],
                                [157.5, 63.6], [162.6, 54.5], [152.4, 47.3], [170.2, 67.7], [165.1, 80.9],
                                [172.7, 70.5], [165.1, 60.9], [170.2, 63.6], [170.2, 54.5], [170.2, 59.1],
                                [161.3, 70.5], [167.6, 52.7], [167.6, 62.7], [165.1, 86.3], [162.6, 66.4],
                                [152.4, 67.3], [168.9, 63.0], [170.2, 73.6], [175.2, 62.3], [175.2, 57.7],
                                [160.0, 55.4], [165.1, 104.1], [174.0, 55.5], [170.2, 77.3], [160.0, 80.5],
                                [167.6, 64.5], [167.6, 72.3], [167.6, 61.4], [154.9, 58.2], [162.6, 81.8],
                                [175.3, 63.6], [171.4, 53.4], [157.5, 54.5], [165.1, 53.6], [160.0, 60.0],
                                [174.0, 73.6], [162.6, 61.4], [174.0, 55.5], [162.6, 63.6], [161.3, 60.9],
                                [156.2, 60.0], [149.9, 46.8], [169.5, 57.3], [160.0, 64.1], [175.3, 63.6],
                                [169.5, 67.3], [160.0, 75.5], [172.7, 68.2], [162.6, 61.4], [157.5, 76.8],
                                [176.5, 71.8], [164.4, 55.5], [160.7, 48.6], [174.0, 66.4], [163.8, 67.3]
                            ]
                    }
                ]
            },
            cadlestick: {
                toolbox: {
                    show: true,
                    feature: {
                        mark: { show: true },
                        restore: { show: true },
                        myTool1: {
                            show: true,
                            title: 'Save as CSV',
                            icon: 'path fill="none" stroke="currentColor" d="M2.5 3.5v-2a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-10a1 1 0 0 1-1-1v-2m0-6l4 4m-4 0l4-4m-5-2h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1Z"',
                            onclick: function () {
                                alert('Your custom tool handler here..')
                            }
                        },
                        saveAsImage: { show: true }
                    }
                },
                xAxis: {
                    data: ['2017-10-24', '2017-10-25', '2017-10-26', '2017-10-27']
                },
                yAxis: {},
                series: [
                    {
                    type: 'candlestick',
                    data: [
                        [20, 34, 10, 38],
                        [40, 35, 30, 50],
                        [31, 38, 33, 44],
                        [38, 15, 5, 42]
                    ]
                    }
                ]
            },
            items: []
        }
    },
    created() {
        this.$router.options.routes.forEach(route => {
            // console.log(route);
            // this.items.push({
            //     name: route.name
            //     , path: route.path
            // })
        })
    },
    mounted() {
        let l1 = this.$loading.show({
            container: this.$refs.l1,
            height: 25,
            width: 25,
            opacity: 1,
            loader: 'spinner',
            color: 'black',
            zIndex: 25,
            backgroundColor: '#e8e8e8',
        });

        let l2 = this.$loading.show({
            container: this.$refs.l2,
            height: 25,
            width: 25,
            opacity: 1,
            loader: 'spinner',
            color: 'black',
            zIndex: 25,
            backgroundColor: '#e8e8e8',
        });

        let l3 = this.$loading.show({
            container: this.$refs.l3,
            height: 25,
            width: 25,
            opacity: 1,
            loader: 'spinner',
            color: 'black',
            zIndex: 25,
            backgroundColor: '#e8e8e8',
        });

        let l4 = this.$loading.show({
            container: this.$refs.l4,
            height: 25,
            width: 25,
            opacity: 1,
            loader: 'spinner',
            color: 'black',
            zIndex: 25,
            backgroundColor: '#e8e8e8',
        });

        let l5 = this.$loading.show({
            container: this.$refs.l5,
            height: 25,
            width: 25,
            opacity: 1,
            loader: 'spinner',
            color: 'black',
            zIndex: 25,
            backgroundColor: '#e8e8e8',
        });

        setTimeout(() => {
            l1.hide();
            l2.hide();
            l3.hide();
            l4.hide();
            l5.hide();
        }, 2000)
    }
};
</script>

<style scoped>
@import "vue-select/dist/vue-select.css";
.chart {
    width: 100%;
    min-height: 400px;
}
</style>

<style>
.v-tahun {
    width: 121px !important;
}
.v-kantor {
    width: 300px !important;
}
.v-tahun-s {
    width: 121px !important;
}
.v-kantor-s {
    width: 100% !important;
}

::placeholder {
    color: rgb(172, 170, 170) !important;
}
.v-kantor > .vs__dropdown-toggle {
    border-radius: 0 !important;
    border-left: 0 !important;
}
.v-tahun > .vs__dropdown-toggle, .v-tahun-s > .vs__dropdown-toggle {
    border-radius: 4px 0 0 4px !important;
}
.vs__search, .vs__search:focus {
    padding: 0.17em 0.5em !important;
}
.vs__selected {
    padding: 0 0.3em !important;
}
.vs__dropdown-menu li {
    padding-left: 0.55em !important;
}
/* .vs__no-options {
    text-align: left !important;
    padding-left: 8px !important;
}
.vs__clear {
    margin-bottom: 1px;
} */
</style>