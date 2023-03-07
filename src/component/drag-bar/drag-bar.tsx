import electron from 'electron';
import { FC, PropsWithChildren, memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowMaximize, faWindowMinimize, faXmark } from '@fortawesome/free-solid-svg-icons';
import { DragBarBox } from './styled/styled';
import { DragBarProp } from './prop';

const { ipcRenderer } = electron;

/**
 * 应用标题栏
 */
const DragBar: FC<PropsWithChildren<DragBarProp>> = memo(({ children }) => {

    return <DragBarBox>
        <div className="app-name">
            <span>{children}</span>
        </div>
        <div className="app-buttons">
            <a onClick={() => ipcRenderer.send('minimize')}>
                <FontAwesomeIcon icon={faWindowMinimize} />
            </a>
            <a onClick={() => ipcRenderer.send('maximize')}>
                <FontAwesomeIcon icon={faWindowMaximize} />
            </a>
            <a onClick={() => ipcRenderer.send('close')} title="退出">
                <FontAwesomeIcon icon={faXmark} />
            </a>
        </div>
    </DragBarBox>
});

export { DragBar };