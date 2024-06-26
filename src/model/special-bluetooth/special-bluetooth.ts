import { message } from "antd";
import { request } from "@/utility/http";
import { helper } from "@/utility/helper";
import { QueryPage } from "@/schema/query-page";
import { SpecialBluetoothState } from ".";
import { GetState, SetState } from "..";

export const specialBluetooth = (setState: SetState, _: GetState): SpecialBluetoothState => ({
    /**
     * 分页数据
     */
    specialBluetoothData: [],
    /**
     * 当前页
     */
    specialBluetoothPageIndex: 1,
    /**
     * 分页尺寸
     */
    specialBluetoothPageSize: helper.PAGE_SIZE,
    /**
     * 总数
     */
    specialBluetoothTotal: 0,
    /**
     * 加载中
     */
    specialBluetoothLoading: false,
    /**
     * 更新加载中状态
     * @param payload 
     */
    setSpecialBluetoothLoading(payload: boolean) {
        setState({ specialBluetoothLoading: payload });
    },
    /**
     * 更新分页数据
     * @param pageIndex 页码
     * @param pageSize 页尺寸
     * @param total 总数
     */
    setSpecialBluetoothPage(pageIndex: number, pageSize: number, total: number) {
        setState({
            specialBluetoothPageIndex: pageIndex,
            specialBluetoothPageSize: pageSize,
            specialBluetoothTotal: total
        });
    },
    /**
     * 查询专项检查（蓝牙）分页数据
     * @param pageIndex 页码
     * @param pageSize 页尺寸
     * @param condition 条件
     */
    async querySpecialBluetoothData(pageIndex: number, pageSize: number, condition?: Record<string, any>) {


        message.destroy();
        setState({ specialBluetoothLoading: true });
        let params = '';
        let q: string[] = [];
        if (condition?.beginTime) {
            q.push(`createTimeBegin=${condition.beginTime}`);
        }
        if (condition?.endTime) {
            q.push(`createTimeEnd=${condition.endTime}`);
        }
        if (condition?.bluetoothType !== 'all') {
            q.push(`bluetoothType=${condition?.bluetoothType}`);
        }
        if (condition?.mac) {
            q.push(`mac=${condition?.mac}`);
        }
        params = `?` + q.join('&');
        try {
            const res = await request.get<QueryPage<any>>(`/spi/bluetooth/${pageIndex}/${pageSize}${params}`);
            if (res === null || res.code !== 200) {
                throw new Error('查询失败');
            }

            if (pageIndex > res.data.pages) {
                let ret = await request.get<QueryPage<any>>(`/spi/bluetooth/${res.data.pages}/${pageSize}${params}`);
                if (ret === null || ret.code !== 200) {
                    throw new Error('查询失败');
                } else {
                    setState({
                        specialBluetoothData: ret.data.records,
                        specialBluetoothPageIndex: pageIndex,
                        specialBluetoothPageSize: pageSize,
                        specialBluetoothTotal: ret.data.total
                    });
                }
            } else {
                setState({
                    specialBluetoothData: res.data.records,
                    specialBluetoothPageIndex: pageIndex,
                    specialBluetoothPageSize: pageSize,
                    specialBluetoothTotal: res.data.total
                });
            }
        } catch (error) {
            throw error;
        } finally {
            setState({ specialBluetoothLoading: false });
        }
    },
    /**
     * 导出
     * @param pageIndex 页码
     * @param pageSize 页尺寸
     * @param condition 条件
     */
    async exportSpecialBluetoothData(pageIndex: number, pageSize: number, condition?: Record<string, any>) {
        let params = '';
        if (!helper.isNullOrUndefined(condition)) {
            let q: string[] = [];
            if (condition?.beginTime) {
                q.push(`createTimeBegin=${encodeURIComponent(condition?.beginTime)}`);
            }
            if (condition?.endTime) {
                q.push(`createTimeEnd=${encodeURIComponent(condition?.endTime)}`);
            }
            if (condition?.bluetoothType !== 'all') {
                q.push(`bluetoothType=${condition?.bluetoothType}`);
            }
            if (condition?.mac) {
                q.push(`mac=${condition?.mac}`);
            }
            params = `?page=${pageIndex}&limit=${pageSize}&` + q.join('&');
        }

        try {
            const chunk = await request.attachment(`/spi/bluetooth/export${params}`);
            return chunk;
        } catch (error) {
            throw error;
        }
    }
});