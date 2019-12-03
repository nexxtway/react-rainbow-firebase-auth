import styled from 'styled-components';
import StyledLoginButton from './loginButton';

const StyledFacebookButton = styled(StyledLoginButton)`
    background-color: #004ca9;
    border-color: #004ca9;
    color: #fff;
    margin-bottom: 32px;

    &:hover,
    &:focus {
        background-color: #023a7e;
        border-color: #023a7e;
        color: #fff;
    }

    @media (max-width: 620px) {
        margin-top: 20px;
    }
`;

export default StyledFacebookButton;
