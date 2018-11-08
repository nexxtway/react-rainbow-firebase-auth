import React from 'react';
import PropTypes from 'prop-types';

const FacebookIcon = (props) => {
    const { className } = props;
    return (
        <svg className={className} fill="#FFFFFF" width="20px" height="20px" viewBox="0 0 12 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <g transform="translate(-190.000000, -75.000000)">
                <g transform="translate(184.000000, 73.000000)">
                    <path d="M9.81043527,21.8571429 L9.81043527,13.0396205 L6.85714286,13.0396205 L6.85714286,9.53571429 L9.81043527,9.53571429 L9.81043527,6.7749442 C9.81043527,3.77544643 11.6432478,2.14285714 14.319308,2.14285714 C15.6015067,2.14285714 16.7027344,2.2391183 17.0223214,2.28147321 L17.0223214,5.41573661 L15.1664062,5.41573661 C13.7109375,5.41573661 13.4298549,6.10881696 13.4298549,7.12148438 L13.4298549,9.53571429 L16.7142857,9.53571429 L16.2637835,13.0396205 L13.4298549,13.0396205 L13.4298549,21.8571429" />
                </g>
            </g>
        </svg>
    );
};

FacebookIcon.propTypes = {
    className: PropTypes.string.isRequired,
};

export default FacebookIcon;
