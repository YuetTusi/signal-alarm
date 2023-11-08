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