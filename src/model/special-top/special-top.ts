import { Protocol } from '@/schema/protocol';
import { GetState, SetState } from '..';
import { SpecialTopState } from './index';
import { SpecialBase } from '@/schema/special-base';
import { request } from '@/utility/http';

const specialTop = (setState: SetState, getState: GetState): SpecialTopState => ({
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
     * 窃听器Top10数据
     */
    specialWiretapTopData: [],
    /**
     * 加载状态
     */
    specialTopLoading: false,
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
        const data = [...wap, ...hotspot, ...terminal]
            .sort((a, b) => Number(b.rssi) - Number(a.rssi))
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
                    specialWapTopData: res.data.sort((a, b) => Number(b.rssi) - Number(a.rssi))
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
                    specialHotsportTopData: res.data.sort((a, b) => Number(b.rssi) - Number(a.rssi))
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
                    specialTerminalTopData: res.data.sort((a, b) => Number(b.rssi) - Number(a.rssi))
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
                    specialWiretapTopData: res.data.sort((a, b) => Number(b.rssi) - Number(a.rssi))
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