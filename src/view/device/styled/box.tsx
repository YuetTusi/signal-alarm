import styled from 'styled-components';

export const DeviceBox = styled.div`
    padding: 5px;
`;

export const TableBox = styled.div`
    border-left: 1px solid #303030;
    border-right: 1px solid #303030;
    border-bottom: 1px solid #303030;
    .ant-tag{
        margin-right: 0;
    }
`;

export const SearchBar = styled.div`

    border:1px solid #303030;
    padding: 5px;
    margin-bottom: 5px;
    border-radius: ${props => props.theme['borderRadius']}px;
    background-color: ${props => props.theme['colorBgContainer']};

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;