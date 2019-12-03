import styled from 'styled-components';

const StyledContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-shrink: 0;
    padding-top: 24px;

    @media (max-width: 620px) {
        flex-direction: column-reverse;
        align-items: center;
        padding-bottom: 64px;
    }
`;

export default StyledContent;
