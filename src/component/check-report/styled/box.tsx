import styled from 'styled-components';
import rw from '@/assets/image/rw.png';

export const ScrollBox = styled.div`

    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    width: auto;
    height: 190px;
    overflow-y: auto;
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
    width:auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex:1;

    &:first-child{
        margin-right: 2px;
    }
    &:last-child{
        margin-left: 2px;
    }

    &>.r-title{
        margin-top:10px;
        span{
            display: block;
            max-width: 200px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            height: 36px;
            padding-bottom: 10px;
            line-height: 36px;
            text-indent: 37px;
            color:${props => props.theme['colorInfo']};
            background-image: url(${rw});
            background-repeat: no-repeat;
        }
    }

    &>.info{
        font-size: 1.6rem;
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
        margin: 10px auto 10px auto;
        text-align: center;
        .ant-btn{
            margin: 0 4px;
        }
    }
`;

export const ModalBox = styled.div`

    height: 750px;
`;

export const SearchBarBox = styled.div`

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 14px;
    margin-top: 20px;
`;
