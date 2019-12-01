import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-rainbow-components/components/Button';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Prismic, QueryAt } from 'react-prismic-cms';
import Content from '../../../components/experiences/prismic-content';
import Back from '../../../components/icons/back';
import './styles.css';

function PrivacyPolicy(props) {
    const {
        className,
        style,
    } = props;

    return (
        <div className={className} style={style}>
            <div className="rainbow-auth-firebase-privacy-policy_header">
                <Link className="rainbow-auth-firebase-privacy-policy_back" to="/home/signup">
                    <Button variant="base">
                        <Back className="rainbow-auth-firebase-privacy-policy_back-icon" />
                        Back
                    </Button>
                </Link>
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
