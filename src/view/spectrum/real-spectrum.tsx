import debounce from 'lodash/debounce';
import { useNavigate } from 'react-router-dom';
import { FC, MouseEvent, useEffect, useState, useRef } from 'react';
import { Form, Select, Button, message } from 'antd';
import { useUnmount } from '@/hook';
import { useModel } from '@/model';
import { helper } from '@/utility/helper';
import { Spectrum } from '@/component/chart';
import { toSelectData } from './tool';
import { CompareSpectrumModal } from './compare-spectrum-modal';
import {
    SearchBar, SpectrumBox, TableBox
} from './styled/box';
import { RealSpectrumProp, SearchForm } from './prop';

const { useForm, Item } = Form;
let timer: any = null;

/**
 * 信号分析 > 实时频谱
 */
const RealSpectrum: FC<RealSpectrumProp> = () => {

    const navigator = useNavigate();
    const [formRef] = useForm<SearchForm>();
    const [compareSpectrumModalOpen, setCompareSpectrumModalOpen] = useState<boolean>(false);
    const currentDeviceId = useRef<string>('');
    const freqBaseIdRef = useRef<string>('');
    const cmpNameRef = useRef<string>('');
    const {
        comparing,
        realSpectrumDeviceId,
        realSpectrumDeviceList,
        realSpectrumData,
        realSpectrumCaptureTime,
        setReading,
        clearRealSpectrumData,
        queryRealSpectrumDeviceList,
        queryRealSpectrumData,
        startRealCompare,
        stopRealCompare
    } = useModel(state => ({
        comparing: state.comparing,
        realSpectrumDeviceId: state.realSpectrumDeviceId,
        realSpectrumDeviceList: state.realSpectrumDeviceList,
        realSpectrumData: state.realSpectrumData,
        realSpectrumCaptureTime: state.realSpectrumCaptureTime,
        setReading: state.setReading,
        clearRealSpectrumData: state.clearRealSpectrumData,
        queryRealSpectrumDeviceList: state.queryRealSpectrumDeviceList,
        queryRealSpectrumData: state.queryRealSpectrumData,
        startRealCompare: state.startRealCompare,
        stopRealCompare: state.stopRealCompare
    }));

    useEffect(() => {
        queryRealSpectrumDeviceList()
    }, []);

    useUnmount(() => {
        if (timer !== null) {
            clearInterval(timer);
            timer = null;
        }
        clearRealSpectrumData();
    });

    /**
     * 查询Click
     */
    const onSearchClick = debounce(async (event: MouseEvent<HTMLElement>) => {
        event.preventDefault();
        const { getFieldsValue } = formRef;
        const { device } = getFieldsValue();
        if (helper.isNullOrUndefined(device)) {
            message.destroy();
            message.warning('请选择设备');
        } else {
            setReading(true);
            try {
                clearInterval(timer);
                await queryRealSpectrumData(device);
                timer = setInterval(() => {
                    (async (id: string) => {
                        await queryRealSpectrumData(id);
                    })(device);
                }, 1000);
            } catch (error) {
                console.warn(error.message);
            } finally {
                setReading(false);
            }
        }
    }, 500, { leading: true, trailing: false });

    /**
     * 频谱比对 Click
     */
    const onCompareClick = async (event: MouseEvent<HTMLElement>) => {
        event.preventDefault();
        const { getFieldsValue } = formRef;
        if (comparing) {
            await stopRealCompare(freqBaseIdRef.current, cmpNameRef.current);
        } else {
            const { device } = getFieldsValue();
            if (helper.isNullOrUndefined(device)) {
                message.destroy();
                message.warning('请选择设备');
            } else {
                currentDeviceId.current = device;
                setCompareSpectrumModalOpen(true);
            }
        }
    };

    /**
     * 返回Click
     */
    const onGoBackClick = (_: MouseEvent<HTMLElement>) =>
        navigator('/dashboard');

    return <SpectrumBox>
        <SearchBar>
            <div>
                <Form form={formRef} layout="inline">
                    <Item
                        name="device"
                        label="设备">
                        <Select
                            options={toSelectData(realSpectrumDeviceList)}
                            filterOption={
                                (input: string, option: any) =>
                                    (option?.label ?? '').includes(input)
                            }
                            showSearch={true}
                            style={{ width: '200px' }}
                        />
                    </Item>
                    <Item>
                        <Button
                            onClick={onSearchClick}
                            type="primary">查询</Button>
                    </Item>
                    <Item>
                        <Button
                            onClick={onCompareClick}
                            type="primary">{comparing ? '停止' : '比对'}</Button>
                    </Item>
                    <Item>
                        <Button
                            onClick={onGoBackClick}
                            type="default">返回主页</Button>
                    </Item>
                </Form>
            </div>
            <div>
                <button
                    onClick={() => {
                        stopRealCompare(freqBaseIdRef.current, cmpNameRef.current);
                    }} type="button">停止</button>
            </div>
        </SearchBar>
        <TableBox id="realOuterBox">
            <Spectrum
                domId="realOuterBox"
                data={realSpectrumData}
                serieName={`${realSpectrumDeviceId} 频谱`}
                captureTime={realSpectrumCaptureTime}
                arfcn={Array.from(new Array(7499).keys()).map(i => Math.trunc(1 + i * 0.8))} />
        </TableBox>
        <CompareSpectrumModal
            open={compareSpectrumModalOpen}
            deviceId={currentDeviceId.current}
            onCancel={() => setCompareSpectrumModalOpen(false)}
            onOk={(freqBaseId: string, cmpName: string) => {
                // todo: 发送开始比对请求
                freqBaseIdRef.current = freqBaseId;
                cmpNameRef.current = cmpName;
                startRealCompare(freqBaseId, cmpName);
            }}
        />
    </SpectrumBox>;
};

export { RealSpectrum };