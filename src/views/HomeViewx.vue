<template>
    <div id="main" class="container is-fluid mt-5">
        <div class="columns is-multiline is-tablet">
            <div class="column">
                <vue-echarts class="border" :option="bar" style="width: 100%; min-height: 400px;" ref="bar" />
            </div>
            <div class="column">
                <vue-echarts class="border" :option="line" style="width: 100%; min-height: 400px;" ref="line" />
            </div>
        </div>
    </div>
</template>

<script>
import { VueEcharts } from 'vue3-echarts';

export default {
    name: 'HomeView',
    components: {
        VueEcharts
    },
    data() {
        return {
            bar: {
                resizing: true,
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
            }
        }
    },
    mounted() {
        console.log(this.$refs.bar);
    },
    methods: {
    }
}
</script>

<style>
canvas {
    width: 100%;
    height: 100%;
}
</style>
