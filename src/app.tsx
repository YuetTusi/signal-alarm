import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import localforage from 'localforage';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '@/styled/global';
import { ViewRouter } from '@/router';
import Crash from '@/component/crash';
import {
    App as AntdApp,
    ConfigProvider,
    Empty,
    theme
} from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { blue } from '@/theme/blue';
import 'leaflet/dist/leaflet.css';

dayjs.locale('zh-cn');
dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);

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
    componentSize="middle">
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