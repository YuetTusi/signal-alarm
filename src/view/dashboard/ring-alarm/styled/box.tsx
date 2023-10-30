import styled from 'styled-components';
import DiPng from '@/assets/image/di.png';
import BallRedPng from '@/assets/image/ball-red.png';
import BallGreenPng from '@/assets/image/ball-green.png';
import BallGrayPng from '@/assets/image/ball-gray.png';
import TriGif from '@/assets/image/tri.gif';
// import TriPng from '@/assets/image/tri.png';

export const DevAlarmBox = styled.div`
    padding: 20px;
    .row{
        
    }
    .cell{
        display: inline-block;
        width: 33%;
    }

    .dev-item-box{
        color: #fff;
        text-align: center;
        width: 15rem;
        height: 15rem;
        background: url(${DiPng}) no-repeat bottom center;
        background-size: contain;
        padding-top: 3%;
        margin: 10px auto;
        box-sizing: border-box;
        & .qiu{
            position: relative;
            width: 7rem;
            height: 7rem;
            margin: auto;
            font-size: 2.4rem;
            font-family: Arial;
            font-weight: 500;
            display: flex;
            justify-content: center;
            align-items: center;
            background: url(${BallGrayPng}) no-repeat center;
            background-size: contain;
            &::before{
                content: '';
                display: block;
                width: 9rem;
                height: 9rem;
                text-align: center;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                border-radius: 50%;
                border-width: 3px;
                border-style: solid;
                animation: scale 2s linear infinite;
            }
            &.gray{
                color:#fff;
                background-image: url(${BallGrayPng});
            }
            &.green{
                color:#0be881;
                background-image: url(${BallGreenPng});
            }
            &.red{
                color:#fd2c30;
                background-image: url(${BallRedPng});
            }
        }
        span{
            position: relative;
            top:10px;
            color:#F79A00;
        }
    }

    @keyframes scale {
        0% {
            transform: translate(-50%, -50%) scale(0.9);
            opacity: .7;
        }
        100% {
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 0;
        }
    }
`;

export const FloatAlarmBox = styled.div`
    display: flex;
    flex-direction: row;
    .cell{
        position: relative;
        top:0;
        flex:1;
        visibility: hidden;
        &:nth-child(1){
            animation: floatUpDown1 9s linear infinite;
        }
        &:nth-child(2){
            animation: floatUpDown2 6s linear infinite;
        }
        &:nth-child(3){
            animation: floatUpDown1 9s linear infinite;
        }
        &:nth-child(4){
            animation: floatUpDown3 5s linear infinite;
        }
        &:nth-child(5){
            animation: floatUpDown2 6s linear infinite;
        }
        .floating{
            width: 170px;
            height: 155px;
            margin:0 auto;
            background-image: url(${TriGif});
            background-repeat: no-repeat;
            background-size: contain;
            
            &>ul{
                position: relative;
                top:20px;
                margin:0;
                padding:0;
                font-size:1.6rem;
                li{
                    margin:0;
                    padding:0;
                    list-style-type: none;
                    text-align: center;
                    &.yellow{
                        text-align: center;
                        font-size: 1.6rem;
                        font-weight: 500;
                        color:#fff400;
                    }
                }
            }

        }
    }
    @keyframes floatUpDown1 {
        0% {
            transform: translateY(3%);
        }
        50% {
            transform: translateY(33%);
        }
        100% {
            transform: translateY(3%);
        }
    }
    @keyframes floatUpDown2 {
        0% {
            transform: translateY(7%);
        }
        50% {
            transform: translateY(40%);
        }
        100% {
            transform: translateY(7%);
        }
    }
    @keyframes floatUpDown3 {
        0% {
            transform: translateY(2%);
        }
        50% {
            transform: translateY(35%);
        }
        100% {
            transform: translateY(2%);
        }
    }
`;