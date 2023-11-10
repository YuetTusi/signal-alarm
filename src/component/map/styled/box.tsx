import styled from 'styled-components';

export const MapBox = styled.div`

    width: 100%;
    height: 600px;

    &>img{
        width: 100%;
        height: 100%;
    }

    .leaflet-control-container{
        cursor: default !important;
    }
`;

export const BiboBox = styled.div`

    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;

    .d-box{
        flex:none;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        padding: 10px;
    }
    .map-box{
        flex:1;
        border-radius: 2px;
    }
`;

export const MaskBox = styled.div`

    position: absolute;
    top:50px;
    left:0;
    bottom:0;
    right:0;
    z-index: 500;
    cursor:wait;
    background-color: ${props => props.theme['colorBgContainer']};
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .ant-spin-dot-item{
        background-color:#b4cdff !important;
    }
`;