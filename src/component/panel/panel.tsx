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
        margin: ${(props) => props.margin + 'px' ?? 0};
        padding:${(props) => props.padding + 'px' ?? 0};
    }
`