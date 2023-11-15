import styled from 'styled-components';

export const RadarBox = styled.div`

    position: absolute;
    top:0;
    right:0;
    bottom:0;
    left: 0;
    z-index: 400;

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
        flex:none;
        width: 540px;
    }
    .right{
        flex:1;

        .adetail{
            padding-right: 10px;
            &>div{
                margin:0;
                padding:5px 0;
                color:#01aff8;
                text-shadow: 1px 1px 10px #01aff8,-1px -1px 10px #01aff8;
                label{
                    font-size:1.6rem;
                }
                h2{
                    font-size: 8rem;
                    font-weight: normal;
                    margin: 0;
                    padding: 0;
                    text-shadow: 1px 1px 20px #01aff8,-1px -1px 20px #01aff8;
                }
                span{
                    font-size:1.6rem;
                }
            }
        }
    }

    .radar {
        background: -webkit-radial-gradient(center, #01aff887 0%, rgba(32, 255, 77, 0) 75%), -webkit-repeating-radial-gradient(rgba(32, 255, 77, 0) 5.8%, rgba(32, 255, 77, 0) 18%, #01aff8 18.6%, rgba(32, 255, 77, 0) 18.9%), -webkit-linear-gradient(90deg, rgba(32, 255, 77, 0) 49.5%, #01aff8 50%, #01aff8 50%, rgba(32, 255, 77, 0) 50.2%), -webkit-linear-gradient(0deg, rgba(32, 255, 77, 0) 49.5%, #01aff8 50%, #01aff8 50%, rgba(32, 255, 77, 0) 50.2%);
        background: radial-gradient(center, #01aff887 0%, rgba(32, 255, 77, 0) 75%), repeating-radial-gradient(#01aff887 5.8%, #01aff887 18%, #01aff8 18.6%, rgba(32, 255, 77, 0) 18.9%), linear-gradient(90deg, #01aff887 49.5%, #01aff8 50%, #01aff8 50%, #01aff887 50.2%), linear-gradient(0deg, #01aff887 49.5%, #01aff8 50%, #01aff8 50%, #01aff887 50.2%);
        width: 400px;
        height: 400px;
        margin: 0 auto;
        position: relative;
        border-radius: 50%;
        border: 0.2rem solid #01aff8;
        overflow: hidden;
        
        &:before{
            content: ' ';
            display: block;
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            animation: blips 5s infinite;
            animation-timing-function: linear;
            animation-delay: 1.4s;
        }
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
    @keyframes blips {
        14% {
            background: radial-gradient(2vmin circle at 75% 70%, #ffffff 10%, #01aff8 30%, rgba(255, 255, 255, 0) 100%);
        }
        14.0002% {
            background: radial-gradient(2vmin circle at 75% 70%, #ffffff 10%, #01aff8 30%, rgba(255, 255, 255, 0) 100%), radial-gradient(2vmin circle at 63% 72%, #ffffff 10%, #01aff8 30%, rgba(255, 255, 255, 0) 100%);
        }
        25% {
            background: radial-gradient(2vmin circle at 75% 70%, #ffffff 10%, #01aff8 30%, rgba(255, 255, 255, 0) 100%), radial-gradient(2vmin circle at 63% 72%, #ffffff 10%, #01aff8 30%, rgba(255, 255, 255, 0) 100%), radial-gradient(2vmin circle at 56% 86%, #ffffff 10%, #01aff8 30%, rgba(255, 255, 255, 0) 100%);
        }
        26% {
            background: radial-gradient(2vmin circle at 75% 70%, #ffffff 10%, #01aff8 30%, rgba(255, 255, 255, 0) 100%), radial-gradient(2vmin circle at 63% 72%, #ffffff 10%, #01aff8 30%, rgba(255, 255, 255, 0) 100%), radial-gradient(2vmin circle at 56% 86%, #ffffff 10%, #01aff8 30%, rgba(255, 255, 255, 0) 100%);
            opacity: 1;
        }
        100% {
            background: radial-gradient(2vmin circle at 75% 70%, #ffffff 10%, #01aff8 30%, rgba(255, 255, 255, 0) 100%), radial-gradient(2vmin circle at 63% 72%, #ffffff 10%, #01aff8 30%, rgba(255, 255, 255, 0) 100%), radial-gradient(2vmin circle at 56% 86%, #ffffff 10%, #01aff8 30%, rgba(255, 255, 255, 0) 100%);
            opacity: 0;
        }
    }
`;