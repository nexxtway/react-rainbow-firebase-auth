import React from 'react';
import PropTypes from 'prop-types';

const MailSendIcon = (props) => {
    const { className } = props;
    return (
        <svg className={className}>
            <g id="google-registration" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <polygon id="Shape" fill="#009ACF" points="13.9805825 28.7082573 20.9254671 63.1794872 72 0" />
                <polygon id="Shape" fill="#01B6F5" points="35.6504854 48.2150718 20.9708738 63.1794872 23.4706165 41.4176638 32.8384851 41.6783024" />
                <polygon id="Shape" fill="#38CCFF" points="72 0.107292274 15.3921094 36.9820047 2.13162821e-14 28.2535377" />
                <polygon id="Shape" fill="#38CCFF" points="72 0.107292274 71.9256094 0.315931866 42.2220937 51.9191275 23.1935625 41.4067494" />
                <polygon id="Shape" fill="#01B6F5" points="41.9417476 51.6312422 71.3009709 3.90798505e-14 51.2933326 56.8615385" />
            </g>
        </svg>
    );
};

MailSendIcon.propTypes = {
    className: PropTypes.string,
};
MailSendIcon.defaultProps = {
    className: undefined,
};

export default MailSendIcon;
