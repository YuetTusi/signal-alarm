import { SystemUser } from '@/schema/system-user';
import { sysUser } from './sys-user';
import { RequestResult } from '@/utility/http';

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
    querySysUserData: (pageIndex: number, pageSize: number, condition?: Record<string, any>) => void,
    /**
     * 添加用户
     */
    addSysUser: (payload: SystemUser) => Promise<RequestResult<any> | null>,
    /**
     * 编辑用户
     */
    updateSysUser: (payload: SystemUser) => Promise<RequestResult<any> | null>,
    /**
     * 修改密码
     */
    modifySysUserPassword: (id: number, newPassword: string, oldPassword: string) => Promise<RequestResult<any> | null>,
    /**
    * 修改状态
    */
    modifySysUserStatus: (id: number, status: number) => Promise<RequestResult<any> | null>,
    /**
     * 删除用户
     */
    delSysUser: (id: number) => Promise<RequestResult<any> | null>
}

export type { SysUserState };
export { sysUser };