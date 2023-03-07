import styled from 'styled-components';

export const ReadingBox = styled.div`

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    top:20px;
    left:0;
    right:0;
    bottom:0;
    z-index: 100;
    background-color: rgba(126,126,126,.4);
    cursor: wait;
    &>div{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .reading-msg{
        color:${props => props.theme['colorInfo']};
        font-size: 1.4rem;
        padding-top: 1rem;
    }
`;