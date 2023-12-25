import debounce from 'lodash/debounce';
import electron, { OpenDialogReturnValue } from 'electron';
import { FC, MouseEvent, useState, useEffect } from 'react';
import SelectOutlined from '@ant-design/icons/SelectOutlined'
import { Col, Row, Form, Input, InputNumber, Button, Divider, Image, Empty } from 'antd';
import { helper } from '@/utility/helper';
import { EditFormProp } from './prop';
import { FormBox } from '../styled/box';
import { ImgBox, UploadBox } from './styled/box';

const { Item } = Form;
const { ipcRenderer } = electron;

/**
 * 区域表单
 */
const EditForm: FC<EditFormProp> = ({ formRef, data }) => {

    const [imgBase64, setImgBase64] = useState<string>('');

    useEffect(() => {
        if (data) {
            setImgBase64('data:image/png;base64,' + data.areaBg);
        } else {
            setImgBase64('');
        }
    }, [data]);

    const onSelectImage = debounce(async (event: MouseEvent<HTMLElement>) => {
        event.preventDefault();
        const { setFieldValue } = formRef;
        try {
            const { filePaths }: OpenDialogReturnValue = await ipcRenderer
                .invoke('open-dialog', {
                    title: '选择图片文件',
                    properties: ['openFile'],
                    filters: [{ name: '图片文件', extensions: ['jpg', 'jpeg', 'png'] }]
                });

            if (filePaths.length > 0) {
                const base64 = await helper.fileToBase64(filePaths[0]);
                setImgBase64('data:image/png;base64,' + base64);
                setFieldValue('areaBg', base64);
            }
        } catch (error) {
            console.warn(error);
        }
    }, 500, { leading: true, trailing: false });

    return <FormBox>
        <Form
            form={formRef}
            layout="vertical">
            <Item
                rules={[
                    { required: true, message: '请填写区域名称' }
                ]}
                label="区域名称"
                name="areaName">
                <Input />
            </Item>
            <Row gutter={24}>
                <Col span={12}>
                    <Item
                        rules={[{ required: true, message: '请填写区域宽度' }]}
                        label="区域宽度"
                        name="areaWidth">
                        <InputNumber min={0} style={{ width: '100%' }} />
                    </Item>
                </Col>
                <Col span={12}>
                    <Item
                        rules={[{ required: true, message: '请填写区域高度' }]}
                        label="区域高度"
                        name="areaHeight">
                        <InputNumber min={0} style={{ width: '100%' }} />
                    </Item>
                </Col>
            </Row>
            <Item
                style={{ display: 'none' }}
                label="区域图像"
                name="areaBg">
                <Input />
            </Item>
            <UploadBox>
                <em>*</em>
                <label>区域图像</label>
                <Button
                    onClick={onSelectImage}
                    type="default">
                    <SelectOutlined />
                    <span>选择文件</span>
                </Button>
            </UploadBox>
            <Divider />
            <ImgBox>
                {
                    imgBase64 === ''
                        ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无图像" />
                        : <Image
                            src={imgBase64}
                            onError={() => {
                                setImgBase64('');
                            }}
                            height={360} />
                }
            </ImgBox>
        </Form>
    </FormBox>;
};

export { EditForm };