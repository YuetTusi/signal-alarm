import dayjs from "dayjs";
import { ColumnsType } from "antd/es/table";
import { FreqCompare } from "@/schema/freq-compare";

/**
 * 频谱比较表头
 * @param handle 
 * @returns 
 */
export const getCompareColumns = (handle: (action: number) => void): ColumnsType<FreqCompare> => [
    {
        title: '频率',
        key: 'freq',
        dataIndex: 'freq'
    }, {
        title: '背景强度',
        key: 'baseSignal',
        dataIndex: 'baseSignal'
    }, {
        title: '当前强度',
        key: 'currentSignal',
        dataIndex: 'currentSignal'
    }, {
        title: '偏移值',
        key: 'offsetSignal',
        dataIndex: 'offsetSignal'
    }, {
        title: '当前偏移值',
        key: 'currentOffsetSignal',
        dataIndex: 'currentOffsetSignal'
    }, {
        title: '时间',
        key: 'captureTime',
        dataIndex: 'captureTime',
        align: 'center',
        width: 170,
        render: (value: number) => dayjs.unix(value).format('YYYY-MM-DD HH:mm:ss')
    }
];