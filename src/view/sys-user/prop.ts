
export enum ColumnAction {

    Detail,
    Edit,
    ModifyPassword,
    ModifyStatus
}

export interface SearchFormValue {
    /**
     * 关键字
     */
    keyword: string,
    /**
     * 角色id
     */
    roleId: number
}