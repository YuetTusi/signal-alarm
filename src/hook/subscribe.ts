import electron, { IpcRendererEvent } from 'electron';
import { useEffect } from 'react';

const { ipcRenderer } = electron;

type RendererHandle = (event: IpcRendererEvent, ...args: any[]) => void;

/**
 * 订阅IpcRenderer事件
 */
const useSubscribe = (channel: string, handle: RendererHandle) => {

    useEffect(() => {
        ipcRenderer.on(channel, handle);
        return () => {
            ipcRenderer.off(channel, handle);
        }
    }, [channel, handle]);
};

export { useSubscribe };

