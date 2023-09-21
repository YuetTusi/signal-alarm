import { ComDevice } from "@/schema/com-device";
import { RealSpectrumState } from ".";
import { GetState, SetState } from "..";
import { helper } from "@/utility/helper";
import { request } from "@/utility/http";
import { log } from "@/utility/log";

const realSpectrum = (setState: SetState, _: GetState): RealSpectrumState => ({
    /**
     * 设备下拉数据
     */
    realSpectrumDeviceList: [],
    /**
     * 实时数据
     */
    realSpectrumData: [],
    /**
     * 时间
     */
    realSpectrumCaptureTime: 0,
    /**
     * 设备id
     */
    realSpectrumDeviceId: '',
    /**
     * 读取状态
     */
    realSpectrumLoading: false,
    /**
     * 设置实时数据
     */
    clearRealSpectrumData() {
        setState({
            realSpectrumData: [],
            realSpectrumCaptureTime: 0,
            realSpectrumDeviceId: ''
        });
    },
    /**
     * 查询设备下拉数据
     */
    async queryRealSpectrumDeviceList() {
        try {
            const res = await request.get<ComDevice[]>('/devops/device/list');
            if (res === null) {
                setState({ realSpectrumDeviceList: [] });
                return;
            }
            if (res.code === 200) {
                setState({ realSpectrumDeviceList: res.data });
            } else {
                setState({ realSpectrumDeviceList: [] });
            }
        } catch (error) {
            log.error(`查询设备下拉失败@model/real-spectrum/queryRealSpectrumDeviceList():${error.message}`);
        }
    },
    /**
     * 查询当前设备实时频谱数据
     * @param deviceId  设备id
     */
    async queryRealSpectrumData(deviceId: string) {
        setState({ realSpectrumLoading: true });
        const url = `/freq/real-time?deviceId=${deviceId}`;
        try {
            const res = await request.get<{
                captureTime: string,
                dbArray: string,
                deviceId: string
            }>(url);

            if (res !== null && res.code === 200) {

                if (helper.isNullOrUndefined(res.data)) {
                    setState({
                        realSpectrumData: new Array(7499).map(() => '-') as any[],
                        realSpectrumCaptureTime: 0,
                        realSpectrumDeviceId: deviceId
                    });
                }
                setState({
                    realSpectrumData: typeof res.data.dbArray === 'string' ? JSON.parse(res.data.dbArray) : res.data.dbArray,
                    realSpectrumCaptureTime: Number.parseInt(res.data.captureTime),
                    realSpectrumDeviceId: deviceId
                });
            } else {
                setState({ realSpectrumData: [] });
            }
        } catch (error) {
            log.error(`查询实时频谱数据失败@model/real-spectrum/queryRealSpectrumData('${deviceId}'):${error.message}`);
        } finally {
            setState({ realSpectrumLoading: false });
        }
    }
});

export { realSpectrum };