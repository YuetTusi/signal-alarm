import { SystemMenu } from '@/schema/system-menu';
import { sysMenu } from './sys-menu';

interface SysMenuState {
    /**
     * 菜单数据
     */
    sysMenuData: SystemMenu[],
    /**
     * 单机版菜单显示
     */
    flatMenuVisible: boolean,
    /**
     * 预警声音设置框
     */
    voiceConrolModalOpen: boolean,
    /**
     * 修改密码框
     */
    modifyPasswordModalOpen: boolean,
    /**
     * 打开/关闭单机版菜单显示
     */
    setFlatMenuVisible: (payload: boolean) => void,
    /**
     * 打开/关闭预警声音设置框
     */
    setVoiceConrolModalOpen: (payload: boolean) => void,
    /**
     * 打开/关闭修改密码框
     */
    setModifyPasswordModalOpen: (payload: boolean) => void,
    /**
     * 更新菜单数据
     */
    setSysMenuData: (payload: SystemMenu[]) => void,
    /**
     * 查询菜单数据
     */
    querySysMenuData: () => void,
    /**
     * 修改用户密码
     * @param oldPassword 原密码
     * @param newPassword 新密码
     */
    modifyUserPassword: (oldPassword: string, newPassword: string) => void
}

export type { SysMenuState };
export { sysMenu };