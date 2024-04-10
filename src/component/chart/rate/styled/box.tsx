import styled from 'styled-components';
import { helper } from '@/utility/helper';
import { AppMode } from '@/schema/conf';

const { mode } = helper.readConf();

export const PanelBox = styled.div`
    display: block;
    width:100%;
    &.fn-hidden{
        display: none;
    }
    .ant-table-body{
        height: 160px;
    }
`;

export const ChartBox = styled.div<{
    width?: number,
    height?: number
}>`

    width: ${props => `${props.width ?? 320}px`};
    height: ${props => `${props.height ?? 300}px`};
    display:flex;
    justify-content:center;
    align-items:center;
`;

export const TableBox = styled.div`

    position:absolute;
    left:0;
    right:0;
    bottom:0;
    height: ${mode === AppMode.FullScreen ? 380 : 300}px;

    .ant-table-body{
        height: ${mode === AppMode.FullScreen ? 290 : 260}px !important;
    }
`;