import styled from 'styled-components';
import clamp from '@/assets/image/clamp.png';
// import rw from '@/assets/image/rw.png';

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

    flex:1;
    cursor: pointer;
    position:relative;
    background-image: url(${clamp});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    /* box-shadow: inset 1px 1px 5px 5px #2189c8; */
    width:auto;
    margin: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex:1;

    .rp{
        position: absolute;
        top:6px;
        left: 50%;
        width: 70px;
        text-align: center;
        font-size: 1.4rem;
        margin-left: -35px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color:#f6f319;
    }

    &:first-child{
        margin-right: 2px;
    }

    &>.r-title{
        margin-top:10px;
        span{
            display: block;
            max-width: 200px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            padding-bottom: 5px;
            text-align: center;
            &:nth-child(1){
                color:#fff;
            }
            &:nth-child(2){
                font-size: 1rem;
                color:${props => props.theme['colorInfo']};
            }
        }
    }
    &>.df{
        font-size: 1.6rem;
        color:#00efef;
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
