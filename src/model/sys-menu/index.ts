import { SystemMenu } from '@/schema/system-menu';
import { sysMenu } from './sys-menu';

interface SysMenuState {
    /**
     * 菜单数据
     */
    sysMenuData: SystemMenu[],
    /**
     * 预警声音设置框
     */
    voiceConrolModalOpen: boolean,
    /**
     * 打开/关闭预警声音设置框
     */
    setVoiceConrolModalOpen: (payload: boolean) => void,
    /**
     * 更新菜单数据
     */
    setSysMenuData: (payload: boolean) => void,
    /**
     * 查询菜单数据
     */
    querySysMenuData: () => void
}

export type { SysMenuState };
export { sysMenu };