import styled from 'styled-components';

export const SignalBox = styled.div`
    display: inline-flex;
    flex-direction: row;
    &>i{
        display: inline-block;
        width: 6px;
        height: 10px;
        margin-left: 1px;
        border-radius: 1px;

        &.active{
            background-color: #00efef;
        }
        &.gray{
            background-color: #666666;
        }
    }
`;