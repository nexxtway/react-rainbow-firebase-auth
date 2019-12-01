import styled from 'styled-components';
import LanguageSelector from '../../../../components/experiences/language-selector';

const StyledLanguageSelector = styled(LanguageSelector)`
    position: relative;
    top: 0;
    right: 0;

    @media (min-width: 1600px) {
        right: 0;
    }
`;

export default StyledLanguageSelector;
