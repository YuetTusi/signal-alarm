import { StoreApi } from "zustand";
import { helper } from '@/utility/helper';

type Config = (set: StoreApi<any>['setState'], get: StoreApi<any>['getState'], api: StoreApi<any>) => any;

/**
 * 仓库日志
 */
const zustandLog = (config: Config, use: boolean = helper.IS_DEV) =>
    (set: StoreApi<any>['setState'], get: StoreApi<any>['getState'], api: StoreApi<any>) =>
        config((parital: any, replace?: boolean) => {
            if (use) {
                const now = new Date();
                console.log(`%c触发时间: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`, 'color:#ffed72');
                console.log('%c更新前➘:', 'color:#99CCFF');
                console.log(get());
                set(parital, replace);
                console.log('%c更新后➘:', 'color:#33CC33');
                console.log(get());
                console.log('%c更新结束\r\n', 'color:#ffed72');
            } else {
                set(parital, replace);
            }
        }, get, api);

export { zustandLog };