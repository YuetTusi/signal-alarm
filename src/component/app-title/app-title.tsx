import { FC, useEffect, useState } from 'react';
import { APP_NAME, helper } from '@/utility/helper';
import { AppTitleProp } from './prop';

/**
 * 应用名称
 */
const AppTitle: FC<AppTitleProp> = () => {

    const [name, setName] = useState<string>(APP_NAME);

    useEffect(() => {
        (async () => {
            const next = await helper.getAppSetting();
            setName(next.appName);
        })();
    }, []);

    return <span>{name}</span>;
};

export { AppTitle }