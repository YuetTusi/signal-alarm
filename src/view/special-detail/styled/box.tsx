import styled from 'styled-components';

export const PageBox = styled.div`
    position: absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
`;

export const SearchBar = styled.div`

    border:1px solid #303030;
    padding: 10px;
    border-radius: ${props => props.theme['borderRadius']}px;
    background-color: ${props => props.theme['colorBgContainer']};
    position: relative;
    top:6px;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const TabBox = styled.div`
    position: absolute;
    top:75px;
    left:0;
    right:0;
    bottom:0;
    border:1px solid #303030;
    padding: 5px;
    margin-bottom: 5px;
    border-radius: ${props => props.theme['borderRadius']}px;
    background-color: ${props => props.theme['colorBgContainer']};
    overflow-y: auto;
`;