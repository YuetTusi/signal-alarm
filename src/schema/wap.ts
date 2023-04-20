import { SpecialBase } from './special-base';

/**
 * 专项检查（摄像头，手机，其他等）数据
 */
class Wap extends SpecialBase {

    arfcn: string = ''
    arfcnName: string | null = null
    protocolName: string = ''
    param: any
};

export { Wap };