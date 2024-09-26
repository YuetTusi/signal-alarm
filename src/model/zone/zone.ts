import dayjs from 'dayjs';
import { message } from 'antd';
import { request } from '@/utility/http';
import { helper } from '@/utility/helper';
import { QueryPage } from '@/schema/query-page';
import { Zone as ZoneEntity } from '@/schema/zone';
import { GetState, SetState } from "..";
import { ZoneState } from '.';

const zone = (setState: SetState, _: GetState): ZoneState => ({
    /**
     * 全部区域数据（列表）
     */
    zoneList: [],
    /**
     * 区域数据
     */
    zoneData: [],
    /**
     * 正在显示的区域（地图组件,Select选中的区域）
     */
    zoneDisplay: undefined,
    /**
     * 页码
     */
    zonePageIndex: 1,
    /**
     * 页尺寸
     */
    zonePageSize: helper.PAGE_SIZE,
    /**
     * 总数
     */
    zoneTotal: 0,
    /**
     * 读取中
     */
    zoneLoading: false,
    /**
     * 设置正在展示的区域
     */
    setZoneDisplay(payload: ZoneEntity) {
        setState({ zoneDisplay: payload });
    },
    /**
     * 添加区域
     */
    async addZone(payload: ZoneEntity) {
        const next: ZoneEntity = {
            ...payload,
            createTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            updateTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
        };
        try {
            const res = await request.post('/sys/area/save', next);
            return res;
        } catch (error) {
            throw error;
        }
    },
    /**
     * 更新区域
     */
    async updateZone(payload: ZoneEntity) {
        const next: ZoneEntity = {
            ...payload,
            updateTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
        };
        try {
            const res = await request.put('/sys/area/update', next);
            return res;
        } catch (error) {
            throw error;
        }
    },
    /**
     * 删除区域
     */
    async deleteZone(payload: ZoneEntity) {

        try {
            const res = await request.del(`/sys/area/remove/${payload.id}`);
            return res;
        } catch (error) {
            throw error;
        }
    },

    /**
    * 查询区域列表
    */
    async queryZoneList() {
        try {
            const res = await request.get<ZoneEntity[]>('/sys/area/get-name-all');
            if (res !== null && res.code === 200) {
                setState({ zoneList: res.data ?? [] });
                //legacy: mock
                // setState({
                //     zoneList: [...res.data, { id: 1001, areaName: '测试', areaBg: '', areaHeight: 40, areaWidth: 40 } as any]
                // });
            }
        } catch (error) {
            throw error;
        }
    },
    /**
     * 查询区域数据
     */
    async queryZoneData(pageIndex: number, pageSize: number, condition?: Record<string, any>) {
        message.destroy();
        setState({ zoneLoading: true });
        let params = '';
        if (!helper.isNullOrUndefined(condition)) {
            let q: string[] = [];
            if (condition?.areaName) {
                q.push(`areaName=${condition.areaName}`);
            }
            params = '?' + q.join('&');
        }
        try {
            const res = await request.get<QueryPage<ZoneEntity>>(`/sys/area/${pageIndex}/${pageSize}${params}`);
            if (res === null || res.code !== 200) {
                throw new Error('查询失败');
            }
            if (pageIndex > res.data.pages) {
                let ret = await request.get<QueryPage<ZoneEntity>>(`/sys/area/${res.data.pages}/${pageSize}${params}`);
                if (ret === null || ret.code !== 200) {
                    throw new Error('查询失败');
                } else {
                    setState({
                        zoneData: ret.data.records
                            .sort((a, b) => dayjs(b.createTime).valueOf() - dayjs(a.createTime).valueOf()),
                        zonePageIndex: pageIndex,
                        zonePageSize: pageSize,
                        zoneTotal: ret.data.total
                    });
                }
            } else {
                setState({
                    zoneData: res.data.records
                        .sort((a, b) => dayjs(b.createTime).valueOf() - dayjs(a.createTime).valueOf()),
                    zonePageIndex: pageIndex,
                    zonePageSize: pageSize,
                    zoneTotal: res.data.total
                });
            }
        } catch (error) {
            throw error;
        } finally {
            setState({ zoneLoading: false });
        }
    },
    /**
     * id查询区域
     */
    async queryZoneById(id: string) {
        try {
            const res = await request.get<ZoneEntity>(`/sys/area/get-area-info/${id}`);
            if (res !== null && res.code === 200) {
                setState({
                    zoneDisplay: res.data
                });
            }
        } catch (error) {
            throw error;
        }
    }
});

export { zone };