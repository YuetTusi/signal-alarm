import { useEffect } from 'react';

const useUnmount = (handle: Function) => {

    useEffect(() => {
        return () => {
            handle();
        }
    }, []);
};

export { useUnmount };