import styled from 'styled-components';

export const Panel = styled.div`

    display: block;
    margin: 0;
    padding: 0;
`;


export const BoxPanel = styled(Panel) <{
    margin?: number,
    padding?: number
}>`

    &>.content{
        margin: ${(props) => props.margin ?? 0 + 'px'};
        padding:${(props) => props.padding ?? 0 + 'px'};
    }
`;


export const DisplayPanel = styled(BoxPanel)`

    border:1px solid #303030;

    &>.caption{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding:5px 10px;
        color:#fff;
        background-color: ${(props) => props.theme['colorPrimary']};
        border-top-left-radius:${(props) => `${props.theme['borderRadius']}px`};
        border-top-right-radius:${(props) => `${props.theme['borderRadius']}px`};
    }
`;