import { request } from '@/utility/http';
import { GetState, SetState } from '..';
import { LoginState } from '../login';

const login = (setState: SetState, _: GetState): LoginState => ({

    loginUserName: '',

    setLoginUserName(userName) {
        setState({ loginUserName: userName });
    },

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
            // await request('system/index/logout', 'POST');
        } catch (error) {
            throw error;
        }
    }
});

export { login };