import styled from 'styled-components';
import rw from '@/assets/image/rw.png';

export const ScrollBox = styled.div`

    box-sizing: border-box;
    display: flex;
    width: 400px;
    padding: 10px;
    overflow-x: auto;
    flex-wrap: nowrap;
`;

export const EmptyBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const ReportBox = styled.div`

    border:1px solid #2189c8;
    box-shadow: inset 1px 1px 10px 5px #2189c8;
    margin: 0 10px 0 0;
    padding: 20px;
    width:180px;
    &:last-child{
        margin-right: 0;
    }
    &>.r-title{
        height: 32px;
        margin-bottom: 10px;
        span{
            display: block;
            height: 32px;
            line-height: 32px;
            text-indent: 37px;
            color:${props => props.theme['colorInfo']};
            background-image: url(${rw});
            background-repeat: no-repeat;
        }
    }

    &>.info{
        font-size: 1.2rem;
        ul,li{
            margin:0;
            padding:0;
        }
        li{
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            list-style-type: none;
            padding: 2px 0;
            label{
                white-space: nowrap;
                color:${props => props.theme['colorInfo']};
                &:after{
                    content:"：";
                }
            }
            span{
                flex:1;
                white-space: nowrap;
            }
        }
    }
    &>.btn{
        margin-top: 10px;
        padding: 10px 0;
        text-align: center;
        .ant-btn{
            margin: 0 4px;
        }
    }
`;