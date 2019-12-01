import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import StyledImage from './styled/image';

export default function LogoLink({ className }) {
    return (
        <Link to="/home">
            <StyledImage className={className} src="/assets/rainbow-logo.svg" alt="rainbow logo" />
        </Link>
    );
}

LogoLink.propTypes = {
    className: PropTypes.string,
};

LogoLink.defaultProps = {
    className: undefined,
};
