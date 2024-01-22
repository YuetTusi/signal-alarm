import { PropsWithChildren } from 'react';

export interface AuthProp extends PropsWithChildren {

    /**
     * 鉴权否决（true不渲染children）
     */
    deny: boolean,
    /**
     * 降级渲染的组件
     */
    demotion?: JSX.Element | string
}

export interface DemotionProp {
    /**
     * 降级组件或文案
     */
    widget?: JSX.Element | string
}