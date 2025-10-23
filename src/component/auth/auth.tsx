import { FC } from 'react';
import { Demotion } from './demotion';
import { AuthProp } from './prop';

/**
 * 鉴权显示
 */
const Auth: FC<AuthProp> = ({ deny, demotion, children }) =>
    deny
        ? <Demotion widget={demotion} />
        : <>{children}</>;



export { Auth, Demotion };
export default Auth;