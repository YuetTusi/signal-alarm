import styled from 'styled-components';

export const LoginBox = styled.div`

    display: flex;
    flex-direction: column;
    margin: 0 auto;
    height:auto;
    width: 240px;
    position: absolute;
    top:50%;
    left:50%;
    margin-top: -180px;
    margin-left: -120px;

    &>h3{
        font-weight: lighter;
        text-align: center;
        padding: 5px 0;
        margin-bottom: 20px;
        border-bottom: 1px solid #424242;
    }
`;