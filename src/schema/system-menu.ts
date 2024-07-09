/**
 * 菜单数据
 */
export interface SystemMenu {
    /**
     *
     */
    alwaysShow: boolean,
    /**
     *
     */
    component: string,
    /**
     * 隐藏/显示
     */
    hidden: boolean,
    /**
     * 路径
     */
    path: string,
    /**
     *
     */
    meta: { title: string, icon: null | string },
    /**
     * 子项
     */
    children: null | SystemMenu[]
}