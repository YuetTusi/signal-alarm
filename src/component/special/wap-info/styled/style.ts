import styled from 'styled-components';

export const WapInfoBox = styled.div`

    position: relative;
    width: 625px;

    .ant-tabs-nav{
        margin:0 !important;
    }

    .wap-tab{
        margin-top: 10px;
    }
    .ant-tabs-tab-btn{
        font-weight: lighter;
    }
`;

export const SearchBarBox = styled.div`

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
`;

export const BallBox = styled.div`
    box-sizing: border-box;
    position: relative;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    background: rgb(11, 100, 180);
    background: radial-gradient(
        circle,
        rgba(11, 100, 180, 1) 20%,
        rgba(10, 61, 140, 1) 100%
    );
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transform: rotate(45deg);

    .cross {
        border-radius: 1px;
        position: absolute;
        background-color: #020951;
        &:nth-child(1) {
				top: 0;
				left: 50%;
				margin-left: -3px;
				width: 6px;
				height: 6px;
        }
        &:nth-child(2) {
				top: 50%;
				left: 0;
				margin-top: -3px;
				width: 6px;
				height: 6px;
        }
        &:nth-child(3) {
				top: 50%;
				right: 0;
				margin-top: -3px;
				width: 6px;
				height: 6px;
        }
        &:nth-child(4) {
				bottom: 0;
				left: 50%;
				margin-left: -3px;
				width: 6px;
				height: 6px;
        }
    }
    .light-border {
        border-radius: 50%;
        border: 1px solid #0b64b4;
    }
    .light-loop {
        border-radius: 50%;
        background: rgb(3, 34, 142);
        background: radial-gradient(
            circle,
            rgba(3, 34, 142, 1) 0%,
            rgba(14, 23, 118, 0) 100%
        );
    }
    .heart {
        border-radius: 50%;
        width: 10px;
        height: 10px;
        background-color: #4c8ad5;
        border-width: 3px;
        border-style: solid;
    }
`;

export const EmptyBox = styled.div`
    position:absolute;
    top:0;
    right:0;
    bottom:0;
    left:0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;