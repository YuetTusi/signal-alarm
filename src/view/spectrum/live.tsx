import debounce from 'lodash/debounce';
import { FC, MouseEvent, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, message } from 'antd';
import { useUnmount } from '@/hook';
import { useModel } from '@/model';
import { helper } from '@/utility/helper';
import { DisplayPanel } from '@/component/panel';
import { Spectrum, Rate } from '@/component/chart';
import { SetForm, FormValue } from './set-form';
import { LiveBox, SearchBar } from './styled/box';
import { SpecOperate } from './prop';

let timer: any = null;

/**
 * 实时频谱
 */
const Live: FC<{}> = () => {

    const navigate = useNavigate();
    const [formRef] = Form.useForm<FormValue>();
    const prevDevice = useRef('');
    const prevFreqBaseId = useRef('');

    const {
        specOperate,
        specLiving,
        bgSpectrumData,
        realSpectrumData,
        // freqCmpResList,
        compareBarData,
        freqComDisplayList,
        setSpecOperate,
        setSpecLiving,
        resetCompareBarData,
        clearSpectrumData,
        startRealCompare,
        stopRealCompare,
        queryAllFreqList,
        queryRealSpectrumData
    } = useModel(state => ({
        specOperate: state.specOperate,
        specLiving: state.specLiving,
        bgSpectrumData: state.bgSpectrumData,
        realSpectrumData: state.realSpectrumData,
        freqComDisplayList: state.freqComDisplayList,
        // freqCmpResList: state.freqCmpResList,
        compareBarData: state.compareBarData,
        setSpecOperate: state.setSpecOperate,
        setSpecLiving: state.setSpecLiving,
        resetCompareBarData: state.resetCompareBarData,
        clearSpectrumData: state.clearSpectrumData,
        startRealCompare: state.startRealCompare,
        stopRealCompare: state.stopRealCompare,
        queryAllFreqList: state.queryAllFreqList,
        queryRealSpectrumData: state.queryRealSpectrumData
    }));

    useEffect(() => {
        //查询所有背景频谱数据
        queryAllFreqList();
        //还原柱图初始数据
        resetCompareBarData();
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
            stopRealCompare(prevDevice.current, prevFreqBaseId.current);
            clearInterval(timer);
            timer = null;
        }
        setSpecOperate(SpecOperate.Nothing);
        setSpecLiving(false);
        clearSpectrumData();
        const nodes = document.querySelectorAll<HTMLElement>('.context-box');
        if (nodes.length > 0) {
            const contextBox = nodes[0];
            contextBox.style.overflowX = 'auto';
            contextBox.style.overflowY = 'auto';
        }
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
        //还原柱图初始数据
        resetCompareBarData();
        let device = ''
        try {
            const values = await validateFields(['device']);
            device = values.device;
        } catch (error) {
            console.warn(error);
            return;
        }
        try {
            if (specLiving) {
                //停止
                if (timer !== null) {
                    clearInterval(timer);
                }
                setSpecLiving(false);
                setSpecOperate(SpecOperate.Nothing);
            } else {
                setSpecOperate(SpecOperate.Search);
                await queryRealSpectrumData(device);
                setSpecLiving(true);
                timer = setInterval(() => {
                    (async () => {
                        await queryRealSpectrumData(device);
                    })()
                }, 1000);
            }
        } catch (error) {
            console.warn(error);
            message.warning(`频谱查询失败 ${error.message}`);
            setSpecLiving(false);
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
            if (specLiving) {
                //停止
                if (timer !== null) {
                    clearInterval(timer);
                }
                await stopRealCompare(device, freqBaseId);
                setSpecLiving(false);
                setSpecOperate(SpecOperate.Nothing);
            } else {
                //开始
                setSpecOperate(SpecOperate.Compare);
                //还原柱图初始数据
                resetCompareBarData();
                const success = await startRealCompare(device, freqBaseId, offset);
                prevDevice.current = device;
                prevFreqBaseId.current = freqBaseId;
                if (success) {
                    setSpecLiving(true);
                    timer = setInterval(() => {
                        (async () => {
                            await startRealCompare(device, freqBaseId, offset);
                        })()
                    }, 1000);
                } else {
                    setSpecLiving(false);
                    setSpecOperate(SpecOperate.Nothing);
                    if (timer) {
                        clearInterval(timer);
                        timer = null;
                    }
                }
            }
        } catch (error) {
            console.warn(error);
            message.warning(`频谱比对失败 ${error.message}`);
            setSpecLiving(false);
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
                                onClick={onSearchClick}
                                disabled={specOperate === SpecOperate.Compare}
                                type="primary"
                                style={{ width: '120px' }}>
                                {specLiving && specOperate === SpecOperate.Search ? '停止' : '查询'}
                            </Button>
                            <Button
                                onClick={onCompareClick}
                                disabled={specOperate === SpecOperate.Search}
                                type="primary"
                                style={{ width: '120px' }}>
                                {specLiving && specOperate === SpecOperate.Compare ? '停止' : '比对'}
                            </Button>
                        </div>
                    </div>
                </DisplayPanel>
            </div>
            <div id="realOuterBox" className="chart-box">
                <Spectrum
                    domId="realOuterBox"
                    realData={realSpectrumData}
                    compareData={bgSpectrumData}
                    arfcn={
                        Array
                            .from(new Array(7499).keys())
                            .map(i => Math.trunc(1 + i * 0.8))
                    } />
                <Rate
                    realData={realSpectrumData}
                    // compareData={freqCmpResList}
                    compareData={compareBarData}
                    displayData={freqComDisplayList}
                    outerDomId="realOuterBox" />
            </div>
        </LiveBox>
    </div>;
};

export { Live };