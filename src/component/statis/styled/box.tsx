import styled from 'styled-components';

/**
 * 固定190内容居中
 */
export const CenterFixedBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 195px;
    overflow: hidden;
`;

export const ScrollWhiteList = styled.div`

    height: 195px;
    overflow-y: auto;
    &>ul{
        margin:0;
        padding:0;
        &>li{
            list-style-type: none;
            margin:0;
            padding:4px 0;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #243e6c;
            .wl-type{
                display: inline-block;
                width: 60px;
                text-align: right;
                &:after{
                    content: "：";
                }
            }
        }
    }
`;