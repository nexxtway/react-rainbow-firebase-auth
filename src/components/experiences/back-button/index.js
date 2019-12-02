import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { goBack } from '../../../history';
import StyledButton from './styled/button';
import StyledIcon from './styled/icon';

const BACK = <FormattedMessage id="back" defaultMessage="Back" />;

export default function BackButton(props) {
    const {
        className,
        style,
    } = props;

    return (
        <StyledButton
            id="go-back-button"
            className={className}
            style={style}
            variant="base"
            onClick={goBack}>

            <StyledIcon />
            {BACK}
        </StyledButton>
    );
}

BackButton.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
};

BackButton.defaultProps = {
    className: undefined,
    style: {},
};
