import { BaseEntity } from './base-entity';
import { Protocal } from './protocol';

/**
 * 专项检查（摄像头，手机，其他等）数据
 */
class Wap extends BaseEntity {

    arfcn: string = ''
    arfcnName: string | null = null
    rssi: string = ''
    protocolName: string = ''
    protocolType: Protocal = Protocal.All
    param: any
};

export { Wap };