import { GetState, SetState } from '..';
import { LoginState } from '../login';
import { httpPost } from '@/utility/http';

const login = (setState: SetState, getState: GetState): LoginState => ({

    loginUserName: '',

    setLoginUserName(userName) {
        setState({ loginUserName: userName });
    },

    async loginByNamePassword(userName, password) {

        try {
            const res = await httpPost('/system/index/login', {
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
            await httpPost('/system/index/logout');
        } catch (error) {
            throw error;
        }
    }
});

export { login };