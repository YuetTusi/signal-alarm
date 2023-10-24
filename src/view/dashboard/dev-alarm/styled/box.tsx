import styled from 'styled-components';

export const DevAlarmBox = styled.div`
    position: absolute;
    top: 45px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: auto;

    .dev-item-box{
        display: inline-block;
        width: 33.3%;
        text-align: center;
    }

    .dev-item{
        position: relative;
        display:inline-flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        /* border:1px solid yellowgreen; */
        border-radius: 2px;
        font-size: 1.2rem;
        /* position: absolute; */

        &>i{
            font-size: 2rem;
        }

        &.green{
            color:#0be881;
        }
        &.red{
            color:#fd2c30;
        }
        &.gray{
            color:#808e9b;
        }

        .dev-detail{
            position: absolute;
            top:0;
            left:0;
            z-index: 1;
            display: none;
            min-width:200px;
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

            /* &::before{
                position: absolute;
                left:0;
                top:50%;
                width: 20px;
                display: block;
                border:1px solid #fff400;
                content: "";
            } */

            .info{
                white-space: nowrap;
            }

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
    }
`;