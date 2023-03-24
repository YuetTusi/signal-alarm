import styled from 'styled-components';

export const LoginBox = styled.div`

    display: flex;
    flex-direction: column;
    margin: 0 auto;
    height:auto;
    padding: 40px 80px;

    &>h3{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        font-weight: lighter;
        text-align: center;
        margin-bottom: 20px;
        &::before{
            display: inline-block;
            flex:1;
            font-size:0;
            margin-right: 10px;
            content: "";
            border-bottom:1px solid #6c8aa6;
        }
        &::after{
            display: inline-block;
            flex:1;
            font-size:0;
            margin-left: 10px;
            content: "";
            border-bottom:1px solid #6c8aa6;
        }
    }
`;

export const LoginOuterBox = styled.div`

    position: absolute;
    top:50%;
    left:50%;
    margin-top: -200px;
    margin-left: -195px;

    border:1px solid #3775a8;
    border-radius: 2px;
    background-color: rgba(32,71,136,0.5);
    height:auto;
    width: 400px;
`;