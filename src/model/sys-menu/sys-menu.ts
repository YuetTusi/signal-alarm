import { message } from 'antd';
import { request } from '@/utility/http';
import { log } from '@/utility/log';
import { StorageKeys } from '@/utility/storage-keys';
import { SystemMenu } from '@/schema/system-menu';
import { GetState, SetState } from "..";
import { SysMenuState } from '.';

const sysMenu = (setState: SetState, _: GetState): SysMenuState => ({
    /**
     * 菜单数据
     */
    sysMenuData: [],
    /**
     * 单机版菜单显示
     */
    routeMenuOpen: false,
    /**
     * 打开/关闭预警声音设置框
     */
    voiceControlModalOpen: false,
    /**
     * 修改密码框
     */
    modifyPasswordModalOpen: false,
    /**
     * 更新菜单数据
     */
    setSysMenuData(payload: SystemMenu[]) {
        setState({ sysMenuData: payload });
    },
    /**
     * 打开/关闭单机版菜单显示
     */
    setRouteMenuOpen(payload: boolean) {
        setState({ routeMenuOpen: payload });
    },
    /**
     * 打开/关闭预警声音设置框
     */
    setVoiceConrolModalOpen(payload: boolean) {
        setState({ voiceControlModalOpen: payload });
    },
    /**
     * 打开/关闭修改密码框
     */
    setModifyPasswordModalOpen(payload: boolean) {
        setState({ modifyPasswordModalOpen: payload });
    },
    /**
     * 查询菜单数据
     */
    async querySysMenuData() {
        const url = '/system/index/info';
        // const url = '/system/sysMenu/findNodes';
        try {
            const res = await request.get<{
                buttons: any[],
                name: string,
                roles: string,
                userId: number,
                routers: SystemMenu[]
            }>(url);
            if (res === null) {
                log.error('查询菜单数据失败 @model/sys-menu/querySysMenuData');
                return;
            }

            if (res.code === 200) {
                console.clear();
                console.log(res.data);
                setState({
                    sysMenuData: res.data.routers
                });
            }
        } catch (error) {
            log.error(`查询菜单数据失败 @model/sys-menu/querySysMenuData:${error.message}`);
        }
    },
    /**
     * 修改用户密码
     * @param oldPassword 原密码
     * @param newPassword 新密码
     */
    async modifyUserPassword(oldPassword: string, newPassword: string) {
        let id = sessionStorage.getItem(StorageKeys.UserId);
        if (id === null) {
            return false;
        }
        try {
            const res = await request.post('/system/sysUser/update-password', {
                id,
                oldPassword,
                newPassword
            });
            message.destroy();
            if (res !== null && res.code === 200) {
                message.info(res.data);
            } else {
                message.warning('修改失败');
            }
        } catch (error) {
            console.warn(error);
            message.warning('修改失败');
        }
    }
});

export { sysMenu };