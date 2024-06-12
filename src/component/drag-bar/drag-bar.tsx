import electron from 'electron';
import { FC, PropsWithChildren, memo, useCallback, MouseEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowMaximize, faWindowMinimize, faXmark } from '@fortawesome/free-solid-svg-icons';
import { App } from 'antd';
import { AppMode } from '@/schema/conf';
import { useModel } from '@/model';
import { Auth } from '@/component/auth';
import { closeSse } from '@/utility/sse';
import { helper } from '@/utility/helper';
import { DragBarBox } from './styled/styled';
import { DragBarProp } from './prop';

const { ipcRenderer } = electron;
const conf = helper.readConf();

/**
 * 应用标题栏
 */
const DragBar: FC<PropsWithChildren<DragBarProp>> = memo(({ children }) => {

    const { modal } = App.useApp();
    const setPhoneAlarmData = useModel(state => state.setPhoneAlarmData);

    const onExitClick = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        modal.confirm({
            onOk() {
                setPhoneAlarmData([]);
                closeSse();
                ipcRenderer.send('close');
            },
            centered: true,
            zIndex: 2001,
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
            <Auth deny={conf.mode === AppMode.FullScreen}>
                <a onClick={() => ipcRenderer.send('minimize')}>
                    <FontAwesomeIcon icon={faWindowMinimize} />
                </a>
                <a onClick={() => ipcRenderer.send('maximize')}>
                    <FontAwesomeIcon icon={faWindowMaximize} />
                </a>
                <a onClick={onExitClick} title="退出">
                    <FontAwesomeIcon icon={faXmark} />
                </a>
            </Auth>
        </div>
    </DragBarBox>
});

export { DragBar };