import styled from 'styled-components';

export const SignalBox = styled.div`
    display: inline-flex;
    flex-direction: row;
    &>i{
        display: inline-block;
        width: 4px;
        height: 10px;
        margin:0 1px;

        &.green{
            background-color: #1cb6f8;
        }
        &.gray{
            background-color: #666666;
        }
    }
`;