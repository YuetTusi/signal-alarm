import { FormInstance } from 'antd/lib/form';
import { Zone } from '@/schema/zone';

export interface EditModalProp {
    /**
     * 打开
     */
    open: boolean,
    /**
     * 数据
     */
    data?: Zone,
    /**
     * 确定
     */
    onOk: (values: Zone, isEdit: boolean) => void,
    /**
     * 取消
     */
    onCancel: () => void
};

export interface EditFormProp {

    formRef: FormInstance<Zone>,
    /**
     * 数据
     */
    data?: Zone
}