import styled from 'styled-components';

const StyledArticle = styled.article`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-right: 24px;
    width: 50%;
    height: 100%;

    @media (max-width: 620px) {
        padding: 0;
        width: 100%;

        &:not(:last-child) {
            margin-bottom: 34px;
        }
    }
`;

export default StyledArticle;
