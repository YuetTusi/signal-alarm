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

export const EmptyBox = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 195px;
`;