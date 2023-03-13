import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import 'dayjs/locale/zh-cn';
import localforage from 'localforage';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '@/styled/global';
import { ViewRouter } from '@/router';
import { ConfigProvider, App as AntdApp, Empty, theme } from 'antd';
// import dateLocale from 'antd/es/date-picker/locale/zh_CN';
import zhCN from 'antd/es/locale/zh_CN';
import { cyan } from '@/theme/cyan';

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
        algorithm: theme.darkAlgorithm,
        token: { ...cyan }
    }}
    locale={zhCN}
    componentSize="small"
    renderEmpty={() =>
        <Empty description="暂无数据" image={Empty.PRESENTED_IMAGE_SIMPLE} />
    }>
    <AntdApp>
        <ThemeProvider theme={cyan}>
            <GlobalStyle />
            <ViewRouter />
        </ThemeProvider>
    </AntdApp>
</ConfigProvider>;

export { App };