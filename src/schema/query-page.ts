interface QueryPage<T = any> {
    /**
     * 记录
     */
    records: T[],
    /**
     * 总数
     */
    total: number,
    /**
     * 页尺寸
     */
    size: number,
    /**
     * 当前页
     */
    current: number,
    /**
     * 总页数
     */
    pages: number
}

export type { QueryPage };