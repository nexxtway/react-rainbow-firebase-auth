import React from 'react';
import PropTypes from 'prop-types';
import {
    defineMessages,
    FormattedMessage,
    injectIntl,
    intlShape,
} from 'react-intl';
import { Field, reduxForm } from 'redux-form';
import Input from 'react-rainbow-components/components/Input';
import Button from 'react-rainbow-components/components/Button';
import LockIcon from '../../../../icons/lock';
import validate from './validate';
import EmailIcon from '../../../../icons/email';

const translations = defineMessages({
    emailPlaceholder: {
        id: 'form.email.placeholder',
        defaultValue: 'Enter your email address',
    },
    passwordPlaceholder: {
        id: 'form.password.placeholder',
        defaultValue: 'Enter your password',
    },
});

function ReauthenticateForm(props) {
    const { intl, handleSubmit, onSubmit } = props;
    return (
        <form noValidate onSubmit={handleSubmit(onSubmit)} className="rainbow-auth-firebase-profile_reauthenticate-form">
            <Field
                component={Input}
                name="email"
                label={<FormattedMessage id="form.email.label" defaultMessage="Email address" />}
                required
                placeholder={intl.formatMessage(translations.emailPlaceholder)}
                type="email"
                icon={<EmailIcon />} />
            <Field
                component={Input}
                name="password"
                label={<FormattedMessage id="form.password.label" defaultMessage="Password" />}
                placeholder={intl.formatMessage(translations.passwordPlaceholder)}
                type="password"
                required
                icon={<LockIcon />} />
            <div className="rainbow-auth-firebase-profile_reauthenticate-form_actions">
                <Button
                    type="submit"
                    variant="brand"
                    label={(
                        <FormattedMessage
                            id="profile.reauthenticate.action"
                            defaultMessage="Authenticate" />
                    )} />
            </div>
        </form>
    );
}

ReauthenticateForm.propTypes = {
    intl: intlShape.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
    form: 'reauthenticate',
    touchOnBlur: false,
    validate,
})(injectIntl(ReauthenticateForm));
