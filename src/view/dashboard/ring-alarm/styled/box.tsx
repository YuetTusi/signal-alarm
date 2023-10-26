import styled from 'styled-components';
import DiPng from '@/assets/image/di.png';
import BallRedPng from '@/assets/image/ball-red.png';
import BallGreenPng from '@/assets/image/ball-green.png';
import BallGrayPng from '@/assets/image/ball-gray.png';
import TriPng from '@/assets/image/tri.png';

export const DevAlarmBox = styled.div`
    padding: 20px;
    .cell{
        display: inline-block;
        width: 33%;
    }

    .dev-item-box{
        color: #fff;
        text-align: center;
        width: 14rem;
        height: 14rem;
        background: url(${DiPng}) no-repeat bottom center;
        background-size: contain;
        padding-top: 3%;
        margin: 10px auto;
        box-sizing: border-box;
        & .qiu{
            position: relative;
            width: 6rem;
            height: 6rem;
            margin: auto;
            font-size: 2.4rem;
            font-weight: bold;
            display: flex;
            justify-content: center;
            align-items: center;
            background: url(${BallGrayPng}) no-repeat center;
            background-size: contain;
            &::before{
                content: '';
                display: block;
                width: 8rem;
                height: 8rem;
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
        flex:1;
        .floating{
            /* width: 15%;
            height: 75%; */
            width: 245px;
            height: 233px;
            margin:0 auto;
            background-image: url(${TriPng});
            background-repeat: no-repeat;
            background-size: contain;
            animation: floatUpDown 8s linear infinite;
            &>ul{
                position: relative;
                top:24px;
                margin:0;
                padding:0;
                font-size:1.6rem;
                li{
                    margin:0;
                    padding:0;
                    list-style-type: none;
                    text-align: center;
                    &.yellow{
                        text-indent: 10rem;
                        text-align: left;
                        font-size: 1.6rem;
                        font-weight: bold;
                        color:#fde400;
                    }
                }
            }
            &:nth-child(1){
                margin-top: 0;
            }
            &:nth-child(2){
                margin-top: 5%;
            }
            &:nth-child(3){
                margin-top: 10%;
            }
        }
    }
    @keyframes floatUpDown {
        0% {
            transform: translateY(0%);
        }
        50% {
            transform: translateY(100%);
        }
        100% {
            transform: translateY(0%);
        }
    }
`;