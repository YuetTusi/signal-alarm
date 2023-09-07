
/**
 * 菜单数据
 */
export interface SystemMenu {
    /**
     * ID
     */
    id: number,
    /**
     * 父级ID
     */
    parentId: number,
    /**
     * 菜单层级(从0开始,目前只取0,1两级)
     */
    type: number,
    /**
     * 菜单名称
     */
    name: string,
    /**
     * 路径
     */
    path: string,
    /**
     * 排序值
     */
    sortValue: number,
    /**
     * 状态
     */
    status: number,
    /**
     * 子项
     */
    children: SystemMenu[]
}