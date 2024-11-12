import styled from 'styled-components';
import { helper } from '@/utility/helper';
/**
 * 固定190内容居中
 */
export const CenterFixedBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 190px;
    overflow: hidden;
`;

export const ScrollList = styled.div`

    height: ${helper.PLATFORM === 'linux' ? 242 : 164}px;
    overflow: hidden;
    &>ul{
        margin:0;
        padding:0;
        &>li{
            .fixed{
                width: 250px;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
            }
            list-style-type: none;
            margin:0;
            padding:4px 0 4px 4px;
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
            a{
                color:#fcea00;
            }
            &.signal-li{
                cursor: pointer;
                display: flex;
                flex-wrap: nowrap;
                justify-content: flex-start;
                .freq-txt{
                    display: block;
                    max-width: 110px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    text-align: center;
                }
                .ant-tag{
                    flex:1;
                }
                &:hover{
                    background-color: rgba(1, 175, 248, 0.5);
                }
            }
        }
    }
`;