import { message } from 'antd';
import { helper } from '@/utility/helper';
import { request } from '@/utility/http';
import { Wap } from '@/schema/wap';
import { Protocol } from '@/schema/protocol';
import { SpecialWapState } from '.';
import { GetState, SetState } from '..';

const specialWap = (setState: SetState, _: GetState): SpecialWapState => ({

    specialWapData: [],
    specialWapTotal: 0,
    specialWapPageIndex: 1,
    specialWapPageSize: helper.PAGE_SIZE,
    specialWapLoading: false,

    setSpecialWapLoading(payload: boolean) {
        setState({ specialWapLoading: payload });
    },
    setSpecialWapPage(pageIndex, pageSize, total) {
        setState({
            specialWapPageIndex: pageIndex,
            specialWapPageSize: pageSize,
            specialWapTotal: total
        });
    },
    async querySpecialWapData(pageIndex: number, pageSize = helper.PAGE_SIZE, condition?: Record<string, any>) {

        message.destroy();
        setState({ specialWapLoading: true });
        let params = '';
        if (helper.isNullOrUndefined(condition)) {
            params = `?protocolTypes=${helper.protocolToString([
                Protocol.ChinaMobileGSM,
                Protocol.ChinaUnicomGSM,
                Protocol.ChinaTelecomCDMA,
                Protocol.ChinaUnicomWCDMA,
                Protocol.ChinaMobileTDDLTE,
                Protocol.ChinaUnicomFDDLTE,
                Protocol.ChinaTelecomFDDLTE,
                Protocol.ChinaMobile5G,
                Protocol.ChinaUnicom5G,
                Protocol.ChinaBroadnet5G,
                Protocol.Camera,
                Protocol.Bluetooth50,
                Protocol.Detectaphone,
                Protocol.GPSLocator,
                Protocol.Others
            ])}`;
        } else {
            let q: string[] = [];
            if (condition?.beginTime) {
                q.push(`createTimeBegin=${condition.beginTime}`);
            }
            if (condition?.endTime) {
                q.push(`createTimeEnd=${condition.endTime}`);
            }
            if (condition?.protocolTypes) {
                q.push(`protocolTypes=${encodeURIComponent(condition.protocolTypes)}`);
            }
            params = `?` + q.join('&');
        }
        try {
            const res = await request.get<{
                records: Wap[],
                total: number
            }>(`/spi/wap/${pageIndex}/${pageSize}${params}`);
            if (res === null) {
                message.warning('查询失败')
            } else if (res.code === 200) {
                setState({
                    specialWapData: res.data.records.sort((a, b) => Number(b.rssi) - Number(a.rssi)),
                    specialWapPageIndex: pageIndex,
                    specialWapPageSize: pageSize,
                    specialWapTotal: res.data.total
                });
            } else {
                message.warning(`查询失败（${res.message ?? ''}）`)
            }
        } catch (error) {
            throw error;
        } finally {
            setState({ specialWapLoading: false });
        }
    },
    async exportSpecialWapData(pageIndex: number, pageSize = helper.PAGE_SIZE, condition?: Record<string, any>) {
        let params = `?page=${pageIndex}&limit=${pageSize}`;
        if (!helper.isNullOrUndefined(condition)) {
            let q: string[] = [];
            if (condition?.beginTime) {
                q.push(`createTimeBegin=${condition?.beginTime}`);
            }
            if (condition?.endTime) {
                q.push(`createTimeEnd=${condition?.endTime}`);
            }
            if (condition?.protocolTypes) {
                q.push(`protocolTypes=${encodeURIComponent(condition?.protocolTypes)}`);
            } else {
                q.push(`protocolTypes=${encodeURIComponent(helper.protocolToString([
                    Protocol.ChinaMobileGSM,
                    Protocol.ChinaUnicomGSM,
                    Protocol.ChinaTelecomCDMA,
                    Protocol.ChinaUnicomWCDMA,
                    Protocol.ChinaMobileTDDLTE,
                    Protocol.ChinaUnicomFDDLTE,
                    Protocol.ChinaTelecomFDDLTE,
                    Protocol.ChinaMobile5G,
                    Protocol.ChinaUnicom5G,
                    Protocol.ChinaBroadnet5G,
                    Protocol.Camera,
                    Protocol.Bluetooth50,
                    Protocol.Detectaphone,
                    Protocol.GPSLocator,
                    Protocol.Others
                ]))}`);
            }
            params = params + '&' + q.join('&');
        }
        try {
            const chunk = await request.attachment(`/spi/wap/export${params}`);
            return chunk;
        } catch (error) {
            throw error;
        }
    }
});

export { specialWap };