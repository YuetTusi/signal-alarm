import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '@/styled/global';
import { ViewRouter } from '@/router';
import { ConfigProvider, App as AntdApp, Empty, theme } from 'antd';
// import dateLocale from 'antd/es/date-picker/locale/zh_CN';
import zhCN from 'antd/es/locale/zh_CN';
import { cyan } from '@/theme/cyan';

dayjs.locale('zh-cn');

const App = () => <ConfigProvider
    componentSize="small"
    locale={zhCN}
    theme={{
        algorithm: theme.darkAlgorithm,
        token: { ...cyan }
    }}
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