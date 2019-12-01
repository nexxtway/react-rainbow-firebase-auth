import styled from 'styled-components';
import { Button } from 'react-rainbow-components';

const StyledButton = styled(Button)`
    align-self: flex-start;
    margin-bottom: 12px;

    &:hover > svg,
    &:focus > svg {
        color: #009acf;
        fill: #009acf;
    }
`;

export default StyledButton;
