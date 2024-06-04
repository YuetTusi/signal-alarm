import styled from 'styled-components';

export const SignalBox = styled.div`
    display: inline-flex;
    flex-direction: row;
    &>i{
        display: inline-block;
        width: 8px;
        height: 18px;
        margin-left: 1px;
        border-radius: 1px;

        &.green{
            background-color:#4cd137;
        }
        &.yellow{
            background-color:#fbc531;
        }
        &.red{
            background-color:#e84118;
        }
        /* &.active{
            background-color: #00efef;
        } */
        &.gray{
            background-color: #666666;
        }
    }
`;