import electron from 'electron';
import { Component, ErrorInfo } from 'react';
import SyncOutlined from '@ant-design/icons/SyncOutlined';
import CloseCircleOutlined from '@ant-design/icons/CloseCircleOutlined';
import Button from 'antd/lib/button';
import Result from 'antd/lib/result';
import { log } from '@/utility/log';
import { ErrorMessage } from './error-message';
import { CrashViewBox } from './styled/box';
import { CrashProp, CrashState } from './prop';

const { ipcRenderer } = electron;

/**
 * 崩溃页
 */
class Crash extends Component<CrashProp, CrashState> {
    constructor(props: CrashProp) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(error: any) {
        return { hasError: true };
    }
    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        log.error(`Crash:${error.message},ErrorStack:${error.stack},errorInfo:${errorInfo.componentStack}`);
        this.setState({ err: error, errInfo: errorInfo });
    }
    render() {
        if (this.state.hasError) {
            //降级渲染
            return <CrashViewBox>
                <Result
                    title="程序错误，请重启或退出应用"
                    subTitle={<ErrorMessage error={this.state.err} />}
                    extra={
                        <>
                            <Button
                                onClick={() => ipcRenderer.send('do-relaunch')}
                                type="primary">
                                <SyncOutlined />
                                <span>重启</span>
                            </Button>
                            <Button
                                onClick={() => ipcRenderer.send('do-close')}
                                type="primary">
                                <CloseCircleOutlined />
                                <span>退出</span>
                            </Button>
                        </>
                    }
                />
            </CrashViewBox>
        } else {
            return <>{this.props.children}</>;
        }
    }
}

export default Crash;
