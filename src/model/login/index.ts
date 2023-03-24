import { RequestResult } from '@/utility/http';
import { login } from './login';

interface LoginState {

    /**
     * 登录用户
     */
    loginUserName: string,
    /**
     * 用户Hash
     */
    loginUserHash: string,
    /**
     * 记住状态
     */
    loginRemember: boolean,
    /**
     * 设置登录用户名
     * @param userName 用户名
     */
    setLoginUserName: (userName: string) => void,
    /**
     * 更新登录记忆状态
     * @param remember 是否记忆
     */
    setLoginRemember: (remember: boolean) => void,
    /**
     * 登录
     * @param userName 用户名
     * @param password 密码
     */
    loginByNamePassword: (userName: string, password: string) =>
        Promise<null | RequestResult<{ token: string }>>,
    /**
     * 登出 
     */
    logout: () => void
}

export type { LoginState };
export { login };