import { memo, FC } from 'react';
import { BallBox } from './styled/style';

const Ball: FC<{}> = memo(() => <BallBox>
    <i className="cross"></i>
    <i className="cross"></i>
    <i className="cross"></i>
    <i className="cross"></i>

    <div className="light-border">
        <div className="light-loop">
            <div className="heart"></div>
        </div>
    </div>
</BallBox>);

export { Ball };