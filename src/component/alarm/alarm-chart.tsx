import throttle from 'lodash/throttle';
import * as echarts from 'echarts/core';
import { FC, useEffect, useRef } from 'react';
import { useModel } from '@/model';
import { useResize, useUnmount } from '@/hook';
import { helper } from '@/utility/helper';
import { AlarmChartBox } from './styled/style';
import { AlarmType } from '@/schema/conf';

const { alarmType } = helper.readConf();

var $chart: echarts.ECharts;
var option = {
    grid: {
        top: '10%',
        left: '5%',
        right: '5%',
        bottom: '12%'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        },
        formatter: ([first]: any[]) => `<div class="bar-tooltip">
                <div class="tt-caption">
                    ${first.marker}
                    ${first.name}
                </div>
                <div class="tt-row">
                    <span>
                        <label>强度：</label>
                    </span>
                    <b style="text-align:right;">${helper.isNullOrUndefined(first.data?.value) ? '-' : '-' + first.data.value}</b>
                </div>
                <div class="tt-row">
                    <label>设备ID：</label>
                    <b>${first.data.deviceId ?? '-'}</b>
                </div>
                <div class="tt-row">
                    <label>告警时间：</label>
                    <b>${first.data.captureTime ?? '-'}</b>
                </div>
            </div>`

    },
    xAxis: {
        type: 'category',
        interval: 10,
        axisLabel: {
            interval: 0,
            // rotate: 45,
            fontSize: 14,
            formatter(value: string) {
                if (value === '移动/广电(4G-B41/5G-N41)') {
                    return 'B41/N41';
                }
                else if (value.includes('-')) {
                    const from = value.lastIndexOf('-');
                    const to = value.lastIndexOf(')');
                    return value.substring(from + 1, to);
                } else {
                    return value;
                }
            }
        },
        data: []
    },
    yAxis: {
        type: 'value',
        min: 0,
        max: 100,
        interval: 10,
        axisLabel: {
            fontSize: 16
        }
    },
    series: [{
        name: '强度',
        type: 'bar',
        data: [],
        itemStyle: {
            color(params: any) {
                if (params.value < 50) {
                    return '#4cd137';
                } else if (params.value >= 50 && params.value < 70) {
                    return '#fbc531';
                } else {
                    return '#eb2f06';
                }
            }
        }
    }],
    dataZoom: [
        {
            show: false,
            type: "slider",
            showDetail: false
        }
    ]
};

/**
 * 窗口resize重置宽高
 * @param chart 图表实例
 * @param containerId 容器id
 */
const chartResize = (chart: echarts.ECharts | null, containerId: string) => {
    if (chart !== null) {
        const outer = document.querySelector(`#${containerId}`);
        chart.resize({
            width: outer?.clientWidth ?? document.body.clientWidth - 2,
            height: outer?.clientHeight ?? document.body.clientHeight - 149
        });
    }
};

/**
 * 预警柱状图
 * 数据由SSE推送，以band分类显示
 * 分类项中文在setting/band.json配置
 */
const AlarmChart: FC<{}> = () => {

    const boxRef = useRef<HTMLDivElement>(null);

    const {
        zoneDisplay,
        alarmBarData,
        cleanAlarmBarData
    } = useModel(state => ({
        zoneDisplay: state.zoneDisplay,
        alarmBarData: state.alarmBarData,
        cleanAlarmBarData: state.cleanAlarmBarData
    }));

    useResize(throttle((_: Event) => {
        chartResize($chart, 'alarmChart');
    }, 500, { trailing: true, leading: false }));

    useEffect(() => {

        if (boxRef.current) {
            $chart = echarts.init(boxRef.current, 'dark');
            $chart.setOption(option);
        }
    }, []);

    useUnmount(() => {
        cleanAlarmBarData();
    });

    const getData = () => {
        const bands = helper.readBand();
        if (alarmType === AlarmType.Single) {
            return bands.map(item => {
                if (alarmBarData.has(item.code)) {
                    const data = alarmBarData.get(item.code);
                    return {
                        code: item.code,
                        value: data?.rssi === undefined ? '' : data.rssi! + 100,
                        captureTime: data?.captureTime ?? '',
                        deviceId: data?.deviceId
                    };
                } else {
                    return {
                        code: item.code,
                        value: null,
                        captureTime: '',
                        deviceId: undefined
                    };
                }
            });
        } else {
            return bands.map(item => {
                if (alarmBarData.has(item.code)) {
                    const data = alarmBarData.get(item.code);
                    if (data?.areaId === zoneDisplay?.id) {
                        return {
                            code: item.code,
                            value: data?.rssi === undefined ? '' : data.rssi! + 100,
                            captureTime: data?.captureTime ?? '',
                            deviceId: data?.deviceId
                        };
                    } else {
                        return {
                            code: item.code,
                            value: null,
                            captureTime: '',
                            deviceId: undefined
                        };
                    }
                } else {
                    return {
                        code: item.code,
                        value: null,
                        captureTime: '',
                        deviceId: undefined
                    };
                }
            });
        }
    };

    useEffect(() => {
        if ($chart) {
            const bands = helper.readBand();
            let data = [];
            data = getData();
            $chart.setOption({
                xAxis: { data: bands.map(i => i.name) },
                series: [{ data }]
            });
            //数据更新后，重新设置宽度
            $chart.resize({
                width: document.querySelector('#alarmChartCaption')?.clientWidth,
            });
        }

    }, [zoneDisplay, alarmBarData]);

    return <AlarmChartBox
        ref={boxRef}
        id="alarmChart" />;
};

export { AlarmChart };