import { PropsWithChildren } from "react";

interface CrashProp extends PropsWithChildren { }

interface CrashState {
    /**
     * 是否捕获错误
     */
    hasError: boolean;
    /**
     * Error
     */
    err?: Error;
    /**
     * ErrorInfo
     */
    errInfo?: any;
}

export type { CrashProp, CrashState };