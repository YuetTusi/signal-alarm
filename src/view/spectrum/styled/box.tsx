import styled from 'styled-components';

export const SpectrumBox = styled.div`
    position: absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
`;

export const LiveBox = styled.div`
    position: absolute;
    top:70px;
    left:0;
    right:0;
    bottom:0;
    display: flex;
    flex-direction: row;

    .chart-box{
        position: relative;
        background-color: #100c2a;
        flex:1;
        .ant-tag{
            margin-right: 0;
        }
    }
    .fn-box{
        position: relative;
        flex: none;
        box-sizing: border-box;
        width: 570px;
        height: 100%;
        /* border: 1px solid yellow; */
    }
    .content-box{
        position: absolute;
        top:34px;
        left:0;
        right:0;
        bottom:0;
        padding: 10px;
    }
    .btn-box{
        margin-top: 14px;
        display:flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        .ant-btn{
            &:first-child{
                margin-right: 5px;
            }
            &:last-child{
                margin-left: 5px;
            }
        }
    }
`;

export const TableBox = styled.div`
    position: absolute;
    top:60px;
    left:0;
    right:0;
    bottom:0;
    border:1px solid #303030;
    margin-bottom: 5px;
    border-radius: ${props => props.theme['borderRadius']}px;
    background-color: ${props => props.theme['colorBgContainer']};
    overflow-y: auto;

    .ant-table{
        border-left: 1px solid #303030;
        border-right: 1px solid #303030;
    }
    .ant-tag{
        margin-right: 0 !important;
    }
`;

export const SearchBar = styled.div`

    border:1px solid #303030;
    padding: 10px;
    border-radius: ${props => props.theme['borderRadius']}px;
    background-color: ${props => props.theme['colorBgContainer']};
    position: relative;
    top:6px;
    height:35px;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const ClockBox = styled.span`

    color:#f6f319;
`;