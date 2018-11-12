import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Button from 'react-rainbow-components/components/Button';
import MailSendIcon from './icons/mailSendIcon';
import { navigateTo } from '../../../../history';
import './styles.css';

function ResetPasswordConfirmation(props) {
    const {
        email,
    } = props;

    return (
        <article className="rainbow-auth-firebase-reset-password-confirmation_container">
            <MailSendIcon />
            <h1 className="rainbow-auth-firebase-reset-password-confirmation_title">
                <FormattedMessage
                    id="reset.password.confirmation.title"
                    defaultMessage="Password Reset Email Sent" />
            </h1>
            <p className="rainbow-auth-firebase-reset-password-confirmation_content">
                <FormattedMessage
                    id="reset.password.confirmation.first.text"
                    defaultMessage="An email has been sent to your email address," />
                <p className="rainbow-auth-firebase-reset-password-confirmation_user-mail">
                    {` ${email}.`}
                </p>
            </p>
            <p className="rainbow-auth-firebase-reset-password-confirmation_content">
                <FormattedMessage
                    id="reset.password.confirmation.second.text"
                    defaultMessage="Follow the directions in the email to reset your password." />
            </p>
            <Button
                className="rainbow-auth-firebase-reset-password-confirmation_button"
                variant="brand"
                onClick={() => navigateTo('/home')}>
                <FormattedMessage id="mail.send.button.done" defaultMessage="Done" />
            </Button>
        </article>
    );
}

ResetPasswordConfirmation.propTypes = {
    email: PropTypes.string.isRequired,
};

function stateToProps(state) {
    const { forgot } = state;
    return {
        email: forgot.get('email'),
    };
}

function dispatchToProps() {
    return {};
}

export default connect(stateToProps, dispatchToProps)(ResetPasswordConfirmation);
