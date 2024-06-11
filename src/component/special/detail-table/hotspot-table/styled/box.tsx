import styled from 'styled-components';

export const HotspotTableBox = styled.div`

    .dev-ex-row{
        &>td{
            /* border:  1px solid yellow; */
            padding: 0;
        }
    }
`;

export const SearchBarBox = styled.div`

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    &>div:last-child{
        align-self: center;
    }

    .ant-form-item{
        margin-bottom: 5px;
    }
`;
