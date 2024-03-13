import styled from 'styled-components';

export const ClockBox = styled.div`

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    padding:14px;

    &>.clock-date{
        box-sizing:border-box;
        flex:4;
        color:#01aff8;
        font-size: 2.6rem;
        text-align: center;
        letter-spacing: 1px;
        text-shadow: 1px 1px 8px #01aff8,-1px -1px 8px #01aff8;
    }
    &>hr{
        display: block;
        margin: 0;
        padding: 0;
        border-top: none;
        border-left: 2px solid #01aff8;
        box-shadow: 1px 1px 8px #01aff8,-1px -1px 8px #01aff8;
        border-right: none;
        border-bottom: none;
        flex:none;
        height: 32px;
    }
    &>.clock-time{
        box-sizing:border-box;
        flex:2;
        color:#01aff8;
        font-size: 3.2rem;
        text-align: center;
        letter-spacing: 1px;
        text-shadow: 1px 1px 8px #01aff8,-1px -1px 8px #01aff8;
    }
`;