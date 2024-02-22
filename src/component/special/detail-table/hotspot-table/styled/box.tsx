import styled from 'styled-components';

export const HotspotInfoBox = styled.div`

`;

export const SearchBarBox = styled.div`

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 14px;

    &>div:last-child{
        align-self: flex-end;
    }

    .ant-form-item{
        margin-bottom: 5px;
    }
`;
