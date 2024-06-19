import ChinaMobileGSM from '@/assets/image/l-chinamobilegsm.png';
import ChinaUnicomGSM from '@/assets/image/l-chinaunicomgsm.png';
import ChinaTelecomCDMA from '@/assets/image/l-chinatelecomcdma.png';
import ChinaUnicomWCDMA from '@/assets/image/l-ChinaUnicomwcdma.png';
import ChinaMobileTDDLTE from '@/assets/image/l-chinamobiletddlte.png';
import ChinaUnicomFDDLTE from '@/assets/image/l-chinaunicomfddlte.png';
import ChinaTelecomFDDLTE from '@/assets/image/l-ChinaTelecomfddlte.png';
import WiFi24G from '@/assets/image/wifi24.png';
import WiFi58G from '@/assets/image/wifi58.png';
import ChinaMobile5G from '@/assets/image/l-chinamobile5g.png';
import ChinaUnicom5G from '@/assets/image/l-chinaunicom5G.png';
import ChinaTelecom5G from '@/assets/image/l-chinatelecom5g.png';
import chinaBroadnet5g from '@/assets/image/l-chinabroadnet5g.png';
import Bluetooth50 from '@/assets/image/bluetooth.png';
import Detectaphone from '@/assets/image/detectaphone.png';
import GPSLocator from '@/assets/image/gpslocator.png';
import Camera from '@/assets/image/camera.png';
import Terminal24 from '@/assets/image/terminal24.png';
import Terminal58 from '@/assets/image/terminal58.png';
import Others from '@/assets/image/others.png';
import styled from 'styled-components';

