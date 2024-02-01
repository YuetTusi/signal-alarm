import styled from 'styled-components';
import alarmBg from '@/assets/image/alarm-bg.gif';
import pAlarm from '@/assets/image/palarm.png';

export const DashboardBox = styled.div`

    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    position: absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;

    &>.left-box{
        box-sizing: border-box;
        flex:none;
        &>div{
            margin-bottom: 5px;
        }
    }
    &>.center-box{
        box-sizing: border-box;
        flex:1;
        padding: 0 5px;

        display: flex;
        flex-direction: column;
        &>.main-box{

        }
        &>.bottom-box{
            box-sizing: border-box;
            position: relative;
            margin-top:5px;
        }
    }
    &>.right-box{
        box-sizing: border-box;
        flex:none;
    }

    .alarm-bg{
        position: relative;
        width: 100%;
        height: 720px;
        background-image: url(${alarmBg});
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }

    
    .phone-panel{
        position: absolute;
        top:0;
        left:0;
        right:0;
        bottom:0;
        overflow-y: auto;
    }

    .phone-alarm{
        position: absolute;
        display: inline-flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: rgb(234,65,65,0.58);
        color:#fff8de;
        /* margin:0 20px 20px 20px; */
        padding: 24px;
        border-top-right-radius: 25px;
        border-bottom-right-radius: 25px;
        border-bottom-left-radius: 25px;
        animation-name: bg-flash;
        animation-duration: .7s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
        &>i{
            position: absolute;
            display: block;
            width: 20px;
            height: 20px;
            &.b-tl{
                top:0;
                left:0;
                border-left:3px solid #f40006;
                border-top:3px solid #f40006;
                animation-name: tl-flash;
                animation-duration: .7s;
                animation-iteration-count: infinite;
                animation-timing-function: linear;
            }
            &.b-tr{
                top:0;
                right:0;
                border-top:3px solid #f40006;
                border-right:3px solid #f40006;
                border-top-right-radius: 30px;
                animation-name: tr-flash;
                animation-duration: .7s;
                animation-iteration-count: infinite;
                animation-timing-function: linear;
            }
            &.b-bl{
                bottom:0;
                left:0;
                border-bottom:3px solid #f40006;
                border-left:3px solid #f40006;
                border-bottom-left-radius: 30px;
                animation-name: bl-flash;
                animation-duration: .7s;
                animation-iteration-count: infinite;
                animation-timing-function: linear;
            }
            &.b-br{
                bottom:0;
                right:0;
                border-bottom:3px solid #f40006;
                border-right:3px solid #f40006;
                border-bottom-right-radius: 30px;
                animation-name: br-flash;
                animation-duration: .7s;
                animation-iteration-count: infinite;
                animation-timing-function: linear;
            }
        }

        &.center{
            top:10px;
            left:50%;
            margin-left: -185px;
        }
        &.left{
            top:280px;
            left:20px;
        }
        &.right{
            top:280px;
            right:20px;
        }
        &:hover{
            &>.close{
                display: block;
            }
        }
        &>.cap{
            color:#f40006;
            text-align: left;
            width: 100%;
            border-bottom: 2px solid #f40006;
            background-image: url(${pAlarm});
            background-repeat: no-repeat;
            background-size: 20px 18px;
            &>span{
                margin-left: 25px;
            }
        }
        &>.info{
            margin-top: 5px;
            padding: 5px;
            border: 2px solid #7f1c53;
            border-radius: 3px;
            div{
                width: 280px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                &:first-child{
                    color:#f40006;
                    padding: 2px 0;
                }
                &:last-child{
                    padding: 2px 0;
                }
            }
        }
    }

    @keyframes tl-flash {
        0% {
            border-left:3px solid #fff400;
            border-top:3px solid #fff400;
        }
        50%{
            border-left:3px solid #f40006;
            border-top:3px solid #f40006;
        }
        100% {
            border-left:3px solid #fff400;
            border-top:3px solid #fff400;
        }
    }
    @keyframes tr-flash {
        0% {
            border-right:3px solid #fff400;
            border-top:3px solid #fff400;
        }
        50%{
            border-right:3px solid #f40006;
            border-top:3px solid #f40006;
        }
        100% {
            border-right:3px solid #fff400;
            border-top:3px solid #fff400;
        }
    }
    @keyframes bl-flash {
        0% {
            border-left:3px solid #fff400;
            border-bottom:3px solid #fff400;
        }
        50%{
            border-left:3px solid #f40006;
            border-bottom:3px solid #f40006;
        }
        100% {
            border-left:3px solid #fff400;
            border-bottom:3px solid #fff400;
        }
    }
    @keyframes br-flash {
        0% {
            border-right:3px solid #fff400;
            border-bottom:3px solid #fff400;
        }
        50%{
            border-right:3px solid #f40006;
            border-bottom:3px solid #f40006;
        }
        100% {
            border-right:3px solid #fff400;
            border-bottom:3px solid #fff400;
        }
    }
    @keyframes bg-flash {
        0% {
            background-color: rgb(234,65,65,0.58);
        }
        50%{
            background-color: rgb(234,65,65,0.39);
        }
        100% {
            background-color: rgb(234,65,65,0.58);
        }
    }
`;
