import { request } from '@/utility/http';
import { GetState, SetState } from '..';
import { LoginState } from '../login';

const login = (setState: SetState, _: GetState): LoginState => ({

    loginUserName: '',
    loginUserHash: '',
    loginRemember: false,
    setLoginUserName(userName) {
        setState({ loginUserName: userName });
    },
    /**
     * 更新登录记忆状态
     * @param remember 是否记忆
     */
    setLoginRemember: (remember: boolean) => {
        setState({ loginRemember: remember });
    },
    /**
     * 登录
     * @param userName 用户名
     * @param password 密码
     */
    async loginByNamePassword(userName, password) {

        try {
            const res = await request.post('/system/index/login', {
                username: userName,
                password
            });
            return res;
        } catch (error) {
            throw error;
        }
    },
    async logout() {
        try {
            await request.post('/system/index/logout');
        } catch (error) {
            throw error;
        }
    }
});

export { login };