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
        justify-content: space-between;
        align-items: center;
        padding: 10px;
    }
    .map-box{
        flex:1;
        border-radius: 2px;
    }

    //报警表格样式
    .alarm-table-box{
        font-size: 1.4rem;
        table{
            border-top: 1px solid silver;
            border-left:1px solid silver;
            border-spacing: 0;
            border-collapse: collapse;
            tbody tr:hover{
                background-color: #e0eaff;
            }
            td,th{
                padding: 2px 5px;
                border-bottom: 1px solid silver;
                border-right:1px solid silver;
            }
        }
    }
    /* 暗蓝风格滤镜样式类 */  
	.dark-blue-filter {  
		filter: invert(95%) hue-rotate(180deg);
	}
    .leaflet-marker-icon{
        border:none;
        background: transparent;
    }
    .wave{
        position: absolute;
        border-radius: 50%;
        border:none;
        &.signal{
            &::after{
                display: block;
                content: 'wave';
                font-size: 0;
                position: absolute;
                top:-2px;
                left:-2px;
                right:-2px;
                bottom:0;
                border-radius: 50%;
                border:3px solid #03ffff;
                animation: scale 2s linear infinite;
            }            
        }
        &.bluetooth{
            &::after{
                display: block;
                content: 'wave';
                font-size: 0;
                position: absolute;
                top:-2px;
                left:-2px;
                right:-2px;
                bottom:0;
                border-radius: 50%;
                border:3px solid #2957d4;
                animation: scale 2s linear infinite;
            }            
        }
        &.wifi{
            &::after{
                display: block;
                content: 'wave';
                font-size: 0;
                position: absolute;
                top:-2px;
                left:-2px;
                right:-2px;
                bottom:0;
                border-radius: 50%;
                border:3px solid #8f82bc;
                animation: scale 2s linear infinite;
            }            
        }
        &.dev{
            &::after{
                display: block;
                content: 'wave';
                font-size: 0;
                position: absolute;
                top:-2px;
                left:-2px;
                right:-2px;
                bottom:0;
                border-radius: 50%;
                border:3px solid #f29c9f;
                animation: scale 2s linear infinite;
            }            
        }
    }
    @keyframes scale {
        0% {
            -webkit-transform: scale(0.9);
            opacity: 1;
        }
        100% {
            -webkit-transform: scale(1.5);
            opacity: 0;
        }
    }
    @keyframes blink {  
        0% { opacity: 1; }
        50% { opacity: 0; }
        100% { opacity: 1; }
    }
`;

export const MaskBox = styled.div`

    position: absolute;
    top:60px;
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