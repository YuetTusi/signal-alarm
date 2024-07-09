import fs from 'fs';
import debounce from 'lodash/debounce';
import electron, { OpenDialogReturnValue } from 'electron';
import { FC, MouseEvent, useState, useEffect } from 'react';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import SelectOutlined from '@ant-design/icons/SelectOutlined';
import { Col, Row, Form, Input, InputNumber, Button, Divider, Image, Empty, message } from 'antd';
import { helper } from '@/utility/helper';
import { request } from '@/utility/http';
import { FormBox } from '../styled/box';
import { ImgBox, UploadBox } from './styled/box';
import { EditFormProp } from './prop';

const { readFile } = fs.promises;
const { Item } = Form;
const { ipcRenderer } = electron;

/**
 * 区域表单
 */
const EditForm: FC<EditFormProp> = ({ formRef, data }) => {

    const [loading, setLoading] = useState<boolean>(false);
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
                message.destroy();
                setLoading(true);
                const size = await helper.fileSize(filePaths[0], 'k');
                if (size > 2000) {
                    message.warning('图像文件请小于2MB');
                } else {
                    const chunk = await readFile(filePaths[0]);
                    const pic = new Blob([new Uint8Array(chunk)], { type: 'application/octet-stream' });
                    const form = new FormData();
                    form.append('file', pic);
                    const { code, data } = await request.file<{
                        code: number,
                        data: string,
                        message: string
                    }>('/sys/area/upload', form);
                    if (code === 200) {
                        setImgBase64('data:image/png;base64,' + data);
                        setFieldValue('areaBg', data);
                    } else {
                        message.warning('图像加载失败');
                    }
                    // const base64 = await helper.fileToBase64(filePaths[0]);
                    // console.log(base64);
                    // setImgBase64('data:image/png;base64,' + base64);
                    // setFieldValue('areaBg', base64);
                }
            }
        } catch (error) {
            console.warn(error);
        } finally {
            setLoading(false);
        }
    }, 500, { leading: true, trailing: false });

    return <FormBox>
        <Form
            form={formRef}
            layout="vertical">
            <Row gutter={24}>
                <Col span={12}>
                    <Item
                        rules={[
                            { required: true, message: '请填写区域名称' }
                        ]}
                        label="区域名称"
                        name="areaName">
                        <Input />
                    </Item>
                </Col>
                <Col span={12}>
                    <Item
                        rules={[
                            { required: true, message: '排序值' }
                        ]}
                        label="排序值"
                        name="sort">
                        <InputNumber style={{ width: '100%' }} />
                    </Item>
                </Col>
            </Row>
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
                    disabled={loading}
                    type="default">
                    {loading ? <LoadingOutlined /> : <SelectOutlined />}
                    <span>{loading ? '正在处理' : '选择文件'}</span>
                </Button>
                <b>图像文件小于2MB</b>
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