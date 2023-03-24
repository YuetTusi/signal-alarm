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
        height: 40px;
        &>.ant-btn{
            margin-left: 5px;
            &:last-child{
                margin-left: 0;
                margin-right: 10px;
            }
        }
    }

    .context-box{
        position: absolute;
        top:63px;
        left:0;
        right:0;
        bottom:0;
        overflow-y: auto;
    }
`;