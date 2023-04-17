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
        padding: 0 30px;
    }

    .phone-alarm{
        position: relative;
        display: inline-flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background-color: #3b3b6f;
        color:#fff8de;
        margin:0 40px 20px 0;
        padding: 5px 5px;
        box-shadow: inset 0 0 3px 3px #7877c7;
        border-radius: ${props => props.theme['borderRadius']}px;
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
            color:#ee545c;
            font-size:2rem;
            box-shadow: inset 0 0 3px 3px #7877c7;
            transform: rotate(45deg);
            &>.anticon{
                transform: rotate(-45deg);
            }
        }
        &>.info{
            padding-right:10px;
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
`;
