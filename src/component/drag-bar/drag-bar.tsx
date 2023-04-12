import electron from 'electron';
import { FC, PropsWithChildren, memo, useCallback, MouseEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowMaximize, faWindowMinimize, faXmark } from '@fortawesome/free-solid-svg-icons';
import { App } from 'antd';
import { closeSse } from '@/utility/sse';
import { DragBarBox } from './styled/styled';
import { DragBarProp } from './prop';

const { ipcRenderer } = electron;

/**
 * 应用标题栏
 */
const DragBar: FC<PropsWithChildren<DragBarProp>> = memo(({ children }) => {

    const { modal } = App.useApp();

    const onExitClick = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        modal.confirm({
            onOk() {
                closeSse();
                ipcRenderer.send('close');
            },
            centered: true,
            title: '退出',
            content: '确认退出应用？',
            okText: '是',
            cancelText: '否'
        });
    }, []);

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
            <a onClick={onExitClick} title="退出">
                <FontAwesomeIcon icon={faXmark} />
            </a>
        </div>
    </DragBarBox>
});

export { DragBar };