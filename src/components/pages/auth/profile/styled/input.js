import styled from 'styled-components';
import { Field } from 'redux-form';

const StyledInput = styled(Field)`
    width: 320px;
    margin-bottom: 24px;
    flex-shrink: 0;

    &[disabled] {
        color: #a4a7b5;
        padding-left: 2.29rem;
    }

    @media (max-width: 620px) {
        margin-right: 0;
        width: 100%;
    }
`;

export default StyledInput;
