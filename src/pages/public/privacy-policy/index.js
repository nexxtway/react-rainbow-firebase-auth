import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Prismic, QueryAt } from 'react-prismic-cms';
import Content from '../../../components/prismic-content';
import BackButton from '../../../components/back-button';
import './styles.css';

function PrivacyPolicy(props) {
    const {
        className,
        style,
    } = props;

    return (
        <div className={className} style={style}>
            <div className="rainbow-auth-firebase-privacy-policy_header">
                <BackButton className="rainbow-auth-firebase-privacy-policy_back-button" />
                <FormattedMessage
                    id="privacy"
                    defaultMessage="Privacy Policy" />
            </div>
            <Prismic repo="rainbow-doc">
                <QueryAt
                    className="rainbow-auth-firebase-privacy-policy_content"
                    path="document.type"
                    value="privacy-policy"
                    content="privacy-policy"
                    component={Content}
                />
            </Prismic>
        </div>
    );
}

PrivacyPolicy.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
};

PrivacyPolicy.defaultProps = {
    className: undefined,
    style: {},
};

export default PrivacyPolicy;
