import { BaseEntity } from './base-entity';
import { Protocol } from './protocol';

/**
 * 专项检查（摄像头，手机，其他等）数据
 */
class Wap extends BaseEntity {

    arfcn: string = ''
    arfcnName: string | null = null
    rssi: string = ''
    protocolName: string = ''
    protocolType: Protocol = Protocol.All
    param: any
    siteName: string = ''
};

export { Wap };