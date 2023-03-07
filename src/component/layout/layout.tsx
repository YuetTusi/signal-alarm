import { FC, PropsWithChildren, useEffect } from 'react';
import DragBar from '../drag-bar';
import Reading from '@/component/reading';
import { LayoutBox } from './styled/styled';

const Layout: FC<PropsWithChildren<any>> = ({ children }) => {

    return <LayoutBox>
        <DragBar>信号哨兵长时检测系统</DragBar>
        <Reading />
        <div className="context-box">
            {children}
        </div>
    </LayoutBox>
};

export { Layout };