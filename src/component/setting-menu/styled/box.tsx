import styled from 'styled-components';

export const UserIconBox = styled.div`

    &>.u-name{
        margin-left: 5px;
        margin-right: 5px;
    }
`;

export const FlatMenuBox = styled.div`

`;

export const FlatBox = styled.div`
    display: block;
    position: fixed;
    top:24px;
    left:0;
    bottom: 0;
    right: 0;
    z-index: 1000;
    background-color: rgba(8, 12, 50, .98);

    .back-flat-button{
        color:#fff;
        position: absolute;
        top:10px;
        left: 10px;
    }
    .close-flat-button{
        color:#fff;
        position: absolute;
        top:10px;
        right: 10px;
        font-size: 2.4rem;
    }

    .menu-inner-box{
        position: absolute;
        top:60px;
        left: 0;
        right:0;
        bottom:0;
    }

    .flat-button{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 1rem 2rem;
        margin: 0 auto;

        background-color: transparent;
        border:4px solid #a4c7ff;
        border-radius: ${props => `${props.theme['borderRadius']}px`};
        &>.anticon{
            color:#b6caed;
            font-size:10rem;
            margin-bottom:14px;
        }
        &>span{
            font-size: 1.6rem;
            color:#fff;
        }
        &:hover{
            cursor: pointer;
            border:4px solid ${props => props.theme['colorPrimary']};
            span{
                color:${props => props.theme['colorPrimary']}
            }
        }
    }
`;

export const ButtonPanel = styled.div`
    display:flex;
    flex-direction: column;
    width: 100%;
    height: 600px;
    justify-content: center;
`;