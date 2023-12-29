
import { FC } from 'react';
import CloseCircleOutlined from '@ant-design/icons/CloseCircleOutlined';
import { Button } from 'antd';
import { helper } from '@/utility/helper';
import { AlarmType } from '@/schema/conf';
import { AlarmMessage } from '@/schema/phone-alarm-info';
import { Point } from './point';
import { pointMap } from './rnd-point';
import { RadarBox } from './styled/box';
import { RadarInfoProp } from './prop';

const { alarmType } = helper.readConf();

/**
 * 报警详情
 */
const RadarDemo: FC<RadarInfoProp> = ({ open, onClose }) => {

    const renderPoint = () => {

        const pointsInLoop = pointMap.get(10)!;

        return pointsInLoop.map((item, index) => (
            <Point
                top={item.top}
                left={item.left}
                data={{} as AlarmMessage}
                key={`P_${index}`} />
        ));
    };

    return <RadarBox style={{ display: open ? 'flex' : 'none' }}>
        <div className="left">

        </div>
        <div className="center">
            <div className="radar-outer">
                <div className="radar" />
                {renderPoint()}
            </div>
        </div>
        <div className="right">
        </div>
        {
            alarmType === AlarmType.Single
                ? null
                : <Button
                    onClick={() => onClose!()}
                    title="关闭"
                    type="link"
                    className="close-radar">
                    <CloseCircleOutlined />
                </Button>
        }
    </RadarBox>;
};

RadarDemo.defaultProps = {
    open: false,
    onClose: () => { }
};

export { RadarDemo };