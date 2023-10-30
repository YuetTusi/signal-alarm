import dayjs from 'dayjs';
import { Protocol } from '@/schema/protocol';
import { SpecialBase } from '@/schema/special-base';
import { request } from '@/utility/http';
import { SpecialTopState } from './index';
import { GetState, SetState } from '..';

const specialTop = (setState: SetState, getState: GetState): SpecialTopState => ({
    /**
     * 专项检查详情框打开/关闭
     */
    specialDetailModalOpen: false,
    /**
     * 热像头，手机信号等Top10数据
     */
    specialWapTopData: [],
    /**
     * 热点Top10数据
     */
    specialHotsportTopData: [],
    /**
     * 终端Top10数据
     */
    specialTerminalTopData: [],
    /**
     * 蓝牙Top10数据
     */
    specialBluetoothTopData: [],
    /**
     * 窃听器Top10数据
     */
    specialWiretapTopData: [],
    /**
     * 加载状态
     */
    specialTopLoading: false,
    /**
     * 专项检查详情框打开/关闭
     * @param open 打开/关闭
     */
    setSpecialDetailModalOpen(open: boolean) {
        setState({ specialDetailModalOpen: open });
    },
    /**
     * 清空所有Top10数据
     */
    clearAllTopData() {
        setState({
            specialWapTopData: [],
            specialHotsportTopData: [],
            specialTerminalTopData: [],
            specialWiretapTopData: []
        });
    },
    /**
     * 返回全部Top10数据
     */
    getAllTopData() {
        const wap = getState().specialWapTopData;
        const hotspot = getState().specialHotsportTopData;
        const terminal = getState().specialTerminalTopData;
        const bluetooth = getState().specialBluetoothTopData;
        const data = [...wap, ...hotspot, ...bluetooth, ...terminal]
            .sort((a, b) =>
                dayjs(a.captureTime, 'YYYY-MM-DD HH:mm:ss')
                    .isAfter(dayjs(b.captureTime, 'YYYY-MM-DD HH:mm:ss')) ? -1 : 1)
            .slice(0, 10);
        return data;
    },
    /**
     * 查询热像头，手机信号等Top10数据
     */
    async querySpecialWapTopData(type: Protocol[]) {

        setState({ specialTopLoading: true });
        const params = type.join(',');
        try {
            const res = await request.get<SpecialBase[]>(`/spi/wap/new?protocolTypes=${params}`)

            if (res !== null && res.code === 200) {
                setState({
                    specialWapTopData: res.data.sort((a, b) =>
                        dayjs(a.captureTime, 'YYYY-MM-DD HH:mm:ss')
                            .isAfter(dayjs(b.captureTime, 'YYYY-MM-DD HH:mm:ss')) ? -1 : 1)
                });
            }
        } catch (error) {
            throw error;
        } finally {
            setState({ specialTopLoading: false });
        }
    },
    /**
     * 查询热点Top10数据
     */
    async querySpecialHotspotTopData(type: Protocol[]) {
        setState({ specialTopLoading: true });
        const params = type.join(',');
        try {
            const res = await request.get<SpecialBase[]>(`/spi/hotspot/new?protocolTypes=${params}`)

            if (res !== null && res.code === 200) {
                setState({
                    specialBluetoothTopData: res.data.sort((a, b) =>
                        dayjs(a.captureTime, 'YYYY-MM-DD HH:mm:ss').isAfter(dayjs(b.captureTime, 'YYYY-MM-DD HH:mm:ss')) ? -1 : 1)
                });
            }
        } catch (error) {
            throw error;
        } finally {
            setState({ specialTopLoading: false });
        }
    },
    /**
     * 查询终端Top10数据
     */
    async querySpecialTerminalTopData(type: Protocol[]) {
        setState({ specialTopLoading: true });
        const params = type.join(',');
        try {
            const res = await request.get<SpecialBase[]>(`/spi/terminal/new?protocolTypes=${params}`)
            if (res !== null && res.code === 200) {
                setState({
                    specialTerminalTopData: res.data
                        .map(item => ({ ...item, isTerminal: true }))
                        .sort((a, b) =>
                            dayjs(a.captureTime, 'YYYY-MM-DD HH:mm:ss')
                                .isAfter(dayjs(b.captureTime, 'YYYY-MM-DD HH:mm:ss')) ? -1 : 1)
                });
            }
        } catch (error) {
            throw error;
        } finally {
            setState({ specialTopLoading: false });
        }
    },
    /**
     * 查询蓝牙Top10数据
     */
    async querySpecialBluetoothTopData() {

        setState({ specialTopLoading: true });
        try {
            const res = await request.get<SpecialBase[]>('/spi/bluetooth/new');
            if (res !== null && res.code === 200) {
                setState({
                    specialBluetoothTopData: res.data
                        .map(item => ({ ...item, isBluetooth: true }))
                        .sort((a, b) =>
                            dayjs(a.captureTime, 'YYYY-MM-DD HH:mm:ss')
                                .isAfter(dayjs(b.captureTime, 'YYYY-MM-DD HH:mm:ss')) ? -1 : 1)
                });
            }
        } catch (error) {
            throw error;
        } finally {
            setState({ specialTopLoading: false });
        }
    },
    /**
     * 查询窃听器Top10数据
     */
    async querySpecialWiretapTopData(type: Protocol[]) {
        setState({ specialTopLoading: true });
        const params = type.join(',');
        try {
            const res = await request.get<SpecialBase[]>(`/spi/wap/new?protocolTypes=${params}`)

            if (res !== null && res.code === 200) {
                setState({
                    specialWiretapTopData: res.data.sort((a, b) =>
                        dayjs(a.captureTime, 'YYYY-MM-DD HH:mm:ss').isAfter(dayjs(b.captureTime, 'YYYY-MM-DD HH:mm:ss')) ? -1 : 1)
                });
            }
        } catch (error) {
            throw error;
        } finally {
            setState({ specialTopLoading: false });
        }
    }
});

export { specialTop };