
abstract class BaseEntity {

    /**
     * ID
     */
    public id: number = -1
    /**
     * 删除标记
     */
    public isDeleted: number = 0
    /**
     * 创建时间
     */
    public createTime: string = ''
    /**
     * 更新时间
     */
    public updateTime: string = ''
}

export { BaseEntity };