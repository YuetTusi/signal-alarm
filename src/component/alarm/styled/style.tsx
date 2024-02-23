import styled from 'styled-components';

export const AlarmInfoBox = styled.div`

    width: auto;

    .ant-tabs-nav{
        margin:0 !important;
    }
`;

export const AlarmTableBox = styled.div`

    height:780px;
    .ant-tag{
        margin-right: 0 !important;
    }
`;

export const AlarmChartBox = styled.div`
    /* width: 100%; */
    height: 360px;

    .bar-tooltip{
        .tt-caption{
            padding-bottom: 4px;
        }
        .tt-row{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }
    }
`;

export const SelectedPanel = styled.div`
    position: relative;
    display: block;
    height: 200px;
    margin:16px 0;
    border: 1px solid #141c67;
    width: auto;
    border-radius: 2px;

    &>.caption{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding:5px 10px;
        font-weight:500;
        color:${props => props.theme['colorInfo']};
        background:linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(11,29,139,1) 33%, rgba(11,29,139,0) 100%);;
        border-top-left-radius:${(props) => `${props.theme['borderRadius']}px`};
        border-top-right-radius:${(props) => `${props.theme['borderRadius']}px`};
    }
    &>.content{
        overflow-y: auto;
        margin:0;
        padding:0;
        height:169px;
        &>ul{
            margin:0;
            padding:0;
            &>li{
                margin:0;
                padding:4px 10px;
                font-size:1.2rem;
                border-bottom:1px solid #141c67;
                white-space:nowrap;
                list-style-type:none;
                &>label{
                    margin-left:5px;
                }
                &>span{
                    color:#b4cdff;
                }
                &>strong{
                    font-weight:normal;
                }
            }
            /* &>li:last-child{
                border-bottom:none;
            } */
        }
    }
`;

export const SearchBarBox = styled.div`

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;

    &>div:last-child{
        display: flex;
        flex-wrap: nowrap;
        align-self: flex-end;
        .ant-btn{
            margin-left: 16px;
        }
    }

    .ant-form-item{
        margin-bottom: 5px;
    }
`;

export const FixContentBox = styled.div`
    height: 360px;
    overflow: hidden;
    position: absolute;
    top: 40px;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0;
    padding: 0;
`;
