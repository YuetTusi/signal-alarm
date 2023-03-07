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
        background-color: #181d30;
    }
`;