import styled from 'styled-components';
import DiPng from '@/assets/image/di.png';
import BallRedPng from '@/assets/image/ball-red.png';
import BallGreenPng from '@/assets/image/ball-green.png';
import BallGrayPng from '@/assets/image/ball-gray.png';

export const DevAlarmBox = styled.div`
    position: absolute;
    top: 45px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: auto;

    .alarm-box{
        color: #fff;
        text-align: center;
        position: absolute;
        width: 14rem;
        height: 14rem;
        background: url(${DiPng}) no-repeat bottom center;
        background-size: contain;
        padding-top: 3%;
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
    }

    @keyframes scale {
            0% {
                transform: translate(-50%, -50%) scale(0.9);
                opacity: 1;
            }
            100% {
                transform: translate(-50%, -50%) scale(1.5);
                opacity: 0;
            }
    }
`;