import { SystemUser } from '@/schema/system-user';
import { sysUser } from './sys-user';

interface SysUserState {
    /**
     * 用户数据
     */
    sysUserData: SystemUser[],
    /**
     * 页码
     */
    sysUserPageIndex: number,
    /**
     * 页尺寸
     */
    sysUserPageSize: number,
    /**
     * 总数
     */
    sysUserTotal: number,
    /**
     * 读取中
     */
    sysUserLoading: boolean,
    /**
     * 查询用户数据
     */
    querySysUserData: (pageIndex: number, pageSize: number, condition?: Record<string, any>) => void
}

export type { SysUserState };
export { sysUser };