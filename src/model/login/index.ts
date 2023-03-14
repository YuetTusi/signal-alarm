import { RequestResult } from '@/utility/http';
import { login } from './login';

interface LoginState {

    /**
     * 登录用户
     */
    loginUserName: string,
    /**
     * 设置登录用户名
     * @param userName 用户名
     */
    setLoginUserName: (userName: string) => void,
    /**
     * 登录
     * @param userName 用户名
     * @param password 密码
     */
    loginByNamePassword: (userName: string, password: string) => Promise<null | RequestResult>,
    /**
     * 登出 
     */
    logout: () => void
}

export type { LoginState };
export { login };