import styled from 'styled-components';

const StyledAvatarContainer = styled.div`
    margin-left: 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;

    @media (max-width: 620px) {
        margin: 0 0 24px 0;
    }
`;

export default StyledAvatarContainer;
