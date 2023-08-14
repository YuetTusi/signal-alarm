import { useEffect } from 'react';

/**
 * 组件卸载hook
 */
const useUnmount = (handle: Function) => {

    useEffect(() => {
        return () => {
            handle();
        }
    }, []);
};

export { useUnmount };