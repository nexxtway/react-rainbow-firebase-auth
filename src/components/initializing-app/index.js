import React from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-rainbow-components/components/Spinner';

export default function InitializingApp(props) {
    const {
        className,
        style,
    } = props;
    return (
        <div className={className} style={style}>
            <Spinner />
        </div>
    );
}

InitializingApp.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
};

InitializingApp.defaultProps = {
    className: undefined,
    style: {},
};
