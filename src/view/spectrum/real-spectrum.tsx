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
let realTimer: any = null;
let compareTimer: any = null;

/**
 * 信号分析 / 实时频谱
 */
const RealSpectrum: FC<RealSpectrumProp> = () => {

    const navigator = useNavigate();
    const [formRef] = useForm<SearchForm>();
    const [loading, setLoading] = useState<boolean>(false);
    const [compareSpectrumModalOpen, setCompareSpectrumModalOpen] = useState<boolean>(false);
    const currentDeviceId = useRef<string>('');
    const freqBaseIdRef = useRef<string>('');
    const cmpNameRef = useRef<string>('');
    const {
        comparing,
        realSpectrumDeviceId,
        realSpectrumDeviceList,
        realSpectrumData,
        compareSpectrumData,
        realSpectrumCaptureTime,
        setReading,
        setComparing,
        clearSpectrumData,
        queryRealSpectrumDeviceList,
        queryRealSpectrumData,
        startRealCompare,
        stopRealCompare,
        queryCompareRealSpectrum
    } = useModel(state => ({
        comparing: state.comparing,
        realSpectrumDeviceId: state.realSpectrumDeviceId,
        realSpectrumDeviceList: state.realSpectrumDeviceList,
        realSpectrumData: state.realSpectrumData,
        compareSpectrumData: state.compareSpectrumData,
        realSpectrumCaptureTime: state.realSpectrumCaptureTime,
        setReading: state.setReading,
        setComparing: state.setComparing,
        clearSpectrumData: state.clearSpectrumData,
        queryRealSpectrumDeviceList: state.queryRealSpectrumDeviceList,
        queryRealSpectrumData: state.queryRealSpectrumData,
        startRealCompare: state.startRealCompare,
        stopRealCompare: state.stopRealCompare,
        queryCompareRealSpectrum: state.queryCompareRealSpectrum
    }));

    useEffect(() => {
        queryRealSpectrumDeviceList();
    }, []);

    useUnmount(() => {
        if (realTimer !== null) {
            clearInterval(realTimer);
            realTimer = null;
        }
        if (compareTimer !== null) {
            clearInterval(compareTimer);
            compareTimer = null;
        }
        clearSpectrumData();
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
            if (compareTimer !== null) {
                clearInterval(compareTimer);
                compareTimer = null;
                setComparing(false);
            }
            clearSpectrumData();
            try {
                clearInterval(realTimer);
                await queryRealSpectrumData(device);
                realTimer = setInterval(() => {
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
    const onCompareClick = debounce(async (event: MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setLoading(true);
        const { getFieldsValue } = formRef;
        if (comparing) {
            await stopRealCompare(freqBaseIdRef.current, cmpNameRef.current);
            message.destroy();
            message.info('比对已停止');
            clearInterval(compareTimer);
            compareTimer = null;
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
        setLoading(false);
    }, 1000, { leading: true, trailing: false });

    /**
     * 开始比对 handle
     * @param freqBaseId 背景频谱id
     * @param cmpName 比对名称
     */
    const onStartCompare = async (freqBaseId: string, cmpName: string) => {
        setLoading(true);
        freqBaseIdRef.current = freqBaseId;
        cmpNameRef.current = cmpName;
        if (realTimer !== null) {
            clearInterval(realTimer);
            realTimer = null;
        }
        setCompareSpectrumModalOpen(false);
        message.destroy();
        const success = await startRealCompare('', freqBaseId, 15);
        if (success) {
            message.info('比对开始');
            clearSpectrumData();
            await queryCompareRealSpectrum(currentDeviceId.current, cmpName)

            compareTimer = setInterval(async () => {
                await queryCompareRealSpectrum(currentDeviceId.current, cmpName)
            }, 1000);
        } else {
            message.warning('比对失败');
        }
        setLoading(false);
    };

    /**
     * 返回Click
     */
    const onGoBackClick = (_: MouseEvent<HTMLElement>) => {
        clearInterval(realTimer);
        clearInterval(compareTimer);
        clearSpectrumData();
        setComparing(false);
        navigator('/dashboard');
    };


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
                                (value: string, option: any) =>
                                    (option?.label ?? '').includes(value)
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
                            disabled={loading}
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
            </div>
        </SearchBar>
        <TableBox id="realOuterBox">
            <Spectrum
                domId="realOuterBox"
                realData={realSpectrumData}
                compareData={compareSpectrumData}
                serieName={realSpectrumDeviceId}
                captureTime={realSpectrumCaptureTime}
                arfcn={Array.from(new Array(7499).keys()).map(i => Math.trunc(1 + i * 0.8))} />
        </TableBox>
        <CompareSpectrumModal
            open={compareSpectrumModalOpen}
            deviceId={currentDeviceId.current}
            onCancel={() => setCompareSpectrumModalOpen(false)}
            onOk={onStartCompare}
        />
    </SpectrumBox>;
};

export { RealSpectrum };