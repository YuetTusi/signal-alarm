import styled from 'styled-components';
// import loginBg from '@/assets/image/login-bg.jpg';
import appTitleBg from '@/assets/image/login-t-bg.jpg';
import appBodyBg from '@/assets/image/login-b-bg.jpg';

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
            content: "";
            display: inline-block;
            flex:1;
            font-size:0;
            margin-right: 10px;
            border-bottom:1px solid #6c8aa6;
        }
        &::after{
            content: "";
            display: inline-block;
            flex:1;
            font-size:0;
            margin-left: 10px;
            border-bottom:1px solid #6c8aa6;
        }
    }
`;

export const LoginOuterBox = styled.div`

    position: absolute;
    top:40%;
    left:50%;
    margin-top: -250px;
    margin-left: -225px;
    border:1px solid #3775a8;
    border-radius: 2px;
    box-shadow:0px 1px 10px 10px rgb(55, 117, 168, 50%);
    background-color: rgba(32,71,136,0.5);
    height:auto;
    width: 450px;
`;


export const BackgroundBox = styled.div`
    display: block;
    position: absolute;
    top:28px;
    left:0;
    right:0;
    bottom: 0;

    .app-title-box{
        width: 100%;
        height: 141px;
        background-image: url(${appTitleBg});
        background-size: 100% 100%;
        text-align: center;
        &>span{
            position: relative;
            top:20px;
            color:#daf5fe;
            font-size: 4rem;
            letter-spacing: 2px;
        }
    }
    .login-body-box{
        position: absolute;
        top:141px;
        left:0;
        bottom:0;
        right:0;
        background-image: url(${appBodyBg});
        background-size: 100% 100%;
    }

    .setting-box{
        position: absolute;
        top:10px;
        right:10px;
    }
`;