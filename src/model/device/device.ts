import dayjs from 'dayjs';
import { message } from 'antd';
import { helper } from '@/utility/helper';
import { request } from '@/utility/http';
import { ComDevice } from '@/schema/com-device';
import { GetState, SetState } from '..';
import { DeviceState } from './index';

const device = (setState: SetState, _: GetState): DeviceState => ({
    /**
     * 设备数据
     */
    deviceData: [],
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
            const res = await request.get(`/devops/device/${pageIndex}/${pageSize}${params}`);
            if (res === null) {
                message.warning('查询失败');
            } else if (res.code === 200) {
                setState({
                    deviceData: res.data.records,
                    devicePageIndex: pageIndex,
                    devicePageSize: pageSize,
                    deviceTotal: res.data.total
                });
            } else {
                message.warning(`查询失败（${res.message ?? ''}）`);
            }
        } catch (error) {
            message.warning(`查询失败（${error.message ?? ''}）`);
        } finally {
            setState({ deviceLoading: false });
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
            throw error;
        }
    }
});

export { device };