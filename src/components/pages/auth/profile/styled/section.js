import styled from 'styled-components';

const StyledSection = styled.section`
    height: calc(100vh - 76px);
    background-color: #f4f6f9;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    margin-top: 76px;

    @media (max-width: 620px) {
        overflow: auto;
    }
`;

export default StyledSection;
