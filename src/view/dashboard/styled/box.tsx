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
        height: 700px;
        background-image: url(${alarmBg});
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
`;
