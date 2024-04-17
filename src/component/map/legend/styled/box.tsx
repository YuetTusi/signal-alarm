import styled from 'styled-components';

export const LegendBox = styled.ul`

    position: absolute;
    top:60px;
    right:0;
    z-index: 401;

    box-sizing: border-box;
    width: 140px;
    margin: 0;
    padding: 5px;
    border-radius: 2px;
    background-color: rgba(20,28,103,0.7);

    &>li{
        margin: 0;
        padding: 2px 0;
        list-style-type: none;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }
    img{
        display: inline-block;
        width: 20px;
        width: 20px;
    }
    span{
        font-size: 1.8rem;
        padding-left: 5px;
    }
`;