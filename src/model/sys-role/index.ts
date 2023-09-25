import { SystemRole } from '@/schema/system-role';
import { sysRole } from './sys-role';

interface SysRoleState {
    /**
     * 角色数据
     */
    sysRoleData: SystemRole[],
    /**
     * 角色列表
     */
    sysRoleList: SystemRole[],
    /**
     * 页码
     */
    sysRolePageIndex: number,
    /**
     * 页尺寸
     */
    sysRolePageSize: number,
    /**
     * 总数
     */
    sysRoleTotal: number,
    /**
     * 读取中
     */
    sysRoleLoading: boolean,
    /**
     * 查询角色列表
     */
    querySysRoleList: () => void,
    /**
     * 查询角色数据
     */
    querySysRoleData: (pageIndex: number, pageSize: number, condition?: Record<string, any>) => void
}

export type { SysRoleState };
export { sysRole };