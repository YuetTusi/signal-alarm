import { Point } from '@/schema/point';
import { ComDevice } from '@/schema/com-device';
import { AlarmMessage } from '@/schema/phone-alarm-info';
import { bibo } from './bibo';

interface BiboState {
    /**
     * 当前地图下设备
     */
    devicesOnMap: ComDevice[],
    /**
     * 多点定位的坐标点列表
     */
    points: Point[],
    /**
     * 设备下的报警
     */
    alarmsOfDevice?: { [deviceId: string]: AlarmMessage[] },
    /**
     * 追加定位点到地图上
     * @param payload 点
     */
    appendPoint: (payload: Point) => void,
    /**
     * 删除超过5分钟的点
     */
    removePointOver5minutes: () => void,
    /**
     * 查询区域下的设备数据
     * @param id 区域id
     */
    queryDevicesOnMap: (id: string) => Promise<void>,
    /**
     * 查询设备的报警Top10
     * @param id 设备Id
     */
    queryDeviceTopAlarms: (id: string) => Promise<void>
}

export type { BiboState };
export { bibo };