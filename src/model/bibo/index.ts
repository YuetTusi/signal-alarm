import { ComDevice } from '@/schema/com-device';
import { AlarmMessage } from '@/schema/phone-alarm-info';
import { bibo } from './bibo';

interface BiboState {
    /**
     * 当前地图下设备
     */
    devicesOnMap: ComDevice[],
    /**
     * 设备下的报警
     */
    alarmsOfDevice?: { [deviceId: string]: AlarmMessage[] },
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