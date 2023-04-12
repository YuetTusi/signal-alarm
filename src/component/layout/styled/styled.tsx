import styled from 'styled-components';
import bannerBg from '@/assets/image/banner-bg.jpg';
import bannerRepeat from '@/assets/image/banner-repeat.jpg';
import mainBg from '@/assets/image/main-bg.jpg';
// import dashboardBg from '@/assets/image/dashboard-bg.jpg';

export const LayoutBox = styled.div`

    position: absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;

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
        width: 100%;
        height: 69px;
        flex-direction: row;
        justify-content: flex-end;
        background: url(${bannerBg}) center no-repeat,
                    url(${bannerRepeat}) repeat-x;
        &>.ant-btn{
            position: relative;
            top:32px;
            margin-right: 5px;
        }
    }
    .context-box{
        position: absolute;
        top:93px;
        left:0;
        right:0;
        bottom:0;
        overflow-y: auto;
        background-image: url(${mainBg});
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
`;