import electron from 'electron';
import { useEffect } from 'react';

const { ipcRenderer } = electron;

type HandleType = (event: Event) => void;

/**
 * 窗口大小改变hook
 */
const useResize = (handle: HandleType) => {

    useEffect(() => {
        window.addEventListener('resize', handle);
        return () => {
            window.removeEventListener('resize', handle);
        }
    }, []);
};

export { useResize };