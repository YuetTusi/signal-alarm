import styled from 'styled-components';
import wifi24 from '@/assets/image/wifi24.png';
import wifi58 from '@/assets/image/wifi58.png';
import terminal24 from '@/assets/image/terminal24.png';
import terminal58 from '@/assets/image/terminal58.png';
import bluetooth from '@/assets/image/bluetooth.png';

export const ListBox = styled.div`

    position: relative;
    padding:4px;

    &>.list-row{
        font-size: 1.2rem;
        padding: 4px 5px;
        border:1px solid #01aff8;
        background: rgb(3,83,196);
        background: linear-gradient(0deg, rgba(3,83,196,1) 0%, rgba(0,14,79,0.7987570028011204) 40%, rgba(0,14,79,1) 60%, rgba(3,83,196,1) 100%);
        margin-bottom: 4px;

        &:last-child{
            margin-bottom: 0;
        }

        &.cyan{
            border:1px solid #52fdeb;
            background: rgba(69,179,180,1);
            background: linear-gradient(0deg, rgba(69,179,180,1) 0%, rgba(15,66,83,0.7987570028011204) 40%, rgba(15,66,83,1) 60%, rgba(69,179,186,1) 100%);
        }
        &.purple{
            border:1px solid rgba(199,38,214,1);
            background: rgba(98,68,156,1);
            background: linear-gradient(0deg, rgba(98,68,156,1) 0%, rgba(47,13,73,0.7987570028011204) 40%, rgba(47,13,73,1) 60%, rgba(98,68,156,1) 100%);
        }
        &.yellow{
            border:1px solid #fcea00;
            background: rgba(154,155,113,1);
            background: linear-gradient(0deg, rgba(154,155,113,1) 0%, rgba(61,63,50,0.7987570028011204) 40%, rgba(61,63,50,1) 60%, rgba(154,155,113,1) 100%);
        }

        &>.inner-row{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            &>.list-row-txt{
                flex:1;
                display: flex;
                flex-direction: column;
                &>div{
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                }
            }   
            &>.list-row-val{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: flex-end;
            }
        }
    }
`;

export const Icon = styled.i`
    display: inline-block;
    width: 52px;
    height: 14px;
    margin-right: 5px;
    background-repeat: no-repeat;
    background-size: contain;
`;

export const Wifi24 = styled(Icon)`
   background-image: url(${wifi24});
   &.disconnect{
    filter:grayscale(1);
    }
`;

export const Wifi58 = styled(Icon)`
    background-image: url(${wifi58});
    &.disconnect{
        filter:grayscale(1);
    }
`;
export const Terminal24 = styled(Icon)`
   background-image: url(${terminal24});
   &.disconnect{
    filter:grayscale(1);
    }
`;

export const Terminal58 = styled(Icon)`
    background-image: url(${terminal58});
    &.disconnect{
        filter:grayscale(1);
    }
`;

export const Bluethooth = styled(Icon)`
    background-image: url(${bluetooth});
    &.disconnect{
        filter:grayscale(1);
    }
`;