import styled from 'styled-components';

const StyledBottomBar = styled.div`
    box-shadow: 0 1px 2px 0 #e3e5ed;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 0;
    margin-top: -66px;
    position: fixed;
    z-index: 1000;
    bottom: 0;
    width: 100%;
    opacity: 0;
    transform: translateY(100%);
    transition: transform 250ms linear, opacity 250ms linear;

    @media (max-width: 620px) {
        margin-top: 0;
    }

    ${(props) => props.isBottomBarVisible &&
        `
            opacity: 1;
            transform: translateY(0%);
        `};
`;

export default StyledBottomBar;
