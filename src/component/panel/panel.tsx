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
        p{
            margin: 0;
            padding: 5px;
            text-align: right;
            background-color: rgba(25, 35, 104, .7);
        }
    }
`;

export const DisplayPanel = styled(BoxPanel)`

    border:1px solid #141c67;

    &>.caption{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding:5px 10px;
        font-weight:bold;
        color:${props => props.theme['colorInfo']};
        background:linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(11,29,139,1) 33%, rgba(11,29,139,0) 100%);;
        border-top-left-radius:${(props) => `${props.theme['borderRadius']}px`};
        border-top-right-radius:${(props) => `${props.theme['borderRadius']}px`};
    }
`;

export const ScrollPanel = styled.div<{ height?: number }>`

    display: block;
    height: ${props => props.height ?? 200}px;
    width: auto;
    overflow-y: auto;
`;