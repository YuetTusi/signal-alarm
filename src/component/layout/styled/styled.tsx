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
        justify-content: space-between;
        background: url(${bannerBg}) center no-repeat,
                    url(${bannerRepeat}) repeat-x;
        &>div{
            position: relative;
            &:first-child{
                top:28px;
                padding-left: 5px;
            }
            &.app-title{
                top:0;
                font-size: 4rem;
                color:#daf5fe;
            }
            &:last-child{
                top:32px;
                padding-right: 5px;
                display: flex;
                flex-direction: row;
                .web-setting{
                    position: relative;
                    top:-4px;
                    color:#ffffffd9;
                    font-size: 1.4rem;
                    vertical-align: sub;
                    margin-right: 10px;
                }
            }
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