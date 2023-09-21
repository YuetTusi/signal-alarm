import dayjs from 'dayjs';
import { FC, MouseEvent, useEffect, useState } from 'react';
import { App, Form, Select, Button, DatePicker } from 'antd';
import { HistorySpectrumProp, HistorySearchForm } from './prop';
import { SearchBar, SpectrumBox, TableBox } from './styled/box';
import { useNavigate } from 'react-router-dom';
import { toSelectData } from './tool';
import { useModel } from '@/model';
import { useUnmount } from '@/hook';
import { Spectrum } from '@/component/chart';

const { Option } = Select;
const { useForm, Item } = Form;
let timer: any = null;

/**
 * 播放
 */
const play = (
    { beginTime, endTime, speed, device }: HistorySearchForm,
    handle: (device: string, time: number) => void,
    done: () => void
) => {

    const from = beginTime.unix();
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
            clearInterval(timer);
        }
    }, 1000 * speed);
};

/**
 * 信号分析 > 历史频谱
 */
const HistorySpectrum: FC<HistorySpectrumProp> = () => {

    const { modal } = App.useApp();
    const navigator = useNavigate();
    const [formRef] = useForm<HistorySearchForm>();

    const {
        realSpectrumDeviceList,
        historySpectrumData,
        historySpectrumCaptureTime,
        historySpectrumDeviceId,
        setReading,
        clearHistorySpectrumData,
        queryRealSpectrumDeviceList,
        queryHistorySpectrumData
    } = useModel(state => ({
        realSpectrumDeviceList: state.realSpectrumDeviceList,
        historySpectrumData: state.historySpectrumData,
        historySpectrumCaptureTime: state.historySpectrumCaptureTime,
        historySpectrumDeviceId: state.historySpectrumDeviceId,
        setReading: state.setReading,
        clearHistorySpectrumData: state.clearHistorySpectrumData,
        queryRealSpectrumDeviceList: state.queryRealSpectrumDeviceList,
        queryHistorySpectrumData: state.queryHistorySpectrumData,
    }));

    useEffect(() => {
        queryRealSpectrumDeviceList();
        formRef.setFieldsValue({
            beginTime: dayjs('2023-09-15 16:39:45'),
            endTime: dayjs('2023-09-15 16:40:59')
            // beginTime: dayjs(dayjs().add(-1, 'w').format('YYYY-MM-DD 00:00:00')),
            // endTime: dayjs(dayjs().format('YYYY-MM-DD 23:59:59')),
        })
    }, []);

    useUnmount(() => {
        clearInterval(timer);
        clearHistorySpectrumData();
    });

    /**
     * 查询Click
     */
    const onSearchClick = async (event: MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setReading(true);
        const { getFieldsValue } = formRef;
        const values = getFieldsValue();
        clearInterval(timer);
        try {
            await queryHistorySpectrumData(values.device, values.beginTime.unix());
            play(
                values,
                (device: string, s: number) => {
                    queryHistorySpectrumData(device, s);
                },
                () => {
                    modal.info({
                        onOk() {
                            clearHistorySpectrumData();
                        },
                        title: '播放结束',
                        content: '频谱数据播放结束',
                        okText: '确定',
                        centered: true
                    });
                }
            );
        } catch (error) {
            console.warn(error);
        }
        finally {
            setReading(false);
        }
    };

    /**
     * 渲染播放时钟
     */
    const renderClock = () => {
        if (historySpectrumCaptureTime === 0) {
            return null;
        } else {
            return dayjs.unix(historySpectrumCaptureTime).format('YYYY-MM-DD HH:mm:ss')
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
                        initialValue={'zrt-test-x00001'}
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
                    <Item
                        name="beginTime"
                        label="起始时间">
                        <DatePicker
                            showTime={true}
                            allowClear={false}
                            inputReadOnly={true}
                            style={{ width: '170px' }} />
                    </Item>
                    <Item
                        name="endTime"
                        label="结束时间">
                        <DatePicker
                            showTime={true}
                            allowClear={false}
                            inputReadOnly={true}
                            style={{ width: '170px' }} />
                    </Item>
                    <Item
                        initialValue={2}
                        name="speed"
                        label="播放速度">
                        <Select style={{ width: '80px' }}>
                            <Option value={2}>快速</Option>
                            <Option value={4}>正常</Option>
                            <Option value={8}>慢速</Option>
                        </Select>
                    </Item>
                    <Item>
                        <Button
                            onClick={onSearchClick}
                            type="primary">查询</Button>
                    </Item>
                    <Item>
                        <Button
                            onClick={onGoBackClick}
                            type="default">返回主页</Button>
                    </Item>
                </Form>
            </div>
            <div>
                {/* <span>{renderClock()}</span> */}
            </div>
        </SearchBar>
        <TableBox id="historyOuterBox">
            <Spectrum
                domId="historyOuterBox"
                data={historySpectrumData}
                serieName={`${historySpectrumDeviceId} 频谱`}
                captureTime={historySpectrumCaptureTime}
                arfcn={Array.from(new Array(7499).keys()).map(i => Math.trunc(1 + i * 0.8))} />
        </TableBox>
    </SpectrumBox>;
};

export { HistorySpectrum };