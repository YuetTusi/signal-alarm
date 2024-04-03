import { FC } from 'react';
import { Spin } from 'antd';
import { ReadingBox } from './styled/styled';
import { useModel } from '@/model';
import { ReadingProp } from './prop';

const Reading: FC<ReadingProp> = ({ children }) => {

    const { reading } = useModel((state) => ({
        reading: state.reading
    }));

    return <ReadingBox style={{ display: reading ? 'flex' : 'none' }}>
        <div>
            <Spin size="default" />
            <div className="reading-msg">{children ?? '读取中'}</div>
        </div>
    </ReadingBox>
}
export { Reading };