import { SystemMenu } from '@/schema/system-menu';
import { sysMenu } from './sys-menu';

interface SysMenuState {
    /**
     * 菜单数据
     */
    sysMenuData: SystemMenu[],
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