import { FC } from 'react';

/**
 * 运营商图标
 */
const Icon: FC<{ src: string }> = ({ src }) => <img
    src={src}
    width={60}
    // height={16}
    style={{ verticalAlign: 'sub' }} />;

export { Icon };