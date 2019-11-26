import styled from 'styled-components';
import { Select } from 'react-rainbow-components';

const StyledSelect = styled(Select)`
    width: 140px;
    height: 40px;
    align-self: center;

    @media (max-width: 620px) {
        display: none;
    }
`;

export default StyledSelect;
