import dayjs from 'dayjs';
import debounce from 'lodash/debounce';
import { FC, MouseEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { App, Button, Form, message } from 'antd';
import { useUnmount } from '@/hook';
import { useModel } from '@/model';
import { helper } from '@/utility/helper';
import { DisplayPanel } from '@/component/panel';
import { Spectrum, Rate } from '@/component/chart';
import { PastForm, FormValue } from './past-form';
import { ClockBox, LiveBox, SearchBar } from './styled/box';
import { PastOperate, PastProp } from './prop';

let timer: NodeJS.Timer | null = null;

/**
 * 播放
 */
const play = (
    { startTime, endTime, device }: Pick<FormValue, 'device' | 'endTime' | 'startTime'>,
    handle: (device: string, time: number) => void,
    done: () => void
) => {

    const from = startTime.unix();
    const to = endTime.unix();

    if (from > to) {
        return;
    }

    let s = from;
    handle(device, s);
    timer = setInterval(() => {
        if (s < to) {
            s++;
            handle(device, s);
        } else {
            done();
            clearInterval(timer!);
        }
    }, 1000 * 1);
};


/**
 * 历史频谱
 */
const Past: FC<PastProp> = () => {

    const navigate = useNavigate();
    const { modal } = App.useApp();
    const [formRef] = Form.useForm<FormValue>();
    const [clock, setClock] = useState<string>('-');
    const prevDevice = useRef('');
    const prevFreqBaseId = useRef('');

    const {
        pastOperate,
        specPlaying,
        historySpectrumData,
        setPastOperate,
        setSpecPlaying,
        queryAllBgFreqList,
        queryHistorySpectrumData
    } = useModel(state => ({
        pastOperate: state.pastOperate,
        specPlaying: state.specPlaying,
        historySpectrumData: state.historySpectrumData,
        setPastOperate: state.setPastOperate,
        setSpecPlaying: state.setSpecPlaying,
        queryAllBgFreqList: state.queryAllBgFreqList,
        queryHistorySpectrumDeviceList: state.queryHistorySpectrumDeviceList,
        queryHistorySpectrumData: state.queryHistorySpectrumData,
    }));

    useEffect(() => {
        //查询所有背景频谱数据
        queryAllBgFreqList();
    }, []);

    useEffect(() => {
        const nodes = document.querySelectorAll<HTMLElement>('.context-box');
        if (nodes.length > 0) {
            const contextBox = nodes[0];
            contextBox.style.overflowX = 'hidden';
            contextBox.style.overflowY = 'hidden';
        }
    }, []);

    useUnmount(() => {
        if (timer !== null) {
            clearInterval(timer);
            timer = null;
        }
        setPastOperate(PastOperate.Nothing);
        setSpecPlaying(false);
    });

    /**
     * 返回Click
     */
    const onGoBackClick = (event: MouseEvent) => {
        event.preventDefault();
        navigate('/dashboard');
    };

    /**
     * 查询Click
     */
    const onSearchClick = debounce(async (event: MouseEvent<HTMLElement>) => {
        event.preventDefault();
        const { validateFields } = formRef;
        message.destroy();
        let device = ''
        let startTime = dayjs(), endTime = dayjs();
        try {
            const values = await validateFields(['device', 'startTime', 'endTime']);
            device = values.device;
            startTime = values.startTime;
            endTime = values.endTime;
        } catch (error) {
            console.warn(error);
            return;
        }

        try {
            if (specPlaying) {
                //停止
                if (timer !== null) {
                    clearInterval(timer);
                }
                setSpecPlaying(false);
                setPastOperate(PastOperate.Nothing);
            } else {
                setSpecPlaying(true);
                setPastOperate(PastOperate.Play);
                await queryHistorySpectrumData(device, startTime.unix());
                play(
                    { startTime, endTime, device },
                    (device: string, time: number) => {
                        setClock('播放时间：' + dayjs.unix(time).format('YYYY-MM-DD HH:mm:ss'));
                        queryHistorySpectrumData(device, time);
                    },
                    () => {
                        setPastOperate(PastOperate.Nothing);
                        setSpecPlaying(false);
                        modal.info({
                            title: '信息',
                            content: '已播放结束',
                            centered: true,
                            okText: '确定'
                        });
                    }
                );
            }
        } catch (error) {
            console.log(error);
            message.warning(`频谱播放失败 ${error.message}`);
            setSpecPlaying(false);
            if (timer) {
                clearInterval(timer);
                timer = null;
            }
        }

    }, 500, { leading: true, trailing: false });

    /**
     * 比对Click
     */
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
            if (specPlaying) {
                //停止
                if (timer !== null) {
                    clearInterval(timer);
                }
                // await stopRealCompare(device, freqBaseId);
                setSpecPlaying(false);
                setPastOperate(PastOperate.Nothing);
            } else {
                //开始
                setPastOperate(PastOperate.Compare);
                // const success = await startRealCompare(device, freqBaseId, offset);
                // prevDevice.current = device;
                // prevFreqBaseId.current = freqBaseId;
                // if (success) {
                //     setSpecPlaying(true);
                //     timer = setInterval(() => {
                //         (async () => {
                //             await startRealCompare(device, freqBaseId, offset);
                //         })()
                //     }, 1000);
                // } else {
                //     setSpecPlaying(false);
                //     if (timer) {
                //         clearInterval(timer);
                //         timer = null;
                //     }
                // }
            }
        } catch (error) {
            console.warn(error);
            message.warning(`频谱比对失败 ${error.message}`);
            setSpecPlaying(false);
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
            <ClockBox>{clock}</ClockBox>
        </SearchBar>
        <LiveBox>
            <div className="fn-box">
                <DisplayPanel style={{
                    height: '100%',
                    boxSizing: 'border-box'
                }}>
                    <div className="caption">查询设置</div>
                    <div className="content-box">
                        <PastForm formRef={formRef} />

                        <div className="btn-box">
                            <Button
                                onClick={onSearchClick}
                                disabled={pastOperate === PastOperate.Compare}
                                type="primary"
                                style={{ width: '120px' }}>
                                {specPlaying && pastOperate === PastOperate.Play ? '停止' : '播放'}
                            </Button>
                            <Button
                                onClick={onCompareClick}
                                disabled={pastOperate === PastOperate.Play}
                                type="primary"
                                style={{ width: '120px' }}>
                                {specPlaying && pastOperate === PastOperate.Compare ? '停止' : '比对'}
                            </Button>
                        </div>
                    </div>
                </DisplayPanel>
            </div>
            <div id="pastOuterBox" className="chart-box">
                <Spectrum
                    domId="pastOuterBox"
                    realData={historySpectrumData}
                    compareData={[]}
                    arfcn={
                        Array
                            .from(new Array(7499).keys())
                            .map(i => Math.trunc(1 + i * 0.8))
                    } />
                <Rate
                    realData={historySpectrumData}
                    compareData={[]}
                    outerDomId="pastOuterBox" />
            </div>
        </LiveBox>
    </div>;
};

export { Past };