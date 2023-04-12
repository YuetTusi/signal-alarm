import styled from 'styled-components';
import dashboardBg from '@/assets/image/dashboard-bg.jpg';

export const LayoutBox = styled.div`

    position: absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;

    background-image: url(${dashboardBg});
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position-y: 17px;

    .setting-box{
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        height: 40px;
        &>.ant-btn{
            margin-left: 5px;
            &:last-child{
                margin-left: 0;
                margin-right: 10px;
            }
        }
    }

    .banner{
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
    }
    .context-box{
        position: absolute;
        top:75px;
        left:0;
        right:0;
        bottom:0;
        overflow-y: auto;
    }
`;