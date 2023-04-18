import electron from 'electron';
import { useEffect } from 'react';

const { ipcRenderer } = electron;

type HandleType = (event: electron.IpcRendererEvent, rect: electron.Rectangle) => void;

const useResize = (handle: HandleType) => {

    useEffect(() => {

        console.log('resize', handle);
        ipcRenderer.on('resize', handle);

        return () => {
            ipcRenderer.removeListener('resize', handle);
        }
    }, []);
};

export { useResize };