import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

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
        font-size: 1.4rem;
        font-family: "Microsoft YaHei","NSimSun","Arial";
        background-color: #02002f;
    }
    .ant-modal-mask,.ant-modal-wrap{
        top:22px !important;
    }
    .ant-tabs-nav-more{
        color:#fff !important;
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