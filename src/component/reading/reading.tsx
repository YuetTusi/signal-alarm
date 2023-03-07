import { FC, useEffect } from 'react';
import { Spin } from 'antd';
import { ReadingBox } from './styled/styled';
import useModel from '@/model';
import { ReadingProp } from './prop';

const Reading: FC<ReadingProp> = () => {

    const { reading, setReading } = useModel((state) => ({
        reading: state.reading,
        setReading: state.setReading
    }));

    useEffect(() => {
        setReading(true);
        setTimeout(() => {
            setReading(false);
        }, 2000);
    }, []);

    return <ReadingBox style={{ display: reading ? 'flex' : 'none' }}>
        <div>
            <Spin size="default" />
            <div className="reading-msg">处理中，请稍等</div>
        </div>
    </ReadingBox>
}
export { Reading };