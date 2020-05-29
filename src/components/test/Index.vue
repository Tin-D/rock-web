<template>
    <div>
        <el-form inline size="mini" class="toolbar">
            <el-form-item>
                <el-select v-model="currentBatteryId" placeholder="请选择电池">
                    <el-option v-for="i of options"
                               :value="i.value"
                               :key="i.value"
                               :label="i.label"
                    />
                </el-select>
            </el-form-item>
        </el-form>

        <el-row :gutter="10">
            <el-col :span="12">
                <div ref="totalVoltageToTime" style="width: 600px;height:400px;"></div>
            </el-col>
            <el-col :span="12">
                <div ref="averageVoltageToTime" style="width: 600px;height:400px;"></div>
            </el-col>
            <el-col :span="12">
                <div ref="singleVoltageToTime" style="width: 600px;height:400px;display: inline-block"></div>
            </el-col>
            <el-col :span="12">
                <div ref="exceptSingleVoltageToTime" style="width: 600px;height:400px;display: inline-block"></div>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    import echarts from 'echarts';
    import axios from 'axios';

    export default {
        created () {
            this.$nextTick(() => {
                this.loadAverageVoltageToTimeData();
            });
        },
        watch: {
            currentBatteryId: {
                handler (newValue) {
                    this.loadTotalVoltageToTimeData(newValue);
                    this.loadSingleVoltageToTimeData(newValue);
                    this.loadExceptSingleVoltageToTimeData(newValue);
                },
                immediate: true,
            },
        },
        data () {
            return {
                options: [
                    {
                        value: '1',
                        label: '第1节电池',
                    }, {
                        value: '2',
                        label: '第2节电池',
                    }, {
                        value: '3',
                        label: '第3节电池',
                    },
                ],
                currentBatteryId: '1',
                // 下面表示3个图表的echarts配置
                totalVoltageToTimeOption: {
                    title: {
                        text: '电压—时间表  ',
                    },
                    tooltip: {
                        trigger: 'axis',
                    },
                    legend: {
                        data: ['平均电压', '第1电池电压', '第2电池电压'],
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true,
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {},
                        },
                    },
                    xAxis: {
                        type: 'category',
                        name: '时间(s)',
                    },
                    yAxis: {
                        type: 'value',
                        name: '电压(V)',
                        scale: true,
                    },
                },
                averageVoltageToTimeOption: {
                    title: {
                        text: '总电压—时间表  ',
                    },
                    tooltip: {
                        trigger: 'axis',
                    },
                    xAxis: {
                        type: 'category',
                        name: '时间(s)',
                        data: [],
                    },
                    yAxis: {
                        type: 'value',
                        name: '电压(V)',
                        scale: true,
                    },
                },
                singleVoltageToTimeOption: {
                    title: {
                        text: '单电池电压—时间表  ',
                    },
                    xAxis: {
                        type: 'category',
                        name: '时间(s)',
                    },
                    yAxis: {
                        type: 'value',
                        name: '电压(V)',
                        scale: true,
                    },
                },
                exceptSingleVoltageToTimeOption: {
                    title: {
                        text: '其它电池平均电压—时间表  ',
                    },
                    xAxis: {
                        type: 'category',
                        name: '时间(s)',
                    },
                    yAxis: {
                        type: 'value',
                        name: '电压(V)',
                        scale: true,
                    },
                },
                // 下面表示3个图表的echarts对象
                $totalVoltageToTime: null,
                $averageVoltageToTime: null,
                $singleVoltageToTime: null,
                $exceptSingleVoltageToTime: null,
            };
        },
        methods: {
            async loadTotalVoltageToTimeData (batteryIndex) {
                const batteryIndexVoltage = await axios.get('battery/all_sum');
                const exBatteryIndexVoltage = await axios.get(`battery/except/${batteryIndex}`);
                const avg = await axios.get(`battery/${batteryIndex}`);
                const axis = await axios.get('battery/axis');
                this.totalVoltageToTimeOption.xAxis.data = axis.data;
                this.totalVoltageToTimeOption.series = [
                    {
                        name: '第' + batteryIndex + '电池电压',
                        stack: '电压',
                        data: batteryIndexVoltage.data,
                        type: 'line',
                        smooth: true,
                    }, {
                        name: '除第' + batteryIndex + '电池外平均电压',
                        stack: '电压',
                        data: exBatteryIndexVoltage.data,
                        type: 'line',
                        smooth: true,
                    }, {
                        name: '平均电压',
                        stack: '电压',
                        data: avg.data,
                        type: 'line',
                        smooth: true,
                    },
                ];
                this.totalVoltageToTimeOption.legend.data = ['平均电压', '除第' + batteryIndex + '电池外平均电压', '第' + batteryIndex + '电池电压'];
                this.$totalVoltageToTime.setOption(this.totalVoltageToTimeOption);
            },
            async loadAverageVoltageToTimeData () {
                const { data } = await axios.get('battery/all_sum');
                const axis = await axios.get('battery/axis');
                this.averageVoltageToTimeOption.xAxis.data = axis.data;
                this.averageVoltageToTimeOption.series = [{
                    data: _.map(data),
                    type: 'line',
                    smooth: true,
                }];
                this.$averageVoltageToTime.setOption(this.averageVoltageToTimeOption);
            },
            async loadSingleVoltageToTimeData (batteryIndex) {
                const { data } = await axios.get(`battery/${batteryIndex}`);
                const axis = await axios.get('battery/axis');
                this.singleVoltageToTimeOption.xAxis.data = axis.data;
                this.singleVoltageToTimeOption.series = [{
                    data: data,
                    type: 'line',
                    smooth: true,
                    itemStyle: {
                        normal: {
                            color: '#3a99d9',
                            label: {
                                show: true,
                            },
                        },
                    },
                }];
                this.singleVoltageToTimeOption.title.text = `第${batteryIndex}电池电压—时间表`;
                this.$singleVoltageToTime.setOption(this.singleVoltageToTimeOption);
            },
            async loadExceptSingleVoltageToTimeData (batteryIndex) {
                const { data } = await axios.get(`battery/except/${batteryIndex}`);
                const axis = await axios.get('battery/axis');
                this.exceptSingleVoltageToTimeOption.xAxis.data = axis.data;
                this.exceptSingleVoltageToTimeOption.series = [{
                    data: _.map(data),
                    type: 'line',
                    smooth: true,
                    itemStyle: {
                        normal: {
                            color: 'green',
                            label: {
                                show: true,
                            },
                        },
                    },
                }];
                this.exceptSingleVoltageToTimeOption.title.text = `除第${batteryIndex}电池外，其它电池平均电压—时间表`;
                this.$exceptSingleVoltageToTime.setOption(this.exceptSingleVoltageToTimeOption);
            },
        },
        mounted () {
            this.$nextTick(() => {
                this.$totalVoltageToTime = echarts.init(this.$refs.totalVoltageToTime);
                this.$averageVoltageToTime = echarts.init(this.$refs.averageVoltageToTime);
                this.$singleVoltageToTime = echarts.init(this.$refs.singleVoltageToTime);
                this.$exceptSingleVoltageToTime = echarts.init(this.$refs.exceptSingleVoltageToTime);
            });
        },
    };
</script>
