export interface BackgroundPreviewModalProp {
    /**
     * 打开
     */
    open: boolean,
    /**
     * 背景图像(base64)
     */
    bg?: string,

    onCancel: () => void
};