import styled from 'styled-components';
import spiSearch from '@/assets/image/spi-search.png';
import warnSearch from '@/assets/image/warn-search.png';
import checkReport from '@/assets/image/check-report.png';
import realTimeSpectrum from '@/assets/image/real-time-spectrum.png';
import historySpectrum from '@/assets/image/history-spectrum.png';
import baseFreq from '@/assets/image/base-freq.png';
import whiteList from '@/assets/image/white-list.png';
import fakeHotspot from '@/assets/image/fake-hotspot.png';
import devops from '@/assets/image/devops.png';
import area from '@/assets/image/area.png';
import sysUser from '@/assets/image/sys-user.png';
import sysMenu from '@/assets/image/sys-menu.png';
import sysOperLog from '@/assets/image/sys-oper-log.png';
import sysLoginLog from '@/assets/image/sys-login-log.png';
import signalSetInfo from '@/assets/image/signal-set-info.png';

export const UserIconBox = styled.div`

    &>.u-name{
        margin-left: 5px;
        margin-right: 5px;
    }
`;

export const FlatMenuBox = styled.div`

`;

export const FlatBox = styled.div`
    /* display: block;
    position: fixed;
    top:24px;
    left:0;
    bottom: 0;
    right: 0;
    z-index: 1000;
    background-color: rgba(8, 12, 50, .98); */

    .back-flat-button{
        color:#fff;
        position: absolute;
        top:10px;
        left: 10px;
    }
    .close-flat-button{
        color:#fff;
        position: absolute;
        top:10px;
        right: 10px;
        font-size: 2.4rem;
    }

    .menu-inner-box{
        position: absolute;
        top:60px;
        left: 0;
        right:0;
        bottom:0;
    }

    .flat-button{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
        background-color: transparent;
        border: none;
        i{
            display: block;
            width: 120px;
            height: 120px;
            background-repeat: no-repeat;
            background-size: contain;
            &.spiSearch{
                //专项检查检索
                background-image: url(${spiSearch});
            }
            &.warnSearch{
                //预警信息检索
                background-image: url(${warnSearch});
            }
            &.checkReport{
                //检查报告检索
                background-image: url(${checkReport});
            }
            &.realTimeSpectrum{
                //实时频谱
                background-image: url(${realTimeSpectrum});
            }
            &.historySpectrum{
                //历史频谱
                background-image: url(${historySpectrum});
            }
            &.baseFreq{
                //背景频谱
                background-image: url(${baseFreq});
            }
            &.whiteList{
                //白名单管理
                background-image: url(${whiteList});
            }
            &.fakeHotspot{
                //伪热点防护
                background-image: url(${fakeHotspot});
            }
            &.devops{
                //设备管理
                background-image: url(${devops});
            }
            &.area{
                //区域管理
                background-image: url(${area});
            }
            &.sysUser{
                //用户管理
                background-image: url(${sysUser});
            }
            &.sysMenu{
                //菜单管理
                background-image: url(${sysMenu});
            }
            &.sysOperLog{
                //操作日志
                background-image: url(${sysOperLog});
            }
            &.sysLoginLog{
                //登录日志
                background-image: url(${sysLoginLog});
            }
            &.signalSetInfo{
                //可疑持续信号
                background-image: url(${signalSetInfo});
            }
        }

        &>span{
            margin-top: 14px;
            font-size: 2rem;
            color:#fff;
        }
        &:hover{
            cursor: pointer;
            span{
                color:${props => props.theme['colorPrimary']}
            }
        }
    }
`;

export const ButtonPanel = styled.div`
    display:flex;
    flex-direction: column;
    width: 100%;
    height: 600px;
    justify-content: center;
`;