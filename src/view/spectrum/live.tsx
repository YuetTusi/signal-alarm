import debounce from 'lodash/debounce';
import { FC, MouseEvent, useEffect, useRef } from 'react';
import { useUnmount } from '@/hook';
import { useModel } from '@/model';
import { LiveBox } from './styled/box';
import { Button, Form, Table, Tag, message } from 'antd';
import { BaseFreq } from '@/schema/base-freq';
import { Key } from 'antd/es/table/interface';
import { SetForm, FormValue } from './set-form';
import { getColumns } from './compare-spectrum-modal/column';
import { DisplayPanel } from '@/component/panel';
import { helper } from '@/utility/helper';
import { Spectrum, Rate } from '@/component/chart';

let timer: NodeJS.Timer | null = null;

/**
 * 实时频谱
 */
const Live: FC<{}> = () => {

    const [formRef] = Form.useForm<FormValue>();
    const prevDevice = useRef('');
    const prevFreqBaseId = useRef('');

    const {
        comparing,
        realSpectrumData,
        realSpectrumDeviceId,
        realSpectrumCaptureTime,
        setComparing,
        clearSpectrumData,
        queryRealSpectrumData,
        startRealCompare,
        stopRealCompare
    } = useModel(state => ({
        comparing: state.comparing,
        compareSpectrumData: state.compareSpectrumData,
        realSpectrumCaptureTime: state.realSpectrumCaptureTime,
        realSpectrumDeviceId: state.realSpectrumDeviceId,
        realSpectrumData: state.realSpectrumData,
        setComparing: state.setComparing,
        clearSpectrumData: state.clearSpectrumData,
        queryRealSpectrumData: state.queryRealSpectrumData,
        startRealCompare: state.startRealCompare,
        stopRealCompare: state.stopRealCompare
    }));

    useEffect(() => {
        return () => {
            if (comparing) {
                setComparing(false);
                stopRealCompare(prevDevice.current, prevFreqBaseId.current);
                if (timer !== null) {
                    clearInterval(timer);
                    timer = null;
                }
            }
            clearSpectrumData();
        };
    }, [comparing]);

    const onCompareClick = debounce(async (event: MouseEvent<HTMLElement>) => {
        event.preventDefault();
        const { validateFields } = formRef;
        message.destroy();
        try {
            const { device, offset, freqBaseId } = await validateFields();
            if (helper.isNullOrUndefined(freqBaseId) || freqBaseId === '') {
                message.warning('请选择背景频谱');
                return;
            }

            if (comparing) {
                //停止
                if (timer !== null) {
                    clearInterval(timer);
                }
                await stopRealCompare(device, freqBaseId);
                setComparing(false);
            } else {
                //开始
                const success = await startRealCompare(device, freqBaseId, offset);
                setComparing(true);
                prevDevice.current = device;
                prevFreqBaseId.current = freqBaseId;
                if (success) {
                    await queryRealSpectrumData(device);
                    timer = setInterval(() => {
                        (async () => {
                            await queryRealSpectrumData(device);
                        })()
                    }, 1000);
                } else {
                    setComparing(false);
                    if (timer) {
                        clearInterval(timer);
                        timer = null;
                    }
                }
            }
        } catch (error) {
            console.warn(error);
            setComparing(false);
            if (timer) {
                clearInterval(timer);
                timer = null;
            }
        }
    }, 500, { leading: true, trailing: false });

    return <LiveBox>
        <div className="chart-box">
            <Spectrum
                domId="realOuterBox"
                realData={realSpectrumData}
                // compareData={compareSpectrumData}
                serieName={realSpectrumDeviceId}
                captureTime={realSpectrumCaptureTime}
                arfcn={Array.from(new Array(7499).keys()).map(i => Math.trunc(1 + i * 0.8))} />
            <Rate realData={realSpectrumData} compareData={[]} />
        </div>
        <div className="fn-box">
            <DisplayPanel style={{
                height: '100%',
                boxSizing: 'border-box'
            }}>
                <div className="caption">查询设置</div>
                <div className="content-box">
                    <SetForm formRef={formRef} />

                    <div className="btn-box">
                        {/* <Button
                            onClick={onSearchClick}
                            type="primary">
                            查询
                        </Button> */}
                        <Button
                            onClick={onCompareClick}
                            type="primary"
                            style={{ width: '120px' }}>
                            {comparing ? '停止' : '查询'}
                        </Button>
                    </div>
                </div>
            </DisplayPanel>
        </div>
    </LiveBox>;
};

export { Live };