import dayjs from 'dayjs';
import { message } from 'antd';
import { log } from '@/utility/log';
import { helper } from '@/utility/helper';
import { request } from '@/utility/http';
import { ComDevice } from '@/schema/com-device';
import { QueryPage } from '@/schema/query-page';
import { GetState, SetState } from '..';
import { DeviceState } from './index';

const device = (setState: SetState, _: GetState): DeviceState => ({
    /**
     * 设备数据
     */
    deviceData: [],
    /**
     * 设备下拉数据
     */
    deviceList: [],
    /**
     * 页码
     */
    devicePageIndex: 1,
    /**
     * 页尺寸
     */
    devicePageSize: helper.PAGE_SIZE,
    /**
     * 总数
     */
    deviceTotal: 0,
    /**
     * 读取状态
     */
    deviceLoading: false,
    /**
     * 设置设备分页数据
     */
    setDevicePage: (pageIndex: number, pageSize: number, total: number) => {
        setState({
            devicePageIndex: pageIndex,
            devicePageSize: pageSize,
            deviceTotal: total
        });
    },
    /**
     * 设置设备分页数据
     */
    setDeviceList: (payload: ComDevice[]) => {
        setState({ deviceList: payload });
    },
    /**
     * 查询设备数据
     * @param pageIndex 当前页
     * @param pageSize 页尺寸
     * @param condition 条件
     */
    queryDeviceData: async (pageIndex: number, pageSize: number, condition?: Record<string, any>) => {

        let params = '';
        if (!helper.isNullOrUndefined(condition)) {
            let q: string[] = [];
            if (condition?.deviceName) {
                q.push(`deviceName=${window.encodeURIComponent(condition?.deviceName)}`);
            }
            if (!helper.isNullOrUndefined(condition?.status) && condition?.status !== -1) {
                q.push(`status=${condition?.status}`);
            }
            params = '?' + q.join('&');
        }
        message.destroy();
        setState({ deviceLoading: true });
        try {
            const res = await request.get<QueryPage<any>>(`/devops/device/${pageIndex}/${pageSize}${params}`);
            if (res === null || res.code !== 200) {
                throw new Error('查询失败');
            }

            if (pageIndex > res.data.pages) {
                let ret = await request.get<QueryPage<any>>(`/devops/device/${res.data.pages}/${pageSize}${params}`);
                if (ret === null || ret.code !== 200) {
                    throw new Error('查询失败');
                } else {
                    setState({
                        deviceData: ret.data.records.sort((a, b) =>
                            dayjs(b.createTime).valueOf() - dayjs(a.createTime).valueOf()),
                        devicePageIndex: pageIndex,
                        devicePageSize: pageSize,
                        deviceTotal: ret.data.total
                    });
                }
            } else {
                setState({
                    deviceData: res.data.records.sort((a, b) =>
                        dayjs(b.createTime).valueOf() - dayjs(a.createTime).valueOf()),
                    devicePageIndex: pageIndex,
                    devicePageSize: pageSize,
                    deviceTotal: res.data.total
                });
            }
        } catch (error) {
            log.error(`查询设备失败@model/device/queryDeviceData:${error.message}`);
            message.warning(`查询失败（${error.message ?? ''}）`);
        } finally {
            setState({ deviceLoading: false });
        }
    },
    /**
     * 查询设备下拉数据
     */
    async queryDeviceList() {
        try {
            const res = await request.get<ComDevice[]>('/devops/device/list');
            if (res === null) {
                setState({ deviceList: [] });
                return;
            }
            if (res.code === 200) {
                setState({ deviceList: res.data.sort((a, b) => a.id - b.id) });
            } else {
                setState({ deviceList: [] });
            }
        } catch (error) {
            log.error(`查询设备下拉失败@model/device/queryDeviceList():${error.message}`);
        }
    },
    /**
     * 保存设备
     * @param payload 数据
     * @returns 
     */
    addDevice: async (payload: ComDevice) => {
        let next = { ...payload };
        try {
            next.createTime = next.updateTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
            next.config = '';
            next.isDeleted = 0;
            const res = await request.post('/devops/device/save', next);
            return res;
        } catch (error) {
            log.error(`保存设备失败@model/device/addDevice:${error.message}`);
            throw error;
        }
    },
    /**
     * 删除设备
     */
    deleteDevice: async (id: string) => {
        try {
            const res = await request.del(`/devops/device/remove/${id}`);
            return res;
        } catch (error) {
            log.error(`删除设备失败@model/device/deleteDevice:${error.message}`);
            throw error;
        }
    },
    /**
     * 编辑设备
     * @param payload 设备
     */
    updateDevice: async (payload: ComDevice) => {
        let next = { ...payload };
        try {
            next.updateTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
            const res = await request.put('/devops/device/update', next);
            return res;
        } catch (error) {
            log.error(`编辑设备失败@model/device/deleteDevice:${error.message}`);
            throw error;
        }
    },
    /**
     * 下发配置
     * @param data 设备数据
     * @param uploadLevel 配置内容
     */
    setDevice: async (data: ComDevice, uploadLevel: string) => {
        const param = {
            deviceId: data.deviceId,
            uploadLevel
        };
        try {
            const res = await request.post('/devops/device/set', param);
            return res;
        } catch (error) {
            log.error(`下发配置失败@model/device/setDevice:${error.message}`);
            throw error;
        }
    }
});

export { device };