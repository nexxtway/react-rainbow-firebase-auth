import styled from 'styled-components';
import StyledLoginButton from './loginButton';

const StyledGitHubButton = styled(StyledLoginButton)`
    background-color: #24292E;
    border-color: #000000;
    color: #fff;
    margin-bottom: 32px;

    &:hover,
    &:focus {
        background-color: #000000;
        border-color: #000000;
        color: #fff;
    }

    @media (max-width: 620px) {
        margin-top: 20px;
    }
`;

export default StyledGitHubButton;
