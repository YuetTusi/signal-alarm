import styled from 'styled-components';

export const LegendBox = styled.ul`

    position: absolute;
    top:52px;
    right:0;
    z-index: 401;

    margin: 0;
    padding: 5px;
    border-radius: 2px;
    background-color: rgba(20,28,103,0.7);

    &>li{
        margin: 0;
        padding: 0;
        list-style-type: none;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }
    i{
        display: inline-block;
        width: 16px;
        height: 16px;
        border-radius: 2px;
    }
    span{
        font-size: 1.4rem;
        padding-left: 5px;
    }
`;