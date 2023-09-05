import { request } from '@/utility/http';
import { SystemMenu } from '@/schema/system-menu';
import { GetState, SetState } from "..";
import { log } from '@/utility/log';

const sysMenu = (setState: SetState, _: GetState) => ({
    /**
     * 菜单数据
     */
    sysMenuData: [],
    /**
     * 更新菜单数据
     */
    setSysMenuData(payload: SystemMenu[]) {
        setState({ sysMenuData: payload });
    },
    /**
     * 查询菜单数据
     */
    async querySysMenuData() {
        const url = '/system/sysMenu/findNodes';
        try {
            const res = await request.get<SystemMenu[]>(url);
            if (res === null) {
                log.error('查询菜单数据失败 @model/sys-menu/querySysMenuData');
                return;
            }

            if (res.code === 200) {
                setState({ sysMenuData: res.data })
            }
        } catch (error) {
            log.error(`查询菜单数据失败 @model/sys-menu/querySysMenuData:${error.message}`);
        }
    }
});

export { sysMenu };