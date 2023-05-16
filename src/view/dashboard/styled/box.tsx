import styled from 'styled-components';
import alarmBg from '@/assets/image/alarm-bg.jpg';

export const DashboardBox = styled.div`

    display: flex;
    flex-direction: row;

    position: absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;

    &>.left-box{
        flex:none;
        &>div{
            margin-bottom: 5px;
        }
    }
    &>.center-box{
        flex:1;
        padding: 0 5px;

        display: flex;
        flex-direction: column;
        &>.main-box{

        }
        &>.bottom-box{
            position: relative;
            margin-top:5px;
        }
    }
    &>.right-box{
        flex:none;
    }

    .alarm-bg{
        position: relative;
        width: 100%;
        height: 600px;
        background-image: url(${alarmBg});
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }

    .phone-panel{
        position: absolute;
        top:45px;
        left:0;
        right:0;
        bottom:0;
        padding: 0 15px;
        overflow-y: auto;
    }

    .phone-alarm{
        position: relative;
        display: inline-flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background-color: #3b3b6f;
        color:#fff8de;
        margin:0 20px 20px 20px;
        padding: 5px 6px;
        box-shadow: inset 0 0 4px 4px #7877c7;
        border-radius: ${props => props.theme['borderRadius']}px;
        animation-name: borderflash;
        animation-duration: .7s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
        &>.close{
            display: none;
            position: absolute;
            top:-9px;
            right:-9px;
            font-size: 2rem;
            color:#fff;
        }
        &:hover{
            &>.close{
                display: block;
            }
        }
        &>.icon{
            position: relative;
            left: -23px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 36px;
            height: 36px;
            background-color: #3b3b6f;
            color:#7877c7;
            font-size:2rem;
            box-shadow: inset 0 0 3px 3px #7877c7;
            transform: rotate(45deg);
            animation-name: borderflash;
            animation-duration: .7s;
            animation-iteration-count: infinite;
            animation-timing-function: linear;
            &>.anticon{
                animation-name: contentflash;
                animation-duration: .7s;
                animation-iteration-count: infinite;
                transform: rotate(-45deg);
                animation-timing-function: linear;
            }
        }
        &>.info{
            padding-right:24px;
            div{
                &:first-child{
                    color:#fff8de;
                    padding: 2px 0;
                }
                &:last-child{
                    color:#ee545c;
                    padding: 2px 0;
                }
            }
        }
    }

    @keyframes borderflash {
        0% {
            box-shadow: inset 0 0 4px 4px #7877c7;
        }
        50%{
            box-shadow: inset 0 0 4px 4px #ee545c;
        }
        100% {
            box-shadow: inset 0 0 4px 4px #7877c7;
        }
    }
    @keyframes contentflash {
        0% {
            color: #7877c7;
        }
        50%{
            color: #ee545c;
        }
        100% {
            color: #7877c7;
        }
    }
`;
