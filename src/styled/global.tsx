import { createGlobalStyle } from 'styled-components';
import hanYiFont from '@/assets/font/hanyi.ttf';

/**
 * 全局公共样式
 */
export const GlobalStyle = createGlobalStyle`

    @font-face {
        font-family: "HanYiChaoRan";
        src: url(${hanYiFont});
    }

    html{
        font-size: 62.5%;
        margin: 0;
        padding: 0;
        width: auto;
        height: 100%;
    }
    body{
        position: relative;
        margin: 0;
        padding: 0;
        width: auto;
        height: 100%;
    }
    #app{
        width:auto;
        height: 100%;
        color:#ffffffd9;
        font-size: 2rem;
        /* font-weight: 400; */
        font-family: "Microsoft YaHei","NSimSun","Arial";
        background-color: #02002f;
    }
    //重写部分antd样式
    .ant-modal-mask,.ant-modal-wrap{
        top:28px !important;
    }
    .ant-table-thead {
        .ant-table-cell{
            font-weight: bold !important;
        }
    }
    .ant-tabs-nav-more{
        color:#fff !important;
    }
    .ant-tabs-tab{
        padding: 6px 10px !important;
    }
    .ant-picker-ok{
        margin-top: 4px !important;
        &>.ant-btn{
            height: 30px !important;
        }
    }

    //地图背景色重写
    .leaflet-container{
        background-color: rgba(25, 35, 104, .7);
    }

    .map-tip-table{
        margin:0;
        padding:0;
        table{
            margin: 0;
            padding: 0;
            border-spacing: 0;
            font-size: 1.8rem;
        }
    }
    .map-tip-divider{
        border-top:1px solid silver;
        border-left: none;
        border-right: none;
        border-bottom: none;
    }

    .fn-hidden{
        display: none;
    }
    .fn-show{
        display: block;
    }

    //Webkit滚动条样式
    ::-webkit-scrollbar {
        width: 10px;
		height: 10px;
    }
	::-webkit-scrollbar:horizontal{
		width: 10px;
		height: 10px;
	}
    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        border-radius: 2px;
    }
    ::-webkit-scrollbar-thumb {
        border-radius: 2px;
        background: #ddd;
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
    }
    ::-webkit-scrollbar-thumb:hover{
        background: #ccc;
    }
    ::-webkit-scrollbar-thumb:active{
        background: #999;
    }
    ::-webkit-scrollbar-thumb:window-inactive {
        background: #c1c1c1;
    }
`;