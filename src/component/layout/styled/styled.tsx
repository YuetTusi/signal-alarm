import styled from 'styled-components';

export const LayoutBox = styled.div`

    position: absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;

    .setting-box{
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
    }

    .context-box{
        position: absolute;
        top:48px;
        left:0;
        right:0;
        bottom:0;
        overflow-y: auto;
    }
`;