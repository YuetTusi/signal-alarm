import dayjs from 'dayjs';
import { message } from 'antd';
import { request } from '@/utility/http';
import { QueryPage } from '@/schema/query-page';
import { SystemRole } from '@/schema/system-role';
import { log } from '@/utility/log';
import { helper } from '@/utility/helper';
import { SystemUser } from '@/schema/system-user';
import { GetState, SetState } from "..";
import { SysRoleState } from '.';

const sysRole = (setState: SetState, _: GetState): SysRoleState => ({
    /**
     * 角色数据
     */
    sysRoleData: [],
    /**
     * 角色列表
     */
    sysRoleList: [],
    /**
     * 页码
     */
    sysRolePageIndex: 1,
    /**
     * 页尺寸
     */
    sysRolePageSize: helper.PAGE_SIZE,
    /**
     * 总数
     */
    sysRoleTotal: 0,
    /**
     * 读取中
     */
    sysRoleLoading: false,
    /**
     * 查询角色列表
     */
    async querySysRoleList() {
        const url = '/system/sysRole/findAll';
        try {
            const res = await request.get<SystemRole[]>(url);
            if (res !== null && res.code === 200) {
                setState({ sysRoleList: res.data ?? [] });
            }
        } catch (error) {
            setState({ sysRoleList: [] });
        }
    },
    /**
     * 查询角色数据
     */
    async querySysRoleData(pageIndex: number, pageSize: number, condition?: Record<string, any>) { }
});

export { sysRole };