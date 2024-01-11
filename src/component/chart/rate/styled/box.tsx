import styled from 'styled-components';

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