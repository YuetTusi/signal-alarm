import styled from 'styled-components';

export const DashboardBox = styled.div`

    display: flex;
    flex-direction: row;

    position: absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;

    &>.left-box{
        flex:none;
        &>div{
            margin-bottom: 5px;
        }
    }
    &>.center-box{
        flex:1;
        padding: 0 5px;
    }
    &>.right-box{
        flex:none;
    }
`;
