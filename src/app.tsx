import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import 'dayjs/locale/zh-cn';
import localforage from 'localforage';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '@/styled/global';
import { ViewRouter } from '@/router';
import Crash from '@/component/crash';
import { ConfigProvider, App as AntdApp, Empty, theme } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { blue } from '@/theme/blue';

dayjs.locale('zh-cn');
dayjs.extend(customParseFormat);

localforage.config({
    driver: [
        localforage.LOCALSTORAGE,
        localforage.INDEXEDDB
    ]
});

const App = () => <ConfigProvider
    theme={{
        token: { ...blue },
        algorithm: theme.darkAlgorithm
    }}
    renderEmpty={() =>
        <Empty
            description="暂无数据"
            image={Empty.PRESENTED_IMAGE_SIMPLE} />
    }
    locale={zhCN}
    componentSize="small">
    <Crash>
        <AntdApp>
            <ThemeProvider theme={blue}>
                <GlobalStyle />
                <ViewRouter />
            </ThemeProvider>
        </AntdApp>
    </Crash>
</ConfigProvider>;

export { App };