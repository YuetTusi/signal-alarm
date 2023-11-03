import { FC } from 'react';
import { Modal } from 'antd';
import { BackgroundPreviewModalProp } from './prop';
import { ScrollImg } from '../styled/box';

/**
 * 背景预览框
 */
const BackgroundPreviewModal: FC<BackgroundPreviewModalProp> = ({ open, bg, onCancel }) => {

    const getImageSource = () => {
        if (bg === undefined) {
            return '';
        } else if (bg.startsWith('data:image')) {
            return bg;
        } else {
            return 'data:image/png;base64,' + bg;
        }
    };

    return <Modal
        footer={null}
        open={open}
        width={1460}
        onCancel={onCancel}
        title="背景预览"
        centered={true}
        maskClosable={false}
        destroyOnClose={true}
        getContainer="#app">
        <ScrollImg>
            <img src={getImageSource()} />
        </ScrollImg>
    </Modal>
};

export { BackgroundPreviewModal };