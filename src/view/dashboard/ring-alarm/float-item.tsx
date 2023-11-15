import { FC } from 'react';
import { FloatItemProp } from './prop';
import { helper } from '@/utility/helper';

/**
 * 锥形浮动
 */
const FloatItem: FC<FloatItemProp> = ({ data, top }) => {
    let json: Record<string, any> = {};
    try {
        if (helper.isNullOrUndefined(data)) {
            json = {};
        } else if (typeof data.message === 'string') {
            json = JSON.parse(data.message);
        } else {
            json = data?.message ?? {};
        }
    } catch (error) {
        console.warn(error);
        console.warn('推送message转换JSON失败', error.message);
    }

    return <div
        className="cell"
        style={{
            top: `${top}px`,
            visibility: data === undefined ? 'hidden' : 'visible'
        }}>
        <div className="floating">
            <ul>
                <li className="yellow">{json.protocol ?? '-'}</li>
            </ul>
        </div>
    </div>;
};

FloatItem.defaultProps = {
    top: 0
};

export { FloatItem };