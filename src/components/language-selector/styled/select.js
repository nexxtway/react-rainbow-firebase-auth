import styled from 'styled-components';
import { Select } from 'react-rainbow-components';

const StyledSelect = styled(Select)`
    width: 110px;
    position: absolute;
    top: 20px;
    right: 20px;

    @media (min-width: 1600px) {
        right: 120px;
    }
`;

export default StyledSelect;