export const RadarBox = styled.div`

    position: absolute;
    top:0;
    right:0;
    bottom:0;
    left: 0;
    z-index: 402;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: rgba(0,10,72,0.95);
    background-image: linear-gradient(
            0deg, transparent 24%, 
            #091350e6 25%, 
            #091350e6 26%, 
            transparent 27%, 
            transparent 74%, 
            #091350e6 75%, 
            #091350e6 76%, 
            transparent 77%, 
            transparent
        ), 
        linear-gradient(
            90deg, 
            transparent 24%, 
            #091350e6 25%, 
            #091350e6 26%, 
            transparent 27%, 
            transparent 74%, 
            #091350e6 75%, 
            #091350e6 76%, 
            transparent 77%, 
            transparent
        );
    background-size: 7rem 7rem;
    background-position: -5.2rem -5.2rem;
    .left{
        flex:1;
    }
    .center{
        flex:none;
        width: 500px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .right{
        flex:1;

        .adetail{
            width: 224px;
            margin: 0 auto;
            &>div{
                .imp{
                    
                    display: flex;
                    flex-direction: row;
                    flex-wrap: nowrap;
                    justify-content: flex-start;
                    align-items: flex-end;
                    span{
                        position: relative;
                        font-size:2rem;
                        top:-14px;
                    }
                }
                margin:0;
                padding:5px 0;
                color:#01aff8;
                text-shadow: 1px 1px 10px #01aff8,-1px -1px 10px #01aff8;
                label{
                    font-size:1.4rem;
                }
                h2{
                    font-size: 7rem;
                    font-weight: normal;
                    margin: 0;
                    padding: 0;
                    text-shadow: 1px 1px 20px #01aff8,-1px -1px 20px #01aff8;
                }
                span{
                    font-size:1.4rem;
                    white-space: nowrap;
                }
            }
        }
    }

    .radar-outer{

        position: relative;
        padding: 20px;

        .pointer{
            position: absolute;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            z-index: 1;
            display: block;
            background-repeat: no-repeat;
            background-size: contain;
            opacity: 0;
            /*animation: flash1 5s infinite;*/
            animation-timing-function: linear;
            animation-delay: 1.4s;
            background-color: #fff;
            /* box-shadow: 2px 2px 2px #fff, -2px -2px 2px #fff, 2px -2px 2px #fff, -2px 2px 2px #fff; */
            &.ChinaMobileGSM{
                background-image: url(${ChinaMobileGSM});
            }
            &.ChinaUnicomGSM{
                background-image: url(${ChinaUnicomGSM});
            }
            &.ChinaTelecomCDMA{
                background-image: url(${ChinaTelecomCDMA});
            }
            &.ChinaUnicomWCDMA{
                background-image: url(${ChinaUnicomWCDMA});
            }
            &.ChinaMobileTDDLTE{
                background-image: url(${ChinaMobileTDDLTE});
            }
            &.ChinaUnicomFDDLTE{
                background-image: url(${ChinaUnicomFDDLTE});
            }
            &.ChinaTelecomFDDLTE{
                background-image: url(${ChinaTelecomFDDLTE});
            }
            &.WiFi24G{
                background-image: url(${WiFi24G});
            }
            &.WiFi58G{
                background-image: url(${WiFi58G});
            }
            &.ChinaMobile5G{
                background-image: url(${ChinaMobile5G});
            }
            &.ChinaUnicom5G{
                background-image: url(${ChinaUnicom5G});
            }
            &.ChinaTelecom5G{
                background-image: url(${ChinaTelecom5G});
            }
            &.ChinaBroadnet5G{
                background-image: url(${chinaBroadnet5g});
            }
            &.Bluetooth50{
                background-image: url(${Bluetooth50});
            }
            &.Detectaphone{
                background-image: url(${Detectaphone});
            }
            &.GPSLocator{
                background-image: url(${GPSLocator});
            }
            &.Camera{
                background-image: url(${Camera});
            }
            &.Terminal24{
                background-image: url(${Terminal24});
            }
            &.Terminal58{
                background-image: url(${Terminal58});
            }
            &.Others{
                background-image: url(${Others});
            }
        }
    }

    .radar {
        background: -webkit-radial-gradient(center, #01aff887 0%, rgba(32, 255, 77, 0) 75%),
		/*-webkit-repeating-radial-gradient(rgba(32, 255, 77, 0) 5.8%, rgba(32, 255, 77, 0) 18%, #01aff8 18.6%, rgba(32, 255, 77, 0) 18.9%),*/
            -webkit-repeating-radial-gradient(rgba(32, 255, 77, 0) 11.4%, rgba(32, 255, 77, 0) 18%, #01aff8 18.6%, rgba(32, 255, 77, 0) 18.9%),
            -webkit-linear-gradient(90deg, rgba(32, 255, 77, 0) 49.5%, #01aff8 50%, #01aff8 50%, rgba(32,255,77,0)50.2%),
            -webkit-linear-gradient(0deg, rgba(32, 255, 77, 0) 49.5%, #01aff8 50%, #01aff8 50%, rgba(32,255,77,0)50.2%);
        width: 440px;
        height: 440px;
        margin: 0 auto;
        position: relative;
        border-radius: 50%;
        border: 0.2rem solid #01aff8;
        overflow: hidden;
        
        &:after{
            content: ' ';
            display: block;
            background-image: linear-gradient(44deg, rgba(0, 255, 51, 0) 50%, #01aff8 100%);
            width: 50%;
            height: 50%;
            position: absolute;
            top: 0;
            left: 0;
            animation: radar-beam 5s infinite;
            animation-timing-function: linear;
            transform-origin: bottom right;
            border-radius: 100% 0 0 0;
        }
    }

    .close-radar{
        position: absolute;
        top:0;
        right:0;
        font-size: 3rem;
    }

    @keyframes radar-beam {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
    @keyframes flash1 {
        1% {
            opacity: 0.9;
            /* box-shadow: 2px 2px 2px #fff, -2px -2px 2px #fff, 2px -2px 2px #fff, -2px 2px 2px #fff; */
        }
        80% {
            opacity: 0;
            /* box-shadow: 2px 2px 2px #fff, -2px -2px 2px #fff, 2px -2px 2px #fff, -2px 2px 2px #fff; */
        }
    }
    @keyframes flash2 {
        24% {
            opacity: 0.9;
            /* box-shadow: 2px 2px 2px #fff, -2px -2px 2px #fff, 2px -2px 2px #fff, -2px 2px 2px #fff; */
        }
        90% {
            opacity: 0;
            /* box-shadow: 2px 2px 2px #fff, -2px -2px 2px #fff, 2px -2px 2px #fff, -2px 2px 2px #fff; */
        }
    }
    @keyframes flash3 {
        37% {
            opacity: 0.9;
            /* box-shadow: 2px 2px 2px #fff, -2px -2px 2px #fff, 2px -2px 2px #fff, -2px 2px 2px #fff; */
        }
        100% {
            opacity: 0;
            /* box-shadow: 2px 2px 2px #fff, -2px -2px 2px #fff, 2px -2px 2px #fff, -2px 2px 2px #fff; */
        }
    }
`;