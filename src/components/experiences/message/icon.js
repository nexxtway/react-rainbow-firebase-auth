import React from 'react';
import PropTypes from 'prop-types';
import ErrorIcon from '../../icons/error';
import DoneIcon from '../../icons/done';

export default function MessageIcon(props) {
    const { variant } = props;
    if (variant === 'ERROR') {
        return <ErrorIcon className="rainbow-auth-firebase-message_icon" />;
    }
    return <DoneIcon className="rainbow-auth-firebase-message_icon" />;
}

MessageIcon.propTypes = {
    variant: PropTypes.string,
};

MessageIcon.defaultProps = {
    variant: undefined,
};
