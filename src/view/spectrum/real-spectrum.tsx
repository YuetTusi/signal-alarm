import debounce from 'lodash/debounce';
import { useNavigate } from 'react-router-dom';
import { FC, MouseEvent, useEffect } from 'react';
import { Form, Select, Button, message } from 'antd';
import { useUnmount } from '@/hook';
import { useModel } from '@/model';
import { helper } from '@/utility/helper';
import { Spectrum } from '@/component/chart';
import { toSelectData } from './tool';
import {
    SearchBar, SpectrumBox, TableBox
} from './styled/box';
import { RealSpectrumProp, SearchForm } from './prop';

// const { Option } = Select;
const { useForm, Item } = Form;
let timer: any = null;

/**
 * 信号分析 > 实时频谱
 */
const RealSpectrum: FC<RealSpectrumProp> = () => {

    const navigator = useNavigate();
    const [formRef] = useForm<SearchForm>();
    const {
        realSpectrumDeviceId,
        realSpectrumDeviceList,
        realSpectrumData,
        realSpectrumCaptureTime,
        setReading,
        clearRealSpectrumData,
        queryRealSpectrumDeviceList,
        queryRealSpectrumData
    } = useModel(state => ({
        realSpectrumDeviceId: state.realSpectrumDeviceId,
        realSpectrumDeviceList: state.realSpectrumDeviceList,
        realSpectrumData: state.realSpectrumData,
        realSpectrumCaptureTime: state.realSpectrumCaptureTime,
        setReading: state.setReading,
        clearRealSpectrumData: state.clearRealSpectrumData,
        queryRealSpectrumDeviceList: state.queryRealSpectrumDeviceList,
        queryRealSpectrumData: state.queryRealSpectrumData
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
                data={realSpectrumData}
                serieName={`${realSpectrumDeviceId} 频谱`}
                captureTime={realSpectrumCaptureTime}
                arfcn={Array.from(new Array(7499).keys()).map(i => Math.trunc(1 + i * 0.8))} />
        </TableBox>
    </SpectrumBox>;
};

export { RealSpectrum };