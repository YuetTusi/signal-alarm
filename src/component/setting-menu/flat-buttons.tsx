import { FC } from 'react';
import { Col, Row, Button } from 'antd';
import { SystemMenu } from '@/schema/system-menu';
import { ButtonPanel } from './styled/box';

const flatten = (data: SystemMenu[] = []) => {

    let menu: SystemMenu[] = [];

    for (let i = 0; i < data.length; i++) {
        menu.push(data[i]);
        if (data[i].children.length > 0) {
            menu = menu.concat(flatten(data[i].children));
        }
    }

    return menu;
};

/**
 * 菜单按钮（一级菜单下的所有按钮）
 */
const FlatButtons: FC<{
    menus: SystemMenu[],
    onClick: (data: SystemMenu) => void
}> = ({ menus, onClick }) => {

    const buttons = flatten(menus).filter(i => i.name !== '日志管理');

    const renderButtons = () => {
        return buttons.map(item => {
            return <Col flex={'200px'} key={`FB_${item.id}`}>
                <button
                    onClick={() => onClick(item)}
                    type="button"
                    className="flat-button">
                    <i className={item.path} />
                    <span>{item.name}</span>
                </button>
            </Col>;
        });
    };

    return <ButtonPanel>
        <Row align="stretch" justify="center" gutter={24} wrap={true}>
            {renderButtons()}
        </Row>
    </ButtonPanel>;
};

export { FlatButtons };