import dayjs from 'dayjs';
import { request } from '@/utility/http';
import { Point } from '@/schema/point';
import { ComDevice } from '@/schema/com-device';
import { AlarmMessage } from '@/schema/phone-alarm-info';
import { GetState, SetState } from '..';
import { BiboState } from '../bibo';

const bibo = (setState: SetState, getState: GetState): BiboState => ({

    /**
     * 当前地图下设备
     */
    devicesOnMap: [],
    /**
     * 多点定位的坐标点列表
     */
    points: [],
    /**
     * 设备下的报警Top10
     */
    alarmsOfDevice: undefined,
    /**
     * 追加定位点到地图上
     * @param payload 点
     */
    appendPoint(payload: Point) {
        const prev = getState().points;
        setState({ points: prev.concat(payload) });
    },
    /**
     * 删除超过s秒的点
     * @param s 秒
     */
    removePointOverTime(s: number) {
        const prev = getState().points;
        setState({
            points: prev.filter(i => dayjs().diff(i.actionTime, 'second') < s)
        });
    },
    /**
     * 查询区域下的设备数据
     * @param id 区域id
     */
    async queryDevicesOnMap(id: string) {
        const url = `/sys/area/get-device-info/${id}`;
        try {
            const res = await request.get<ComDevice[]>(url);
            if (res !== null && res.code === 200) {
                setState({ devicesOnMap: res.data ?? [] });
            } else {
                setState({ devicesOnMap: [] });
            }
        } catch (error) {
            throw error;
        }
    },
    /**
    * 查询设备的报警Top10
    * @param id 设备Id
    */
    async queryDeviceTopAlarms(id: string) {

        const url = `/warn/msg/today-top/?deviceId=${id}`;
        let alarms = getState().alarmsOfDevice ?? {};
        try {
            const res = await request.get<AlarmMessage[]>(url);
            if (res !== null && res.code === 200) {
                alarms = {
                    [id]: res.data
                }
            }
        } catch (error) {
            throw error;
        }
        setState({ alarmsOfDevice: alarms });
    },
    /**
     * 清空地图上所有的设备
     */
    clearDevicesOnMap() {
        setState({ devicesOnMap: [] });
    },
    /**
     * 清空地图上所有多点定位
     */
    clearPoints() {
        setState({ points: [] });
    }
});

export { bibo };