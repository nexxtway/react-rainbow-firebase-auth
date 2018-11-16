import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import './styles.css';

export default function TermsConditionsAndPrivacyPolicy() {
    return (
        <p className="rainbow-auth-firebase-terms-conditions-and-privacy-policy_container">
            <FormattedMessage id="sign.up.creating.account.agree" defaultMessage="By creating an account you agree to our" />
            <br />
            <Link className="rainbow-auth-firebase-terms-conditions_link" to="/home/terms">
                <FormattedMessage id="sign.up.terms" defaultMessage="Terms and Conditions" />
            </Link>
            <span>{' '}</span>
            <FormattedMessage id="sign.up.terms.and" defaultMessage="and our" />
            <span>{' '}</span>
            <Link className="rainbow-auth-firebase-privacy-policy_link" to="/home/privacy">
                <FormattedMessage id="sign.up.privacy" defaultMessage="Privacy Policy" />
            </Link>
        </p>
    );
}
