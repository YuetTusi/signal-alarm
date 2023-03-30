import { FC, PropsWithChildren } from 'react';
import Reading from '../reading';
import DragBar from '../drag-bar';
import { LayoutBox } from './styled/styled';

const Layout: FC<PropsWithChildren<{}>> = ({ children }) => <LayoutBox>
    <DragBar />
    <Reading />
    <div className="context-box">
        {children}
    </div>
</LayoutBox>;

export { Layout };