import debounce from 'lodash/debounce';
import { FC, MouseEvent, useEffect, useRef } from 'react';
import { useModel } from '@/model';
import { LiveBox, SearchBar } from './styled/box';
import { Button, Form, message } from 'antd';
import { SetForm, FormValue } from './set-form';
import { DisplayPanel } from '@/component/panel';
import { helper } from '@/utility/helper';
import { Spectrum, Rate } from '@/component/chart';
import { useNavigate } from 'react-router-dom';

let timer: NodeJS.Timer | null = null;

/**
 * 实时频谱
 */
const Live: FC<{}> = () => {

    const navigate = useNavigate();
    const [formRef] = Form.useForm<FormValue>();
    const prevDevice = useRef('');
    const prevFreqBaseId = useRef('');

    const {
        comparing,
        bgSpectrumData,
        realSpectrumData,
        realSpectrumDeviceId,
        realSpectrumCaptureTime,
        setComparing,
        clearSpectrumData,
        startRealCompare,
        stopRealCompare,
        queryAllFreqList
    } = useModel(state => ({
        comparing: state.comparing,
        bgSpectrumData: state.bgSpectrumData,
        realSpectrumCaptureTime: state.realSpectrumCaptureTime,
        realSpectrumDeviceId: state.realSpectrumDeviceId,
        realSpectrumData: state.realSpectrumData,
        freqComDisplayList: state.freqComDisplayList,
        setComparing: state.setComparing,
        clearSpectrumData: state.clearSpectrumData,
        startRealCompare: state.startRealCompare,
        stopRealCompare: state.stopRealCompare,
        queryAllFreqList: state.queryAllFreqList
    }));

    useEffect(() => {
        //查询所有背景频谱数据
        queryAllFreqList();
    }, []);

    useEffect(() => {
        const nodes = document.querySelectorAll<HTMLElement>('.context-box');
        if (nodes.length > 0) {
            const contextBox = nodes[0];
            contextBox.style.overflowX = 'hidden';
            contextBox.style.overflowY = 'hidden';
        }
    }, []);

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

    /**
     * 返回Click
     */
    const onGoBackClick = (event: MouseEvent) => {
        event.preventDefault();
        navigate('/dashboard');
    };

    const onCompareClick = debounce(async (event: MouseEvent<HTMLElement>) => {
        event.preventDefault();
        const { validateFields } = formRef;
        message.destroy();
        let device = '', offset = 15, freqBaseId = '';
        try {
            const values = await validateFields();
            device = values.device;
            offset = values.offset;
            freqBaseId = values.freqBaseId;
        } catch (error) {
            console.warn(error);
            return;
        }
        if (helper.isNullOrUndefined(freqBaseId) || freqBaseId === '') {
            message.warning('请选择背景频谱');
            return;
        }
        try {
            if (comparing) {
                //停止
                if (timer !== null) {
                    clearInterval(timer);
                }
                await stopRealCompare(device, freqBaseId);
                clearSpectrumData();
                setComparing(false);
            } else {
                //开始
                const success = await startRealCompare(device, freqBaseId, offset);
                prevDevice.current = device;
                prevFreqBaseId.current = freqBaseId;
                if (success) {
                    setComparing(true);
                    timer = setInterval(() => {
                        (async () => {
                            await startRealCompare(device, freqBaseId, offset);
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
            message.warning(`频谱比对失败 ${error.message}`);
            setComparing(false);
            if (timer) {
                clearInterval(timer);
                timer = null;
            }
        }
    }, 500, { leading: true, trailing: false });

    return <div>
        <SearchBar>
            <Button
                onClick={onGoBackClick}
                type="default">返回主页</Button>
        </SearchBar>
        <LiveBox>
            <div className="fn-box">
                <DisplayPanel style={{
                    height: '100%',
                    boxSizing: 'border-box'
                }}>
                    <div className="caption">查询设置</div>
                    <div className="content-box">
                        <SetForm formRef={formRef} />

                        <div className="btn-box">
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
            <div className="chart-box">
                <Spectrum
                    domId="realOuterBox"
                    realData={realSpectrumData}
                    compareData={bgSpectrumData}
                    serieName={realSpectrumDeviceId}
                    captureTime={realSpectrumCaptureTime}
                    arfcn={Array.from(new Array(7499).keys()).map(i => Math.trunc(1 + i * 0.8))} />
                <Rate realData={realSpectrumData} compareData={[]} />
            </div>
        </LiveBox>
    </div>;
};

export { Live };